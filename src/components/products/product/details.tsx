"use client";
import { IProduct } from "@/types/product";
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
  MouseEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

interface IProps {
  data?: IProduct;
  onInputChange: ({ name, value }: { name: string; value: string }) => void;
  stocking: string;
  setStocking: Dispatch<SetStateAction<string>>;
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
  "hard disk",
  "screen",
  "cpu",
  "gpu",
  "battery",
  "camera",
  "color",
  "weight",
  "categories",
  "description",
  "instock",
];

const configure = [
  "ram",
  "hard disk",
  "operating system",
  "cpu",
  "gpu",
  "screen",
  "camera",
  "battery",
];

const Details = ({ data, onInputChange, stocking, setStocking }: IProps) => {
  const refs: IRefs = {
    refName: useRef<HTMLInputElement>(null),
    refPrice: useRef<HTMLInputElement>(null),
    refBrand: useRef<HTMLInputElement>(null),
    refOperatingSystem: useRef<HTMLInputElement>(null),
    refRam: useRef<HTMLInputElement>(null),
    refHardDisk: useRef<HTMLInputElement>(null),
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

  const camelCaseToSpaceCase = (text: string) => {
    if (text === "operating system") return "os";
    if (text === "hard disk") return "hardDisk";
    return text;
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
              defaultValue={
                data
                  ? configure.includes(e)
                    ? data.configure[camelCaseToSpaceCase(e)]
                    : data[e]
                  : ""
              }
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
