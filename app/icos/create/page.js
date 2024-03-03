"use client"

import { useEffect, useState } from 'react';
import H1 from '../../components/headlines/H1';
import IcoForm from './../components/IcoForm'; // Adjust the path according to your project structure
import { useForm } from 'react-hook-form'; // Import useForm
import { useCustomer } from '../../contexts/CustomerContext';

export default function CreateIco() {
    const [ admin, setAdmin] = useState(false);
    const customer = useCustomer();

    useEffect(() => {
        if (customer?.status === 'Valid' && customer?.data.is_admin) {
            setAdmin(true);
        } else if (customer?.status === 'Redirect'){
            location.href = '/';
        }
    }, [customer?.status, customer?.data]);

    return (
        <main className='landingpage py-40 px-5'>
            { admin ? 
                <>
                    <H1 className='leading-1 font-normal'>Create Ico <span className='text-[20px] text-[#666] tracking-normal font-normal'>admin</span></H1>
                
                    <div className='mt-20'>
                        <IcoForm useForm={useForm} />
                    </div>
        
                    <div className='uppercase text-left font-bold text-[24px] md:text-[50px] leading-[24px] md:leading-[50px] w-full md:w-[1000px] mt-20'>
                        This page is exclusively for administrators of Crypto Society. <span className='text-[#666]'>If you are not an authorized admin, please exit this page and notify the Crypto Society team. Thank you for your cooperation.</span>
                    </div>
                </>
            :
                <div className="lds-ripple"><div></div><div></div></div>
            }
        </main>
    )
}