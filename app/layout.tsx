import { Inter } from 'next/font/google';
import './globals.scss';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <div className="flex flex-col h-screen">
          <Header />
          <Main>{ children }</Main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

export default RootLayout;