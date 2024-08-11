'use client';
import { getCurrentUser } from '@/services/authServices';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CiBookmark, CiBookmarkCheck } from 'react-icons/ci';
import { LuArrowDownUp } from 'react-icons/lu';
import { MdOutlineEventNote } from 'react-icons/md';
import { User } from '../signup/SignUpTab';
import DashBoardCard from './DashBoardCard';
import Filter from './Filter';
import ProposeSession from './ProposeSession';

function Dashboard() {
  const currentPath = usePathname();
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const currentUserFn = async () => {
      try {
        const curUser = await getCurrentUser();
        setCurrentUser(curUser);
      } catch (error) {
        console.log(error);
      }
    };
    currentUserFn();
  }, []);

  return (
    <div className="h-[100vh] bg-[#1a1c1f] ">
      <nav className=" bg-[#1a1c1f]">
        <ul className="flex justify-center text-white p-4 border-b-2 border-solid border-[#3f4146] space-x-14  ">
          <li
            className={
              currentPath === '/interviewdashboard/dashboard'
                ? 'bg-[#1b2626] text-[#28c9a1] flex justify-center items-center p-2 rounded-xl'
                : 'flex justify-center items-center  hover:bg-[#222726]   p-2 rounded-xl'
            }
          >
            <CiBookmarkCheck className="mr-2" />
            <Link href="/interviewdashboard/dashboard"> Book sessions</Link>
          </li>
          <li className="flex justify-center items-center  hover:bg-[#222726]   p-2 rounded-xl">
            <CiBookmark className="mr-2" /> <Link href="#"> My sessions </Link>
          </li>
          <li className="flex justify-center items-center  hover:bg-[#222726]   p-2 rounded-xl">
            <MdOutlineEventNote className="mr-2" />
            <Link href="#"> Interview guides </Link>
          </li>
          <li className="flex justify-center items-center  hover:bg-[#222726]   p-2 rounded-xl">
            <LuArrowDownUp className="mr-2" />
            <Link href="#"> My performence </Link>
          </li>
        </ul>
      </nav>
      <div className="m-8 flex flex-col space-y-6 ">
        <div className="text-white text-2xl font-semibold ">
          Welcome {currentUser?.firstName}
          <p className="text-sm font-extralight">
            {' '}
            a brief summary before you book your next session
          </p>
        </div>
        <DashBoardCard />
      </div>
      {/* <hr className='bg-[#3f4146]'/> */}
      <div className="grid grid-cols-2 m-8 bg-[#1a1c1f] gap-x-20 border-t-2 border-solid border-[#3f4146] p-4  text-white">
        <div className='w-[25%]'>
          <Filter />
        </div>
        <div className='w-[full]'>
          <ProposeSession />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// bg-[#133328]
