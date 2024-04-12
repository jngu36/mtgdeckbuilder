import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./components/navbar";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Navbar/>
      <Component {...pageProps} />
    </div>
  );
}
