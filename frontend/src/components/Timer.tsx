import React, { useState, useEffect } from 'react';

const TimerComponent = () => {
    const formatTime = (milliseconds: number) => {
        const seconds = Math.floor((milliseconds / 1000) % 60);
        const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
        const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

        const format = (value: number) => (value < 10 ? `0${value}` : value.toString());

        return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
    };

    const getTimeUntil = (targetHour: number, targetMinute: number, targetSecond: number) => {
        const now = new Date();
        let targetTime = new Date(now);
        targetTime.setHours(targetHour, targetMinute, targetSecond, 0);

        // If the current time is past 5 PM, set the target time to 5 PM the next day
        if (now > targetTime) {
            targetTime.setDate(targetTime.getDate() + 1); // Move to the next day
        }

        const timeDifference = targetTime.getTime() - now.getTime();
        return timeDifference;
    };

    const [countdown, setCountdown] = useState(getTimeUntil(17, 0, 0)); // Initialize countdown with time until 5 PM
    const [showTimer, setShowTimer] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentDateTime = new Date();
            const currentHour = currentDateTime.getHours();
    
            if (currentHour >= 17 && currentHour < 21) {
                // Hide the timer between 5 PM and 9 PM
                setShowTimer(false);
            } else {
                // Show the timer and update the countdown
                setShowTimer(true);
                setCountdown(getTimeUntil(17, 0, 0));
            }
        }, 1000);
    
        return () => clearInterval(intervalId);
    }, []);
    

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 0) {
                    return getTimeUntil(17, 0, 0);
                }
                return prevCountdown - 1000;
            });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, []);

    return (
        <div>
            {showTimer && (
                <div>
                    {/* Your timer component goes here */}
                    Next withdrawal: {formatTime(countdown)}
                </div>
            )}
        </div>
    );
};

export default TimerComponent;
