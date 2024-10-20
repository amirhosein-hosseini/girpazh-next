import React from "react";
import { RedPrimaryButton } from "../button";
import Link from "next/link";


const CancelPay = () => {
    return(
        <div className="mt-20 py-20 min-h-[70vh] flex items-center justify-center flex-col gap-4">
            <div>
                <p className="text-center text-green">
                    پرداخت شما لغو شد
                </p>
            </div>
            <div>
                <Link href={"/"}>
                    <RedPrimaryButton>
                        بازگشت به خانه
                    </RedPrimaryButton>
                </Link>
            </div>
        </div>
    )
}

export default CancelPay;