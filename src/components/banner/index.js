import Link from "next/link";
import React from "react";


export const SpecialSaleBanner  = () => {
    return(
        <div className="w-full overflow-hidden">
            <Link href={"/special/123"}>
                <img className="object-cover w-full" src="../../images/specialbanner.png" alt="image" />
            </Link>
        </div>
    )
}



export const WebsiteBanner  = () => {
    return(
        <div className="container w-11/12 mx-auto overflow-hidden">
            <Link href={"/special/123"}>
                <img className="object-cover w-full" src="../../images/websitebanner.png" alt="image" />
            </Link>
        </div>
    )
}