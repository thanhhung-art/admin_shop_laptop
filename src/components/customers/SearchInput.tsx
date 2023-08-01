import { Box, Card, TextField } from "@mui/material";
import React from "react";

const SearchInput = () => {
  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ maxWidth: 500 }}>
        <TextField size="small" label="search user" fullWidth sx={{ bordeRadius: 10 }} />
      </Box>
    </Card>
  );
};

export default SearchInput;
