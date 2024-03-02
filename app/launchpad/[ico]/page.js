"use client"

import H1 from '../../components/headlines/H1';
import H2 from '../../components/headlines/H2';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCustomer } from '../../contexts/CustomerContext';
import { useForm } from 'react-hook-form';
import LaunchForm from './../components/LaunchForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from '@fortawesome/free-solid-svg-icons';

export default function Ico({ params }) {
    const [ico, setIco] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const customer = useCustomer();

    useEffect(() => {
        if (customer?.status === 'Valid') {
            fetch('/api/icos/' + params.ico + '?type=user&address=' + customer?.data.address, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'Redirect'){
                    location.href = '/';
                }
                setIco(data);
                setIsLoading(false);
            });
        } else if (customer?.status === 'Redirect'){
            location.href = '/';
        }
    }, [params, customer?.status, customer?.data?.address]); 

    const createMarkup = htmlContent => ({ __html: htmlContent });

    return (
        <main className='landingpage py-40 px-5'>
                {
                    isLoading ? 
                        <div className="lds-ripple"><div></div><div></div></div>
                    :
                        <div className='flex flex-col 2xl:flex-row gap-20'>
                            <div className="relative w-full md:w-[1000px] flex-shrink-0 p-10 flex flex-col border border-[#333] border-solid rounded-[50px] text-left">

                                {/* <Image src={`${ico.image}`} width={50} height={50} alt={ico.name} className='absolute right-[25px] top-[-25px] rounded-[100px]'/> */}
                                <img src={`${ico.image}`} alt={ico.name} className='absolute right-[25px] top-[-25px] rounded-[100px]'/>

                                <H1>{ico.name}</H1>

                                {
                                    ico.website && 
                                        <div className='flex gap-5 mb-4'>
                                            <Link href={ico.website} target='_blank' className='h-[50px] flex gap-2 px-5 items-center justify-center rounded-[100px] border border-[#333] border-solid hover:bg-slate-800 hover:border-none uppercase'>
                                                WEB <FontAwesomeIcon icon={faLink} className='h-[14px]' />
                                            </Link>
                                        </div>
                                } 

                                <div className="longdesc">
                                    <div dangerouslySetInnerHTML={createMarkup(ico.description)}></div>
                                </div>
                            </div>
                            <div className='mt-12 w-full md:w-[900px]'>
                                <H2 className='leading-1 font-normal'>Participate</H2>
                                <p className='mb-4 text-[24px]'><span className='text-green-500 font-bold'>Congratulations!</span> Your are eligible to join {ico.name}</p>
                                <p className='mb-8 italic'>
                                    To participate in the Initial Coin Offering (ICO), we require you to provide some details. Once you have acquainted yourself with the ICO details and decide to proceed, 
                                    initiate a transaction for the desired amount. Following a successful transaction, please input the transaction hash in the provided form. 
                                    Additionally, specify the amount in <strong>{ico.wallet_currency}</strong> and provide the wallet address where the tokens will be sent upon release. 
                                    <strong> Read the disclaimer at the bottom.</strong>
                                </p>
                                
                                <p className='mb-4'>
                                    Min. Allocation: <strong>{ico.min_allocation} {ico.wallet_currency}</strong> 
                                </p>
                                <p className='mb-4'>
                                    Max. Allocation: <strong>{ico.max_allocation} {ico.wallet_currency}</strong> 
                                </p>
                                <p className='mb-8'>
                                    Send <strong>{ico.wallet_currency}</strong> to <strong>{ico.wallet}</strong>
                                </p>

                                <LaunchForm useForm={useForm} ico={ico} user={customer?.data} />

                            </div>
                        </div>
                }
            <div className='uppercase text-left font-bold text-[24px] md:text-[50px] leading-[24px] md:leading-[50px] w-full md:w-[1000px] mt-20'>All investments are made at your own risk. <span className='text-[#666]'>Please be mindful that this is the cryptocurrency market, where the entire value of your investment can be lost at any moment.</span></div>
        </main>
    )
}
