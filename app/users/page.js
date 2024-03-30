"use client"

import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import H1 from '../components/headlines/H1';
import { Modal } from '../components/modals/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faHandPaper } from '@fortawesome/free-solid-svg-icons';
import { useCustomer } from '../contexts/CustomerContext';

export default function Users() {
    const [ admin, setAdmin] = useState(false);
    const [ users, setUsers ] = useState([]);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalBlockedOpen, setIsModalBlockedOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const customer = useCustomer();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/users');
            const data = await response.json();
            console.log(data);
            setUsers(data);
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

    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`/api/users/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.success) {
                setUsers(users.filter(user => user.user_id !== userId));
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const blockUser = async (userId) => {
        // API call to backend endpoint for deleting a user
        try {
            const response = await fetch(`/api/users/block/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.success) {
                location.reload();
            } else {
                // Handle failure (e.g., show an error message)
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
            // Handle error (e.g., show an error message)
        }
    };

    const openModalDeleteWithUser = (userId) => {
        setSelectedUserId(userId);
        setIsModalDeleteOpen(true);
    };

    const openModalBlockedWithUser = (userId) => {
        setSelectedUserId(userId);
        setIsModalBlockedOpen(true);
    };

    const filteredUsers = users.filter(user => {
        return Object.values(user).some(value =>
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
                    <H1 className='leading-1 font-normal'>Users <span className='text-[20px] text-[#666] tracking-normal font-normal'>admin</span></H1>

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
                                    <th scope="col" className={headClasses}>User ID</th>
                                    <th scope="col" className={headClasses}>Name</th>
                                    <th scope="col" className={headClasses}>Email</th>
                                    <th scope="col" className={headClasses}>Address</th>
                                    <th scope="col" className={headClasses}>Group</th>
                                    <th scope="col" className={headClasses}>Telegram Handle</th>
                                    <th scope="col" className={headClasses}>Twitter Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr className="bg-white border-b" key={user.user_id}>
                                        <td className={rowClasses}>
                                            <div className='flex gap-2'>
                                                <Link href={`/users/${user.user_id}`} className={`${buttonClasses}`}>
                                                    <FontAwesomeIcon icon={faPencil} className='h-[14px]' />
                                                </Link>
                                                <button onClick={() => openModalBlockedWithUser(user.user_id)} className={`${buttonClasses}`}>
                                                    <FontAwesomeIcon icon={faHandPaper} className={`${user.is_blocked ? ' h-[14px] text-yellow-500' : 'h-[14px]'}`} />
                                                </button>
                                                <button onClick={() => openModalDeleteWithUser(user.user_id)} className={`${buttonClasses}`}>
                                                    <FontAwesomeIcon icon={faTrash} className='h-[14px] text-red-500' />
                                                </button>
                                            </div>
                                        </td>
                                        <td className={rowClasses}>{user.user_id}</td>
                                        <td className={rowClasses}>{user.name}</td>
                                        <td className={rowClasses}>{user.email}</td>
                                        <td className={rowClasses}>{user.address}</td>
                                        <td className={rowClasses}>{user.group_name ? user.group_name : '---'}</td>
                                        <td className={rowClasses}>{user.telegram_handle}</td>
                                        <td className={rowClasses}>{user.twitter_handle}</td>
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
                            deleteUser(selectedUserId);
                            setIsModalDeleteOpen(false);
                        }}
                        headline='Delete User'
                        subheadline={`Are you sure that you want to delete the user ${selectedUserId}?`}
                        button1='Delete'
                        button2='Cancel'
                    />

                    <Modal 
                        isOpen={isModalBlockedOpen} 
                        onClose={() => setIsModalBlockedOpen(false)} 
                        onConfirm={() => {
                            blockUser(selectedUserId);
                            setIsModalBlockedOpen(false);
                        }}
                        headline='Block or Unblock User'
                        subheadline={`Are you sure that you want to block or unblock the user ${selectedUserId}?`}
                        button1='Block / Unblock'
                        button2='Cancel'
                    />
                </>
            :
				<LoadingSpinner/>
            }
        </main>
    )
}
