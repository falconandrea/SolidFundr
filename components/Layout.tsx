"use client";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";

import Providers from "../pages/providers";
import LoadingSpinner from "./LoadingSpinner";
import { LayoutProps } from "../utils/interfaces-types";

const Layout = ({ children, isLoading }: LayoutProps) => {
  return (
    <>
      <Providers>
        <Head>
          <title>SolidFundr</title>
          <meta
            content="Welcome to SolidFundr, the platform revolutionizing fundraising with
          blockchain technology."
            name="description"
          />
          <link href="/favicon.ico" rel="icon" />
        </Head>
        <Header />
        <main>
          {isLoading && <LoadingSpinner />}
          {children}
        </main>
        <Footer />
      </Providers>
    </>
  );
};

export default Layout;
