"use client";

import { IProduct } from "@/types/product";
import { FormGroup, Grid, TextField } from "@mui/material";
import { ChangeEvent, useEffect, createRef, useMemo, RefObject } from "react";
import { calcXsItem } from "@/utils/calcXsItems";
import Categories from "./categories";
import FeaturedCheckBox from "./FeaturedCheckBox";
import InstockCheckbox from "./InstockCheckbox";
import Color from "./addColor";
import { TOnInputChange } from "@/views/product/productDetails";

interface IProps {
  data?: IProduct;
  onInputChange: TOnInputChange
  refresh?: boolean;
}

const fields = [
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
  "weight",
  "description",
  "categories",
  "color",
];

function spaceCaseToCamelCase(text: string) {
  if (text === "operating system") return "os";
  if (text === "hard disk") return "hardDisk";
  return text;
}

const Details = ({ data, onInputChange, refresh }: IProps) => {
  const refs = useMemo(
    () =>
      new Map<string, RefObject<HTMLInputElement>>(
        fields.map((field) => [field, createRef<HTMLInputElement>()])
      ),
    []
  );

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name: string = spaceCaseToCamelCase(e.target.name);
    let value: string | string[] | boolean = e.target.value;

    onInputChange(name, value);
  };

  useEffect(() => {
    if (refresh) {
      refs.forEach((value) => {
        if (value.current) value.current.value = "";
      });
    }
  }, [refresh, refs]);

  return (
    <Grid container spacing={2} sx={{ flex: 1 }}>
      {Array.from(refs).map(([key, ref]) => {
        return (
          <Grid item key={key} xs={calcXsItem(key)}>
            {(() => {
              switch (key) {
                case "categories":
                  return (
                    <Categories data={data} onInputChange={onInputChange} />
                  );
                case "color":
                  return <Color colorsProp={data?.colors} onInputChange={onInputChange} />;
                case "price":
                default:
                  return (
                    <TextField
                      inputRef={ref}
                      type={key === "price" ? "number" : "text"}
                      onChange={handleInputValueChange}
                      name={key}
                      fullWidth
                      defaultValue={
                        data
                          ? data[
                              spaceCaseToCamelCase(key) as keyof typeof data
                            ] ||
                            data.configure[
                              spaceCaseToCamelCase(
                                key
                              ) as keyof typeof data.configure
                            ]
                          : ""
                      }
                      label={key}
                      multiline
                    />
                  );
              }
            })()}
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <FormGroup>
          <FeaturedCheckBox data={data} onInputChange={onInputChange} />
          <InstockCheckbox data={data} onInputChange={onInputChange} />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default Details;
