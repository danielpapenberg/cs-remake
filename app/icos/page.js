"use client"

import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import H1 from '../components/headlines/H1';
import { Modal } from '../components/modals/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCustomer } from '../contexts/CustomerContext';

export default function ICOs() {
    const [ admin, setAdmin] = useState(false);
    const [ icos, setIcos ] = useState([]);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalStatusOpen, setIsModalStatusOpen] = useState(false);
    const [selectedIcoId, setSelectedIcoId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [toggleStatusDetails, setToggleStatusDetails] = useState({ id: null, isActive: false });
    const customer = useCustomer();

    useEffect(() => {
        if (customer?.status === 'Valid' && customer?.data.is_admin) {
            setAdmin(true);
        } else if (customer?.status === 'Redirect'){
            location.href = '/';
        }

        const fetchData = async () => {
            const response = await fetch('/api/icos');
            const data = await response.json();
            setIcos(data);
        };

        fetchData();
    }, [customer?.status, customer?.data]);

    const deleteIco = async (icoId) => {
        try {
            const response = await fetch(`/api/icos/${icoId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.success) {
                setIcos(icos.filter(ico => ico.ico_id !== icoId));
            } else {
                // Handle failure (e.g., show an error message)
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
            // Handle error (e.g., show an error message)
        }
    };

    const toggleIcoStatus = async (icoId, newStatus) => {
        try {
            const response = await fetch(`/api/icos/${icoId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isActive: newStatus }),
            });
            const data = await response.json();
            if (data.success) {
                setIcos(icos.map(ico => ico.ico_id === icoId ? { ...ico, is_active: newStatus } : ico));
            } else {
                // Handle failure
            }
        } catch (error) {
            console.error('Failed to toggle ICO status:', error);
            // Handle error
        }
    };

    const openModalDeleteWithIco = (userId) => {
        setSelectedIcoId(userId);
        setIsModalDeleteOpen(true);
    };

    const openStatusChangeModal = (icoId, isActive) => {
        setToggleStatusDetails({ id: icoId, isActive });
        setIsModalStatusOpen(true); // Assuming you're reusing the delete modal for simplicity
    };

    const filteredIcos = icos.filter(ico => {
        return Object.values(ico).some(value =>
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
                    <H1 className='leading-1 font-normal'>Icos <span className='text-[20px] text-[#666] tracking-normal font-normal'>admin</span></H1>

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
                                    <th scope="col" className={headClasses}>Ico ID</th>
                                    <th scope="col" className={headClasses}>Name</th>
                                    <th scope="col" className={headClasses}>Website</th>
                                    <th scope="col" className={headClasses}>Start Date</th>
                                    <th scope="col" className={headClasses}>End Date</th>
                                    <th scope="col" className={headClasses}>Wallet</th>
                                    <th scope="col" className={headClasses}>Wallet Chain</th>
                                    <th scope="col" className={headClasses}>Wallet Currency</th>
                                    {/* <th scope="col" className={headClasses}>Short Description</th>
                                    <th scope="col" className={headClasses}>Description</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredIcos.map((ico) => (
                                    <tr className="bg-white border-b" key={ico.ico_id}>
                                        <td className={rowClasses}>
                                            <div className='flex gap-2 items-center'>

                                                <div onClick={() => openStatusChangeModal(ico.ico_id, ico.is_active)}
                                                    className={`w-3 h-3 me-4 rounded-full cursor-pointer ${ico.is_active ? 'bg-green-600' : 'bg-red-500'}`} />

                                                <Link href={`/icos/${ico.ico_id}`} className={`${buttonClasses}`}>
                                                    <FontAwesomeIcon icon={faPencil} className='h-[14px]' />
                                                </Link>

                                                <button onClick={() => openModalDeleteWithIco(ico.ico_id)} className={`${buttonClasses}`}>
                                                    <FontAwesomeIcon icon={faTrash} className='h-[14px] text-red-500' />
                                                </button>

                                            </div>
                                        </td>
                                        <td className={rowClasses}>{ico.ico_id}</td>
                                        <td className={rowClasses}>{ico.name}</td>
                                        <td className={rowClasses}>{ico.website}</td>
                                        <td className={rowClasses}>
                                            {new Date(ico.startdate).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </td>
                                        <td className={rowClasses}>
                                            {new Date(ico.enddate).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </td>
                                        <td className={rowClasses}>{ico.wallet}</td>
                                        <td className={rowClasses}>{ico.wallet_chain}</td>
                                        <td className={rowClasses}>{ico.wallet_currency}</td>
                                        {/* <td className={rowClasses}>{ico.shortdesc}</td>
                                        <td className={rowClasses}>{ico.description}</td> */}
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
                            deleteIco(selectedIcoId);
                            setIsModalDeleteOpen(false);
                        }}
                        headline='Delete ICO'
                        subheadline={`Are you sure that you want to delete ICO ${selectedIcoId}?`}
                        button1='Delete'
                        button2='Cancel'
                    />

                    <Modal 
                        isOpen={isModalStatusOpen} 
                        onClose={() => setIsModalStatusOpen(false)} 
                        onConfirm={() => {
                            if (toggleStatusDetails.id) {
                                toggleIcoStatus(toggleStatusDetails.id, !toggleStatusDetails.isActive);
                            }
                            setIsModalStatusOpen(false);
                        }}
                        headline='Change ICO Status'
                        subheadline={`Are you sure you want to ${toggleStatusDetails.isActive ? 'deactivate' : 'activate'} ICO ${toggleStatusDetails.id}?`}
                        button1='Confirm'
                        button2='Cancel'
                    />

                </>
            :
				<LoadingSpinner/>
            }
        </main>
    )
}
