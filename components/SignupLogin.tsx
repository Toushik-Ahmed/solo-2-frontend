import Image from 'next/image';
import mainlogo from '../assets/MainLogo.922b47d5ad750ac0bb04ed7fa93f0ab7.svg';
import { TabsDemo } from './SignUpTab';

function SignupLogin() {
  return (
    <div className="bg-black h-[100vh] flex flex-col ">
      <div className="bg-black flex justify-center">
        <Image src={mainlogo} alt="logo" height={32} width={132} />
      </div>
      <div className="flex justify-center flex-col items-center ">
        <p className="text-white mb-[5vh]">create a fast_track account</p>
        <TabsDemo />
      </div>
    </div>
  );
}

export default SignupLogin;
