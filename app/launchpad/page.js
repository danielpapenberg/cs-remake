"use client"

import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import H1 from '../components/headlines/H1';
import FullWidthSlider from '../components/FullWidthSlider/FullWidthSlider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { useCustomer } from '../contexts/CustomerContext';

export default function Launchpad() {
    const [icos, setIcos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [elligable, setElligable] = useState(false);
    const customer = useCustomer();

    useEffect(() => {
        if (customer?.status === 'Valid') {
            setElligable(true);

            fetch('/api/icos?type=user&address=' + customer?.data.address, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setIcos(data);
                setIsLoading(false);
            });
        } else if (customer?.status === 'Redirect'){
            location.href = '/';
        }
    }, [customer?.status, customer?.data?.address]);

    return (
        <main className='landingpage py-40 px-5'>
            <H1 className='leading-1 font-normal'>Launchpad <span className='text-[20px] text-[#666] tracking-normal font-normal'>02</span></H1>
            <FontAwesomeIcon icon={faRocket} className='text-[#00000073] absolute right-[4%] top-[20%] md:top-[10%] text-[600px] md:text-[1800px] z-[-1] select-none' />
            {
                isLoading || !elligable ? 
					<LoadingSpinner/>
                :
                    <FullWidthSlider data={icos} />
            }
            <div className='uppercase text-left font-bold text-[24px] md:text-[50px] leading-[24px] md:leading-[50px] w-full md:w-[1000px] mt-20'>All investments are made at your own risk. <span className='text-[#666]'>Please be mindful that this is the cryptocurrency market, where the entire value of your investment can be lost at any moment.</span></div>
        </main>
    )
}
