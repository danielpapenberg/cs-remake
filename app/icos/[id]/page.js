"use client"

import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import H1 from '../../components/headlines/H1';
import IcoForm from './../components/IcoForm';
import { useForm } from 'react-hook-form';
import { useCustomer } from '../../contexts/CustomerContext';

export default function EditIco({ params }) {
    const id = params.id;

    const [ admin, setAdmin ] = useState(false);
    const [ ico, setIco ] = useState(null);
    const customer = useCustomer();

    useEffect(() => {
        if (customer?.status === 'Valid' && customer?.data.is_admin) {
            setAdmin(true);
        } else if (customer?.status === 'Redirect'){
            location.href = '/';
        }
    }, [customer?.status, customer?.data]);

    useEffect(() => {
        const fetchIcoData = async () => {
            if (id && admin) {
                try {
                    const response = await fetch(`/api/icos/${id}`);
                    const icoData = await response.json();
                    setIco(icoData);
                } catch (error) {
                    console.error('Failed to fetch ico data:', error);
                }
            }
        };

        fetchIcoData();
    }, [id, admin]);

    return (
        <main className='landingpage py-40 px-5'>
            {admin ? (
                <>
                    <H1 className='leading-1 font-normal'>Edit Ico <span className='text-[20px] text-[#666] tracking-normal font-normal'>admin</span></H1>
                
                    <div className='mt-20'>
                        <IcoForm useForm={useForm} ico={ico} />
                    </div>
        
                    <div className='uppercase text-left font-bold text-[24px] md:text-[50px] leading-[24px] md:leading-[50px] w-full md:w-[1000px] mt-20'>
                        This page is exclusively for administrators of Crypto Society. <span className='text-[#666]'>If you are not an authorized admin, please exit this page and notify the Crypto Society team. Thank you for your cooperation.</span>
                    </div>
                </>
            ) : (
                <LoadingSpinner/>
            )}
        </main>
    );
}
