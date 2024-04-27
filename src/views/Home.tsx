import OverViewLatestProducts from "@/components/overviews/OverViewLatestProducts";
import OverviewBudget from "@/components/overviews/OverviewTotalProducts";
import { OverviewLatestOrders } from "@/components/overviews/OverviewLatestOrders";
import OverviewSales from "@/components/overviews/OverviewSales";
import OverviewOrdersPending from "@/components/overviews/OverviewOrdersPending";
import OverviewTotalOrders from "@/components/overviews/OverviewTotalOrders";
import OverviewTotalRevenue from "@/components/overviews/OverviewTotalRevenue";
import { Box, Container, Grid } from "@mui/material";
import Head from "next/head";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Overview | Admin Page</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: "100%" }}
                value="$24k"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <OverviewTotalOrders
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value="1.6k"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <OverviewOrdersPending sx={{ height: "100%" }} />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <OverviewTotalRevenue sx={{ height: "100%" }} value={75.5} />
            </Grid>
            <Grid item xs={12}>
              <Suspense fallback={<div>loading</div>}>
                <OverviewSales sx={{ height: "100%" }} />
              </Suspense>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OverViewLatestProducts sx={{ height: "100%" }} />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <OverviewLatestOrders sx={{ height: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
