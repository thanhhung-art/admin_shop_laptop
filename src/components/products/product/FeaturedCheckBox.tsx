import { IProduct } from "@/types/product";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useState, ChangeEvent } from "react";

interface IProps {
  data?: IProduct;
  onInputChange: (name: string, value: string | string[] | boolean) => void;
}

const FeaturedCheckBox = ({ data, onInputChange }: IProps) => {
  const [featured, setFeatured] = useState<boolean>(
    () => data?.featured || false
  );

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange('featured', !featured)
    setFeatured(!featured)
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={featured}
          onChange={handleChangeValue}
          name="featured"
        />
      }
      label="Featured"
    />
  );
};

export default FeaturedCheckBox;
