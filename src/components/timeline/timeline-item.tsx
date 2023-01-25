import { ITimelineType } from ".";

export type ITimeLineItem = {
  title: string;
  fromDate: Date;
  toDate?: Date;
  description?: string;
};

interface IProps extends ITimeLineItem {
  type: ITimelineType;
}

const OfficeBuildingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-3 h-3 text-blue-800 dark:text-blue-300"
  >
    <path
      strokeLinecap="round"
      fillRule="evenodd"
      strokeLinejoin="round"
      clipRule="evenodd"
      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
    />
  </svg>
);

const EducationHatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-3 h-3 text-blue-800 dark:text-blue-300"
  >
    <path
      strokeLinecap="round"
      fillRule="evenodd"
      strokeLinejoin="round"
      clipRule="evenodd"
      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
    />
  </svg>
);

const TimelineItem = ({
  title,
  fromDate,
  toDate,
  description,
  type,
}: IProps) => {
  return (
    <li className="mb-10 ml-6">
      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white  dark:bg-blue-900">
        {type === "work" ? <OfficeBuildingIcon /> : <EducationHatIcon />}
      </span>
      <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-gray-500">
        {title}
      </h3>
      <p className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {fromDate.getFullYear()} - {toDate?.getFullYear() || "Present"}
      </p>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </li>
  );
};

export default TimelineItem;
