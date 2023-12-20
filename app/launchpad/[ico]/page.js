"use client"

import H1 from '../../components/headlines/H1';
import Image from 'next/image';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { useEffect, useState } from 'react';

export default function Ico({ params }) {
    const [ico, setIco] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        fetch('/api/ico/' + params.ico, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            setIco(data);
            setIsLoading(false); // Data fetched, loading is done
        });
    }, [params]); // The empty array ensures this effect runs once after the component mounts

    const createMarkup = htmlContent => ({ __html: htmlContent });

    return (
        <main className='landingpage py-40 px-5 text-center'>
                {
                    isLoading ? 
                        <div className="lds-ripple"><div></div><div></div></div>
                    :
                        <div className="relative w-full md:w-[1000px] mx-auto flex-shrink-0 p-10 flex flex-col border border-[#333] border-solid rounded-[50px] text-left">
                            <Image src={`/images/icos/${ico.image_url}`} width={50} height={50} alt={ico.name} className='absolute right-[25px] top-[-25px] rounded-[100px]'/>

                            <H1>{ico.name}</H1>
                            <div dangerouslySetInnerHTML={createMarkup(ico.description)}></div>
            
                            <div className='flex gap-5 mt-10 items-center'>
                                <label>Tx Hash:</label>
                                <input type="text" placeholder="" className='formElementInputText' />
                            </div>
            
                            <PrimaryButton href={`#`} title="Send TxHash">
                                Send TxHash
                            </PrimaryButton>
                        </div>
                }
            <div className='uppercase text-left font-bold text-[24px] md:text-[50px] leading-[24px] md:leading-[50px] w-full md:w-[1000px] mt-20'>All investments are made at your own risk. <span className='text-[#666]'>Please be mindful that this is the cryptocurrency market, where the entire value of your investment can be lost at any moment.</span></div>
        </main>
    )
}
