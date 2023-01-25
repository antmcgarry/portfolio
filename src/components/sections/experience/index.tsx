import Timeline from "@/components/timeline";

const WORK_DATA = [
  {
    type: "work",
    title: "Players' Lounge",
    description: "Senior Front-End Software Engineer",
    toDate: new Date(2023, 0o1, 0o1),
    fromDate: new Date(2022, 0o1, 0o1),
  },
  {
    type: "work",
    title: "Acorn Insurance",
    description: "Lead Front-End Software Engineer",
    toDate: new Date(2022, 0o1, 0o1),
    fromDate: new Date(2021, 0o1, 0o1),
  },
  {
    type: "work",
    title: "Fourth Wall Creative",
    description: "Software Engineer",
    toDate: new Date(2021, 0o1, 0o1),
    fromDate: new Date(2019, 0o1, 0o1),
  },
  {
    type: "work",
    title: "Nova LTD",
    description: "Software Engineer",
    toDate: new Date(2019, 0o1, 0o1),
    fromDate: new Date(2017, 0o1, 0o1),
  },
  {
    type: "work",
    title: "CyberGaTE, Edge Hill University",
    description: "Game Developer",
    toDate: new Date(2017, 0o1, 0o1),
    fromDate: new Date(2015, 0o1, 0o1),
  },
];

const EDUCATION_DATA = [
  {
    type: "education",
    title: "Edge Hill University",
    description: "First Class Master Degree",
    toDate: new Date(2019, 0o1, 0o1),
    fromDate: new Date(2014, 0o1, 0o1),
  },
  {
    type: "education",
    title: "St Helens College",
    description: "BTEC I.C.T Level 3 D*D*D*",
    toDate: new Date(2009, 0o1, 0o1),
    fromDate: new Date(2014, 0o1, 0o1),
  },
  {
    type: "education",
    title: "Higher Side Compressive School",
    description: "Grades B - D including Maths and English",
    toDate: new Date(2004, 0o1, 0o1),
    fromDate: new Date(2009, 0o1, 0o1),
  },
];
const ExperienceSection = () => {
  return (
    <section>
      <div className="pb-10">
        <h3 className="text-3xl py-1 dark:text-white ">Experience</h3>
        <div className="lg:flex gap-10">
          <div className="shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1">
            <Timeline type="work" data={WORK_DATA} />
          </div>
          <div className="shadow-lg p-10 rounded-xl my-10  dark:bg-white flex-1">
            <Timeline type="education" data={EDUCATION_DATA} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
