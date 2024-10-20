import { getAllProducts } from "@/api/shop";
import { BlackButton, RedBorderButton } from "../button";
import ShopItem from "../shop/shopItem";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import BlogItem from "../blog/blogItem";
import { getAllCarBrands, getBrandData, getCarData } from "@/api/categories";
import { getAllBlogs } from "@/api/blog";
import { getAllCategories } from "@/api/home";
import { useRouter } from "next/router";
import Head from "next/head";

const HomePage = () => {


    const router = useRouter();
    const [products , setProducts] = useState(null);
    const [bestSellers , setBestSellers] = useState(null);
    const [carBrands , setCarBrands] = useState(null);
    const [cars , setCars] = useState(null);
    const [carTypes , setCarTypes] = useState(null);
    const [blogs , setBlogs] = useState(null);
    const [categories , setCategories] = useState(null);
    const [selectedBrand , setSelectedBrand] = useState(null);
    const [selectedCar , setSelectedCar] = useState(null);
    const [selectedCarType , setSelectedCarType] = useState(null);
    const [searchInput , setSearchInput] = useState("");

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
    }

    const handleCarChange = (e) => {
        setSelectedCar(e.target.value);
    }

    const handleCarTypeChange = (e) => {
        setSelectedCarType(e.target.value);
    }


    // get data for brand
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBrandData(selectedBrand);
                setCars(data?.data?.data?.cars);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedBrand]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCarData(selectedCar);
                setCarTypes(data?.data?.data?.car_types);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedCar]);
    



    // get data for product items
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllProducts({});
            setProducts(data?.data?.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);

    // function for get all categories data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data?.data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    // get data for blog items
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = await getAllBlogs();
    //             setBlogs(data?.data?.data);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);



    // get data for best sellers product items
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllProducts("sort=bestsellers");
            setBestSellers(data?.data?.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);


    // get data for brands items
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllCarBrands("sort=bestsellers");
                setCarBrands(data?.data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);






    const handleSearch = () => {
        if(selectedBrand !== null & selectedCar === null){
            router.push("/car/" + selectedBrand)
        }else if(selectedBrand !== null & selectedCar !== null && selectedCarType === null){
            router.push("/car/" + selectedBrand + "/" + selectedCar)
        }else if(selectedBrand !== null && selectedCar !== null && selectedCarType !== null){
            router.push("/car/" + selectedBrand + "/" + selectedCar + "/" + selectedCarType)
        }
    }

    const handleChange = (event) => {
        setSearchInput(event.target.value);
    };


    const handleFormSearch = () => {
        const encodedInputValue = encodeURIComponent(searchInput.trim());
        router.push(`/search/${encodedInputValue}`);
    };





    return(
        <div>
            <Head>
                <link rel="canonical" href={"https://girpazh.com"} />
                <title>گیرپاژ، فروشگاه آنلاین قطعات خودرو با تضمین کیفیت</title>
                <meta name="description" content={"گیرپاژ ارائه‌دهنده لوازم یدکی خودرو با گارانتی و پشتیبانی . ارسال سریع و خریدی مطمئن."} />
            </Head>
            <div className="container max-w-[1200px] w-11/12 mx-auto my-20 max-md:my-10 max-md:mb-20">
                <div className="relative w-full overflow-hidden bg-[#E14957] rounded-xl">
                    <img className="object-cover w-full" src="../../images/bannersvg.webp" alt="banner" />
                    <div className="absolute left-[10%] top-[30%] max-md:left-[5%]" style={{transform: "translate(0,-30%)"}}>
                        <h2 className="text-white font-bold text-4xl max-md:text-lg">
                            ارائه با کیفیت ترین
                        </h2>
                        <h1 className="text-white text-2xl mt-5 max-md:text-[11px] max-md:mt-0">
                            قطعات و لوازم یدکی خودرو در گیرپاژ
                        </h1>
                    </div>
                </div>

                <div className="hidden max-md:block">
                    <div className="relative w-11/12 mx-auto mt-5">
                        <input
                            className="w-full mx-auto px-3 py-3 rounded-full text-xs"
                            type="text"
                            placeholder="جست و جوی محصولات..."
                            onChange={handleChange}
                            value={searchInput}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault(); // Prevent default form submission
                                    handleFormSearch();
                                }
                            }}
                        />
                        <div className="absolute top-1 left-1 w-[30px] h-[30px] bg-[#E14957] rounded-full flex items-center justify-center">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.7148 5H17.8577" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12.7148 7.57153H15.2863" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.7154 10.5716C18.7154 15.0716 15.0725 18.7144 10.5725 18.7144C6.07254 18.7144 2.42969 15.0716 2.42969 10.5716C2.42969 6.07157 6.07254 2.42871 10.5725 2.42871" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M19.5737 19.5715L17.8594 17.8572" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>


                <div className="flex max-md:flex-col max-md:flex-col-reverse items-center justify-between w-11/12 mx-auto bg-white p-6 py-8 rounded-xl mt-[-60px] max-md:mt-5 relative gap-6 max-md:w-full" style={{boxShadow: "17px 0px 40px rgb(0,0,0,10%)"}}>
                    <div className="w-1/12 max-md:w-full">
                        <button className="bg-[#E14957] text-center text-white w-full text-sm py-2 rounded-lg" onClick={handleSearch}>
                            جست و جو    
                        </button>
                    </div>
                    <div className="w-9/12 max-md:w-full">
                        <form className="flex items-center gap-3 w-full max-md:flex-col-reverse">
                            <div className="w-full">
                                {selectedCar === "" || selectedCar === null || selectedBrand === "" || selectedBrand === null ? 
                                    <div className="w-full flex flex-col gap-1">
                                        <label className="text-xs">
                                            انتخاب نوع خودرو
                                        </label>
                                        <select disabled className="border rounded-lg p-2 cursor-pointer" style={{ direction: "rtl" }} onChange={handleCarTypeChange} value={selectedCarType}>
                                            <option value={""}>انتخاب</option>
                                            {carTypes?.map((item) => (
                                                <option value={item?.slug}>{item?.name}</option>
                                            ))}
                                        </select>
                                    </div> :
                                    <div className="w-full flex flex-col gap-1">
                                        <label className="text-xs">
                                            انتخاب نوع خودرو
                                        </label>
                                        <select className="border rounded-lg p-2 cursor-pointer" style={{ direction: "rtl" }} onChange={handleCarTypeChange} value={selectedCarType}>
                                            <option value={""}>انتخاب</option>
                                            {carTypes?.map((item) => (
                                                <option value={item?.slug}>{item?.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                }

                            </div>
                            <div className="w-full">
                                {selectedBrand === "" || selectedBrand === null ? 
                                    <div className="w-full flex flex-col gap-1">
                                        <label className="text-xs">
                                            انتخاب نام خودرو
                                        </label>
                                        <select disabled className="border rounded-lg p-2 cursor-pointer" style={{ direction: "rtl" }} onChange={handleCarChange} value={selectedCar}>
                                            <option value={""}>انتخاب</option>
                                            {cars?.map((item) => (
                                                <option value={item?.slug}>{item?.name}</option>
                                            ))}
                                        </select>
                                    </div> : 
                                    <div className="w-full flex flex-col gap-1">
                                        <label className="text-xs">
                                            انتخاب نام خودرو
                                        </label>
                                        <select className="border rounded-lg p-2 cursor-pointer" style={{ direction: "rtl" }} onChange={handleCarChange} value={selectedCar}>
                                            <option value={""}>انتخاب</option>
                                            {cars?.map((item) => (
                                                <option value={item?.slug}>{item?.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                }

                            </div>
                            <div className="w-full">
                                <div className="w-full flex flex-col gap-1">
                                    <label className="text-xs">
                                        انتخاب برند خودرو
                                    </label>
                                    <select className="border rounded-lg p-2 cursor-pointer" style={{ direction: "rtl" }} onChange={handleBrandChange} value={selectedBrand}>
                                        <option value={""}>انتخاب</option>
                                        {carBrands?.map((item) => (
                                            <option value={item?.slug}>{item?.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="w-2/12 max-md:hidden">
                        <p className="font-bold">
                            جستوجوی پیشرفته
                            <br/>
                            قـطــعـات در گـیــرپـاژ
                        </p>
                    </div>
                </div>


                <div className="bg-[#221F1F] rounded-xl mt-10 p-6">
                    <div className="grid grid-cols-8 gap-2 max-md:grid-cols-4">
                        {carBrands?.map((item) => (
                            <Link href={"/car/" + item?.slug}>
                                <div className="p-3 py-5 max-md:p-2 max-md:py-3 border border-white rounded-lg h-full">
                                    <img src={item?.image} alt="image" />
                                </div>
                            </Link>
                        ))}
                    </div>
                    {/* <div className="flex items-center justify-center gap-2 mx-auto mt-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2256_9035)">
                                <path d="M18.5 10L12 16.5L5.5 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2256_9035">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <p className="text-white">
                            مشاهده همه برند ها
                        </p>
                    </div> */}
                </div>


                <div className="mt-20">
                    <div className="flex items-center justify-end bg-white p-2 rounded-xl max-md:p-1 max-md:bg-transparent">
                        {/* <div>
                            <button className="flex items-center gap-4 flex-row-reverse px-3 py-3 max-md:p-2 rounded-lg" style={{background: "rgb(225,73,87,9%)"}}>
                                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 14.5L1.5 8L8 1.5" stroke="#E14957" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p className="text-sm text-[#E14957] max-md:text-xs">
                                    مشاهده همه
                                </p>
                            </button>
                        </div> */}
                        <div className="flex items-center gap-3 max-md:gap-2">
                            <p className="font-bold text-xl max-md:text-sm">
                                محصولات پرفروش
                            </p>
                            <svg className="max-md:w-[30px]" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M35.9067 21.5551C37.3386 22.987 37.3386 25.3086 35.9067 26.7405L34.0734 28.5739C33.3858 29.2615 32.9994 30.1941 32.9994 31.1666V33.3145C32.9994 35.3395 31.3578 36.9811 29.3328 36.9811H27.1849C26.2124 36.9811 25.2798 37.3674 24.5922 38.0551L22.7588 39.8884C21.3269 41.3203 19.0053 41.3203 17.5734 39.8884L15.7401 38.0551C15.0524 37.3674 14.1198 36.9811 13.1473 36.9811H10.9994C8.9744 36.9811 7.33278 35.3395 7.33278 33.3145V31.1666C7.33278 30.1941 6.94647 29.2615 6.25884 28.5739L4.4255 26.7405C2.99358 25.3086 2.99358 22.987 4.4255 21.5551L6.25884 19.7217C6.94647 19.0341 7.33278 18.1015 7.33278 17.129V14.9811C7.33278 12.9561 8.9744 11.3145 10.9994 11.3145H13.1473C14.1198 11.3145 15.0524 10.9282 15.7401 10.2405L17.5734 8.40719C19.0053 6.97527 21.3269 6.97527 22.7588 8.40719L24.5922 10.2405C25.2798 10.9282 26.2124 11.3145 27.1849 11.3145H29.3328C31.3578 11.3145 32.9994 12.9561 32.9994 14.9811V17.129C32.9994 18.1015 33.3858 19.0341 34.0734 19.7217L35.9067 21.5551ZM24.8051 22.12C25.342 21.583 25.342 20.7124 24.8051 20.1754C24.2681 19.6385 23.3975 19.6385 22.8605 20.1754L17.8328 25.2032L16.5551 23.9254C16.0181 23.3885 15.1475 23.3885 14.6105 23.9254C14.0735 24.4624 14.0735 25.333 14.6105 25.87L16.7544 28.0139C17.35 28.6095 18.3156 28.6095 18.9111 28.0139L24.8051 22.12Z" fill="url(#paint0_linear_2256_9068)" />
                                <defs>
                                    <linearGradient id="paint0_linear_2256_9068" x1="9.16622" y1="7.64791" x2="31.1662" y2="40.6479" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#E14957" />
                                        <stop offset="1" stop-color="#D23A48" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>

                    <div className={styles.indexSlide + " flex items-center justify-between gap-5 mt-5"}>
                        {bestSellers?.slice(0,4)?.map((item) => (
                            <ShopItem data={item} />
                        ))}
                    </div>

                    <div className=" mx-auto my-20">
                        <div className="grid grid-cols-3 gap-5 mt-10 max-md:grid-cols-1 max-md:5" style={{ direction: "rtl" }}>
                            {categories?.map((item) => (
                                <Link href={"/category/" + item?.slug} className="flex items-center gap-2 p-3 rounded-xl bg-white" style={{ border: "1px solid rgb(0,0,0,10%)" }}>
                                    <div className="w-[103px] h-[103px] overflow-hidden">
                                        <img className="object-cover w-full" src={item?.image} alt="icon" />
                                    </div>
                                    <div>
                                        <p className="text-lg mb-1">
                                            {item?.name}
                                        </p>
                                        {/* <p className="text-lg text-[#82807D]">
                                    190 محصول
                                </p> */}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>



                    <div className="mt-10">
                        <div className="w-full overflow-hidden">
                            <img className="object-cover w-full" src="../../images/mockup.webp" alt="girpazh" />
                        </div>
                    </div>


                    <div className="mt-20">
                        <div className="flex justify-center items-center">
                            <p className={styles.indexAboutTitle + " text-center font-bold text-2xl"}>
                                خدمات گیرپاژ
                            </p>
                        </div>

                        <div className="flex items-center w-full gap-5 mt-10 max-md:flex-col-reverse">
                            <div className="w-7/12 max-md:w-full">
                                <div>
                                    <p className="font-bold text-xl mb-1">
                                        خدمات گیرپاژ
                                    </p>
                                    <p className="text-sm leading-6">
                                        گیرپاژ اپلیکیشنی در راستای مرتفع کردن نیاز بازار به خرید و فروش قطعات  یدکی دارای اصالت می باشد که به تامین کنندگان دست اول این امکان را می دهد  تا بازاری را تشکیل دهند که بورسی برای تولیدکنندگان و واردکنندگان و  همچنین بنک داران عمده بازار باشد تا خریداران محترم قطعات برای اولین بار  در کشور همچنین بازار بکری را تجربه نمایند و بتوانند قطعات یدکی را با  قیمت دست اول تهیه نمایند تا دیگر زمانی در بازارهای فیزیکی که اکثرا تشکیل  شده از فروشندگان سطح دو و سه می شود ، تلف ننمایند و به صورت مستقیم بدون  اتلاف وقت خرید خود را نهایی نمایند
                                    </p>
                                </div>
                                <div className="mt-10 grid grid-cols-2 gap-5">
                                    <div className="flex items-center gap-3 flex-row-reverse">
                                        <div className="bg-[#E14957] rounded-full h-[50px] w-[50px] flex items-center justify-center">
                                            <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M24.6654 15.7628V22.4428C24.6387 22.9095 24.492 23.3628 24.2654 23.7628C24.0254 24.1628 23.692 24.5094 23.292 24.7628L17.332 28.0961C16.9054 28.2961 16.4387 28.4027 15.972 28.4027C15.5054 28.4027 15.0254 28.2961 14.5987 28.0961L8.70536 24.7628C8.30536 24.5094 7.98535 24.1628 7.73201 23.7628C7.50535 23.3628 7.3587 22.9095 7.33203 22.4428V15.7628C7.3587 15.2961 7.50535 14.8428 7.73201 14.4428C7.97202 14.0428 8.30536 13.6961 8.70536 13.4428L11.1587 12.0828L14.6654 10.1095C15.092 9.90946 15.5587 9.80273 16.0387 9.80273C16.5187 9.80273 16.972 9.90946 17.3987 10.1095L20.9054 12.0828L23.3587 13.4428C23.7454 13.7095 24.052 14.0561 24.292 14.4561C24.5187 14.8561 24.6387 15.3094 24.6654 15.7628Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                                                <path d="M22.1587 6.93601L20.8654 12.0827L17.3587 10.1094C16.9321 9.90935 16.4654 9.80263 15.9854 9.80263C15.5054 9.80263 15.0521 9.90935 14.6254 10.1094L11.1187 12.0827L9.82541 6.93601C9.71875 6.64268 9.69208 6.32266 9.74542 6.00266C9.79875 5.68266 9.93208 5.40264 10.1187 5.14931C10.3187 4.89598 10.5721 4.69599 10.8654 4.57599C11.1587 4.45599 11.4921 4.38933 11.8121 4.41599H20.2387C20.5587 4.40266 20.8787 4.456 21.1587 4.58933C21.4521 4.72267 21.7054 4.92267 21.8921 5.176C22.0921 5.42934 22.1988 5.72269 22.2521 6.02936C22.3054 6.33602 22.2261 6.74603 22.1328 7.03936L22.1587 6.93601Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                                                <path d="M15.9737 21.7632C17.4537 21.7632 18.627 20.5765 18.627 19.1099C18.627 17.6432 17.4403 16.4565 15.9737 16.4565C14.507 16.4565 13.3203 17.6432 13.3203 19.1099C13.3203 20.5765 14.507 21.7632 15.9737 21.7632Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                                            </svg>
                                        </div>
                                        <p className="font-bold text-sm max-md:text-[10px]">
                                        ارائه برند های متنوع از
                                        <br/>
                                        وارد کنندگان و تولیدکنندگان
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 flex-row-reverse">
                                        <div className="bg-[#E14957] rounded-full h-[50px] w-[50px] flex items-center justify-center">
                                            <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.9869 3.38935L7.33354 5.89601C5.80021 6.46935 4.54688 8.28268 4.54688 9.90935V19.816C4.54688 21.3893 5.58687 23.456 6.85354 24.4027L12.5869 28.6827C14.4669 30.096 17.5602 30.096 19.4402 28.6827L25.1735 24.4027C26.4402 23.456 27.4802 21.3893 27.4802 19.816V9.90935C27.4802 8.26935 26.2269 6.45601 24.6935 5.88268L18.0402 3.38935C16.9069 2.97601 15.0935 2.97601 13.9869 3.38935Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M12.0664 16.2427L14.2131 18.3893L19.9464 12.656" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="font-bold text-sm max-md:text-[10px]">
                                            فروش قطعات
                                            <br/>
                                            با گارانتی معتبر
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 flex-row-reverse">
                                        <div className="bg-[#E14957] rounded-full h-[50px] w-[50px] flex items-center justify-center">
                                            <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.3286 18.915H10.0781" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M14.325 2.06374L14.2875 2.15125L10.6622 10.5644H7.09942C6.24935 10.5644 5.43678 10.7394 4.69922 11.052L6.8869 5.82655L6.9369 5.70154L7.02441 5.50152C7.04941 5.42651 7.07441 5.35151 7.11192 5.289C8.74955 1.50119 10.5997 0.638622 14.325 2.06374Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M21.0649 10.8142C20.5024 10.6392 19.9023 10.5641 19.3023 10.5641H10.6641L14.2894 2.15095L14.3269 2.06345C14.5144 2.12595 14.6894 2.21346 14.8769 2.28846L17.6396 3.45106C19.1773 4.08861 20.2523 4.75117 20.9024 5.55123C21.0274 5.70124 21.1274 5.83876 21.2149 6.00127C21.3274 6.17628 21.4149 6.3513 21.4649 6.53881C21.515 6.65132 21.5525 6.76383 21.5775 6.86384C21.915 7.91393 21.715 9.20153 21.0649 10.8142Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M25.4051 16.665V19.1027C25.4051 19.3527 25.3926 19.6028 25.3801 19.8528C25.1426 24.2156 22.7049 26.4158 18.0795 26.4158H8.32873C8.0287 26.4158 7.72868 26.3908 7.44115 26.3533C3.46583 26.0908 1.34065 23.9656 1.07813 19.9903C1.04063 19.7028 1.01562 19.4027 1.01562 19.1027V16.665C1.01562 14.1523 2.54075 11.9896 4.71593 11.0521C5.46599 10.7395 6.26606 10.5645 7.11613 10.5645H19.3171C19.9297 10.5645 20.5297 10.652 21.0798 10.8145C23.5675 11.5771 25.4051 13.9023 25.4051 16.665Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M6.88798 5.82681L4.7003 11.0522C2.52512 11.9898 1 14.1525 1 16.6652V13.0024C1 9.45211 3.52521 6.48937 6.88798 5.82681Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M25.3996 13.0015V16.6643C25.3996 13.9141 23.5744 11.5764 21.0742 10.8263C21.7243 9.20117 21.9118 7.92607 21.5993 6.86348C21.5743 6.75097 21.5368 6.63846 21.4868 6.53845C23.8119 7.73855 25.3996 10.2013 25.3996 13.0015Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="font-bold text-sm max-md:text-[10px]">
                                            ارائه خدمات خرید
                                            <br/>
                                            اقساطی و اعتباری
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 flex-row-reverse">
                                        <div className="bg-[#E14957] rounded-full h-[50px] w-[50px] flex items-center justify-center">
                                            <img src="../../images/icon1.png" alt="icon" />
                                        </div>
                                        <p className="font-bold text-sm max-md:text-[10px]">
                                            تهیه قطعات نایاب
                                            <br/>
                                            از کشورهای مبدا
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-5/12 overflow-hidden max-md:w-full">
                                <img className="w-full object-cover" src="../../images/indexaboutimage.webp" alt="girpazh" />
                            </div>
                        </div>
                    </div>


                    {/* <div className="mt-20">
                        <div className="flex items-center justify-between">
                            <div>
                                <Link href={"/blog"} className="flex items-center gap-4 flex-row-reverse px-3 py-3 max-md:p-2 max-md:gap-1 rounded-lg" style={{background: "rgb(225,73,87,9%)"}}>
                                    <svg className="max-md:w-[30px]" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 14.5L1.5 8L8 1.5" stroke="#E14957" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <p className="text-sm text-[#E14957] max-md:text-xs">
                                        مشاهده همه
                                    </p>
                                </Link>
                            </div>
                            <div className="flex items-center gap-3 max-md:gap-1">
                                <p className="font-bold text-xl max-md:text-sm">
                                    اخبار حوزه خودرو
                                </p>
                                <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M28.9674 4.46768C28.2157 3.71601 26.9141 4.22935 26.9141 5.27435V11.6727C26.9141 14.3493 29.1874 16.5677 31.9557 16.5677C33.6974 16.586 36.1174 16.586 38.1891 16.586C39.2341 16.586 39.7841 15.3577 39.0507 14.6243C36.4107 11.966 31.6807 7.18101 28.9674 4.46768Z" fill="#E14957" />
                                    <path d="M37.582 19.0977H32.2837C27.9387 19.0977 24.4004 15.5593 24.4004 11.2143V5.91601C24.4004 4.90767 23.5754 4.08267 22.567 4.08267H14.7937C9.14703 4.08267 4.58203 7.74934 4.58203 14.2943V30.5377C4.58203 37.0827 9.14703 40.7493 14.7937 40.7493H29.2037C34.8504 40.7493 39.4154 37.0827 39.4154 30.5377V20.931C39.4154 19.9227 38.5904 19.0977 37.582 19.0977ZM21.082 32.9577H13.7487C12.997 32.9577 12.3737 32.3343 12.3737 31.5827C12.3737 30.831 12.997 30.2077 13.7487 30.2077H21.082C21.8337 30.2077 22.457 30.831 22.457 31.5827C22.457 32.3343 21.8337 32.9577 21.082 32.9577ZM24.7487 25.6243H13.7487C12.997 25.6243 12.3737 25.001 12.3737 24.2493C12.3737 23.4977 12.997 22.8743 13.7487 22.8743H24.7487C25.5004 22.8743 26.1237 23.4977 26.1237 24.2493C26.1237 25.001 25.5004 25.6243 24.7487 25.6243Z" fill="#E14957" />
                                </svg>
                            </div>
                        </div>

                        <div className={styles.indexSlide + " flex gap-4 mt-10"}>
                            {blogs?.slice(0,4)?.map((item) => (
                                <BlogItem data={item} />
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default HomePage;