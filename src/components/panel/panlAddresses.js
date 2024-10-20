import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { RedPrimaryButton } from "../button";
import { toast } from "react-toastify";
import { getCookie } from "../../api/auth";
import axios from "axios";
import { prefix, url } from "../../api/domain";
import { getAllUserAddresses } from "../../api/user";

const PanelAdresses = () => {

    const token = getCookie('token')
    const [showAddAddress , setShowAddAddress] = useState(false);
    const [userAddresses , setUserAddresses] = useState(null);
    const [reload , setReload] = useState(0);
    const [formData, setFormData] = useState({
        address: "",
        post: "",
        state: "",
        city: "",
        number: "",
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    
    const handleSubmit = (e) => {

        e.preventDefault();


        axios.post(url + "/" + prefix + '/user/address/create', formData , {
                headers:{
                'Authorization' : 'Bearer ' + token,
                }
            })
            .then((response) => {
                toast.success("آدرس با موفقیت ثبت شد");
                setShowAddAddress(false);
                setReload(reload + 1);
            })
            .catch((error) => {
                toast.error(error.response.data)
            })
            .finally(() => {
                console.log("final")
            });
    };


    // get data for user addresses
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllUserAddresses();
            setUserAddresses(data?.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [reload]);


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




    return(
        <div className={styles.panelOrder + " px-5 py-12 max-md:py-5"}>
            <div className={styles.header + " flex flex-row-reverse items-center gap-2 mb-10"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.14648 6.29564C5.14648 4.35038 6.72343 2.77344 8.66869 2.77344H22.1171C24.0624 2.77344 25.6393 4.35038 25.6393 6.29564V27.4289C25.6393 27.8054 25.4193 28.1472 25.0767 28.3032C24.734 28.4592 24.3317 28.4005 24.0478 28.1533L21.403 25.8497L19.0482 28.1204C18.6761 28.4792 18.0868 28.4792 17.7147 28.1204L15.3929 25.8815L13.0712 28.1204C12.699 28.4792 12.1097 28.4792 11.7376 28.1204L9.38281 25.8497L6.73799 28.1533C6.45406 28.4005 6.05184 28.4592 5.70915 28.3032C5.36646 28.1472 5.14648 27.8054 5.14648 27.4289V6.29564ZM10.2697 10.1381C10.2697 9.60752 10.6998 9.17745 11.2303 9.17745H19.5555C20.086 9.17745 20.5161 9.60752 20.5161 10.1381C20.5161 10.6686 20.086 11.0987 19.5555 11.0987H11.2303C10.6998 11.0987 10.2697 10.6686 10.2697 10.1381ZM10.2697 15.2613C10.2697 14.7307 10.6998 14.3007 11.2303 14.3007H14.4323C14.9628 14.3007 15.3929 14.7307 15.3929 15.2613C15.3929 15.7918 14.9628 16.2219 14.4323 16.2219H11.2303C10.6998 16.2219 10.2697 15.7918 10.2697 15.2613Z" fill="black"/>
                </svg>
                <p>آدرس ها</p>
            </div>
            <div className={styles.items + " mb-10 w-full flex flex-col"}>
                {userAddresses?.map((item) => (
                    <div className={styles.item + " border-b-2 border-b-[#eee] pb-3 flex flex-row-reverse gap-2 pt-3 w-11/12 mx-auto"}>
                        <div className={styles.icon + " w-1/12 ml-auto flex justify-end"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.78526 12.9134L6.78396 12.9125L6.78089 12.9102L6.7702 12.9023C6.7611 12.8955 6.74807 12.8857 6.73138 12.873C6.69801 12.8476 6.64998 12.8105 6.58939 12.7624C6.46823 12.6663 6.29661 12.526 6.09132 12.3468C5.68135 11.9888 5.13396 11.4728 4.58535 10.8406C3.50266 9.59286 2.34961 7.81773 2.34961 5.87059C2.34961 3.27691 4.4522 1.17432 7.04588 1.17432C9.63957 1.17432 11.7422 3.27691 11.7422 5.87059C11.7422 7.81773 10.5891 9.59286 9.50642 10.8406C8.95781 11.4728 8.41042 11.9888 8.00045 12.3468C7.79516 12.526 7.62354 12.6663 7.50238 12.7624C7.44179 12.8105 7.39376 12.8476 7.36039 12.873C7.3437 12.8857 7.33067 12.8955 7.32157 12.9023L7.31088 12.9102L7.30781 12.9125L7.30684 12.9132C7.30684 12.9132 7.30627 12.9136 7.04588 12.5586L7.30627 12.9136C7.15129 13.0273 6.94024 13.0271 6.78526 12.9134ZM7.04588 12.5586L6.78526 12.9134C6.78526 12.9134 6.7855 12.9136 7.04588 12.5586ZM5.2114 5.87059C5.2114 4.85743 6.03273 4.03611 7.04588 4.03611C8.05904 4.03611 8.88037 4.85743 8.88037 5.87059C8.88037 6.88375 8.05904 7.70507 7.04588 7.70507C6.03273 7.70507 5.2114 6.88375 5.2114 5.87059Z" fill="#E63333"/>
                            </svg>
                        </div>
                        <div className={styles.desc + " flex flex-col gap-2 w-11/12"}>
                            <p className="text-sm max-md:text-xs">{item?.city}</p>
                            <p className="text-sm max-md:text-xs">{item?.address}</p>
                            <p className="text-sm max-md:text-xs">{item?.post}</p>
                            <p className="text-sm max-md:text-xs">{item?.number}</p>
                            <p className="text-sm max-md:text-xs">{item?.name}</p>
                            <div className="mr-auto">
                                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" onClick={() => handeleRemove(item?.id)}>
                                    <path d="M15.122 3.92066C13.9801 3.80718 12.8381 3.72206 11.689 3.65822V3.65113L11.533 2.72904C11.4266 2.07649 11.2705 1.09766 9.61079 1.09766H7.75243C6.09976 1.09766 5.94372 2.03393 5.83023 2.72195L5.68128 3.62985C5.02163 3.67241 4.36198 3.71497 3.70234 3.7788L2.25537 3.92066C1.95746 3.94904 1.74467 4.21148 1.77304 4.50229C1.80142 4.7931 2.05676 5.00589 2.35467 4.97752L3.80164 4.83566C7.51836 4.46682 11.2635 4.60868 15.0227 4.98461C15.044 4.98461 15.0582 4.98461 15.0795 4.98461C15.349 4.98461 15.5831 4.77891 15.6115 4.50229C15.6327 4.21148 15.4199 3.94904 15.122 3.92066Z" fill="#292D32" />
                                    <path d="M13.8164 5.98463C13.6462 5.80731 13.4121 5.70801 13.171 5.70801H4.20544C3.96427 5.70801 3.72311 5.80731 3.55997 5.98463C3.39684 6.16196 3.30463 6.40312 3.31881 6.65137L3.75858 13.9288C3.8366 15.0069 3.9359 16.3546 6.41135 16.3546H10.965C13.4405 16.3546 13.5398 15.014 13.6178 13.9288L14.0576 6.65847C14.0718 6.40312 13.9796 6.16196 13.8164 5.98463ZM9.86564 12.801H7.50367C7.21286 12.801 6.9717 12.5598 6.9717 12.269C6.9717 11.9782 7.21286 11.737 7.50367 11.737H9.86564C10.1564 11.737 10.3976 11.9782 10.3976 12.269C10.3976 12.5598 10.1564 12.801 9.86564 12.801ZM10.4614 9.9638H6.91495C6.62414 9.9638 6.38298 9.72264 6.38298 9.43182C6.38298 9.14101 6.62414 8.89985 6.91495 8.89985H10.4614C10.7523 8.89985 10.9934 9.14101 10.9934 9.43182C10.9934 9.72264 10.7523 9.9638 10.4614 9.9638Z" fill="#292D32" />
                                </svg>
                            </div>
                        </div>

                    </div> 
                ))}
                {showAddAddress === false ? 
                    <div className={styles.addNew + " mt-5 flex flex-row-reverse gap-2 items-center"}>
                        <div className={styles.icon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.78526 12.9132L6.78396 12.9122L6.78089 12.91L6.7702 12.902C6.7611 12.8952 6.74807 12.8854 6.73138 12.8727C6.69801 12.8473 6.64998 12.8102 6.58939 12.7622C6.46823 12.6661 6.29661 12.5258 6.09132 12.3465C5.68135 11.9886 5.13396 11.4726 4.58535 10.8403C3.50266 9.59262 2.34961 7.81749 2.34961 5.87035C2.34961 3.27667 4.4522 1.17407 7.04588 1.17407C9.63957 1.17407 11.7422 3.27667 11.7422 5.87035C11.7422 7.81749 10.5891 9.59262 9.50642 10.8403C8.95781 11.4726 8.41042 11.9886 8.00045 12.3465C7.79516 12.5258 7.62354 12.6661 7.50238 12.7622C7.44179 12.8102 7.39376 12.8473 7.36039 12.8727C7.3437 12.8854 7.33067 12.8952 7.32157 12.902L7.31088 12.91L7.30781 12.9122L7.30684 12.9129C7.30684 12.9129 7.30627 12.9134 7.04588 12.5583L7.30627 12.9134C7.15129 13.027 6.94024 13.0269 6.78526 12.9132ZM7.04588 12.5583L6.78526 12.9132C6.78526 12.9132 6.7855 12.9134 7.04588 12.5583ZM5.2114 5.87035C5.2114 4.85719 6.03273 4.03586 7.04588 4.03586C8.05904 4.03586 8.88037 4.85719 8.88037 5.87035C8.88037 6.8835 8.05904 7.70483 7.04588 7.70483C6.03273 7.70483 5.2114 6.8835 5.2114 5.87035Z" fill="#E63333"/>
                            </svg>
                        </div>
                        <div className={styles.button}>
                            <button className="text-[#FF3333] text-sm px-3 py-1 rounded-lg" onClick={() => setShowAddAddress(true)}>
                                ثبت آدرس جدید 
                            </button>
                        </div>
                    </div> : ""
                }
            </div>
            {showAddAddress === true ?
                <div className={styles.addAddress + " w-full"}>
                    <form className={styles.form + " w-full  flex flex-col gap-2"}>
                        <div className={styles.formGroup + " w-full flex gap-2"}>
                            <input
                                name="name"
                                className="w-full p-3 rounded-lg" 
                                type="text" 
                                placeholder="نام و نام خانوادگی " 
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.formGroup + " w-full flex gap-2"}>
                            <input
                                name="number"
                                className="w-full p-3 rounded-lg" 
                                type="text" 
                                placeholder="شماره تماس " 
                                value={formData.number}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.formGroup + " w-full flex gap-2"}>
                            <input
                                name="post"                            
                                className="w-full p-3 rounded-lg" 
                                type="text" 
                                placeholder="کد پستی " 
                                value={formData.post}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.formGroup + " w-full flex gap-2"}>
                            <input
                                name="state"   
                                className="w-full p-3 rounded-lg" 
                                type="text" 
                                placeholder="استان " 
                                value={formData.state}
                                onChange={handleChange}
                            />
                            <input
                                name="city"   
                                className="w-full p-3 rounded-lg" 
                                type="text" 
                                placeholder="شهر" 
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.formGroup + " w-full flex gap-2"}>
                            <textarea 
                                name="address"   
                                className="w-full p-3 rounded-lg"
                                placeholder="آدرس کامل پستی " 
                                style={{resize: "none"}}
                                rows={10}
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.button} onClick={handleSubmit}>
                            <RedPrimaryButton>
                                ثبت اطلاعات
                            </RedPrimaryButton>
                        </div>
                    </form>
                </div> : ""
            }
        </div>
    )
}

export default PanelAdresses;