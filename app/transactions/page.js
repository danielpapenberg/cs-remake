"use client"

import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import H1 from '../components/headlines/H1';
import { Modal } from '../components/modals/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCustomer } from '../contexts/CustomerContext';

export default function Transactions() {
    const [ admin, setAdmin] = useState(false);
    const [ transactions, setTransactions ] = useState([]);
    const [ isModalDeleteOpen, setIsModalDeleteOpen ] = useState(false);
    const [ selectedTransactionId, setSelectedTransactionId ] = useState(null);
    const [ searchTerm, setSearchTerm ] = useState('');
    const customer = useCustomer();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/transactions');
            const data = await response.json();
            setTransactions(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (customer?.status === 'Valid' && customer?.data.is_admin) {
            setAdmin(true);
        } else if (customer?.status === 'Redirect'){
            location.href = '/';
        }
    }, [customer?.status, customer?.data]);

    const deleteTransaction = async (participationId) => {
        try {
            const response = await fetch(`/api/transactions/${participationId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.success) {
                setTransactions(transactions.filter(transactions => transactions.participation_id !== participationId));
            }
        } catch (error) {
            console.error('Failed to delete Transaction:', error);
        }
    };

    const openModalDeleteWithTransaction = (participationId) => {
        setSelectedTransactionId(participationId);
        setIsModalDeleteOpen(true);
    };

    const filteredTransactions = transactions.filter(transaction => {
        return Object.values(transaction).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const buttonClasses = `border border-slate-300 w-8 h-8 rounded-full flex justify-center items-center hover:bg-gray-100`;
    const headClasses = `py-3 px-6`;
    const rowClasses = `py-2 px-6 text-[12px]`;

    return (
        <main className='landingpage py-40 px-5'>
            { admin ? 
                <>
                    <H1 className='leading-1 font-normal'>Transactions <span className='text-[20px] text-[#666] tracking-normal font-normal'>admin</span></H1>

                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input rounded mb-5 p-2 text-black text-[14px] w-[264px]"
                        />
                    </div>

                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 table-striped">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className={headClasses}></th>
                                    <th scope="col" className={headClasses}>Participation ID</th>
                                    <th scope="col" className={headClasses}>TxHash</th>
                                    <th scope="col" className={headClasses}>Amount</th>
                                    <th scope="col" className={headClasses}>Ico</th>
                                    <th scope="col" className={headClasses}>Receiving Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map((transaction) => (
                                    <tr className="bg-white border-b" key={transaction.participation_id}>
                                        <td className={rowClasses}>
                                            <div className='flex gap-2'>
                                                <Link href={`/transactions/${transaction.participation_id}`} className={`${buttonClasses}`}>
                                                    <FontAwesomeIcon icon={faPencil} className='h-[14px]' />
                                                </Link>
                                                <button onClick={() => openModalDeleteWithTransaction(transaction.participation_id)} className={`${buttonClasses}`}>
                                                    <FontAwesomeIcon icon={faTrash} className='h-[14px] text-red-500' />
                                                </button>
                                            </div>
                                        </td>
                                        <td className={rowClasses}>{transaction.participation_id}</td>
                                        <td className={rowClasses}>
                                            <Link href={`${transaction.wallet_chain === 'binance_chain' ? 'https://bscscan.com/tx/' : 'https://etherscan.io/tx/'}${transaction.txhash}`} target='_blank'>
                                                <span className='text-blue-500 underline'>{`${transaction.txhash}`}</span>
                                            </Link>
                                        </td>
                                        <td className={rowClasses}>
                                        {
                                            new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            }).format(transaction.amount)
                                        }
                                        </td>
                                        <td className={rowClasses}>{transaction.ico_name}</td>
                                        <td className={rowClasses}>{transaction.receiving_address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
        
                    <div className='uppercase text-left font-bold text-[24px] md:text-[50px] leading-[24px] md:leading-[50px] w-full md:w-[1000px] mt-20'>
                        This page is exclusively for administrators of Crypto Society. <span className='text-[#666]'>If you are not an authorized admin, please exit this page and notify the Crypto Society team. Thank you for your cooperation.</span>
                    </div>

                    <Modal 
                        isOpen={isModalDeleteOpen} 
                        onClose={() => setIsModalDeleteOpen(false)} 
                        onConfirm={() => {
                            deleteTransaction(selectedTransactionId);
                            setIsModalDeleteOpen(false);
                        }}
                        headline='Delete Transaction'
                        subheadline={`Are you sure that you want to delete the transaction ${selectedTransactionId}?`}
                        button1='Delete'
                        button2='Cancel'
                    />
                </>
            :
				<LoadingSpinner/>
            }
        </main>
    )
}
