import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { DeRedPrimaryButton, RedPrimaryButton, SecondPrimaryButton } from "../button";
import MyImageGallery from "../gallery/imageGallery";
import { showProduct } from "../../api/shop";
import { getUserChassis } from "../../api/user";
import axios from "axios";
import { prefix, url } from "../../api/domain";
import { getCookie } from "../../api/auth";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import ShopItem from "./shopItem";
import Link from "next/link";
import ProductDesc from "./productDesc";
import ProductOponion from "./productOponion";
import Head from "next/head";
import CustomImageGallery from "../gallery/customImageGallery";
import jalaali from 'jalaali-js';


const SingleShop = ({slug}) => {

    const {isLoggedIn} = useAuth();
    const token = getCookie('token');
    const [display , setDisplay] = useState(false);
    const [data , setData] = useState(null);
    const [chassis , setChassis] = useState(null);
    const propUpRef = useRef(null);
    const [reload , setReload] = useState(1);
    const [activeChassi , setActiveChassi] = useState(null);
    const [copyStatus, setCopyStatus] = useState("کپی لینک");
    const [showShare , setShowShare] = useState(false);
    const [descLevel , setDescLevel] = useState("desc");
    const [activePrice , setActivePrice] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        number: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };




    const handleSubmit = (e) => {

        e.preventDefault();


        axios.post(url + "/" + prefix + '/user/chassis/create', formData , {
            headers : {
                'Authorization' : 'Bearer ' + token,
            }
        })
            .then((response) => {
                toast.success(response.data?.message);
                setReload(reload + 1);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
            })
            .finally(() => {
                console.log("final")
            });
    };


    const handleAddToCart = (e) => {

        e.preventDefault();


        axios.post(url + "/" + prefix + '/cart/add', {postID : data?.product?.id , guarantee : null , chassi_id : activeChassi} , {
            headers : {
                'Authorization' : 'Bearer ' + token,
            }
        })
            .then((response) => {
                toast.success(response.data?.message);
                setDisplay(false)
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
            })
            .finally(() => {
                console.log("final")
            });
    };




    // get data for user chassis
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getUserChassis();
            setChassis(data?.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [reload]);




    const addToCart = () => {
        setDisplay(true)
    }


    // funcotion for handeling show popup
    useEffect(() => {
        if (display) {
            // Disable scrolling
            document.body.classList.add("noScroll");
        } else {
            // Enable scrolling
            document.body.classList.remove("noScroll");
        }
    }, [display]);


    // Function to handle the click event outside of the popup
    const handleClickOutside = (event) => {
        if (propUpRef.current && !propUpRef.current.contains(event.target)) {
            setDisplay(false);
        }
    };


    // Add event listener when the component mounts
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            // Cleanup: remove event listener when the component unmounts
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);




    // get data for product item
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await showProduct(slug);
            setData(data?.data?.data);
            setActivePrice(data?.data?.data?.product?.offPrice)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [reload , slug]);



    const parsToArray = (string) => {
        let actualArray = JSON.parse(string);
        return actualArray
    }


    const formatNumberWithThousandSeparator = (number) => {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const disableScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
        document.body.style.overflow = 'visible';
    };

    const handleShowShare = (status) => {
        if (status === true){
            setShowShare(true)
            disableScroll()
        } else if(status === false){
            setShowShare(false)
            enableScroll()
        }
    }

    const copyLink = async () => {
        try {
          // Get the current page URL
          const currentUrl = window.location.href;
          
          // Copy the URL to clipboard
          await navigator.clipboard.writeText(currentUrl);
          
          // Update status to show it was copied
          setCopyStatus("کپی شد");
          
          // Reset status after 2 seconds
          setTimeout(() => setCopyStatus("کپی لینک"), 5000);
        } catch (err) {
          console.error('Failed to copy: ', err);
          setCopyStatus('Failed to copy');
        }
      };

      const handleScrollDesc =() => {
        setDescLevel("desc");
        const targetElement = document.getElementById('desc');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }

      const handleScrollValue =() => {
        setDescLevel("value");
        const targetElement = document.getElementById('value');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }

      const handleScrollGr =() => {
        setDescLevel("gr");
        const targetElement = document.getElementById('gr');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }

      const handleScrollInstall =() => {
        setDescLevel("install");
        const targetElement = document.getElementById('install');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }

      const persianMonths = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
      ];


    // Get today's Gregorian date
    const todayGregorian = new Date();

    // Convert to Jalali date
    const todayJalali = jalaali.toJalaali(todayGregorian);

    // Get day, month, and year in Jalali
    const jalaliDay = todayJalali.jd;
    const jalaliMonth = persianMonths[todayJalali.jm - 1]; // Month is 1-based
    const jalaliYear = todayJalali.jy;

    const dateTitle = ` در تاریخ ${jalaliDay} ${jalaliMonth} ${jalaliYear}`
    



    




    return(
        <>
            <Head>
                {
                    data?.product?.follow === 1 && data?.product?.index === 1 ? <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" /> :
                        data?.product?.follow === 1 && data?.product?.index === 0 ? <meta name="robots" content="follow, noindex" /> :
                            data?.product?.follow === 0 && data?.product?.index === 1 ? <meta name="robots" content="nofollow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" /> :
                                data?.product?.follow === 0 && data?.product?.index === 0 ? <meta name="robots" content="nofollow, noindex" /> : ""
                }
                <link rel="canonical" href={data?.product?.canonical === null || data?.product?.canonical === "" ? `https://girpazh.com/product/${data?.product?.slug}` : data?.product?.canonical} />
                <title>{data?.product?.meta}</title>
                {/* <meta name="title">{jalaliDay} {jalaliMonth} {jalaliYear} در تاریخ {data?.product?.meta} محصول</meta> */}
                <meta name="title">{data?.product?.meta}</meta>
                <meta property="article:published_time" content={data?.product?.created_at}></meta>
                <meta property="article:modified_time" content={data?.product?.updated_at}></meta>
                <meta property="og:updated_time" content={data?.product?.updated_at}></meta>
            </Head>
            {showShare === true ? 
                <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center" style={{ zIndex: '2000', background: "rgb(0,0,0,50%)" }}>
                    <div className="bg-white max-w-[500px] w-11/12 rounded-lg">
                        <div className="flex items-center justify-between flex-row-reverse p-4" style={{ borderBottom: "2px solid rgb(0,0,0,40%)" }}>
                            <p>
                                اشتراک گزاری
                            </p>
                            <svg className="w-3 cursor-pointer" onClick={() => handleShowShare(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg>
                        </div>
                        <div className="p-4">
                            <p className="text-center text-sm">
                                لینک را با دوستان خود به اشتراک بگزارید
                            </p>
                            <button className="border rounded-lg flex w-full items-center justify-center gap-2 flex-row-rverse mt-4 p-2" style={{ border: "2px solid rgb(0,0,0,40%)" }} onClick={copyLink}>
                                {copyStatus}
                                <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" /></svg>
                            </button>
                        </div>
                    </div>
                </div> : ""
            }
            <div className={styles.singleShop + " relative mb-20 mt-20 max-md:mt-0 max-md:pt-10"}>
                {display === true ?
                    <div className={styles.cartPopUp + ` absolute top-0 left-0 w-full h-full z-50 ${display === true ? "flex" : "hidden"} items-start pt-[150px] max-md:pt-[30px] justify-center`}>
                        <div className={styles.container + " rounded-lg overflow-hidden w-5/12 max-md:w-11/12 bg-white"}>
                            <div className={styles.header + " bg-[#E14957] flex items-center justify-between px-4 py-1"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 70 70" fill="none">
                                    <path d="M51.3331 15.4876L34.8539 6.6209C33.1039 5.68757 31.0331 5.68757 29.2831 6.6209L12.8331 15.4876C11.6372 16.1584 10.8789 17.4417 10.8789 18.8417C10.8789 20.2709 11.6081 21.5542 12.8331 22.1959L29.3122 31.0626C30.1872 31.5292 31.1497 31.7626 32.0831 31.7626C33.0164 31.7626 34.0081 31.5292 34.8539 31.0626L51.3331 22.1959C52.5289 21.5542 53.2872 20.2709 53.2872 18.8417C53.2872 17.4417 52.5289 16.1584 51.3331 15.4876Z" fill="white"/>
                                    <path d="M26.6006 34.1541L11.2882 26.5124C10.0923 25.8999 8.75065 25.9874 7.61315 26.6582C6.50482 27.3582 5.83398 28.5541 5.83398 29.8666V44.3332C5.83398 46.8416 7.23398 49.0874 9.47982 50.2249L24.7923 57.8666C25.3173 58.1291 25.9007 58.2749 26.484 58.2749C27.1548 58.2749 27.8548 58.0707 28.4673 57.7207C29.5757 57.0207 30.2465 55.8249 30.2465 54.5124V40.0457C30.2173 37.5374 28.8173 35.2916 26.6006 34.1541Z" fill="white"/>
                                    <path d="M58.3345 29.8666V37.0416C56.9345 36.6332 55.447 36.4582 53.9595 36.4582C49.9928 36.4582 46.1137 37.8291 43.0512 40.2791C38.8512 43.5749 36.4595 48.5624 36.4595 53.9582C36.4595 55.3874 36.6345 56.8166 37.0137 58.1874C36.5762 58.1291 36.1387 57.9541 35.7303 57.6916C34.622 57.0207 33.9512 55.8249 33.9512 54.5124V40.0457C33.9512 37.5374 35.3512 35.2916 37.5678 34.1541L52.8803 26.5124C54.0762 25.8999 55.4178 25.9874 56.5553 26.6582C57.6637 27.3582 58.3345 28.5541 58.3345 29.8666Z" fill="white"/>
                                    <path d="M64.109 45.646C61.7173 42.7002 58.0715 40.8335 53.959 40.8335C50.8673 40.8335 48.009 41.9127 45.7632 43.721C42.7298 46.1127 40.834 49.8168 40.834 53.9585C40.834 58.071 42.7007 61.7168 45.6465 64.1085C47.8923 65.9752 50.809 67.0835 53.959 67.0835C57.284 67.0835 60.2882 65.8293 62.6215 63.8168C65.334 61.396 67.084 57.896 67.084 53.9585C67.084 50.8085 65.9757 47.8918 64.109 45.646ZM56.9632 54.7752C56.9632 55.5335 56.5548 56.2627 55.9132 56.6418L51.8007 59.0918C51.4507 59.296 51.0715 59.4127 50.6632 59.4127C49.934 59.4127 49.2048 59.0335 48.7965 58.3627C48.184 57.3127 48.5048 55.971 49.5548 55.3585L52.5882 53.5502V49.8752C52.5882 48.6793 53.5798 47.6877 54.7757 47.6877C55.9715 47.6877 56.9632 48.6793 56.9632 49.8752V54.7752Z" fill="#29BE2F"/>
                                </svg>
                                {/* <p className="text-sm text-white">
                                    این کالا به سبد خرید شما اضافه گردید . 
                                </p> */}
                                <p className="text-white text-2xl cursor-pointer" onClick={() => setDisplay(false)}>
                                    X
                                </p>
                            </div>
                            <div className={styles.wrapper + " p-3"}>
                                {chassis?.length > 0 ?
                                    <div className={styles.old}>
                                        <p className="font-bold mb-3">
                                            شماره شاسی ثبت شده  
                                        </p>
                                        {chassis?.map((item) => (
                                            <div className="relative bg-[#D9D9D94D] flex items-center text-right p-2 mb-2" onClick={() => setActiveChassi(item?.id)}>
                                                <div className="flex gap-2 items-center ml-auto"> 
                                                    <p className="text-right ml-auto ">
                                                        {item?.number}
                                                    </p>
                                                    <p className="text-right ml-auto ">
                                                        {item?.name}
                                                    </p>
                                                </div>
                                                {item?.id === activeChassi ? 
                                                    <svg className="absolute cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 32 32" fill="none">
                                                        <rect x="0.32" y="0.32" width="31.36" height="31.36" fill="#FF3333" stroke="black" stroke-width="0.64"/>
                                                    </svg>
                                                    :
                                                    <svg className="absolute cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 32 32" fill="none">
                                                        <rect x="0.32" y="0.32" width="31.36" height="31.36" fill="transparent" stroke="black" stroke-width="0.64"/>
                                                    </svg>
                                                }
                                            </div>
                                        ))}
                                    </div> : ""
                                }
                                <div className={styles.new + " mt-4 mb-3"}>
                                    <p className="font-bold mb-3">
                                        اضافه کردن شماره شاسی جدید 
                                    </p>
                                    <form className="w-full m-x-auto flex justify-center items-center flex-col gap-4">
                                        <div className={styles.formgroup + " relative w-full flex gap-2 max-md:flex-col"}>
                                            <input
                                                type="text"
                                                name="number"
                                                className="border rounded-lg border-[#FF3333] placeholder-opacity-25 w-full py-3 px-5 text-xs tracking-widest"
                                                placeholder="شماره شاسی را وارد کنید"
                                                value={formData.number}
                                                onChange={handleChange}
                                            />
                                            <input
                                                type="text"
                                                name="name"
                                                className="border rounded-lg border-[#FF3333] placeholder-opacity-25 w-full py-3 px-5 text-xs tracking-widest"
                                                placeholder="نام خودرو"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={styles.button}>
                                            {isLoggedIn === false ?
                                                <Link href={"/login"}>
                                                    <button style={{border: "1px solid #FF3333"}} className="border-2 border-[#FF3333] text-[#FF3333] text-sm px-3 py-1 rounded-lg">
                                                        ثبت 
                                                    </button>
                                                </Link>
                                                : 
                                                <button style={{border: "1px solid #FF3333"}} className="border-2 border-[#FF3333] text-[#FF3333] text-sm px-3 py-1 rounded-lg" onClick={handleSubmit}>
                                                    ثبت 
                                                </button>
                                            }
                                        </div>
                                    </form>
                                </div>
                                    {
                                        isLoggedIn === false ?
                                        <div className={styles.button}>
                                            <Link href={"/login?redirect=/product/" + slug}>
                                                <SecondPrimaryButton>
                                                    اضافه کردن به سبد خرید 
                                                </SecondPrimaryButton>
                                            </Link>
                                        </div> 
                                        :
                                        activeChassi !== null ?
                                        <div className={styles.button} onClick={handleAddToCart}>
                                            <SecondPrimaryButton>
                                                اضافه کردن به سبد خرید 
                                            </SecondPrimaryButton>
                                        </div>
                                        :
                                        <div className={styles.button}>
                                            <DeRedPrimaryButton>
                                                اضافه کردن به سبد خرید 
                                            </DeRedPrimaryButton>
                                        </div>
                                    }
                            </div>
                        </div>
                    </div> : ""
                }
                {/* <div className="max-md:hidden">
                    <SpecialSaleBanner />
                </div> */}


                <div className={styles.container + " container w-11/12 max-w-[1200px] mx-auto flex flex-col"}>

                    <div className="flex items-center flex-row-reverse gap-2 text-xs text-[#8D8989] mb-5">
                        <Link className="hover:text-black duration-300" href={"/"}>
                            گیرپاژ
                        </Link>
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 11L1 6L6 1" stroke="#8D8989" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <Link href={"/category/" + data?.category[0]?.slug} className="hover:text-black duration-300">
                            {data?.category[0]?.name}
                        </Link>
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 11L1 6L6 1" stroke="#8D8989" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p>
                            {data?.product?.title}
                        </p>
                    </div>

                    <div className="p-4 rounded-lg mb-8 bg-white">
                        <h1 className="font-bold max-md:text-xs">
                            {data?.product?.title}
                        </h1>
                    </div>
                    <div className={styles.image + " flex items-start justify-center gap-10 w-full mx-auto gap-10 max-md:flex-col-reverse max-md:mt-10"}>
                        <div className={styles.description + " flex flex-col gap-8 w-2/5 max-md:w-full"}>


                            <div className={styles.descPrice + " p-4 max-md:p-2 rounded-lg bg-white"}>
                                <div>
                                    <div className="flex flex-col items-center justify-center gap-2 mb-2 pb-2">
                                        <p className="text-xl max-md:text-sm">
                                            قیمت محصول      
                                        </p>
                                        <p className="font-bold text-xl max-md:text-sm">{formatNumberWithThousandSeparator(activePrice)} تومان</p>
                                    </div>
                                    <div className="pt-4 border-t border-t-[#E7E2E2]">
                                        {data?.product?.need_shasi === 0 && isLoggedIn === false ?
                                            <div onClick={handleAddToCart}>
                                                <Link className="flex gap-2 flex-row-reverse" href={"/login?redirect=/product/" + slug}>
                                                    <button className="w-full bg-[#E14957] p-3 rounded-lg flex items-center justify-center text-white text-sm">
                                                        افزودن به سبد خرید 
                                                    </button>
                                                    <button className="bg-[#E14957] p-2 rounded-lg flex items-center justify-center text-white text-sm">
                                                        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.41602 4.66667C2.41602 4.02233 2.957 3.5 3.62435 3.5H4.15414C5.81753 3.5 7.26747 4.59304 7.67091 6.15113L7.8907 7H22.3617C24.6808 7 26.4035 9.07346 25.9004 11.2593L24.5578 17.0926C24.1892 18.694 22.7181 19.8333 21.0191 19.8333H11.5529C9.8895 19.8333 8.43956 18.7403 8.03613 17.1822L5.3264 6.71704C5.19192 6.19768 4.7086 5.83333 4.15414 5.83333H3.62435C2.957 5.83333 2.41602 5.311 2.41602 4.66667ZM8.49487 9.33333L10.3806 16.6163C10.5151 17.1357 10.9984 17.5 11.5529 17.5H21.0191C21.5854 17.5 22.0758 17.1202 22.1987 16.5864L23.5413 10.7531C23.7089 10.0245 23.1347 9.33333 22.3617 9.33333H8.49487Z" fill="white" />
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4785 24.5C12.4795 24.5 13.291 23.7165 13.291 22.75C13.291 21.7835 12.4795 21 11.4785 21C10.4775 21 9.66602 21.7835 9.66602 22.75C9.66602 23.7165 10.4775 24.5 11.4785 24.5Z" fill="white" />
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1465 24.5C22.1475 24.5 22.959 23.7165 22.959 22.75C22.959 21.7835 22.1475 21 21.1465 21C20.1455 21 19.334 21.7835 19.334 22.75C19.334 23.7165 20.1455 24.5 21.1465 24.5Z" fill="white" />
                                                        </svg>
                                                    </button>
                                                </Link>
                                            </div>
                                            :
                                            data?.product?.need_shasi === 0 && isLoggedIn === true ?
                                                <div className="flex gap-2 flex-row-reverse" onClick={handleAddToCart}>
                                                    <button className="w-full bg-[#E14957] p-2 rounded-lg flex items-center justify-center text-white text-sm">
                                                        افزودن به سبد خرید 
                                                    </button>
                                                    <button className="bg-[#E14957] p-2 rounded-lg flex items-center justify-center text-white text-sm">
                                                        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.41602 4.66667C2.41602 4.02233 2.957 3.5 3.62435 3.5H4.15414C5.81753 3.5 7.26747 4.59304 7.67091 6.15113L7.8907 7H22.3617C24.6808 7 26.4035 9.07346 25.9004 11.2593L24.5578 17.0926C24.1892 18.694 22.7181 19.8333 21.0191 19.8333H11.5529C9.8895 19.8333 8.43956 18.7403 8.03613 17.1822L5.3264 6.71704C5.19192 6.19768 4.7086 5.83333 4.15414 5.83333H3.62435C2.957 5.83333 2.41602 5.311 2.41602 4.66667ZM8.49487 9.33333L10.3806 16.6163C10.5151 17.1357 10.9984 17.5 11.5529 17.5H21.0191C21.5854 17.5 22.0758 17.1202 22.1987 16.5864L23.5413 10.7531C23.7089 10.0245 23.1347 9.33333 22.3617 9.33333H8.49487Z" fill="white" />
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4785 24.5C12.4795 24.5 13.291 23.7165 13.291 22.75C13.291 21.7835 12.4795 21 11.4785 21C10.4775 21 9.66602 21.7835 9.66602 22.75C9.66602 23.7165 10.4775 24.5 11.4785 24.5Z" fill="white" />
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1465 24.5C22.1475 24.5 22.959 23.7165 22.959 22.75C22.959 21.7835 22.1475 21 21.1465 21C20.1455 21 19.334 21.7835 19.334 22.75C19.334 23.7165 20.1455 24.5 21.1465 24.5Z" fill="white" />
                                                        </svg>
                                                    </button>
                                                </div> :

                                                <div className="flex gap-2 flex-row-reverse" onClick={addToCart}>
                                                    <button className="w-full bg-[#E14957] p-2 rounded-lg flex items-center justify-center text-white text-sm">
                                                        افزودن به سبد خرید 
                                                    </button>
                                                    <button className="bg-[#E14957] p-2 rounded-lg flex items-center justify-center text-white text-sm">
                                                        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.41602 4.66667C2.41602 4.02233 2.957 3.5 3.62435 3.5H4.15414C5.81753 3.5 7.26747 4.59304 7.67091 6.15113L7.8907 7H22.3617C24.6808 7 26.4035 9.07346 25.9004 11.2593L24.5578 17.0926C24.1892 18.694 22.7181 19.8333 21.0191 19.8333H11.5529C9.8895 19.8333 8.43956 18.7403 8.03613 17.1822L5.3264 6.71704C5.19192 6.19768 4.7086 5.83333 4.15414 5.83333H3.62435C2.957 5.83333 2.41602 5.311 2.41602 4.66667ZM8.49487 9.33333L10.3806 16.6163C10.5151 17.1357 10.9984 17.5 11.5529 17.5H21.0191C21.5854 17.5 22.0758 17.1202 22.1987 16.5864L23.5413 10.7531C23.7089 10.0245 23.1347 9.33333 22.3617 9.33333H8.49487Z" fill="white" />
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4785 24.5C12.4795 24.5 13.291 23.7165 13.291 22.75C13.291 21.7835 12.4795 21 11.4785 21C10.4775 21 9.66602 21.7835 9.66602 22.75C9.66602 23.7165 10.4775 24.5 11.4785 24.5Z" fill="white" />
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1465 24.5C22.1475 24.5 22.959 23.7165 22.959 22.75C22.959 21.7835 22.1475 21 21.1465 21C20.1455 21 19.334 21.7835 19.334 22.75C19.334 23.7165 20.1455 24.5 21.1465 24.5Z" fill="white" />
                                                        </svg>
                                                    </button>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className={styles.intro + " p-4 rounded-lg bg-white"}>
                                <p className="font-bold max-md:text-sm">
                                    جزییات محصول
                                </p>
                                <div className="flex flex-col mt-5">
                                    <div className="flex items-center justify-between flex-row-reverse py-4 border-b border-b-[#E7E2E2]">
                                        <div className="flex items-center flex-row-reverse gap-3">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z" stroke="#322929" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="#322929" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z" stroke="#322929" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="#322929" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <p className="max-md:text-sm">
                                                دسته بندی
                                            </p>
                                        </div>
                                        <div>
                                            <p className="max-md:text-sm">
                                                {data?.category[0]?.name}  
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between flex-row-reverse py-4 border-b border-b-[#E7E2E2]">
                                        <div className="flex items-center flex-row-reverse gap-3">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 9C19 10.45 18.57 11.78 17.83 12.89C16.75 14.49 15.04 15.62 13.05 15.91C12.71 15.97 12.36 16 12 16C11.64 16 11.29 15.97 10.95 15.91C8.96 15.62 7.25 14.49 6.17 12.89C5.43 11.78 5 10.45 5 9C5 5.13 8.13 2 12 2C15.87 2 19 5.13 19 9Z" stroke="#322929" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M21.2491 18.4699L19.5991 18.8599C19.2291 18.9499 18.9391 19.2299 18.8591 19.5999L18.5091 21.0699C18.3191 21.8699 17.2991 22.1099 16.7691 21.4799L11.9991 15.9999L7.2291 21.4899C6.6991 22.1199 5.6791 21.8799 5.4891 21.0799L5.1391 19.6099C5.0491 19.2399 4.7591 18.9499 4.3991 18.8699L2.7491 18.4799C1.9891 18.2999 1.7191 17.3499 2.2691 16.7999L6.1691 12.8999C7.2491 14.4999 8.9591 15.6299 10.9491 15.9199C11.2891 15.9799 11.6391 16.0099 11.9991 16.0099C12.3591 16.0099 12.7091 15.9799 13.0491 15.9199C15.0391 15.6299 16.7491 14.4999 17.8291 12.8999L21.7291 16.7999C22.2791 17.3399 22.0091 18.2899 21.2491 18.4699Z" stroke="#322929" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M12.58 5.98L13.17 7.15999C13.25 7.31999 13.46 7.48 13.65 7.51L14.72 7.68999C15.4 7.79999 15.56 8.3 15.07 8.79L14.24 9.61998C14.1 9.75998 14.02 10.03 14.07 10.23L14.31 11.26C14.5 12.07 14.07 12.39 13.35 11.96L12.35 11.37C12.17 11.26 11.87 11.26 11.69 11.37L10.69 11.96C9.96997 12.38 9.53997 12.07 9.72997 11.26L9.96997 10.23C10.01 10.04 9.93997 9.75998 9.79997 9.61998L8.96997 8.79C8.47997 8.3 8.63997 7.80999 9.31997 7.68999L10.39 7.51C10.57 7.48 10.78 7.31999 10.86 7.15999L11.45 5.98C11.74 5.34 12.26 5.34 12.58 5.98Z" stroke="#322929" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <p className="max-md:text-sm">
                                                برند
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {data?.brand?.map((item) => (
                                                <>
                                                    {item?.price === activePrice ? 
                                                        <div className="flex items-center gap-1 max-md:text-sm cursor-pointer text-[#E14957] border border-[#E14957] text-sm font-bold p-1 rounded-lg" onClick={() => setActivePrice(item?.price)}>
                                                            <p>
                                                                {item?.name}
                                                            </p>
                                                            <img className="w-[15px] h-[15px]" src={item?.image} />
                                                        </div>
                                                        :
                                                        <div className="flex items-center gap-1 max-md:text-sm cursor-pointer text-[#82807D] border border-[#82807D] text-sm p-1 rounded-lg" onClick={() => setActivePrice(item?.price)}>
                                                            <p>
                                                                {item?.name}
                                                            </p>
                                                            <img className="w-[15px] h-[15px]" src={item?.image} />
                                                        </div>

                                                    }
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between flex-row-reverse py-4 border-b border-b-[#E7E2E2]">
                                        <div className="flex items-center flex-row-reverse gap-3">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.4902 2.23006L5.50016 4.11006C4.35016 4.54006 3.41016 5.90006 3.41016 7.12006V14.5501C3.41016 15.7301 4.19016 17.2801 5.14016 17.9901L9.44016 21.2001C10.8502 22.2601 13.1702 22.2601 14.5802 21.2001L18.8802 17.9901C19.8302 17.2801 20.6102 15.7301 20.6102 14.5501V7.12006C20.6102 5.89006 19.6702 4.53006 18.5202 4.10006L13.5302 2.23006C12.6802 1.92006 11.3202 1.92006 10.4902 2.23006Z" stroke="#322929" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M9.05078 11.8699L10.6608 13.4799L14.9608 9.17993" stroke="#322929" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <p className="max-md:text-sm">
                                                گارانتی سلامت فیزیکی کالا
                                            </p>
                                        </div>
                                        <div>
                                            <p className="max-md:text-sm">
                                                دارد 
                                            </p>
                                        </div>
                                    </div>
                                    {/* <div className="flex items-center justify-between flex-row-reverse py-4 border-b border-b-[#E7E2E2]">
                                        <div className="flex items-center flex-row-reverse gap-3">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_2436_8743)">
                                                    <path d="M4.5 3.18994V20.9999" stroke="#322929" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                                                    <path d="M4.5 3.19002C6.21 3.78002 9 4.50002 12.44 4.32002C15.51 4.15002 16.86 2.45002 18.12 3.19002C19.89 4.24002 20.03 9.83002 18.12 12.19C15.82 15.02 10.15 15.35 4.5 12.19" stroke="#322929" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2436_8743">
                                                        <rect width="24" height="24" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <p className="max-md:text-sm">
                                                کشور سازنده
                                            </p>
                                        </div>
                                        <div>
                                            <p className="max-md:text-sm">
                                                {data?.country[0]}
                                            </p>
                                        </div>
                                    </div> */}
                                    <div className="flex items-center justify-between flex-row-reverse py-4">
                                        <div className="flex items-center flex-row-reverse gap-3">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_2436_8743)">
                                                    <path d="M4.5 3.18994V20.9999" stroke="#322929" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                                                    <path d="M4.5 3.19002C6.21 3.78002 9 4.50002 12.44 4.32002C15.51 4.15002 16.86 2.45002 18.12 3.19002C19.89 4.24002 20.03 9.83002 18.12 12.19C15.82 15.02 10.15 15.35 4.5 12.19" stroke="#322929" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2436_8743">
                                                        <rect width="24" height="24" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <p className="max-md:text-sm">
                                                نظرات
                                            </p>
                                        </div>
                                        <div className="flex items-center flex-row-reverse gap-2">
                                            <svg width="106" height="18" viewBox="0 0 106 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M98.1056 1.26449L99.6404 4.37164C99.8497 4.80417 100.408 5.21905 100.879 5.29849L103.661 5.76633C105.44 6.06645 105.858 7.37287 104.576 8.66163L102.414 10.8508C102.047 11.2215 101.847 11.9365 101.96 12.4485L102.579 15.1584C103.068 17.3034 101.943 18.1332 100.068 17.0121L97.4602 15.4497C96.9893 15.1672 96.2131 15.1672 95.7335 15.4497L93.126 17.0121C91.2597 18.1332 90.126 17.2946 90.6144 15.1584L91.2335 12.4485C91.3469 11.9365 91.1463 11.2215 90.7801 10.8508L88.6173 8.66163C87.3441 7.37287 87.7539 6.06645 89.533 5.76633L92.3149 5.29849C92.7771 5.21905 93.3353 4.80417 93.5446 4.37164L95.0794 1.26449C95.9166 -0.421496 97.2771 -0.421496 98.1056 1.26449Z" fill="#FFC328" />
                                                <path d="M76.3009 1.26449L77.8357 4.37164C78.045 4.80417 78.6032 5.21905 79.0741 5.29849L81.8561 5.76633C83.6351 6.06645 84.0537 7.37287 82.7717 8.66163L80.609 10.8508C80.2427 11.2215 80.0421 11.9365 80.1555 12.4485L80.7747 15.1584C81.263 17.3034 80.1381 18.1332 78.2631 17.0121L75.6555 15.4497C75.1846 15.1672 74.4085 15.1672 73.9288 15.4497L71.3213 17.0121C69.455 18.1332 68.3213 17.2946 68.8097 15.1584L69.4289 12.4485C69.5422 11.9365 69.3417 11.2215 68.9754 10.8508L66.8126 8.66163C65.5394 7.37287 65.9492 6.06645 67.7283 5.76633L70.5102 5.29849C70.9724 5.21905 71.5306 4.80417 71.7399 4.37164L73.2747 1.26449C74.1119 -0.421496 75.4724 -0.421496 76.3009 1.26449Z" fill="#FFC328" />
                                                <path d="M54.4962 1.26449L56.0311 4.37164C56.2404 4.80417 56.7985 5.21905 57.2694 5.29849L60.0514 5.76633C61.8304 6.06645 62.249 7.37287 60.9671 8.66163L58.8043 10.8508C58.438 11.2215 58.2374 11.9365 58.3508 12.4485L58.97 15.1584C59.4584 17.3034 58.3334 18.1332 56.4584 17.0121L53.8509 15.4497C53.3799 15.1672 52.6038 15.1672 52.1241 15.4497L49.5166 17.0121C47.6503 18.1332 46.5166 17.2946 47.005 15.1584L47.6242 12.4485C47.7375 11.9365 47.537 11.2215 47.1707 10.8508L45.0079 8.66163C43.7347 7.37287 44.1446 6.06645 45.9236 5.76633L48.7056 5.29849C49.1678 5.21905 49.7259 4.80417 49.9352 4.37164L51.4701 1.26449C52.3073 -0.421496 53.6677 -0.421496 54.4962 1.26449Z" fill="#FFC328" />
                                                <path d="M32.6915 1.26449L34.2264 4.37164C34.4357 4.80417 34.9938 5.21905 35.4647 5.29849L38.2467 5.76633C40.0257 6.06645 40.4443 7.37287 39.1624 8.66163L36.9996 10.8508C36.6333 11.2215 36.4327 11.9365 36.5461 12.4485L37.1653 15.1584C37.6537 17.3034 36.5287 18.1332 34.6537 17.0121L32.0462 15.4497C31.5752 15.1672 30.7991 15.1672 30.3194 15.4497L27.7119 17.0121C25.8456 18.1332 24.7119 17.2946 25.2003 15.1584L25.8195 12.4485C25.9329 11.9365 25.7323 11.2215 25.366 10.8508L23.2032 8.66163C21.93 7.37287 22.3399 6.06645 24.1189 5.76633L26.9009 5.29849C27.3631 5.21905 27.9212 4.80417 28.1305 4.37164L29.6654 1.26449C30.5026 -0.421496 31.863 -0.421496 32.6915 1.26449Z" fill="#FFC328" />
                                                <path d="M10.8868 1.26449L12.4217 4.37164C12.631 4.80417 13.1891 5.21905 13.66 5.29849L16.442 5.76633C18.221 6.06645 18.6396 7.37287 17.3577 8.66163L15.1949 10.8508C14.8286 11.2215 14.6281 11.9365 14.7414 12.4485L15.3606 15.1584C15.849 17.3034 14.724 18.1332 12.849 17.0121L10.2415 15.4497C9.77055 15.1672 8.9944 15.1672 8.51475 15.4497L5.90722 17.0121C4.04096 18.1332 2.90725 17.2946 3.39562 15.1584L4.0148 12.4485C4.12817 11.9365 3.92759 11.2215 3.56131 10.8508L1.39854 8.66163C0.125301 7.37287 0.535181 6.06645 2.31423 5.76633L5.09618 5.29849C5.55838 5.21905 6.11652 4.80417 6.32582 4.37164L7.86069 1.26449C8.69789 -0.421496 10.0583 -0.421496 10.8868 1.26449Z" fill="#E2DCCD" />
                                            </svg>
                                            <p className="max-md:text-sm text-[12px] text-[#82807D] mt-1">
                                                ({data?.comments?.length}نطر)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.gallery + " w-3/5 max-md:w-full"}>
                            <div className="flex items-start gap-[10px] flex-col">
                                <div className="w-full">
                                    {data?.product?.images !== undefined ? <CustomImageGallery data={data?.product?.images} /> : ""}
                                </div>
                                <div className="p-4 rounded-lg bg-white w-full">
                                    <p className="font-bold max-md:text-sm">
                                        خودرو های مشترک
                                    </p>
                                    <div className="grid grid-cols-4 gap-3 mt-5" style={{ direction: "rtl" }}>
                                        {data?.product?.car_types?.map((item) => (
                                            <div className="bg-[#F5F2F2] p-2 rounded-lg text-[12px] text-[#6B6565] text-center py-3">
                                                <p>
                                                    {item?.name}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-lg p-3 mt-8">
                        <div className="flex items-center gap-8 pb-3 border-b border-b-[#B1B1B1] flex-row-reverse mb-5 max-md:gap-3">
                            <div className="flex items-center gap-2 cursor-pointer" onClick={handleScrollDesc}>
                                <p className={descLevel === "desc" ? "text-[#E53646] text-sm max-md:text-[10px]" : "text-[#6B6565] text-sm max-md:text-[10px]"}>
                                    توضیحات  
                                </p>
                                {descLevel === "desc" ?
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z" stroke="#E53646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7 9.5H17" stroke="#E53646" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7 14.5H14" stroke="#E53646" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg> :

                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z" stroke="#6B6565" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7 9.5H17" stroke="#6B6565" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7 14.5H14" stroke="#6B6565" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                }
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer" onClick={handleScrollValue}>
                                <p className={descLevel === "compare" ? "text-[#E53646] text-sm max-md:text-[10px]" : "text-[#6B6565] text-sm max-md:text-[10px]"}>
                                    ارزش خرید
                                </p>
                                {descLevel === "compare" ?
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.5022 14.9912L15.4922 20.0112" stroke="#E53646" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3.50195 14.9912H20.502" stroke="#E53646" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3.50195 9.00877L8.51195 3.98877" stroke="#E53646" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M20.502 9.00879H3.50195" stroke="#E53646" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg> :
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.5022 14.9912L15.4922 20.0112" stroke="#6B6565" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3.50195 14.9912H20.502" stroke="#6B6565" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3.50195 9.00877L8.51195 3.98877" stroke="#6B6565" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M20.502 9.00879H3.50195" stroke="#6B6565" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                }

                            </div>
                            <div className="flex items-center gap-2 cursor-pointer" onClick={handleScrollGr}>
                                <p className={descLevel === "gr" ? "text-[#E53646] text-sm max-md:text-[10px]" : "text-[#6B6565] text-sm max-md:text-[10px]"}>
                                    گارانتی
                                </p>
                                {descLevel === "gr" ?
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_2465_8701)">
                                            <path d="M10.0293 12.49L11.0193 13.47L13.9693 10.52" stroke="#E53646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12.6792 2.1699C12.2992 1.8099 11.7092 1.8099 11.3292 2.1699C10.0292 3.3799 6.99917 5.9899 3.62917 7.4199C3.22917 7.5899 2.97916 7.9899 2.99916 8.4299C3.08916 9.9399 3.45916 13.4399 5.08916 15.8399C6.96916 18.6299 10.2092 20.8999 11.4692 21.7399C11.7992 21.9599 12.2092 21.9599 12.5392 21.7399C13.8092 20.9199 16.9892 18.6899 18.8492 15.9399C20.4892 13.5099 20.8892 9.9499 20.9892 8.4299C21.0192 7.9899 20.7591 7.5899 20.3591 7.4199C16.9992 5.9899 13.9692 3.3799 12.6692 2.1699H12.6792Z" stroke="#E53646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2465_8701">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    :
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_2465_8701)">
                                            <path d="M10.0293 12.49L11.0193 13.47L13.9693 10.52" stroke="#6B6565" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12.6792 2.1699C12.2992 1.8099 11.7092 1.8099 11.3292 2.1699C10.0292 3.3799 6.99917 5.9899 3.62917 7.4199C3.22917 7.5899 2.97916 7.9899 2.99916 8.4299C3.08916 9.9399 3.45916 13.4399 5.08916 15.8399C6.96916 18.6299 10.2092 20.8999 11.4692 21.7399C11.7992 21.9599 12.2092 21.9599 12.5392 21.7399C13.8092 20.9199 16.9892 18.6899 18.8492 15.9399C20.4892 13.5099 20.8892 9.9499 20.9892 8.4299C21.0192 7.9899 20.7591 7.5899 20.3591 7.4199C16.9992 5.9899 13.9692 3.3799 12.6692 2.1699H12.6792Z" stroke="#6B6565" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2465_8701">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                }
                            </div>
                            {/* <div className="flex items-center gap-2 cursor-pointer" onClick={handleScrollInstall}>
                                <p className={descLevel === "install" ? "text-[#E53646] text-sm max-md:text-[10px]" : "text-[#6B6565] text-sm max-md:text-[10px]"}>
                                    نحوه نصب قطعه
                                </p>
                                {descLevel === "install" ?
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.5022 14.9912L15.4922 20.0112" stroke="#E53646" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3.50195 14.9912H20.502" stroke="#E53646" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3.50195 9.00877L8.51195 3.98877" stroke="#E53646" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M20.502 9.00879H3.50195" stroke="#E53646" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg> :
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.5022 14.9912L15.4922 20.0112" stroke="#6B6565" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3.50195 14.9912H20.502" stroke="#6B6565" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3.50195 9.00877L8.51195 3.98877" stroke="#6B6565" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M20.502 9.00879H3.50195" stroke="#6B6565" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                }

                            </div> */}
                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setDescLevel("oponion")}>
                                <p className={descLevel === "oponion" ? "text-[#E53646] text-sm max-md:text-[10px]" : "text-[#6B6565] text-sm max-md:text-[10px]"}>
                                    نظرات  
                                </p>
                                {descLevel === "oponion" ?
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_2464_9000)">
                                            <path d="M11.0901 21L14.6901 17.19H18.29C19.78 17.19 20.9901 15.98 20.9901 14.49V5.71001C20.9901 4.22001 19.78 3.01001 18.29 3.01001H5.75006C4.26006 3.01001 3.06005 4.21001 3.05005 5.70001L3.00006 14.48C2.99006 15.98 4.20007 17.2 5.70007 17.2H9.29004" stroke="#E53646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8.10938 7.92993H15.8694" stroke="#E53646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8.10938 11.53H11.9894" stroke="#E53646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2464_9000">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg> :
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_2464_9000)">
                                            <path d="M11.0901 21L14.6901 17.19H18.29C19.78 17.19 20.9901 15.98 20.9901 14.49V5.71001C20.9901 4.22001 19.78 3.01001 18.29 3.01001H5.75006C4.26006 3.01001 3.06005 4.21001 3.05005 5.70001L3.00006 14.48C2.99006 15.98 4.20007 17.2 5.70007 17.2H9.29004" stroke="#6B6565" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8.10938 7.92993H15.8694" stroke="#6B6565" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8.10938 11.53H11.9894" stroke="#6B6565" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2464_9000">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                }
                            </div>
                        </div>

                        <div className="w-full">
                            {descLevel === "oponion" ? <ProductOponion data={data?.comments} id={data?.product?.id} handleReload={setReload} reload={reload} /> : <ProductDesc data={data?.product?.body} />}
                        </div>
                    </div>



                    {data?.related?.length > 0 ? 
                        <div className={styles.related + " flex flex-col gap-10 my-10"}>
                            <div className="flex items-center justify-between bg-white p-2 rounded-xl max-md:p-1" style={{direction: "rtl"}}>
                                <div className="flex items-center gap-3">
                                    <svg className="max-md:w-8" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M35.9067 21.5551C37.3386 22.987 37.3386 25.3086 35.9067 26.7405L34.0734 28.5739C33.3858 29.2615 32.9994 30.1941 32.9994 31.1666V33.3145C32.9994 35.3395 31.3578 36.9811 29.3328 36.9811H27.1849C26.2124 36.9811 25.2798 37.3674 24.5922 38.0551L22.7588 39.8884C21.3269 41.3203 19.0053 41.3203 17.5734 39.8884L15.7401 38.0551C15.0524 37.3674 14.1198 36.9811 13.1473 36.9811H10.9994C8.9744 36.9811 7.33278 35.3395 7.33278 33.3145V31.1666C7.33278 30.1941 6.94647 29.2615 6.25884 28.5739L4.4255 26.7405C2.99358 25.3086 2.99358 22.987 4.4255 21.5551L6.25884 19.7217C6.94647 19.0341 7.33278 18.1015 7.33278 17.129V14.9811C7.33278 12.9561 8.9744 11.3145 10.9994 11.3145H13.1473C14.1198 11.3145 15.0524 10.9282 15.7401 10.2405L17.5734 8.40719C19.0053 6.97527 21.3269 6.97527 22.7588 8.40719L24.5922 10.2405C25.2798 10.9282 26.2124 11.3145 27.1849 11.3145H29.3328C31.3578 11.3145 32.9994 12.9561 32.9994 14.9811V17.129C32.9994 18.1015 33.3858 19.0341 34.0734 19.7217L35.9067 21.5551ZM24.8051 22.12C25.342 21.583 25.342 20.7124 24.8051 20.1754C24.2681 19.6385 23.3975 19.6385 22.8605 20.1754L17.8328 25.2032L16.5551 23.9254C16.0181 23.3885 15.1475 23.3885 14.6105 23.9254C14.0735 24.4624 14.0735 25.333 14.6105 25.87L16.7544 28.0139C17.35 28.6095 18.3156 28.6095 18.9111 28.0139L24.8051 22.12Z" fill="url(#paint0_linear_2256_9068)" />
                                        <defs>
                                            <linearGradient id="paint0_linear_2256_9068" x1="9.16622" y1="7.64791" x2="31.1662" y2="40.6479" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#E14957" />
                                                <stop offset="1" stop-color="#D23A48" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <p className="font-bold text-xl max-md:text-sm">
                                        محصولات مرتبط
                                    </p>
                                </div>
                            </div>
                            <div className={styles.items + " grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2"}>
                                {data?.related?.slice(0,8)?.map((item) => (
                                    <ShopItem data={item}  />
                                ))}
                            </div>
                        </div> : ""
                    }
                </div>
            </div>
        </>
    )
}

export default SingleShop;