import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
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
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import List from "@material-ui/core/List";
import Avatar from "@mui/material/Avatar";
// import TablePagination from "@material-ui/core/TablePagination";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import Card from "@mui/material/Card";
import Divider from "@material-ui/core/Divider";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";

// icon
import EventIcon from "@mui/icons-material/Event";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CommentIcon from "@material-ui/icons/Comment";
// import CloseIcon from "@mui/icons-material/Close";
// import ImageIcon from "@mui/icons-material/Image";

//lodergrapghl
const usersQueries = loader("../graphql/queries/user.gql");

const Profile = ({ history, match }) => {
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
  });

  const classes = useStyles();

  const { id } = match.params;
  const { loading, error, data } = useQuery(usersQueries, {
    variables: {
      id,
    },
    fetchPolicy: "network-only",
  });
  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }
  console.log(data.user.uploads);

  return (
    <Box xs={12} sx={{ display: "flex" }}>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          bgcolor: "#EDEEF7",
        }}
      >
        {/* <Toolbar /> */}
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
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              // style={{ minHeight: '100vh' }}
            >
              <Card
                justifyContent="center"
                alignItems="flex-start"
                sx={{
                  overflow: "hidden",
                  borderRadius: "12px",
                  boxShadow: 1,
                  mb: 4,
                  width: "40%",
                }}
              //   style={{ backgroundColor: 'teal',
              //   align:"right"
              //  }}
              >
                {" "}
                <CardContent>
                  {/* <ListItem>
                  &nbsp;
                  <h5>ข้อมูลส่วนตัว</h5>

                </ListItem> */}
                  <Grid
                    align="center"
                    container
                    direction="column"
                    justify="center"
                    spacing={0}
                  >
                    <h5>ข้อมูลส่วนตัว</h5>
                  </Grid>


                  <Grid
                    container
                    item
                    // justifyContent="center"
                    xs={12}
                  // my={2}
                  >
                    <List className={classes.root}>
                      {/* {data.event.reviews.nodes.map((reviews) => ( */}
                      <div>
                        <ListItem>
                          <Avatar
                            alt={data.user.firstname}
                            src={data.user.profileimageurl}
                            sx={{ width: 130, height: 130 }}
                          />
                          &nbsp;
                          <div className="form col-md-12">
                            <div className="form col-md-12">
                              <p><b> ชื่อ - นามสกุล : 
                              </b>&nbsp;
                              {data.user.firstname}&nbsp;
                                {data.user.lastname}</p>
                            </div>
                            <div className="form col-md-12">
                              <p><b>เลขบัตรประจำตัวประชาชน : </b>&nbsp;{data.user.idcard}</p>
                            </div>
                            <div className="form col-md-12">
                              <p><b>เพศ : </b>&nbsp;{data.user.gender}</p>
                            </div>
                            <div className="form col-md-12">
                              <p><b>วันเดือนปีเกิด : </b>&nbsp;{data.user.birthdate}</p>
                            </div>
                            <div className="form col-md-12">
                              <p><b>อีเมล : </b>&nbsp;{data.user.email}</p>
                            </div>
                          </div>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>
                      {/* ))} */}
                    </List>
                  </Grid>
                  <hr />
                </CardContent>
              </Card>
            </Grid>
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
                      <h2>ตารางประเภทหมวดหมู่งานวิ่ง</h2>
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
                                  <h6>ชื่องานวิ่งของผู้จัด</h6>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <h6>ระยะทาง</h6>
                                </div>
                              </TableCell>
                              <TableCell align="center">
                                <div>
                                  <h6>วันที่วิ่ง</h6>
                                </div>
                              </TableCell>
                              <TableCell align="center">
                                <div>
                                  <h6>สถานที่วิ่ง</h6>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.user.uploads.nodes
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((uploads) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                  <TableCell align="left">
                                    <div>
                                      <h6>{uploads.event.eventnameTh}</h6>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <h6>{uploads.event.racetypeevents.nodes.map((racetypeevents) => racetypeevents.race.distance)}</h6>
                                    </div>
                                  </TableCell>
                                  <TableCell align="center">
                                    <div>
                                      <h6>{uploads.event.startdate} - {uploads.event.enddate}</h6>
                                    </div>
                                  </TableCell>
                                  <TableCell align="center">
                                    <div>
                                      <h6>{uploads.event.locationTh}</h6>
                                    </div>
                                  </TableCell>

                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      {/* <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        component="div"
                        count={data.categories.totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      /> */}
                    </Paper>
                  </Card>
                </Grid>
              </Container>
            </Box>
          </Card>
        </Container>
      </Box>
    </Box>

  );
};
export default Profile;
