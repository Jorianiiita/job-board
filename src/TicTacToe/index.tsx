// import { useRef } from 'react';

const TicTacToe = function (props: { n: number }) {
  const { n } = props;
  // const nameRef = useRef<HTMLInputElement>();

  return (
    <div
      className="tic-tac-toe"
      // style={{ gridTemplateColumns: `repeat(${n}, 1fr)`, display: 'grid' }}
    >
      {Array(n * n)
        .fill(null)
        .map((_, index) => index)
        .map((cellIndex) => {
          return <button key={cellIndex}>{cellIndex}</button>;
        })}
    </div>
  );
};

export default TicTacToe;
