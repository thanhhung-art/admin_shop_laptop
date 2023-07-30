"use client";
import React, { createRef, forwardRef, useEffect, useRef } from "react";
import ChartJS, { Chart as ChartType} from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
import { Box } from "@mui/material";

interface IProps {
  data: object
}

const Chart = ({ data }: IProps) => {
  const acquisitionsRef = createRef<HTMLCanvasElement>();
  const chartElem = useRef<ChartType | null>(null)

  useEffect(() => {
    (async function () {
      const data = [
        { month: 1, count: 100 },
        { month: 2, count: 200 },
        { month: 3, count: 150 },
        { month: 4, count: 250 },
        { month: 5, count: 220 },
        { month: 6, count: 300 },
        { month: 7, count: 300 },
        { month: 8, count: 280 },
        { month: 9, count: 170 },
        { month: 10, count: 160 },
        { month: 11, count: 250 },
        { month: 12, count: 290 },
      ];
      if (acquisitionsRef.current) {
        if (chartElem.current) {
          chartElem.current.destroy()
        }
        chartElem.current = new ChartJS(acquisitionsRef.current, {
          type: "bar",
          data: {
            labels: data.map((row) => row.month),
            datasets: [
              {
                label: "Sales by month",
                data: data.map((row) => row.count),
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                min: 0,
                ticks: {
                  stepSize: 100
                }
              }
            }
          }
        });
      }
    })();
  }, [acquisitionsRef]);

  return (
    <Box>
      <canvas style={{ maxHeight: 400 }} id="acquisitions" ref={acquisitionsRef}></canvas>
    </Box>
  );
};

export default Chart;
