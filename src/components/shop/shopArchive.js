import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from 'next/router';
import Slider from '@mui/material/Slider';
import ShopItem from "./shopItem";
import { getAllBrands, getAllProducts } from "@/api/shop";
import { getAllCategories } from "@/api/home";

const ShopArchive = () => {
    const router = useRouter();
    const { params } = router.query;

    const [showMobileCategory, setShowMobileCategory] = useState(false);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [showFilterItems, setShowFilterItems] = useState(null);
    const [brands, setBrands] = useState(null);
    const [price, setPrice] = useState([0, 100]); // Initial range values
    const [priceRange, setPriceRange] = useState([0, 100]); // Example initial price range
    const [filter, setFilter] = useState({
        "off": false,
        "original": false,
        "used": null,
        "showcase": null,
        "suggest": "",
        "exists": "",
        "cat": params?.includes("cat") ? params : "",
        "brand": "",
        "lowest_price": "",
        "highest_price": "",
        "vip_exists": "",
    });



    useEffect(() => {
        if (params !== undefined) {
            setFilter((prevFilterData) => ({
                ...prevFilterData,
                ["cat"]: params,
            }));
        }
    }, [params]);

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

    // get data for product items
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllProducts(params);
                setProducts(data?.data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (params) {
            fetchData();
        }
    }, [params]);

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

    // function for get all brands data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllBrands();
                setBrands(data?.data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const parsToArray = (string) => {
        let actualArray = JSON.parse(string);
        return actualArray;
    };

    // function for handle show filter items
    const handleShowFilterItems = (item) => {
        if (showFilterItems === item) {
            setShowFilterItems(null);
        } else {
            setShowFilterItems(item);
        }
    };

    // function for handle category change
    const handleCategorySort = (place, value) => {
        setFilter((prevFilterData) => ({
            ...prevFilterData,
            [place]: "&cat=" + value,
        }));
    };

    // function for handle brand change
    const handleBrandSort = (place, value) => {
        setFilter((prevFilterData) => ({
            ...prevFilterData,
            [place]: value,
        }));
    };

    // function for handle suggest change
    const handleSuggestkboxChange = (event) => {
        const isChecked = event.target.checked;
        const newFilter = { ...filter, suggest: isChecked ? "1" : "" };
        setFilter(newFilter);
    };

    // function for handle exists change
    const handleExstsboxChange = (event) => {
        const isChecked = event.target.checked;
        const newFilter = { ...filter, exists: isChecked ? "1" : "" };
        setFilter(newFilter);
    };

    // function for handle vis_exists change
    const handleVipExstsboxChange = (event) => {
        const isChecked = event.target.checked;
        const newFilter = { ...filter, vip_exists: isChecked ? "1" : "" };
        setFilter(newFilter);
    };

    useEffect(() => {
        router.push(`/shop/${filter?.suggest !== "" ? "&suggest=" + filter?.suggest : ""}${filter?.exists !== "" ? "&exists=" + filter?.exists : ""}${filter?.vip_exists !== "" ? "vip_exists=" + filter?.vip_exists : ""}${filter?.cat !== "" ? filter?.cat : ""}${filter?.brand !== "" ? "&brand=" + filter?.brand : ""}${filter?.lowest_price !== "" ? "&lowest_price=" + filter?.lowest_price : ""}${filter?.highest_price !== "" ? "&highest_price=" + filter?.highest_price : ""}`, undefined, { shallow: true });
    }, [filter]);

    // function for handle price range change
    const handleChange = (event, newValue) => {
        setPrice(newValue);
        setFilter((prevFilterData) => ({
            ...prevFilterData,
            ["lowest_price"]: newValue[0],
            ["highest_price"]: newValue[1],
        }));
    };
    return(
        <div className={styles.shopArchive + " flex flex-col gap-20 max-md:gap-5 mb-10"}>
            <div className={styles.shopArchiveContainer + " flex max-md:flex-col-reverse items-start gap-7 max-md:gap-5 container w-11/12 mx-auto mt-10 max-md:mt-4"}>
                <div className={styles.items + " w-3/4 max-md:w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-2 max-md:mx-auto"} style={{width: "max-content"}}>
                    {products?.map((item) => 
                        <ShopItem slug={item?.slug} image={parsToArray(item?.image)[0]} title={item?.title} price={item?.offPrice} />
                    )}
                </div>
                <div className={styles.mobileFilter + " md:hidden flex gap-2 items-center ml-auto"}>
                    <div>
                        <button className="flex items-center gap-1 p-1 border rounded-lg" onClick={() => setShowMobileFilter(!showMobileFilter)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M7.08333 1.25C6.26938 1.25 5.59208 1.83288 5.44589 2.60417H1.5625C1.38991 2.60417 1.25 2.74408 1.25 2.91667C1.25 3.08926 1.38991 3.22917 1.5625 3.22917H5.44589C5.59208 4.00046 6.26938 4.58333 7.08333 4.58333C8.0041 4.58333 8.75 3.83743 8.75 2.91667C8.75 1.9959 8.0041 1.25 7.08333 1.25Z" fill="black"/>
                                <path d="M3.75 5.41667C2.93605 5.41667 2.25875 5.99954 2.11256 6.77083H1.5625C1.38991 6.77083 1.25 6.91074 1.25 7.08333C1.25 7.25592 1.38991 7.39583 1.5625 7.39583H2.11256C2.25875 8.16712 2.93605 8.75 3.75 8.75C4.56395 8.75 5.24125 8.16712 5.38744 7.39583H8.4375C8.61009 7.39583 8.75 7.25592 8.75 7.08333C8.75 6.91074 8.61009 6.77083 8.4375 6.77083H5.38744C5.24125 5.99954 4.56395 5.41667 3.75 5.41667Z" fill="black"/>
                            </svg>
                            <p className="text-[10px]">
                                فیلتر 
                            </p>
                        </button>
                    </div>
                    <div>
                        <button className="flex items-center gap-1 p-1 border rounded-lg" onClick={() => setShowMobileCategory(!showMobileCategory)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 9 7" fill="none">
                                <path d="M1.04286 3.55082H8.05851M1.04286 1.18066H8.05851M1.04286 5.92097H8.05851" stroke="#4A4A4A" stroke-width="0.401532" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p className="text-[10px]">
                                دسته بندی 
                            </p>
                        </button>
                    </div>
                </div>
            </div>

            {showMobileCategory === true || showMobileFilter === true ? 
                <div className={styles.overlay + " fixed top-0 left-0 z-40 w-full h-full"}></div> : ""
            }



            <div style={showMobileCategory === true ? {transform : "translateY(0%)"} : {transform : "translateY(100%)"}} className={styles.mobileCategory + " fixed bottom-0 bg-white z-50 w-full rounded-tr-2xl rounded-tl-2xl p-4 duration-300"}>
                <div className={styles.header + " flex items-center justify-between mb-10"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={() => setShowMobileCategory(!showMobileCategory)}>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11612 4.11612C4.60427 3.62796 5.39573 3.62796 5.88388 4.11612L12 10.2322L18.1161 4.11612C18.6043 3.62796 19.3957 3.62796 19.8839 4.11612C20.372 4.60427 20.372 5.39573 19.8839 5.88388L13.7678 12L19.8839 18.1161C20.372 18.6043 20.372 19.3957 19.8839 19.8839C19.3957 20.372 18.6043 20.372 18.1161 19.8839L12 13.7678L5.88388 19.8839C5.39573 20.372 4.60427 20.372 4.11612 19.8839C3.62796 19.3957 3.62796 18.6043 4.11612 18.1161L10.2322 12L4.11612 5.88388C3.62796 5.39573 3.62796 4.60427 4.11612 4.11612Z" fill="#110000"/>
                    </svg>
                    <p>
                        دسته بندی ها
                    </p>
                </div>
                <div className={styles.items + " flex flex-col gap-3 mb-10"}>
                    {categories?.map((item) => (
                        <p className="cursor-pointer" onClick={() => handleCategorySort("cat" , item?.id)}>{item?.name}</p>
                    ))}
                </div>
            </div>


            <div style={showMobileFilter === true ? {transform : "translateY(0%)"} : {transform : "translateY(100%)"}} className={styles.mobileFilterWrapper + " fixed bottom-0 bg-white z-50 w-full rounded-tr-2xl rounded-tl-2xl p-4 duration-300"}>
                <div className={styles.header + " flex items-center justify-between mb-10"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={() => setShowMobileFilter(!showMobileFilter)}>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11612 4.11612C4.60427 3.62796 5.39573 3.62796 5.88388 4.11612L12 10.2322L18.1161 4.11612C18.6043 3.62796 19.3957 3.62796 19.8839 4.11612C20.372 4.60427 20.372 5.39573 19.8839 5.88388L13.7678 12L19.8839 18.1161C20.372 18.6043 20.372 19.3957 19.8839 19.8839C19.3957 20.372 18.6043 20.372 18.1161 19.8839L12 13.7678L5.88388 19.8839C5.39573 20.372 4.60427 20.372 4.11612 19.8839C3.62796 19.3957 3.62796 18.6043 4.11612 18.1161L10.2322 12L4.11612 5.88388C3.62796 5.39573 3.62796 4.60427 4.11612 4.11612Z" fill="#110000"/>
                    </svg>
                    <p>
                        فیلتر ها
                    </p>
                </div>
                <div className={styles.items + " flex flex-col gap-3 mb-10"}>
                    <div className={styles.item + " py-4"}>
                        <div className="flex items-center justify-between" onClick={() => handleShowFilterItems("brand")}>
                            <svg width="10" height="8" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2071 0.292893C14.8166 -0.0976311 14.1834 -0.0976311 13.7929 0.292893L8 6.08579L2.20711 0.292893C1.81658 -0.0976311 1.18342 -0.0976311 0.792893 0.292893C0.402369 0.683417 0.402369 1.31658 0.792893 1.70711L6.58579 7.5C7.36684 8.28105 8.63317 8.28105 9.41421 7.5L15.2071 1.70711C15.5976 1.31658 15.5976 0.683417 15.2071 0.292893Z" fill="#35383F"/>
                            </svg>
                            <p className="text-sm">برند ها</p>
                        </div>
                        {showFilterItems === "brand" ? 
                            <div className="items mt-3 flex flex-col gap-2">
                                {brands?.map((item) => (
                                    <p className="text-xs cursor-pointer" onClick={() => handleBrandSort("brand" , item?.id)}>{item?.name}</p>
                                ))}
                            </div> : ""
                        }
                    </div>
                    <div className={styles.item + " flex items-center justify-between py-4"}>
                        <label class="switch">
                            <input type="checkbox" checked={filter.suggest === "1"} onChange={handleSuggestkboxChange} />
                            <span class="slider round" />
                        </label>
                        <p className="text-sm">فروش ویژه</p>
                    </div>
                    {/* <div className={styles.item + " flex items-center justify-between py-4"}>
                        <svg width="10" height="8" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2071 0.292893C14.8166 -0.0976311 14.1834 -0.0976311 13.7929 0.292893L8 6.08579L2.20711 0.292893C1.81658 -0.0976311 1.18342 -0.0976311 0.792893 0.292893C0.402369 0.683417 0.402369 1.31658 0.792893 1.70711L6.58579 7.5C7.36684 8.28105 8.63317 8.28105 9.41421 7.5L15.2071 1.70711C15.5976 1.31658 15.5976 0.683417 15.2071 0.292893Z" fill="#35383F"/>
                        </svg>
                        <p className="text-sm">نوع</p>
                    </div> */}
                    <div className={styles.item + " flex items-center justify-between py-4"}>
                        <label class="switch">
                            <input type="checkbox" checked={filter.exists === "1"} onChange={handleExstsboxChange} />
                            <span class="slider round" />
                        </label>
                        <p className="text-sm">کالاهای موجود</p>
                    </div>
                    <div className={styles.item + " flex items-center justify-between py-4"}>
                        <label class="switch">
                            <input type="checkbox" checked={filter.vip_exists === "1"} onChange={handleVipExstsboxChange} />
                            <span class="slider round" />
                        </label>
                        <p className="text-sm">کالا های ربانی پارت</p>
                    </div>
                    <div className={styles.item + " py-4"}>
                        <div className="flex mb-3 cursor-pointer items-center justify-between" onClick={() => handleShowFilterItems("price")}>
                            <svg width="10" height="8" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2071 0.292893C14.8166 -0.0976311 14.1834 -0.0976311 13.7929 0.292893L8 6.08579L2.20711 0.292893C1.81658 -0.0976311 1.18342 -0.0976311 0.792893 0.292893C0.402369 0.683417 0.402369 1.31658 0.792893 1.70711L6.58579 7.5C7.36684 8.28105 8.63317 8.28105 9.41421 7.5L15.2071 1.70711C15.5976 1.31658 15.5976 0.683417 15.2071 0.292893Z" fill="#35383F"/>
                            </svg>
                            <p className="text-sm">محدوده قیمت</p>
                        </div>
                        {showFilterItems === "price" ? 
                            <div className="priceRange">
                                <div style={{ width: "90%" , margin : "0 auto" }}>
                                    <Slider
                                        value={price}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                        min={0}
                                        max={10000} // Set your maximum price here
                                    />
                                    <p className='text-xs'>
                                        از {price[0]} تا {price[1]} <span>تومان</span>
                                    </p>
                                </div>
                            </div> : ""
                        }
                    </div>
                    {/* <div className={styles.item + " flex items-center justify-between py-4"}>
                        <svg width="10" height="8" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2071 0.292893C14.8166 -0.0976311 14.1834 -0.0976311 13.7929 0.292893L8 6.08579L2.20711 0.292893C1.81658 -0.0976311 1.18342 -0.0976311 0.792893 0.292893C0.402369 0.683417 0.402369 1.31658 0.792893 1.70711L6.58579 7.5C7.36684 8.28105 8.63317 8.28105 9.41421 7.5L15.2071 1.70711C15.5976 1.31658 15.5976 0.683417 15.2071 0.292893Z" fill="#35383F"/>
                        </svg>
                        <p className="text-sm">نوع فروشنده</p>
                    </div> */}
                </div>
            </div>

            {/* <Category /> */}

        </div>
    )
}

export default ShopArchive;