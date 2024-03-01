"use client";
import React, { Suspense, createRef, useEffect, useRef } from "react";
import ChartJS, { Chart as ChartType } from "chart.js/auto";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GetSales } from "@/utils/keys";
import { getSales } from "@/utils/fetch";

const Chart = () => {
  const acquisitionsRef = createRef<HTMLCanvasElement>();
  const chartElem = useRef<ChartType | null>(null);

  const { data } = useQuery([GetSales], () => getSales(2024));

  useEffect(() => {
    (async function () {
      if (acquisitionsRef.current && data) {
        if (chartElem.current) {
          chartElem.current.destroy();
        }
        chartElem.current = new ChartJS(acquisitionsRef.current, {
          type: "bar",
          data: {
            labels: data.data.map((row) => row._id.month),
            datasets: [
              {
                label: "Sales by month",
                data: data.data.map((row) => row.totalSales),
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                min: 0,
                ticks: {
                  stepSize: 1000,
                },
              },
            },
          },
        });
      }
    })();
  }, [acquisitionsRef, data]);

  return (
    <Suspense fallback={<div>loading</div>}>
      <Box>
        <canvas
          style={{ maxHeight: 400 }}
          id="acquisitions"
          ref={acquisitionsRef}
        ></canvas>
      </Box>
    </Suspense>
  );
};

export default Chart;
