import React, { useState } from "react";
import styles from "./styles.module.scss";
import { prefix, url } from "../../api/domain";
import axios from "axios";
import { getCookie } from "../../api/auth";

const BasketItem = ({id , chassi_id , color , count , created_at , delivery , discount , guarentee_id , post , post_id , price , size , updated_at , user_id}) => {



    const token = getCookie('token')
    // const parsToArray = (string) => {
    //     let actualArray = JSON?.parse(string);
    //     return actualArray
    // }
    const [active , setActive] = useState(false);


    const formatNumberWithThousandSeparator = (number) => {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleDecrease = () => {
        setActive(true);
        axios.post(url + "/" + prefix + '/cart/decrease' , {cart_id : id},{
                headers:{
                'Authorization' : 'Bearer ' + token,
                }
            })
            .then((response) => {
                setActive(false);
                window.location.reload()
            })
            .catch((error) => {
                // setError(error.response.data)
                setActive(false);
            })
            .finally(() => {
                console.log("final")
                setActive(false);
            });
    }

    const handleIncrease = () => {
        setActive(true);
        axios.post(url + "/" + prefix + '/cart/increase' , {cart_id : id},{
                headers:{
                'Authorization' : 'Bearer ' + token,
                }
            })
            .then((response) => {
                // setErrors(response?.data?.data?.errors);
                setActive(false);
                window.location.reload()
            })
            .catch((error) => {
                // setError(error.response.data)
                setActive(false);
            })
            .finally(() => {
                console.log("final")
                setActive(false);
            });
    }



    return(
        <div className={styles.basketItem + " w-full justify-end flex max-md:border-b max-md:border-b-black max-md:pb-5 items-center gap-4"}>
            <div className={styles.desc}>
                <p className="text-sm font-bold max-md:text-[12px]">{post?.title}</p>
                <div className="flex justify-end items-center gap-2 mt-2">
                    <p className="text-xs font-bold">
                        گیرپاژ
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 36 35" fill="none">
                        <path d="M26.0861 7.64441L17.9521 3.26788C17.0883 2.80719 16.0661 2.80719 15.2023 3.26788L7.08273 7.64441C6.49247 7.97553 6.11816 8.60897 6.11816 9.3C6.11816 10.0054 6.47808 10.6389 7.08273 10.9556L15.2167 15.3321C15.6486 15.5625 16.1237 15.6776 16.5844 15.6776C17.0451 15.6776 17.5346 15.5625 17.9521 15.3321L26.0861 10.9556C26.6763 10.6389 27.0506 10.0054 27.0506 9.3C27.0506 8.60897 26.6763 7.97553 26.0861 7.64441Z" fill="#292D32"/>
                        <path d="M13.8772 16.8582L6.31909 13.0863C5.72884 12.784 5.0666 12.8272 4.50514 13.1583C3.95807 13.5038 3.62695 14.0941 3.62695 14.7419V21.8826C3.62695 23.1207 4.31798 24.2292 5.42651 24.7907L12.9847 28.5625C13.2438 28.6921 13.5317 28.7641 13.8197 28.7641C14.1508 28.7641 14.4963 28.6633 14.7986 28.4906C15.3457 28.145 15.6768 27.5548 15.6768 26.9069V19.7663C15.6624 18.5282 14.9714 17.4197 13.8772 16.8582Z" fill="#292D32"/>
                        <path d="M29.5403 14.7419V18.2834C28.8493 18.0819 28.1151 17.9955 27.3809 17.9955C25.4229 17.9955 23.5082 18.6722 21.9966 19.8815C19.9235 21.5083 18.743 23.9701 18.743 26.6334C18.743 27.3388 18.8294 28.0443 19.0165 28.7209C18.8006 28.6921 18.5846 28.6057 18.3831 28.4762C17.836 28.145 17.5049 27.5548 17.5049 26.9069V19.7663C17.5049 18.5282 18.1959 17.4197 19.29 16.8582L26.8482 13.0863C27.4385 12.784 28.1007 12.8272 28.6622 13.1583C29.2092 13.5038 29.5403 14.0941 29.5403 14.7419Z" fill="#292D32"/>
                        <path d="M32.3917 22.5595C31.2112 21.1055 29.4116 20.1841 27.3817 20.1841C25.8557 20.1841 24.4449 20.7168 23.3363 21.6093C21.8391 22.7898 20.9033 24.6182 20.9033 26.6625C20.9033 27.8718 21.2488 29.0235 21.8391 30.0025C22.2278 30.6503 22.7173 31.2118 23.2931 31.6725H23.3075C24.4161 32.5938 25.8413 33.1409 27.3817 33.1409C29.0229 33.1409 30.5058 32.5363 31.6431 31.5285C32.147 31.0966 32.5789 30.5783 32.9244 30.0025C33.5146 29.0235 33.8602 27.8718 33.8602 26.6625C33.8602 25.1077 33.3131 23.668 32.3917 22.5595ZM30.6353 25.8563L27.1802 29.0523C26.9786 29.2395 26.7051 29.3402 26.446 29.3402C26.1724 29.3402 25.8989 29.2395 25.683 29.0235L24.0849 27.4255C23.6674 27.008 23.6674 26.317 24.0849 25.8995C24.5024 25.482 25.1935 25.482 25.611 25.8995L26.4748 26.7633L29.1669 24.2727C29.5988 23.8696 30.2898 23.8984 30.6929 24.3303C31.1104 24.7766 31.0816 25.4532 30.6353 25.8563Z" fill="#29BE2F"/>
                    </svg>
                </div>
                {/* <div className="flex justify-end items-center gap-2 mt-2">
                    <p className="text-xs font-bold">
                        گارانتی اصالت و سلامت فیزیکی کالا   
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 33 33" fill="none">
                        <path d="M25.0687 6.3008L17.7841 3.57237C17.0292 3.29423 15.7974 3.29423 15.0425 3.57237L7.75784 6.3008C6.35389 6.83059 5.21484 8.47294 5.21484 9.96959V20.6979C5.21484 21.7707 5.91682 23.1879 6.77773 23.8236L14.0623 29.2672C15.3471 30.2341 17.453 30.2341 18.7377 29.2672L26.0224 23.8236C26.8833 23.1746 27.5852 21.7707 27.5852 20.6979V9.96959C27.5985 8.47294 26.4594 6.83059 25.0687 6.3008ZM21.0158 13.7179L15.3206 19.4131C15.1219 19.6118 14.8703 19.7045 14.6186 19.7045C14.367 19.7045 14.1153 19.6118 13.9166 19.4131L11.7975 17.2675C11.4134 16.8834 11.4134 16.2476 11.7975 15.8635C12.1816 15.4794 12.8173 15.4794 13.2014 15.8635L14.6319 17.2939L19.6251 12.3007C20.0092 11.9166 20.645 11.9166 21.0291 12.3007C21.4132 12.6848 21.4132 13.3338 21.0158 13.7179Z" fill="#292D32"/>
                    </svg>
                </div> */}
                {/* <p className="text-xs max-w-[280px] ml-auto mt-2">
                    هزینه این سفارش هنوز پرداخت نشده‌ و در صورت اتمام موجودی، کالاها از سبد حذف می‌شوند
                </p> */}
                <div className="flex items-center justify-between max-w-[300px] ml-auto mt-3">
                    <p className="max-md:text-[12px]">{formatNumberWithThousandSeparator(price)}<span>تومان</span> </p>
                    <div className="flex gap-3 bg-[#E14957] px-3 max-md:py-1 items-center rounded-lg justify-between">
                        <button disabled={active === true ? true : false} className="text-lg text-white cursor-pointer max-md:text-sm" onClick={handleDecrease}>-</button>
                        <p className="text-lg text-white max-md:text-xs">{count}</p>
                        <button disabled={active === true ? true : false} className="text-lg text-white cursor-pointer max-md:text-sm" onClick={handleIncrease}>+</button>
                    </div>
                </div>
            </div>
            <div className={styles.image + " border border-black rounded-lg max-w-[200px] max-md:max-w-[100px] overflow-hidden"}>
                <img className="object-cover w-full" src={post?.images[0]}alt="image" />
            </div>
        </div>
    )
}

export default BasketItem;