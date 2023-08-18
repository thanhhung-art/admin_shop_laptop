"use client";
import { calcXsItem } from "@/utils/calcXsItems";
import {
  Button,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  useRef,
  useState,
  MouseEvent,
  ChangeEvent,
  MutableRefObject,
  RefObject,
} from "react";

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
    weight: string;

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
  onInputChange: ({ name, value }: { name: string; value: string }) => void;
}

interface IRefs {
  [key: string]: any;
}

const details = [
  "name",
  "price",
  "brand",
  "operating system",
  "ram",
  "hard drive",
  "screen",
  "cpu",
  "gpu",
  "battery",
  "color",
  "weight",
  "categories",
  "description",
  "instock",
];

const Details = ({ data, onInputChange }: IProps) => {
  const [stocking, setStocking] = useState("stocking");

  const refs: IRefs = {
    refName: useRef<HTMLInputElement>(null),
    refPrice: useRef<HTMLInputElement>(null),
    refBrand: useRef<HTMLInputElement>(null),
    refOs: useRef<HTMLInputElement>(null),
    refRam: useRef<HTMLInputElement>(null),
    refHardDrive: useRef<HTMLInputElement>(null),
    refScreen: useRef<HTMLInputElement>(null),
    refCpu: useRef<HTMLInputElement>(null),
    refGpu: useRef<HTMLInputElement>(null),
    refBattery: useRef<HTMLInputElement>(null),
    refCategories: useRef<HTMLInputElement>(null),
    refColor: useRef<HTMLInputElement>(null),
    refDesc: useRef<HTMLInputElement>(null),
    refWeight: useRef<HTMLInputElement>(null),
  };

  const handleStocking = (e: MouseEvent<HTMLElement>, isStocking: string) => {
    setStocking(isStocking);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    onInputChange({ name, value });
  };

  const spaceCaseToCamelCase = (text: string) => {
    const words = text.split(" ");
    const camelCaseWords = ["ref"];

    for (const word of words) {
      camelCaseWords.push(word[0].toUpperCase() + word.slice(1));
    }

    return camelCaseWords.join("");
  };

  return (
    <Grid container spacing={2} sx={{ flex: 1 }}>
      {details.map((e) => (
        <Grid key={e} item xs={calcXsItem(e)}>
          {e === "instock" ? (
            <ToggleButtonGroup
              value={stocking}
              onChange={handleStocking}
              exclusive
            >
              <ToggleButton value="stocking">stocking</ToggleButton>
              <ToggleButton value="out of stock">out of stock</ToggleButton>
            </ToggleButtonGroup>
          ) : (
            <TextField
              onChange={handleChange}
              name={e}
              ref={refs[spaceCaseToCamelCase(e)]}
              fullWidth
              defaultValue={data ? data.name : ""}
              label={e}
              multiline
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default Details;
