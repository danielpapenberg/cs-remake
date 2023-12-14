import BlackWhole from './components/blackwhole';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegram } from "@fortawesome/free-brands-svg-icons";
import Partner from './components/homepage/Partner';

export default function Home() {
    return (
        <main>
            <div className="bg"></div>
            <div className='h-[100vh]'></div>
            
            <div className='hidden xl:block'>
                <BlackWhole />
            </div>

            <div className='absolute xl:right-[20%] top-[20%] xl:top-[40%] p-5 xl:p-0'>
                <h2 className='text-[60px] xl:text-[120px] leading-none uppercase'>Empower</h2>
                <h2 className='text-[60px] xl:text-[120px] leading-none text-[#6A90BA] uppercase font-bold overflow-hidden'>
                    Your&nbsp;
                    <span className="word-slider">
                        <span className="slide">Crypto</span>
                        <span className="slide">Life</span>
                    </span>
                </h2>

                <p className='text-[16px] m-0 p-0 w-full xl:w-[840px] text-left mt-4'>
                    Crypto Society is a community created by and for individuals passionate about cryptocurrency.
                    Our objective is to enlighten members about various aspects of crypto through the distribution of our research.
                    We encourage our members to engage in learning and to actively participate in sharing their insights.
                </p>

                <div className='flex gap-5 mt-2 w-full'>
                    <button className='glow-on-hover w-50 py-5 px-5 xl:px-10 mt-5 uppercase font-bold' type="button">FOR Individuals</button>
                    <button className='glow-on-hover w-50 py-5 px-5 xl:px-10 mt-5 uppercase font-bold' type="button">FOR Companies</button>
                </div>
            </div>

            <div className='social relative p-5 xl:p-0'>
                <div className='w-full xl:w-[1200px] mx-auto'>
                    <h2 className='text-[60px] xl:text-[120px] m-0 p-0 leading-none uppercase text-center'><span className='text-[#6A90BA] uppercase font-bold'>CONNECT</span> WITH US</h2>
                    <div className='flex flex-col xl:flex-row gap-5 xl:gap-20 xl:items-end justify-center mt-5'>
                        <a className='flex items-center gap-5 xl:gap-10 mt-5 justify-center xl:justify-start transition-colors duration-300 ease-in-out xl:hover:text-[#299dd5]' href="https://t.me/cryptosocietyy" target="_blank" title="Telegram">
                            <FontAwesomeIcon icon={faTelegram} className='h-[50px] xl:h-[100px]' />
                            <span className='text-[18px] uppercase'>Telegram</span>
                        </a>
                        <a className='flex items-center gap-5 xl:gap-10 mt-5 justify-center xl:justify-start transition-colors duration-300 ease-in-out xl:hover:text-[#1DA1F2]' href="https://twitter.com/cryptosocietytg" target="_blank" title="Twitter">
                            <FontAwesomeIcon icon={faTwitter} className='h-[50px] xl:h-[100px]' />
                            <span className='text-[18px] uppercase'>Twitter</span>
                        </a>
                    </div>

                    <div className='flex flex-col xl:flex-row gap-10 xl:gap-20 mt-24'>
                        <div>
                            <h2 className='text-[60px] xl:text-[100px] m-0 p-0 leading-none uppercase text-[#6A90BA] font-bold mb-5'>LEARN</h2>
                            <p className='text-[16px]'>We bring awareness of the latest ground-breaking crypto projects to our community, including hosting regular AMA’s and live TA Market Overviews, thus teaching how to research and apply trading and hodling strategies.</p>
                        </div>
                        <div>
                            <h2 className='text-[60px] xl:text-[100px] m-0 p-0 leading-none uppercase text-[#6A90BA] font-bold mb-5'>APPLY</h2>
                            <p className='text-[16px]'>With this applied learning the group is encouraged to research and share their findings with our members, actively getting involved, effectively benefitting the entire community.</p>
                        </div>
                        <div>
                            <h2 className='text-[60px] xl:text-[100px] m-0 p-0 leading-none uppercase text-[#6A90BA] font-bold mb-5'>SUCCEED</h2>
                            <p className='text-[16px]'>Crypto is a bumpy road but with so many eyes and ears actively contributing we regularly (and) successfully recognize great buying opportunities that ultimately lead to a lucrative investment.</p>
                        </div>
                    </div>
                </div>
                <div className='hidden xl:block xl:text-[1200px] absolute z-[-1] right-[50px] top-[-500px] text-[#212121] font-serif'>&</div>
            </div>

            <div className='partner px-5 pt-[50px] pb-[50px] mt-[50px] xl:mt-[300px] bg-[#22223460] w-full'>
                <Partner />
            </div>

            <div className='ventureCapital p-5 xl:text-center mt-20 xl:mt-40'>
                <h2 className='text-[60px] xl:text-[120px] m-0 p-0 leading-none uppercase text-[#6A90BA] font-bold'>
                    VENTURE CAPITAL
                </h2>

                <p className='w-full max-w-[1000px] mt-5 mx-auto text-[16px]'>
                    Crypto Society has also extended into a VC and has invested in over 70 projects over the last year including Kilt, UMEE, Retreeb, Star Atlas and Cryowar to name but a few.
                </p>

                <p className='w-full max-w-[1000px] mt-5 mx-auto text-[16px]'>
                    As investors we aim to provide active support in the form of strategy, marketing, design, strategic partnership introductions, launchpad intros as well as active engagement on the project’s social media channels. It has thus been a natural evolution for us to have also taken on advisor roles to certain projects.
                </p>
            </div>

        </main>
    )
}
