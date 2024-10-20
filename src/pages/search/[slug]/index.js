import ShopSearch from "../../../components/shop/shopSearch";


export default function searchLayout({ slug }) {
    return (
        <ShopSearch slug={slug} />
    );
}
export async function getServerSideProps(context) {
    const { slug } = context.params;
    return {
        props: { slug: decodeURIComponent(slug) },
    };
}