# `Formalite`

Generate MUI form with few line of code

[![Coverage Status](https://coveralls.io/repos/github/novin-develop/formalite/badge.svg?branch=main)](https://coveralls.io/github/novin-develop/formalite?branch=main)
[![size](https://img.shields.io/bundlephobia/min/@novin-dev/formalite)](https://bundlephobia.com/package/@novin-dev/formalite)
[![download](https://img.shields.io/npm/dw/@novin-dev/formalite)](https://www.npmjs.com/package/@novin-dev/formalite)
[![licence](https://img.shields.io/npm/l/@novin-dev/formalite)](https://www.npmjs.com/package/@novin-dev/formalite)
[![version](https://img.shields.io/npm/v/@novin-dev/formalite)](https://www.npmjs.com/package/@novin-dev/formalite)
[![last_commit](https://img.shields.io/github/last-commit/novin-develop/formalite)](https://github.com/novin-develop/formalite)

### [Website Link](https://formalite.novin.dev/)

### [Documents Link](https://formalite-docs.novin.dev/)

## Install

```
npm i --save @novin-dev/formalite
```

## Usage
a simple from widh one textView
```js
import React, { useMemo } from "react";
 import * as Yup from "yup";
 import {
   Formalite,
   ViewTypes,
   useFormaliteRef
 } from "@novin-dev/formalite";
 import type { MainType } from "@novin-dev/formalite";
 
 const validation = Yup.object({
   title: Yup.string().required(),
 });
 type ValidationType = Yup.InferType<typeof validation>;
 
 const iniValues: ValidationType = {
   title: "123",
 };
 
 export const TextView = () => {
   const formRef = useFormaliteRef<ValidationType>();
 
   const formString = useMemo<MainType>(() => {
     return {
       title: {
         type: ViewTypes.TextView,
         layoutProps: {
           md: 6,
           xs: 12,
         },
         mustRegex:
           /^([1-9]d*(.)d{1,4}|0?(.)d*[1-9]d*|0?|[1-9]d*|[1-9]d*(.))$/,
         inputProps: {
           label: "Title Input",
           helperText: "Helper text",
           placeholder: "some other title",
           onChange: (value) => {
             console.log(value);
           },
         },
       },
     };
   }, []);
 
   return (
     <Formalite<ValidationType>
       lang="en"
       formString={formString}
       initialValues={iniValues}
       validationSchema={validation}
       formRef={formRef}
       onSubmit={(values) => {
         console.log(values);
       }}
     />
   );
 };
```
[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/formalite-simple-3y170m?file=/src/App.tsx)
