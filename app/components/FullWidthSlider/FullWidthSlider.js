"use client"

import React, { useEffect } from 'react';
import FullWidthSliderItem from './FullWidthSliderItem';
import H3 from '../../components/headlines/H3';
import SecondaryButton from '../buttons/SecondaryButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CountdownTimer from './Countdown'; // Adjust the import path as needed
import Image from 'next/image';

export default function FullWidthSlider(props) {
    useEffect(() => {
        // const slider = document.getElementById('slider');
        // document.getElementById('slideLeft').addEventListener('click', () => {
        //     slider.scrollBy({ left: -400, behavior: 'smooth' }); // Adjust the scroll step size as needed
        // });
        // document.getElementById('slideRight').addEventListener('click', () => {
        //     slider.scrollBy({ left: 400, behavior: 'smooth' }); // Adjust the scroll step size as needed
        // });
    }, []);

    return (
        <div className="relative w-full overflow-hidden mt-20">
            <div id="slider" className="flex gap-5 transition-all duration-300 overflow-x-auto pb-4 -mb-4 pt-20">
                {props.data.map(slide => (
                    <FullWidthSliderItem key={slide.id}>
                        <Image src={`/images/icos/${slide.image_url}`} width={50} height={50} alt={slide.name} className='absolute right-[25px] top-[-25px] rounded-[100px]'/>
                        <div className='text-[#ffa500] font-bold text-[12px]'><CountdownTimer endDate={slide.endDate} /></div>
                        <H3>{slide.name}</H3>
                        <p>{slide.shortdesc}</p>
                        <div className='flex justify-between mt-auto'>
                            <SecondaryButton href="https://twitter.com/cryptosocietytg" title="Donate">
                                Donate
                            </SecondaryButton>
                            <SecondaryButton href={`/launchpad/${slide.id}`} title="Details">
                                Details
                            </SecondaryButton>
                        </div>
                    </FullWidthSliderItem>
                ))}
            </div>
            {/* <button id="slideLeft" className="absolute left-0 top-5 transform -translate-y-1/2 text-white p-2 text-[40px]"><FontAwesomeIcon icon={faArrowLeft} /></button>
            <button id="slideRight" className="absolute left-12 top-5 transform -translate-y-1/2 text-white p-2 text-[40px]"><FontAwesomeIcon icon={faArrowRight} /></button> */}
        </div>
    );
}