'use client'
import SearchInput from "@/components/customers/SearchInput";
import TableCustomers from "@/components/customers/Table";
import { getUsers } from "@/utils/fetch";
import { GetCustomers } from "@/utils/keys";
import { ArrowDownOnSquareIcon, ArrowUpOnSquareIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";

const Customers = () => {
  const { data } = useQuery([GetCustomers], getUsers)

  return (
    <>
      <Head>
        <title>
          Customers
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Customers
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <SearchInput />
            { data && <TableCustomers data={data.data} />}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Customers;