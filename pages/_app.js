import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import { NFTProvider } from '../context/NFTContext';

import { Navbar, Footer } from '../components';

import '../styles/globals.css';

const App = ({ Component, pageProps }) => (
  <NFTProvider>
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <Navbar />
        <div className="pt-5">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>

      <Script src="https://kit.fontawesome.com/359807a1ab.js" crossOrigin="anonymous" />
    </ThemeProvider>
  </NFTProvider>
);

export default App;
