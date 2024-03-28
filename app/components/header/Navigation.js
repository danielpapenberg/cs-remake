"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWeb3Modal } from '@web3modal/ethers5/react';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { useCustomer } from '../../contexts/CustomerContext';

const Navigation = () => {
    const pathname = usePathname()
    const linkStyles = 'transition-colors duration-300 ease-in-out lg:hover:text-[#5da8ff] uppercase text-[14px] cursor-pointer relative select-none';
    const linkStylesSpan = 'text-[11px] relative top-[-4px] left-[-6px] text-[#666]';
    const { open } = useWeb3Modal();
    const { isConnecting, isDisconnected } = useAccount();
    const [ loading, setLoading] = useState(true);
    const [ admin, setAdmin] = useState(false);
    const [ elligable, setElligable ] = useState(false);
    const [ hasMounted, setHasMounted ] = useState(false);
    const customer = useCustomer();

    useEffect(() => {
        setLoading(isConnecting);
    }, [isConnecting]);

    useEffect(() => {
        if (customer?.status === 'Valid' && customer?.data.is_admin) {
            setAdmin(true);
        }
        if (customer?.status === 'Valid') {
            setElligable(true);
        }
        setHasMounted(true);
    }, [customer?.status, customer?.data]);

    return (
        <nav>
            <ul className='flex gap-10'>
                <li className='flex items-center'>
                    <Link href="/" className={`${linkStyles}${pathname === '/' ? ' text-[#5da8ff]' : ''}`}>
                        <span className={linkStylesSpan}>01</span>
                        Home
                    </Link>
                </li>

                {
                    hasMounted && elligable && !isConnecting && !isDisconnected && 
                        <>                        
                            <li className='flex items-center'>
                                <Link href="/launchpad" className={`${linkStyles}${pathname === '/launchpad' ? ' text-[#5da8ff]' : ''}`}>
                                    <span className={linkStylesSpan}>02</span>
                                    Launchpad
                                </Link>
                            </li>

                            <li className='flex items-center'>
                                <Link href="/myicos" className={`${linkStyles}${pathname === '/myicos' ? ' text-[#5da8ff]' : ''}`}>
                                    <span className={linkStylesSpan}>03</span>
                                    My ICOS
                                </Link>
                            </li>

                            <li className='flex items-center'>
                                <Link href="/calendar" className={`${linkStyles}${pathname === '/calendar' ? ' text-[#5da8ff]' : ''}`}>
                                    <span className={linkStylesSpan}>04</span>
                                    Calendar
                                </Link>
                            </li>
                        </>
                }

                {
                    hasMounted && admin && !isConnecting && !isDisconnected && 
                        <li className='flex items-center relative dropdown'>
                            <Link href="#" className={`${linkStyles} cursor-pointer`}>
                                <span className={linkStylesSpan}>ADMIN</span>
                                ICO
                            </Link>
                            <div className="absolute top-0 left-[-18px] pt-4 hidden text-[#fff] flex-col dropdown-content translate-y-5 h-[300px] w-[150px] text-[14px]">
                                <Link href="/transactions" className={`${pathname === '/transactions' ? ' text-[#5da8ff] px-3 hover:underline mb-4' : 'px-3 hover:underline mb-4'}`}>transactions</Link>
                                <Link href="/icos" className={`${pathname === '/icos' ? ' text-[#5da8ff] px-3 hover:underline' : 'px-3 hover:underline'}`}>icos</Link>
                                <Link href="/icos/create" className={`${pathname === '/icos/create' ? ' text-[#5da8ff] px-3 hover:underline mb-4' : 'px-3 hover:underline mb-4'}`}>create ico</Link>
                                <Link href="/users" className={`${pathname === '/users' ? ' text-[#5da8ff] px-3 hover:underline' : 'px-3 hover:underline'}`}>users</Link>
                                <Link href="/users/create" className={`${pathname === '/users/create' ? ' text-[#5da8ff] px-3 hover:underline mb-4' : 'px-3 hover:underline mb-4'}`}>create user</Link>
                                <Link href="/groups" className={`${pathname === '/groups' ? ' text-[#5da8ff] px-3 hover:underline' : 'px-3 hover:underline'}`}>groups</Link>
                                <Link href="/groups/create" className={`${pathname === '/groups/create' ? ' text-[#5da8ff] px-3 hover:underline' : 'px-3 hover:underline'}`}>create group</Link>
                            </div>
                        </li>
                }
            
                <li onClick={() => open()} className={`${linkStyles} font-bold`}>
                    {
                        loading ?
                            <>Loading ...</>
                        :
                            isDisconnected ? 
                                <>
                                    <span className='absolute left-[-12px] top-[5px] w-[6px] h-[6px] rounded-full bg-[yellow]'></span> 
                                    Login
                                </>
                            :
                                <>
                                    <span className='absolute left-[-12px] top-[5px] w-[6px] h-[6px] rounded-full bg-[green]'></span>
                                    Wallet
                                </>
                    }
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
