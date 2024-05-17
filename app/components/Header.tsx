'use client'

import { Anton } from 'next/font/google';
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config'
import { useEffect, useState } from 'react';
import Link from 'next/link'

const tailwindScreens = resolveConfig(tailwindConfig).theme.screens;
const screenLG = parseInt(tailwindScreens.lg.replace("px", ""));

const anton = Anton({
    weight: "400",
    subsets: ["latin"]
});

const HeaderNavItem: React.FC<{ text: string; reset: boolean; hideCloseButton: () => void; showCloseButton: () => void; }> = ({ text, reset, hideCloseButton, showCloseButton }) => {
    const [itemIsClicked, setItemIsClicked] = useState(false);

    const handleClick = () => {
        if (window.innerWidth < screenLG) {
            setItemIsClicked(!itemIsClicked);

            if (!itemIsClicked) {
                hideCloseButton();
            } else {
                showCloseButton();
            }
        }
    }
    
    const goBack = () => {
        setItemIsClicked(false);
        showCloseButton();
    }

    useEffect(() => {
        if (!reset) {
            setItemIsClicked(false);
        }
    }, [reset]);
    
    return (
        <li className="-ml-2 -mr-2 group lg:focus-within:bg-gmgray lg:focus-within:rounded-t">
            <button onClick={handleClick} className="p-2 w-full text-xl flex peer items-center lg:group-hover:bg-gmgray lg:group-hover:rounded-t lg:text-base lg:p-2">
                <span className="mr-auto">{ text }</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 lg:hidden" aria-hidden="true" focusable="false">
                    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                </svg>
            </button>
            <div className={`${!itemIsClicked ? 'hidden' : 'fixed w-screen h-screen top-0 left-0 bg-gmgray'} lg:focus:block lg:group-focus-within:block lg:relative lg:group-hover:block lg:after:left-0 lg:after:right-0 lg:after:absolute lg:after:h-9 lg:after:bg-gmgray`}>
                <div className="mt-8 container lg:hidden">
                    <button onClick={goBack} className="flex items-center p-2 -mr-2 ml-auto lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true" focusable="false">
                            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-base ml-0.5">Back</span>
                    </button>
                </div>
                <div className="mt-24 bottom-0 top-0 absolute w-full overflow-y-auto lg:fixed lg:left-0 lg:bg-gmgray">
                    <div className="container py-4"><button>Content</button></div>
                </div>
            </div>
        </li>
    )
}

const Header = () => {
    const [menuStatus, setMenuStatus] = useState(false);
    const [menuButtonStyles, setMenuButtonStyles] = useState("");
    const [navStyles, setNavStyles] = useState("hidden");

    const handleMenuClick = () => {
        if (!menuStatus) {
            setMenuButtonStyles("bg-gmgray rounded z-10");
            setNavStyles("fixed w-screen h-screen top-0 left-0 bg-gmgray");
        } else {
            setMenuButtonStyles("");
            setNavStyles("hidden");
        }

        setMenuStatus(!menuStatus);
    }

    const hideCloseButton = () => {
        setMenuButtonStyles("bg-gmgray rounded");
    }

    const showCloseButton = () => {
        setMenuButtonStyles("bg-gmgray rounded z-10");
    }

    const reset = () => {
        setMenuButtonStyles("");
        setNavStyles("hidden");
        setMenuStatus(false);
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth >= screenLG) {
                reset();
            }
        });
    }, []);

    return (
        <header className="py-4 fixed w-full bg-gmbackground">
            <div className="container">
                <div className="flex items-center">
                    <Link href="/" className="-ml-2 p-2 flex items-center space-x-2">
                        <span className={anton.className + " text-3xl"}><span className="text-gmgoek">goek</span><span className="text-gmmavi">mavi</span></span> <span className="border-solid border-2 rounded-lg text-center h-10 w-10 flex items-center justify-center"><span className="text-xl tracking-wider font-extrabold text-gmgoek">UI</span></span>
                    </Link>
                    <button onClick={ handleMenuClick } className={`ml-auto p-2 -mr-2 lg:hidden ${menuButtonStyles}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true" focusable="false">
                            {menuStatus ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            )}
                        </svg>
                        <span className="sr-only">{menuStatus ? 'Close menu' : 'Open menu'}</span>
                    </button>
                    <nav className={"ml-auto overflow-y-auto lg:overflow-y-visible lg:flex " + navStyles}>
                        <ul className={`flex flex-col mt-24 space-y-2 flex-shrink-0 lg:space-x-4 lg:flex-row lg:mt-0 lg:-mr-2 lg:space-y-0 ${menuStatus ? "container" : ""}`}>
                            <HeaderNavItem text="Components" reset={menuStatus} hideCloseButton={() => hideCloseButton()} showCloseButton={() => showCloseButton()} />
                            <HeaderNavItem text="Templates" reset={menuStatus} hideCloseButton={() => hideCloseButton()} showCloseButton={() => showCloseButton()} />
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;