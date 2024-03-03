"use client"

import { useEffect, useState } from 'react';
import H1 from '../components/headlines/H1';
import FullWidthSlider from '../components/FullWidthSlider/FullWidthSlider';
import { useCustomer } from '../contexts/CustomerContext';

export default function MyICOs() {
    const [elligable, setElligable] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [ icos, setIcos ] = useState([]);
    const customer = useCustomer();

    useEffect(() => {
        if (customer?.status === 'Valid') {
            setElligable(true);

            fetch('/api/myicos?address=' + customer?.data.address, {
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
            <H1 className='leading-1 font-normal'>My ICOs <span className='text-[20px] text-[#666] tracking-normal font-normal'>03</span></H1>

            <p className='text-[16px] w-full md:w-[800px]'>Below is a list of ICOs you have participated in. Should there be multiple transactions, they are included as well. Transactions cannot be altered or removed. In case of any errors, please reach out to us for assistance.</p>

            { !isLoading && elligable ? 
                <>
                    <FullWidthSlider data={icos} myicos={true} />
                </>
            :
                <div className="lds-ripple"><div></div><div></div></div>
            }
        </main>
    )
}
