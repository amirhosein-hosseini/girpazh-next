import { useAuth } from "@/context/authContext";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllProductCategories } from "@/api/categories";
import Image from "next/image";

const Footer = () => {

    const [formData, setFormData] = useState({
        email: "",
        type: "email_subscription",
    });
    const [isMobile, setIsMobile] = useState(false);
    const {isLoggedIn} = useAuth();
    const [showCategory , setShowCategory] = useState(false);
    const [categories , setCategories] = useState(null);



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


    // get categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllProductCategories();
                setCategories(data?.data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = (e) => {

        e.preventDefault();


        axios.post(url + "/" + prefix + '/request/send', formData)
            .then((response) => {
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
            .finally(() => {
                console.log("final")
            });
    };







    
    return(
        <>
            {isMobile === false ? 
                    <div className={styles.footer + " bg-white py-10"}>
                    <div className={styles.footerContainer + " container w-11/12 max-w-[1200px] mx-auto py-10 max-md:pt-0 max-md:pb-5"}>
                        <div className={styles.top + " flex max-md:flex-col items-start  gap-5 max-md:gap-[5px]"}>
                            <div className={styles.footerSocial + " w-1/3 max-md:w-full flex flex-col justify-center items-center"}>
                                <p className="font-bold">
                                    با ما در ارتباط باشید 
                                </p>
                                <div className="mt-4 flex gap-2">
                                    <a href="https://www.instagram.com/girpazhcom/" target="_blank" className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                                        <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                                    </a>
                                    <a href="https://Wa.me//0989128871800" target="_blank" className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                                        <svg className="w-[18px] mt-[-1px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                                    </a>
                                    <a href="https://t.me/rabanipartadmin" target="_blank" className="w-7 h-7 bg-transparent rounded-full flex items-center justify-center">
                                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="#000000" d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/></svg>
                                    </a>
                                    <a href="https://youtube.com/@girpazhir?si=bU38b0cyBuDEuc9I" target="_blank" className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                                        <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>
                                    </a>
                                </div>
                            </div>
                            <div className={styles.footerLinks + " w-2/3 max-md:w-full max-md:mt-10 flex items-start gap-12 max-md:gap-[5px] text-right justify-between"}>
                                <div className={styles.item}>
                                    <p className="font-bold mb-4 text-xl max-md:text-sm">
                                        دسترسی سریع 
                                    </p>
                                    <ul className="flex flex-col gap-2" style={{listStyle: "none"}}>
                                        <li>
                                            <Link href={"/car/kia"} className="text-sm max-md:text-xs">قطعات کیا </Link>
                                        </li>
                                        <li>
                                            <Link href={"/car/hyundai"} className="text-sm max-md:text-xs">قطعات هیوندای</Link>
                                        </li>
                                        {/* <li>
                                            <Link href={"/privacy-policy"} className="text-sm max-md:text-xs">مرکز پشتیبانی گیرپاژ </Link>
                                        </li> */}
                                    </ul>
                                </div>
                                <div className={styles.item}>
                                    <p className="font-bold mb-4 text-xl max-md:text-sm">
                                        درباره گیرپاژ  
                                    </p>
                                    <ul className="flex flex-col gap-2" style={{listStyle: "none"}}>
                                        <li>
                                            <Link href={"/about"} className="text-sm max-md:text-xs">درباره ما</Link>
                                        </li>
                                        <li>
                                            <Link href={"/contact"} className="text-sm max-md:text-xs">تماس با ما</Link>
                                        </li>
                                        {/* <li>
                                            <Link href={"/privacy-policy"} className="text-sm max-md:text-xs">سوالات متداول</Link>
                                        </li> */}
                                    </ul>
                                </div>
                                <div className={styles.item}>
                                    <p className="font-bold mb-4 text-xl max-md:text-sm">
                                        راهنمای خرید 
                                    </p>
                                    <ul className="flex flex-col gap-2" style={{listStyle: "none"}}>
                                        <li>
                                            <Link href={"/privacy-policy"} className="text-sm max-md:text-xs">نحوه ثبت سفارش و پرداخت</Link>
                                        </li>
                                        {/* <li>
                                            <Link href={"/privacy-policy"} className="text-sm max-md:text-xs">روش های پرداخت</Link>
                                        </li> */}
                                        <li>
                                            <Link href={"/privacy-policy"} className="text-sm max-md:text-xs">شرایط مرجوعی</Link>
                                        </li>
                                        <li>
                                            <Link href={"/privacy-policy"} className="text-sm max-md:text-xs">اصالت کالا و گارانتی</Link>
                                        </li>
                                        {/* <li>
                                            <Link href={"/privacy-policy"} className="text-sm max-md:text-xs">گارانتی قطعات</Link>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={styles.bottom + " flex max-md:flex-col-reverse items-center justify-between gap-10"}>
                            <div className="w-1/2 max-md:w-full">
                                <div className={styles.emailInput + " mt-20 max-md:mt-2 text-right flex flex-col"}>
                                    <p className="mb-2 text-xs">
                                        برای اطلاع از آخرین قطعه‌ها، ایمیل خود را ثبت نمایید.
                                    </p>
                                    <form>
                                        <div className={styles.formgroup + " relative"}>
                                            <input 
                                                name="email"
                                                className="w-full bg-[#F0F0F0] text-right text-black p-2" 
                                                type="email" 
                                                placeholder="ثبت ایمیل " 
                                                value={formData.email}
                                                onChange={handleChange}
                                            />                                
                                            <div className="cursor-pointer absolute left-0 top-0 border-r border-r-[#444444] px-1 py-1" onClick={handleSubmit}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                                                    <path d="M3.07627 8.27989C3.0676 8.49118 3.06761 8.72723 3.06763 8.97849V23.9118C3.06761 24.2505 3.06759 24.5616 3.08883 24.8216C3.11174 25.102 3.16417 25.4087 3.31853 25.7116C3.53923 26.1448 3.89139 26.4969 4.32454 26.7176C4.62748 26.872 4.9342 26.9244 5.21456 26.9473C5.4746 26.9686 5.78566 26.9686 6.12436 26.9686H26.3192C26.6579 26.9686 26.969 26.9686 27.229 26.9473C27.5094 26.9244 27.8161 26.872 28.1191 26.7176C28.5522 26.4969 28.9044 26.1448 29.1251 25.7116C29.2794 25.4087 29.3319 25.102 29.3548 24.8216C29.376 24.5616 29.376 24.2505 29.376 23.9118V8.9786C29.376 8.7273 29.376 8.49121 29.3673 8.27989L17.6795 17.8427C16.8315 18.5365 15.6121 18.5365 14.7641 17.8427L3.07627 8.27989Z" fill="#444444"/>
                                                    <path d="M28.5145 6.42828C28.3924 6.33035 28.26 6.24461 28.1191 6.17278C27.8161 6.01842 27.5094 5.96599 27.229 5.94308C26.969 5.92184 26.658 5.92186 26.3194 5.92188H6.12437C5.78572 5.92186 5.47457 5.92184 5.21456 5.94308C4.9342 5.96599 4.62748 6.01842 4.32454 6.17278C4.18357 6.24461 4.05119 6.33035 3.92912 6.42828L16.0136 16.3155C16.1347 16.4147 16.3089 16.4147 16.43 16.3155L28.5145 6.42828Z" fill="#444444"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className={styles.logos + " flex items-center justify-between mt-6"}>
                                    <div className={styles.item + " max-w-[65px] overflow-hidden"}>
                                        <Link href={"/certificate"}>
                                            <Image className="object-cover w-full" src="/images/logo1.png" alt="logo" width={100} height={100} />
                                        </Link>
                                    </div>
                                    <div className={styles.item + " max-w-[65px] overflow-hidden"}>
                                        <Link href={"/certificate"}>
                                            <Image className="object-cover w-full" src="/images/logo2.png" alt="logo" width={100} height={100} />
                                        </Link>
                                    </div>
                                    <div className={styles.item + " max-w-[65px] overflow-hidden"}>
                                        <Link href={"/certificate"}>
                                            <Image className="object-cover w-full" src="/images/logo3.png" alt="logo" width={100} height={100} />
                                        </Link>
                                    </div>
                                    {/* <div className={styles.item + " max-w-[65px] overflow-hidden"}>
                                        <Link href={"/certificate"}>
                                            <img className="object-cover w-full" src="../../images/logo4.png" alt="logo" />
                                        </Link>
                                    </div> */}
                                </div>
                            </div>
                            <div className="w-1/2 max-md:w-full flex flex-col gap-3 justify-end mt-12 max-md:mt-8">
                                <div className="flex items-cetner gap-2 justify-end">
                                    <p className="text-sm" style={{direction: "ltr"}}>
                                        0902 887 1800
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
                                        <g clip-path="url(#clip0_402_6236)">
                                            <path d="M15.2265 5.05862C16.2147 5.25142 17.1229 5.73471 17.8348 6.44664C18.5468 7.15857 19.0301 8.06675 19.2229 9.05494M15.2265 1.01172C17.2796 1.2398 19.1941 2.15919 20.6557 3.61894C22.1173 5.07869 23.0391 6.99204 23.2698 9.04482M22.258 17.1184V20.1536C22.2592 20.4353 22.2015 20.7142 22.0886 20.9724C21.9757 21.2306 21.8101 21.4623 21.6025 21.6528C21.3949 21.8433 21.1498 21.9883 20.8828 22.0786C20.6159 22.1689 20.3331 22.2024 20.0525 22.177C16.9392 21.8387 13.9487 20.7749 11.3213 19.071C8.87678 17.5177 6.80427 15.4452 5.25093 13.0007C3.54109 10.3613 2.47702 7.35624 2.14493 4.22901C2.11965 3.94923 2.1529 3.66726 2.24256 3.40103C2.33223 3.13481 2.47634 2.89018 2.66573 2.68271C2.85512 2.47523 3.08564 2.30947 3.3426 2.19597C3.59957 2.08246 3.87735 2.02371 4.15826 2.02344H7.19344C7.68444 2.01861 8.16044 2.19248 8.53273 2.51265C8.90501 2.83281 9.14817 3.27742 9.21689 3.76361C9.345 4.73494 9.58258 5.68865 9.9251 6.60656C10.0612 6.96868 10.0907 7.36223 10.01 7.74059C9.9293 8.11894 9.74184 8.46623 9.46982 8.7413L8.18493 10.0262C9.62518 12.5591 11.7224 14.6563 14.2553 16.0965L15.5402 14.8117C15.8153 14.5396 16.1625 14.3522 16.5409 14.2715C16.9192 14.1908 17.3128 14.2203 17.6749 14.3564C18.5928 14.6989 19.5465 14.9365 20.5179 15.0646C21.0093 15.1339 21.4582 15.3815 21.779 15.7601C22.0999 16.1388 22.2703 16.6222 22.258 17.1184Z" stroke="black" stroke-width="2.02345" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_402_6236">
                                            <rect width="24.2814" height="24.2814" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="flex items-cetner gap-2 justify-end">
                                    <p className="text-sm" style={{direction: "ltr"}}>
                                        028 33991236
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
                                        <g clip-path="url(#clip0_402_6236)">
                                            <path d="M15.2265 5.05862C16.2147 5.25142 17.1229 5.73471 17.8348 6.44664C18.5468 7.15857 19.0301 8.06675 19.2229 9.05494M15.2265 1.01172C17.2796 1.2398 19.1941 2.15919 20.6557 3.61894C22.1173 5.07869 23.0391 6.99204 23.2698 9.04482M22.258 17.1184V20.1536C22.2592 20.4353 22.2015 20.7142 22.0886 20.9724C21.9757 21.2306 21.8101 21.4623 21.6025 21.6528C21.3949 21.8433 21.1498 21.9883 20.8828 22.0786C20.6159 22.1689 20.3331 22.2024 20.0525 22.177C16.9392 21.8387 13.9487 20.7749 11.3213 19.071C8.87678 17.5177 6.80427 15.4452 5.25093 13.0007C3.54109 10.3613 2.47702 7.35624 2.14493 4.22901C2.11965 3.94923 2.1529 3.66726 2.24256 3.40103C2.33223 3.13481 2.47634 2.89018 2.66573 2.68271C2.85512 2.47523 3.08564 2.30947 3.3426 2.19597C3.59957 2.08246 3.87735 2.02371 4.15826 2.02344H7.19344C7.68444 2.01861 8.16044 2.19248 8.53273 2.51265C8.90501 2.83281 9.14817 3.27742 9.21689 3.76361C9.345 4.73494 9.58258 5.68865 9.9251 6.60656C10.0612 6.96868 10.0907 7.36223 10.01 7.74059C9.9293 8.11894 9.74184 8.46623 9.46982 8.7413L8.18493 10.0262C9.62518 12.5591 11.7224 14.6563 14.2553 16.0965L15.5402 14.8117C15.8153 14.5396 16.1625 14.3522 16.5409 14.2715C16.9192 14.1908 17.3128 14.2203 17.6749 14.3564C18.5928 14.6989 19.5465 14.9365 20.5179 15.0646C21.0093 15.1339 21.4582 15.3815 21.779 15.7601C22.0999 16.1388 22.2703 16.6222 22.258 17.1184Z" stroke="black" stroke-width="2.02345" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_402_6236">
                                            <rect width="24.2814" height="24.2814" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="flex items-cetner gap-2 justify-end">
                                    <p className="text-sm" style={{direction: "ltr"}}>
                                        028 33991575
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
                                        <g clip-path="url(#clip0_402_6236)">
                                            <path d="M15.2265 5.05862C16.2147 5.25142 17.1229 5.73471 17.8348 6.44664C18.5468 7.15857 19.0301 8.06675 19.2229 9.05494M15.2265 1.01172C17.2796 1.2398 19.1941 2.15919 20.6557 3.61894C22.1173 5.07869 23.0391 6.99204 23.2698 9.04482M22.258 17.1184V20.1536C22.2592 20.4353 22.2015 20.7142 22.0886 20.9724C21.9757 21.2306 21.8101 21.4623 21.6025 21.6528C21.3949 21.8433 21.1498 21.9883 20.8828 22.0786C20.6159 22.1689 20.3331 22.2024 20.0525 22.177C16.9392 21.8387 13.9487 20.7749 11.3213 19.071C8.87678 17.5177 6.80427 15.4452 5.25093 13.0007C3.54109 10.3613 2.47702 7.35624 2.14493 4.22901C2.11965 3.94923 2.1529 3.66726 2.24256 3.40103C2.33223 3.13481 2.47634 2.89018 2.66573 2.68271C2.85512 2.47523 3.08564 2.30947 3.3426 2.19597C3.59957 2.08246 3.87735 2.02371 4.15826 2.02344H7.19344C7.68444 2.01861 8.16044 2.19248 8.53273 2.51265C8.90501 2.83281 9.14817 3.27742 9.21689 3.76361C9.345 4.73494 9.58258 5.68865 9.9251 6.60656C10.0612 6.96868 10.0907 7.36223 10.01 7.74059C9.9293 8.11894 9.74184 8.46623 9.46982 8.7413L8.18493 10.0262C9.62518 12.5591 11.7224 14.6563 14.2553 16.0965L15.5402 14.8117C15.8153 14.5396 16.1625 14.3522 16.5409 14.2715C16.9192 14.1908 17.3128 14.2203 17.6749 14.3564C18.5928 14.6989 19.5465 14.9365 20.5179 15.0646C21.0093 15.1339 21.4582 15.3815 21.779 15.7601C22.0999 16.1388 22.2703 16.6222 22.258 17.1184Z" stroke="black" stroke-width="2.02345" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_402_6236">
                                            <rect width="24.2814" height="24.2814" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="flex items-cetner gap-2 justify-end">
                                    <p className="text-sm">
                                        قزوین بلوار آیت الله خامنه ای مجتمع نیایش طبقه اول
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 12.4952 18.8883 14.8173 17.5726 16.7017C16.251 18.5946 14.6734 20.1174 13.6287 21.0297C12.6885 21.8509 11.3115 21.8509 10.3713 21.0297C9.32656 20.1174 7.749 18.5946 6.4274 16.7017C5.11171 14.8173 4 12.4952 4 10ZM8.875 10C8.875 8.27411 10.2741 6.875 12 6.875C13.7259 6.875 15.125 8.27411 15.125 10C15.125 11.7259 13.7259 13.125 12 13.125C10.2741 13.125 8.875 11.7259 8.875 10Z" fill="black"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : 
                <div className={styles.header + " fixed bottom-0 bg-[#E8E8E8] flex container w-11/12 mx-auto justify-between items-center my-4 rounded-xl px-6 py-2"} style={{ left: "50%", transform: "translate(-50%,0)" }}>
                    {isLoggedIn === true ? 
                        <Link href={"/panel"} className={styles.item + " flex flex-col items-center justify-center gap-1"}>
                            <img src="../../images/usericon.png" alt="icon" />
                            <p className="text-xs">
                                گیرپاژ من
                            </p>
                        </Link> :
                        <Link href={"/login"} className={styles.item + " flex flex-col items-center justify-center gap-1"}>
                            <img src="../../images/usericon.png" alt="icon" />
                            <p className="text-xs">
                                گیرپاژ من
                            </p>
                        </Link>
                    }

                    <Link href={"/special"} className={styles.item + " flex flex-col items-center justify-center gap-1"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 19 19" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.50001 1.58335C6.47103 1.58335 3.88979 3.78161 3.40748 6.77195L2.48071 12.5179C2.26723 13.8415 3.28932 15.0417 4.63001 15.0417H5.94375C6.61601 16.4272 7.93218 17.4167 9.50002 17.4167C11.0678 17.4167 12.384 16.4272 13.0563 15.0417H14.37C15.7107 15.0417 16.7328 13.8415 16.5193 12.5179L15.5925 6.77195C15.1102 3.78161 12.529 1.58335 9.50001 1.58335ZM11.6799 15.0417H7.32016C7.85658 15.7838 8.64989 16.2292 9.50002 16.2292C10.3501 16.2292 11.1435 15.7838 11.6799 15.0417Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.47956 1.76665C4.70538 2.00442 4.6957 2.38023 4.45793 2.60606C3.5217 3.49526 2.82098 4.62855 2.45734 5.90281C2.36735 6.21814 2.03878 6.40082 1.72345 6.31084C1.40812 6.22085 1.22544 5.89228 1.31543 5.57695C1.73867 4.0938 2.55358 2.77701 3.64015 1.74502C3.87792 1.51919 4.25373 1.52888 4.47956 1.76665ZM14.5205 1.76665C14.7463 1.52888 15.1221 1.51919 15.3599 1.74502C16.4465 2.77701 17.2614 4.0938 17.6846 5.57695C17.7746 5.89228 17.5919 6.22085 17.2766 6.31084C16.9613 6.40082 16.6327 6.21814 16.5427 5.90281C16.1791 4.62855 15.4783 3.49526 14.5421 2.60606C14.3043 2.38023 14.2947 2.00442 14.5205 1.76665Z" fill="black" />
                        </svg>
                        <p className="text-xs">
                            پیشنهاد ویژه
                        </p>
                    </Link>
                    <div className={styles.item + " flex flex-col items-center justify-center gap-1"} onClick={() => setShowCategory(!showCategory)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M17.4815 3.04336C18.0281 3.08803 18.5082 3.18239 18.9525 3.40873C19.6581 3.76825 20.2317 4.34193 20.5913 5.04754C20.8176 5.49175 20.912 5.9719 20.9566 6.51853C21 7.04944 21 7.70506 21 8.5179V10.25C21 10.6642 20.6642 11 20.25 11H13.75C13.3358 11 13 10.6642 13 10.25V3.75C13 3.33579 13.3358 3 13.75 3H15.4821C16.2949 2.99999 16.9506 2.99999 17.4815 3.04336Z" fill="black" />
                            <path d="M8.5179 3H10.25C10.6642 3 11 3.33579 11 3.75V10.25C11 10.6642 10.6642 11 10.25 11H3.75C3.33579 11 3 10.6642 3 10.25V8.5179C2.99999 7.70506 2.99999 7.04944 3.04336 6.51853C3.08803 5.9719 3.18239 5.49175 3.40873 5.04754C3.76825 4.34193 4.34193 3.76825 5.04754 3.40873C5.49175 3.18239 5.9719 3.08803 6.51853 3.04336C7.04944 2.99999 7.70506 2.99999 8.5179 3Z" fill="black" />
                            <path d="M3 13.75C3 13.3358 3.33579 13 3.75 13H10.25C10.6642 13 11 13.3358 11 13.75V20.25C11 20.6642 10.6642 21 10.25 21H8.5179C7.70506 21 7.04944 21 6.51853 20.9566C5.9719 20.912 5.49175 20.8176 5.04754 20.5913C4.34193 20.2317 3.76825 19.6581 3.40873 18.9525C3.18239 18.5082 3.08803 18.0281 3.04336 17.4815C2.99999 16.9506 2.99999 16.2949 3 15.4821V13.75Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17 13.0078C14.7909 13.0078 13 14.7987 13 17.0078C13 19.217 14.7909 21.0078 17 21.0078C17.8352 21.0078 18.6113 20.7513 19.2528 20.3134L20.5983 21.659C20.8912 21.9519 21.3661 21.9519 21.659 21.659C21.9519 21.3661 21.9519 20.8912 21.659 20.5984L20.312 19.2513C20.7459 18.6116 21 17.839 21 17.0078C21 14.7987 19.2091 13.0078 17 13.0078ZM14.5 17.0078C14.5 15.6271 15.6193 14.5078 17 14.5078C18.3807 14.5078 19.5 15.6271 19.5 17.0078C19.5 17.6969 19.2222 18.3196 18.7708 18.7726C18.3173 19.2276 17.6921 19.5078 17 19.5078C15.6193 19.5078 14.5 18.3885 14.5 17.0078Z" fill="black" />
                        </svg>
                        <p className="text-xs">
                            دسته بندی ها
                        </p>
                    </div>
                    {isLoggedIn === true ? 
                        <Link href={"/cart"} className={styles.item + " flex flex-col items-center justify-center gap-1"}>
                            <svg width="22" height="20" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.66667C0 1.02233 0.540989 0.5 1.20833 0.5H1.73812C3.40152 0.5 4.85146 1.59304 5.25489 3.15112L5.47469 4H19.9457C22.2648 4 23.9874 6.07346 23.4844 8.25926L22.1418 14.0926C21.7732 15.694 20.3021 16.8333 18.6031 16.8333H9.13688C7.47348 16.8333 6.02354 15.7403 5.62011 14.1822L2.91038 3.71704C2.7759 3.19768 2.29259 2.83333 1.73812 2.83333H1.20833C0.540989 2.83333 0 2.311 0 1.66667ZM6.07886 6.33333L7.96462 13.6163C8.0991 14.1357 8.58241 14.5 9.13688 14.5H18.6031C19.1694 14.5 19.6598 14.1202 19.7826 13.5864L21.1252 7.75309C21.2929 7.02449 20.7187 6.33333 19.9457 6.33333H6.07886Z" fill="black" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0625 21.5C10.0635 21.5 10.875 20.7165 10.875 19.75C10.875 18.7835 10.0635 18 9.0625 18C8.06148 18 7.25 18.7835 7.25 19.75C7.25 20.7165 8.06148 21.5 9.0625 21.5Z" fill="black" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7305 21.5C19.7315 21.5 20.543 20.7165 20.543 19.75C20.543 18.7835 19.7315 18 18.7305 18C17.7295 18 16.918 18.7835 16.918 19.75C16.918 20.7165 17.7295 21.5 18.7305 21.5Z" fill="black" />
                            </svg>
                            <p className="text-xs">
                                سبد خرید
                            </p>
                        </Link> :
                        <Link href={"/login"} className={styles.item + " flex flex-col items-center justify-center gap-1"}>
                            <svg width="22" height="20" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.66667C0 1.02233 0.540989 0.5 1.20833 0.5H1.73812C3.40152 0.5 4.85146 1.59304 5.25489 3.15112L5.47469 4H19.9457C22.2648 4 23.9874 6.07346 23.4844 8.25926L22.1418 14.0926C21.7732 15.694 20.3021 16.8333 18.6031 16.8333H9.13688C7.47348 16.8333 6.02354 15.7403 5.62011 14.1822L2.91038 3.71704C2.7759 3.19768 2.29259 2.83333 1.73812 2.83333H1.20833C0.540989 2.83333 0 2.311 0 1.66667ZM6.07886 6.33333L7.96462 13.6163C8.0991 14.1357 8.58241 14.5 9.13688 14.5H18.6031C19.1694 14.5 19.6598 14.1202 19.7826 13.5864L21.1252 7.75309C21.2929 7.02449 20.7187 6.33333 19.9457 6.33333H6.07886Z" fill="black" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0625 21.5C10.0635 21.5 10.875 20.7165 10.875 19.75C10.875 18.7835 10.0635 18 9.0625 18C8.06148 18 7.25 18.7835 7.25 19.75C7.25 20.7165 8.06148 21.5 9.0625 21.5Z" fill="black" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7305 21.5C19.7315 21.5 20.543 20.7165 20.543 19.75C20.543 18.7835 19.7315 18 18.7305 18C17.7295 18 16.918 18.7835 16.918 19.75C16.918 20.7165 17.7295 21.5 18.7305 21.5Z" fill="black" />
                            </svg>
                            <p className="text-xs">
                                سبد خرید
                            </p>
                        </Link>
                    }
                    <div style={showCategory === true ? { transform: "translateY(0%)", overflowY: 'scroll', boxShadow: "-2px -6px 17.1px 0px rgba(0, 0, 0, 0.17)" } : { transform: "translateY(100%)" }} className={styles.mobileCategory + " fixed bottom-[-20px] left-0 bg-white z-50 w-full rounded-tr-2xl rounded-tl-2xl p-4 duration-300 max-h-[500px] pb-10"}>
                        <div>
                            <div className="mb-1">
                                <svg onClick={() => setShowCategory(!showCategory)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11612 4.11612C4.60427 3.62796 5.39573 3.62796 5.88388 4.11612L12 10.2322L18.1161 4.11612C18.6043 3.62796 19.3957 3.62796 19.8839 4.11612C20.372 4.60427 20.372 5.39573 19.8839 5.88388L13.7678 12L19.8839 18.1161C20.372 18.6043 20.372 19.3957 19.8839 19.8839C19.3957 20.372 18.6043 20.372 18.1161 19.8839L12 13.7678L5.88388 19.8839C5.39573 20.372 4.60427 20.372 4.11612 19.8839C3.62796 19.3957 3.62796 18.6043 4.11612 18.1161L10.2322 12L4.11612 5.88388C3.62796 5.39573 3.62796 4.60427 4.11612 4.11612Z" fill="#110000" />
                                </svg>
                            </div>
                            <div className="mt-2">
                                <div className="mb-1">
                                    <p>
                                        دسته بندی ها
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 justify-end text-right items-end mt-3">
                                    {categories?.map((item) => (
                                        <Link href={"/category/" + item?.slug} className="flex items-center gap-1 flex-row-reverse" onClick={() => setShowCategory(!showCategory)}>
                                            <p className="text-[#8D8989] text-sm cursor-pointer">
                                                {item?.name}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        
        </>

    )
}

export default Footer;