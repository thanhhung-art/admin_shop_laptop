"use client";
import { IProduct } from "@/types/product";
import {
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  MouseEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  createRef,
  useMemo,
} from "react";
import { calcXsItem } from "@/utils/calcXsItems";

interface IProps {
  data?: IProduct;
  onInputChange: ({ name, value }: { name: string; value: string }) => void;
  stocking: string;
  setStocking: Dispatch<SetStateAction<string>>;
  refresh?: boolean;
}

const Details = ({
  data,
  onInputChange,
  stocking,
  setStocking,
  refresh,
}: IProps) => {
  const refs = useMemo(() => new Map(), []);
  refs.set("name", createRef<HTMLInputElement>());
  refs.set("price", createRef<HTMLInputElement>());
  refs.set("brand", createRef<HTMLInputElement>());
  refs.set("operating system", createRef<HTMLInputElement>());
  refs.set("ram", createRef<HTMLInputElement>());
  refs.set("hard disk", createRef<HTMLInputElement>());
  refs.set("screen", createRef<HTMLInputElement>());
  refs.set("cpu", createRef<HTMLInputElement>());
  refs.set("gpu", createRef<HTMLInputElement>());
  refs.set("battery", createRef<HTMLInputElement>());
  refs.set("camera", createRef<HTMLInputElement>());
  refs.set("color", createRef<HTMLInputElement>());
  refs.set("weight", createRef<HTMLInputElement>());
  refs.set("categories", createRef<HTMLInputElement>());
  refs.set("description", createRef<HTMLInputElement>());

  const handleStocking = (e: MouseEvent<HTMLElement>, isStocking: string) => {
    setStocking(isStocking);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    onInputChange({ name, value });
  };

  function spaceCaseToCamelCase(text: string) {
    if (text === "operating system") return "os";
    if (text === "hard disk") return "hardDisk";
    return text;
  }

  useEffect(() => {
    if (refresh) {
      refs.forEach((value, key) => {
        value.current.value = "";
      });
    }
  }, [refresh, refs]);

  return (
    <Grid container spacing={2} sx={{ flex: 1 }}>
      {Array.from(refs).map(([key, ref]) => (
        <Grid item key={key} xs={calcXsItem(key)}>
          <TextField
            inputRef={ref}
            onChange={handleChange}
            name={key}
            fullWidth
            defaultValue={
              data
                ? data[spaceCaseToCamelCase(key)] ||
                  data.configure[spaceCaseToCamelCase(key)]
                : ""
            }
            label={key}
            multiline
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <ToggleButtonGroup value={stocking} onChange={handleStocking} exclusive>
          <ToggleButton value="stocking">stocking</ToggleButton>
          <ToggleButton value="out of stock">out of stock</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Details;
