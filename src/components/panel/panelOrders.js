import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { getAllUserOrders } from "@/api/user";

const PanelOrder = () => {

    const [orders , setOrders] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllUserOrders();
            setOrders(data?.pay);
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
        <div className={styles.panelOrder + " px-5 py-12 max-md:py-5"}>
            <div className={styles.header + " flex flex-row-reverse items-center gap-2 mb-10"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.14648 6.29564C5.14648 4.35038 6.72343 2.77344 8.66869 2.77344H22.1171C24.0624 2.77344 25.6393 4.35038 25.6393 6.29564V27.4289C25.6393 27.8054 25.4193 28.1472 25.0767 28.3032C24.734 28.4592 24.3317 28.4005 24.0478 28.1533L21.403 25.8497L19.0482 28.1204C18.6761 28.4792 18.0868 28.4792 17.7147 28.1204L15.3929 25.8815L13.0712 28.1204C12.699 28.4792 12.1097 28.4792 11.7376 28.1204L9.38281 25.8497L6.73799 28.1533C6.45406 28.4005 6.05184 28.4592 5.70915 28.3032C5.36646 28.1472 5.14648 27.8054 5.14648 27.4289V6.29564ZM10.2697 10.1381C10.2697 9.60752 10.6998 9.17745 11.2303 9.17745H19.5555C20.086 9.17745 20.5161 9.60752 20.5161 10.1381C20.5161 10.6686 20.086 11.0987 19.5555 11.0987H11.2303C10.6998 11.0987 10.2697 10.6686 10.2697 10.1381ZM10.2697 15.2613C10.2697 14.7307 10.6998 14.3007 11.2303 14.3007H14.4323C14.9628 14.3007 15.3929 14.7307 15.3929 15.2613C15.3929 15.7918 14.9628 16.2219 14.4323 16.2219H11.2303C10.6998 16.2219 10.2697 15.7918 10.2697 15.2613Z" fill="black"/>
                </svg>
                <p>تاریخچه سفارشات</p>
            </div>
            <div className={styles.items + " flex items-center justify-center"}>
                {orders?.length === 0 ? 
                    <div className={styles.noItems + " flex flex-col gap-3 items-center justify-center"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
                            <g opacity="0.2">
                                <path d="M35.7744 9.68052L33.3361 22.9171C33.0418 24.5145 31.6491 25.6742 30.0247 25.6742H12.8607C11.2557 25.6742 9.8738 24.5413 9.55903 22.9674L6.29753 6.65994C6.06145 5.47955 5.02502 4.62988 3.82125 4.62988H2.94531M17.5954 15.6539L21.4643 11.7849M21.4643 11.7849L25.3332 7.916M21.4643 11.7849L17.5954 7.916M21.4643 11.7849L25.3332 15.6539M15.5719 31.9875C15.5719 33.1497 14.6297 34.0919 13.4675 34.0919C12.3052 34.0919 11.363 33.1497 11.363 31.9875C11.363 30.8252 12.3052 29.883 13.4675 29.883C14.6297 29.883 15.5719 30.8252 15.5719 31.9875ZM30.7238 31.9875C30.7238 33.1497 29.7816 34.0919 28.6194 34.0919C27.4571 34.0919 26.5149 33.1497 26.5149 31.9875C26.5149 30.8252 27.4571 29.883 28.6194 29.883C29.7816 29.883 30.7238 30.8252 30.7238 31.9875Z" stroke="black" stroke-width="2.52532" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                        </svg>
                        <p>هنوز هیچ سفارشی ندادید</p>
                    </div> :
                    <div className="w-11/12">
                        {orders?.map((item) => (
                            <>
                                {item?.status === 100 ?
                                    <div className="flex items-center justify-between text-xs border rounded-lg p-3 border-black flex-col">
                                        <div className="flex items-center justify-between w-full flex-row-reverse">
                                        <div className="flex items-center gap-1 flex-row-reverse">
                                                <p className="text-[#a1a3a8]">
                                                    وضعیت :
                                                </p>
                                                {item?.deliver === 0 ?
                                                    <p className="text-[#E14957]">
                                                        دریافت سفارش
                                                    </p> : item?.deliver === 1 ?
                                                        <p className="text-[#E14957]">
                                                            در انتظار بررسی
                                                        </p> : item?.deliver === 2 ?
                                                            <p className="text-[#E14957]">
                                                                بسته بندی شده
                                                            </p> : item?.deliver === 3 ?
                                                                <p className="text-[#E14957]">
                                                                    تحویل پست
                                                                </p> : item?.deliver === 4 ?
                                                                    <p className="text-[#E14957]">
                                                                        تکمیل شده
                                                                    </p> : ""
                                                }
                                            </div>
                                            <div>
                                                <button className="cursor-pointer hover:text-[#E14957] duration-300">
                                                    مشاهده
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 justify-end w-full mt-3 max-md:flex-col max-md:text-right max-md:items-end">
                                            <div className="flex items-center gap-1 flex-row-reverse">
                                                <p className="text-[#a1a3a8]">
                                                    کد رهگیری :
                                                </p>
                                                <p>
                                                    {item?.property}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 max-md:justify-between max-md:w-full">
                                                <div className="flex items-center gap-1 flex-row-reverse">
                                                    <p className="text-[#a1a3a8]">
                                                        مبلغ :
                                                    </p>
                                                    <p>
                                                        {formatNumberWithThousandSeparator(item?.price)} تومان
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1 flex-row-reverse">
                                                    <p>
                                                        {item?.created_at}
                                                    </p>
                                                </div>
                                            </div>


                                        </div>

                                    </div> : ""
                                }
                            </>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default PanelOrder;