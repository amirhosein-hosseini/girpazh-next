import Link from "next/link";
import styles from "./styles.module.scss";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Header = () => {


    const router = useRouter()
    const [isMobile, setIsMobile] = useState(false);
    const [searchInput , setSearchInput] = useState("");
    const [showNav , setShowNav] = useState(false);


    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
        };
    
        // Initial check on component mount
        handleResize();
    
        // Listen for window resize events
        window.addEventListener('resize', handleResize);
    
        // Cleanup function to remove the resize event listener
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (showNav) {
            // Disable scrolling
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
        } else {
            // Enable scrolling
            document.body.style.overflow = '';
            document.body.style.height = '';
        }

        // Cleanup to ensure proper state
        return () => {
            document.body.style.overflow = '';
            document.body.style.height = '';
        };
    }, [showNav]);


    const {isLoggedIn} = useAuth();


    // Update searchInput state when input value changes
    const handleChange = (event) => {
        setSearchInput(event.target.value);
    };


    const handleSearch = () => {
        const encodedInputValue = encodeURIComponent(searchInput.trim());
        router.push(`/search/${encodedInputValue}`);
    };

    const handleCall = () => {
        window.open('tel:02833560066', '_self'); // Replace with the desired phone number
    };



    return(
        <>
            {isMobile === false ?
                <div>
                    <div className="bg-[#221F1F]">
                        <div className="container max-w-[1200px] w-11/12 mx-auto py-7 flex items-center justify-between">
                            <div className="w-2/12 flex items-center justify-start">
                                <div className="pr-3" style={{ borderRight: "1px solid rgb(255,255,255,20%)" }}>
                                    {isLoggedIn === true ?
                                        <Link href={"/cart"}>
                                            <svg width="22" height="20" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.66667C0 1.02233 0.540989 0.5 1.20833 0.5H1.73812C3.40152 0.5 4.85146 1.59304 5.25489 3.15112L5.47469 4H19.9457C22.2648 4 23.9874 6.07346 23.4844 8.25926L22.1418 14.0926C21.7732 15.694 20.3021 16.8333 18.6031 16.8333H9.13688C7.47348 16.8333 6.02354 15.7403 5.62011 14.1822L2.91038 3.71704C2.7759 3.19768 2.29259 2.83333 1.73812 2.83333H1.20833C0.540989 2.83333 0 2.311 0 1.66667ZM6.07886 6.33333L7.96462 13.6163C8.0991 14.1357 8.58241 14.5 9.13688 14.5H18.6031C19.1694 14.5 19.6598 14.1202 19.7826 13.5864L21.1252 7.75309C21.2929 7.02449 20.7187 6.33333 19.9457 6.33333H6.07886Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0625 21.5C10.0635 21.5 10.875 20.7165 10.875 19.75C10.875 18.7835 10.0635 18 9.0625 18C8.06148 18 7.25 18.7835 7.25 19.75C7.25 20.7165 8.06148 21.5 9.0625 21.5Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7305 21.5C19.7315 21.5 20.543 20.7165 20.543 19.75C20.543 18.7835 19.7315 18 18.7305 18C17.7295 18 16.918 18.7835 16.918 19.75C16.918 20.7165 17.7295 21.5 18.7305 21.5Z" fill="white" />
                                            </svg>
                                        </Link> :
                                        <Link href={"/login"}>
                                            <svg width="22" height="20" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.66667C0 1.02233 0.540989 0.5 1.20833 0.5H1.73812C3.40152 0.5 4.85146 1.59304 5.25489 3.15112L5.47469 4H19.9457C22.2648 4 23.9874 6.07346 23.4844 8.25926L22.1418 14.0926C21.7732 15.694 20.3021 16.8333 18.6031 16.8333H9.13688C7.47348 16.8333 6.02354 15.7403 5.62011 14.1822L2.91038 3.71704C2.7759 3.19768 2.29259 2.83333 1.73812 2.83333H1.20833C0.540989 2.83333 0 2.311 0 1.66667ZM6.07886 6.33333L7.96462 13.6163C8.0991 14.1357 8.58241 14.5 9.13688 14.5H18.6031C19.1694 14.5 19.6598 14.1202 19.7826 13.5864L21.1252 7.75309C21.2929 7.02449 20.7187 6.33333 19.9457 6.33333H6.07886Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0625 21.5C10.0635 21.5 10.875 20.7165 10.875 19.75C10.875 18.7835 10.0635 18 9.0625 18C8.06148 18 7.25 18.7835 7.25 19.75C7.25 20.7165 8.06148 21.5 9.0625 21.5Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7305 21.5C19.7315 21.5 20.543 20.7165 20.543 19.75C20.543 18.7835 19.7315 18 18.7305 18C17.7295 18 16.918 18.7835 16.918 19.75C16.918 20.7165 17.7295 21.5 18.7305 21.5Z" fill="white" />
                                            </svg>
                                        </Link>
                                    }
                                </div>
                                <div className="px-3">
                                    {isLoggedIn === true ?
                                        <Link href={"/panel"}>
                                            <svg width="25" height="24" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4987 11.6666C16.5007 11.6666 18.1237 10.0996 18.1237 8.16659C18.1237 6.23359 16.5007 4.66659 14.4987 4.66659C12.4967 4.66659 10.8737 6.23359 10.8737 8.16659C10.8737 10.0996 12.4967 11.6666 14.4987 11.6666ZM14.4987 13.9999C17.8354 13.9999 20.5404 11.3882 20.5404 8.16659C20.5404 4.94492 17.8354 2.33325 14.4987 2.33325C11.162 2.33325 8.45703 4.94492 8.45703 8.16659C8.45703 11.3882 11.162 13.9999 14.4987 13.9999Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.875 18.6666C8.20562 18.6666 6.04167 20.7559 6.04167 23.3333V24.4999C6.04167 25.1442 5.50068 25.6666 4.83333 25.6666C4.16599 25.6666 3.625 25.1442 3.625 24.4999V23.3333C3.625 19.4673 6.87094 16.3333 10.875 16.3333H18.125C22.1291 16.3333 25.375 19.4673 25.375 23.3333V24.4999C25.375 25.1442 24.834 25.6666 24.1667 25.6666C23.4993 25.6666 22.9583 25.1442 22.9583 24.4999V23.3333C22.9583 20.7559 20.7944 18.6666 18.125 18.6666H10.875Z" fill="white" />
                                            </svg>
                                        </Link> :
                                        <Link href={"/login"}>
                                            <svg width="25" height="24" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4987 11.6666C16.5007 11.6666 18.1237 10.0996 18.1237 8.16659C18.1237 6.23359 16.5007 4.66659 14.4987 4.66659C12.4967 4.66659 10.8737 6.23359 10.8737 8.16659C10.8737 10.0996 12.4967 11.6666 14.4987 11.6666ZM14.4987 13.9999C17.8354 13.9999 20.5404 11.3882 20.5404 8.16659C20.5404 4.94492 17.8354 2.33325 14.4987 2.33325C11.162 2.33325 8.45703 4.94492 8.45703 8.16659C8.45703 11.3882 11.162 13.9999 14.4987 13.9999Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.875 18.6666C8.20562 18.6666 6.04167 20.7559 6.04167 23.3333V24.4999C6.04167 25.1442 5.50068 25.6666 4.83333 25.6666C4.16599 25.6666 3.625 25.1442 3.625 24.4999V23.3333C3.625 19.4673 6.87094 16.3333 10.875 16.3333H18.125C22.1291 16.3333 25.375 19.4673 25.375 23.3333V24.4999C25.375 25.1442 24.834 25.6666 24.1667 25.6666C23.4993 25.6666 22.9583 25.1442 22.9583 24.4999V23.3333C22.9583 20.7559 20.7944 18.6666 18.125 18.6666H10.875Z" fill="white" />
                                            </svg>
                                        </Link>
                                    }
                                </div>
                            </div>
                            <div className="w-8/12 mx-auto flex items-center justify-center">
                                <div className="relative w-8/12 mx-auto">
                                    <input
                                        className="w-full mx-auto px-3 py-3 rounded-full" 
                                        type="text" 
                                        placeholder="جست و جوی محصولات..." 
                                        onChange={handleChange} 
                                        value={searchInput} 
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                event.preventDefault(); // Prevent default form submission
                                                handleSearch();
                                            }
                                        }}
                                    />
                                    <div className="absolute top-1 left-1 w-[40px] h-[40px] bg-[#E14957] rounded-full flex items-center justify-center cursor-pointer" onClick={handleSearch}>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.7148 5H17.8577" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12.7148 7.57153H15.2863" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M18.7154 10.5716C18.7154 15.0716 15.0725 18.7144 10.5725 18.7144C6.07254 18.7144 2.42969 15.0716 2.42969 10.5716C2.42969 6.07157 6.07254 2.42871 10.5725 2.42871" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M19.5737 19.5715L17.8594 17.8572" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>


                            <div className="w-2/12 flex justify-end">
                                <Link href={"/"} className="max-w-[60px] overflow-hidden">
                                    <Image className="object-cover w-full" src="/images/longlogo.webp" alt="logo" width={100} height={80} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white py-5">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center gap-5">
                                <Link className="font-bold text-sm" href={"/contact"}>
                                    تماس با ما
                                </Link>
                                <Link className="font-bold text-sm" href={"/about"}>
                                    درباره ما
                                </Link>
                                <Link className="font-bold text-sm" href={"/blog"}>
                                    وبلاگ
                                </Link>
                                <Link className="font-bold text-sm" href={"/seller-login"}>
                                    فروش قطعه
                                </Link>
                                <Link className="font-bold text-sm" href={"/international-sell"}>
                                    سفارش بین المللی
                                </Link>
                                <Link className="font-bold text-sm" href={"/"}>
                                    خانه
                                </Link>
                            </div>
                        </div>
                    </div>
                </div> :

                <>
                    <div className="w-11/12 mx-auto flex items-center justify-between mt-5 bg-white px-2 py-1 rounded-xl">
                        <div>
                            {isLoggedIn === true ?
                                <div>
                                    <svg width="17" height="17" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleCall}>
                                        <path d="M10.2783 6.27077C10.0275 6.27077 9.82913 6.0666 9.82913 5.8216C9.82913 5.60577 9.61329 5.1566 9.25163 4.76577C8.89579 4.3866 8.50496 4.16493 8.17829 4.16493C7.92746 4.16493 7.72913 3.96077 7.72913 3.71577C7.72913 3.47077 7.93329 3.2666 8.17829 3.2666C8.76163 3.2666 9.37413 3.5816 9.91079 4.14743C10.4125 4.67827 10.7333 5.33744 10.7333 5.81577C10.7333 6.0666 10.5291 6.27077 10.2783 6.27077Z" fill="#292D32" />
                                        <path d="M12.3842 6.27067C12.1333 6.27067 11.935 6.0665 11.935 5.8215C11.935 3.75067 10.2492 2.07067 8.18415 2.07067C7.93332 2.07067 7.73499 1.8665 7.73499 1.6215C7.73499 1.3765 7.93332 1.1665 8.17832 1.1665C10.745 1.1665 12.8333 3.25484 12.8333 5.8215C12.8333 6.0665 12.6292 6.27067 12.3842 6.27067Z" fill="#292D32" />
                                        <path d="M6.44579 8.72067L5.36663 9.79984C5.13913 10.0273 4.77746 10.0273 4.54413 9.80567C4.47996 9.7415 4.41579 9.68317 4.35163 9.619C3.75079 9.01234 3.20829 8.3765 2.72413 7.7115C2.24579 7.0465 1.86079 6.3815 1.58079 5.72234C1.30663 5.05734 1.16663 4.4215 1.16663 3.81484C1.16663 3.41817 1.23663 3.039 1.37663 2.689C1.51663 2.33317 1.73829 2.0065 2.04746 1.71484C2.42079 1.34734 2.82913 1.1665 3.26079 1.1665C3.42413 1.1665 3.58746 1.2015 3.73329 1.2715C3.88496 1.3415 4.01913 1.4465 4.12413 1.59817L5.47746 3.50567C5.58246 3.6515 5.65829 3.78567 5.71079 3.914C5.76329 4.0365 5.79246 4.159 5.79246 4.26984C5.79246 4.40984 5.75163 4.54984 5.66996 4.684C5.59413 4.81817 5.48329 4.95817 5.34329 5.09817L4.89996 5.559C4.83579 5.62317 4.80663 5.699 4.80663 5.79234C4.80663 5.839 4.81246 5.87984 4.82413 5.9265C4.84163 5.97317 4.85913 6.00817 4.87079 6.04317C4.97579 6.23567 5.15663 6.4865 5.41329 6.78984C5.67579 7.09317 5.95579 7.40234 6.25913 7.7115C6.31746 7.76984 6.38163 7.82817 6.43996 7.8865C6.67329 8.114 6.67913 8.48734 6.44579 8.72067Z" fill="#292D32" />
                                        <path d="M12.8158 10.6924C12.8158 10.8558 12.7866 11.0249 12.7283 11.1883C12.7108 11.2349 12.6933 11.2816 12.67 11.3283C12.5708 11.5383 12.4425 11.7366 12.2733 11.9233C11.9875 12.2383 11.6725 12.4658 11.3166 12.6116C11.3108 12.6116 11.305 12.6174 11.2991 12.6174C10.955 12.7574 10.5816 12.8333 10.1791 12.8333C9.58414 12.8333 8.94831 12.6933 8.27748 12.4074C7.60664 12.1216 6.93581 11.7366 6.27081 11.2524C6.04331 11.0833 5.81581 10.9141 5.59998 10.7333L7.50748 8.82577C7.67081 8.94827 7.81664 9.04161 7.93914 9.10577C7.96831 9.11744 8.00331 9.13494 8.04414 9.15244C8.09081 9.16994 8.13748 9.17577 8.18998 9.17577C8.28914 9.17577 8.36498 9.14078 8.42914 9.07661L8.87248 8.63911C9.01831 8.49328 9.15831 8.38244 9.29248 8.31244C9.42664 8.23077 9.56081 8.18994 9.70664 8.18994C9.81747 8.18994 9.93414 8.21327 10.0625 8.26577C10.1908 8.31827 10.325 8.39411 10.4708 8.49328L12.4016 9.86411C12.5533 9.96911 12.6583 10.0916 12.7225 10.2374C12.7808 10.3833 12.8158 10.5291 12.8158 10.6924Z" fill="#292D32" />
                                    </svg>
                                </div> :
                                <Link href={"/login"}>
                                    <svg width="25" height="24" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4987 11.6666C16.5007 11.6666 18.1237 10.0996 18.1237 8.16659C18.1237 6.23359 16.5007 4.66659 14.4987 4.66659C12.4967 4.66659 10.8737 6.23359 10.8737 8.16659C10.8737 10.0996 12.4967 11.6666 14.4987 11.6666ZM14.4987 13.9999C17.8354 13.9999 20.5404 11.3882 20.5404 8.16659C20.5404 4.94492 17.8354 2.33325 14.4987 2.33325C11.162 2.33325 8.45703 4.94492 8.45703 8.16659C8.45703 11.3882 11.162 13.9999 14.4987 13.9999Z" fill="black" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.875 18.6666C8.20562 18.6666 6.04167 20.7559 6.04167 23.3333V24.4999C6.04167 25.1442 5.50068 25.6666 4.83333 25.6666C4.16599 25.6666 3.625 25.1442 3.625 24.4999V23.3333C3.625 19.4673 6.87094 16.3333 10.875 16.3333H18.125C22.1291 16.3333 25.375 19.4673 25.375 23.3333V24.4999C25.375 25.1442 24.834 25.6666 24.1667 25.6666C23.4993 25.6666 22.9583 25.1442 22.9583 24.4999V23.3333C22.9583 20.7559 20.7944 18.6666 18.125 18.6666H10.875Z" fill="black" />
                                    </svg>
                                </Link>
                            }
                        </div>
                        <div>
                            <Link href={"/"}>
                                <img src="../../images/headerlogo.png" alt="logo" />
                            </Link>
                        </div>
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setShowNav(true)}>
                                <path d="M2.75 12H21.25M2.75 5.75H21.25M2.75 18.25H21.25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    {showNav === true ? 
                        <div className="absolute w-11/12 h-full top-0 right-0 bg-[#E14957]" style={{ zIndex: "10" }}>
                            <div>
                                <div className="text-right p-5 flex flex-col gap-10">
                                    <div>
                                        <svg className="w-4" onClick={() => setShowNav(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg>
                                    </div>
                                    <div className="text-black text-lg flex flex-col-reverse gap-7">
                                        <div>
                                            {isLoggedIn === true ?
                                                <Link href={"/cart"} className="flex items-center gap-2" onClick={() => setShowNav(false)}>
                                                    <svg width="22" height="20" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.66667C0 1.02233 0.540989 0.5 1.20833 0.5H1.73812C3.40152 0.5 4.85146 1.59304 5.25489 3.15112L5.47469 4H19.9457C22.2648 4 23.9874 6.07346 23.4844 8.25926L22.1418 14.0926C21.7732 15.694 20.3021 16.8333 18.6031 16.8333H9.13688C7.47348 16.8333 6.02354 15.7403 5.62011 14.1822L2.91038 3.71704C2.7759 3.19768 2.29259 2.83333 1.73812 2.83333H1.20833C0.540989 2.83333 0 2.311 0 1.66667ZM6.07886 6.33333L7.96462 13.6163C8.0991 14.1357 8.58241 14.5 9.13688 14.5H18.6031C19.1694 14.5 19.6598 14.1202 19.7826 13.5864L21.1252 7.75309C21.2929 7.02449 20.7187 6.33333 19.9457 6.33333H6.07886Z" fill="black" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0625 21.5C10.0635 21.5 10.875 20.7165 10.875 19.75C10.875 18.7835 10.0635 18 9.0625 18C8.06148 18 7.25 18.7835 7.25 19.75C7.25 20.7165 8.06148 21.5 9.0625 21.5Z" fill="black" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7305 21.5C19.7315 21.5 20.543 20.7165 20.543 19.75C20.543 18.7835 19.7315 18 18.7305 18C17.7295 18 16.918 18.7835 16.918 19.75C16.918 20.7165 17.7295 21.5 18.7305 21.5Z" fill="black" />
                                                    </svg>
                                                    سبد خرید
                                                </Link> :
                                                <Link href={"/login"} className="flex items-center gap-2"  onClick={() => setShowNav(false)}>
                                                    <svg width="22" height="20" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.66667C0 1.02233 0.540989 0.5 1.20833 0.5H1.73812C3.40152 0.5 4.85146 1.59304 5.25489 3.15112L5.47469 4H19.9457C22.2648 4 23.9874 6.07346 23.4844 8.25926L22.1418 14.0926C21.7732 15.694 20.3021 16.8333 18.6031 16.8333H9.13688C7.47348 16.8333 6.02354 15.7403 5.62011 14.1822L2.91038 3.71704C2.7759 3.19768 2.29259 2.83333 1.73812 2.83333H1.20833C0.540989 2.83333 0 2.311 0 1.66667ZM6.07886 6.33333L7.96462 13.6163C8.0991 14.1357 8.58241 14.5 9.13688 14.5H18.6031C19.1694 14.5 19.6598 14.1202 19.7826 13.5864L21.1252 7.75309C21.2929 7.02449 20.7187 6.33333 19.9457 6.33333H6.07886Z" fill="black" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0625 21.5C10.0635 21.5 10.875 20.7165 10.875 19.75C10.875 18.7835 10.0635 18 9.0625 18C8.06148 18 7.25 18.7835 7.25 19.75C7.25 20.7165 8.06148 21.5 9.0625 21.5Z" fill="black" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7305 21.5C19.7315 21.5 20.543 20.7165 20.543 19.75C20.543 18.7835 19.7315 18 18.7305 18C17.7295 18 16.918 18.7835 16.918 19.75C16.918 20.7165 17.7295 21.5 18.7305 21.5Z" fill="black" />
                                                    </svg>
                                                </Link>
                                            }
                                        </div>
                                        <div className="pt-4 border-t border-t-white">
                                            {isLoggedIn === true ?
                                                <Link href={"/panel"} className="flex items-center gap-2" onClick={() => setShowNav(false)}>
                                                    <svg width="25" height="24" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4987 11.6666C16.5007 11.6666 18.1237 10.0996 18.1237 8.16659C18.1237 6.23359 16.5007 4.66659 14.4987 4.66659C12.4967 4.66659 10.8737 6.23359 10.8737 8.16659C10.8737 10.0996 12.4967 11.6666 14.4987 11.6666ZM14.4987 13.9999C17.8354 13.9999 20.5404 11.3882 20.5404 8.16659C20.5404 4.94492 17.8354 2.33325 14.4987 2.33325C11.162 2.33325 8.45703 4.94492 8.45703 8.16659C8.45703 11.3882 11.162 13.9999 14.4987 13.9999Z" fill="black" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.875 18.6666C8.20562 18.6666 6.04167 20.7559 6.04167 23.3333V24.4999C6.04167 25.1442 5.50068 25.6666 4.83333 25.6666C4.16599 25.6666 3.625 25.1442 3.625 24.4999V23.3333C3.625 19.4673 6.87094 16.3333 10.875 16.3333H18.125C22.1291 16.3333 25.375 19.4673 25.375 23.3333V24.4999C25.375 25.1442 24.834 25.6666 24.1667 25.6666C23.4993 25.6666 22.9583 25.1442 22.9583 24.4999V23.3333C22.9583 20.7559 20.7944 18.6666 18.125 18.6666H10.875Z" fill="black" />
                                                    </svg>
                                                    حساب کاربری
                                                </Link> :
                                                <Link href={"/login"} className="flex items-center gap-2" onClick={() => setShowNav(false)}>
                                                    <svg width="25" height="24" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4987 11.6666C16.5007 11.6666 18.1237 10.0996 18.1237 8.16659C18.1237 6.23359 16.5007 4.66659 14.4987 4.66659C12.4967 4.66659 10.8737 6.23359 10.8737 8.16659C10.8737 10.0996 12.4967 11.6666 14.4987 11.6666ZM14.4987 13.9999C17.8354 13.9999 20.5404 11.3882 20.5404 8.16659C20.5404 4.94492 17.8354 2.33325 14.4987 2.33325C11.162 2.33325 8.45703 4.94492 8.45703 8.16659C8.45703 11.3882 11.162 13.9999 14.4987 13.9999Z" fill="black" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.875 18.6666C8.20562 18.6666 6.04167 20.7559 6.04167 23.3333V24.4999C6.04167 25.1442 5.50068 25.6666 4.83333 25.6666C4.16599 25.6666 3.625 25.1442 3.625 24.4999V23.3333C3.625 19.4673 6.87094 16.3333 10.875 16.3333H18.125C22.1291 16.3333 25.375 19.4673 25.375 23.3333V24.4999C25.375 25.1442 24.834 25.6666 24.1667 25.6666C23.4993 25.6666 22.9583 25.1442 22.9583 24.4999V23.3333C22.9583 20.7559 20.7944 18.6666 18.125 18.6666H10.875Z" fill="black" />
                                                    </svg>
                                                </Link>
                                            }
                                        </div>
                                        <Link href={"/contact"} onClick={() => setShowNav(false)}>
                                            تماس با ما
                                        </Link>
                                        <Link href={"/about"} onClick={() => setShowNav(false)}>
                                            درباره ما
                                        </Link>
                                        <Link href={"/blog"} onClick={() => setShowNav(false)}>
                                            وبلاگ
                                        </Link>
                                        <Link href={"/seller-login"} onClick={() => setShowNav(false)}>
                                            فروش قطعه
                                        </Link>
                                        <Link href={"/international-sell"} onClick={() => setShowNav(false)}>
                                            سفارش بین المللی
                                        </Link>
                                        <Link href={"/"} onClick={() => setShowNav(false)}>
                                            خانه
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div> : ""
                    }

                </>

            }
        </>
    )
}

export default Header;