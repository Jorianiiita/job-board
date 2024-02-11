import React, { useEffect, useState } from 'react';
import './App.css';

type JobCardProps = {
  id: number;
  url: string;
  title: string;
  by: string;
  time: string;
  type: string;
};

function JobCard({ id, url, title, by, time }: JobCardProps) {
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

const PAGE_SIZE = 6;

function App() {
  const [jobIds, setJobIds] = useState<number[]>([]);
  const [jobDetailsList, setJobDetailsList] = useState<JobCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    loadJobDetails();
  }, [page]);

  async function fetchJobIds(currentPage: number) {
    let jobs = jobIds;
    if (!jobs.length) {
      const res = await fetch(
        'https://hacker-news.firebaseio.com/v0/jobstories.json',
      );
      jobs = await res.json();
      setJobIds(jobs);
    }
    return jobs.filter((_, index) => {
      const offset = currentPage * PAGE_SIZE;
      return index >= offset && index < offset + PAGE_SIZE;
    });
  }

  const loadJobDetails = async () => {
    setLoading(true);
    const jobIds = await fetchJobIds(page);
    const jobDetailsPromises = jobIds.map((jobId) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`).then(
        (res) => res.json(),
      ),
    );
    const results = await Promise.all(jobDetailsPromises);
    setJobDetailsList([...jobDetailsList, ...results]);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Hacker News Job Board</h1>
      <div>
        {jobDetailsList.map((jobDetails) => {
          return <JobCard {...jobDetails} />;
        })}
      </div>
      <button
        type="button"
        disabled={loading}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        {loading ? 'Loading...' : 'Load more jobs'}
      </button>
      <div>
        <label htmlFor="name">name</label>
        <input id="name" type="text" />
      </div>
    </div>
  );
}

export default App;
