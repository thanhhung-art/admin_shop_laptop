import { Card, TextField, Box, Grid, Button } from "@mui/material";
import React from "react";

const SearchLaptop = () => {
  return (
    <Card sx={{ p: 2 }}>
      <Grid container>
        <Grid item xs={10}>
          <Box>
            <TextField
              size="small"
              label="search product"
              fullWidth
              sx={{ bordeRadius: 10 }}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>

          <Button sx={{ float: "right"}}>add product</Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SearchLaptop;
