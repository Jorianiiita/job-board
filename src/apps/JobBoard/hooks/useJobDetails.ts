import { useEffect, useState } from 'react';
import { getjobs, getjobdetails } from './../apiUtil';

export type JobCardProps = {
  id: number;
  url: string;
  title: string;
  by: string;
  time: string;
  type: string;
};

const PAGE_SIZE = 6;

type ReturnType = {
  jobDetailsList: JobCardProps[];
  loading: boolean;
};

export default function useJobDetails(page: number): ReturnType {
  const [jobIds, setJobIds] = useState<number[]>([]);
  const [jobDetailsList, setJobDetailsList] = useState<JobCardProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadJobDetails();
  }, [page]);

  async function fetchJobIds(currentPage: number) {
    let jobs = jobIds;
    if (!jobs.length) {
      const res = await getjobs();
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
    const jobDetailsPromises = jobIds.map((jobId) => getjobdetails(jobId));
    const results = await Promise.all(jobDetailsPromises);
    setJobDetailsList([...jobDetailsList, ...results]);
    setLoading(false);
  };

  return { jobDetailsList, loading };
}
