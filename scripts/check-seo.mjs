import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { setTimeout } from "node:timers/promises";

const require = createRequire(import.meta.url);
const canonical = "https://www.amcgarry.com/";
const origin = process.argv[2] ?? "http://127.0.0.1:3100";
const server = process.argv[2]
  ? undefined
  : spawn(process.execPath, [require.resolve("next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", "3100"], {
      stdio: "inherit",
    });

async function get(path) {
  const response = await fetch(new URL(path, origin), {
    signal: AbortSignal.timeout(15000),
  });
  assert.equal(response.status, 200, `${path} should return 200`);
  assert.ok(!/noindex/i.test(response.headers.get("x-robots-tag") ?? ""), `${path} must be indexable`);
  return response;
}

try {
  if (server) {
    let ready = false;
    for (let attempt = 0; attempt < 30; attempt++) {
      if (server.exitCode !== null) throw new Error("Production server exited before becoming ready");
      try {
        await get("/");
        ready = true;
        break;
      } catch {
        await setTimeout(500);
      }
    }
    assert.ok(ready, "Production server should become ready");
  }

  const response = await get("/");
  const html = await response.text();
  // Read actual tags, excluding scripts containing serialized React data.
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"');
  const meta = (name) => {
    const tags = [...markup.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => tag);
    const tag = tags.find((tag) => tag.includes(`name="${name}"`) || tag.includes(`property="${name}"`));
    return decode(tag?.match(/content="([^"]*)"/)?.[1] ?? "");
  };

  assert.match(markup, /<html[^>]*lang="en-GB"/);
  assert.match(decode(markup), /<title>Anthony McGarry \| React & TypeScript Frontend Developer<\/title>/);
  assert.equal((markup.match(/<link\b[^>]*rel="canonical"/g) ?? []).length, 1);
  const canonicalTag = markup.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0];
  assert.equal(new URL(canonicalTag?.match(/href="([^"]+)"/)?.[1]).href, canonical);
  assert.equal((markup.match(/<h1\b/g) ?? []).length, 1, "There should be one primary heading");
  assert.match(markup, /href="#about"/);
  assert.match(markup, /href="#experience"/);
  assert.match(markup, /href="#contact"/);
  assert.ok(!/style="[^"]*opacity:\s*0(?:;|")/.test(markup), "Initial HTML should not hide profile content behind animations");
  assert.match(meta("description"), /Merseyside.*React.*TypeScript.*React Native/);
  assert.equal(new URL(meta("og:url")).href, canonical);
  assert.equal(meta("og:site_name"), "Anthony McGarry");
  assert.equal(meta("og:locale"), "en_GB");
  assert.equal(meta("twitter:card"), "summary_large_image");
  assert.ok(!/noindex|nosnippet/i.test(meta("robots")), "Search snippets should remain allowed");

  const jsonLd = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(jsonLd.length, 1);
  const data = JSON.parse(jsonLd[0][1]);
  assert.equal(data["@context"], "https://schema.org");
  const graph = data["@graph"];
  const person = graph.find((entry) => entry["@type"] === "Person");
  const profile = graph.find((entry) => entry["@type"] === "ProfilePage");
  const website = graph.find((entry) => entry["@type"] === "WebSite");
  assert.equal(person.name, "Anthony McGarry");
  assert.equal(person.url, canonical);
  assert.equal(profile.mainEntity["@id"], person["@id"]);
  assert.equal(profile.isPartOf["@id"], website["@id"]);
  assert.ok(markup.includes(person.jobTitle), "The structured job title should be visible");
  for (const url of person.sameAs) assert.ok(markup.includes(url), "Profile links should match visible links");

  const robots = await (await get("/robots.txt")).text();
  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /Allow: \/(?:\r?\n|$)/);
  assert.match(robots, /Disallow: \/api\//);
  assert.ok(robots.includes(`Sitemap: ${canonical}sitemap.xml`));
  const sitemap = await (await get("/sitemap.xml")).text();
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]), [canonical]);

  for (const name of ["og:image", "twitter:image"]) {
    const url = new URL(meta(name));
    assert.equal(url.origin, new URL(canonical).origin);
    const image = await get(url.pathname + url.search);
    assert.match(image.headers.get("content-type"), /image\/png/);
    const bytes = Buffer.from(await image.arrayBuffer());
    assert.equal(bytes.subarray(1, 4).toString(), "PNG");
    assert.equal(bytes.readUInt32BE(16), 1200);
    assert.equal(bytes.readUInt32BE(20), 630);
  }
  await get("/favicon.ico");
  await get("/images/me.png");
  console.log(`SEO checks passed for ${origin}: metadata, canonical, profile graph, navigation, robots, sitemap and social images.`);
} finally {
  server?.kill();
}
