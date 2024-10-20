import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { OutlineBlackButton, SecondPrimaryButton } from "../button";
import { useAuth } from "../../context/authContext";
import { setCookie } from "../../api/auth";
import axios from "axios";
import { prefix, url } from "../../api/domain";
import { toast } from "react-toastify";
import Link from "next/link";

const SignIn = () => {

    const { signIn } = useAuth();
    const [showPass , setShowPass] = useState("password");
    const [showConfPass , setShowConfPass] = useState("password");
    const [showSendCode , setShowSendCode] = useState(false);
    const [navigateToCode, setNavigateToCode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: null,
        password: "",
        confirmed: "",
        phone: "",
    });
    const [codeData , setCodeData] = useState({
        code: ""
    });
    const [errors , setErrors] = useState(null);
    const [loading , setLoading] = useState(false);
    const [userToken , setUserToken] = useState(null);




    const handleShowPassword = () => {
        if(showPass === "password"){
            setShowPass("text")
        }else if(showPass === "text"){
            setShowPass("password")
        }
    }

    const handleShowConfPass = () => {
        if(showConfPass === "password"){
            setShowConfPass("text")
        }else if(showConfPass === "text"){
            setShowConfPass("password")
        }
    }



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleCodeChange = (e) => {
        const { name, value } = e.target;
        setCodeData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        setLoading(true)


        axios.post(url + "/" + prefix + '/auth/register', formData)
            .then((response) => {
                setErrors(response?.data?.data?.errors);
                if(response.status === 200){
                    setNavigateToCode(true);
                }
                setLoading(false)
            })
            .catch((error) => {
                // setError(error.response.data)
                // toast.error(error.response.data.massage)
            })
            .finally(() => {
                console.log("final")
                setLoading(false)
            });
    };


    useEffect(() => {
        if (navigateToCode && errors === undefined) {
            goToCode();
        }
    }, [navigateToCode, errors]);


    const goToCode = () => {
        axios.post(url + "/" + prefix + '/auth/send-code', { phone: formData?.phone, code: codeData?.code, type: "register" })
            .then(() => {
                setShowSendCode(true);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
        });
    }


    const handleCodeSubmit = (e) => {

        e.preventDefault();

        setLoading(true)


        axios.post(url + "/" + prefix + '/auth/check-code', {phone: formData?.phone , code:codeData?.code, type: "register"})
            .then((response) => {
                setErrors(response?.data?.data?.errors);
                setUserToken(response?.data?.token);
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                setLoading(false);
            })
            .finally(() => {
                console.log("final");
                setLoading(false);
            });
    };


    useEffect(() => {
        if(errors === undefined){
            signIn(userToken);
            toast.success("به ربانی پارت خوش آمدید");
        }
    } , [userToken])



    if(showSendCode === true) {
        return(
            <div className={styles.login + " relative h-screen"}>
                <div className={styles.back + " absolute top-5 left-5 z-50"}>
                    <Link href={"/"}>
                        <svg className="w-6 fill-white max-md:fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                    </Link>
                </div>
                <div className={styles.loginwrapper + " flex items-center h-full"}>
                    <div className={styles.login__image + " w-1/2 max-md:hidden overflow-hidden h-full"}>
                        <img className="object-cover w-full h-full" src="../../images/loginimage.png" alt="image" />
                    </div>
                    <div className={styles.form + " w-1/2 max-md:w-full flex justify-center items-center flex-col"}>
                        <form className="w-1/2 max-md:w-11/12 m-x-auto flex justify-center items-center flex-col gap-4">
                            <div className={styles.formgroup + " relative w-full"}>
                                {errors?.code ? 
                                    <div>
                                        <input
                                            type="text"
                                            name="code"
                                            className={styles.redInput + " placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"}
                                            placeholder="کد ارسال شده را وارد کنید"
                                            value={codeData.code}
                                            onChange={handleCodeChange}
                                        />
                                        <p className="text-[#1F66EF] text-xs mt-1">{errors?.code}</p>
                                    </div> : 
                                    <input
                                        type="text"
                                        name="code"
                                        className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                        placeholder="کد ارسال شده را وارد کنید"
                                        value={codeData.code}
                                        onChange={handleCodeChange}
                                    />
                                }

                            </div>
                        </form>
                        <div className={styles.button + " w-1/2 max-md:w-11/12 mt-5 flex justify-between items-center flex-col gap-4"}>
                            <div className="grid w-full" onClick={handleCodeSubmit}>
                                {loading === true ? 
                                    <SecondPrimaryButton>
                                        <svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="transparent" stroke-dasharray="31.42 31.42" stroke-dashoffset="10"></circle>
                                        </svg>
                                    </SecondPrimaryButton> :
                                    <SecondPrimaryButton>
                                        تایید
                                    </SecondPrimaryButton>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



    return(
        <div className={styles.login + " relative h-screen"}>
            <div className={styles.back + " absolute top-5 left-5 z-50"}>
                <Link href={"/"}>
                    <svg className="w-6 fill-white max-md:fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                </Link>
            </div>
            <div className={styles.loginwrapper + " flex items-center h-full"}>
                <div className={styles.login__image + " w-1/2 max-md:hidden overflow-hidden h-full"}>
                    <img className="object-cover w-full h-full" src="../../images/loginimage.png" alt="image" />
                </div>
                <div className={styles.form + " w-1/2 max-md:w-full flex justify-center items-center flex-col"}>
                    <form className="w-1/2 max-md:w-11/12 m-x-auto flex justify-center items-center flex-col gap-4">
                        <div className={styles.formgroup + " relative w-full"}>
                            {errors?.email ? 
                                <div>
                                    <input
                                        type="text"
                                        name="email"
                                        className={styles.redInput + " placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"}
                                        placeholder="ایمیل( نام کاربری)"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <p className="text-[#1F66EF] text-xs mt-1">{errors?.email}</p>
                                </div> : 
                                <input
                                    type="text"
                                    name="email"
                                    className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="ایمیل( نام کاربری)"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            }

                        </div>
                        <div className={styles.formgroup + " relative w-full"}>
                            {errors?.name ? 
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        className={styles.redInput + " placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"}
                                        placeholder="نام و نام خانوادگی"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <p className="text-[#1F66EF] text-xs mt-1">{errors?.name}</p>
                                </div> : 
                                <input
                                    type="text"
                                    name="name"
                                    className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="نام و نام خانوادگی"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            }

                        </div>
                        <div className={styles.formgroup + " relative w-full"}>
                            {errors?.phone ? 
                                <div>
                                    <input
                                        type="text"
                                        name="phone"
                                        className={styles.redInput + " placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"}
                                        placeholder="شماره تلفن"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                    <p className="text-[#1F66EF] text-xs mt-1">{errors?.phone}</p>
                                </div> : 
                                <input
                                    type="text"
                                    name="phone"
                                    className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="شماره تلفن"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            }

                        </div>
                        <div className={styles.formgroup + " relative w-full"}>
                            {errors?.password ? 
                                <div>
                                    <input
                                        type={showPass}
                                        name="password"
                                        className={styles.redInput + " placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"}
                                        placeholder="رمز"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <p className="text-[#1F66EF] text-xs mt-1">{errors?.password}</p>  
                                </div> : 
                                <input
                                    type={showPass}
                                    name="password"
                                    className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="رمز"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                            }

                            <svg onClick={handleShowPassword} className="absolute left-3 top-3 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3E3E3E">
                                <path d="M21.25 9.14999C18.94 5.51999 15.56 3.42999 12 3.42999C10.22 3.42999 8.49 3.94999 6.91 4.91999C5.33 5.89999 3.91 7.32999 2.75 9.14999C1.75 10.72 1.75 13.27 2.75 14.84C5.06 18.48 8.44 20.56 12 20.56C13.78 20.56 15.51 20.04 17.09 19.07C18.67 18.09 20.09 16.66 21.25 14.84C22.25 13.28 22.25 10.72 21.25 9.14999ZM12 16.04C9.76 16.04 7.96 14.23 7.96 12C7.96 9.76999 9.76 7.95999 12 7.95999C14.24 7.95999 16.04 9.76999 16.04 12C16.04 14.23 14.24 16.04 12 16.04Z" fill="black"/>
                                <path d="M11.9999 9.14C10.4299 9.14 9.1499 10.42 9.1499 12C9.1499 13.57 10.4299 14.85 11.9999 14.85C13.5699 14.85 14.8599 13.57 14.8599 12C14.8599 10.43 13.5699 9.14 11.9999 9.14Z" fill="black"/>
                            </svg>
                        </div>
                        <div className={styles.formgroup + " relative w-full"}>
                            <input
                                type={showConfPass}
                                name="confirmed"
                                className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                placeholder="تکرار رمز"
                                value={formData.confirmed}
                                onChange={handleChange}
                            />
                            <svg onClick={handleShowConfPass} className="absolute left-3 top-3 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3E3E3E">
                                <path d="M21.25 9.14999C18.94 5.51999 15.56 3.42999 12 3.42999C10.22 3.42999 8.49 3.94999 6.91 4.91999C5.33 5.89999 3.91 7.32999 2.75 9.14999C1.75 10.72 1.75 13.27 2.75 14.84C5.06 18.48 8.44 20.56 12 20.56C13.78 20.56 15.51 20.04 17.09 19.07C18.67 18.09 20.09 16.66 21.25 14.84C22.25 13.28 22.25 10.72 21.25 9.14999ZM12 16.04C9.76 16.04 7.96 14.23 7.96 12C7.96 9.76999 9.76 7.95999 12 7.95999C14.24 7.95999 16.04 9.76999 16.04 12C16.04 14.23 14.24 16.04 12 16.04Z" fill="black"/>
                                <path d="M11.9999 9.14C10.4299 9.14 9.1499 10.42 9.1499 12C9.1499 13.57 10.4299 14.85 11.9999 14.85C13.5699 14.85 14.8599 13.57 14.8599 12C14.8599 10.43 13.5699 9.14 11.9999 9.14Z" fill="black"/>
                            </svg>
                        </div>
                    </form>
                    <div className={styles.button + " w-1/2 max-md:w-11/12 mt-5 flex justify-between items-center flex-col gap-4"}>
                        <div className="grid w-full" onClick={handleSubmit}>
                            {loading === true ?
                                <SecondPrimaryButton>
                                    <svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="transparent" stroke-dasharray="31.42 31.42" stroke-dashoffset="10"></circle>
                                    </svg>
                                </SecondPrimaryButton> :
                                <SecondPrimaryButton>
                                    ثبت نام
                                </SecondPrimaryButton>
                            }
                        </div>
                        <div className="grid w-full">
                            <Link href={"/login"}>
                                <OutlineBlackButton>
                                    از قبل ثبت نام کردید
                                </OutlineBlackButton>
                            </Link>
                        </div>
                    </div>
                    {/* <form>
                    <div className={styles.check + " w-full flex flex-col gap-3 mt-4 mb-4"}>
                            <div className={styles.checkWrapper + " flex items-center gap-2"} style={{direction : "rtl !important"}}>
                                <input 
                                    type="checkbox" 
                                    id="vehicle2" 
                                    name="vehicle2" 
                                    value="Car"
                                />
                                <label className="text-sm text-[#5E5E5E]" for="vehicle2">تمامی قوانین و مقررات  وب سایت ربانی پارت را مطالعه کردم و میپذیرم . </label><br />
                            </div>
                            <div className={styles.checkWrapper + " flex items-center gap-2"} style={{direction : "rtl !important"}}>
                                <input
                                    type="checkbox" 
                                    id="vehicle3" 
                                    name="vehicle3" 
                                    value="Boat"
                                />
                                <label className="text-sm text-[#5E5E5E]" for="vehicle3">عضویت در خبرنامه تخصصی </label><br/>
                            </div>
                        </div>
                    </form> */}
                </div>
            </div>
        </div>
    )
}

export default SignIn;