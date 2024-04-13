import { lazy, Suspense } from 'react';
import './index.css';

const JobBoard = lazy(() => import('./JobBoard'));

function JobBoardApp() {
  return (
    <div className="job-board">
      <h1>Hacker News Job Board</h1>
      {/* Only Suspense-enabled data sources will activate the Suspense component.  */}
      {/* Suspense does not detect when data is fetched inside an Effect or event handler. */}
      <Suspense fallback={<h2>Loading Job board...</h2>}>
        <JobBoard />
      </Suspense>
    </div>
  );
}

export default JobBoardApp;
