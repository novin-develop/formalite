import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Container, Stack } from "@mui/material";
import styles from "../styles/Home.module.css";
import SearchAppBar from "../components/Layout/AppBar/AppBar";
import Footer from "../components/Layout/Footer/Footer";
import { Index1Header } from "../components/IndexPageCompoenent/Index1Header";
import { Index2Features } from "../components/IndexPageCompoenent/Index2Features";
import { Index3Examples } from "../components/IndexPageCompoenent/Index3Examples";
import { Index4Includes } from "../components/IndexPageCompoenent/Index4Includes";
import { Index5Builder } from "../components/IndexPageCompoenent/Index5Builder/Index5Builder";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Formalite</title>
        <meta name="description" content="fast way to create form" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchAppBar />
      <div className={styles.container}>
        <Container maxWidth={"xl"} >
          <Stack spacing={10}>
            {/* Header */}
              <Index1Header/>
            {/* Features */}
              <Index2Features/>
            {/* Examples */}
              <Index3Examples/>
            {/* Includes */}
              <Index4Includes/>
            {/* Builder */}
              <Index5Builder/>
          </Stack>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Home;
