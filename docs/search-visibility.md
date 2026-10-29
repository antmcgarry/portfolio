# Search visibility

The production site uses `https://www.amcgarry.com/`. The apex domain already
redirects there through the hosting provider. Keep the canonical URL, sitemap,
structured data and social metadata consistent with that address.

## Ownership verification (not yet connected)

Google Search Console and Bing Webmaster Tools need the site owner's account.
Adding verification support to the code does not create or verify either property.

1. In [Google Search Console](https://search.google.com/search-console), add a
   URL-prefix property for `https://www.amcgarry.com/`. Choose HTML-tag verification
   and copy only the tag's `content` value.
2. Set `GOOGLE_SITE_VERIFICATION` to that value in the production hosting
   environment, rebuild/redeploy, then complete verification in Search Console.
   A Domain property using DNS verification is an alternative; it needs no code.
3. In [Bing Webmaster Tools](https://www.bing.com/webmasters), import the verified
   Google property or use HTML-tag verification. For the latter, set
   `BING_SITE_VERIFICATION` to the `msvalidate.01` content value and redeploy.
4. Submit `https://www.amcgarry.com/sitemap.xml` to both services. In Search Console,
   inspect the homepage and request indexing if necessary.

These optional server environment variables emit verification tags only when
configured. Do not use example tokens or claim ownership verification is complete
until the respective service confirms it.

## Check after deployment

- Confirm the homepage, `/robots.txt`, `/sitemap.xml`, `/opengraph-image` and
  `/favicon.ico` return successful responses.
- Run `node scripts/check-seo.mjs https://www.amcgarry.com` to check the public
  output. Locally, run `pnpm build` then `pnpm check:seo`; the check starts and
  stops its own production server on port 3100.
- Validate the homepage using Google's [Rich Results Test](https://search.google.com/test/rich-results)
  and the [Schema Markup Validator](https://validator.schema.org/). Structured data
  describes the existing profile; it does not guarantee a rich result or citation.
- Review Search Console indexing and search impressions, clicks and queries after
  data becomes available. Compare periods monthly rather than treating a technical
  audit score as a measure of audience growth.

## Content maintenance

Keep the role, employer, location and technologies accurate in the visible copy
and JSON-LD. Shared identity and metadata live in `src/lib/site.ts`. Only the
homepage belongs in the sitemap today; section anchors and API endpoints are not
separate content pages. Do not add artificial modification dates on every build.

The portfolio makes no claim of freelance availability, prices, testimonials or
client results. There is no publishing schedule, analytics tracker or special AI
file to maintain. Clear factual text and crawlable HTML support search and answer
engines; inclusion and ranking remain decisions made by those services.
