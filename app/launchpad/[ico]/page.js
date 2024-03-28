"use client"

import H1 from '../../components/headlines/H1';
import H2 from '../../components/headlines/H2';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCustomer } from '../../contexts/CustomerContext';
import { useForm } from 'react-hook-form';
import LaunchForm from './../components/LaunchForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faLink } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faTelegram, faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import CountdownTimer from '../../components/FullWidthSlider/Countdown';
import { format } from 'date-fns';

export default function Ico({ params }) {
    const [ico, setIco] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [available, setAvailable] = useState(false); // Loading state
    const customer = useCustomer();

    const date = ico.tge ? new Date(ico.tge) : null;

    let formattedDate = '';

    if (date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();

        // Check if the time is 00:00, then format without time.
        if (hours === 0 && minutes === 0) {
            formattedDate = format(date, 'MMMM dd, yyyy');
        }
        // If the time is 11:11, format to show only month and year.
        else if (hours === 11 && minutes === 11) {
            formattedDate = format(date, 'MMMM yyyy');
        }
        // Otherwise, format with the full date and time.
        else {
            formattedDate = format(date, 'MMMM dd, yyyy, hh:mm a');
        }
    }

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

                // Check if endDate is before today's date
                const now = new Date(); // Current date and time
                const icoEndDate = new Date(data.enddate);

                if (icoEndDate > now) {
                    console.log('ICO has ended.'); // Perform your logic here when ICO has ended
                    setAvailable(true)
                }
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
                                {
                                    ico.image && 
                                        <img src={`${ico.image}`} alt={ico.name} className='absolute right-[45px] top-[-45px] rounded-[100px] h-[80px]'/>
                                }

                                <div className='text-[#ffa500] font-bold text-[16px]'><CountdownTimer endDate={ico.enddate} /></div>

                                <H1>{ico.name}</H1>

                                <div className='flex gap-8 mb-4 items-center ms-2'>
                                    {
                                        ico.website && 
                                            <div className='flex gap-5'>
                                                <Link href={ico.website} target='_blank' className='hover:text-[#6a90ba]' title="Website">
                                                    <FontAwesomeIcon icon={faLink} className='h-[34px]' />
                                                </Link>
                                            </div>
                                    }

                                    {
                                        ico.twitter && 
                                            <div className='flex gap-5'>
                                                <Link href={ico.twitter} target='_blank' className='hover:text-[#6a90ba]' title="Twitter">
                                                    <FontAwesomeIcon icon={faTwitter} className='h-[44px]' />
                                                </Link>
                                            </div>
                                    }

                                    {
                                        ico.telegram && 
                                            <div className='flex gap-5'>
                                                <Link href={ico.telegram} target='_blank' className='hover:text-[#6a90ba]' title="Telegram">
                                                    <FontAwesomeIcon icon={faTelegram} className='h-[40px]' />
                                                </Link>
                                            </div>
                                    }

                                    {
                                        ico.tokenomics && 
                                            <div className='flex gap-5'>
                                                <Link href={ico.tokenomics} target='_blank' className='hover:text-[#6a90ba]' title="Tokenomics">
                                                    <FontAwesomeIcon icon={faChartSimple} className='h-[40px]' />
                                                </Link>
                                            </div>
                                    }

                                    {
                                        ico.pitchdeck && 
                                            <div className='flex gap-5'>
                                                <Link href={ico.pitchdeck} target='_blank' className='hover:text-[#6a90ba]' title="Pitchdeck">
                                                    <FontAwesomeIcon icon={faStackOverflow} className='h-[40px]' />
                                                </Link>
                                            </div>
                                    }
                                </div>

                                {
                                    ico.tge && 
                                        <div className="flex gap-5">
                                            <strong>TGE: </strong> {formattedDate}
                                        </div>
                                }

                                {
                                    ico.vesting && 
                                        <div className='flex gap-5'>
                                            <strong>Vesting: </strong>{ ico.vesting }
                                        </div>
                                } 

                                <div className="longdesc">
                                    <div dangerouslySetInnerHTML={createMarkup(ico.description)}></div>
                                </div>
                            </div>
                            <div className='mt-16 w-full md:w-[900px]'>

                                <H2 className='leading-1 font-normal'>Participate</H2>

                                {/* <p className='mb-4 text-[24px]'><span className='text-green-500 font-bold'>Congratulations!</span> Your are eligible to join {ico.name} ICO</p> */}

                                {/* <p className='mb-8 italic'>
                                    To participate in the Initial Coin Offering (ICO), we require you to provide some details. Once you have acquainted yourself with the ICO details and decide to proceed, 
                                    initiate a transaction for the desired amount. Following a successful transaction, please input the transaction hash in the provided form. 
                                    Additionally, specify the amount in <strong>{ico.wallet_currency}</strong> and provide the wallet address where the tokens will be sent upon release. 
                                    <strong> Read the disclaimer at the bottom.</strong>
                                </p> */}

                                {
                                    available ?
                                        <>
                                            <p className='mb-4'>
                                                Min. Allocation: 
                                                {
                                                    ico.min_allocation > 0 ?
                                                        <strong> {ico.min_allocation} {ico.wallet_currency}</strong> 
                                                    :
                                                        <strong> ---</strong> 
                                                }
                                            </p>
                                            <p className='mb-4'>
                                                Max. Allocation: 
                                                {
                                                    ico.max_allocation > 0 ?
                                                        <strong> {ico.max_allocation} {ico.wallet_currency}</strong> 
                                                    :
                                                        <strong> ---</strong> 
                                                }
                                                
                                            </p>
                                            <p className='mb-8'>
                                                Send <strong>{ico.wallet_currency} ({ico.wallet_chain.toUpperCase()})</strong> to <strong>{ico.wallet}</strong>
                                            </p>

                                            <LaunchForm useForm={useForm} ico={ico} user={customer?.data} />
                                        </>
                                    :
                                        <h3 className='text-[20px] uppercase'><span className='text-green-500 font-bold'>Thanks for your interest!</span> This Ico has ended.</h3>
                                }
                            </div>
                        </div>
                }
            <div className='uppercase text-left font-bold text-[24px] md:text-[50px] leading-[24px] md:leading-[50px] w-full md:w-[1000px] mt-20'>All investments are made at your own risk. <span className='text-[#666]'>Please be mindful that this is the cryptocurrency market, where the entire value of your investment can be lost at any moment.</span></div>
        </main>
    )
}
