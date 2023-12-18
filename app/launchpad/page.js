
import H1 from '../components/headlines/H1';
import FullWidthSlider from '../components/FullWidthSlider/FullWidthSlider';
import icos from './data/icos.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

export default function Launchpad() {
    return (
        <main className='landingpage py-40 px-5'>
            <H1>Launchpad</H1>

            <FontAwesomeIcon icon={faRocket} className='text-[#00000073] absolute right-[4%] top-[20%] text-[600px] md:text-[2000px] z-[-1] select-none' />

            <FullWidthSlider data={icos} />

            <div className='uppercase text-left font-bold text-[24px] md:text-[50px] leading-[24px] md:leading-[50px] w-full md:w-[1000px] mt-20'>All investments are made at your own risk. <span className='text-[#666]'>Please be mindful that this is the cryptocurrency market, where the entire value of your investment can be lost at any moment.</span></div>
        </main>
    )
}
