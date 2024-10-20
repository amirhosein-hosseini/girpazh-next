import Link from "next/link";
import styles from "./styles.module.scss";
import { url } from "@/api/domain";
import Image from "next/image";

const ShopItem = (data) => {


    
    const formatNumberWithThousandSeparator = (number) => {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    return(
        <Link href={"/product/" + data?.data?.slug}>
            <div className={styles.shopItem + " bg-white p-2 rounded-lg flex flex-col justify-between min-w-[280px] h-[450px] max-md:min-w-[180px] max-md:h-[350px]"}>
                <div className={styles.top + " relative"}>
                    {/* <div className={styles.header + " absolute top-0 left-0 w-full flex items-center justify-between flex-row-reverse"}>
                        <div className={styles.imagesNumber + " flex flex-row-reverse items-center gap-1"}>
                            <img src="../../images/producttag.png" alt="tag" />
                        </div>
                    </div> */}
                    <div className={styles.image + " w-full mx-auto overflow-hidden max-h-[250px]"}>
                        <img className="object-cover w-full h-full" width={98} height={92} src={data?.data?.image} alt="icon" />
                    </div>
                    <div className={styles.title + " mt-3"}>
                        <p className="text-[14px] font-bold max-md:text-[10px]">
                            {data?.data?.title}
                        </p>
                    </div>
                </div>
                <div className={styles.bottom + " mt-2 flex flex-col"}>
                    <div className={styles.rate + " flex items-center gap-1 mb-1"}>
                        <div>
                            <Image className="h-[15px] max-md:h-[10px]" src="/images/rate.png" alt="rate" height={10} width={70} />
                        </div>
                    </div>
                    <div className={styles.price}>
                        <p className="text-[14px] text-black font-bold text-right max-md:text-[12px]">
                            {formatNumberWithThousandSeparator(data?.data?.price)} <span className="text-xs text-[#82807D]">تومان</span> 
                        </p>
                    </div>
                    <div>
                        <button className="bg-[#E14957] py-2 text-white text-lg w-full rounded-lg mt-2 max-md:text-xs max-md:py-[6px]">
                            مشاهده محصول
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ShopItem;