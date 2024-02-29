import './App.css';
import JobBoard from './JobBoard';
import NormalTabs from './Tabs/NormalTabs';
import VerticalTabs from './Tabs/VerticalTabs';
import TicTacToe from './TicTacToe';
import Wordle from './Wordle';

function App() {
  return (
    <>
      <NormalTabs />
      <VerticalTabs />
    </>
  );
  return <TicTacToe n={5} />;
  return <Wordle />;
  return <JobBoard />;
}

export default App;
