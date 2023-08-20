"use client";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";

import Providers from "../pages/providers";
import { LayoutProps } from "../utils/interfaces-types";

/**
 * Render the Layout component.
 *
 * @param {LayoutProps} children - The children to be rendered inside the Layout component.
 * @return {JSX.Element} The rendered Layout component.
 */
const Layout = ({ children }: LayoutProps) => {
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
        {children}
        <Footer />
      </Providers>
    </>
  );
};

export default Layout;
