import React, { useState } from "react";
import styles from  "./styles.module.scss";
import { RedPrimaryButton } from "../button";
import Link from "next/link";

const SearchPage = () => {


    const [searchValue , setSearchValue] = useState(null);


    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };


    return(
        <div className={styles.searchPage + " relative h-[100vh]"}>
            <div className={styles.back + " absolute top-5 left-5 z-50"}>
                <Link href={"/"}>
                    <svg className="w-6 fill-white max-md:fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                </Link>
            </div>
            <div className={styles.content + " h-full flex items-center justify-center w-full"}>
                <form className="w-full">
                    <div className={styles.formGroup + " relative w-2/3 max-md:w-full max-w-[800px] mx-auto flex justify-end"}>
                        <input 
                            className="w-full h-[60px] max-md:h-[36px] bg-[#4A4A4A] text-white max-md:text-xs rounded-lg pl-14 pr-[160px] max-md:pr-[105px]"
                            type="text" 
                            placeholder="نام و کد قطعه مورد نظر را بنویسید" 
                            value={searchValue}
                            onChange={handleInputChange} 
                        />
                        <div className="absolute top-[11px] right-[14px] max-md:top-[5.5px] max-md:right-[4px]">
                            <Link href={"/search/" + searchValue}>
                                <RedPrimaryButton>
                                    جستجو قطعات  
                                </RedPrimaryButton>
                            </Link>
                        </div>
                        <div className="absolute top-[12px] max-md:top-[8px] left-2 w-10 h-10">
                            <img className="max-md:w-6" src="../../images/searchvector.png" about="vector" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchPage;