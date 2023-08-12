"use client";
import {
  Button,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useRef, useState, MouseEvent } from "react";

interface IProps {
  data?: {
    name: string;
    price: number;
    desc: string;
    instock: string;
    img: string;
    categories: string[];
    rating?: number;
    color: string[];
    brand: string;

    configure: {
      ram: string;
      hardDisk: string;
      cpu: string;
      gpu: string;
      screen: string;
      camera: string;
      battery: string;
      os: string;
    };
  };
}

const Details = ({ data }: IProps) => {
  const refName = useRef<HTMLInputElement>(null);
  const refPrice = useRef<HTMLInputElement>(null);
  const refBrand = useRef<HTMLInputElement>(null);
  const refOs = useRef<HTMLInputElement>(null);
  const refRam = useRef<HTMLInputElement>(null);
  const refHardDisk = useRef<HTMLInputElement>(null);
  const refScreen = useRef<HTMLInputElement>(null);
  const refCpu = useRef<HTMLInputElement>(null);
  const refGpu = useRef<HTMLInputElement>(null);
  const refBattery = useRef<HTMLInputElement>(null);
  const refCategories = useRef<HTMLInputElement>(null);
  const refColor = useRef<HTMLInputElement>(null);
  const refDesc = useRef<HTMLInputElement>(null);
  const refWeight = useRef<HTMLInputElement>(null);
  const [stocking, setStocking] = useState("stocking");

  const handleStocking = (e: MouseEvent<HTMLElement>, isStocking: string) => {
    setStocking(isStocking);
  };

  const styles = {
    root: {
      background: "blue",
    },
    "&.Mui-checked": {
      background: "white",
    },
  };

  return (
    <Grid container spacing={2} sx={{ flex: 1 }}>
      <Grid item xs={12}>
        <TextField
          ref={refName}
          fullWidth
          defaultValue={data ? data.name : ""}
          label="Name"
          multiline
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          ref={refPrice}
          fullWidth
          defaultValue={data ? data.price : ""}
          label="Price"
          type="number"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          ref={refBrand}
          fullWidth
          defaultValue={data ? data.brand : ""}
          label="Brand"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          ref={refOs}
          fullWidth
          defaultValue={data ? data.configure.os : ""}
          label="Operating System"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          ref={refRam}
          fullWidth
          defaultValue={data ? data.configure.ram : ""}
          label="Ram"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          ref={refHardDisk}
          fullWidth
          defaultValue={data ? data.configure.hardDisk : ""}
          label="Hard Drive"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          ref={refScreen}
          fullWidth
          defaultValue={data ? data.configure.screen : ""}
          label="Screen"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          ref={refCpu}
          fullWidth
          defaultValue={data ? data.configure.cpu : ""}
          label="Cpu"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          ref={refGpu}
          fullWidth
          defaultValue={data ? data.configure.gpu : ""}
          label="Gpu"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          ref={refBattery}
          fullWidth
          defaultValue={data ? data.configure.battery : ""}
          label="Battery"
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          ref={refColor}
          fullWidth
          defaultValue={data ? data.color.toString() : ""}
          label="colors"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          ref={refWeight}
          fullWidth
          defaultValue={data ? data.color.toString() : ""}
          label="weight"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          ref={refCategories}
          fullWidth
          defaultValue={data ? data.categories : ""}
          label="categories"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          ref={refDesc}
          fullWidth
          defaultValue={data ? data.desc : ""}
          label="description"
          multiline
        />
      </Grid>
      <Grid item xs={12}>
        <ToggleButtonGroup value={stocking} onChange={handleStocking} exclusive>
          <ToggleButton value="stocking">stocking</ToggleButton>
          <ToggleButton value="out of stock">out of stock</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item xs={12}>
        <Button sx={{ float: "right" }} variant="contained">
          {data ? "edit product" : "add product"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Details;
