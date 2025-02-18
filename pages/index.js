import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function Home() {
  const birthday = new Date(new Date().getFullYear(), 1, 18); // February 18
  const today = new Date();
  if (today > birthday) {
    birthday.setFullYear(today.getFullYear() + 1); // If the birthday has passed, set for next year
  }

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date();
    const diff = birthday - now;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      confetti(); // Launch confetti when it's the birthday
    }

    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: "50px" }}>
      {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
        <div>
          <h1 style={{ fontSize: "50px", color: "gold" }}>🎉 Happy Birthday, Dani! 🎂</h1>
          <p>Enjoy your special day! 🎈</p>
        </div>
      ) : (
        <div>
          <h1>Countdown to Dani's Birthday 🎂</h1>
          <h2>
            {timeLeft.days} Days, {timeLeft.hours} Hours, {timeLeft.minutes} Minutes, {timeLeft.seconds} Seconds
          </h2>
        </div>
      )}
    </div>
  );
}
