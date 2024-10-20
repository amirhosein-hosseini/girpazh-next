import SingleBlog from "@/components/blog/singleBlog";


export default function singleBlogLayout({ slug }) {
    return (
        <SingleBlog slug={slug} />
    );
}
export async function getServerSideProps(context) {
    const { slug } = context.params;
    return {
        props: { slug: decodeURIComponent(slug) },
    };
}