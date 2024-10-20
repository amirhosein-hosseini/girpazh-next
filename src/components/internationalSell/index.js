import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { BlackPrimaryButton, RedPrimaryButton } from "../button";
import { getCookie } from "../../api/auth";
import { toast } from "react-toastify";
import { prefix, url } from "../../api/domain";
import axios from "axios";

const InternationalSell = () => {


    const token = getCookie('token');
    const [showQue , setShowQue] = useState(false);
    const [errors , setErrors] = useState(null);
    const [formData, setFormData] = useState({
        type: "international_request",
        name: "",
        email: "",
        phone: "",
        car_chassi_number: "",
        product_name: "",
        car_type: "",
        car_production_year: "",
        body: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = (e) => {

        e.preventDefault();


        axios.post(url + "/" + prefix + '/request/send', formData , {
                headers:{
                'Authorization' : 'Bearer ' + token,
                }
            })
            .then((response) => {
                if(response?.data?.data?.errors){
                    setErrors(response?.data?.data?.errors)
                }else{
                    toast.success("سفارش با موفقیت ثبت شد منتظر تماس کارشناسان ما باشید");
                    setErrors(null);
                }
            })
            .catch((error) => {
                toast.error(error.response.data)
            })
            .finally(() => {
                console.log("final")
            });
    };


    // funcotion for handeling show popup
    useEffect(() => {
        if (showQue === true) {
            // Disable scrolling
            document.body.classList.add("noScroll");
        } else {
            // Enable scrolling
            document.body.classList.remove("noScroll");
        }
    }, [showQue]);


    console.log(errors)



    return(
        <>
            {showQue === true ?
                <div className="absolute top-0 left-0 h-[100vh] w-full flex items-center justify-center" style={{ background: "rgb(0,0,0,40%)", zIndex: "100" }} onClick={() => setShowQue(false)}>
                    <div className="max-w-[500px] w-11/12 overflow-hidden">
                        <img className="object-cover w-full" src="../../images/quenumber.png" />
                    </div>
                </div> : ""
            }

            <div className={styles.internationalSell + " mt-20 mb-20 max-md:mt-20"}>
                <div className={styles.container + " container max-w-[1200px] w-11/12 mx-auto overflow-hidden"}>
                    <div className="w-full overflow-hidden rounded-lg mb-10">
                        <img src="../../images/internationalbanner.png" alt="image" />
                    </div>
                    <div className={styles.title + " mb-10"}>
                        <h1 className="font-bold text-xl">
                            مراحل ثبت سفارش بین المللی
                        </h1>
                    </div>
                    <form className="bg-white p-7 rounded-lg">
                        <div className={styles.formgroup + " w-full flex flex-row-reverse max-md:flex-col gap-3 mb-3"}>
                            <div className="w-1/2 max-md:w-full">
                                <input
                                    name="name"
                                    className="p-2 w-full bg-white border rounded-lg"
                                    type="text"
                                    placeholder="نام و نام خانوادگی "
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors?.name ? <p className="text-xs mt-1" style={{color: "red"}}>{errors?.name}</p> : ""}
                            </div>
                            <div className="w-1/2 max-md:w-full">
                                <input
                                    name="phone"
                                    className="p-2 w-full bg-white border rounded-lg"
                                    type="text"
                                    placeholder="شماره تماس "
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                {errors?.phone ? <p className="text-xs mt-1" style={{color: "red"}}>{errors?.phone}</p> : ""}
                            </div>
                        </div>
                        <div className={styles.formgroup + " w-full flex flex-row-reverse max-md:flex-col gap-3 mb-3"}>
                            <div className="w-1/2 max-md:w-full">
                                <input
                                    name="product_name"
                                    className="p-2 w-full bg-white border rounded-lg"
                                    type="text"
                                    placeholder="نام کالا "
                                    value={formData.product_name}
                                    onChange={handleChange}
                                />
                                {errors?.product_name ? <p className="text-xs mt-1" style={{color: "red"}}>{errors?.product_name}</p> : ""}
                            </div>
                            <div className="w-1/2 max-md:w-full">
                                <input
                                    name="car_type"
                                    className="p-2 w-full bg-white border rounded-lg"
                                    type="text"
                                    placeholder="نوع خودرو"
                                    value={formData.car_type}
                                    onChange={handleChange}
                                />
                                {errors?.car_type ? <p className="text-xs mt-1" style={{color: "red"}}>{errors?.car_type}</p> : ""}
                            </div>
                        </div>
                        <div className={styles.formgroup + " w-full flex max-md:flex-col gap-3 mb-3"}>
                            <div className="w-1/2 max-md:w-full">
                                <input
                                    name="car_production_year"
                                    className="p-2 w-full bg-white border rounded-lg"
                                    type="text"
                                    placeholder="سال تولید"
                                    value={formData.car_production_year}
                                    onChange={handleChange}
                                />
                                {errors?.car_production_year ? <p className="text-xs mt-1" style={{color: "red"}}>{errors?.car_production_year}</p> : ""}
                            </div>
                            <div className="w-1/2 max-md:w-full relative">
                                <input
                                    name="car_chassi_number"
                                    className="p-2 w-full bg-white border rounded-lg"
                                    type="text"
                                    placeholder="شماره شاسی خودرو "
                                    value={formData.car_chassi_number}
                                    onChange={handleChange}
                                />
                                {errors?.car_chassi_number ? <p className="text-xs mt-1" style={{color: "red"}}>{errors?.car_chassi_number}</p> : ""}
                                <svg onClick={() => setShowQue(true)} className="absolute left-2 top-[50%] w-4 cursor-pointer" style={{ transform: "translate(0,-50%)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>
                            </div>
                        </div>
                        <div className={styles.formgroup + " w-full"}>
                            <textarea
                                name="body"
                                style={{ resize: "none" }}
                                className="w-full p-2 w-full bg-white border rounded-lg"
                                rows={10}
                                placeholder="عنوان سفارش با توضیحات :"
                                value={formData.body}
                                onChange={handleChange}
                            />
                            {errors?.body ? <p className="text-xs mt-1" style={{color: "red"}}>{errors?.body}</p> : ""}
                        </div>
                        <div className={styles.button + " mt-4"} onClick={handleSubmit}>
                            <RedPrimaryButton>
                                ثبت درخواست سفارش
                            </RedPrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default InternationalSell;