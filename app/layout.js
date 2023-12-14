import { Open_Sans } from 'next/font/google'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegram } from "@fortawesome/free-brands-svg-icons";
import Image from 'next/image';

const roboto_c = Open_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
});

import './globals.css'

export const metadata = {
    title: 'Crypto Society',
    description: 'Learn to invest in Crypto within a familiar environment and without any pressure. Join us on Telegram and ask us all the questions you have.',
    icons: {
        icon: '/favicon.png',
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={roboto_c.className}>
                <h1 className='w-[300px] m-5'>
                    <Image src={'/images/logos/logo-crypto-society.png'} width={300} height={100} alt="Crypto Society"  />
                </h1>
                <div className='hidden lg:block fixed top-[32px] right-[40px] right-lg-[100px]'>
                    <ul className='flex gap-10'>
                        <li>
                            <a href="/" className="transition-colors duration-300 ease-in-out lg:hover:text-[#5da8ff] uppercase text-[14px]">
                                <span className='text-[11px] relative top-[-4px] left-[-6px] text-gray-500'>01</span>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition-colors duration-300 ease-in-out lg:hover:text-[#5da8ff] uppercase text-[14px]">
                                <span className='text-[11px] relative top-[-4px] left-[-6px] text-gray-500'>02</span>
                                SWAP
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition-colors duration-300 ease-in-out lg:hover:text-[#5da8ff] uppercase text-[14px]">
                                <span className='text-[11px] relative top-[-4px] left-[-6px] text-gray-500'>SOON</span>
                                VIP
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition-colors duration-300 ease-in-out lg:hover:text-[#5da8ff] uppercase text-[14px]">
                                <span className='text-[11px] relative top-[-4px] left-[-6px] text-gray-500'>SOON</span>
                                Login
                            </a>
                        </li>
                    </ul>
                </div>
                {children}
                <footer className='mt-40 pb-5 text-[#6a90ba70] uppercase'>
                    <div className='flex flex-col justify-center items-center gap-10'>
                        <div className='flex gap-5'>
                            <a href="https://twitter.com/cryptosocietytg" target="_blank" className='transition-colors duration-300 ease-in-out lg:hover:text-[#ffffff]'><FontAwesomeIcon icon={faTelegram} className='h-[25px] lg:h-[40px]' /></a>
                            <a href="https://t.me/cryptosocietyy" target="_blank" className='transition-colors duration-300 ease-in-out lg:hover:text-[#ffffff]'><FontAwesomeIcon icon={faTwitter} className='h-[25px] lg:h-[40px]' /></a>
                        </div>

                        {/* <div>
                            <ul className='flex gap-5'>
                                <li><a href="#" className='transition-colors duration-300 ease-in-out lg:hover:text-[#ffffff]'>Contact us</a></li>
                                <li><a href="#" className='transition-colors duration-300 ease-in-out lg:hover:text-[#ffffff]'>Our Services</a></li>
                                <li><a href="#" className='transition-colors duration-300 ease-in-out lg:hover:text-[#ffffff]'>Privacy Policy</a></li>
                                <li><a href="#" className='transition-colors duration-300 ease-in-out lg:hover:text-[#ffffff]'>Terms & Conditions</a></li>
                                <li><a href="#" className='transition-colors duration-300 ease-in-out lg:hover:text-[#ffffff]'>Career</a></li>
                            </ul>
                        </div> */}

                        <div>
                            Crypto Society © 2023
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    )
}
