import { IProduct } from "@/types/product";
import { Box, Button, Chip, Stack, TextField } from "@mui/material";
import { useState, createRef } from "react";

interface IProps {
  data?: IProduct;
  onInputChange: (name: string, value: string | string[] | boolean) => void;
}

const Categories = ({ data, onInputChange }: IProps) => {
  const [categories, setCategories] = useState<string[]>(
    () => data?.categories || []
  );
  const addCategoryRef = createRef<HTMLInputElement>();

  const handleAddCategory = () => {
    if (addCategoryRef.current?.value) {
      const temp = [...categories, addCategoryRef.current.value.toLowerCase()];
      setCategories(temp);
      onInputChange("categories", temp);
      addCategoryRef.current.value = "";
    }
  };

  const handleRemoveCategory = (value: string) => {
    const index = categories.indexOf(value);
    if (index > -1) {
      categories.splice(index, 1);
      setCategories([...categories]);
      onInputChange("categories", categories);
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap='wrap' useFlexGap>
      {data &&
        categories.map((e, i) => (
          <Box key={i}>
            <Chip
              color="primary"
              label={e}
              onDelete={() => handleRemoveCategory(e)}
            ></Chip>
          </Box>
        ))}
      <Stack direction="row" alignItems="center">
        <TextField inputRef={addCategoryRef} size="small" sx={{ width: 150 }} />
        <Button variant="contained" onClick={handleAddCategory}>
          add{" "}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Categories;
