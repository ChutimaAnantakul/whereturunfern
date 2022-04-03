import React, { useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
// import TablePagination from "@material-ui/core/TablePagination";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { saveAs } from "file-saver";

// icon
import EventIcon from "@mui/icons-material/Event";

//lodergrapghl\
const approvaluploadsQueries = loader("../graphql/queries/approvaluploads.gql");

const ApprovalUpload = ({ history }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: "100%",
    },
    flink: {
      color:"#0000FF",
    },
  });

  const classes = useStyles();
  

  const { error, loading, data } = useQuery(approvaluploadsQueries);

  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }

  // const saveFile = () => {
  //   saveAs(
  //     fi
  //   );
  // };

  return (
    <Box xs={12} sx={{ display: "flex" }}>
      <Topbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          bgcolor: "#EDEEF7",
        }}
      >
        <Toolbar />
        <Container>
          <Card
            sx={{
              p: 2,
              // mx: { xs: 2, lg: 12 },
              mt: 2,
              mb: 4,
              borderRadius: "12px",
              // boxShadow: 7,
            }}
          >
            <Box component="section">
              <Container>
                <Grid
                  item
                  xs={12}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Card
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      mb: 2,
                      bgcolor: "#98BAE7",
                      color: "primary.contrastText",
                      width: "100%",
                      //   boxShadow: 2,
                    }}
                    fullWidth
                  >
                    <CardContent>
                      <h2>ตารางรายการอนุมัติสิทธิ์ผู้จัดงาน</h2>
                    </CardContent>
                  </Card>
                </Grid>
              </Container>
            </Box>
            <Box component="section">
              <Container>
                <Grid
                  item
                  xs={12}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Card
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      mb: 4,
                      width: "100%",
                      //   boxShadow: 2,
                    }}
                    className={classes.root}
                    fullWidth
                  >
                    <Paper className={classes.root}>
                      <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <div>
                                  <h6>ชื่อผู้ใช้งาน</h6>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <h6>ชื่องาน</h6>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <h6>ไฟล์สำเนาบัตรประชาชน</h6>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <h6>ไฟล์งานวิ่ง</h6>
                                </div>
                              </TableCell>

                              <TableCell align="center">
                                <div>
                                  <h6>Action</h6>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.uploads.nodes
                              // .map((requestapprovals) => (

                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((uploads) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                  <TableCell align="left">
                                    <div>
                                      <h6>
                                        {uploads.user.firstname}
                                        &nbsp;{uploads.user.lastname}
                                      </h6>
                                    </div>
                                  </TableCell>
                                  <TableCell align="left">
                                    <div>
                                      <h6>
                                        {uploads.event.eventnameTh}
                                      </h6>
                                    </div>
                                  </TableCell>
                                  <TableCell align="left">
                                    <div>
                                      <h6
                                      // onClick={saveFile}
                                      >
                                        <a href={uploads.fileIacard} 
                                      download
                                      target="_blank"
                                      className={classes.flink}
                                      ><u>
                                        {uploads.iacardName}
                                        </u>
                                        </a>
                                      </h6>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <h6>
                                      <a href={uploads.fileEvent} 
                                      download
                                      target="_blank"
                                      className={classes.flink}
                                      ><u>
                                        {uploads.eventName}
                                        </u>
                                        </a>
                                      </h6>
                                    </div>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Link to={`/approval/${uploads.id}`}>
                                      <Button
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                      >
                                        {/* <SaveIcon /> */}
                                        &nbsp; ทำการอนุมัติ
                                      </Button>
                                    </Link>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={data.uploads.totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  </Card>
                </Grid>
              </Container>
            </Box>
          </Card>
        </Container>
      </Box>
    </Box>

    // <Box pt={6} px={1} mt={6}>
    //     {/* <DefaultFooter content={footerRoutes} /> */}
    //   </Box>
  );
};
export default ApprovalUpload;
