"use client";
import { getProducts } from "@/utils/fetch";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface IProps {
  sx: object;
}

const OverViewLatestProducts = ({ sx }: IProps) => {
  const { data, isLoading } = useQuery(["getProducts"], () => getProducts("latest"));
  const router = useRouter();

  if (isLoading) return <div>loading</div>

  if (!data) return <div>error</div>;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Products" />
      <List>
        {data.data.map((product, index) => {
          const hasDivider = index < data.data.length - 1;
          const dateObj = new Date(product.updatedAt);
          const hours = dateObj.getHours();
          const minutes = dateObj.getMinutes();
          const dateReformated = dateObj.toLocaleDateString(
            navigator.language,
            {
              year: "numeric",
              day: "2-digit",
              month: "2-digit",
            }
          );
          const ago = `Updated on ${hours}: ${minutes} - ${dateReformated}`;

          return (
            <ListItem divider={hasDivider} key={product._id}>
              <ListItemAvatar>
                {product.img ? (
                  <Box
                    component="img"
                    src={product.img}
                    sx={{
                      borderRadius: 1,
                      height: 28,
                      width: 48,
                      objectFit: "contain",
                    }}
                  ></Box>
                ) : (
                  <Box
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "neutral.200",
                      height: 48,
                      width: 48,
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={`${product.name.slice(0, 40)}...`}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondary={`${ago}`}
                secondaryTypographyProps={{ variant: "body2" }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
          onClick={() => {
            router.push("/products");
          }}
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

export default OverViewLatestProducts;
