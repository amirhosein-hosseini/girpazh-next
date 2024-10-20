import React, { useEffect, useState } from "react";
import EngineNumber from "./engineNumber";
import PanelOrder from "./panelOrders";
import PanelAdresses from "./panlAddresses";
import styles from "./styles.module.scss";
import { getUserInfo } from "../../api/user";
import { useAuth } from "../../context/authContext";

const Panel = () => {

    const {signOut} = useAuth();
    const [level , setLevel] = useState("order");
    const [userInfo , setUserInfo] = useState(null);


    // get data for user information
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getUserInfo();
            setUserInfo(data?.data?.user);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);



    const handleSignOut = () => {
        signOut();
    }




    return(
        <div className={styles.panel + " my-20 max-md:my-10"}>
            <div className={styles.panelWrapper + " container mx-auto w-11/12 flex max-md:flex-col flex-row-reverse items-start gap-10 justify-between"}>
                <div className={styles.panelList + " w-1/3 max-md:w-full px-5 py-12"}>
                    <div className={styles.desc + " flex flex-row-reverse items-center justify-between"}>
                        <div>
                            <div className="flex flex-row-reverse items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M9.90492 2.30615C7.91545 2.30615 6.30266 3.91894 6.30266 5.90841C6.30266 7.89788 7.91545 9.51066 9.90492 9.51066C11.8944 9.51066 13.5072 7.89788 13.5072 5.90841C13.5072 3.91894 11.8944 2.30615 9.90492 2.30615Z" fill="black"/>
                                    <path d="M14.4349 12.469C13.2898 11.3797 11.7332 10.7114 9.90492 10.7114C6.20992 10.7114 3.62476 13.4409 3.30342 16.8591C3.2876 17.0274 3.34343 17.1945 3.45721 17.3195C3.57098 17.4444 3.73216 17.5157 3.90116 17.5157H11.6661L11.0257 17.0354C10.2299 16.4385 10.0687 15.3096 10.6655 14.5138C11.2623 13.718 12.3913 13.5567 13.1871 14.1536L13.3505 14.2762L14.4349 12.469Z" fill="black"/>
                                    <path d="M17.0239 12.8214C17.1945 12.5371 17.1023 12.1683 16.818 11.9977C16.5337 11.8271 16.1649 11.9193 15.9943 12.2036L13.6951 16.0356L12.4666 15.1142C12.2013 14.9152 11.825 14.969 11.626 15.2342C11.4271 15.4995 11.4808 15.8758 11.7461 16.0748L13.5072 17.3956C13.6432 17.4976 13.816 17.5372 13.9828 17.5045C14.1497 17.4718 14.2948 17.3699 14.3823 17.2242L17.0239 12.8214Z" fill="black"/>
                                </svg>
                                <p className="text-[#E14957] font-bold">{userInfo?.name}</p>
                            </div>
                            <div>
                                <p className="text-xs mt-3">شماره تماس : <span>{userInfo?.number}</span></p>
                            </div>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                <path d="M12.419 12.9853V13.2788H12.7126V12.9853H12.419ZM2.43945 12.9853H2.14594V13.2788H2.43945V12.9853ZM2.43945 3.00571V2.71219H2.14594V3.00571H2.43945ZM7.13573 3.29922H7.42925V2.71219H7.13573V3.29922ZM12.7126 8.28902V7.9955H12.1255V8.28902H12.7126ZM4.78759 8.87605L4.58004 8.6685L4.49407 8.75447V8.87605H4.78759ZM4.78759 10.6372H4.49407V10.9307H4.78759V10.6372ZM6.54869 10.6372V10.9307H6.67027L6.75624 10.8447L6.54869 10.6372ZM11.0982 2.56543L11.3058 2.35788L11.0982 2.15033L10.8907 2.35788L11.0982 2.56543ZM12.8593 4.32653L13.0669 4.53408L13.2744 4.32653L13.0669 4.11898L12.8593 4.32653ZM12.419 12.6918H2.43945V13.2788H12.419V12.6918ZM2.73297 12.9853V3.00571H2.14594V12.9853H2.73297ZM2.43945 3.29922H7.13573V2.71219H2.43945V3.29922ZM12.1255 8.28902V12.9853H12.7126V8.28902H12.1255ZM4.49407 8.87605V10.6372H5.08111V8.87605H4.49407ZM4.78759 10.9307H6.54869V10.3436H4.78759V10.9307ZM4.99514 9.0836L11.3058 2.77298L10.8907 2.35788L4.58004 8.6685L4.99514 9.0836ZM10.8907 2.77298L12.6518 4.53408L13.0669 4.11898L11.3058 2.35788L10.8907 2.77298ZM12.6518 4.11898L6.34115 10.4296L6.75624 10.8447L13.0669 4.53408L12.6518 4.11898Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.list + " mt-10 flex flex-col gap-3"}>
                        <div className={`flex flex-row-reverse items-center gap-2 border-b-2 border-b-[#eee] py-2 pr-3 border-r-2 ${level === "order" ? "border-r-[#1F66EF]" : "border-r-transparent"} cursor-pointer`} onClick={() => setLevel("order")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <g clip-path="url(#clip0_937_4855)">
                                <path d="M2.28666 6.89433C2.73173 7.1257 3.23748 7.25645 3.77377 7.25645C5.55693 7.25645 7.00246 5.81092 7.00246 4.02776C7.00246 3.92882 6.99801 3.83092 6.9893 3.73425H11.9394L12.2933 2.20066C12.324 2.06748 12.4426 1.97314 12.5793 1.97314H13.7534C13.9155 1.97314 14.0469 2.10456 14.0469 2.26666C14.0469 2.42877 13.9155 2.56018 13.7534 2.56018H12.8128L11.1042 9.96411C11.0735 10.0973 10.9549 10.1916 10.8182 10.1916H3.18674C3.04683 10.1916 2.92636 10.0929 2.89892 9.95567L2.28666 6.89433Z" fill="black"/>
                                <path d="M9.3506 10.7787C9.99902 10.7787 10.5247 11.3043 10.5247 11.9527C10.5247 12.6011 9.99902 13.1268 9.3506 13.1268C8.70218 13.1268 8.17653 12.6011 8.17653 11.9527C8.17653 11.3043 8.70218 10.7787 9.3506 10.7787Z" fill="black"/>
                                <path d="M5.82839 11.9527C5.82839 11.3043 5.30275 10.7787 4.65433 10.7787C4.00591 10.7787 3.48026 11.3043 3.48026 11.9527C3.48026 12.6011 4.00591 13.1268 4.65433 13.1268C5.30275 13.1268 5.82839 12.6011 5.82839 11.9527Z" fill="black"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.77377 1.97314C3.61167 1.97314 3.48026 2.10456 3.48026 2.26666V3.73425H2.01267C1.85057 3.73425 1.71915 3.86566 1.71915 4.02776C1.71915 4.18987 1.85057 4.32128 2.01267 4.32128H3.48026V5.78887C3.48026 5.95097 3.61167 6.08239 3.77377 6.08239C3.93588 6.08239 4.06729 5.95097 4.06729 5.78887V4.32128H5.53488C5.69698 4.32128 5.82839 4.18987 5.82839 4.02776C5.82839 3.86566 5.69698 3.73425 5.53488 3.73425H4.06729V2.26666C4.06729 2.10456 3.93588 1.97314 3.77377 1.97314Z" fill="black"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_937_4855">
                                <rect width="14.0888" height="14.0888" fill="white" transform="matrix(-1 0 0 1 14.6348 0.799316)"/>
                                </clipPath>
                                </defs>
                            </svg>
                            <p className={`${level === "order" ? "font-bold" : ""} max-md:text-xs`}>سفارشات </p>
                        </div>
                        <div className={`flex flex-row-reverse items-center gap-2 border-b-2 border-b-[#eee] py-2 pr-3 border-r-2 ${level === "address" ? "border-r-[#1F66EF]" : "border-r-transparent"} cursor-pointer`} onClick={() => setLevel("address")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.33018 13.7323L7.32889 13.7313L7.32581 13.7291L7.31512 13.7211C7.30602 13.7143 7.29299 13.7045 7.2763 13.6918C7.24293 13.6664 7.1949 13.6293 7.13431 13.5813C7.01316 13.4852 6.84153 13.3449 6.63624 13.1656C6.22627 12.8077 5.67888 12.2917 5.13027 11.6594C4.04758 10.4117 2.89453 8.63658 2.89453 6.68944C2.89453 4.09576 4.99713 1.99316 7.59081 1.99316C10.1845 1.99316 12.2871 4.09576 12.2871 6.68944C12.2871 8.63658 11.134 10.4117 10.0513 11.6594C9.50273 12.2917 8.95534 12.8077 8.54537 13.1656C8.34008 13.3449 8.16846 13.4852 8.04731 13.5813C7.98671 13.6293 7.93868 13.6664 7.90531 13.6918C7.88862 13.7045 7.8756 13.7143 7.86649 13.7211L7.8558 13.7291L7.85273 13.7313L7.85176 13.732C7.85176 13.732 7.85119 13.7325 7.59081 13.3774L7.85119 13.7325C7.69621 13.8461 7.48517 13.846 7.33018 13.7323ZM7.59081 13.3774L7.33018 13.7323C7.33018 13.7323 7.33042 13.7325 7.59081 13.3774ZM5.75632 6.68944C5.75632 5.67628 6.57765 4.85496 7.59081 4.85496C8.60396 4.85496 9.42529 5.67628 9.42529 6.68944C9.42529 7.7026 8.60396 8.52392 7.59081 8.52392C6.57765 8.52392 5.75632 7.7026 5.75632 6.68944Z" fill="black"/>
                            </svg>
                            <p className={`${level === "address" ? "font-bold" : ""} max-md:text-xs`}>آدرس ها</p>
                        </div>
                        <div className="flex flex-row-reverse items-center gap-2 border-b-2 border-b-[#eee] py-2 pr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                <path d="M7.58913 2.13965C6.13018 2.13965 4.94747 3.32236 4.94747 4.7813C4.94747 6.24025 6.13018 7.42296 7.58913 7.42296C9.04807 7.42296 10.2308 6.24025 10.2308 4.7813C10.2308 3.32236 9.04807 2.13965 7.58913 2.13965Z" fill="black"/>
                                <path d="M10.9111 9.59238C10.0714 8.79356 8.92988 8.30351 7.58913 8.30351C4.87946 8.30351 2.98368 10.3051 2.74803 12.8118C2.73643 12.9352 2.77737 13.0578 2.86081 13.1494C2.94424 13.2411 3.06244 13.2933 3.18637 13.2933H8.88068L8.41105 12.9411C7.82748 12.5034 7.7092 11.6755 8.14689 11.0919C8.58457 10.5083 9.41247 10.3901 9.99605 10.8278L10.1159 10.9177L10.9111 9.59238Z" fill="black"/>
                                <path d="M12.8097 9.85085C12.9348 9.64235 12.8672 9.3719 12.6587 9.2468C12.4502 9.12169 12.1798 9.18931 12.0547 9.39781L10.3686 12.2079L9.46766 11.5322C9.27314 11.3863 8.99717 11.4257 8.85128 11.6202C8.70538 11.8148 8.74481 12.0907 8.93933 12.2366L10.2308 13.2052C10.3305 13.28 10.4573 13.309 10.5796 13.2851C10.7019 13.2611 10.8084 13.1864 10.8725 13.0795L12.8097 9.85085Z" fill="black"/>
                            </svg>
                            <p className={`${level === "information" ? "font-bold" : ""} max-md:text-xs`}>اطلاعات حساب کاربری</p>
                        </div>
                        <div className={`flex flex-row-reverse items-center gap-2 border-b-2 border-b-[#eee] py-2 pr-3 border-r-2 ${level === "engine" ? "border-r-[#1F66EF]" : "border-r-transparent"} cursor-pointer`} onClick={() => setLevel("engine")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M11.0002 4.75C11.0002 6.82107 9.32122 8.5 7.25015 8.5C6.73356 8.5 6.24137 8.39554 5.79355 8.2066L3.50015 10.5C2.94787 11.0523 2.05244 11.0523 1.50015 10.5C0.947867 9.94771 0.947866 9.05229 1.50015 8.5L3.79355 6.2066C3.60461 5.75878 3.50015 5.26659 3.50015 4.75C3.50015 2.67893 5.17908 1 7.25015 1C7.66316 1 8.06058 1.06677 8.4322 1.1901C8.74896 1.29523 8.80765 1.6925 8.57165 1.9285L7.00015 3.5C6.58594 3.91421 6.58594 4.58579 7.00015 5C7.41436 5.41421 8.08594 5.41421 8.50015 5L10.0717 3.4285C10.3077 3.1925 10.7049 3.25119 10.8101 3.56795C10.9334 3.93957 11.0002 4.33699 11.0002 4.75Z" fill="black"/>
                            </svg>
                            <p className={`${level === "engine" ? "font-bold" : ""} max-md:text-xs`}>شماره شاسی</p>
                        </div>  
                    </div>
                    <div className={styles.exit + " flex flex-row-reverse cursor-pointer items-center gap-2 mt-20 max-md:mt-10"} onClick={handleSignOut}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                            <path d="M18.6705 11.8123L8.46416 11.8123M18.6705 11.8123L14.588 15.8949M18.6705 11.8123L14.588 7.72977M10.5054 19.297H4.60841C4.10735 19.297 3.70117 18.8908 3.70117 18.3898L3.70117 5.23487C3.70117 4.73382 4.10736 4.32764 4.60841 4.32764L10.5054 4.32764" stroke="black" stroke-width="1.9212" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p className="max-md:text-xs">خروج</p>
                    </div>
                </div>
                <div className={styles.panelDetail + " w-2/3 max-md:w-full"}>
                    {level === "order" ? <PanelOrder /> : level === "address" ? <PanelAdresses /> : level === "engine" ? <EngineNumber /> : ""}
                </div>
            </div>
        </div>
    )
}

export default Panel;