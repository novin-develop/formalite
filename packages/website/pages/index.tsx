import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Button, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import SearchAppBar from "../components/Layout/AppBar/AppBar";
import Footer from "../components/Layout/Footer/Footer";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

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
            <Grid container alignItems={"center"} sx={{height:"500px"}}>
              <Grid item  xs={6}>
                <Typography variant={"h1"} sx={{fontSize:"60",fontWeight:"800"}}>Formalite</Typography>
                <Typography variant={"subtitle1"} sx={{fontSize:"20"}}>A fast way to create MUI form</Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="left"
                  spacing={2}
                  mt={4}
                >
                  <Link href="https://formalite-docs.novin.dev" target="_blank">
                    <Button size={"large"} variant="contained">Document Page</Button>
                  </Link>
                  <Link href="https://github.com/novin-develop/formalite" target="_blank">
                    <Button size={"large"} color={"primary"} variant={"outlined"}>Github</Button>
                  </Link>
                </Stack>
              </Grid>
              <Grid item xs={6} sx={{textAlign:"right"}}>
                <IntegrationInstructionsIcon color={"primary"} sx={{width:"150px",height:"150px"}} />
              </Grid>
            </Grid>
            {/* Features */}
            <Grid container spacing={2} >
              <Grid item xs={12} md={4}>
                <h3>Validation</h3>
                <p>
                  forms can easily validate with Yup Library and prevents submitting form when form is Invalid
                </p>
              </Grid>
              <Grid item xs={12} md={4}>
                <h3>Performance</h3>
                <p>
                  all components has been memoized and prevents extra renders
                </p>
              </Grid>
              <Grid item xs={12} md={4}>
                <h3>Flexibility</h3>
                <p>
                  all inputs can be customized with MUI Document
                </p>
              </Grid>
              <Grid item xs={12} md={4}>
                <h3>Extendability</h3>
                <p>
                  new components can be connected to Formalite. You can use form validation and it will submit with other Formalite inputs
                </p>
              </Grid>
              <Grid item xs={12} md={4}>
                <h3>Design Layout</h3>
                <p>
                  all inputs is inside MUI Grid and can be customized with MUI Document
                </p>
              </Grid>
              <Grid item xs={12} md={4}>
                <h3>Data Fetching</h3>
                <p>
                  some input need data fetching from server it can be done MANUAL way or AUTOMATIC way
                </p>
              </Grid>
            </Grid>
            {/* Examples */}
            <Grid container justifyContent={"center"} spacing={2}>
              <Grid item xs={12} style={{textAlign:"center"}}>
                <Typography variant={"h3"} marginBottom={"32px"}> Simple Usage VS Full Usage </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <iframe src="https://codesandbox.io/embed/formalite-simple-3y170m?fontsize=14&hidenavigation=1&theme=dark"
                        style={{width:"100%", height:"500px", border:0, borderRadius: "4px", overflow:"hidden"}}
                        title="formalite-simple"
                        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <iframe src="https://codesandbox.io/embed/formalite-full-66vffy?fontsize=14&hidenavigation=1&theme=dark"
                        style={{width:"100%", height:"500px", border:0, borderRadius: "4px", overflow:"hidden"}}
                        title="formalite-full"
                        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                />
              </Grid>
            </Grid>
            {/* Includes */}
            <Grid container justifyContent={"center"} justifyItems={"center"} spacing={2}>
              <Grid item xs={12} style={{textAlign:"center"}}>
                <Typography variant={"h3"} marginBottom={"32px"}> Package Included </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-autocompleteview--multiple-auto-complete-view"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"} style={{cursor:"pointer"}} >Auto Complete View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-bigradiogroupview--base"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Big Radio Group View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-cardnumberview--base"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Card Number View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-checkgroupview--base"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Check Group View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-colorpickerview--base"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Color Picker View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"http://localhost:6006/?path=/docs/components-componentview--base"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Component View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-datepickerview--date-picker"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Date Picker View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-datepickerview--date-time-picker"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Date Time Picker View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-datepickerview--time-picker"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Time Picker View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-dropzoneview--avatar-drop-zone-view"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Avatar DropZone View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-dropzoneview--multi-drop-zone-view"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Multi DropZone View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-dropzoneview--single-drop-zone-view"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Single DropZone View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-dropzoneview--text-drop-zone-view"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Text DropZone View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-editorview--base"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Editor View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-groupview--base"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Group View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-priceview--base"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Price View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-radiogroupview--base"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Radio Group View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-repeaterview--base"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Repeater View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-selectview--base"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Select View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-switchgroupview--base"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Switch Group View</Typography>
                  </a>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction={"row"} spacing={1}>
                  <CheckCircleTwoToneIcon color={"primary"} />
                  <a href={"https://formalite-docs.novin.dev/?path=/docs/components-textview--simple"} target={"_blank"} rel="noreferrer">
                    <Typography variant={"body1"}>Text View</Typography>
                  </a>
                </Stack>
              </Grid>

            </Grid>
          </Stack>

        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Home;
