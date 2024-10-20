import styles from "./styles.module.scss";

const ProductDesc = ({data}) => {
    return(
        <div>
            <div className="text-right text-sm" style={{direction: "rtl" , lineHeight: "45px !important"}} dangerouslySetInnerHTML={{ __html: data}} />
        </div>
    )
}

export default ProductDesc;