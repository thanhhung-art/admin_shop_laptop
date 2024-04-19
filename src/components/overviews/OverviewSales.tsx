import { Card, CardContent, CardHeader, Button } from "@mui/material";
import Chart from "../chart";

interface IProps {
  sx: object;
}

const OverviewSales = ({ sx }: IProps) => {
  return (
    <Card sx={sx}>
      <CardHeader title="Sales"></CardHeader>
      <CardContent>
        <Chart />
      </CardContent>
    </Card>
  );
};

export default OverviewSales;
