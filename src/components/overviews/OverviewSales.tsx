import { Card, CardContent, CardHeader, Button } from "@mui/material";
import Chart from "../chart";

interface IProps {
  sx: object,
  data: object
}

const OverviewSales = ({ sx, data }: IProps) => {
  return (
    <Card sx={sx}>
      <CardHeader title="Sales"></CardHeader>
      <CardContent>
        <Chart data={data} />
      </CardContent>
    </Card>
  );
};

export default OverviewSales;
