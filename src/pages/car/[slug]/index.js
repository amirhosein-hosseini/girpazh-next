import BrandPage from "@/components/brand";

export default function brandLayout({ slug }) {
    return (
        <BrandPage slug={slug} />
    );
}
export async function getServerSideProps(context) {
    const { slug } = context.params;
    return {
        props: { slug: decodeURIComponent(slug) },
    };
}