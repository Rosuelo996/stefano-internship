import { useEffect, useState } from 'react'

const useCountdown = (expiryDate) => {
    const [timer, setTimer] = useState();
  
    useEffect(() => {
      const interval = setInterval(() => {
        updateTimer();
      }, 1000);
  
      function updateTimer() {
        const currentTime = Date.now();
        const millisLeft = expiryDate - currentTime;
  
        if (millisLeft <= 0) {
          setTimer(null);
          clearInterval(interval);
          return;
        }
  
        const secondsLeft = millisLeft / 1000;
        const minutesLeft = secondsLeft / 60;
        const hoursLeft = minutesLeft / 60;
  
        const secondsText = Math.floor(secondsLeft) % 60;
        const minutesText = Math.floor(minutesLeft) % 60;
  
        const hours = Math.floor(hoursLeft);
        const minutes = String(minutesText).padStart(2, "0");
        const seconds = String(secondsText).padStart(2, "0");
  
        const formatted = hours + "h " + minutes + "m " + seconds + "s";
        setTimer(formatted);
      }
      updateTimer();
  
      return () => {
        clearInterval(interval);
      };
    }, [expiryDate]);

    return timer
}

export default useCountdown