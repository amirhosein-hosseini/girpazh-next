import SubCategoryPage from "@/components/brand/category/subCategories";

export default function carLayout({ secslug }) {
    return (
        <SubCategoryPage secslug={secslug} />
    );
}
export async function getServerSideProps(context) {
    const { secslug } = context.params;
    return {
        props: { secslug: decodeURIComponent(secslug) },
    };
}