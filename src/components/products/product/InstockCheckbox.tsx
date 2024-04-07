import { IProduct } from "@/types/product";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useState, ChangeEvent } from "react";

interface IProps {
  data?: IProduct;
  onInputChange: (name: string, value: string | string[] | boolean) => void;
}

const InstockCheckbox = ({ data, onInputChange }: IProps) => {
  const [instock, setInstock] = useState<boolean>(
    () => data?.featured || false
  );

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange("instock", !instock);
    setInstock(!instock);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={instock}
          onChange={handleChangeValue}
          name="instock"
        />
      }
      label="Instock"
    />
  );
};

export default InstockCheckbox;
