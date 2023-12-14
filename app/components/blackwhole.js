"use client"

import React, { useEffect, useRef, useState } from 'react';

function Blackwhole() {
    const containerRef = useRef(null);

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
            <div className='bh-shadow'></div>
        </div>
    );
}

export default Blackwhole;
