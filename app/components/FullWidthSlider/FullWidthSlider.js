"use client"

import React from 'react';
import FullWidthSliderItem from './FullWidthSliderItem';
import H3 from '../../components/headlines/H3';
import SecondaryButton from '../buttons/SecondaryButton';
import CountdownTimer from './Countdown';
import Link from 'next/link';

export default function FullWidthSlider(props) {
    return (
        <div className="relative w-full overflow-hidden mt-20">
            <div className="flex gap-5 transition-all duration-300 overflow-x-auto pb-4 -mb-4 pt-10">
                {props.data.map(slide => (
                    <FullWidthSliderItem key={slide.id}>
                        {/* <Image src={`${slide.image}`} width={50} height={50} alt={slide.name} className='absolute right-[25px] top-[-25px] rounded-[100px]'/> */}

                        {
                            slide.image &&
                                <img src={`${slide.image}`} alt={slide.name} className='absolute right-[25px] top-[-25px] rounded-[100px] h-[70px] max-w-[150px]'/>
                        }   

                        {
                            props.myicos === true ?
                                <>
                                    <H3>{slide.name}</H3>
                                    <div className='mt-4'>
                                        <p>
                                            <Link href={`${slide.wallet_chain === 'binance_chain' ? 'https://bscscan.com/tx/' : 'https://etherscan.io/tx/'}${slide.txhash}`} target='_blank'>
                                                Tx Hash: <span className='text-blue-500 underline'>{`${slide.txhash.slice(0, 5)}...${slide.txhash.slice(-5)}`}</span>
                                            </Link>
                                        </p>
                                        <p>Amount: {slide.amount} $</p>
                                        <p>
                                            Date: {new Date(slide.participation_date).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </p>    
                                        <div className='flex justify-end mt-auto'>
                                            <SecondaryButton href={`/launchpad/${slide.ico_id}`} title="Details">
                                                view
                                            </SecondaryButton>
                                        </div>
                                    </div>
                                </>
                            :
                                <>
                                    <div className='text-[#ffa500] font-bold text-[12px]'><CountdownTimer endDate={slide.enddate} /></div>
                                    <H3>{slide.name}</H3>
                                    <p>{slide.short_description}</p>
                                    <div className='flex justify-end mt-auto'>
                                        <SecondaryButton href={`/launchpad/${slide.ico_id}`} title="Details">
                                            details
                                        </SecondaryButton>
                                    </div>
                                </>
                        }
                    </FullWidthSliderItem>
                ))}
            </div>
        </div>
    );
}