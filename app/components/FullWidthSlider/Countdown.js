import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endDate }) => {
    const [timeLeft, setTimeLeft] = useState([]);
    const [timerComponents, setTimerComponents] = useState([]);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const endTimestamp = new Date(endDate*1000).getTime();
            const difference = endTimestamp - now;
            console.log(endTimestamp)
    
            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                };
            }
            return null;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    useEffect(() => {
        var data = [];
        Object.keys(timeLeft).forEach((interval) => {
            if (timeLeft[interval] > 0) {
                data.push(
                    <span key={interval}>
                        {timeLeft[interval]} {interval}{" "}
                    </span>
                );
            }
        });
        setTimerComponents(data);
    }, [timeLeft]);

    if (!timeLeft) {
        return <span>Ended!</span>;
    }

    return (
        <>
            {timerComponents.length ? timerComponents : <span>...</span>}
        </>
    );
};

export default CountdownTimer;
