import { TOnInputChange } from "@/views/product/productDetails";
import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import React, {
  ChangeEvent,
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";

interface IProps {
  colorsProp?: { color: string; quantity: number }[];
  onInputChange: TOnInputChange
}

const Color = ({ colorsProp, onInputChange }: IProps) => {
  const [colors, setColors] = useState<{ color: string; quantity: number }[]>(
    () => colorsProp || []
  );

  const refs = useRef(new Map<string, RefObject<HTMLInputElement>>());
  const addColorRef = createRef<HTMLInputElement>();
  const addQuantityRef = createRef<HTMLInputElement>();

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenCloseDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleDelete = (value: string) => {
    const index = colors.findIndex((e) => e.color === value);
    if (index > -1) {
      colors.splice(index, 1);
      setColors([...colors]);
      onInputChange('colors', colors)
    }
  };

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const index = colors.findIndex((e) => e.color === name);
    if (index > -1) {
      colors[index].quantity = Number(value);
      onInputChange('colors', colors)
    }
  };

  const hanldeAddColor = () => {
    if (addColorRef.current && addQuantityRef.current) {
      let color = addColorRef.current.value || "";
      let quantity = Number(addQuantityRef.current.value) || 0;

      if (color && quantity) {
        colors.push({ color, quantity });
        refs.current.set(color, createRef<HTMLInputElement>())
        setColors([...colors]);
        onInputChange('colors', colors)
      }

      addColorRef.current.value = "";
      addQuantityRef.current.value = "";
    }
  };

  useEffect(() => {
    colors.forEach(({ color }) => {
      refs.current.set(color, createRef<HTMLInputElement>());
    });
  }, [colors]);

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center">
        {colors.map((e, i) => (
          <Chip
            label={`${e.color} ${e.quantity}`}
            onDelete={() => handleDelete(e.color)}
            key={i}
            color="primary"
          />
        ))}
        <Box>
          <Button
            variant="contained"
            size="small"
            sx={{ width: "max-content" }}
            onClick={handleOpenCloseDialog}
          >
            add / update color
          </Button>
        </Box>
      </Stack>
      <Dialog onClose={handleOpenCloseDialog} open={openDialog}>
        <Card sx={{ p: 4 }}>
          <DialogTitle>Add / Update color</DialogTitle>
          <Stack spacing={2}>
            {colors.map((e) => (
              <Stack direction="row" spacing={2} key={e.color}>
                <TextField value={e.color} />
                <TextField
                  defaultValue={e.quantity}
                  inputRef={refs.current.get(e.color)}
                  name={`${e.color}`}
                  onChange={handleChangeColor}
                  type="number"
                />
              </Stack>
            ))}
            <Stack direction="row" spacing={2}>
              <TextField
                inputRef={addColorRef}
                name="addColor"
                placeholder="add color"
              />
              <TextField
                inputRef={addQuantityRef}
                name="addQuantity"
                placeholder="add quantity"
              />
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button variant="contained" fullWidth onClick={hanldeAddColor}>
                add
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Dialog>
    </>
  );
};

export default Color;
