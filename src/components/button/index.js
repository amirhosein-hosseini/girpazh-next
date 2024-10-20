import styles from "./styles.module.scss";

export const BlackButton = ({children}) => {
    return(
        <button className="bg-black text-xs text-white rounded-lg py-2 px-5">
            {children}
        </button>
    )
}


export const RedBorderButton = ({children}) => {
    return(
        <button className="bg-transparent text-xs border border-[#E14957] text-[#E14957] rounded-lg py-2 px-5" style={{border: "1px solid #E14957 !important"}}>
            {children}
        </button>
    )
}


export const RedPrimaryButton = ({children}) => {
    return(
        <button className={styles.primarybtn + " bg-[#E14957] relative text-white px-4 max-md:px-2 py-[7px] max-md:py-[5px] rounded-lg max-md:text-xs flex items-center gap-2 justify-center"}>
            {children}
        </button>
    )
}

export const DeRedPrimaryButton = ({children}) => {
    return(
        <button style={{opacity: "50%"}} className={styles.primarybtn + " bg-[#E14957] text-white px-4 py-[7px] w-full"}>
            {children}
        </button>
    )
}

export const BlackPrimaryButton = ({children}) => {
    return(
        <button className={styles.primarybtn + " bg-black text-white px-4 py-[7px] rounded-lg"}>
            {children}
        </button>
    )
}

export const SecondPrimaryButton = ({children}) => {
    return(
        <button className={styles.primarybtn + " bg-[#E14957] text-white px-4 py-[7px] w-full"}>
            {children}
        </button>
    )
}

export const OutlineBlackButton = ({children}) => {
    return(
        <button className={styles.OutlineBlackButton + " text-black px-4 py-[7px] w-full"} style={{border: "1px solid black"}}>
            {children}
        </button>
    )
}

export const PrimaryArrowButton = ({children}) => {
    return(
        <button className={styles.primaryarrowbutton}>
            {children}
        </button>
    )
}