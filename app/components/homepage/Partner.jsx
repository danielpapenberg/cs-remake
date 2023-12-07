import Image from 'next/image';
import partner from './data/partner.json';

export default function Partner() {
    return (
        <>
            <h2 className='text-[60px] xl:text-[120px] m-0 p-0 leading-none uppercase text-center'>
                OUR<p className='text-[#6A90BA] uppercase font-bold'>Partner</p>
            </h2>
                    
            <ul className="flex gap-5 md:gap-10 my-10 md:my-20 md:pl-20 flex-wrap justify-center md:justify-center">
                { partner.map((item) => {
                    const { id, image, title } = item;
                    return (
                        <li key={id} className="text-center flex align-middle shrink-0">
                            <Image src={'/images/logos/partner/' + image} width={150} height={50} alt={title} className="object-contain" />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}