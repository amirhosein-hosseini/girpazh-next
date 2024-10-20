import { useEffect, useState } from "react";
import ShopItem from "./shopItem";
import styles from "./styles.module.scss";

const BestSellers = () => {


    const [bestSellers , setBestSellers] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllProducts("sort=bestsellers");
            setBestSellers(data?.data?.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);


    const parsToArray = (string) => {
        let actualArray = JSON.parse(string);
        return actualArray
    }



    return(
        <div className={styles.shopArchive + " mb-20 pb-10"}>
            {/* <div className={styles.specialBanner + " my-5 mb-8 bg-white text-center relative h-[40px] flex justify-center items-center"}>
                <div className={styles.title}>
                    <p className="text-xs">
                        پیشنهادات ویژه 
                    </p>
                </div>
                <div className={styles.icon + " absolute right-3 top-2"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.5303 8.21967L16.7803 11.4697C17.0732 11.7626 17.0732 12.2374 16.7803 12.5303L13.5303 15.7803C13.2374 16.0732 12.7626 16.0732 12.4697 15.7803C12.1768 15.4874 12.1768 15.0126 12.4697 14.7197L14.4393 12.75H7.75C7.33579 12.75 7 12.4142 7 12C7 11.5858 7.33579 11.25 7.75 11.25H14.4393L12.4697 9.28033C12.1768 8.98744 12.1768 8.51256 12.4697 8.21967C12.7626 7.92678 13.2374 7.92678 13.5303 8.21967Z" fill="black"/>
                    </svg>
                </div>
            </div> */}



            <div className={styles.slider + " pl-5 flex gap-3"} style={{overflowX : "auto"}}>
                <div className={styles.item + " w-[700px]"}>
                    <img className="object-cover w-full" src="../../images/shopSlider.png" alt="image" style={{width: "280px" , minWidth: "280px"}} />
                </div>
                <div className={styles.item + " w-[700px]"}>
                    <img className="object-cover w-full" src="../../images/shopSlider.png" alt="image" style={{width: "280px" , minWidth: "280px"}} />
                </div>
            </div>


            <div>
                {/* <div className={styles.title + " flex items-center container w-11/12 mx-auto mt-10"}>
                    <p className="text-xs text-[#E14957]">
                        نمایش همه 
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M5 4L7 6L5 8" stroke="#E14957" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div> */}
                <div className={styles.archive + " grid grid-cols-2 gap-4 mx-auto"} style={{width: "max-content" , marginTop: "30px"}}>
                    {bestSellers?.slice(0,20).map((item) => (
                        <ShopItem slug={item?.slug} image={parsToArray(item?.image)[0]} title={item?.title} price={item?.offPrice} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BestSellers;