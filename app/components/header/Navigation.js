"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWeb3Modal } from '@web3modal/ethers5/react';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

const Navigation = () => {
    const pathname = usePathname()
    const linkStyles = 'transition-colors duration-300 ease-in-out lg:hover:text-[#5da8ff] uppercase text-[14px] cursor-pointer relative select-none';
    const linkStylesSpan = 'text-[11px] relative top-[-4px] left-[-6px] text-[#666]';
    const { open } = useWeb3Modal();
    const { address, isConnecting, isDisconnected } = useAccount();
    const [ loading, setLoading] = useState(true);
    const [ admin, setAdmin] = useState(false);

    useEffect(() => {
        setLoading(isConnecting);
    }, [isConnecting]);

    useEffect(() => {
        const checkEligibility = async () => {
            if (address) {
                const response = await fetch(`/api/admins/${address}`);
                const data = await response.json();
                if (data.status === 'Valid') {
                    setAdmin(true);
                }
            }
        };
    
        checkEligibility();
    }, [address]);

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

                {
                    admin && !isDisconnected && 
                        <li className='flex items-center'>
                            <Link href="/createico" className={`${linkStyles}${pathname === '/createico' ? ' text-[#5da8ff]' : ''}`}>
                                <span className={linkStylesSpan}>admin</span>
                                Create ICO
                            </Link>
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
