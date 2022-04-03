import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

// import TablePagination from "@material-ui/core/TablePagination";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

// icon
// import EventIcon from "@mui/icons-material/Event";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
// import ImageIcon from "@mui/icons-material/Image";

//lodergrapghl
const deletedRaceEventMutations = loader(
  "../../../graphql/mutations/deletedRaceEvent.gql"
);

const raceEventIDQueries = loader("../../../graphql/queries/raceEventID.gql");

const DeletedRaceEvent = ({ match, history }) => {
  const [show, setShow] = useState(true);
  const toggleModal = () => setShow(show);

  
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

  const [deletedRaceEvent] = useMutation(deletedRaceEventMutations);
  const idRef = useRef();

  const handleSubmit = async (e) => {
    if (idRef.current.value === "") {
      return;
    } else {
      e.preventDefault();
      alert("You have submitted the form.");

      const id = idRef.current.value;

      const { data } = await deletedRaceEvent({
        variables: {
          id,
        },
      });

      history.push(`/createdRaceEvent`);
      window.location.reload();
    }
  };
  const { id } = match.params;
  const { error, loading, data } = useQuery(raceEventIDQueries, {
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

  return (
    <Box xs={12} sx={{ display: "flex" }}>
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
              mb: 4,
              borderRadius: "12px",
              boxShadow: 7,
            }}
          >
            <Box component="section">
              <Container>
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
                          <h2>ตารางประเภทการแข่งขันของงานวิ่ง</h2>
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
                                      <h6>ประเภทการแข่งขันงานวิ่ง</h6>
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
                                {data.racetypeevents.nodes
                                  .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                  .map((racetypeevents) => (
                                    <TableRow
                                      hover
                                      role="checkbox"
                                      tabIndex={-1}
                                    >
                                      <TableCell align="left">
                                        <div>
                                          <h6>
                                            {racetypeevents.event.eventnameTh}
                                          </h6>
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <div>
                                          <h6>
                                            {racetypeevents.race.raceTh}&nbsp;
                                            {racetypeevents.race.distance}
                                            &nbsp;km.&nbsp;
                                            {racetypeevents.race.price}&nbsp;บาท
                                          </h6>
                                        </div>
                                      </TableCell>
                                      <TableCell align="center">
                                        <Link
                                          to={`/editRaceEvent/${racetypeevents.id}`}
                                        >
                                          <Button
                                            variant="contained"
                                            color="inherit"
                                            key={racetypeevents.id}
                                            // href={`/eventgroup/${eventgroup.id}`}
                                            // onClick={EdittoggleModal}
                                          >
                                            <EditIcon />
                                            &nbsp;Edit
                                          </Button>
                                        </Link>
                                        &nbsp; &nbsp; &nbsp;
                                        {/* <Link to={`/delcategory/${categories.id}`}> */}
                                        <Button
                                          variant="contained"
                                          color="secondary"
                                          // key={categories.id}
                                          // onClick={toggleModal}
                                        >
                                          <DeleteIcon />
                                          &nbsp; Delete
                                        </Button>
                                        {/* </Link> */}
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
                            count={data.racetypeevents.totalCount}
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
              </Container>
            </Box>
          </Card>
        </Container>

        {/* Delete page */}
        <Container>
          {" "}
          <Modal
            open={show}
            onClose={toggleModal}
            sx={{ display: "grid", placeItems: "center" }}
          >
            <Slide direction="down" in={show} timeout={500}>
              <Card
                position="relative"
                width="500px"
                display="flex"
                flexDirection="column"
                borderRadius="xl"
                bgColor="white"
                shadow="xl"
                sx={{
                  p: 2,
                  // mx: { xs: 2, lg: 12 },
                  mt: 8,
                  mb: 8,
                  borderRadius: "12px",
                  boxShadow: 10,
                }}
              >
                <form>
                  <Box
                    display="flex"
                    alginItems="center"
                    justifyContent="space-between"
                    p={2}
                  >
                    <Typography variant="h3">Are you sure?</Typography>
                    <Link to="/createdRaceEvent">
                      <CloseIcon
                        fontSize="medium"
                        sx={{ cursor: "pointer" }}
                        onClick={toggleModal}
                      />
                    </Link>
                  </Box>
                  <Divider sx={{ my: 0 }} />
                  <Box p={2}>
                    {/* <h6 value={data.eventgroup.id} ref={idRef}>
                      You want to delete this EventGroup{" "}
                      {data.eventgroup.eventgroupnameTh} !!
                      <br />
                    </h6> */}
                    <h6>You want to delete this raceevent !!</h6> <br />
                    {/* <Modal open={del} onClose={deltoggleModal}>
                      <Slide direction="down" in={del} timeout={500}> */}
                    <select
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                      value={data.racetypeevent.id}
                      ref={idRef}
                      required
                      disabled
                    >
                      <option
                        key={data.racetypeevent.id}
                        value={data.racetypeevent.id}
                      >
                        {data.racetypeevent.event.eventnameTh}&nbsp;
                        ประเภทการแข่งขันงานวิ่ง: {data.racetypeevent.race.raceTh}&nbsp;ระยะทาง&nbsp;
                        {data.racetypeevent.race.distance} กม.&nbsp;ราคา&nbsp;
                        {data.racetypeevent.race.price}
                      </option>
                    </select>
                    {/* </Slide>
                    </Modal> */}
                    <br />
                  </Box>
                  <Divider sx={{ my: 0 }} />
                  <Box display="flex" justifyContent="space-between" p={1.5}>
                    <Link to="/createdRaceEvent">
                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={toggleModal}
                      >
                        <CancelIcon />
                        &nbsp; Cancel
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      <SaveIcon />
                      &nbsp; Submit
                    </Button>
                  </Box>
                </form>
              </Card>
            </Slide>
          </Modal>
        </Container>
      </Box>
    </Box>

    // <Box pt={6} px={1} mt={6}>
    //     {/* <DefaultFooter content={footerRoutes} /> */}
    //   </Box>
  );
};
export default DeletedRaceEvent;
