import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { getAllCars, getAllCarTypeProducts, getAllCategoryProducts, getAllPartBrands, getAllProductCategories, getCategoryData } from "@/api/categories";
import ShopItem from "@/components/shop/shopItem";
import Head from "next/head";
import Link from "next/link";
import { useParams } from "next/navigation";

const SubCategoryPage = ({secslug}) => {

    const params = useParams()
    const [carTypeProducts , setCarTypeProducts] = useState(null);
    const [cars , setCars] = useState(null);
    const [partBrands , setPartBrands] = useState(null);
    const [categories , setCategories] = useState(null);
    const [paramsFilter , setParamsFilter] = useState("brand=&sort=")
    const [categoryData , setCategoryData] = useState(null);
    const [showMobileFilter , setShowMobileFilter] = useState(false);
    const [subCategories , setSubCategories] = useState(null);
    const [categoryBread , setCategoryBread] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages , setNumberOfPages] = useState(null);
    const [filter , setFilter] = useState({
        "brand" : "",
        "sort" : "",
    })


    // get products for car type
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllCategoryProducts(secslug , paramsFilter , currentPage);

                let perPage = data?.data?.meta?.per_page
                let total = data?.data?.meta?.total
                let number = Math.ceil(total / perPage);

                setNumberOfPages(number);
                setCarTypeProducts(data?.data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [secslug , paramsFilter , currentPage]);


    // get brands for parts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllPartBrands();
                setPartBrands(data?.data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    // get all cars
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllCars();
                setCars(data?.data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCategoryData(secslug);
                setCategoryData(data?.data?.data?.category);
                setSubCategories(data?.data?.data?.cats?.cats)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [secslug]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCategoryData(params.slug);
                setCategoryBread(data?.data?.data?.category?.name);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [params.slug]);

    


    const handleCarChange = (value) => {
        if (filter?.cat === value) {
            setFilter((prevFilterData) => ({
                ...prevFilterData,
                ["car"]: "",
            }))
        } else {
            setFilter((prevFilterData) => ({
                ...prevFilterData,
                ["car"]: value,
            }))
        }
    }


    const handleBrandChange = (value) => {
        if (filter?.brand === value) {
            setFilter((prevFilterData) => ({
                ...prevFilterData,
                ["brand"]: "",
            }))
        } else {
            setFilter((prevFilterData) => ({
                ...prevFilterData,
                ["brand"]: value,
            }))
        }
    }


    const handleSortChange = (value) => {
        if (filter?.sort === value) {
            setFilter((prevFilterData) => ({
                ...prevFilterData,
                ["sort"]: "",
            }))
        } else {
            setFilter((prevFilterData) => ({
                ...prevFilterData,
                ["sort"]: value,
            }))
        }
    }

    useEffect(() => {
        setParamsFilter("car=" + filter?.car +"&sort=" + filter?.sort + "&brand=" + filter?.brand)
    }, [filter]);


    const handleRemoveFilter = () => {
        setFilter(
            {
                "brand" : "",
                "sort" : "",
            }
        )
    }


    useEffect(() => {
        setCurrentPage(1);
      }, [numberOfPages]);
  
      useEffect(() => {
        if(currentPage === numberOfPages){
          const targetElement = document.getElementById('top');
          if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } , [currentPage])
    
    
      const nextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, numberOfPages));
        const targetElement = document.getElementById('top');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      };
    
      const prevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
        const targetElement = document.getElementById('top');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      };
  
  
      const handleCurrentPage = (number) => {
        setCurrentPage(number);
        const targetElement = document.getElementById('top');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }










    return(
        <>
            <Head>
                <link rel="canonical" href={"https://girpazh.com/category/" + params.slug + "/" + secslug} />
            </Head>
            <div className="container max-w-[1200px] w-11/12 mx-auto mb-20 py-10 max-md:mt-1">


                <div className="flex items-center flex-row-reverse gap-2 text-xs text-[#8D8989]">
                    <p>
                        گیرپاژ
                    </p>
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 11L1 6L6 1" stroke="#8D8989" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>
                        {categoryBread}
                    </p>
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 11L1 6L6 1" stroke="#8D8989" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>
                        {categoryData?.name}
                    </p>
                </div>


                {/* <div className="grid grid-cols-3 gap-5 mt-10 max-md:grid-cols-1 max-md:5" style={{ direction: "rtl" }}>
                    {subCategories?.map((item) => (
                        <Link href={"/category/" + secslug + "/" + item?.slug} className="flex items-center gap-2 p-3 rounded-xl bg-white" style={{ border: "1px solid rgb(0,0,0,10%)" }}>
                            <div className="w-[103px] h-[103px] overflow-hidden">
                                <img className="object-cover w-full" src={item?.image} alt="icon" />
                            </div>
                            <div>
                                <p className="text-lg mb-1">
                                    {item?.name}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div> */}

                <button className="flex items-center gap-1 p-1 mt-5 border border-black rounded-lg ml-auto px-4 hidden max-md:flex" onClick={() => setShowMobileFilter(!showMobileFilter)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10" fill="none">
                        <path d="M7.08333 1.25C6.26938 1.25 5.59208 1.83288 5.44589 2.60417H1.5625C1.38991 2.60417 1.25 2.74408 1.25 2.91667C1.25 3.08926 1.38991 3.22917 1.5625 3.22917H5.44589C5.59208 4.00046 6.26938 4.58333 7.08333 4.58333C8.0041 4.58333 8.75 3.83743 8.75 2.91667C8.75 1.9959 8.0041 1.25 7.08333 1.25Z" fill="black" />
                        <path d="M3.75 5.41667C2.93605 5.41667 2.25875 5.99954 2.11256 6.77083H1.5625C1.38991 6.77083 1.25 6.91074 1.25 7.08333C1.25 7.25592 1.38991 7.39583 1.5625 7.39583H2.11256C2.25875 8.16712 2.93605 8.75 3.75 8.75C4.56395 8.75 5.24125 8.16712 5.38744 7.39583H8.4375C8.61009 7.39583 8.75 7.25592 8.75 7.08333C8.75 6.91074 8.61009 6.77083 8.4375 6.77083H5.38744C5.24125 5.99954 4.56395 5.41667 3.75 5.41667Z" fill="black" />
                    </svg>
                    <p className="text-sm">
                        فیلتر
                    </p>
                </button>

                <div style={showMobileFilter === true ? { transform: "translateY(0%)", overflowY: 'scroll', boxShadow: "-2px -6px 17.1px 0px rgba(0, 0, 0, 0.17)" } : { transform: "translateY(100%)" }} className={styles.mobileCategory + " fixed bottom-0 left-0 bg-white z-50 w-full rounded-tr-2xl rounded-tl-2xl p-4 duration-300 max-h-[500px]"}>
                    <div>
                        <div className="mb-1">
                            <svg onClick={() => setShowMobileFilter(!showMobileFilter)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11612 4.11612C4.60427 3.62796 5.39573 3.62796 5.88388 4.11612L12 10.2322L18.1161 4.11612C18.6043 3.62796 19.3957 3.62796 19.8839 4.11612C20.372 4.60427 20.372 5.39573 19.8839 5.88388L13.7678 12L19.8839 18.1161C20.372 18.6043 20.372 19.3957 19.8839 19.8839C19.3957 20.372 18.6043 20.372 18.1161 19.8839L12 13.7678L5.88388 19.8839C5.39573 20.372 4.60427 20.372 4.11612 19.8839C3.62796 19.3957 3.62796 18.6043 4.11612 18.1161L10.2322 12L4.11612 5.88388C3.62796 5.39573 3.62796 4.60427 4.11612 4.11612Z" fill="#110000" />
                            </svg>
                        </div>
                        <div className="mb-1">
                            <p>
                                مرتب سازی بر اساس:
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 flex-row-reverse">
                                {filter?.sort === "newest" ?
                                    <p className="text-[#E14957] text-[12px] cursor-pointer" onClick={() => handleSortChange("newest")}>
                                        جدیدترین
                                    </p> :
                                    <p className="text-[#8D8989] text-[12px] cursor-pointer" onClick={() => handleSortChange("newest")}>
                                        جدیدترین
                                    </p>
                                }

                                {filter?.sort === "bestsellers" ?
                                    <p className="text-[#E14957] text-[12px] cursor-pointer" onClick={() => handleSortChange("bestsellers")}>
                                        پرفروش ترین
                                    </p> :
                                    <p className="text-[#8D8989] text-[12px] cursor-pointer" onClick={() => handleSortChange("bestsellers")}>
                                        پرفروش ترین
                                    </p>
                                }

                                {filter?.sort === "inexpensive" ?
                                    <p className="text-[#E14957] text-[12px] cursor-pointer" onClick={() => handleSortChange("inexpensive")}>
                                        ارزان ترین
                                    </p> :
                                    <p className="text-[#8D8989] text-[12px] cursor-pointer" onClick={() => handleSortChange("inexpensive")}>
                                        ارزان ترین
                                    </p>
                                }

                                {filter?.sort === "expensive" ?
                                    <p className="text-[#E14957] text-[12px] cursor-pointer" onClick={() => handleSortChange("expensive")}>
                                        گران ترین
                                    </p> :
                                    <p className="text-[#8D8989] text-[12px] cursor-pointer" onClick={() => handleSortChange("expensive")}>
                                        گران ترین
                                    </p>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        <div className="mb-1">
                            <p>
                                مناسب برای ماشین
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            {cars?.map((item) => (
                                <div className="flex items-center gap-1 flex-row-reverse" onClick={() => handleCarChange(item?.slug)}>
                                    {filter?.car === item?.slug ?
                                        <svg className="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.00065 14.6666H10.0007C13.334 14.6666 14.6673 13.3333 14.6673 9.99992V5.99992C14.6673 2.66659 13.334 1.33325 10.0007 1.33325H6.00065C2.66732 1.33325 1.33398 2.66659 1.33398 5.99992V9.99992C1.33398 13.3333 2.66732 14.6666 6.00065 14.6666Z" fill="#E14957" stroke="#E14957" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M5.16602 7.99995L7.05268 9.88661L10.8327 6.11328" stroke="#FEFDFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> :

                                        <svg className="cursor-pointer" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.00065 14.6666H10.0007C13.334 14.6666 14.6673 13.3333 14.6673 9.99992V5.99992C14.6673 2.66659 13.334 1.33325 10.0007 1.33325H6.00065C2.66732 1.33325 1.33398 2.66659 1.33398 5.99992V9.99992C1.33398 13.3333 2.66732 14.6666 6.00065 14.6666Z" stroke="#8D8989" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    }
                                    <p className="text-[#8D8989] text-[12px] cursor-pointer">
                                        {item?.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-2">
                        <div className="mb-1">
                            <p>
                                برند
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            {partBrands?.map((item) => (
                                <div className="flex items-center gap-1 flex-row-reverse" onClick={() => handleBrandChange(item?.id)}>
                                    {filter?.brand === item?.id ?
                                        <svg className="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.00065 14.6666H10.0007C13.334 14.6666 14.6673 13.3333 14.6673 9.99992V5.99992C14.6673 2.66659 13.334 1.33325 10.0007 1.33325H6.00065C2.66732 1.33325 1.33398 2.66659 1.33398 5.99992V9.99992C1.33398 13.3333 2.66732 14.6666 6.00065 14.6666Z" fill="#E14957" stroke="#E14957" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M5.16602 7.99995L7.05268 9.88661L10.8327 6.11328" stroke="#FEFDFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> :

                                        <svg className="cursor-pointer" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.00065 14.6666H10.0007C13.334 14.6666 14.6673 13.3333 14.6673 9.99992V5.99992C14.6673 2.66659 13.334 1.33325 10.0007 1.33325H6.00065C2.66732 1.33325 1.33398 2.66659 1.33398 5.99992V9.99992C1.33398 13.3333 2.66732 14.6666 6.00065 14.6666Z" stroke="#8D8989" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    }
                                    <p className="text-[#8D8989] text-[12px] cursor-pointer">
                                        {item?.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="mt-10 flex items-start gap-5">

                    <div className="w-9/12 flex flex-col gap-3 max-md:w-full">
                        <div className="flex items-center gap-4 bg-[#FAFAFA] rounded-lg p-3 flex-row-reverse max-md:hidden">
                            <p className="font-bold text-lg text-[#221F1F]">
                                مرتب سازی بر اساس:
                            </p>
                            <div className="flex items-center gap-3 flex-row-reverse">
                                {filter?.sort === "newest" ?
                                    <p className="text-[#1F66EF] text-[12px] cursor-pointer" onClick={() => handleSortChange("newest")}>
                                        جدیدترین
                                    </p> :
                                    <p className="text-[#8D8989] text-[12px] cursor-pointer" onClick={() => handleSortChange("newest")}>
                                        جدیدترین
                                    </p>
                                }

                                {filter?.sort === "bestsellers" ?
                                    <p className="text-[#1F66EF] text-[12px] cursor-pointer" onClick={() => handleSortChange("bestsellers")}>
                                        پرفروش ترین
                                    </p> :
                                    <p className="text-[#8D8989] text-[12px] cursor-pointer" onClick={() => handleSortChange("bestsellers")}>
                                        پرفروش ترین
                                    </p>
                                }

                                {filter?.sort === "inexpensive" ?
                                    <p className="text-[#1F66EF] text-[12px] cursor-pointer" onClick={() => handleSortChange("inexpensive")}>
                                        ارزان ترین
                                    </p> :
                                    <p className="text-[#8D8989] text-[12px] cursor-pointer" onClick={() => handleSortChange("inexpensive")}>
                                        ارزان ترین
                                    </p>
                                }

                                {filter?.sort === "expensive" ?
                                    <p className="text-[#1F66EF] text-[12px] cursor-pointer" onClick={() => handleSortChange("expensive")}>
                                        گران ترین
                                    </p> :
                                    <p className="text-[#8D8989] text-[12px] cursor-pointer" onClick={() => handleSortChange("expensive")}>
                                        گران ترین
                                    </p>
                                }


                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2" style={{ direction: "rtl" }} id="top">
                            {carTypeProducts?.map((item) => (
                                <ShopItem data={item} />
                            ))}
                        </div>


                        <div className={styles.pagination + " flex container w-11/12 gap-4 justify-center items-center mb-20 mx-auto mt-10"}>
                            {currentPage > 1 ?
                                <div className={styles.next}>

                                    <button className="flex gap-2 items-center hover:text-[#E14957] duration-300" onClick={prevPage}>
                                        قبلی
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none" style={{ transform: "rotate(180deg)" }}>
                                            <path d="M5.19873 10.8292L8.51421 7.51372L5.19873 4.19824" stroke="#25282B" stroke-width="1.10516" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div> : ""
                            }
                            <div className={styles.items + " flex gap-1"}>
                                {numberOfPages && Array.from({ length: numberOfPages }, (_, index) => (
                                    <>
                                        {index + 1 <= 2 ? (
                                            // Show the first two pages
                                            <p
                                                key={index}
                                                className={`w-6 h-6 cursor-pointer flex items-center justify-center hover:text-[#E14957] duration-300 ${currentPage === index + 1 ? 'text-white bg-[#E14957]' : 'text-black'
                                                    }`}
                                                onClick={() => handleCurrentPage(index + 1)}
                                            >
                                                {index + 1}
                                            </p>
                                        ) : index + 1 === 3 && numberOfPages > 4 ? (
                                            // Show dots after the second page if there are more than 4 pages
                                            <p key={index} className="w-6 h-6 flex items-center justify-center">
                                                ...
                                            </p>
                                        ) : index + 1 > 2 && currentPage === index + 1 ? (
                                            // Show the current page
                                            <p
                                                key={index}
                                                className={`w-6 h-6 cursor-pointer flex items-center justify-center hover:text-[#E14957] duration-300 ${currentPage === index + 1 ? 'text-white bg-[#E14957]' : 'text-black'
                                                    }`}
                                                onClick={() => handleCurrentPage(index + 1)}
                                            >
                                                {index + 1}
                                            </p>
                                        ) : index + 1 === numberOfPages - 2 && numberOfPages > 4 ? (
                                            // Show dots before the second-to-last page if there are more than 4 pages
                                            <p key={index} className="w-6 h-6 flex items-center justify-center">
                                                ...
                                            </p>
                                        ) : index + 1 === numberOfPages - 1 || index + 1 === numberOfPages ? (
                                            // Show the last two pages
                                            <p
                                                key={index}
                                                className={`w-6 h-6 cursor-pointer flex items-center justify-center hover:text-[#E14957] duration-300 ${currentPage === index + 1 ? 'text-white bg-[#E14957]' : 'text-black'
                                                    }`}
                                                onClick={() => handleCurrentPage(index + 1)}
                                            >
                                                {index + 1}
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                    </>
                                ))}
                            </div>
                            {currentPage !== numberOfPages ?
                                <div className={styles.next}>
                                    <button className="flex gap-2 items-center hover:text-[#E14957] duration-300" onClick={nextPage} disabled={currentPage === numberOfPages}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                            <path d="M5.19873 10.8292L8.51421 7.51372L5.19873 4.19824" stroke="#25282B" stroke-width="1.10516" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        بعدی
                                    </button>
                                </div> : ""
                            }
                        </div>

                    </div>

                    <div className="w-3/12 flex flex-col gap-2 max-md:hidden">
                        <div className="bg-[#FAFAFA] rounded-lg p-3 flex items-center justify-between">
                            <button className="text-[#221F1F] text-[10px] py-1 px-2 rounded-[34px]" style={{ border: "1px solid rgb(0,0,0,10%)" }} onClick={handleRemoveFilter}>
                                حذف فیلترها
                            </button>
                            <p className="font-bold text-lg text-[#221F1F]">
                                فیلترها
                            </p>
                        </div>

                        <div className="bg-[#FAFAFA] rounded-lg p-3 flex flex-col gap-3 max-h-[300px]" style={{overflowY: "scroll"}}>
                            <p className="font-bold text-lg text-[#221F1F]">
                                مناسب برای ماشین
                            </p>
                            <div className="flex flex-col gap-2">
                                {cars?.map((item) => (
                                    <div className="flex items-center gap-1 flex-row-reverse" onClick={() => handleCarChange(item?.slug)}>
                                        {filter?.car === item?.slug ?
                                            <svg className="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.00065 14.6666H10.0007C13.334 14.6666 14.6673 13.3333 14.6673 9.99992V5.99992C14.6673 2.66659 13.334 1.33325 10.0007 1.33325H6.00065C2.66732 1.33325 1.33398 2.66659 1.33398 5.99992V9.99992C1.33398 13.3333 2.66732 14.6666 6.00065 14.6666Z" fill="#1F66EF" stroke="#1F66EF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M5.16602 7.99995L7.05268 9.88661L10.8327 6.11328" stroke="#FEFDFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg> :

                                            <svg className="cursor-pointer" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.00065 14.6666H10.0007C13.334 14.6666 14.6673 13.3333 14.6673 9.99992V5.99992C14.6673 2.66659 13.334 1.33325 10.0007 1.33325H6.00065C2.66732 1.33325 1.33398 2.66659 1.33398 5.99992V9.99992C1.33398 13.3333 2.66732 14.6666 6.00065 14.6666Z" stroke="#8D8989" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        }
                                        <p className="text-[#8D8989] text-[12px] cursor-pointer">
                                            {item?.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#FAFAFA] rounded-lg p-3 flex flex-col gap-3 max-h-[300px]" style={{overflowY: "scroll"}}>
                            <p className="font-bold text-lg text-[#221F1F]">
                                برند
                            </p>
                            <div className="flex flex-col gap-2">
                                {partBrands?.map((item) => (
                                    <div className="flex items-center gap-1 flex-row-reverse" onClick={() => handleBrandChange(item?.id)}>
                                        {filter?.brand === item?.id ?
                                            <svg className="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.00065 14.6666H10.0007C13.334 14.6666 14.6673 13.3333 14.6673 9.99992V5.99992C14.6673 2.66659 13.334 1.33325 10.0007 1.33325H6.00065C2.66732 1.33325 1.33398 2.66659 1.33398 5.99992V9.99992C1.33398 13.3333 2.66732 14.6666 6.00065 14.6666Z" fill="#1F66EF" stroke="#1F66EF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M5.16602 7.99995L7.05268 9.88661L10.8327 6.11328" stroke="#FEFDFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg> :

                                            <svg className="cursor-pointer" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.00065 14.6666H10.0007C13.334 14.6666 14.6673 13.3333 14.6673 9.99992V5.99992C14.6673 2.66659 13.334 1.33325 10.0007 1.33325H6.00065C2.66732 1.33325 1.33398 2.66659 1.33398 5.99992V9.99992C1.33398 13.3333 2.66732 14.6666 6.00065 14.6666Z" stroke="#8D8989" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        }
                                        <p className="text-[#8D8989] text-[12px] cursor-pointer">
                                            {item?.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default SubCategoryPage;