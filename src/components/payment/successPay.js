import React from "react";
import { RedPrimaryButton } from "../button";
import Link from "next/link";


const SuccessPay = () => {
    return(
        <div className="mt-20 py-20 min-h-[60vh] flex items-center justify-center flex-col gap-4">
            <div>
                <p className="text-xl text-center max-md:text-sm mb-3 font-bold">
                    با تشکر از خرید شما در گیرپاژ
                </p>
                <p className="text-center text-green">
                    پرداخت با موفقیت انجام شد
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

export default SuccessPay;