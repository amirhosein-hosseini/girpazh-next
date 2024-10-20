import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import { prefix, url } from "../../api/domain";
import { getCookie } from "../../api/auth";
import { toast } from "react-toastify";
import { DeRedPrimaryButton, RedPrimaryButton } from "../button";
import { getAllUserAddresses, getGateWay, getUserCart } from "../../api/user";
import { getAllCarriers } from "../../api/user";

const Payment = () => {


    const token = getCookie('token');
    const [showAddAddress , setShowAddAddress] = useState(false);
    const [reload , setReload] = useState(0);
    const [activeAddress , setActiveAddress] = useState(null);
    const [userAddresses , setUserAddresses] = useState(null);
    const [carriers , setCarriers] = useState(null);
    const [activeCarrier , setActiveCarrier] = useState(null);
    const [cartItems , setCartItems] = useState(null);
    const [formData, setFormData] = useState({
        address: "",
        post: "",
        state: "",
        city: "",
        number: "",
    });
    const [errors , setErrors] = useState(null);
    const [loading , setLoading] = useState(null);
    const [activeReload , setActiveReload] = useState(false);
    const [level , setLevel] = useState("desc")


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = (e) => {

        e.preventDefault();

        setLoading(true)


        axios.post(url + "/" + prefix + '/user/address/create', formData , {
                headers:{
                'Authorization' : 'Bearer ' + token,
                }
            })
            .then((response) => {
                console.log(response.data);
                setErrors(response?.data?.data?.errors);
                setActiveReload(true);
                setShowAddAddress(false);
                setLoading(false)
                setLevel("desc")
            })
            .catch((error) => {
                toast.error(error.response.data)
                setLoading(false)
            })
            .finally(() => {
                console.log("final")
                setLoading(false)
            });
    };

    useEffect(() => {
        if(errors === undefined && activeReload === true){
            toast.success("آدرس با موفقیت ثبت شد");
            setReload(reload + 1);
            setLevel("desc");
            setActiveReload(false)
        }
    }, [activeReload])

    // get data for user addresses
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllUserAddresses();
            if (data?.data && Array.isArray(data.data)) {
              data.data.forEach((item) => {
                if(item?.status === 1){
                    setActiveAddress(item?.id)
                }
              });
              setUserAddresses(data.data);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, [reload]);


    // get data for user addresses
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllCarriers();
            setCarriers(data?.carriers);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [reload]);


    // function for get all carts data
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getUserCart();
            setCartItems(data?.data);
            if(data?.data?.items[0]?.carrier[0]?.id){
                setActiveCarrier(data?.data?.items[0]?.carrier[0]?.id)
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [reload]);

    const formatNumberWithThousandSeparator = (number) => {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }




    const handleSelectAddress = (id) => {


        axios.post(url + "/" + prefix + '/user/address/selectAddress', {"address_id" : id} , {
                headers:{
                'Authorization' : 'Bearer ' + token,
                }
            })
            .then((response) => {
                console.log(response.data);
                setActiveAddress(id);
                setReload(reload + 1);
            })
            .catch((error) => {
                toast.error(error.response.data)
            })
            .finally(() => {
                console.log("final")
            });
    };


    const handleSelectCarrier = (id) => {


        axios.post(url + "/" + prefix + '/cart/change-carrier', {"carrier" : id} , {
                headers:{
                'Authorization' : 'Bearer ' + token,
                }
            })
            .then((response) => {
                console.log(response.data);
                setActiveCarrier(id);
                setReload(reload + 1);
            })
            .catch((error) => {
                toast.error(error.response.data)
            })
            .finally(() => {
                console.log("final")
            });
    };


    const openNewTabWithData = (data) => {
        document.write(data);
    };


    const handleGateWay = () => {
        const fetchData = async () => {
            try {
              const data = await getGateWay();
              openNewTabWithData(data);
            console.log(data)
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
      
          fetchData();
    }


    const handeleRemove = (id) => {
        if (window.confirm("آیا میخواهید این آدرس را حذف کنید؟")) {
            axios.delete(url + "/" + prefix + '/user/address/deleteAddress', {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: { address_id: id }
            })
            .then((response) => {
                toast.success("آدرس با موفقیت حذف شد");
                setShowAddAddress(false);
                setReload(reload + 1);
            })
            .catch((error) => {
                toast.error(error.response.data)
            })
            .finally(() => {
                console.log("final")
            });
        }
    }


    if(level === "address"){
        return(
            <div className={styles.paymentAddress + " mt-20 py-20 max-md:py-0 max-md:my-10"}>
                <div className={styles.addAddress + " w-1/2 mt-5 mx-auto max-md:w-11/12"}>
                    <p className="text-center font-bold mb-5">
                        ثبت آدرس جدید
                    </p>
                    <form className={styles.form + " w-full  flex flex-col gap-2"}>
                        <div className={styles.formGroup + " w-full flex gap-2 flex-col"}>
                            <input
                                name="name"
                                className="w-full p-3 rounded-lg"
                                type="text"
                                placeholder="نام و نام خانوادگی "
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors?.name ? <p className="text-sm text-right" style={{color: "red"}}>{errors?.name}</p> : ""}
                        </div>
                        <div className={styles.formGroup + " w-full flex gap-2 flex-col"}>
                            <input
                                name="number"
                                className="w-full p-3 rounded-lg"
                                type="text"
                                placeholder="شماره تماس "
                                value={formData.number}
                                onChange={handleChange}
                            />
                            {errors?.number ? <p className="text-sm text-right" style={{color: "red"}}>{errors?.number}</p> : ""}
                        </div>
                        <div className={styles.formGroup + " w-full flex gap-2 flex-col"}>
                            <input
                                name="post"
                                className="w-full p-3 rounded-lg"
                                type="text"
                                placeholder="کد پستی "
                                value={formData.post}
                                onChange={handleChange}
                            />
                            {errors?.post ? <p className="text-sm text-right" style={{color: "red"}}>{errors?.post}</p> : ""}
                        </div>
                        <div className={styles.formGroup + " w-full flex gap-2"}>
                            <div className="flex-col w-full">
                                <input
                                    name="state"
                                    className="w-full p-3 rounded-lg"
                                    type="text"
                                    placeholder="استان "
                                    value={formData.state}
                                    onChange={handleChange}
                                />
                                {errors?.city ? <p className="text-sm text-right" style={{ color: "red" }}>{errors?.city}</p> : ""}
                            </div>
                            <div className="flex-col w-full">
                                <input
                                    name="city"
                                    className="w-full p-3 rounded-lg"
                                    type="text"
                                    placeholder="شهر"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                                {errors?.state ? <p className="text-sm text-right" style={{ color: "red" }}>{errors?.state}</p> : ""}
                            </div>
                        </div>
                        <div className={styles.formGroup + " w-full flex gap-2 flex-col"}>
                            <textarea
                                name="address"
                                className="w-full p-3 rounded-lg"
                                placeholder="آدرس کامل پستی "
                                style={{ resize: "none" }}
                                rows={10}
                                value={formData.address}
                                onChange={handleChange}
                            />
                            {errors?.address ? <p className="text-sm text-right" style={{color: "red"}}>{errors?.address}</p> : ""}
                        </div>
                        <div className={styles.button} onClick={handleSubmit}>
                            <RedPrimaryButton>
                                ثبت اطلاعات
                            </RedPrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        )

    }

    return(
        <>
            <div className={styles.title + " flex text-right justify-center items-center gap-2 py-4 bg-[#E14957] mt-10"}>
                <div className={styles.titleContainer + " flex text-right items-center gap-2"}>
                    <p className="text-white text-sm">
                        پرداخت
                    </p>
                </div>
            </div>
            <div className={styles.payment + " container mx-auto w-11/12 mt-10 text-right flex flex-col gap-10 max-md:mt-10 mb-10"}>
                <div className={styles.discount + " flex items-center gap-4 flex-row-reverse max-md:w-full"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="34" viewBox="0 0 33 34" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.502 2.8335H5.50195V31.9165L10.0114 28.3195L13.2936 31.5803L16.502 28.3928L19.7103 31.5803L22.9925 28.3195L27.502 31.9165V2.8335ZM12.3744 21.3363L22.0828 11.3337L20.6244 9.83105L10.916 19.8337L12.3744 21.3363ZM12.377 12.7502C11.6176 12.7502 11.002 12.1159 11.002 11.3335C11.002 10.5511 11.6176 9.91683 12.377 9.91683C13.1363 9.91683 13.752 10.5511 13.752 11.3335C13.752 12.1159 13.1363 12.7502 12.377 12.7502ZM19.252 19.8335C19.252 20.6159 19.8676 21.2502 20.627 21.2502C21.3863 21.2502 22.002 20.6159 22.002 19.8335C22.002 19.0511 21.3863 18.4168 20.627 18.4168C19.8676 18.4168 19.252 19.0511 19.252 19.8335Z" fill="black" />
                    </svg>
                    <div className={styles.formGroup + " flex gap-1 items-center flex-row-reverse max-md:w-full"}>
                        <input
                            type="text"
                            placeholder="کد تخفیف را وارد کنید ..."
                            className="border border-[#D3D3D3] rounded-[4px] bg-transparent p-2 text-xs max-md:w-full"
                        />
                        <div className={styles.button}>
                            <button className="bg-[#8F8F8F] rounded-[4px] text-xs p-2 text-white max-md:w-full" style={{ textWrap: "nowrap" }}>
                                بررسی کد تخفیف
                            </button>
                        </div>
                    </div>
                </div>



                <div className={styles.gateWay}>
                    <div className={styles.title + " flex items-center gap-4 flex-row-reverse"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                            <path d="M3.14062 9.71764C3.14062 7.53204 4.91241 5.76025 7.09801 5.76025H27.9613C30.142 5.76025 31.9137 7.52509 31.9154 9.70844C31.9162 10.8115 31.9161 11.9147 31.9161 13.0174L31.916 17.2685L27.9642 17.2685C26.176 17.2685 24.7264 18.7181 24.7264 20.5064V21.5856H23.6471C21.8589 21.5856 20.4092 23.0353 20.4092 24.8235L20.4094 28.7753L7.09801 28.7753C4.91241 28.7753 3.14062 27.0035 3.14062 24.8179V15.1099H31.916V12.9513H3.14062V9.71764Z" fill="black" />
                            <path d="M29.0435 20.5063C29.0435 19.9102 28.5603 19.427 27.9642 19.427C27.3682 19.427 26.8849 19.9102 26.8849 20.5063V23.7442H23.6471C23.051 23.7442 22.5678 24.2274 22.5678 24.8234C22.5678 25.4195 23.051 25.9027 23.6471 25.9027H26.8849V29.1406C26.8849 29.7367 27.3682 30.2199 27.9642 30.2199C28.5603 30.2199 29.0435 29.7367 29.0435 29.1406V25.9027H32.2814C32.8775 25.9027 33.3607 25.4195 33.3607 24.8234C33.3607 24.2274 32.8775 23.7442 32.2814 23.7442H29.0435V20.5063Z" fill="black" />
                        </svg>
                        <p className="font-bold text-xl">
                            انتخاب روش پرداخت
                        </p>
                    </div>
                    <div className={styles.items + " flex flex-col gap-5 mt-5"}>
                        <div className={styles.item + " flex -items-center gap-4 flex-row-reverse"}>
                            <div className={styles.label}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7979 2.65252C13.4736 2.5385 14.1673 2.47925 14.8741 2.47925C15.581 2.47925 16.2747 2.53851 16.9504 2.65252C17.4567 2.73794 17.7978 3.21762 17.7124 3.72391C17.627 4.2302 17.1473 4.57137 16.641 4.48595C16.0671 4.38911 15.4769 4.33859 14.8741 4.33859C14.2714 4.33859 13.6812 4.38911 13.1073 4.48595C12.601 4.57137 12.1213 4.2302 12.0359 3.72391C11.9504 3.21762 12.2916 2.73794 12.7979 2.65252ZM8.99642 4.98427C9.29389 5.40276 9.19578 5.98316 8.77729 6.28063C7.81156 6.96708 6.96635 7.81229 6.2799 8.77802C5.98243 9.19651 5.40203 9.29462 4.98354 8.99716C4.56504 8.69969 4.46693 8.11928 4.7644 7.70079C5.57139 6.56548 6.56475 5.57212 7.70006 4.76513C8.11855 4.46767 8.69896 4.56578 8.99642 4.98427ZM20.7519 4.98427C21.0493 4.56578 21.6297 4.46767 22.0482 4.76513C23.1835 5.57212 24.1769 6.56548 24.9839 7.70079C25.2813 8.11929 25.1832 8.69969 24.7647 8.99716C24.3463 9.29462 23.7659 9.19651 23.4684 8.77802C22.7819 7.81229 21.9367 6.96708 20.971 6.28063C20.5525 5.98317 20.4544 5.40276 20.7519 4.98427ZM3.72318 12.0366C4.22947 12.122 4.57064 12.6017 4.48521 13.108C4.38838 13.6819 4.33786 14.2721 4.33786 14.8749C4.33786 15.4776 4.38838 16.0679 4.48521 16.6418C4.57064 17.148 4.22947 17.6277 3.72318 17.7132C3.21689 17.7986 2.73721 17.4574 2.65179 16.9511C2.53777 16.2754 2.47852 15.5817 2.47852 14.8749C2.47852 14.168 2.53777 13.4743 2.65179 12.7986C2.73721 12.2923 3.21689 11.9512 3.72318 12.0366ZM26.0251 12.0366C26.5314 11.9512 27.0111 12.2923 27.0965 12.7986C27.2105 13.4743 27.2698 14.168 27.2698 14.8749C27.2698 15.5817 27.2105 16.2754 27.0965 16.9511C27.0111 17.4574 26.5314 17.7986 26.0251 17.7132C25.5188 17.6277 25.1776 17.148 25.2631 16.6418C25.3599 16.0679 25.4104 15.4776 25.4104 14.8749C25.4104 14.2721 25.3599 13.6819 25.2631 13.108C25.1776 12.6017 25.5188 12.122 26.0251 12.0366ZM4.98354 20.7526C5.40203 20.4551 5.98243 20.5532 6.2799 20.9717C6.96635 21.9375 7.81156 22.7827 8.77729 23.4691C9.19578 23.7666 9.29389 24.347 8.99642 24.7655C8.69895 25.184 8.11855 25.2821 7.70006 24.9846C6.56475 24.1776 5.57139 23.1843 4.7644 22.049C4.46693 21.6305 4.56504 21.0501 4.98354 20.7526ZM24.7647 20.7526C25.1832 21.0501 25.2813 21.6305 24.9839 22.049C24.1769 23.1843 23.1835 24.1776 22.0482 24.9846C21.6297 25.2821 21.0493 25.184 20.7519 24.7655C20.4544 24.347 20.5525 23.7666 20.971 23.4691C21.9367 22.7827 22.7819 21.9375 23.4684 20.9717C23.7659 20.5532 24.3463 20.4551 24.7647 20.7526ZM12.0359 26.0258C12.1213 25.5195 12.601 25.1784 13.1073 25.2638C13.6812 25.3606 14.2714 25.4112 14.8741 25.4112C15.4769 25.4112 16.0671 25.3606 16.641 25.2638C17.1473 25.1784 17.627 25.5196 17.7124 26.0258C17.7978 26.5321 17.4567 27.0118 16.9504 27.0972C16.2747 27.2112 15.581 27.2705 14.8741 27.2705C14.1673 27.2705 13.4736 27.2112 12.7979 27.0972C12.2916 27.0118 11.9504 26.5321 12.0359 26.0258Z" fill="black" />
                                    <path d="M22.9313 14.8749C22.9313 19.3247 19.324 22.932 14.8741 22.932C10.4243 22.932 6.81698 19.3247 6.81698 14.8749C6.81698 10.425 10.4243 6.81772 14.8741 6.81772C19.324 6.81772 22.9313 10.425 22.9313 14.8749Z" fill="black" />
                                </svg>
                            </div>
                            <p>
                                پرداخت اینترنتی
                            </p>
                        </div>
                    </div>
                </div>


                <div className={styles.careers}>
                    <div className={styles.title + " flex items-center gap-4 flex-row-reverse"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                            <path d="M3.14062 9.71764C3.14062 7.53204 4.91241 5.76025 7.09801 5.76025H27.9613C30.142 5.76025 31.9137 7.52509 31.9154 9.70844C31.9162 10.8115 31.9161 11.9147 31.9161 13.0174L31.916 17.2685L27.9642 17.2685C26.176 17.2685 24.7264 18.7181 24.7264 20.5064V21.5856H23.6471C21.8589 21.5856 20.4092 23.0353 20.4092 24.8235L20.4094 28.7753L7.09801 28.7753C4.91241 28.7753 3.14062 27.0035 3.14062 24.8179V15.1099H31.916V12.9513H3.14062V9.71764Z" fill="black" />
                            <path d="M29.0435 20.5063C29.0435 19.9102 28.5603 19.427 27.9642 19.427C27.3682 19.427 26.8849 19.9102 26.8849 20.5063V23.7442H23.6471C23.051 23.7442 22.5678 24.2274 22.5678 24.8234C22.5678 25.4195 23.051 25.9027 23.6471 25.9027H26.8849V29.1406C26.8849 29.7367 27.3682 30.2199 27.9642 30.2199C28.5603 30.2199 29.0435 29.7367 29.0435 29.1406V25.9027H32.2814C32.8775 25.9027 33.3607 25.4195 33.3607 24.8234C33.3607 24.2274 32.8775 23.7442 32.2814 23.7442H29.0435V20.5063Z" fill="black" />
                        </svg>
                        <p className="font-bold text-xl">
                            انتخاب روش ارسال
                        </p>
                    </div>
                    <div className={styles.items + " flex flex-col gap-5 mt-5"}>
                        {carriers?.map((item) => (
                            <div className={styles.item + " flex -items-center gap-4 flex-row-reverse"}>
                                {item?.id === activeCarrier ?
                                    <div className={styles.label + " cursor-pointer"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7979 2.65252C13.4736 2.5385 14.1673 2.47925 14.8741 2.47925C15.581 2.47925 16.2747 2.53851 16.9504 2.65252C17.4567 2.73794 17.7978 3.21762 17.7124 3.72391C17.627 4.2302 17.1473 4.57137 16.641 4.48595C16.0671 4.38911 15.4769 4.33859 14.8741 4.33859C14.2714 4.33859 13.6812 4.38911 13.1073 4.48595C12.601 4.57137 12.1213 4.2302 12.0359 3.72391C11.9504 3.21762 12.2916 2.73794 12.7979 2.65252ZM8.99642 4.98427C9.29389 5.40276 9.19578 5.98316 8.77729 6.28063C7.81156 6.96708 6.96635 7.81229 6.2799 8.77802C5.98243 9.19651 5.40203 9.29462 4.98354 8.99716C4.56504 8.69969 4.46693 8.11928 4.7644 7.70079C5.57139 6.56548 6.56475 5.57212 7.70006 4.76513C8.11855 4.46767 8.69896 4.56578 8.99642 4.98427ZM20.7519 4.98427C21.0493 4.56578 21.6297 4.46767 22.0482 4.76513C23.1835 5.57212 24.1769 6.56548 24.9839 7.70079C25.2813 8.11929 25.1832 8.69969 24.7647 8.99716C24.3463 9.29462 23.7659 9.19651 23.4684 8.77802C22.7819 7.81229 21.9367 6.96708 20.971 6.28063C20.5525 5.98317 20.4544 5.40276 20.7519 4.98427ZM3.72318 12.0366C4.22947 12.122 4.57064 12.6017 4.48521 13.108C4.38838 13.6819 4.33786 14.2721 4.33786 14.8749C4.33786 15.4776 4.38838 16.0679 4.48521 16.6418C4.57064 17.148 4.22947 17.6277 3.72318 17.7132C3.21689 17.7986 2.73721 17.4574 2.65179 16.9511C2.53777 16.2754 2.47852 15.5817 2.47852 14.8749C2.47852 14.168 2.53777 13.4743 2.65179 12.7986C2.73721 12.2923 3.21689 11.9512 3.72318 12.0366ZM26.0251 12.0366C26.5314 11.9512 27.0111 12.2923 27.0965 12.7986C27.2105 13.4743 27.2698 14.168 27.2698 14.8749C27.2698 15.5817 27.2105 16.2754 27.0965 16.9511C27.0111 17.4574 26.5314 17.7986 26.0251 17.7132C25.5188 17.6277 25.1776 17.148 25.2631 16.6418C25.3599 16.0679 25.4104 15.4776 25.4104 14.8749C25.4104 14.2721 25.3599 13.6819 25.2631 13.108C25.1776 12.6017 25.5188 12.122 26.0251 12.0366ZM4.98354 20.7526C5.40203 20.4551 5.98243 20.5532 6.2799 20.9717C6.96635 21.9375 7.81156 22.7827 8.77729 23.4691C9.19578 23.7666 9.29389 24.347 8.99642 24.7655C8.69895 25.184 8.11855 25.2821 7.70006 24.9846C6.56475 24.1776 5.57139 23.1843 4.7644 22.049C4.46693 21.6305 4.56504 21.0501 4.98354 20.7526ZM24.7647 20.7526C25.1832 21.0501 25.2813 21.6305 24.9839 22.049C24.1769 23.1843 23.1835 24.1776 22.0482 24.9846C21.6297 25.2821 21.0493 25.184 20.7519 24.7655C20.4544 24.347 20.5525 23.7666 20.971 23.4691C21.9367 22.7827 22.7819 21.9375 23.4684 20.9717C23.7659 20.5532 24.3463 20.4551 24.7647 20.7526ZM12.0359 26.0258C12.1213 25.5195 12.601 25.1784 13.1073 25.2638C13.6812 25.3606 14.2714 25.4112 14.8741 25.4112C15.4769 25.4112 16.0671 25.3606 16.641 25.2638C17.1473 25.1784 17.627 25.5196 17.7124 26.0258C17.7978 26.5321 17.4567 27.0118 16.9504 27.0972C16.2747 27.2112 15.581 27.2705 14.8741 27.2705C14.1673 27.2705 13.4736 27.2112 12.7979 27.0972C12.2916 27.0118 11.9504 26.5321 12.0359 26.0258Z" fill="black" />
                                            <path d="M22.9313 14.8749C22.9313 19.3247 19.324 22.932 14.8741 22.932C10.4243 22.932 6.81698 19.3247 6.81698 14.8749C6.81698 10.425 10.4243 6.81772 14.8741 6.81772C19.324 6.81772 22.9313 10.425 22.9313 14.8749Z" fill="black" />
                                        </svg>
                                    </div> :
                                    <div className={styles.label + " cursor-pointer"} onClick={() => handleSelectCarrier(item?.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                            <path d="M25.3987 14.3426C25.3987 20.4486 20.4488 25.3984 14.3429 25.3984C8.23695 25.3984 3.28711 20.4486 3.28711 14.3426C3.28711 8.2367 8.23695 3.28687 14.3429 3.28687C20.4488 3.28687 25.3987 8.2367 25.3987 14.3426Z" stroke="black" stroke-width="0.860558" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1.72 2.29" />
                                        </svg>
                                    </div>
                                }
                                <p>
                                    {item?.name}
                                </p>
                                {item?.limit <= cartItems?.total_products_price ? 
                                    <p className="flex items-center flex-row-reverse gap-1">
                                        رایگان
                                    </p> :
                                    <p className="flex items-center flex-row-reverse gap-1">
                                        <span>تومان</span>{formatNumberWithThousandSeparator(item?.price)}
                                    </p>
                                }

                            </div>
                        ))}
                    </div>
                </div>



                <div className={styles.address}>
                    <div className={styles.title + " flex items-center gap-4 flex-row-reverse"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.487 23.375C27.3115 25.6824 25.3836 27.5 23.0312 27.5C20.6789 27.5 18.7511 25.6824 18.5755 23.375H14.4245C14.2489 25.6824 12.3211 27.5 9.96875 27.5C7.57265 27.5 5.61701 25.6142 5.50506 23.2458C3.91776 22.8164 2.75 21.366 2.75 19.6429V15.0386C2.75 13.9897 3.06983 12.9659 3.66682 12.1036L4.79688 10.4713C5.75998 9.08011 7.34431 8.25 9.03631 8.25H11.174C11.6669 6.65713 13.1514 5.5 14.9062 5.5H26.125C28.4032 5.5 30.25 7.34683 30.25 9.625V20.625C30.25 22.1438 29.0188 23.375 27.5 23.375C27.4957 23.375 27.4913 23.375 27.487 23.375ZM11 10.3125H9.03631C8.02111 10.3125 7.07051 10.8106 6.49265 11.6453L5.36259 13.2776C5.0044 13.795 4.8125 14.4093 4.8125 15.0386V19.6429C4.8125 20.3562 5.25987 20.9651 5.88935 21.2042C6.58781 19.6471 8.15162 18.5625 9.96875 18.5625C10.3237 18.5625 10.669 18.6039 11 18.6821V10.3125ZM23.0312 20.625C21.7023 20.625 20.625 21.7023 20.625 23.0312C20.625 24.3602 21.7023 25.4375 23.0312 25.4375C24.3602 25.4375 25.4375 24.3602 25.4375 23.0312C25.4375 22.7808 25.3992 22.5392 25.3282 22.3122C25.1422 22.0731 24.9948 21.8024 24.8954 21.5096C24.4541 20.9697 23.7829 20.625 23.0312 20.625ZM9.96875 20.625C8.63981 20.625 7.5625 21.7023 7.5625 23.0312C7.5625 24.3602 8.63981 25.4375 9.96875 25.4375C11.2977 25.4375 12.375 24.3602 12.375 23.0312C12.375 21.7023 11.2977 20.625 9.96875 20.625Z" fill="black" />
                        </svg>
                        <p className="font-bold text-xl">
                            انتخاب آدرس دریافت
                        </p>
                    </div>
                    <div className={styles.items + " grid grid-cols-2 gap-10 mt-5 max-md:grid-cols-1"} style={{ direction: "rtl" }}>
                        {userAddresses?.map((item) => (
                            <div className={styles.item + " flex items-start gap-4 w-full"}>
                                {item?.id === activeAddress ?
                                    <div className={styles.label + " cursor-pointer"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7979 2.65252C13.4736 2.5385 14.1673 2.47925 14.8741 2.47925C15.581 2.47925 16.2747 2.53851 16.9504 2.65252C17.4567 2.73794 17.7978 3.21762 17.7124 3.72391C17.627 4.2302 17.1473 4.57137 16.641 4.48595C16.0671 4.38911 15.4769 4.33859 14.8741 4.33859C14.2714 4.33859 13.6812 4.38911 13.1073 4.48595C12.601 4.57137 12.1213 4.2302 12.0359 3.72391C11.9504 3.21762 12.2916 2.73794 12.7979 2.65252ZM8.99642 4.98427C9.29389 5.40276 9.19578 5.98316 8.77729 6.28063C7.81156 6.96708 6.96635 7.81229 6.2799 8.77802C5.98243 9.19651 5.40203 9.29462 4.98354 8.99716C4.56504 8.69969 4.46693 8.11928 4.7644 7.70079C5.57139 6.56548 6.56475 5.57212 7.70006 4.76513C8.11855 4.46767 8.69896 4.56578 8.99642 4.98427ZM20.7519 4.98427C21.0493 4.56578 21.6297 4.46767 22.0482 4.76513C23.1835 5.57212 24.1769 6.56548 24.9839 7.70079C25.2813 8.11929 25.1832 8.69969 24.7647 8.99716C24.3463 9.29462 23.7659 9.19651 23.4684 8.77802C22.7819 7.81229 21.9367 6.96708 20.971 6.28063C20.5525 5.98317 20.4544 5.40276 20.7519 4.98427ZM3.72318 12.0366C4.22947 12.122 4.57064 12.6017 4.48521 13.108C4.38838 13.6819 4.33786 14.2721 4.33786 14.8749C4.33786 15.4776 4.38838 16.0679 4.48521 16.6418C4.57064 17.148 4.22947 17.6277 3.72318 17.7132C3.21689 17.7986 2.73721 17.4574 2.65179 16.9511C2.53777 16.2754 2.47852 15.5817 2.47852 14.8749C2.47852 14.168 2.53777 13.4743 2.65179 12.7986C2.73721 12.2923 3.21689 11.9512 3.72318 12.0366ZM26.0251 12.0366C26.5314 11.9512 27.0111 12.2923 27.0965 12.7986C27.2105 13.4743 27.2698 14.168 27.2698 14.8749C27.2698 15.5817 27.2105 16.2754 27.0965 16.9511C27.0111 17.4574 26.5314 17.7986 26.0251 17.7132C25.5188 17.6277 25.1776 17.148 25.2631 16.6418C25.3599 16.0679 25.4104 15.4776 25.4104 14.8749C25.4104 14.2721 25.3599 13.6819 25.2631 13.108C25.1776 12.6017 25.5188 12.122 26.0251 12.0366ZM4.98354 20.7526C5.40203 20.4551 5.98243 20.5532 6.2799 20.9717C6.96635 21.9375 7.81156 22.7827 8.77729 23.4691C9.19578 23.7666 9.29389 24.347 8.99642 24.7655C8.69895 25.184 8.11855 25.2821 7.70006 24.9846C6.56475 24.1776 5.57139 23.1843 4.7644 22.049C4.46693 21.6305 4.56504 21.0501 4.98354 20.7526ZM24.7647 20.7526C25.1832 21.0501 25.2813 21.6305 24.9839 22.049C24.1769 23.1843 23.1835 24.1776 22.0482 24.9846C21.6297 25.2821 21.0493 25.184 20.7519 24.7655C20.4544 24.347 20.5525 23.7666 20.971 23.4691C21.9367 22.7827 22.7819 21.9375 23.4684 20.9717C23.7659 20.5532 24.3463 20.4551 24.7647 20.7526ZM12.0359 26.0258C12.1213 25.5195 12.601 25.1784 13.1073 25.2638C13.6812 25.3606 14.2714 25.4112 14.8741 25.4112C15.4769 25.4112 16.0671 25.3606 16.641 25.2638C17.1473 25.1784 17.627 25.5196 17.7124 26.0258C17.7978 26.5321 17.4567 27.0118 16.9504 27.0972C16.2747 27.2112 15.581 27.2705 14.8741 27.2705C14.1673 27.2705 13.4736 27.2112 12.7979 27.0972C12.2916 27.0118 11.9504 26.5321 12.0359 26.0258Z" fill="black" />
                                            <path d="M22.9313 14.8749C22.9313 19.3247 19.324 22.932 14.8741 22.932C10.4243 22.932 6.81698 19.3247 6.81698 14.8749C6.81698 10.425 10.4243 6.81772 14.8741 6.81772C19.324 6.81772 22.9313 10.425 22.9313 14.8749Z" fill="black" />
                                        </svg>
                                    </div> :
                                    <div className={styles.label + " cursor-pointer"} onClick={() => handleSelectAddress(item?.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                            <path d="M25.3987 14.3426C25.3987 20.4486 20.4488 25.3984 14.3429 25.3984C8.23695 25.3984 3.28711 20.4486 3.28711 14.3426C3.28711 8.2367 8.23695 3.28687 14.3429 3.28687C20.4488 3.28687 25.3987 8.2367 25.3987 14.3426Z" stroke="black" stroke-width="0.860558" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1.72 2.29" />
                                        </svg>
                                    </div>
                                }
                                <div className={styles.desc + " p-4 border border-[#B9B9B9] rounded-lg w-full h-full"}>
                                    <p className="max-md:text-xs">
                                        {item?.address}
                                    </p>
                                    <p className="max-md:text-xs">
                                        {item?.city}
                                    </p>
                                    <p className="max-md:text-xs">
                                        {item?.number}
                                    </p>
                                    <p className="max-md:text-xs">
                                        {item?.post}
                                    </p>
                                    <p className="max-md:text-xs">
                                        {item?.name}
                                    </p>
                                    <div className="mr-auto flex justify-start">
                                        <svg className="cursor-pointer mr-auto" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" onClick={() => handeleRemove(item?.id)}>
                                            <path d="M15.122 3.92066C13.9801 3.80718 12.8381 3.72206 11.689 3.65822V3.65113L11.533 2.72904C11.4266 2.07649 11.2705 1.09766 9.61079 1.09766H7.75243C6.09976 1.09766 5.94372 2.03393 5.83023 2.72195L5.68128 3.62985C5.02163 3.67241 4.36198 3.71497 3.70234 3.7788L2.25537 3.92066C1.95746 3.94904 1.74467 4.21148 1.77304 4.50229C1.80142 4.7931 2.05676 5.00589 2.35467 4.97752L3.80164 4.83566C7.51836 4.46682 11.2635 4.60868 15.0227 4.98461C15.044 4.98461 15.0582 4.98461 15.0795 4.98461C15.349 4.98461 15.5831 4.77891 15.6115 4.50229C15.6327 4.21148 15.4199 3.94904 15.122 3.92066Z" fill="#292D32" />
                                            <path d="M13.8164 5.98463C13.6462 5.80731 13.4121 5.70801 13.171 5.70801H4.20544C3.96427 5.70801 3.72311 5.80731 3.55997 5.98463C3.39684 6.16196 3.30463 6.40312 3.31881 6.65137L3.75858 13.9288C3.8366 15.0069 3.9359 16.3546 6.41135 16.3546H10.965C13.4405 16.3546 13.5398 15.014 13.6178 13.9288L14.0576 6.65847C14.0718 6.40312 13.9796 6.16196 13.8164 5.98463ZM9.86564 12.801H7.50367C7.21286 12.801 6.9717 12.5598 6.9717 12.269C6.9717 11.9782 7.21286 11.737 7.50367 11.737H9.86564C10.1564 11.737 10.3976 11.9782 10.3976 12.269C10.3976 12.5598 10.1564 12.801 9.86564 12.801ZM10.4614 9.9638H6.91495C6.62414 9.9638 6.38298 9.72264 6.38298 9.43182C6.38298 9.14101 6.62414 8.89985 6.91495 8.89985H10.4614C10.7523 8.89985 10.9934 9.14101 10.9934 9.43182C10.9934 9.72264 10.7523 9.9638 10.4614 9.9638Z" fill="#292D32" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {level === "desc" ?
                        <div className={styles.addNew + " mt-5 flex flex-row-reverse gap-2 items-center"}>
                            <div className={styles.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.78526 12.9132L6.78396 12.9122L6.78089 12.91L6.7702 12.902C6.7611 12.8952 6.74807 12.8854 6.73138 12.8727C6.69801 12.8473 6.64998 12.8102 6.58939 12.7622C6.46823 12.6661 6.29661 12.5258 6.09132 12.3465C5.68135 11.9886 5.13396 11.4726 4.58535 10.8403C3.50266 9.59262 2.34961 7.81749 2.34961 5.87035C2.34961 3.27667 4.4522 1.17407 7.04588 1.17407C9.63957 1.17407 11.7422 3.27667 11.7422 5.87035C11.7422 7.81749 10.5891 9.59262 9.50642 10.8403C8.95781 11.4726 8.41042 11.9886 8.00045 12.3465C7.79516 12.5258 7.62354 12.6661 7.50238 12.7622C7.44179 12.8102 7.39376 12.8473 7.36039 12.8727C7.3437 12.8854 7.33067 12.8952 7.32157 12.902L7.31088 12.91L7.30781 12.9122L7.30684 12.9129C7.30684 12.9129 7.30627 12.9134 7.04588 12.5583L7.30627 12.9134C7.15129 13.027 6.94024 13.0269 6.78526 12.9132ZM7.04588 12.5583L6.78526 12.9132C6.78526 12.9132 6.7855 12.9134 7.04588 12.5583ZM5.2114 5.87035C5.2114 4.85719 6.03273 4.03586 7.04588 4.03586C8.05904 4.03586 8.88037 4.85719 8.88037 5.87035C8.88037 6.8835 8.05904 7.70483 7.04588 7.70483C6.03273 7.70483 5.2114 6.8835 5.2114 5.87035Z" fill="#E63333" />
                                </svg>
                            </div>
                            <div className={styles.button}>
                                <button className="text-[#FF3333] text-sm px-3 py-1 rounded-lg" onClick={() => setLevel("address")}>
                                    ثبت آدرس جدید
                                </button>
                            </div>
                        </div> : ""
                    }




                    <div className={styles.goToPay + " mt-10 max-w-[600px]"}>
                        <div className={styles.price + " flex items-center justify-between flex-row-reverse"}>
                            <div className="flex items-center flex-row-reverse gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.33398 35.6712V3.16675H31.6673V35.6712L26.4746 31.6511L22.6951 35.2956L19.0007 31.7331L15.3062 35.2956L11.5267 31.6511L6.33398 35.6712ZM24.8363 12.5348L23.1569 10.8555L18.143 15.8693L15.6361 13.3624L13.9567 15.0418L18.143 19.2281L24.8363 12.5348ZM12.6673 22.1667V24.5417H25.334V22.1667H12.6673Z" fill="black" />
                                </svg>
                                <p className="font-bold max-md:text-xs">
                                    قیمت محصولات :
                                </p>
                            </div>
                            <div className="flex items-center gap-1 font-bold max-md:text-xs">
                                <span>تومان</span><p>{formatNumberWithThousandSeparator(cartItems?.total_products_price)}</p>
                            </div>
                        </div>
                        <div className={styles.price + " flex items-center justify-between flex-row-reverse"}>
                            <div className="flex items-center flex-row-reverse gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.33398 35.6712V3.16675H31.6673V35.6712L26.4746 31.6511L22.6951 35.2956L19.0007 31.7331L15.3062 35.2956L11.5267 31.6511L6.33398 35.6712ZM24.8363 12.5348L23.1569 10.8555L18.143 15.8693L15.6361 13.3624L13.9567 15.0418L18.143 19.2281L24.8363 12.5348ZM12.6673 22.1667V24.5417H25.334V22.1667H12.6673Z" fill="black" />
                                </svg>
                                <p className="font-bold max-md:text-xs">
                                    هزینه ارسال :
                                </p>
                            </div>
                            <div className="flex items-center gap-1 font-bold max-md:text-xs">
                                <span>تومان</span><p>{formatNumberWithThousandSeparator(cartItems?.carrier_price)}</p>
                            </div>
                        </div>
                        <div className={styles.price + " flex items-center justify-between flex-row-reverse"}>
                            <div className="flex items-center flex-row-reverse gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.33398 35.6712V3.16675H31.6673V35.6712L26.4746 31.6511L22.6951 35.2956L19.0007 31.7331L15.3062 35.2956L11.5267 31.6511L6.33398 35.6712ZM24.8363 12.5348L23.1569 10.8555L18.143 15.8693L15.6361 13.3624L13.9567 15.0418L18.143 19.2281L24.8363 12.5348ZM12.6673 22.1667V24.5417H25.334V22.1667H12.6673Z" fill="black" />
                                </svg>
                                <p className="font-bold max-md:text-xs">
                                    مالیات بر ارزش افزوده :
                                </p>
                            </div>
                            <div className="flex items-center gap-1 font-bold max-md:text-xs">
                                <span>تومان</span><p>{formatNumberWithThousandSeparator(cartItems?.tax_price)}</p>
                            </div>
                        </div>
                        <div className={styles.price + " flex items-center justify-between flex-row-reverse"}>
                            <div className="flex items-center flex-row-reverse gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.33398 35.6712V3.16675H31.6673V35.6712L26.4746 31.6511L22.6951 35.2956L19.0007 31.7331L15.3062 35.2956L11.5267 31.6511L6.33398 35.6712ZM24.8363 12.5348L23.1569 10.8555L18.143 15.8693L15.6361 13.3624L13.9567 15.0418L18.143 19.2281L24.8363 12.5348ZM12.6673 22.1667V24.5417H25.334V22.1667H12.6673Z" fill="black" />
                                </svg>
                                <p className="font-bold max-md:text-xs">
                                    قیمت کل :
                                </p>
                            </div>
                            <div className="flex items-center gap-1 font-bold max-md:text-xs">
                                <span>تومان</span><p>{formatNumberWithThousandSeparator(cartItems?.total_price)}</p>
                            </div>
                        </div>
                        <div className={styles.button + " mt-4"}>
                            {activeAddress !== null && activeCarrier !== null ?
                                <div onClick={handleGateWay}>
                                    <RedPrimaryButton>
                                        پرداخت
                                    </RedPrimaryButton>
                                </div> :
                                <div>
                                    <DeRedPrimaryButton>
                                        پرداخت
                                    </DeRedPrimaryButton>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Payment;