"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Navigation = () => {
    const pathname = usePathname()
    const linkStyles = 'transition-colors duration-300 ease-in-out lg:hover:text-[#5da8ff] uppercase text-[14px]';
    const linkStylesSpan = 'text-[11px] relative top-[-4px] left-[-6px] text-gray-500'

    return (
        <nav>
            <ul className='flex gap-10'>
                <li>
                    <Link href="/" className={`${linkStyles}${pathname === '/' ? ' text-[#5da8ff]' : ''}`}>
                        <span className={linkStylesSpan}>01</span>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/launchpad" className={`${linkStyles}${pathname === '/launchpad' ? ' text-[#5da8ff]' : ''}`}>
                        <span className='text-[11px] relative top-[-4px] left-[-6px] text-gray-500'>02</span>
                        Launchpad
                    </Link>
                </li>
                <li>
                    <Link href="/swap" className={`${linkStyles}${pathname === '/swap' ? ' text-[#5da8ff]' : ''}`}>
                        <span className='text-[11px] relative top-[-4px] left-[-6px] text-gray-500'>02</span>
                        SWAP
                    </Link>
                </li>
                <li>
                    <Link href="/" className={`${linkStyles}${pathname === '/xxx' ? ' text-[#5da8ff]' : ''}`}>
                        <span className='text-[11px] relative top-[-4px] left-[-6px] text-gray-500'>SOON</span>
                        VIP
                    </Link>
                </li>
                <li>
                    <Link href="/" className={`${linkStyles}${pathname === '/xxx' ? ' text-[#5da8ff]' : ''}`}>
                        <span className='text-[11px] relative top-[-4px] left-[-6px] text-gray-500'>SOON</span>
                        Login
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
