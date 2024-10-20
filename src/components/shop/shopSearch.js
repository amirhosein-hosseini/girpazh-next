import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { getAllCategories } from "../../api/home";
import { getAllProducts, getAllSearchRequests } from "../../api/shop";
import axios from "axios";
import { prefix, url } from "../../api/domain";
import ShopItem from "./shopItem";
import { RedPrimaryButton } from "../button";
import Link from "next/link";

const ShopSearch = ({slug}) => {


    const [products , setProducts] = useState(null);
    const [loading , setLoading] = useState(false);


    // function for get all search data
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
          try {
            const data = await getAllSearchRequests(slug);
            setProducts(data?.data?.data);
            setLoading(false)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [slug]);


    console.log(products)




    const parsToArray = (string) => {
        let actualArray = JSON.parse(string);
        return actualArray
    }


    return(
        <div className="min-h-[50vh] mt-14">
            {loading === true ? 
                <div className="flex w-full h-full justify-center items-center">
                        <svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="transparent" stroke-dasharray="31.42 31.42" stroke-dashoffset="10"></circle>
                        </svg>
                </div> : 
                    <>
                        {products !== null && products?.length <= 0 ?
                            <div className="min-h-[50vh] flex items-center justify-center flex-col gap-6">
                                <p className="text-xl font-bold max-md:text-lg text-center">
                                    کالایی مطابق درخواست شما یافت نشد
                                </p>
                                <p className="text-lg max-md:text-sm text-center">
                                    میتوانید از طریق لینک زیر کالای خود را در گیرپاژ سفارش بدهید
                                </p>
                                <div>
                                    <Link href={"/international-sell"}>
                                        <RedPrimaryButton>
                                            سفارش کالا
                                        </RedPrimaryButton>
                                    </Link>
                                </div>
                            </div> :
                            <div>
                                <div className={styles.container + " container w-11/12 max-w-5xl mx-auto overflow-hidden"}>
                                    <div className={styles.title + " mb-10 flex items-center justify-center flex-row-reverse"}>
                                        <p className="font-bold text-xl max-md:text-sm">
                                            نتایج جست و جو برای 
                                        </p>
                                        <p className="font-bold text-xl mr-1 text-[#E14957] max-md:text-sm">
                                            {slug}
                                        </p>
                                    </div>
                                    <div className={styles.items + " grid grid-cols-3 gap-4 max-md:grid-cols-1"}>
                                        {products?.map((item) => (
                                            <ShopItem data={item} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }
                    </>
            }
        </div>

    )
}

export default ShopSearch;