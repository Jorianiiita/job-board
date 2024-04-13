import { useState } from 'react';
import useJobDetails from './hooks/useJobDetails';
import JobCard from './JobCard';

export default function JobBoard() {
  const [page, setPage] = useState(0);
  const { jobDetailsList, loading } = useJobDetails(page);

  return (
    <>
      <div className="job-list-container">
        {jobDetailsList.map((jobDetails) => {
          return <JobCard key={jobDetails.id} {...jobDetails} />;
        })}
      </div>
      <button
        type="button"
        disabled={loading}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        {loading ? 'Loading Jobs...' : 'Load more jobs'}
      </button>
    </>
  );
}
