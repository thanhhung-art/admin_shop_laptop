"use client";
import { Card, Box, Button } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, MutableRefObject, useEffect, useState } from "react";

interface IProps {
  img?: string;
  base64Img: MutableRefObject<string | ArrayBuffer | null>
  refresh?: boolean
}

const ShowImage = ({ base64Img, img, refresh }: IProps) => {
  const [imgSrc, setImgSrc] = useState<string | null>(() => img ? img : null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        base64Img.current = reader.result;
      };
      reader.readAsDataURL(file);
      const fileURL = URL.createObjectURL(file);
      setImgSrc(fileURL);
    }
  };

  useEffect(() => {
    if (refresh) {
      setImgSrc(null);
    }
  }, [refresh])

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
            background: `${imgSrc ? "none" : "#ccc"}`,
            minWidth: 400,
            minHeight: 280,
          }}
        >
          {imgSrc && (
            <Image
              src={imgSrc}
              alt="preview image"
              width={400}
              height={270}
              style={{ objectFit: 'contain' }}
              priority
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
