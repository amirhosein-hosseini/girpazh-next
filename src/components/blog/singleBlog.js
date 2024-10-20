import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { getAllBlogs, getShowBlog } from "../../api/blog";
import { url } from "../../api/domain";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

const SingleBlog = ({slug}) => {
  

  const router = useRouter()
  const [data, setData] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [headings, setHeadings] = useState([]);

  // Extract headings and add IDs, while filtering out empty headings
  const extractAndAddHeadings = (htmlContent) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    const headingsArray = [];
    tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      const text = heading.innerText.trim();

      // Skip empty headings
      if (text === "") {
        return;
      }

      headingsArray.push({
        id: id,
        text: text,
        level: Number(heading.tagName.replace("H", "")),
      });
      heading.id = id; // Set the id for the heading
    });

    return { updatedHtml: tempDiv.innerHTML, headings: headingsArray };
  };

  // Fetch blog data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShowBlog(slug);
        const { updatedHtml, headings } = extractAndAddHeadings(data?.data?.data?.body || "");
        setData({ ...data?.data?.data, body: updatedHtml });
        setHeadings(headings);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [slug]);

  // Fetch all archive blogs data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNavigate = (slug) => {
    router.replace("/blog/" + slug);
    // window.location.reload();
  };

  // Scroll to element
  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        {
          data?.follow === 1 && data?.index === 1 ? <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" /> :
            data?.follow === 1 && data?.index === 0 ? <meta name="robots" content="follow, noindex" /> :
              data?.follow === 0 && data?.index === 1 ? <meta name="robots" content="nofollow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" /> :
                data?.follow === 0 && data?.index === 0 ? <meta name="robots" content="nofollow, noindex" /> : ""
        }
        <link rel="canonical" href={data?.canonical === null || data?.canonical === "" ? `https://rabanipart.com/blog/${data?.slug}` : data?.canonical} />
        <meta property="article:published_time" content={data?.created_at}></meta>
        <meta property="article:modified_time" content={data?.updated_at}></meta>
        <meta property="og:updated_time" content={data?.updated_at}></meta>
        <title>{data?.title}</title>
        <meta name="description" content={data?.description} />
      </Head>
      <div className="my-20" style={{ marginTop: "100px" }}>
        <div className="header container w-11/12 mx-auto mb-4 mt-20">
          <div className="desc flex flex-col gap-1">
            <p className="text-sm">
              تاریخ : <span>{data?.created_at}</span>
            </p>
          </div>
        </div>

        <div className={styles.singleBlog + " flex gap-5 container w-11/12 mx-auto"} style={{ alignItems: "start" }}>


          <div className={styles.right + " w-2/3 max-md:w-full bg-white rounded-lg"}>
            <div className={styles.content + " p-4 rounded-lg"}>
              <div className={styles.container + " mt-10 bg-[#1F66EF] w-1/3 max-md:w-full ml-auto p-4 rounded-lg mb-5"}>
                <p className={styles.title + " font-bold text-white text-xl"}>فهرست مطالب</p>
                <nav>
                  <ul className="mt-5 flex flex-col gap-2 text-white" style={{listStyle: "dots"}}>
                    {headings.map((heading) => (
                      <li key={heading.id} style={{ marginLeft: `${(heading.level - 1) * 20}px` }}>
                        <a className="hover:underline" href={`#${heading.id}`} onClick={(e) => { e.preventDefault(); scrollToElement(heading.id); }}>{heading.text}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div dangerouslySetInnerHTML={{ __html: data?.body }}></div>
            </div>
          </div>

                  <div className="w-1/3 bg-white p-6 rounded-lg max-md:hidden">
                      <div>
                          <p className="font-bold mb-5">
                              وبلاگ های اخیر
                          </p>
                          <div className="flex flex-col gap-5">
                              {blogs?.slice(0, 4)?.map((item) => (
                                  <Link href={"/blog/" + item?.slug} className="flex items-center gap-3">
                                      <div className="w-[80px] h-[80px] overflow-hidden rounded-lg">
                                          <img className="w-[80px] h-[80px]" src={item?.image} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-black">
                                              {item?.title}
                                          </p>
                                          <p className="text-xs text-[#2C2C2C] mt-2">
                                              {item?.created_at}
                                          </p>
                                      </div>
                                  </Link>
                              ))}
                          </div>
                      </div>
                  </div>



        </div>
      </div>
    </>

  );
};

export default SingleBlog;
