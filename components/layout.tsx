import React from 'react';
import SocialMedia from './socialMedia';
import Navbar from './navbar';
import Footer from './footer';

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
