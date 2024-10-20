import { useState } from "react";
import styles from"./styles.module.scss";
import Link from "next/link";
import { getCookie } from "@/api/auth";
import axios from "axios";
import { prefix, url } from "@/api/domain";

const SellerAuth = () => {

    const token = getCookie('token')
    const [level , setLevel] = useState(1);
    const [type , setType] = useState(null);
    const [name , setName] = useState(null);
    const [nationalCode , setNationalCode] = useState(null);
    const [post , setPost] = useState(null);
    const [address , setAddress] = useState(null);
    const [phone , setPhone] = useState(null);
    const [email , setEmail] = useState(null);
    const [gender , setGender] = useState(null);
    const [error , setErrors] = useState(null);
    const [checkStatus , setCheckStatus] = useState(null);
    const [companyName , setCompanyName] = useState(null);
    const [registrationNumber , setRegistrationNumber] = useState(null);
    const [nationalId , setNationalId] = useState(null);
    const [economicCode , setEconomicCode] = useState(null);
    const [companyType , setCompanyType] = useState(null);
    const [signatureOwners , setSignatureOwners] = useState(null);
    const [ResidenceAddress , setResidenceAddress] = useState(null);
    const [frontNationalId , setFrontNationalId] = useState(null);
    const [backNationalId , setBackNationalId] = useState(null);
    const [sana , setSana] = useState(null);
    const [health , setHealth] = useState(null);
    const [signiture , setSigniture] = useState(null);
    const [newsPaper , setNewsPaper] = useState(null);



    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
    };

    const handleRegistrationNumberChange = (event) => {
        setRegistrationNumber(event.target.value);
    };

    const handleNationalIdChange = (event) => {
        setNationalId(event.target.value);
    };

    const handleEconomicCodeChange = (event) => {
        setEconomicCode(event.target.value);
    };

    const handleCompanyTypeChange = (event) => {
        setCompanyType(event.target.value);
    };

    const handleSignatureOwnersChange = (event) => {
        setSignatureOwners(event.target.value);
    };

    const handleResidenceAddressChange = (event) => {
        setResidenceAddress(event.target.value);
    };


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    const handleNationalCodeChange = (event) => {
        setNationalCode(event.target.value);
    };

    const handlePostChange = (event) => {
        setPost(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };


    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };



    const handleGeneralInfoSubmit = (e) => {
        e.preventDefault();


        axios.post(url + "/" + prefix + '/seller/register/general-info', {person_type: type , name: name, national_code: nationalCode , post: post , residenceAddress: address , landlinePhone: phone , email: email , gender: gender },{
            headers:{
              'Authorization' : 'Bearer ' + token,
            }
          })
            .then((response) => {
                setErrors(response.data?.data?.errors)
                if(response.status === 200){
                    setCheckStatus(200)
                }
            })
            .catch((error) => {
                setErrors(error.response.data?.errors)
            })
            .finally(() => {
                if(error === undefined){
                    setErrors(null)
                    if(type === "Juridical"){
                        setLevel(2)
                        setCheckStatus(null)
                    } else if(type === "Natural"){
                        setLevel(3)
                        setCheckStatus(null)
                    }
                }
            });
    }

    
    
    const handleBusinessInfoSubmit = (e) => {
        e.preventDefault();


        axios.post(url + "/" + prefix + '/seller/register/business-info', {companyName: companyName , registrationNumber: registrationNumber, nationalID: nationalId , economicCode: economicCode , type: companyType , signatureOwners: signatureOwners , residenceAddress: ResidenceAddress },{
            headers:{
              'Authorization' : 'Bearer ' + token,
            }
          })
            .then((response) => {
                setErrors(response.data?.data?.errors)
                if(response.status === 200){
                    setCheckStatus(200)
                }
            })
            .catch((error) => {
                setErrors(error.response.data?.errors)
            })
            .finally(() => {
                if(error === undefined){
                    setLevel(3)
                }
            });  
    }




    const handlefrontUpload = (event) => {
        // axios.post(url + "/" + prefix + '/seller/register/store-documents', {},{
        //     headers:{
        //       'Authorization' : 'Bearer ' + token,
        //     }
        //   })
        //     .then((response) => {
        //         setErrors(response.data?.data?.errors)
        //         if(response.status === 200){
        //             setCheckStatus(200)
        //         }
        //     })
        //     .catch((error) => {
        //         setErrors(error.response.data?.errors)
        //     })
        //     .finally(() => {
        //         if(error === undefined){
        //             setLevel(3)
        //         }
        //     });   
    }














    if(level === 1){
        return(
            <div className="mb-20 pb-10 mt-10">
                <div className="bg-[#29BE88] w-full flex items-center gap-2 justify-center py-6">
                    <div>
                        <p className="text-white text-sm">
                            ثبت نام فروشنده
                        </p>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 8.98528 9.51472 11 12 11C14.4853 11 16.5 8.98528 16.5 6.5C16.5 4.01472 14.4853 2 12 2Z" fill="white" />
                            <path d="M12.0009 12C7.75821 12 4.71576 15.0603 3.92046 19.022C3.70021 20.1192 4.59281 21 5.59252 21H15.25V17.5619C14.1869 16.7399 13.5 15.4512 13.5 14C13.5 13.3637 13.6321 12.7582 13.8703 12.2095C13.2781 12.0725 12.6537 12 12.0009 12Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18 11C16.3431 11 15 12.3431 15 14C15 15.2107 15.7172 16.254 16.75 16.728V20.2597C16.75 20.4116 16.819 20.5552 16.9377 20.6501L17.6877 21.2501C17.8703 21.3962 18.1297 21.3962 18.3123 21.2501L19.0623 20.6501C19.181 20.5552 19.25 20.4116 19.25 20.2597V19.6492C19.25 19.5078 19.1901 19.3729 19.085 19.2781L18.5 18.75L19.1036 18.1464C19.1973 18.0527 19.25 17.9255 19.25 17.7929V16.728C20.2828 16.254 21 15.2107 21 14C21 12.3431 19.6569 11 18 11ZM17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14C19 14.5523 18.5523 15 18 15C17.4477 15 17 14.5523 17 14Z" fill="white" />
                        </svg>
                    </div>
                </div>
                <div className="container w-11/12 max-w-7xl mx-auto mt-10">
                    <div className="flex items-center gap-8 justify-center">
                        <div className="flex items-center gap-2">
                            <p>
                                فروشنده      
                            </p>
                            {type === 'Natural' ? 
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <circle cx="7" cy="7" r="6.37109" fill="#29BE88" stroke="black" stroke-width="1.25781" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" onClick={() => setType('Natural')}>
                                    <circle cx="7" cy="7" r="6.37109" stroke="black" stroke-width="1.25781" />
                                </svg>
                            }

                        </div>
                        <div className="flex items-center gap-2">
                            <p>
                                شرکت/ فروشگاه       
                            </p>
                            {type === 'Juridical' ? 
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <circle cx="7" cy="7" r="6.37109" fill="#29BE88" stroke="black" stroke-width="1.25781" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" onClick={() => setType('Juridical')}>
                                    <circle cx="7" cy="7" r="6.37109" stroke="black" stroke-width="1.25781" />
                                </svg>
                            }
                        </div>
                        
                    </div>
                    {error?.person_type ? <p className="text-xs text-[#E14957] text-center mt-2">{error?.person_type}</p> : ""}

                    <form className="mt-10 flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs">
                                نام و نام خانوادگی 
                            </label>
                            <input onChange={handleNameChange} value={name} className="bg-[#ECECEC] p-1" type="text" />
                            {error?.name ? <p className="text-xs text-[#E14957]">{error?.name}</p> : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs">
                                جنسیت
                            </label>
                            <select onChange={handleGenderChange} value={gender} name="gender" id="gender" className="bg-[#ECECEC] p-1 text-right text-xs">
                                <option value="null">انتخاب</option>
                                <option value="0">مذکر</option>
                                <option value="1">مونث</option>
                            </select>
                            {error?.gender ? <p className="text-xs text-[#E14957]">{error?.gender}</p> : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs">
                                کد ملی
                            </label>
                            <input onChange={handleNationalCodeChange} value={nationalCode} className="bg-[#ECECEC] p-1" type="text" />
                            {error?.national_code ? <p className="text-xs text-[#E14957]">{error?.national_code}</p> : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs">
                                شماره تلفن ثابت 
                            </label>
                            <input onChange={handlePhoneChange} value={phone} className="bg-[#ECECEC] p-1" type="text" />
                            {error?.landlinePhone ? <p className="text-xs text-[#E14957]">{error?.landlinePhone}</p> : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs">
                                ایمیل 
                            </label>
                            <input onChange={handleEmailChange} value={email} className="bg-[#ECECEC] p-1" type="text" />
                            {error?.email ? <p className="text-xs text-[#E14957]">{error?.email}</p> : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs">
                                کد پستی  
                            </label>
                            <input onChange={handlePostChange} value={post} className="bg-[#ECECEC] p-1" type="text" />
                            {error?.post ? <p className="text-xs text-[#E14957]">{error?.post}</p> : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs">
                                آدرس دقیق فروشگاه /شرکت  
                            </label>
                            <textarea onChange={handleAddressChange} value={address} className="bg-[#ECECEC] p-1" rows={5} type="text" />
                            {error?.residenceAddress ? <p className="text-xs text-[#E14957]">{error?.residenceAddress}</p> : ""}
                        </div>
                    </form>
                    <div>
                        <button className="w-full border border-[#29BE88] mt-10 py-2 text-sm font-bold" onClick={handleGeneralInfoSubmit}>
                            مرحله بعد 
                        </button>
                    </div>
                </div>
            </div>
        )
    }


    else if(level === 2){
        return(
            <div className="mb-20 pb-10 mt-10">
                <div className="bg-[#29BE88] w-full flex items-center gap-2 justify-center py-6">
                    <div>
                        <p className="text-white text-sm">
                            ثبت نام فروشنده
                        </p>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 8.98528 9.51472 11 12 11C14.4853 11 16.5 8.98528 16.5 6.5C16.5 4.01472 14.4853 2 12 2Z" fill="white" />
                            <path d="M12.0009 12C7.75821 12 4.71576 15.0603 3.92046 19.022C3.70021 20.1192 4.59281 21 5.59252 21H15.25V17.5619C14.1869 16.7399 13.5 15.4512 13.5 14C13.5 13.3637 13.6321 12.7582 13.8703 12.2095C13.2781 12.0725 12.6537 12 12.0009 12Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18 11C16.3431 11 15 12.3431 15 14C15 15.2107 15.7172 16.254 16.75 16.728V20.2597C16.75 20.4116 16.819 20.5552 16.9377 20.6501L17.6877 21.2501C17.8703 21.3962 18.1297 21.3962 18.3123 21.2501L19.0623 20.6501C19.181 20.5552 19.25 20.4116 19.25 20.2597V19.6492C19.25 19.5078 19.1901 19.3729 19.085 19.2781L18.5 18.75L19.1036 18.1464C19.1973 18.0527 19.25 17.9255 19.25 17.7929V16.728C20.2828 16.254 21 15.2107 21 14C21 12.3431 19.6569 11 18 11ZM17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14C19 14.5523 18.5523 15 18 15C17.4477 15 17 14.5523 17 14Z" fill="white" />
                        </svg>
                    </div>
                </div>
                <div className="container w-11/12 max-w-7xl mx-auto mt-10">

                    <form className="mt-10 flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs">
                                نام شرکت
                            </label>
                            <input onChange={handleCompanyNameChange} value={companyName} className="bg-[#ECECEC] p-1" type="text" />
                            {error?.companyName ? <p className="text-xs text-[#E14957]">{error?.companyName}</p> : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs">
                                کد ثبتی شرکت
                            </label>
                            <input onChange={handleRegistrationNumberChange} value={registrationNumber} className="bg-[#ECECEC] p-1" type="text" />
                            {error?.registrationNumber ? <p className="text-xs text-[#E14957]">{error?.registrationNumber}</p> : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs">
                                کد ملی شرکت 
                            </label>
                            <input onChange={handleNationalIdChange} value={nationalId} className="bg-[#ECECEC] p-1" type="text" />
                            {error?.nationalID ? <p className="text-xs text-[#E14957]">{error?.nationalID}</p> : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs">
                                کد اقتصادی شرکت 
                            </label>
                            <input onChange={handleEconomicCodeChange} value={economicCode} className="bg-[#ECECEC] p-1" type="text" />
                            {error?.economicCode ? <p className="text-xs text-[#E14957]">{error?.economicCode}</p> : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs">
                                نوع شرکت 
                            </label>
                            <select onChange={handleCompanyTypeChange} value={companyType} name="type" id="type" className="bg-[#ECECEC] p-1 text-right text-xs">
                                <option value="null">انتخاب</option>
                                <option value="0">سهامی عام</option>
                                <option value="1">سهامی خاص</option>
                                <option value="2">مسئولیت محدود</option>
                                <option value="3">تعاونی</option>
                                <option value="4">تضامنی</option>
                            </select>
                            {error?.type ? <p className="text-xs text-[#E14957]">{error?.type}</p> : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs">
                                صاحبان امضاء
                            </label>
                            <input onChange={handleSignatureOwnersChange} value={signatureOwners} className="bg-[#ECECEC] p-1" type="text" />
                            {error?.signatureOwners ? <p className="text-xs text-[#E14957]">{error?.signatureOwners}</p> : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs">
                                آدرس دقیق شرکت  
                            </label>
                            <textarea onChange={handleResidenceAddressChange} value={ResidenceAddress} className="bg-[#ECECEC] p-1" rows={5} type="text" />
                            {error?.residenceAddress ? <p className="text-xs text-[#E14957]">{error?.residenceAddress}</p> : ""}
                        </div>
                    </form>
                    <div>
                        <button className="w-full border border-[#29BE88] mt-10 py-2 text-sm font-bold" onClick={handleBusinessInfoSubmit}>
                            مرحله بعد 
                        </button>
                    </div>
                </div>
            </div>
        )
    }


    else if(level === 3){
        return(
            <div className=" mb-10 mt-10">
                <div className="bg-[#29BE88] w-full flex items-center gap-2 justify-center py-6">
                    <div>
                        <p className="text-white text-sm">
                            ثبت نام فروشنده
                        </p>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 8.98528 9.51472 11 12 11C14.4853 11 16.5 8.98528 16.5 6.5C16.5 4.01472 14.4853 2 12 2Z" fill="white" />
                            <path d="M12.0009 12C7.75821 12 4.71576 15.0603 3.92046 19.022C3.70021 20.1192 4.59281 21 5.59252 21H15.25V17.5619C14.1869 16.7399 13.5 15.4512 13.5 14C13.5 13.3637 13.6321 12.7582 13.8703 12.2095C13.2781 12.0725 12.6537 12 12.0009 12Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18 11C16.3431 11 15 12.3431 15 14C15 15.2107 15.7172 16.254 16.75 16.728V20.2597C16.75 20.4116 16.819 20.5552 16.9377 20.6501L17.6877 21.2501C17.8703 21.3962 18.1297 21.3962 18.3123 21.2501L19.0623 20.6501C19.181 20.5552 19.25 20.4116 19.25 20.2597V19.6492C19.25 19.5078 19.1901 19.3729 19.085 19.2781L18.5 18.75L19.1036 18.1464C19.1973 18.0527 19.25 17.9255 19.25 17.7929V16.728C20.2828 16.254 21 15.2107 21 14C21 12.3431 19.6569 11 18 11ZM17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14C19 14.5523 18.5523 15 18 15C17.4477 15 17 14.5523 17 14Z" fill="white" />
                        </svg>
                    </div>
                </div>
                <div className="container w-11/12 max-w-7xl mx-auto mt-10">

                    <form className="mt-10 flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <p className="text-xs">
                                تصویر روی کارت ملی 
                            </p>
                            <label
                                htmlFor={`fileInput-front`}
                                className="cursor-pointer flex items-center"
                            >
                                <button className="bg-[#EAEAEA] px-6 py-1 text-xs font-bold rounded-lg">
                                    آپلود
                                </button>
                            </label>
                            <input
                                onChange={handlefrontUpload}
                                type="file"
                                id={`fileInput-front`}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xs">
                                تصویر پشت کارت ملی
                            </p>
                            <label
                                htmlFor={`fileInput-behind`}
                                className="cursor-pointer flex items-center"
                            >
                                <button className="bg-[#EAEAEA] px-6 py-1 text-xs font-bold rounded-lg">
                                    آپلود
                                </button>
                            </label>
                            <input
                                type="file"
                                id={`fileInput-behind`}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xs">
                                تصویر گواهی ثبت نام در سامانه ثنا 
                            </p>
                            <label
                                htmlFor={`fileInput-govahi`}
                                className="cursor-pointer flex items-center"
                            >
                                <button className="bg-[#EAEAEA] px-6 py-1 text-xs font-bold rounded-lg">
                                    آپلود
                                </button>
                            </label>
                            <input
                                type="file"
                                id={`fileInput-govahi`}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xs">
                                گواهی امضا دیجیتالی
                            </p>
                            <label
                                htmlFor={`fileInput-signi`}
                                className="cursor-pointer flex items-center"
                            >
                                <button className="bg-[#EAEAEA] px-6 py-1 text-xs font-bold rounded-lg">
                                    آپلود
                                </button>
                            </label>
                            <input
                                type="file"
                                id={`fileInput-signi`}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xs">
                                گواهی سلامت مالی (آیس)
                            </p>
                            <label
                                htmlFor={`fileInput-health`}
                                className="cursor-pointer flex items-center"
                            >
                                <button className="bg-[#EAEAEA] px-6 py-1 text-xs font-bold rounded-lg">
                                    آپلود
                                </button>
                            </label>
                            <input
                                type="file"
                                id={`fileInputhealth-`}
                                style={{ display: 'none' }}
                            />
                        </div>

                            <div className="flex flex-col gap-2">
                                <p className="text-xs">
                                    تصویر آخرین روزنامه رسمی
                                </p>
                                <label
                                    htmlFor={`fileInput-news`}
                                    className="cursor-pointer flex items-center"
                                >
                                    <button className="bg-[#EAEAEA] px-6 py-1 text-xs font-bold rounded-lg">
                                        آپلود
                                    </button>
                                </label>
                                <input
                                    type="file"
                                    id={`fileInput-news`}
                                    style={{ display: 'none' }}
                                />
                            </div>
                    </form>
                    <div>
                        <button className="w-full border border-[#29BE88] mt-10 py-2 text-sm font-bold" onClick={() => setLevel(4)}>
                            مرحله بعد 
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    else if(level === 4){
        return(
            <div className="h-[90vh] flex flex-col justify-center items-center container w-11/12 max-w-7xl mx-auto">
                <div className="flex flex-col gap-5 items-center justify-center">
                    <p className="font-bold">
                        ثبت نام شما کامل شد .
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="243" height="74" viewBox="0 0 243 74" fill="none">
                        <path d="M13.8539 73C-4.81279 46.5 -17.3461 -3.89999 81.8539 6.50001C205.854 19.5 218.854 39.5 242.354 1" stroke="#29BE88" />
                    </svg>
                </div>
                <div className="w-full mt-[70px]">
                    <Link href={"/"}>
                        <button className="w-full border border-[#29BE88] bg-[#29BE88] mt-10 py-2 text-sm font-bold text-white" onClick={() => setLevel(4)}>
                            ورود به فروشگاه گیرپاژ
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default SellerAuth;