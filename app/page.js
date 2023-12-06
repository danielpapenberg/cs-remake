import Bubble from './components/bubble.client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegram } from "@fortawesome/free-brands-svg-icons";

export default function Home() {
    return (
        <main>
            <div className="bg"></div>
            <div className='h-[100vh]'></div>

            <Bubble />

            <div className='absolute xl:right-[20%] top-[20%] xl:top-[40%] p-5 xl:p-0'>
                <h2 className='text-[60px] xl:text-[120px] leading-none uppercase'>Empower</h2>
                <h2 className='text-[60px] xl:text-[120px] leading-none text-[#6A90BA] uppercase font-bold overflow-hidden'>
                    Your&nbsp;
                    <span className="word-slider">
                        <span className="slide">Crypto</span>
                        <span className="slide">Life</span>
                    </span>
                </h2>

                <p className='text-[18px] m-0 p-0 uppercase w-full xl:w-[840px] text-left mt-4'>
                    Crypto Society is a group of enthusiasts set up by the people for the people.
                    We aim to inform on all matters crypto by sharing our research to passionate
                    members who are encouraged to learn and share themselves.
                </p>
            </div>

            <div className='social relative xl:h-[80vh] p-5 xl:p-0'>
                <div className='xl:absolute xl:right-[20%] top-[10%] w-full xl:w-[1200px]'>
                    <h2 className='text-[60px] xl:text-[120px] m-0 p-0 leading-none uppercase'><span className='text-[#6A90BA] uppercase font-bold'>CONNECT</span> WITH US</h2>
                    <div className='flex flex-col xl:flex-row gap-5 xl:gap-20 xl:items-end '>
                        <div className='flex items-center gap-10 mt-12'>
                            <FontAwesomeIcon icon={faTelegram} className='h-[50px] xl:h-[100px]' />
                            <span className='text-[18px] uppercase'>Telegram</span>
                        </div>
                        <div className='flex items-center gap-10 mt-5'>
                            <FontAwesomeIcon icon={faTwitter} className='h-[50px] xl:h-[100px]' />
                            <span className='text-[18px] uppercase'>Twitter</span>
                        </div>
                    </div>

                    <div className='flex flex-col xl:flex-row gap-10 xl:gap-20 mt-24'>
                        <div>
                            <h2 className='text-[40px] xl:text-[100px] m-0 p-0 leading-none uppercase text-[#6A90BA] font-bold'>LEARN</h2>
                            <p>We bring awareness of the latest ground-breaking crypto projects to our community, including hosting regular AMA’s and live TA Market Overviews, thus teaching how to research and apply trading and hodling strategies.</p>
                        </div>
                        <div>
                            <h2 className='text-[40px] xl:text-[100px] m-0 p-0 leading-none uppercase text-[#6A90BA] font-bold'>APPLY</h2>
                            <p>With this applied learning the group is encouraged to research and share their findings with our members, actively getting involved, effectively benefitting the entire community.</p>
                        </div>
                        <div>
                            <h2 className='text-[40px] xl:text-[100px] m-0 p-0 leading-none uppercase text-[#6A90BA] font-bold'>SUCCEED</h2>
                            <p>Crypto is a bumpy road but with so many eyes and ears actively contributing we regularly (and) successfully recognize great buying opportunities that ultimately lead to a lucrative investment.</p>
                        </div>
                    </div>
                </div>
                <div className='hidden xl:block xl:text-[1200px] absolute z-[-1] right-[50px] top-[-500px] text-[#212121] font-serif'>&</div>
            </div>

            <div className='partner p-5'>
                <h2 className='text-[60px] xl:text-[120px] m-0 p-0 leading-none uppercase'>
                    OUR<p className='text-[#6A90BA] uppercase font-bold'>Partner</p></h2>
            </div>
            <div className='h-[5000px]'></div>
            
        </main>
    )
}
