import type { NextPage } from "next";
import Head from "next/head";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import SearchAppBar from "../components/Layout/AppBar/AppBar";
import Footer from "../components/Layout/Footer/Footer";

const Home: NextPage = () => {
  return (
    <>
      <SearchAppBar />
      <div className={styles.container}>
        <Head>
          <title>Formalite</title>
          <meta name="description" content="fast way to create form" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Stack spacing={2}>
            <h1>Formalite Website</h1>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <Link href="https://formalite.novin.dev" target="_blank">
                <Button variant="contained">Document Page</Button>
              </Link>
            </Stack>
          </Stack>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
