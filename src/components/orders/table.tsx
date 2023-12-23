"use client";
import {
  useState,
  MouseEvent,
  ChangeEvent,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@heroicons/react/24/solid/TrashIcon";
import { visuallyHidden } from "@mui/utils";
import { IOrder } from "@/types/order";
import { Chip } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Fetch } from "@/utils/fetch";
import { AxiosRequestConfig } from "axios";

interface IProps {
  orders: IOrder[];
  handleToggleDrawer: (thisOrderId: string) => void;
  setCurrOrderId: Dispatch<SetStateAction<string>>;
}

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: keyof IOrder;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "username",
    numeric: false,
    disablePadding: true,
    label: "name",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "phone",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "address",
  },
  {
    id: "totalPrice",
    numeric: true,
    disablePadding: false,
    label: "price",
  },
  {
    id: "payment",
    numeric: true,
    disablePadding: false,
    label: "payment",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "status",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof IOrder) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof IOrder) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleDeleteOrders: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, handleDeleteOrders } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          All orders
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <Box sx={{ cursor: "pointer" }} onClick={handleDeleteOrders}>
            <DeleteIcon width={20} height={20} />
          </Box>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton></IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
export default function EnhancedTable({
  orders,
  handleToggleDrawer,
  setCurrOrderId,
}: IProps) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IOrder>("createdAt");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const deleteOrdersMutation = useMutation({
    mutationFn: (data: AxiosRequestConfig<{ ids: readonly string[] }>) => {
      return Fetch.delete("/orders", data);
    },
  });

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof IOrder
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = orders.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleColorStatusOrder = (
    status: "string" | "shipped" | "pending" | "cancelled"
  ) => {
    if (status === "pending") return "secondary";
    if (status === "cancelled") return "error";

    return "primary";
  };

  const handleDelete = () => {
    if (selected.length > 0) {
      deleteOrdersMutation.mutate({ data: { ids: selected } });
    }
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const visibleRows = useMemo(
    () =>
      orders
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .sort((a, b) => {
          const date = new Date(a.createdAt).getTime();
          const date2 = new Date(b.createdAt).getTime();

          if (date2 < date) {
            return -1;
          }
          if (date2 > date) {
            return 1;
          }
          return 0;
        }),
    [page, rowsPerPage, orders]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDeleteOrders={handleDelete}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={orders.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;
                const color = handleColorStatusOrder(
                  row.status as "pending" | "shipped" | "cancelled"
                );

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row._id)}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.username}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleToggleDrawer(row._id), setCurrOrderId(row._id);
                      }}
                      align="right"
                    >
                      {row.phone}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleToggleDrawer(row._id), setCurrOrderId(row._id);
                      }}
                      align="right"
                    >
                      {row.address}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleToggleDrawer(row._id), setCurrOrderId(row._id);
                      }}
                      align="right"
                    >
                      {row.totalPrice}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleToggleDrawer(row._id), setCurrOrderId(row._id);
                      }}
                      align="left"
                    >
                      <Typography>
                        {row.payment.includes("credit_card")
                          ? "Credit Card"
                          : "COD"}
                      </Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleToggleDrawer(row._id), setCurrOrderId(row._id);
                      }}
                      align="right"
                    >
                      <Chip label={row.status} color={color} />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
