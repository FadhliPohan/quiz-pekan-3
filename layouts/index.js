import Header from "@/components/header";
import Footer from "@/components/footer";
import Head from "next/head";
import Button from "@/components/atom/Button";
import { useState } from "react";

const Layout = (props) => {


  return (
    <>
      <Head>
        <title>{props.metaTitle}</title>
        <meta name="description" content={props.metaDescription  || "Informasi"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header></Header>
        {props.children}
        <Footer></Footer>
      </main>
    </>
  );
};

export default Layout;
