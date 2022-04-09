import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
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
const eventtypeofQueries = loader(
  "../graphql/queries/eventtypeof.gql"
);
const createRankingMutations = loader(
  "../graphql/mutations/createRanking.gql"
);

function TypeOfRank({ history, match }) {

  const [createRanking] = useMutation(createRankingMutations);
  const eventIdRef = useRef();
  const rankscoreRef = useRef();
  const typeofrankIdRef = useRef();

  const [eventId, seteventId] = useState();

  const handleSubmit = async (e) => {
    if (
      eventIdRef.current.value === { eventId } 
    ) {
      return;
    } else {
      // e.preventDefault();
      // alert("You have submitted the form.");

      const eventId = eventIdRef.current.value;
      const rankscore = Number(rankscoreRef.current.value);
      const typerankId = typeofrankIdRef.current.value;
      console.log(eventId, rankscore, typerankId)
      const { data } = await createRanking({
        variables: {
          eventId,
          rankscore,
          typerankId,
        },
      });

      // window.location.reload();
      history.push(`/typeofranktwo/${data.createRanking.ranking.eventId}`);
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
  const { id } = match.params;
  const { error, loading, data } = useQuery(eventtypeofQueries, {
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
              xs={12}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
            <Container>
              <Card
                sx={{
                  p: 2,
                  mt: 2,
                  mb: 12,
                  borderRadius: "4px",
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
                          <h2>หัวข้อการให้คะแนนงานวิ่ง</h2>
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
                          {/* <Grid container spacing={3}> */}
                          <br />
                          <div className="form col-md-12">
                          <ListItem>
                          <div className="form col-md-3"></div>
                          <div className="form col-md-6">
                          <select
                            type="text"
                            className="form-control"
                            aria-describedby="emailHelp"
                            defaultValue={data.event.eventnameTh}
                            value={data.event.id}
                            ref={eventIdRef}
                          disabled
                          >
                            <option key={data.event.id} value={data.event.id}>
                              : {data.event.eventnameTh}
                            </option>
                          </select>
                          </div>
                          <div className="form col-md-3"></div>
                          </ListItem>
                          </div>
                          <div className="form col-md-12">
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar>
                                  <EventIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <div className="form col-md-5 ">
                                <label>หัวข้อการให้คะแนนงานวิ่ง</label>
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  ref={typeofrankIdRef}
                                  required
                                >
                                  <option key={data.typeofranks.nodes[0].id} value={data.typeofranks.nodes[0].id}>
                                    {data.typeofranks.nodes[0].ranknameTh}
                                  </option>
                                  {/* {data.typeofranks.nodes.map((typeofranks, index) => (
                                    <option key={typeofranks.id} value={typeofranks.id}>
                                      {typeofranks.ranknameTh}
                                    </option>
                                  ))} */}
                                </select>
                                {/* <input 
                                  id="outlined-basic"
                                  // variant="outlined"
                                  type="test"
                                  className="form-control"
                                  aria-describedby="emailHelp"
                                  required
                                  fullWidth
                                  defaultValue={data.typeofranks.nodes[0].ranknameTh}
                                  // value={data.typeofranks.nodes[0].id}
                                  // key={data.typeofranks.nodes[0].id}
                                  ref={typeofrankIdRef}
                                /> */}
                              </div>
                              <ListItemAvatar>
                                <Avatar>
                                  <EventIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <div className="form col-md-5 ">
                                <label>กรุณากรอกคะแนน 1-5</label>
                                <input id="outlined-basic"
                                  label="กรุณากรอกคะแนน 1-5"
                                  // variant="outlined"
                                  type="number"
                                  className="form-control"
                                  aria-describedby="emailHelp"
                                  placeholder="กรุณากรอกคะแนน 1-5"
                                  required
                                  fullWidth
                                  ref={rankscoreRef}
                                />

                              </div>
                            </ListItem>
                          </div>
                          {/* <div className="form col-md-12">
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar>
                                  <EventIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <div className="form col-md-11 ">
                                <label>กรุณากรอกคะแนน 1-5</label>
                                <input id="outlined-basic"
                                  label="กรุณากรอกคะแนน 1-5"
                                  // variant="outlined"
                                  type="number"
                                  className="form-control"
                                  aria-describedby="emailHelp"
                                  placeholder="กรุณากรอกคะแนน 1-5"
                                  required
                                  fullWidth
                                  ref={rankscoreRef}
                                />

                              </div>
                            </ListItem>
                          </div> */}

                          {/* </Grid> */}
                          <Grid
                            container
                            item
                            justifyContent="center"
                            xs={12}
                            my={2}
                          >
                            {/* <Button
                              variant="contained"
                              color="inherit"
                              onClick={handleCancel}
                            >
                              <CancelIcon />
                              &nbsp; Cancel
                            </Button> */}
                            &nbsp; &nbsp; &nbsp;
                            <Button
                              variant="contained"
                              type="submit"
                              color="primary"
                              onClick={handleSubmit}
                            >
                              <SaveIcon />
                              &nbsp; NEXT
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
                                <h2>ตารางการให้คะแนนงานวิ่ง</h2>
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
                                            <h6>ชื่อผู้ให้คะแนน</h6>
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <div>
                                            <h6>ประเภทหัวข้อการให้คะแนน</h6>
                                          </div>
                                        </TableCell>

                                        <TableCell>
                                          <div>
                                            <h6>คะแนน</h6>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {data.event.rankings.nodes
                                        .slice(
                                          page * rowsPerPage,
                                          page * rowsPerPage + rowsPerPage
                                        )
                                        .map((rankings) => (
                                          <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell align="left">
                                              <div>
                                                <h6>
                                                  {rankings.event.eventnameTh}
                                                </h6>
                                              </div>
                                            </TableCell>
                                            <TableCell>
                                              <div>
                                                <h6>
                                                  {rankings.user.firstname}&nbsp;{rankings.user.lastname}
                                                </h6>
                                              </div>
                                            </TableCell>
                                            <TableCell>
                                              <div>
                                                <h6>
                                                  {rankings.typerank.ranknameTh}
                                                </h6>
                                              </div>
                                            </TableCell>
                                            <TableCell>
                                              <div>
                                                <h6>
                                                  {rankings.rankscore}
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
                                  component="div"
                                  count={data.event.rankings.totalCount}
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
                </Grid>
              </Card>
            </Container>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
    // <Box pt={6} px={1} mt={6}>
    //     {/* <DefaultFooter content={footerRoutes} /> */}
    //   </Box>
  );
}
export default TypeOfRank;
