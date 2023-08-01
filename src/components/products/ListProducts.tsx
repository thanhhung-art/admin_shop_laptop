import React from "react";
import { IPropduct } from "@/types/product";
import ImageLaptop from "@/images/71+1lOl1Y1L._AC_SX466_.jpg";
import { Box, Card, Grid, Typography } from "@mui/material";
import Image from "next/image";

const data = [] as IPropduct[];
let currId = "id";
for (let i = 0; i < 10; i++) {
  data.push({
    id: currId + i,
    image: ImageLaptop,
    name: "Laptop Acer Swift 3 SF314-512-52MZ - Intel Core i5 - 1240P ",
    rating: 5,
  });
}

const ListProducts = () => {
  return (
    <Grid container>
      {data.map((p) => (
        <Grid item key={p.id} xs={3} sx={{ p: '5px' }}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ margin: "auto", display: "flex", justifyContent: "center", alignContent: "center" }}>
              <Image src={p.image} width={140} alt="laptop image" />
            </Box>
            <Typography align="center" fontSize="small" sx={{ maxWidth: "250px", margin: "auto" }}>{p.name}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListProducts;
