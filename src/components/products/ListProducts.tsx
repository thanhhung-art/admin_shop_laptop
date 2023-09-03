"use client";
import { IGetProducts } from "@/types/product";
import { Box, Card, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/fetch";

const ListProducts = () => {
  const { data, isLoading, isError } = useQuery<IGetProducts>(
    ["getProducts"],
    getProducts
  );

  if (isLoading) return <div>loading</div>;

  if (isError) {
    return <div>something went wrong</div>;
  }

  return (
    <Grid container>
      {data.data.map((p) => (
        <Grid item key={p._id} xs={3} sx={{ p: "5px" }}>
          <Card sx={{ p: 2 }}>
            <Box
              sx={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Link href={`/products/${p._id}`}>
                <Image
                  src={p.img}
                  width={180}
                  height={120}
                  alt="laptop image"
                />
              </Link>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 0.5 }}>
              <Box>
                {[1, 2, 3, 4, 5].map((e) => (
                  <svg
                    key={e}
                    width="20px"
                    height="20px"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FFA41C"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#FFA41C"
                    className=""
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                ))}
              </Box>
            </Box>
            <Typography
              align="center"
              fontSize="small"
              sx={{ maxWidth: "320px", margin: "auto" }}
            >
              {p.name.slice(0, 110) + " ..."}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListProducts;
