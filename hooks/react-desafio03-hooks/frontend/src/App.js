import React, { useEffect, useState } from 'react';
import Candidates from './components/Candidates';
import Header from './components/Header';
import Spinner from './components/Spinner';

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [previousVotes, setPreviousVotes] = useState([]);
  const [previousPercentages, setPreviousPercentages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:8080/votes')
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const localPreviousVotes = candidates.map(({ id, votes }) => {
            return { id, votes };
          });
          const localPreviousPercentages = candidates.map(
            ({ id, percentage }) => {
              return { id, percentage };
            }
          );

          setCandidates(json.candidates);
          setPreviousVotes(localPreviousVotes);
          setPreviousPercentages(localPreviousPercentages);
        });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [candidates]);

  if (candidates.length === 0) {
    return <Spinner description="Loading..." />;
  }

  return (
    <div className="container">
      <Header>Voting</Header>
      <Candidates
        previousPercentages={previousPercentages}
        previousVotes={previousVotes}
        candidates={candidates}
      />
    </div>
  );
}
