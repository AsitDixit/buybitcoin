import React, { useState, useEffect } from 'react';

function TransactionStatus() {
  const [message, setMessage] = useState('Transaction in process. Please wait...');
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft === 0) {
      setMessage('Transaction has been done successfully');
    } else {
      const intervalId = setInterval(() => {
        if (timeLeft > 1) {
          setMessage(`Almost there, only ${timeLeft} seconds left...`);
        } else {
          setMessage('Transaction has been done successfully');
        }
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [timeLeft]);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export default TransactionStatus;
