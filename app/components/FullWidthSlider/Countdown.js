import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endDate }) => {
    const [timeLeft, setTimeLeft] = useState({});
    const [timerComponents, setTimerComponents] = useState([]);

    useEffect(() => {
        // Function to calculate the time left until endDate
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const endTimestamp = new Date(endDate).getTime();
            const difference = endTimestamp - now;

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                };
            }
            return {
                days: 0,
                hours: 0,
                minutes: 0,
            };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    // Effect for updating the timer components
    useEffect(() => {
        const intervalElements = Object.keys(timeLeft).map(interval => {
            if (timeLeft[interval] > 0) {
                return (
                    <span key={interval}>
                        {timeLeft[interval]} {interval}{" "}
                    </span>
                );
            }
            return null;
        }).filter(Boolean);

        setTimerComponents(intervalElements);
    }, [timeLeft]);

    // Check if the countdown has ended
    const isCountdownEnded = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0;

    if (isCountdownEnded) {
        return <span>Ended!</span>;
    }

    return (
        <>
            {timerComponents.length ? timerComponents : <span>...</span>}
        </>
    );
};

export default CountdownTimer;
