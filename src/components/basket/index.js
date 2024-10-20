import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { RedPrimaryButton } from "../button";
import BasketItem from "./basketItem";
import { getUserCart } from "../../api/user";
import Link from "next/link";

const Basket = () => {


    const [cartItems , setCartItems] = useState(null);

    // function for get all carts data
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getUserCart();
            setCartItems(data?.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);

    const formatNumberWithThousandSeparator = (number) => {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    


    return(
        <div className={styles.basket + " mt-20 mb-10 max-md:mt-10 max-md:mb-20 max-md:pb-10"}>
            <div className={styles.title + " flex text-right justify-center items-center gap-2 py-4 bg-[#E14957]"}>
                <div className={styles.titleContainer + " flex text-right items-center gap-2"}>
                    <p className="text-white text-sm">
                        سبد خرید
                    </p>
                    <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192 32 192c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512L430 512c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32l-85.6 0L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192l-232.6 0L253.3 35.1zM192 304l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16zm128 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                </div>
            </div>
            <div className={styles.basketContainer + " container w-11/12 mx-auto"}>
                <div className={styles.basketWrapper + " flex max-md:flex-col-reverse items-start p-5 gap-10 justify-between mt-10"}>
                    <div className={styles.desc + " w-2/5 max-md:w-full flex flex-col justify-center items-center"}>
                        {/* <div className={styles.image}>
                            <img src="../../images/basketvector.png" alt="image" />
                        </div> */}
                        <div className={styles.total + " w-full border border-[#9C9C9C] rounded-lg mt-5"}>
                            <div className={styles.container + " p-3 flex flex-col gap-2 mb-2"}>
                                <div className={styles.container + " p-3 flex flex-col gap-2 mb-2"}>
                                    <div className={styles.item + " flex justify-between"}>
                                        <p className="text-xs">{formatNumberWithThousandSeparator(cartItems?.total_products_price)} <span className="text-xs">تومان</span> </p>
                                        <p className="text-xs">قیمت کالاها </p>
                                    </div>
                                    <div className={styles.item + " flex justify-between"}>
                                        <p className="text-xs">{formatNumberWithThousandSeparator(cartItems?.tax_price)} <span className="text-xs">تومان</span> </p>
                                        <p className="text-xs">مالیات بر ارزش افزوده</p>
                                    </div>
                                </div>
                            </div>
                            <Link className="w-full" href={"/payment"}>
                                <button className="w-full bg-[#E14957] tex-white rounded-br-lg rounded-bl-lg text-white text-sm py-1">
                                    ادامه خرید
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.items + " w-3/5 max-md:w-full flex flex-col gap-5"}>
                        {cartItems?.items?.map((item) => (
                            <BasketItem chassi_id={item?.chassi_id} color={item?.color} count={item?.count} created_at={item?.created_at} delivery={item?.delivery} discount={item?.discount} guarentee_id={item?.guarentee_id} id={item?.id} post={item?.post} post_id={item?.post_id} price={item?.price} size={item?.size} updated_at={item?.updated_at} user_id={item?.user_id} />
                        ))}
                        {cartItems?.items?.length === 0 ? <p className="text-[#EB0E23]">سبد خرید شما خالیست</p> : ''}
                        
                        {/* <BasketItem /> */}
                    </div>
                </div>



                {/* <div className={styles.related + " flex flex-col gap-7 mt-20"}>
                    <p className={styles.title + " font-bold text-xl"}>
                        پیشنهادات ویژه :
                    </p>
                    <div className={styles.items + " grid grid-cols-4 gap-4 max-w-5xl mx-auto max-lg:grid-cols-3 max-md:grid-cols-1"}>
                        <ActiveShopItem />
                        <ActiveShopItem />
                        <ActiveShopItem />
                        <ActiveShopItem />
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Basket;