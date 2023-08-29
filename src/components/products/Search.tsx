import { Card, TextField, Box, Grid, Button } from "@mui/material";
import Link from "next/link";

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
          <Link href="/products/add_product">
            <Button variant='contained' sx={{ float: "right"}}>add product</Button>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SearchLaptop;
