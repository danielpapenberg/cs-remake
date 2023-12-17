"use client"

import React, { useEffect } from 'react';
import FullWidthSliderItem from './FullWidthSliderItem';
import H3 from '../../components/headlines/H3';
import SecondaryButton from '../buttons/SecondaryButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function FullWidthSlider() {
    const slides = [
        { id: 1, bgColor: 'bg-blue-200', text: 'Solana', desc: 'Solana is a Layer 1 blockchain that offers users fast speeds and affordable costs. It supports smart contracts and facilitates the creation of decentralized applications (dApps).', image: 'https://assets.coingecko.com/coins/images/4128/standard/solana.png?1696504756' },
        { id: 2, bgColor: 'bg-red-200', text: 'XRP', desc: 'Ripple is a privately-held fintech company that provides a global payment solution via its patented payment network called Ripple Network (also known as RippleNet). ', image: 'https://assets.coingecko.com/coins/images/44/standard/xrp-symbol-white-128.png?1696501442' },
        { id: 3, bgColor: 'bg-green-200', text: 'Cardano', desc: 'Cardano is a proof-of-stake blockchain network that supports decentralized applications (dApps) with a multi-asset ledger and smart contracts.', image: 'https://assets.coingecko.com/coins/images/975/standard/cardano.png?1696502090' },
    ];

    useEffect(() => {
        const slider = document.getElementById('slider');
        document.getElementById('slideLeft').addEventListener('click', () => {
            slider.scrollBy({ left: -400, behavior: 'smooth' }); // Adjust the scroll step size as needed
        });
        document.getElementById('slideRight').addEventListener('click', () => {
            slider.scrollBy({ left: 400, behavior: 'smooth' }); // Adjust the scroll step size as needed
        });
    }, []);

    return (
        <div className="relative w-full overflow-hidden mt-20">
            <div id="slider" className="flex gap-5 transition-all duration-300 overflow-x-auto pb-4 -mb-4 pt-20">
                {slides.map(slide => (
                    <FullWidthSliderItem key={slide.id}>
                        <img className='absolute right-[25px] top-[-25px] rounded-[100px]' src={slide.image} />
                        <H3>{slide.text}</H3>
                        <p>{slide.desc}</p>
                        <div className='flex justify-between mt-auto'>
                            <SecondaryButton href="https://twitter.com/cryptosocietytg" title="Donate" target="_blank">
                                Donate
                            </SecondaryButton>
                            <SecondaryButton href="https://twitter.com/cryptosocietytg" title="Details" target="_blank">
                                Details
                            </SecondaryButton>
                        </div>
                    </FullWidthSliderItem>
                ))}
            </div>
            <button id="slideLeft" className="absolute left-0 top-5 transform -translate-y-1/2 text-white p-2 text-[40px]"><FontAwesomeIcon icon={faArrowLeft} /></button>
            <button id="slideRight" className="absolute left-12 top-5 transform -translate-y-1/2 text-white p-2 text-[40px]"><FontAwesomeIcon icon={faArrowRight} /></button>
        </div>
    );
}