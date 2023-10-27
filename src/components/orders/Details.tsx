import { Box, List, ListItem, Stack, Typography } from "@mui/material";

interface IProps {
  id: string;
  customerName: string;
  date: string;
  totalAmount: number;
  status: string;
  payment: string;
  phone: string;
  email?: string;
  address: string;
  address2?: string;
  note: string;
}

const Details = ({
  id,
  customerName,
  date,
  totalAmount,
  status,
  payment,
  phone,
  address,
  address2,
  note,
  email,
}: IProps) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" component="h4" sx={{ fontSize: "20px" }}>
        Details
      </Typography>
      <List>
        <ListItem>
          <Typography
            variant="h6"
            component="h2"
            fontSize={15}
            sx={{ minWidth: 110 }}
            fontWeight="bold"
          >
            ID
          </Typography>
          <Typography variant="h6" component="h2" fontSize={14}>
            {id}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography
            variant="h6"
            component="h2"
            fontSize={15}
            sx={{ minWidth: 110 }}
            fontWeight="bold"
          >
            Customer
          </Typography>
          <Typography variant="h6" component="h2" fontSize={14}>
            {customerName}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography
            variant="h6"
            component="h2"
            fontSize={15}
            sx={{ minWidth: 110 }}
            fontWeight="bold"
          >
            phone
          </Typography>
          <Typography variant="h6" component="h2" fontSize={14}>
            {phone}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography
            variant="h6"
            component="h2"
            fontSize={15}
            sx={{ minWidth: 110 }}
            fontWeight="bold"
          >
            Email
          </Typography>
          <Typography variant="h6" component="h2" fontSize={14}>
            {email}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography
            variant="h6"
            component="h2"
            fontSize={15}
            sx={{ minWidth: 110 }}
            fontWeight="bold"
          >
            Date
          </Typography>
          <Typography variant="h6" component="h2" fontSize={14}>
            {date}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography
            variant="h6"
            component="h2"
            fontSize={15}
            sx={{ minWidth: 110 }}
            fontWeight="bold"
          >
            Total Amount
          </Typography>
          <Typography variant="h6" component="h2" fontSize={14}>
            ${totalAmount}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography
            variant="h6"
            component="h2"
            fontSize={16}
            sx={{ minWidth: 110 }}
            fontWeight="bold"
          >
            Payment
          </Typography>
          <Typography variant="h6" component="h2" fontSize={14}>
            {payment}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography
            variant="h6"
            component="h2"
            fontSize={16}
            sx={{ minWidth: 110 }}
            fontWeight="bold"
          >
            Address
          </Typography>
          <Typography variant="h6" component="h2" fontSize={14}>
            {address}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography
            variant="h6"
            component="h2"
            fontSize={16}
            sx={{ minWidth: 110 }}
            fontWeight="bold"
          >
            Address 2
          </Typography>
          <Typography variant="h6" component="h2" fontSize={14}>
            {address2}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography
            variant="h6"
            component="h2"
            fontSize={16}
            sx={{ minWidth: 110 }}
            fontWeight="bold"
          >
            Note
          </Typography>
          <Typography variant="h6" component="h2" fontSize={14}>
            {note}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography
            variant="h6"
            component="h2"
            fontSize={15}
            sx={{ minWidth: 110 }}
            fontWeight="bold"
          >
            Status
          </Typography>
          <Typography variant="h6" component="h2" fontSize={14}>
            {status}
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default Details;