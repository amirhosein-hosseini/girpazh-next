import { getSitemMap } from "@/api/sitemap";
import { useEffect, useState } from "react";
import { parseString } from "xml2js";

const SiteMap = () => {
  const [sitemapData, setSitemapData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSitemMap();
        parseString(data?.data, (err, result) => {
          if (err) {
            console.error("Error parsing XML:", err);
          } else {
            setSitemapData(result);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!sitemapData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sitemap-container my-20">
      <style jsx>{`
        .sitemap-container {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          margin-top:100px;
        }
        .sitemap-list {
          list-style-type: none;
          padding: 0;
        }
        .sitemap-item {
          margin-bottom: 20px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
          text-align:center;
        }
        .sitemap-item a {
          color: #0066cc;
          text-decoration: none;
          font-weight: bold;
        }
        .sitemap-details {
          margin-top: 5px;
          font-size: 0.9em;
          color: #666;
        }
        .sitemap-details span {
          margin-right: 15px;
        }
      `}</style>
      <h1 className="text-center mb-10">Sitemap</h1>
      <ul className="sitemap-list">
        {sitemapData.urlset.url.map((item, index) => (
          <li key={index} className="sitemap-item">
            <a href={item.loc[0]} target="_blank" rel="noopener noreferrer">
              {item.loc[0]}
            </a>
            <div className="sitemap-details">
              <span>Priority: {item.priority[0]}</span>
              <span>Last Modified: {item.lastmod[0]}</span>
              <span>Change Frequency: {item.changefreq[0]}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiteMap;