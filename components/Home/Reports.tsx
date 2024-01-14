"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import { Box, Stack, Typography, Button, Divider, Chip } from "@mui/material";
import {
  getLeakageReports,
  createLeakageReport,
} from "@/services/leakage.service";
import ViewReport from "../Modal/ViewReport";
import AddNewReport from "../Modal/AddNewReport";

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isViewReportOpen, setIsViewReportOpen] = React.useState(false);
  const [isAddReportOpen, setIsAddReportOpen] = React.useState(false);
  const [pageData, setPageData] = React.useState<any>([]);
  const [selectedReport, setSelectedReport] = React.useState<any>({});
  const router = useRouter();

  const getRoomType = (type: any) => {
    switch (type) {
      case "bathroom":
        return "Bath Room";
      case "bedroom":
        return "Bed Room";
      default:
        return "Others";
    }
  };

  const handleAddNewReport = async ({
    flatNumber,
    roomType,
    description,
  }: any) => {
    alert(
      JSON.stringify({
        flatNumber,
        roomType,
        description,
      })
    );
    const token = localStorage.getItem("access_token");
    const { data, statusCode, detail } = await createLeakageReport({
      token,
      flat_number: flatNumber,
      room_type: roomType,
      description,
    });

    if (data && statusCode == 200) {
      setPageData([...pageData, data]);
    }
    if (statusCode != 200 && detail) {
      setError(detail);
    }
    setIsAddReportOpen(false);
  };

  const columns: any = [
    { id: "flat_number", label: "Flat Number", minWidth: 170 },
    {
      id: "room_type",
      label: "Room Type",
      minWidth: 100,

      format: (val: any) => (
        <Chip label={getRoomType(val)} color="primary" variant="outlined" />
      ),
    },
    {
      id: "timestamp",
      label: "Time",
      minWidth: 170,
      format: (value: number) =>
        new Date(value).toLocaleString("en-US", {
          day: "numeric",
          month: "numeric",
          year: "2-digit",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
    },
    {
      id: "report_id",
      label: "Report Id",
    },
    {
      id: "action",
      label: "Action",
      format: (val: any) => (
        <Button
          onClick={() => {
            setSelectedReport(val);
            setIsViewReportOpen(true);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const { data, statusCode, detail } = await getLeakageReports(token);
      if (data && statusCode == 200) {
        setPageData(data);
      }
      if (statusCode != 200 && detail) {
        setError(detail);
      }
    } else {
      router.push("/login");
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {error ? (
        <Alert severity="error" onClose={() => setError("")}>
          <Box>{error}</Box>
        </Alert>
      ) : null}
      <Box
        sx={{
          padding: "1rem",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{
            marginY: "1rem",
          }}
        >
          <Typography variant="h5">Leakage Reports</Typography>
          <Button onClick={() => setIsAddReportOpen(true)}>Add new</Button>
        </Stack>
        <Divider
          sx={{
            marginBottom: "2rem",
          }}
          variant="fullWidth"
        />

        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            border: "solid 1px rgba(0, 0, 0, 0.12)",
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column: any) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {pageData.length > 0 &&
                  pageData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, index: any) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={`${row.report_id}-${index}`}
                        >
                          {columns.map((column: any) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format &&
                                ["timestamp", "room_type", "action"].includes(
                                  column.id
                                )
                                  ? column.format(
                                      column.id == "action" ? row : value
                                    )
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={pageData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <ViewReport
          open={isViewReportOpen}
          data={selectedReport}
          onClose={() => {
            setIsViewReportOpen(false);
            setSelectedReport({});
          }}
        />
        <AddNewReport
          open={isAddReportOpen}
          onClose={() => setIsAddReportOpen(false)}
          onAddNewReport={handleAddNewReport}
        />
      </Box>
    </>
  );
}
