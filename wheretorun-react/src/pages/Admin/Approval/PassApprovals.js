import React, { useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../../../components/admintopbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

// import FormHelperText from "@mui/material/FormHelperText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

// icon
import EventIcon from "@mui/icons-material/Event";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

//graphql
// const requestapprovalsQueries = loader(
//   "../../../graphql/queries/passapprovals.gql"
// );

const requestapprovalsQueries = loader(
  "../../../graphql/queries/passtapprovaluploads.gql"
);

const PassApprovals = ({ history }) => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (requestapproval, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (requestapproval) => {
    setRowsPerPage(+requestapproval.target.value);
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
  const [status] = useState(true);

  const { error, loading, data } = useQuery(requestapprovalsQueries
    , {
        variables: {
            status,
        },
    });
  
  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          //   borderRadius: "12px",
          //   boxShadow: 10,
          //   mt: 2,
        }}
      >
        <Toolbar />

        <Container>
          <Card
            sx={{
              p: 2,
              // mx: { xs: 2, lg: 12 },
              mt: 2,
              // mb: 12,
              borderRadius: "12px",
              boxShadow: 10,
            }}
          >
            <Grid
              item
              xs={12}
              // lg={12}
              spacing={1}
              container
            >
              <Container>
                <Grid
                  item
                  xs={8}
                  // container
                  // direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Card
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      mb: 2,
                      mt: 2,
                      width: "100%",
                      bgcolor: "#5870cb",
                      color: "primary.contrastText",
                      //   boxShadow: 2,
                    }}
                    fullWidth
                  >
                    <CardContent>
                      <h3>ตารางรายการอนุมัติสิทธิ์ผู้จัดงานที่ผ่านการอนุมัติ</h3>
                    </CardContent>
                  </Card>
                </Grid>
              </Container>

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
                    <Paper 
                    className={classes.root}
                    >
                      <TableContainer 
                      className={classes.container}
                      >
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
                            </TableRow>
                          </TableHead>
                          {/* <TableBody>
                            {data.requestapprovals.nodes
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((requestapprovals) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                   <TableCell align="left">
                                    <div>
                                      <h6>
                                        {requestapprovals.user.firstname}&nbsp;{requestapprovals.user.lastname}
                                      </h6>
                                    </div>
                                  </TableCell>
                                  <TableCell align="left">
                                    <div>
                                      <h6>
                                        {requestapprovals.event.eventnameTh}
                                      </h6>
                                    </div>
                                  </TableCell>
                                  <TableCell align="left">
                                    <div>
                                      <h6>
                                        {requestapprovals.fileIacard}
                                      </h6>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <h6>
                                        {requestapprovals.fileEvent}
                                      </h6>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}  
                          </TableBody> */}

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
                        // count={data.requestapprovals.totalCount}
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
            </Grid>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};
export default PassApprovals;
