import React, { useState } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import { prefix, url } from "../../api/domain";
import { toast } from "react-toastify";
import Head from "next/head";

const About = () => {


    const [formData, setFormData] = useState({
        email: "",
        type: "email_subscription",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = (e) => {

        e.preventDefault();


        axios.post(url + "/" + prefix + '/request/send', formData)
            .then((response) => {
                toast.success(response?.data?.message)
            })
            .catch((error) => {
                console.log(error?.response?.data?.message)
            })
            .finally(() => {
                console.log("final")
            });
    };



    return(
        <>
            <Head>
                <link rel="canonical" href={"https://girpazh.com/about"} />
            </Head>
            <div className={styles.about + " mt-20 py-20 max-md:py-0 container w-11/12 max-w-[1200px] mx-auto"}>
                <div className={styles.aboutHero + " flex items-center flex-row-reverse gap-10 max-md:flex-col"}>
                    <div className={styles.image + " w-1/3 max-md:w-1/2 overflow-hidden"}>
                        <img className="object-cover w-full rounded-lg" src="../../images/rabani.webp" alt="image" />
                    </div>
                    <div className={styles.desc + " w-2/3 max-md:w-full"}>
                        <p className="font-bold text-2xl mb-2 max-md:text-center max-md:text-xl">
                            مهدی ربانی
                        </p>
                        <p className="font-bold text-lg mb-3 max-md:text-center max-md:text-sm">
                            بنیان گذار و مدیر عامل فروشگاه ربانی و باشگاه نواوری گیرپاژ
                        </p>
                        <div>
                            <p className="max-md:text-xs max-md:text-center max-md:leading-[20px]">

                                او‌ دارای مدرک مهندسی نرم افزار از دانشگاه آزاد اسلامی قزوین است
                                و همچنین مدرک بازرگانی بین الملل خویش را از دانشگاه تهران اخذ کرده است
                                و در حال حاضر در حوزه واردات قطعات یدکی خودرو و مدیریت بازرگانی و همچنین برگذاری دوره های آموزش کسب و کار های مرتبط با لوازم یدکی خودرو در سطوح ابتدایی برای نو آموزان و سطوح حرفه ای برای کسبه محترم لوازم یدکی خودرو فعالیت میکند                         </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 text-center text-justify leading-8 max-md:text-xs">
                    <p>
                        فروشگاه ربانی از سال ۱۳۵۹ با فروش لوازم یدکی مرسدس بنز‌های سنگین و نیمه‌سنگین آغاز به کار کرد و در سال ۱۳۸۶ به واردات خودروهای نیمه‌سنگین هیوندای پرداخت. سپس در سال ۱۳۸۸ با افزودن برندهای هیوندای، کیا موتورز و تویوتا به مجموعه خود و افتتاح تعمیرگاه تخصصی در سال ۱۳۸۹، دامنه فعالیت‌هایش را گسترش داد. در سال ۱۳۹۴ با ورود به دیجیتال مارکتینگ و راه‌اندازی فروشگاه‌های آنلاین، خدمات نوینی ارائه کرد.

                        در سال ۱۴۰۲، با طراحی جدید وب‌سایت “ربانی پارت” و اخذ اینماد، فروش آنلاین را آغاز و اپلیکیشنی جامع برای تامین قطعات یدکی خودرو ایجاد کرد. این اقدام به‌منظور رفع چالش‌های بازار، مانند نایاب بودن قطعات، قیمت بالای قطعات یدکی، نبود گارانتی و نگرانی از اصالت کالا، و همچنین تأمین بودجه خرید لوازم یدکی انجام شد.

                    </p>
                </div>




                {/* <div className={styles.aboutContact + " mt-20"}>
                <p className="font-bold text-lg mb-5 max-md:text-center">
                    راه‌‌های ارتباطی با ربانی پارت
                </p>
                <p className="w-full ml-auto max-md:hidden">
                    برای ارتباط با کارشناسان ربانی پارت می‌توانید از راه‌های ارتباطی زیر استفاده کنید. همچنین در صورت نیاز نیز می‌توانید با ارسال نظرات خود، مارا در ارائه هر چه بهتر خدمات ربانی پارت یاری کنید.
                </p>
                <div className="mt-20 flex items-center justify-between max-md:flex-col">
                    <div className={styles.social + " flex gap-2"}>
                        <a href="https://www.instagram.com/rabanipart/" target="_blank" className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                            <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                        </a>
                        <a href="https://Wa.me//0989128871800" className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                            <svg className="w-[18px] mt-[-1px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                        </a>
                        <a href="https://t.me/rabanipartadmin" className="w-7 h-7 bg-transparent rounded-full flex items-center justify-center">
                            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="#000000" d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/></svg>
                        </a>
                        <a className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                            <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>
                        </a>
                    </div>
                    <div className={styles.email + " w-6/12 max-md:w-full max-md:mt-10"}>
                        <div className={styles.emailInput + " max-md:mt-2 text-right flex flex-col"}>
                            <p className="mb-2 text-xs max-md:text-center">
                                برای اطلاع از آخرین قطعه‌ها، ایمیل خود را ثبت نمایید.
                            </p>
                            <form>
                                <div className={styles.formgroup + " relative"}>
                                    <input 
                                        name="email"
                                        className="w-full bg-[#c3c3c3] text-right text-black p-2" 
                                        type="email" 
                                        placeholder="ثبت ایمیل " 
                                        value={formData.email}
                                        onChange={handleChange}
                                    />                                
                                    <div className="cursor-pointer absolute left-0 top-0 border-r border-r-[#444444] px-1 py-1" onClick={handleSubmit}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                                            <path d="M3.07627 8.27989C3.0676 8.49118 3.06761 8.72723 3.06763 8.97849V23.9118C3.06761 24.2505 3.06759 24.5616 3.08883 24.8216C3.11174 25.102 3.16417 25.4087 3.31853 25.7116C3.53923 26.1448 3.89139 26.4969 4.32454 26.7176C4.62748 26.872 4.9342 26.9244 5.21456 26.9473C5.4746 26.9686 5.78566 26.9686 6.12436 26.9686H26.3192C26.6579 26.9686 26.969 26.9686 27.229 26.9473C27.5094 26.9244 27.8161 26.872 28.1191 26.7176C28.5522 26.4969 28.9044 26.1448 29.1251 25.7116C29.2794 25.4087 29.3319 25.102 29.3548 24.8216C29.376 24.5616 29.376 24.2505 29.376 23.9118V8.9786C29.376 8.7273 29.376 8.49121 29.3673 8.27989L17.6795 17.8427C16.8315 18.5365 15.6121 18.5365 14.7641 17.8427L3.07627 8.27989Z" fill="#444444"/>
                                            <path d="M28.5145 6.42828C28.3924 6.33035 28.26 6.24461 28.1191 6.17278C27.8161 6.01842 27.5094 5.96599 27.229 5.94308C26.969 5.92184 26.658 5.92186 26.3194 5.92188H6.12437C5.78572 5.92186 5.47457 5.92184 5.21456 5.94308C4.9342 5.96599 4.62748 6.01842 4.32454 6.17278C4.18357 6.24461 4.05119 6.33035 3.92912 6.42828L16.0136 16.3155C16.1347 16.4147 16.3089 16.4147 16.43 16.3155L28.5145 6.42828Z" fill="#444444"/>
                                        </svg>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}


                <div className="max-w-[900px] w-11/12 mx-auto">
                    <div className="overflow-hidden rounded-xl mt-20 min-h-[520px] max-md:min-h-[200px]">
                        <iframe className="object-cover w-full h-full min-h-[520px] max-md:min-h-[200px]" src="https://www.aparat.com/video/video/embed/videohash/qze31ar/vt/frame" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
                    </div>
                </div>



                {/* <div className={styles.rabaniCo + " mt-20 py-20"}>
                <p className="font-bold text-2xl text-center mb-10 max-md:text-lg">
                    همکاران ما در فروشگاه بزرگ ربانی پارت  
                </p>
                <div className={styles.partners + " grid grid-cols-3 gap-5 mx-auto overflow-hidden"} style={{width: "max-content"}}>
                    <div className={styles.item}>
                        <div className={styles.image + " max-w-[202px] overflow-hidden max-md:max-w-[100px]"}>
                            <img className="object-cover w-full rounded-lg" src="../../images/about1image.jfif" alt="image" />
                        </div>
                        <div className={styles.desc}>
                            <p className="text-sm mt-3 text-center">
                                اسم و پوزیشن 
                            </p>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.image + " max-w-[202px] overflow-hidden  max-md:max-w-[100px]"}>
                            <img className="object-cover w-full rounded-lg" src="../../images/about1image.jfif" alt="image" />
                        </div>
                        <div className={styles.desc}>
                            <p className="text-sm mt-3 text-center">
                                اسم و پوزیشن 
                            </p>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.image + " max-w-[202px] overflow-hidden  max-md:max-w-[100px]"}>
                            <img className="object-cover w-full rounded-lg" src="../../images/about1image.jfif" alt="image" />
                        </div>
                        <div className={styles.desc}>
                            <p className="text-sm mt-3 text-center">
                                اسم و پوزیشن 
                            </p>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.image + " max-w-[202px] overflow-hidden  max-md:max-w-[100px]"}>
                            <img className="object-cover w-full rounded-lg" src="../../images/about1image.jfif" alt="image" />
                        </div>
                        <div className={styles.desc}>
                            <p className="text-sm mt-3 text-center">
                                اسم و پوزیشن 
                            </p>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.image + " max-w-[202px] overflow-hidden  max-md:max-w-[100px]"}>
                            <img className="object-cover w-full rounded-lg" src="../../images/about1image.jfif" alt="image" />
                        </div>
                        <div className={styles.desc}>
                            <p className="text-sm mt-3 text-center">
                                اسم و پوزیشن 
                            </p>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.image + " max-w-[202px] overflow-hidden  max-md:max-w-[100px]"}>
                            <img className="object-cover w-full rounded-lg" src="../../images/about1image.jfif" alt="image" />
                        </div>
                        <div className={styles.desc}>
                            <p className="text-sm mt-3 text-center">
                                اسم و پوزیشن 
                            </p>
                        </div>
                    </div>
                </div>
            </div>



            <div className={styles.girpazhCo + " mt-20"}>
                <p className="font-bold text-2xl text-center mb-10 max-md:text-lg">
                    همکاران ما در باشگاه نوآوری گیرپاژ                   
                </p>
                <div className="grid grid-cols-2 gap-5 mx-auto overflow-hidden" style={{width: "max-content"}}>
                    <div className={styles.item}>
                        <div className={styles.image + " max-w-[202px] overflow-hidden  max-md:max-w-[100px]"}>
                            <img className="object-cover w-full rounded-lg" src="../../images/about1image.jfif" alt="image" />
                        </div>
                        <div className={styles.desc}>
                            <p className="text-sm mt-3 text-center">
                                اسم و پوزیشن 
                            </p>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.image + " max-w-[202px] overflow-hidden  max-md:max-w-[100px]"}>
                            <img className="object-cover w-full rounded-lg" src="../../images/about1image.jfif" alt="image" />
                        </div>
                        <div className={styles.desc}>
                            <p className="text-sm mt-3 text-center">
                                اسم و پوزیشن 
                            </p>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.image + " max-w-[202px] overflow-hidden  max-md:max-w-[100px]"}>
                            <img className="object-cover w-full rounded-lg" src="../../images/about1image.jfif" alt="image" />
                        </div>
                        <div className={styles.desc}>
                            <p className="text-sm mt-3 text-center">
                                اسم و پوزیشن 
                            </p>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.image + " max-w-[202px] overflow-hidden  max-md:max-w-[100px]"}>
                            <img className="object-cover w-full rounded-lg" src="../../images/about1image.jfif" alt="image" />
                        </div>
                        <div className={styles.desc}>
                            <p className="text-sm mt-3 text-center">
                                اسم و پوزیشن 
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}
            </div>

        </>

    )
}

export default About;