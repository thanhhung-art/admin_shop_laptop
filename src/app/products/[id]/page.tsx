import AddDetails from "@/components/products/product/details";
import ShowImage from "@/components/products/product/selectImage";
import { Box, Container, Stack, Typography } from "@mui/material";

const data = {
  id: "abc",
  name: 'Acer Aspire 5 A515-56-347N Slim Laptop - 15.6" Full HD IPS Display - 11th Gen Intel i3-1115G4 Dual Core Processor - 8GB DDR4 - 128GB NVMe SSD - WiFi 6 - Amazon Alexa - Windows 11 Home in S Mode',
  price: 315.99,
  brand: 'acer',
  os: 'windows',
  ram: '16gb ram',
  cpu: 'intel core i7 1165G7',
  hardDrive: 'ssd 128gb',
  screen: '15.6 Inches',
  gpu: 'intel graphics xe',
  battery: '5 hours'
};

const page = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack direction="row" spacing={4}>
          <ShowImage />
          <AddDetails data={data} />
        </Stack>
      </Container>
    </Box>
  );
};

export default page;
