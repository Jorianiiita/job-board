import { JobCardProps } from './hooks/useJobDetails';

export default function JobCard({ id, url, title, by, time }: JobCardProps) {
  const date = new Date(time);
  return (
    <div className="job-card" key={id}>
      <a href={url} target="_blank">
        <div className="title">{title}</div>
        <div>
          <span>By {by} . </span>
          <span>{date.toLocaleString()}</span>
        </div>
      </a>
    </div>
  );
}
