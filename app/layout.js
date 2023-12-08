import { Open_Sans } from 'next/font/google'

const roboto_c = Open_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
});

import './globals.css'

export const metadata = {
    title: 'Crypto Society',
    description: 'Learn to invest in Crypto within a familiar environment and without any pressure. Join us on Telegram and ask us all the questions you have.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={roboto_c.className}>
                <img className='h-[50px] fixed top-[20px] left-[20px]' alt="crypto society" src="https://crypto-society.com/images/logo-crypto-society.png" />
                <div className='hidden xl:block fixed top-[32px] right-[40px] right-lg-[100px]'>
                    <ul className='flex gap-10'>
                        <li>
                            <a href="#" className="transition-colors duration-300 ease-in-out xl:hover:text-[#5da8ff] uppercase text-[14px]">
                                <span className='text-[11px] relative top-[-4px] left-[-6px] text-gray-500'>01</span>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition-colors duration-300 ease-in-out xl:hover:text-[#5da8ff] uppercase text-[14px]">
                                <span className='text-[11px] relative top-[-4px] left-[-6px] text-gray-500'>02</span>
                                VIP
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition-colors duration-300 ease-in-out xl:hover:text-[#5da8ff] uppercase text-[14px]">
                                <span className='text-[11px] relative top-[-4px] left-[-6px] text-gray-500'>03</span>
                                Login
                            </a>
                        </li>
                    </ul>
                </div>
                {children}
            </body>
        </html>
    )
}
