"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useWeb3Modal, useDisconnect } from '@web3modal/ethers5/react'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
    const pathname = usePathname()
    const linkStyles = 'transition-colors duration-300 ease-in-out lg:hover:text-[#5da8ff] uppercase text-[14px] cursor-pointer relative select-none';
    const linkStylesSpan = 'text-[11px] relative top-[-4px] left-[-6px] text-gray-500';
    const { open } = useWeb3Modal();
    const { address, isConnecting, isDisconnected } = useAccount();
    const [ loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(isConnecting);
    }, [isConnecting]);

    return (
        <nav>
            <ul className='flex gap-10'>
                <li className='flex items-center'>
                    <Link href="/" className={`${linkStyles}${pathname === '/' ? ' text-[#5da8ff]' : ''}`}>
                        <span className={linkStylesSpan}>01</span>
                        Home
                    </Link>
                </li>
                <li className='flex items-center'>
                    <Link href="/launchpad" className={`${linkStyles}${pathname === '/launchpad' ? ' text-[#5da8ff]' : ''}`}>
                        <span className={linkStylesSpan}>02</span>
                        Launchpad
                    </Link>
                </li>
            
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
