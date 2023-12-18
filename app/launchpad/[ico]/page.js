
import H1 from '../../components/headlines/H1';
import icos from '../data/icos.json';
import Image from 'next/image';
import PrimaryButton from '../../components/buttons/PrimaryButton';

export default function Ico({ params }) {
    const ico = icos.find(i => i.id === params.ico * 1);
    if (!ico) {
        return <p>ICO not found</p>;
    }

    return (
        <main className='landingpage py-40 px-5 text-center'>
            <div className="relative w-full md:w-[1000px] mx-auto flex-shrink-0 p-10 flex flex-col border border-[#333] border-solid rounded-[50px] text-left">

                <img className='absolute right-[50px] top-[-20px] rounded-[100px]' src={ico.image} />
                {/* <Image src={ico.image} width={300} height={100} alt={ico.text} className='absolute right-[50px] top-[-20px] rounded-[100px]' /> */}

                <H1>{ico.text}</H1>
                <p>{ico.desc}</p>

                <div className='flex gap-5 mt-10 items-center'>
                    <label>Tx Hash:</label>
                    <input type="text" placeholder="" className='formElementInputText' />
                </div>


                <PrimaryButton href={`#`} title="Send TxHash">
                    Send TxHash
                </PrimaryButton>
            </div>
            
            <div className='uppercase text-left font-bold text-[24px] md:text-[50px] leading-[24px] md:leading-[50px] w-full md:w-[1000px] mt-20'>All investments are made at your own risk. <span className='text-[#666]'>Please be mindful that this is the cryptocurrency market, where the entire value of your investment can be lost at any moment.</span></div>
        </main>
    )
}
