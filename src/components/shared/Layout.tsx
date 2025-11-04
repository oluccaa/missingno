import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton';
import WhatsAppButton from './WhatsAppButton';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <WhatsAppButton />
        <BackToTopButton />
      </div>
    </div>
  );
};

export default Layout;