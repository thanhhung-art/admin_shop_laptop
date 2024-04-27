"use client";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetSales } from "@/utils/keys";
import { getSales } from "@/utils/fetch";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, CircularProgress } from "@mui/material";

const Chart = () => {
  const { data, isLoading } = useQuery([GetSales], () => getSales(2024));

  const saleByMonth = useMemo(() => {
    if (data?.data && data.data.length)
      return data.data.map((e) => e.totalSales);
    return Array(12).fill(0);
  }, [data]);

  const months = useMemo(() => {
    if (data?.data && data.data.length)
      return data.data.map((e) => "month " + e._id.month);
    return [];
  }, [data]);

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: months,
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: saleByMonth,
        },
      ]}
      height={300}
    />
  );
};

export default Chart;
