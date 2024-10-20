import Link from "next/link";
import styles from "./styles.module.scss";

const BlogItem = ({data}) => {

    return(
        <Link href={"/blog/" + data?.slug} className="bg-white p-3 rounded-lg min-w-[280px] max-md:min-w-[230px] max-md:h-[400px] flex flex-col justify-between">
            <div className="w-full max-h-[200px] overflow-hidden">
                <img className="w-full h-full object-cover rounded-lg" src={data?.image} alt="image" />
            </div>
            <div>
                <div className="mt-2">
                    <p className="text-sm font-bold mb-2">
                        {data?.title}
                    </p>
                    <p className="text-sm text-[#82807D]">
                        {data?.description}
                    </p>
                </div>
                <div className="mt-4 flex items-center justify-between flex-row-reverse">
                    <div>
                        <button className="bg-[#E14957] px-3 py-1 rounded-lg text-white text-sm">
                            مشاهده
                        </button>
                    </div>
                    <div className="flex items-center gap-1 flex-row-reverse">
                        <p className="text-xs text-[#82807D] mt-1 max-md:text-[10px]">
                            {data?.created_at}
                        </p>
                        <svg className="max-md:w-4" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2256_9361)">
                                <path d="M16.2305 6.11603H8.23047C6.02133 6.11603 4.23047 7.90689 4.23047 10.116V17.416C4.23047 19.6252 6.02133 21.416 8.23047 21.416H16.2305C18.4396 21.416 20.2305 19.6252 20.2305 17.416V10.116C20.2305 7.90689 18.4396 6.11603 16.2305 6.11603Z" stroke="#82807D" stroke-width="1.5" stroke-linejoin="round" />
                                <path d="M8.62891 3.41602V6.11602" stroke="#82807D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.832 3.41602V6.11602" stroke="#82807D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20.3289 10.616H4.12891" stroke="#82807D" stroke-width="1.5" stroke-linejoin="round" />
                                <path d="M8.51953 14.216H8.73956" stroke="#82807D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.5508 14.216H12.9108" stroke="#82807D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.7188 14.216H15.9388" stroke="#82807D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8.51953 17.816H10.1395" stroke="#82807D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M13.1302 17.816H12.9102" stroke="#82807D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.7188 17.816H15.9388" stroke="#82807D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2256_9361">
                                    <rect width="24" height="24" fill="white" transform="translate(0.230469 0.416016)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BlogItem;