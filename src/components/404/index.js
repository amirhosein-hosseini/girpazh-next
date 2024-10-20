const { default: Link } = require("next/link")

const Page404 = () => {

    const handleCall = () => {
        window.open('tel:02833560066', '_self'); // Replace with the desired phone number
    };


    return(
        <div className="bg-white py-20">
            <div className="container max-w-[1200px] w-11/12 mx-auto flex flex-col items-center justify-center gap-10">
                <div className="max-w-[360px] w-11/12 overflow-hidden">
                    <img className="object-cover w-full" src="../../images/404.jpg" alt="404" />
                </div>
                <div className="flex flex-col items-center justify-center gap-5 text-center">
                    <p className="text-xl text-[#E14957] font-bold max-md:text-sm">
                        متاسفیم! صفحه ای که به دنبال آن هستید وجود ندارد.
                    </p>
                    <div className="flex gap-1 flex-row-reverse text-sm">
                        <p>
                            برگشت به
                        </p>
                        <Link href={"/"} className="text-[#E14957]">
                            صفحه اصلی
                        </Link>
                    </div>
                    <div>
                        <button className="text-sm bg-[#E14957] flex flex-row-reverse items-center gap-2 px-4 py-3 rounded-lg text-white" onClick={handleCall}>
                            تماس با کال سنتر
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_2884_10343)">
                                    <path d="M19.49 19.75L18.8 20.44C18.42 20.79 17.94 20.98 17.42 21C16.03 20.95 13.11 20.16 8.48001 15.52C3.85001 10.89 3.04 7.93998 3 6.60998C3.02 6.09998 3.21 5.60997 3.56 5.22997L4.25 4.53997L5.20001 3.59002C5.39001 3.39002 5.62 3.24001 5.87 3.14001C6.14 3.04001 6.41 3.01002 6.69 3.03002C6.96 3.05002 7.21999 3.14002 7.45999 3.28002C7.69999 3.42002 7.89999 3.61002 8.04999 3.84002L9.39999 5.72997C9.52999 5.94997 9.61 6.19 9.63 6.45C9.65 6.7 9.6 6.95999 9.5 7.18999L8.60001 8.90002C8.54001 9.03002 8.51001 9.18001 8.51001 9.33001C8.51001 9.48001 8.54001 9.62 8.60001 9.76C9.19001 10.97 10.01 12.06 11.02 12.95C11.92 13.95 13 14.77 14.22 15.37C14.35 15.43 14.49 15.46 14.65 15.46C14.81 15.46 14.94 15.43 15.08 15.37L16.8 14.48C17.04 14.37 17.29 14.33 17.55 14.34C17.81 14.36 18.05 14.44 18.27 14.57L20.17 15.91C20.4 16.06 20.6 16.26 20.74 16.5C20.87 16.74 20.97 17 20.99 17.27C21.02 17.54 20.99 17.82 20.89 18.08C20.79 18.34 20.63 18.57 20.43 18.76L19.52 19.75H19.49Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                                    <path d="M13.9883 3C14.9083 3 15.8183 3.18003 16.6783 3.53003C17.5283 3.88003 18.2983 4.39999 18.9583 5.04999C19.6083 5.69999 20.1283 6.47001 20.4783 7.32001C20.8283 8.17001 21.0083 9.08 21.0083 10" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                                    <path d="M13.9883 7C14.3883 7 14.7783 7.07998 15.1383 7.22998C15.5083 7.37998 15.8383 7.6 16.1183 7.88C16.3983 8.16 16.6183 8.48999 16.7683 8.85999C16.9183 9.21999 16.9983 9.62001 16.9983 10.01" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2884_10343">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page404;