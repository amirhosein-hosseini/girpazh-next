import { getSitemMap } from "@/api/sitemap";

export async function getServerSideProps({ res }) {
  try {
    const data = await getSitemMap();
    
    // Remove the XSL stylesheet reference
    const xmlWithoutXsl = data.data.replace(
      /<\?xml-stylesheet.*?\?>\s*/,
      ''
    );
    
    res.setHeader('Content-Type', 'application/xml');
    res.write(xmlWithoutXsl);
    res.end();
  } catch (error) {
    console.error("Error fetching sitemap:", error);
    res.status(500).json({ error: 'Error fetching sitemap' });
  }

  return {
    props: {},
  };
}

const Sitemap = () => {
  return null;
};

export default Sitemap;