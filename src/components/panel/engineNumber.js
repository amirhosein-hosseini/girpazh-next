import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCookie } from "../../api/auth";
import { prefix, url } from "../../api/domain";
import { getUserChassis } from "../../api/user";
import styles from "./styles.module.scss";

const EngineNumber = () => {


    const token = getCookie('token')
    const [showInput , setShowInput] = useState(false);
    const [chassis , setChassis] = useState(null);
    const [reload , setReload] = useState(1);
    const [activeChassi , setActiveChassi] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        number: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    
    // get data for user chassis
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getUserChassis();
            setChassis(data?.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [reload]);






    const handleSubmit = (e) => {

        e.preventDefault();


        axios.post(url + "/" + prefix + '/user/chassis/create', formData , {
            headers : {
                'Authorization' : 'Bearer ' + token,
            }
        })
            .then((response) => {
                toast.success(response.data?.message);
                setReload(reload + 1);
                setShowInput(false);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
            })
            .finally(() => {
                console.log("final")
            });
    };


    const handleDelete = (id) => {


        axios.delete(url + "/" + prefix + '/user/chassis/deleteChassi/' + id,  {
            headers : {
                'Authorization' : 'Bearer ' + token,
            }
        })
            .then((response) => {
                toast.success(response.data?.message);
                setReload(reload + 1);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
            })
            .finally(() => {
                console.log("final")
            });
    };



    return(
        <div className={styles.panelOrder + " px-5 py-12 max-md:py-5"}>
            <div className={styles.header + " flex flex-row-reverse items-center gap-2 mb-10"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C12.5523 1 13 1.44772 13 2V3.05511C13.9171 3.15662 14.7934 3.39607 15.6071 3.75239L16.134 2.83994C16.4101 2.36165 17.0217 2.19777 17.5 2.47392C17.9783 2.75006 18.1421 3.36165 17.866 3.83995L17.3384 4.7537C18.066 5.29047 18.7096 5.93414 19.2464 6.66167L20.1602 6.13407C20.6385 5.85793 21.2501 6.0218 21.5263 6.5001C21.8024 6.97839 21.6385 7.58998 21.1602 7.86612L20.2477 8.39297C20.604 9.20666 20.8435 10.083 20.945 11.0001H22C22.5523 11.0001 23 11.4478 23 12.0001C23 12.5524 22.5523 13.0001 22 13.0001H20.945C20.8435 13.9172 20.604 14.7936 20.2477 15.6073L21.1602 16.1342C21.6385 16.4103 21.8024 17.0219 21.5263 17.5002C21.2501 17.9785 20.6385 18.1424 20.1602 17.8662L19.2464 17.3386C18.7096 18.0661 18.0659 18.7098 17.3384 19.2465L17.866 20.1604C18.1421 20.6386 17.9783 21.2502 17.5 21.5264C17.0217 21.8025 16.4101 21.6386 16.134 21.1604L15.6071 20.2478C14.7934 20.6041 13.9171 20.8436 13 20.9451V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V20.9451C10.0829 20.8436 9.20657 20.6041 8.39289 20.2478L7.866 21.1604C7.58986 21.6387 6.97827 21.8026 6.49998 21.5265C6.02169 21.2503 5.85781 20.6387 6.13395 20.1605L6.66159 19.2465C5.93403 18.7098 5.29034 18.0661 4.75355 17.3385L3.83972 17.8661C3.36143 18.1423 2.74984 17.9784 2.4737 17.5001C2.19755 17.0218 2.36143 16.4102 2.83972 16.1341L3.75225 15.6072C3.39594 14.7935 3.15648 13.9172 3.05498 13.0001L1.99995 13C1.44767 13 0.999973 12.5522 1 12C1.00003 11.4477 1.44776 11 2.00005 11L3.05499 11.0001C3.1565 10.083 3.39593 9.2067 3.75222 8.39304L2.83973 7.86623C2.36143 7.59009 2.19755 6.9785 2.47369 6.5002C2.74983 6.02191 3.36142 5.85803 3.83971 6.13417L4.75351 6.66173C5.29029 5.93417 5.93399 5.29047 6.66155 4.75368L6.13395 3.83984C5.85781 3.36155 6.02168 2.74996 6.49998 2.47382C6.97827 2.19768 7.58986 2.36155 7.866 2.83984L8.39285 3.75237C9.20654 3.39606 10.0829 3.15661 11 3.05511V2C11 1.44772 11.4477 1 12 1ZM7.66968 6.49981C6.97287 7.04925 6.38281 7.7283 5.93615 8.50029C5.34095 9.529 4.99998 10.7232 4.99998 12.0001C4.99998 13.277 5.34096 14.4712 5.93618 15.5C6.38284 16.2719 6.9729 16.951 7.66971 17.5004L9.7198 13.9495C9.27162 13.4257 8.99998 12.7449 8.99998 12.0001C8.99998 11.2553 9.27162 10.5745 9.71979 10.0507L7.66968 6.49981ZM11.4516 9.05028L9.40082 5.49823C10.2037 5.17694 11.0804 5.0001 12 5.0001C13.2769 5.0001 14.4711 5.34109 15.4999 5.93632C16.5625 6.55114 17.449 7.43764 18.0638 8.50024C18.5006 9.25528 18.8006 10.0995 18.9292 11.0001H14.8293C14.4174 9.8349 13.3062 9.0001 12 9.0001C11.813 9.0001 11.6296 9.01731 11.4516 9.05028ZM14.8293 13.0001C14.4174 14.1653 13.3062 15.0001 12 15.0001C11.813 15.0001 11.6296 14.9829 11.4516 14.9499L9.40085 18.502C10.2037 18.8233 11.0804 19.0001 12 19.0001C13.2769 19.0001 14.4711 18.6591 15.4998 18.0639C16.5624 17.4491 17.4489 16.5626 18.0637 15.5C18.5006 14.745 18.8006 13.9007 18.9292 13.0001H14.8293Z" fill="black"/>
                </svg>
                <p>شماره های شاسی</p>
            </div>
            <div className={styles.items + " min-h-[335px] flex flex-col gap-3"}>
                {chassis?.map((item) => (
                    <div className={styles.item + " flex flex-row-reverse gap-10 items-center"}>
                        <div className="flex items-center flex-row-reverse gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M11.0002 4.75C11.0002 6.82107 9.32122 8.5 7.25015 8.5C6.73356 8.5 6.24137 8.39554 5.79355 8.2066L3.50015 10.5C2.94787 11.0523 2.05244 11.0523 1.50015 10.5C0.947867 9.94771 0.947866 9.05229 1.50015 8.5L3.79355 6.2066C3.60461 5.75878 3.50015 5.26659 3.50015 4.75C3.50015 2.67893 5.17908 1 7.25015 1C7.66316 1 8.06058 1.06677 8.4322 1.1901C8.74896 1.29523 8.80765 1.6925 8.57165 1.9285L7.00015 3.5C6.58594 3.91421 6.58594 4.58579 7.00015 5C7.41436 5.41421 8.08594 5.41421 8.50015 5L10.0717 3.4285C10.3077 3.1925 10.7049 3.25119 10.8101 3.56795C10.9334 3.93957 11.0002 4.33699 11.0002 4.75Z" fill="#1F66EF"/>
                            </svg>
                            <p className="text-[#656565]">{item?.number}</p>
                            <p className="text-[#656565]">{item?.name}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-row-reverse cursor-pointer" onClick={() => handleDelete(item?.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2.66216 11.25L2.24748 11.2768C2.26159 11.4954 2.44305 11.6655 2.66216 11.6655V11.25ZM9.58784 11.25V11.6655C9.80695 11.6655 9.98841 11.4954 10.0025 11.2768L9.58784 11.25ZM1 2.24662C0.770503 2.24662 0.584459 2.43267 0.584459 2.66216C0.584459 2.89166 0.770503 3.0777 1 3.0777V2.24662ZM11.25 3.0777C11.4795 3.0777 11.6655 2.89166 11.6655 2.66216C11.6655 2.43267 11.4795 2.24662 11.25 2.24662V3.0777ZM5.29392 5.43243C5.29392 5.20294 5.10788 5.01689 4.87838 5.01689C4.64888 5.01689 4.46284 5.20294 4.46284 5.43243H5.29392ZM4.46284 8.47973C4.46284 8.70923 4.64888 8.89527 4.87838 8.89527C5.10788 8.89527 5.29392 8.70923 5.29392 8.47973H4.46284ZM7.78716 5.43243C7.78716 5.20294 7.60112 5.01689 7.37162 5.01689C7.14213 5.01689 6.95608 5.20294 6.95608 5.43243H7.78716ZM6.95608 8.47973C6.95608 8.70923 7.14213 8.89527 7.37162 8.89527C7.60112 8.89527 7.78716 8.70923 7.78716 8.47973H6.95608ZM7.86898 2.76574C7.92619 2.98799 8.15273 3.12179 8.37498 3.06459C8.59724 3.00738 8.73104 2.78084 8.67383 2.55859L7.86898 2.76574ZM1.69343 2.68892L2.24748 11.2768L3.07684 11.2232L2.52279 2.63541L1.69343 2.68892ZM2.66216 11.6655H9.58784V10.8345H2.66216V11.6655ZM10.0025 11.2768L10.5566 2.68892L9.72721 2.63541L9.17316 11.2232L10.0025 11.2768ZM10.1419 2.24662H2.10811V3.0777H10.1419V2.24662ZM1 3.0777H2.10811V2.24662H1V3.0777ZM10.1419 3.0777H11.25V2.24662H10.1419V3.0777ZM4.46284 5.43243V8.47973H5.29392V5.43243H4.46284ZM6.95608 5.43243V8.47973H7.78716V5.43243H6.95608ZM6.12501 1.41554C6.96348 1.41554 7.66906 1.98901 7.86898 2.76574L8.67383 2.55859C8.3817 1.42358 7.35187 0.584459 6.12501 0.584459V1.41554ZM4.38104 2.76574C4.58096 1.98901 5.28654 1.41554 6.12501 1.41554V0.584459C4.89815 0.584459 3.86832 1.42358 3.57619 2.55859L4.38104 2.76574Z" fill="#707070"/>
                            </svg>
                            <p className="text-[10px] text-[#656565]">حذف شماره شاسی</p>
                        </div>
                    </div> 
                ))}
                {showInput === false ? 
                    <div className={styles.addNew + " flex justify-end mt-12"}>
                        <div className={styles.button}>
                            <button className="text-[#FF3333] text-sm px-3 py-1 rounded-lg" onClick={() => setShowInput(!showInput)}>
                                ثبت شاسی جدید 
                            </button>
                        </div>
                    </div> : ""
                }
                {showInput === true ? 
                    <div className={styles.chassisInput + " mt-12"}>
                        <form className="w-full m-x-auto flex justify-center items-center flex-col gap-4">
                            <div className={styles.formgroup + " relative w-full flex gap-2 max-md:flex-col"}>
                                <input
                                    type="text"
                                    name="number"
                                    className="border rounded-lg border-[#FF3333] placeholder-opacity-25 w-full py-3 px-5 text-xs tracking-widest"
                                    placeholder="شماره شاسی را وارد کنید"
                                    value={formData.number}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="name"
                                    className="border rounded-lg border-[#FF3333] placeholder-opacity-25 w-full py-3 px-5 text-xs tracking-widest"
                                    placeholder="نام خودرو"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.button}>
                                <button className="text-[#FF3333] text-sm px-3 py-1 rounded-lg" onClick={handleSubmit}>
                                    ثبت 
                                </button>
                            </div>
                        </form>
                    </div> : ""
                }
            </div>
        </div>
    )
}

export default EngineNumber;