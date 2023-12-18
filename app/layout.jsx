import { Open_Sans } from 'next/font/google'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegram } from "@fortawesome/free-brands-svg-icons";
import Image from 'next/image';
import Navigation from './components/header/Navigation';
import Link from 'next/link';
import { Web3Modal } from "./context/Web3Modal";

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
                <Web3Modal>
                    <h1 className='w-[300px] m-5 fixed'>
                        <Link href="/">
                            <Image src={'/images/logos/logo-crypto-society.png'} width={300} height={100} alt="Crypto Society"  />
                        </Link>
                    </h1>
                    <div className='hidden lg:block fixed top-[32px] right-[40px] right-lg-[100px]'>
                        <Navigation />
                    </div>
                    {children}
                    <footer className='mt-40 pb-5 text-[#6a90ba70] uppercase'>
                        <div className='flex flex-col justify-center items-center gap-10'>
                            <div className='flex gap-5'>
                                <a href="https://twitter.com/cryptosocietytg" title="Telegram" target="_blank" className='transition-colors duration-300 ease-in-out lg:hover:text-[#ffffff]'><FontAwesomeIcon icon={faTelegram} className='h-[25px] lg:h-[40px]' /></a>
                                <a href="https://t.me/cryptosocietyy" title="Twitter" target="_blank" className='transition-colors duration-300 ease-in-out lg:hover:text-[#ffffff]'><FontAwesomeIcon icon={faTwitter} className='h-[25px] lg:h-[40px]' /></a>
                            </div>

                            <div>
                                Crypto Society © 2023
                            </div>
                        </div>
                    </footer>
                </Web3Modal>
            </body>
        </html>
    )
}
