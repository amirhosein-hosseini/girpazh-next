import "@/styles/globals.css";
import "../components/gallery/galleryStyle.css";
import Layout from "./layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useRouter } from 'next/router';
import { AuthProvider } from "@/context/authContext";

export default function App({ Component, pageProps }) {

  const router = useRouter();
  
  // Define routes where you don't want to show the layout
  const noLayoutRoutes = ['/login' , '/signin'];

  const isLayoutNeeded = !noLayoutRoutes.includes(router.pathname);



  return isLayoutNeeded ? (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </AuthProvider>
  ) : (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </AuthProvider>
    
  );
}
