"use client"

import React, { useEffect, useRef, useState } from 'react';

function Blackwhole() {
    const containerRef = useRef(null);
    const shadowRef = useRef(null);
    let shakingInterval = null;

    const startShaking = () => {
        if (shadowRef.current) {
            shadowRef.current.classList.add('shaking');
        }
        shakingInterval = setInterval(() => {
            if (shadowRef.current) {
                const randomX = Math.floor(Math.random() * 5 - 5); // Random number for X axis
                const randomY = Math.floor(Math.random() * 5 - 5); // Random number for Y axis
                shadowRef.current.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }
        }, 50);
    };
    
    const stopShaking = () => {
        clearInterval(shakingInterval);
        if (shadowRef.current) {
            shadowRef.current.classList.remove('shaking');
            shadowRef.current.style.transform = 'translate(0, 0)';
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const { current } = containerRef;
            if (current) {
                // Position
                const translateX = window.scrollY / 5 * 1.5 *-1;
                const translateY = window.scrollY / 5;
                // current.style.transform = `translate(${translateX}px, ${translateY}px)`;
                current.style.left = `${translateX - 300}px`;
                current.style.top = `${translateY}px`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="blackWhole z-[-1]" ref={containerRef}>
            <bh-doppler></bh-doppler>
            <bh-photon-ring></bh-photon-ring>
            <bh-accretion></bh-accretion>
            <bh-backdrop></bh-backdrop>
            <div
                className='bh-shadow'
                ref={shadowRef}
                onMouseEnter={startShaking}
                onMouseLeave={stopShaking}
            ></div>
        </div>
    );
}

export default Blackwhole;
