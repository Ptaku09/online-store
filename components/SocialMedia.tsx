import Image from 'next/image';
import Twitter from '../assets/twitter-brands.svg';
import Instagram from '../assets/instagram-brands.svg';

export default function SocialMedia() {
  return (
    <div className="fixed top-mobile-vertical xs:top-mobile-horizontal md:mx-auto z-[3] flex flex-col justify-center items-center text-orange-400">
      <p className="rotate-90 font-['Outfit']">follow us</p>
      <a href="https://twitter.com/Ptaku09" target="_blank" rel="noreferrer" className="mt-7 mb-1">
        <Image src={Twitter} width={20} height={20} alt="Twitter" />
      </a>
      <a href="https://www.instagram.com/ptaku08/" rel="noreferrer" target="_blank">
        <Image src={Instagram} width={20} height={20} alt="Instagram" />
      </a>
    </div>
  );
}
