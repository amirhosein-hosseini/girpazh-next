import { Rating } from "@mui/material";
import styles from "./styles.module.scss";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { prefix, url } from "@/api/domain";
import { getCookie } from "@/api/auth";

const ProductOponion = ({data , id , handleReload , reload}) => {

    const token = getCookie('token');
    const {isLoggedIn} = useAuth();
    const [value, setValue] = useState(0);
    const [errors , setErrors] = useState(null);
    const [formData , setFormData] = useState({
        name: "",
        email: "",
        comment: "",
    })

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let rateValue = null

        if(value !== null && value !== 0){
            rateValue = value;
        }


        axios.post(url + "/" + prefix + '/product/comment/send', {post_id: id , body: formData?.comment , emailUser: formData?.email , rate: rateValue},{
            headers:{
              'Authorization' : 'Bearer ' + token,
            }
          })
            .then((response) => {
                handleReload(reload + 1)
            })
            .catch((error) => {
                setErrors(error.response?.data?.errors)
            })
            .finally(() => {
                console.log("final")
            });
    }







    return(
        <div className="flex flex-col gap-5">
            <div className="flex flex-col">
                {data?.map((item) => (
                    <div className="flex items-center gap-4 py-4" style={{ direction: "rtl", borderBottom: "1px solid rgb(62,134,230,10%)" }}>
                        <div className="flex flex-col justify-end" style={{ direction: "rtl" }}>
                            {item?.rate !== null ? 
                                <Rating style={{ width: "100px" }} name="read-only" value={item?.rate} readOnly /> : ""
                            }
                            <p className="mt-2 text-sm text-[#221313]">
                                {item?.body}
                            </p>
                            <p className="mt-3 text-sm text-[#221313] font-bold">
                                {item?.user?.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {isLoggedIn === true ? 
                <div>
                    <div className="flex items-center gap-3 flex-row-reverse mb-5">
                        <p className="text-lg font-bold">
                            نظر خود را بنویسید
                        </p>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            style={{ width: "100px" , direction: "rtl" }}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </div>
                    <form className="w-11/12 mx-auto flex flex-col gap-5">
                        {/* <div>
                            <input name="name" onChange={handleChange} className="w-full p-3 rounded-lg" style={{ background: "rgb(40,18,18,4%)" }} type="text" placeholder="نام" />
                        </div> */}
                        <div>
                            <input name="email" onChange={handleChange} className="w-full p-3 rounded-lg" style={{ background: "rgb(40,18,18,4%)" }} type="text" placeholder="آدرس ایمیل" />
                        </div>
                        <div>
                            <textarea name="comment" onChange={handleChange} className="w-full p-3 rounded-lg resize-none" rows={8} style={{ background: "rgb(40,18,18,4%)" }} placeholder="نظر شما" />
                        </div>
                        <div className="flex">
                            <button className="bg-black p-3 px-10 rounded-lg text-white" onClick={handleSubmit}>
                                ارسال
                            </button>
                        </div>
                    </form>
                </div> : ""
            }

        </div>
    )
}

export default ProductOponion;