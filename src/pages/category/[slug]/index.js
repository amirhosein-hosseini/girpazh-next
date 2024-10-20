import CategoryPage from "@/components/brand/category/categoryPage";

export default function carLayout({ slug }) {
    return (
        <CategoryPage slug={slug} />
    );
}
export async function getServerSideProps(context) {
    const { slug } = context.params;
    return {
        props: { slug: decodeURIComponent(slug) },
    };
}