import LogoSvg from 'assets/svgs/LogoSvg';
import { LogoutSvg } from 'assets/svgs/sidebar';
import menuItems from 'constants/sidebar.constants';
import React, { memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { logout } from 'redux/actions/authActions';
import { setShowSidebar } from 'redux/slices/appSlice';
import useClickOutside from 'utils/clickOutside';
import logo from '../../../assets/images/7 Central.svg';
import "./siderbar.css";


const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const sidebarRef = useRef();
    const { user } = useSelector(state => state.auth);
  console.log('this is a user',user?.isSuperAdmin)



    const { showSidebar } = useSelector(state => state.app);
    const { loading } = useSelector(state => state.auth)
    useClickOutside(sidebarRef , () => showSidebar  ? dispatch(setShowSidebar(false)) : '')

    const closeSideBar = () => {
        if (showSidebar) {
            dispatch(setShowSidebar(false))
        }
    }

    const checkIsActive = (path, exact) => {
        const currentPath = location.pathname;
        if (exact) {
            return currentPath === path;
        }
        return currentPath.startsWith(path);
    };

    const logoutHandler = () => {
        dispatch(logout(navigate))
    }

    return (
        <div
        ref={sidebarRef} 
        className={`min-h-screen max-h-full sidebar-scroll bg-light2 fixed md:left-0 transition-all duration-300 z-50 
            overflow-y-auto ease-in-out w-[220px]
            ${showSidebar ? 'left-0' : '-left-[150%]'}
        `}>
            <div className=' flex justify-center items-center '>
                {/* <h1 className='flex font-medium text-[#000000] text-4xl items-center justify-center h-[4.5rem]'>
                
                         7 central
                    
                </h1> */}
                <img alt='Logo' src={logo} className='h-28 w-32'/>
            </div>
            <ul className='pb-4  flex flex-col gap-1 '>
               <ul className='py-4 flex flex-col gap-1 '>
  {menuItems.map((item) => {
    if (item.id === 7 && !user?.isSuperAdmin) return null;

    const isActive = checkIsActive(item.path, item.exact);

    if (item.onlyText && item.path === '') {
      return (
        <p key={item.id} className='text-hint font-medium pl-5 py-3 text-xs'>
          {item.name}
        </p>
      );
    }

    return (
      <li key={item.id}>
        <Link
          to={item.path}
          className={`w-11/12 ] mx-auto flex  flex-row hover:bg-[#FFE8E8]  items-center py-1.5 rounded-xl px-2 gap-1 text-xs hover:text-[#FD0000] hover:fill-[#FD0000] group
            ${isActive ? 'text-[#FD0000] bg-[#FFE8E8] ' : 'text-dark1'}    
          `}
          onClick={closeSideBar}
        >
                      <div className={`w-[22px] h-[22px] group-hover:bg-[#FD0000] rounded-md ${isActive ? 'bg-[#FD0000]' : 'bg-[#F3F4F5]'} flex justify-center items-center`}>

          <item.icon
            className={`w-[14px] 
              ${isActive ? 'text-white  group-hover:text-white' : '   group-hover:text-white'} 
              
            `}
          />
          </div>
          <p>{item.name}</p>
          {item?.separator && (
            <div className='w-[50px] h-[1px] bg-lighter mt-3 ' />
          )}
        </Link>
      </li>
    );
  })}
</ul>

                {/* <li 
                className='flex flex-col items-center py-3 gap-2 text-sm hover:text-primary group cursor-pointer'
                onClick={logoutHandler}
                >
                    {
                        loading 
                        ? 
                            <ClipLoader size={20} color='white' />
                        : 
                            <>
                                <LogoutSvg className='w-[18px] fill-pure group-hover:fill-primary' />
                                <p>Logout</p>
                            </>
                    }
                </li> */}
            </ul>
        </div>
    );
};

export default memo(Sidebar);
