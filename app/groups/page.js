"use client"

import { useEffect, useState } from 'react';
import H1 from '../components/headlines/H1';
import { Modal } from '../components/modals/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCustomer } from '../contexts/CustomerContext';

export default function Groups() {
    const [ admin, setAdmin] = useState(false);
    const [ groups, setGroups ] = useState([]);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const customer = useCustomer();

    useEffect(() => {
        if (customer?.status === 'Valid' && customer?.data.is_admin) {
            setAdmin(true);
        } else if (customer?.status === 'Redirect'){
            location.href = '/';
        }

        const fetchData = async () => {
            const response = await fetch('/api/groups');
            const data = await response.json();
            setGroups(data);
        };

        fetchData();
    }, [customer?.status, customer?.data]);

    const deleteGroup = async (groupId) => {
        try {
            const response = await fetch(`/api/groups/delete/${groupId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.success) {
                setGroups(groups.filter(group => group.group_id !== groupId));
            } else {
                // Handle failure (e.g., show an error message)
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
            // Handle error (e.g., show an error message)
        }
    };

    const openModalDeleteWithGroup = (userId) => {
        setSelectedGroupId(userId);
        setIsModalDeleteOpen(true);
    };

    const buttonClasses = `border border-slate-300 w-8 h-8 rounded-full flex justify-center items-center hover:bg-gray-100`;
    const headClasses = `py-3 px-6`;
    const rowClasses = `py-2 px-6 text-[12px]`;

    return (
        <main className='landingpage py-40 px-5'>
            { admin ? 
                <>
                    <H1 className='leading-1 font-normal'>Groups <span className='text-[20px] text-[#666] tracking-normal font-normal'>admin</span></H1>

                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 table-striped">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className={headClasses}></th>
                                    <th scope="col" className={headClasses}>Group ID</th>
                                    <th scope="col" className={headClasses}>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groups.map((group) => (
                                    <tr className="bg-white border-b" key={group.group_id}>
                                        <td className={rowClasses}>
                                            <div className='flex gap-2'>
                                                <Link href={`/groups/${group.group_id}`} className={`${buttonClasses}`}>
                                                    <FontAwesomeIcon icon={faPencil} className='h-[14px]' />
                                                </Link>
                                                <button onClick={() => openModalDeleteWithGroup(group.group_id)} className={`${buttonClasses}`}>
                                                    <FontAwesomeIcon icon={faTrash} className='h-[14px] text-red-500' />
                                                </button>
                                            </div>
                                        </td>
                                        <td className={rowClasses}>{group.group_id}</td>
                                        <td className={rowClasses}>{group.name}</td>
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
                            deleteGroup(selectedGroupId);
                            setIsModalDeleteOpen(false);
                        }}
                        headline='Delete Group'
                        subheadline={`Are you sure that you want to delete the group ${selectedGroupId}?`}
                        button1='Delete'
                        button2='Cancel'
                    />
                </>
            :
                <div className="lds-ripple"><div></div><div></div></div>
            }
        </main>
    )
}
