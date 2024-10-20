import CarTypePage from "@/components/brand/carType";


export default function brandLayout({ thirdslug }) {
    return (
        <CarTypePage thirdslug={thirdslug} />
    );
}
export async function getServerSideProps(context) {
    const { thirdslug } = context.params;
    return {
        props: { thirdslug: decodeURIComponent(thirdslug) },
    };
}