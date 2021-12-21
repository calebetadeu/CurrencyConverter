import Footer from "../components/Footes";
import Header from "../components/Header";
import { GlobalStyle } from "../styles/GlobalStyles";


function MyApp({ Component, pageProps }) {
  return (
    <>
<GlobalStyle/>
<Header/>
  <Component {...pageProps} />
  <Footer/>
  
  </>
  )
  
}

export default MyApp;
