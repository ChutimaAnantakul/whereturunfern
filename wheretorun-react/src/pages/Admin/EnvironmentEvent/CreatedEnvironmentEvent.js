import React, { useRef,useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../../../components/topbar/Topbar";
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
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

// icon
import EventIcon from "@mui/icons-material/Event";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import DoneIcon from "@material-ui/icons/Done";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";

//graphql
const categoryEventQueries = loader(
  "../../../graphql/queries/categoryEvent.gql"
);
const createEnvironmentMutations = loader(
  "../../../graphql/mutations/createEnvironment.gql"
);
const createdenvironmentEventsMutations = loader(
  "../../../graphql/mutations/createdenvironmentEvents.gql"
);

function CreatedEnvironmentEvent({ history }) {
  // const [status] = useState(true);

  const [createEnvironment] = useMutation(createEnvironmentMutations);
  const environmentThRef = useRef();
  const environmentEnRef = useRef();

  const handleSubmit = async (e) => {
    if (
      environmentThRef.current.value === "" ||
      environmentEnRef.current.value === ""
    ) {
      return;
    } else {
      e.preventDefault();
      alert("You have submitted the form.");

      const environmentTh = environmentThRef.current.value;
      const environmentEn = environmentEnRef.current.value;

      const { data } = await createEnvironment({
        variables: {
          // id,
          environmentTh,
          environmentEn,
        },
      });
      window.location.reload();
      history.push(`/createdEnvironmentEvent`);
    }
  };

  const handleCancel = async (e) => {
    window.location.reload();
    // history.push(`/environment`);
  };

  const [createdenvironmentEvents] = useMutation(
    createdenvironmentEventsMutations
  );
  const eventenvironmentIdRef = useRef();
  const environmentIdRef = useRef();

  const EnvironmentSubmit = async (e) => {
    if (
      eventenvironmentIdRef.current.value === "" ||
      environmentIdRef.current.value === ""
    ) {
      return;
    } else {
      e.preventDefault();
      alert("You have submitted the form.");

      const eventId = eventenvironmentIdRef.current.value;
      const environmentId = environmentIdRef.current.value;

      const { data } = await createdenvironmentEvents({
        variables: {
          eventId,
          environmentId,
        },
      });

      window.location.reload();
      history.push(`/createdEnvironmentEvent`);
    }
  };

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

  const { error, loading, data } = useQuery(categoryEventQueries);

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
          bgcolor: "#EDEEF7",
        }}
      >
        <Toolbar />
        {/* categoriesevent */}
        <Container>
          <Grid
            item
            xs={12}
            // lg={12}
            spacing={2}
            container
            // sx={{
            //   bgcolor: "#EDEEF7",
            // }}
          >
            <Grid
              item
              xs={6}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Card
                sx={{
                  p: 2,
                  mt: 2,
                  borderRadius: "12px",
                }}
              >
                <Grid item xs={12} spacing={1} container>
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
                          // mb: 2,
                          mt: 2,
                          width: "100%",
                          bgcolor: "#98BAE7",
                          color: "primary.contrastText",
                          //   boxShadow: 2,
                        }}
                        fullWidth
                      >
                        <CardContent>
                          <h2>เพิ่มสภาพแวดล้อมงานวิ่ง</h2>
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
                          // mb: 2,
                          mt: 3,
                          width: "100%",
                          //   boxShadow: 2,
                        }}
                        fullWidth
                      >
                        <form>
                          <Grid container spacing={3}>
                            <Grid
                              item
                              xs={12}
                              sx={{
                                mr: 10,
                                // mb: 2,
                                // mt: 2,
                              }}
                            >
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <EventIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <div className="form col-md-12 ">
                                  <label>สภาพแวดล้อมงานวิ่ง (ภาษาไทย)</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    aria-describedby="emailHelp"
                                    placeholder="สภาพแวดล้อมงานวิ่ง (ภาษาไทย)"
                                    required
                                    ref={environmentThRef}
                                  />
                                </div>
                              </ListItem>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sx={{
                                mr: 10,
                              }}
                            >
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <EventIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <div className="form col-md-12 ">
                                  <label>สภาพแวดล้อมงานวิ่ง (ภาษาอังกฤษ)</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    aria-describedby="emailHelp"
                                    placeholder="สภาพแวดล้อมงานวิ่ง (ภาษาอังกฤษ)"
                                    pattern="[A-Za-z0-9,():;* '%#<>_^|./\\s]*"
                                title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                                    required
                                    ref={environmentEnRef}
                                  />
                                </div>
                              </ListItem>
                            </Grid>
                          </Grid>
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
                    <Box
                      // display="flex"
                      // justifyContent="space-between"
                      // p={1.5}
                      sx={{
                        // p: 2,
                        // // mx: { xs: 2, lg: 12 },
                        // mt: 2,
                        mb: 2,
                      }}
                    />
                  </Container>
                </Grid>
              </Card>
            </Grid>
            <Grid
              item
              xs={6}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Card
                sx={{
                  p: 2,
                  // mx: { xs: 2, lg: 12 },
                  mt: 2,
                  // mb: 12,
                  borderRadius: "12px",
                  // boxShadow: 10,
                }}
              >
                <Grid item xs={12} spacing={1} container>
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
                          mt: 2,
                          width: "100%",
                          bgcolor: "#98BAE7",
                          color: "primary.contrastText",
                          //   boxShadow: 2,
                        }}
                        fullWidth
                      >
                        <CardContent>
                          <h2>เลือกสภาพแวดล้อมของงานวิ่ง</h2>
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
                          mb: 1,
                          width: "100%",
                          //   boxShadow: 2,
                        }}
                        fullWidth
                      >
                        <br />
                        <form>
                          <Grid container spacing={3}>
                            <Grid
                              item
                              xs={12}
                              sx={{
                                mr: 17,
                              }}
                            >
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <EventIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <div className="form col-md-12 ">
                                  <label>ชื่องานวิ่ง</label>
                                  <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    ref={eventenvironmentIdRef}
                                    required
                                  >
                                    {/* <option value={""}>None</option> */}
                                    {data.events.nodes.map((event) => (
                                      <option key={event.id} value={event.id}>
                                        {event.eventnameTh}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </ListItem>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sx={{
                                mr: 17,
                              }}
                            >
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <EventIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <div className="form col-md-12 ">
                                  <label>สภาพแวดล้อมงานวิ่ง</label>
                                  <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    ref={environmentIdRef}
                                    required
                                  >
                                    {/* <option value={""}>None</option> */}
                                    {data.environments.nodes.map(
                                      (environments) => (
                                        <option
                                          key={environments.id}
                                          value={environments.id}
                                        >
                                          {environments.environmentTh}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                              </ListItem>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            item
                            justifyContent="center"
                            xs={12}
                            my={2}
                          >
                            {/* <Button variant="contained" color="inherit">
                              back
                            </Button>
                            &nbsp; &nbsp; &nbsp; */}
                            <Button
                              variant="contained"
                              // color="#5870cb"
                              // key={categories.id}
                              // href={`/eventgroup/${eventgroup.id}`}
                              onClick={EnvironmentSubmit}
                            >
                              <SaveIcon />
                              &nbsp;save
                            </Button>
                          </Grid>
                        </form>
                      </Card>
                    </Grid>
                    {/* <Box
                    display="flex"
                    justifyContent="space-between"
                    p={1.5}
                    sx={{
                      p: 2,
                      mx: { xs: 2, lg: 12 },
                      mt: 2,
                      mb: 5,
                    }}
                  /> */}
                    {/* <Box display="flex" justifyContent="space-between" p={1.5}>
                      <Link to="/createdCategoryEvent">
                        <Button size="large" color="primary">
                          <ArrowBackIcon />
                          &nbsp;back
                        </Button>
                      </Link>
                      <Link to="/edit">
                        <Button size="large" color="primary">
                          <DoneIcon />
                          &nbsp; finish
                        </Button>
                      </Link>
                    </Box> */}
                  </Container>
                </Grid>

                {/* endประเภทหมวดหมู่งานวิ่ง */}
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Card
            sx={{
              p: 2,
              // mx: { xs: 2, lg: 12 },
              mt: 2,
              // mb: 12,
              borderRadius: "12px",
              // boxShadow: 10,
              // bgcolor: "#EDEEF7",
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
                      bgcolor: "#98BAE7",
                      color: "primary.contrastText",
                      //   boxShadow: 2,
                    }}
                    fullWidth
                  >
                    <CardContent>
                      <h2>ตารางสภาพแวดล้อมของงานวิ่ง</h2>
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
                    <Paper className={classes.root}>
                      <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <div>
                                  <h6>ชื่องานวิ่ง</h6>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <h6>สภาพแวดล้อมงานวิ่ง</h6>
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
                            {data.environmentevents.nodes
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((environmentevents) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                  <TableCell align="left">
                                    <div>
                                      <h6>
                                        {environmentevents.event.eventnameTh}
                                      </h6>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <h6>
                                        {
                                          environmentevents.environment
                                            .environmentTh
                                        }
                                      </h6>
                                    </div>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Link
                                      to={`/editEnvironmentEvent/${environmentevents.id}`}
                                    >
                                      <Button
                                        variant="contained"
                                        color="inherit"
                                        key={environmentevents.id}
                                        // href={`/eventgroup/${eventgroup.id}`}
                                        // onClick={EdittoggleModal}
                                      >
                                        <EditIcon />
                                        &nbsp;Edit
                                      </Button>
                                    </Link>
                                    &nbsp; &nbsp; &nbsp;
                                    <Link
                                      to={`/delEnvironmentEvent/${environmentevents.id}`}
                                    >
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        key={environmentevents.id}
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
                        count={data.environmentevents.totalCount}
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
    // <Box pt={6} px={1} mt={6}>
    //     {/* <DefaultFooter content={footerRoutes} /> */}
    //   </Box>
  );
}
export default CreatedEnvironmentEvent;
