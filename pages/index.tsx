import type { NextPage } from 'next';
import TitleDesc from '../components/atoms/TitleDesc';

const Home: NextPage = () => {
  return (
    <div>
      <div className="h-auto min-h-screen w-screen flex justify-center items-center flex-col overflow-y-scroll no-scrollbar">
        <div className="bg-[url('../public/images/homeBackground.png')] bg-fixed w-screen h-screen flex justify-center items-center shadow-[inset_0_-100px_62px_-44px_rgba(241,241,241,1)]">
          <div className="w-full h-full absolute top-0 left-0 shadow-gradient" />
          <div>
            <TitleDesc desc="enjoy shopping" />
            <h1 className="text-white font-['Sedgwick_Ave'] text-7xl z-[2]">Your favorite online store!</h1>
          </div>
        </div>
        <div className="h-screen w-screen bg-gradient-to-b from-white to-white" />
      </div>
    </div>
  );
};

export default Home;
