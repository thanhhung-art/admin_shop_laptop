"use client";
import { IGetProducts, IGetProductsInfinity, IProduct } from "@/types/product";
import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsInfinity } from "@/utils/fetch";
import IconStar from "@heroicons/react/24/outline/StarIcon";
import IconStarSolid from "@heroicons/react/24/solid/StarIcon";

const ListProducts = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery<IGetProductsInfinity>(
      ["getProductsInfinity"],
      ({ pageParam = 0 }) => getProductsInfinity(pageParam),
      {
        getNextPageParam: (lastPage, allPage) => {
          return lastPage.data.nextPage === lastPage.data.lastPage
            ? undefined
            : lastPage.data.nextPage;
        },
        staleTime: 1000 * 60 * 5,
      }
    );

  if (isLoading) return <div>loading</div>;

  if (isError) {
    return <div>something went wrong</div>;
  }

  return (
    <>
      <Grid container>
        {data.pages
          .reduce((acc, curr) => {
            return acc.concat(curr.data.products);
          }, [] as IProduct[])
          .map((p) => (
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
                    <Box sx={{ position: "relative", height: 130, width: 290 }}>
                      <Image
                        src={p.img}
                        fill
                        alt="laptop image"
                        objectFit="contain"
                      />
                    </Box>
                  </Link>
                </Box>
                <Box
                  sx={{ display: "flex", justifyContent: "center", my: 0.5 }}
                >
                  <Box>
                    {[1, 2, 3, 4, 5].map((e) => (
                      <SvgIcon key={e} fontSize="small">
                        <IconStar />
                      </SvgIcon>
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
      <Stack direction="row" justifyContent="center">
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>show more</Button>
        )}
      </Stack>
    </>
  );
};

export default ListProducts;
