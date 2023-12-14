import Image from 'next/image';
import partner from './data/partner.json';
import H2 from '../../components/headlines/H2';

export default function Partner() {
    return (
        <>
            <H2 className='text-center'>OUR<p className='text-[#6A90BA] uppercase font-bold'>Partner</p></H2>

            <ul className="flex gap-5 md:gap-10 mt-10 flex-wrap justify-center md:justify-center">
                { partner.map((item) => {
                    const { id, image, title } = item;
                    return (
                        <li key={id} className="text-center flex align-middle shrink-0">
                            <Image src={'/images/logos/partner/' + image} width={150} height={50} alt={title} className="object-contain w50" />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}