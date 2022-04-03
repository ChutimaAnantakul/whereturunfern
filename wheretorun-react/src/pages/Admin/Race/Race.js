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
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
// import TablePagination from "@material-ui/core/TablePagination";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";

// icon
import EventIcon from "@mui/icons-material/Event";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
// import CloseIcon from "@mui/icons-material/Close";
// import ImageIcon from "@mui/icons-material/Image";

//lodergrapghl
const createRaceMutations = loader(
  "../../../graphql/mutations/createRace.gql"
);
const racesQueries = loader("../../../graphql/queries/races.gql");

const Race = ({ history }) => {
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

  const [createRace] = useMutation(createRaceMutations);
  const raceThRef = useRef();
  const raceEnRef = useRef();
  const distanceRef = useRef();
  const priceRef = useRef();

  const handleSubmit = async (e) => {
    if (
      raceThRef.current.value === "" ||
      raceEnRef.current.value === "" ||
      // Number(distanceRef.current.value) === "" ||
      Number(priceRef.current.value) === ""
    ) {
      return;
    } else {
      e.preventDefault();
      alert("You have submitted the form.");

      const raceTh = raceThRef.current.value;
      const raceEn = raceEnRef.current.value;
      const price = Number(priceRef.current.value);
      const distance = Number(distanceRef.current.value);

      const { data } = await createRace({
        variables: {
          // id,
          raceTh,
          raceEn,
          distance,
          price
        },
      });
      window.location.reload();
      history.push(`/race`);
    }
  };

  const handleCancel = async (e) => {
    window.location.reload();
    history.push(`/race`);
  };

  const { error, loading, data } = useQuery(racesQueries);

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
                    bgcolor: "#98BAE7",
                    color: "primary.contrastText",
                    mb: 2,
                    width: "100%",
                    //   boxShadow: 2,
                  }}
                  fullWidth
                >
                  <CardContent>
                    <h2>เพิ่มประเภทการแข่งขันงานวิ่ง</h2>
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
                      <div className="form col-md-12">
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <EventIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <div className="form col-md-11 ">
                            <label>ประเภทการแข่งขันงานวิ่ง (ภาษาไทย)</label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              placeholder="ประเภทการแข่งขันงานวิ่ง (ภาษาไทย)"
                              required
                              ref={raceThRef}
                            />
                          </div>
                        </ListItem>
                      </div>
                      <div className="form col-md-12">
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <EventIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <div className="form col-md-11 ">
                            <label>ประเภทการแข่งขันงานวิ่ง (ภาษาอังกฤษ)</label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              placeholder="ประเภทการแข่งขันงานวิ่ง (ภาษาอังกฤษ)"
                              // pattern="[A-Za-z0-9,():;* '%#<>_^|./\\s]*"
                              //   title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                              required
                              fullWidth
                              ref={raceEnRef}
                            />
                          </div>
                        </ListItem>
                      </div>
                      
                      <div className="form col-md-12">
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <EventIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <div className="form col-md-11 ">
                            <label>ระยะทาง (กม.)</label>
                            <input
                              type="number"
                              className="form-control"
                              aria-describedby="emailHelp"
                              placeholder="ระยะทาง (กม.)"
                              // required
                              ref={distanceRef}
                            />
                          </div>
                        </ListItem>
                      </div>
                      <div className="form col-md-12">
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <EventIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <div className="form col-md-11 ">
                            <label>ราคา (บาท)</label>
                            <input
                              type="number"
                              className="form-control"
                              aria-describedby="emailHelp"
                              placeholder="ราคา (บาท)"
                              required
                              ref={priceRef}
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
                      <h2>ตารางประเภทงานวิ่ง</h2>
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
                              {/* <TableCell></TableCell> */}
                              <TableCell>
                                <div>
                                  <h6>ประเภท (ภาษาไทย)</h6>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <h6>ประเภท (ภาษาอังกฤษ)</h6>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <h6>ระยะทาง (กม.)</h6>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <h6>ราคา (บาท)</h6>
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
                            {data.races.nodes
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((races) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                  <TableCell align="left">
                                    <div>
                                      <h6>{races.raceTh}</h6>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <h6>{races.raceEn}</h6>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <h6>{races.distance}</h6>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <h6>{races.price}</h6>
                                    </div>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Link
                                      to={`/editrace/${races.id}`}
                                    >
                                      <Button
                                        variant="contained"
                                        color="inherit"
                                        key={races.id}
                                        // href={`/eventgroup/${eventgroup.id}`}
                                        // onClick={EdittoggleModal}
                                      >
                                        <EditIcon />
                                        &nbsp;Edit
                                      </Button>
                                    </Link>
                                    &nbsp; &nbsp;
                                    <Link
                                      to={`/delrace/${races.id}`}
                                    >
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        key={races.id}
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
                        count={data.races.totalCount}
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

    
  );
};

export default Race;
