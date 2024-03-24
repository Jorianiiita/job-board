import './App.css';
import JobBoard from './JobBoard';
import NormalTabs from './Tabs/NormalTabs';
import VerticalTabs from './Tabs/VerticalTabs';
import TaskList from './TaskList';
import TicTacToe from './TicTacToe';
import Wordle from './Wordle';

function App() {
  return <TaskList />;

  return (
    <>
      <JobBoard />
    </>
  );
  return (
    <>
      <NormalTabs />
      <VerticalTabs />
    </>
  );
  return <TicTacToe n={5} />;
  return <Wordle />;
}

export default App;
