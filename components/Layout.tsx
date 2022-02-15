import React from 'react';
import SocialMedia from './SocialMedia';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <SocialMedia />
      <main>{children}</main>
      <Footer />
    </>
  );
}
