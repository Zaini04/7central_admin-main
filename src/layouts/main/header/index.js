import moment from 'moment';
import React, { memo } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSidebar } from 'redux/slices/appSlice';
import Notifcation from './Notifcation';
import img from '../../../assets/images/img2.jpg';
import Usermenu  from './Usermenu';
import {setProfile} from  'redux/slices/profileSlice'
import fetcher from 'utils/fetcher';
import { useQuery } from 'react-query';
import { baseURL } from 'config/api';
import { ClipLoader } from 'react-spinners';
import formatLabel from 'utils/formatLabel';

const Header = () => {
  const dispatch = useDispatch()
  const { showSidebar } = useSelector(state => state.app)
    const {user } = useSelector((state) => state.auth);

const { data: profileData } = useSelector((state) => state.profile);
    console.log(' this is a the  user',profileData)


const { data, isLoading, error } = useQuery(
  ["my-profile",], 
  () => { 
    return fetcher('/user/profile', user);
  }
);

 useEffect(() => {
    if (!data?.data?.doc) return;
    dispatch(setProfile(data.data.doc));
  }, [data, dispatch]);



  const  username  = profileData?.username || profileData?.email ;
  const profileImage = profileData?.image ? `${baseURL}/${profileData?.image}` : img;
const isSuperAdmin = profileData?.isSuperAdmin;

const role = isSuperAdmin ? 'Super Admin' : 'Admin';

  return (
    <div className='bg-light2 px-4 py-4 flex flex-wrap xs:flex-nowrap items-center justify-between h-auto md:h-[4rem] '>
      
      {/* Left section */}
      <div className='flex items-center min-w-0'>
        <span className='inline-block ml-2   text-[12px] xs:text-sm  text-[#1A1C1E] font-semibold truncate'>
          Welcome Back, {formatLabel(profileData?.username)}
        </span>
      </div>

      {/* Right section */}
      <div className='flex items-center gap-4 min-w-0 flex-shrink '>
        {/* Notification */}
        <div className='cursor-pointer'>
          <Notifcation />
        </div>

        {/* Divider */}
        <div className='h-[30px] w-[1px] bg-[#DCE4E8] hidden md:block' />

        {/* User Avatar */}

          {isLoading ? (
            <ClipLoader size={16}  color='#000066'  />
          ) : (
        <Usermenu   
         username={username}
         profileImage={profileImage}
         role={role}

        />
          )} 

        {/* Mobile Sidebar Button */}
        <div className='md:hidden block'>
          <button
            onClick={() => dispatch(setShowSidebar(true))}
            className=' text-pure  rounded-lg w-[35px] h-[35px] flex items-center justify-center'
          >
            {showSidebar ? (
              <i 
                          onClick={() => dispatch(setShowSidebar(false))}

              className='cursor-pointer uil uil-times text-2xl'></i>
            ) : (
              <i className='uil uil-bars text-2xl'></i>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(Header)