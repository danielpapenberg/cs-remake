"use client"

import React, { useEffect, useRef, useState } from 'react';

function Blackwhole() {
    const containerRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const lerp = (start, end, alpha) => start + (end - start) * alpha;

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const animate = () => {
            const { current } = containerRef;
            if (current) {
                // Delayed scroll position
                lastScrollY.current = lerp(lastScrollY.current, scrollY, 0.05);

                const targetX = lastScrollY.current / 5 * 1.5 * -1;
                const targetY = lastScrollY.current / 5;

                const currentX = parseFloat(current.style.left || 0);
                const currentY = parseFloat(current.style.top || 0);

                current.style.left = `${lerp(currentX, targetX - 300, 0.1)}px`;
                current.style.top = `${lerp(currentY, targetY + 100, 0.1)}px`;
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener('scroll', handleScroll);
        requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollY]);

    return (
        <div className='hidden md:block'>
            <div className="blackWhole z-[-1]" ref={containerRef}>
                <bh-doppler></bh-doppler>
                <bh-photon-ring></bh-photon-ring>
                <bh-accretion></bh-accretion>
                <bh-backdrop></bh-backdrop>
                <div className='bh-shadow'></div>
            </div>
        </div>
    );
}

export default Blackwhole;
