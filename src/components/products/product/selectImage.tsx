"use client";
import { Card, Box, Button } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

const ShowImage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const base64Image = useRef<string | ArrayBuffer | null>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        base64Image.current = reader.result;
      };
      reader.readAsDataURL(file);
      const fileURL = URL.createObjectURL(file);
      setImageSrc(fileURL);
    }
  };

  return (
    <Box>
      <Card
        sx={{
          marginBottom: 4,
          p: 2,
        }}
      >
        <Box
          sx={{
            background: `${imageSrc ? "none" : "#ccc"}`,
            minWidth: 400,
            minHeight: 280,
          }}
        >
          {imageSrc && (
            <Image
              src={imageSrc}
              alt="preview image"
              width={400}
              height={280}
            />
          )}
        </Box>
      </Card>
      <Button variant="contained" fullWidth>
        <label htmlFor="select_file" style={{ width: "100%" }}>
          Upload Image
        </label>
        <input
          id="select_file"
          type="file"
          accept="image/"
          hidden
          onChange={handleChange}
        />
      </Button>
    </Box>
  );
};

export default ShowImage;
