import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@material-ui/core/TextField";
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
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";

// icon
import EventIcon from "@mui/icons-material/Event";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
// import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";

//lodergrapghl
const createEventgroupMutations = loader(
  "../../../graphql/mutations/createEventgroup.gql"
);
const eventGroupsQueries = loader("../../../graphql/queries/eventGroups.gql");

const EventGroup = ({ history }) => {
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

  const [createEventgroup] = useMutation(createEventgroupMutations);
  const eventgroupnameThRef = useRef();
  const eventgroupnameEnRef = useRef();
  const eventGroupImageUrlRef = useRef();

  
 
  const handleSubmit = async (e) => {
    if (
      eventgroupnameThRef.current.value === "" ||
      eventgroupnameEnRef.current.value === "" ||
      eventGroupImageUrlRef.current.value === ""
    ) {
      return;
    } else {
      e.preventDefault();

      alert("You have submitted the form.");

      const eventgroupnameTh = eventgroupnameThRef.current.value;
      const eventgroupnameEn = eventgroupnameEnRef.current.value;
      const eventGroupImageUrl = eventGroupImageUrlRef.current.value;

      const { data } = await createEventgroup({
        variables: {
          // id,
          eventgroupnameTh,
          eventgroupnameEn,
          eventGroupImageUrl,
        },
      });

      window.location.reload();
      history.push(`/eventgroup`);
    }
  };

  const handleCancel = async (e) => {
    window.location.reload();
    history.push(`/eventgroup`);
  };

  const { error, loading, data } = useQuery(eventGroupsQueries);

  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }

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
                  xs={5}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Card
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      bgcolor: "#98BAE7",
                      color: "primary.contrastText",
                      mb: 2,
                      width: "100%",
                      //   boxShadow: 2,
                    }}
                    fullWidth
                  >
                    <CardContent>
                      <h2>เพิ่มกลุ่มงานวิ่ง</h2>
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
                    fullWidth
                  >
                    <form>
                      {/* <Grid container spacing={3}> */}
                        <br />
                        <div className="form col-md-12"
                        >
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <EventIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-12 ">
                              <label>ชื่อกลุ่มงานวิ่ง (ภาษาไทย)</label>
                              <input
                                id="outlined-basic"
                                label="ชื่อกลุ่มงานวิ่ง (ภาษาไทย)"
                                variant="outlined"
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="ชื่อกลุ่มงานวิ่ง (ภาษาไทย)"
                                required
                                fullWidth
                                ref={eventgroupnameThRef}
                      
                              />
                            </div>
                          </ListItem>
                        </div>
                        <div className="form col-md-12"
                        >
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <EventIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-12">
                              <label>ชื่อกลุ่มงานวิ่ง (ภาษาอังกฤษ)</label>
                              <input
                                id="outlined-basic"
                                label="ชื่อกลุ่มงานวิ่ง (ภาษาอังกฤษ)"
                                // variant="outlined"
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="ชื่อกลุ่มงานวิ่ง (ภาษาอังกฤษ)"
                                required
                                fullWidth
                                ref={eventgroupnameEnRef}
                                pattern="[A-Za-z0-9,():;* '%#<>_^|./\\s]*"
                                title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                              />
                            </div>
                          </ListItem>
                        </div>
                        <div className="form col-md-12"
                        >
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <ImageIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-12">
                              <label>รูปภาพ</label>
                              <input
                                id="outlined-basic"
                                label="รูปภาพ"
                                variant="outlined"
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="รูปภาพ"
                                required
                                ref={eventGroupImageUrlRef}
                                
                              />
                            </div>
                          </ListItem>
                        </div>
                      {/* </Grid> */}
                      <Grid
                        container
                        item
                        justifyContent="center"
                        xs={12}
                        my={2}
                      >
                        <Button
                          variant="contained"
                          color="inherit"
                          onClick={handleCancel}
                        >
                          <CancelIcon />
                          &nbsp; Cancel
                        </Button>
                        &nbsp; &nbsp; &nbsp;
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          onClick={handleSubmit}
                        >
                          <SaveIcon />
                          &nbsp; save
                        </Button>
                      </Grid>
                    </form>
                  </Card>
                </Grid>
              </Container>
            </Box>
          </Card>
        </Container>
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
                  xs={5}
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
                      <h2>ตารางกลุ่มงานวิ่ง</h2>
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
                              <TableCell></TableCell>
                              <TableCell>
                                <div>
                                  <h6>ชื่อกลุ่มงานวิ่ง (ภาษาไทย)</h6>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <h6>ชื่อกลุ่มงานวิ่ง (ภาษาอังกฤษ)</h6>
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
                            {data.eventgroups.nodes
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((eventgroup) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                  <TableCell>
                                    <Card
                                      sx={{
                                        overflow: "hidden",
                                        borderRadius: "5px",
                                        boxShadow: 1,
                                        // mb: 2,
                                      }}
                                    >
                                      <CardMedia
                                        component="img"
                                        width="100%"
                                        height="44"
                                        image={eventgroup.eventGroupImageUrl}
                                        // alt="Live from space album cover"
                                      />
                                    </Card>
                                  </TableCell>
                                  <TableCell align="left">
                                    <div>
                                      <h6>{eventgroup.eventgroupnameTh}</h6>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <h6>{eventgroup.eventgroupnameEn}</h6>
                                    </div>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Link
                                      to={`/editeventgroup/${eventgroup.id}`}
                                    >
                                      <Button
                                        variant="contained"
                                        color="inherit"
                                        key={eventgroup.id}
                                        // href={`/eventgroup/${eventgroup.id}`}
                                        // onClick={EdittoggleModal}
                                      >
                                        <EditIcon />
                                        &nbsp;Edit
                                      </Button>
                                    </Link>
                                    &nbsp; &nbsp;
                                    <Link
                                      to={`/deleventgroup/${eventgroup.id}`}
                                    >
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        key={eventgroup.id}
                                        // onClick={toggleModal}
                                      >
                                        <DeleteIcon />
                                        &nbsp; Delete
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
                        // rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={data.eventgroups.totalCount}
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
export default EventGroup;
