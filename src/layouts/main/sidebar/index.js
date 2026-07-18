import LogoSvg from 'assets/svgs/LogoSvg';
import { LogoutSvg } from 'assets/svgs/sidebar';
import menuItems from 'constants/sidebar.constants';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { logout } from 'redux/actions/authActions';
import { setShowSidebar } from 'redux/slices/appSlice';
import useClickOutside from 'utils/clickOutside';
import logo from '../../../assets/images/7 Central.svg';
import "./siderbar.css";

const ChevronSvg = ({ className }) => (
    <svg
        className={className}
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const sidebarRef = useRef();
    const { user } = useSelector(state => state.auth);

    const { showSidebar } = useSelector(state => state.app);
    const { loading } = useSelector(state => state.auth)
    useClickOutside(sidebarRef , () => showSidebar  ? dispatch(setShowSidebar(false)) : '')

    // Object state se change kar k single ID string state me convert kiya
    const [openGroupId, setOpenGroupId] = useState(null);

    const checkIsActive = (path, exact) => {
        const currentPath = location.pathname;
        if (exact) {
            return currentPath === path;
        }
        return currentPath.startsWith(path);
    };

    const groupHasActiveChild = (item) => {
        if (!item.children) return false;
        return item.children.some((child) => checkIsActive(child.path, child.exact));
    };

    // Auto-expand dynamically only the active group and close others on route change
    useEffect(() => {
        let activeGroupId = null;
        menuItems.forEach((item) => {
            if (item.children && groupHasActiveChild(item)) {
                activeGroupId = item.id;
            }
        });
        if (activeGroupId) {
            setOpenGroupId(activeGroupId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    // Agar pehle se khula hai toh band kar do, warna new group set karo (baqi auto-close ho jayenge)
    const toggleGroup = (id) => {
        setOpenGroupId((prevId) => (prevId === id ? null : id));
    };

    const closeSideBar = () => {
        if (showSidebar) {
            dispatch(setShowSidebar(false))
        }
    }

    const logoutHandler = () => {
        dispatch(logout(navigate))
    }

    const renderLink = (item, isActive) => (
        <Link
            to={item.path}
            className={`w-11/12 mx-auto flex flex-row hover:bg-[#BA8A3833] items-center py-1.5 rounded-lg  px-2 gap-1 text-xs hover:text-[#BA8A38] hover:fill-[#BA8A38] group
                ${isActive ? 'text-[#BA8A38]  ' : 'text-dark1'}
            `}
            onClick={closeSideBar}
        >
            <p className='ml-3 font-medium'>  {item.name}</p>
        </Link>
    );

    return (
        <div
        ref={sidebarRef} 
        className={`min-h-screen max-h-full sidebar-scroll bg-light2 fixed md:left-0 transition-all duration-300 z-50 
            overflow-y-auto ease-in-out w-[220px]
            ${showSidebar ? 'left-0' : '-left-[150%]'}
        `}>
            <div className=' flex justify-center items-center '>
                <img alt='Logo' src={logo} className='h-28 w-32'/>
            </div>
            <ul className='pb-4  flex flex-col gap-1 '>
               <ul className='py-4 flex flex-col gap-1 '>
                {menuItems.map((item) => {
                    // Plain link item (no children) — e.g. Dashboard
                    if (!item.children) {
                        const isActive = checkIsActive(item.path, item.exact);
                        return <li key={item.id}>{renderLink(item, isActive)}</li>;
                    }

                    // Strict verification if this group is the current open instance
                    const isOpen = openGroupId === item.id;
                    const hasActiveChild = groupHasActiveChild(item);
                    const visibleChildren = item.children.filter(
                        (child) => !(child.superAdminOnly && !user?.isSuperAdmin)
                    );

                    if (visibleChildren.length === 0) return null;

                    return (
                        <li key={item.id}>
                            <button
                                type='button'
                                onClick={() => toggleGroup(item.id)}
                                className={`w-11/12 mx-auto flex flex-row items-center justify-between hover:bg-[#BA8A3833] py-1.5 rounded-lg px-2 gap-1 text-xs hover:text-[#BA8A38] group
                                    ${hasActiveChild ? 'bg-[#BA8A3833] ' : 'text-dark1'}
                                `}
                            >
                                <div className='flex flex-row items-center gap-1'>
                                    <div className={`w-[22px] h-[22px] group-hover:bg-[#BA8A38]  rounded-md  ${hasActiveChild ? 'bg-[#BA8A38]' : 'bg-[#F3F4F5]'} flex justify-center items-center`}>
                                        <item.icon
                                            className={`w-[14px]
                                                ${hasActiveChild ? ' text-white ' : 'group-hover:text-white'}
                                            `}
                                        />
                                    </div>
                                    <p className={`font-medium ${hasActiveChild ? 'text-[#BA8A38] ': ""}`}>{item.name}</p>
                                </div>
                                <ChevronSvg
                                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'} ${hasActiveChild ? '' : 'text-dark1'}`}
                                />
                            </button>

                            <ul
                                className={`overflow-hidden transition-all duration-300 flex flex-col gap-1 pl-3
                                    ${isOpen ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}
                                `}
                            >
                                {visibleChildren.map((child) => {
                                    const isActive = checkIsActive(child.path, child.exact);
                                    return <li key={child.id}>{renderLink(child, isActive)}</li>;
                                })}
                            </ul>
                        </li>
                    );
                })}
                </ul>
            </ul>
        </div>
    );
};

export default memo(Sidebar);