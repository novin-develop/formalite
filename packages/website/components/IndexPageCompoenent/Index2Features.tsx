import { Grid } from "@mui/material";
import * as React from "react";


export const Index2Features = () => {
  return (
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
  )
}
