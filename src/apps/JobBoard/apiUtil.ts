export const getjobs = () => {
  return fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
};
export const getjobdetails = async (jobId: number) => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${jobId}.json`,
  );
  const data = await response.json();
  return data;
};
