import { useEffect, useState } from "react";
import BlogItem from "./blogItem";
import styles from "./styles.module.scss";
import { getAllBlogs } from "@/api/blog";
import Link from "next/link";
import Head from "next/head";

const ArchiveBlog = () => {

    // const [blogs , setBlogs] = useState(null);


    // // get data for blog items
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = await getAllBlogs();
    //             setBlogs(data?.data?.data);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);


    return(
        <>
            <Head>
                <link rel="canonical" href={"https://girpazh.com/blog"} />
            </Head>
            <div className="container max-w-[1200px] w-11/12 mx-auto my-20 max-md:my-10">
                {/* <div className="flex items-start gap-5">
                    <div className="w-2/3 grid grid-cols-2 gap-5 max-md:grid-cols-1 max-md:w-full">
                        {blogs?.map((item) => (
                            <BlogItem data={item} />
                        ))}
                    </div>
                    <div className="w-1/3 bg-white p-6 rounded-lg max-md:hidden">
                        <div>
                            <p className="font-bold mb-5">
                                وبلاگ های اخیر
                            </p>
                            <div className="flex flex-col gap-5">
                                {blogs?.slice(0, 4)?.map((item) => (
                                    <Link href={"/blog/" + item?.slug} className="flex items-center gap-3">
                                        <div className="w-[80px] h-[80px] overflow-hidden rounded-lg">
                                            <img className="w-[80px] h-[80px]" src={item?.image} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-black">
                                                {item?.title}
                                            </p>
                                            <p className="text-xs text-[#2C2C2C] mt-2">
                                                {item?.created_at}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>  
        
        </>

    )
}

export default ArchiveBlog;