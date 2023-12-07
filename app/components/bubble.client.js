"use client"

import React, { useEffect, useRef } from 'react';

function Bubble() {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const { current } = containerRef;
            if (current) {
                // Position
                const translateX = window.scrollY / 4 * 1.9 *-1;
                const translateY = window.scrollY / 5 * 3 *-1;
                current.style.transform = `translate(${translateX}px, ${translateY}px)`;

                // Size
                const scaleFactor = 1 + window.scrollY / 1000;
                const newWidth = 20 * scaleFactor;
                const newHeight = 20 * scaleFactor;
                current.style.width = `${newWidth}px`;
                current.style.height = `${newHeight}px`;

                // Color
                const shadowBlur = Math.min(100 + window.scrollY / 10, 500); // Max blur 300px
                const shadowSpread = Math.min(50 + window.scrollY / 20, 200); // Max spread 200px
                current.style.boxShadow = `
                    0 0 ${shadowBlur}px ${shadowSpread}px #fff,
                    0 0 ${shadowBlur / 5}px ${shadowSpread * 0.5}px #ff7100,
                    0 0 ${shadowBlur / 2}px ${shadowSpread * 0.8}px #e2001a,
                    0 0 ${shadowBlur}px ${shadowSpread * 1.5}px #4f2e539c,
                    0 0 ${shadowBlur * 3}px ${shadowSpread * 3}px #6A90BA
                `;
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bubble" ref={containerRef}></div>
    );
}

export default Bubble;
