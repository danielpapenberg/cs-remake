"use client"

import React, { useEffect } from 'react';
import FullWidthSliderItem from './FullWidthSliderItem';
import H3 from '../../components/headlines/H3';
import SecondaryButton from '../buttons/SecondaryButton';
import CountdownTimer from './Countdown'; // Adjust the import path as needed

export default function FullWidthSlider(props) {
    return (
        <div className="relative w-full overflow-hidden mt-20">
            <div className="flex gap-5 transition-all duration-300 overflow-x-auto pb-4 -mb-4 pt-20">
                {props.data.map(slide => (
                    <FullWidthSliderItem key={slide.id}>
                        {/* <Image src={`${slide.image}`} width={50} height={50} alt={slide.name} className='absolute right-[25px] top-[-25px] rounded-[100px]'/> */}

                        {
                            slide.image &&
                                <img src={`${slide.image}`} alt={slide.name} className='absolute right-[25px] top-[-25px] rounded-[100px]'/>
                        }   

                        <div className='text-[#ffa500] font-bold text-[12px]'><CountdownTimer endDate={slide.enddate} /></div>
                        <H3>{slide.name}</H3>
                        <p>{slide.short_description}</p>
                        <div className='flex justify-end mt-auto'>
                            <SecondaryButton href={`/launchpad/${slide.ico_id}`} title="Details">
                                more ...
                            </SecondaryButton>
                        </div>
                    </FullWidthSliderItem>
                ))}
            </div>
        </div>
    );
}