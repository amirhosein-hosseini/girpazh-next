import CarPage from "@/components/brand/car";

export default function brandLayout({ secslug }) {
    return (
        <CarPage secslug={secslug} />
    );
}
export async function getServerSideProps(context) {
    const { secslug } = context.params;
    return {
        props: { secslug: decodeURIComponent(secslug) },
    };
}