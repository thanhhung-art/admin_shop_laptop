"use client";
import { ICustomer } from "@/types/customer";
import { convertTime } from "@/utils/convertTime";
import { getUsers } from "@/utils/fetch";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  data: ICustomer[];
}

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "all",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    label: "username",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "email",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "location",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "phone",
  },
  {
    id: "signed up",
    numeric: false,
    disablePadding: false,
    label: "signed up",
  },
];

const TableCustomers = ({ data }: IProps) => {
  const customers = useQuery(['getCustomers'], getUsers )

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "normal"}
                  //sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                  // active={orderBy === headCell.id}
                  // direction={orderBy === headCell.id ? order : 'asc'}
                  // onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null} */}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              return (
                <TableRow key={row.username} role="checkbox">
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      //checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": "test",
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={"test"}
                    scope="row"
                    padding="none"
                  >
                    {row._id}
                  </TableCell>
                  <TableCell align="left">{row.username}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.address || 'unknow'}</TableCell>
                  <TableCell align="left">{row.phone || 'unknow'}</TableCell>
                  <TableCell align="left">{convertTime(row.createdAt)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={8}
        page={1}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Card>
  );
};

export default TableCustomers;
