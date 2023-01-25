import TimelineItem, { ITimeLineItem } from "./timeline-item";

export type ITimelineType = "work" | "education";

interface IProps {
  type: ITimelineType;
  data: ITimeLineItem[];
}

const Timeline = ({ type, data }: IProps) => {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {data?.map((item) => (
        <TimelineItem key={item.title} type={type} {...item} />
      ))}
    </ol>
  );
};

export default Timeline;
