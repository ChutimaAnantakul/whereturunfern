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
const updateEventAvgMutations = loader("../graphql/mutations/updateEventAvg.gql");

function AllRanking({ history, match }) {


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
    tableBody: {
      color: "#fff !important",
    },
  });

  const classes = useStyles();

  // update avg ranking
  const [avgrankscore, setavgrankscore] = useState();
  const [updateEventAvg] = useMutation(updateEventAvgMutations);
  const idRef = useRef();
  const avgrankscoreRef = useRef();
  const [setId] = useState();

  let totalCost = 0;
  let avg = 0;
  // data.event.rankings.forEach((rankings) => (totalCost += rankings.rankscore));



  const handleChange = async (e) => {
    if (
      idRef.current.value === { id }
    ) {
      return;
    } else {
      e.preventDefault();
      alert("You have submitted the form.");

      
      // calculate avg
      const avgrankscore = avg;

      // const num1 = (data.event.rankings.nodes[0].rankscore) + (data.event.rankings.nodes[1].rankscore);
      // const num2 = (data.event.rankings.nodes[2].rankscore) + (data.event.rankings.nodes[3].rankscore);
      // const total = num1 + num2;
      // const avgrankscore = total / (data.event.rankings.totalCount);
      const id = idRef.current.value;
      // const avgrankscore = Number(avgrankscoreRef.current.value);
      console.log(id, avgrankscore);
      const { data } = await updateEventAvg({
        variables: {
          id,
          avgrankscore,
        },
      });
      history.push(`/event/${data.updateEvent.event.id}`);
      window.location.reload();
    }
  };



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
              <Card
                sx={{
                  p: 2,
                  mt: 2,
                  borderRadius: "12px",
                }}
              >
                <Grid item xs={12} spacing={1} container>

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
                                ref={idRef}
                              // disabled
                              >
                                <option key={data.event.id} value={data.event.id}>
                                  : {data.event.eventnameTh}
                                </option>
                              </select>
                              </div>
                              <div className="form col-md-3"></div>
                              </ListItem>
                              </div>
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
                                          <TableCell>
                                            <div>
                                              <h6></h6>
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
                                          .map((rankings, index) => (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
                                                <div
                                                  count={rankings.totalCount}
                                                  value={rankings.rankscore}
                                                  ref={avgrankscoreRef}
                                                >
                                                  <h6
                                                  // defaultValue={rankings.rankscore}
                                                  // count={rankings.totalCount}
                                                  // value={rankings.rankscore}
                                                  // ref={avgrankscoreRef}
                                                  // onChange={() =>
                                                  //   setavgrankscore(
                                                  //     avgrankscoreRef.current.value
                                                  //   )
                                                  // }
                                                  >
                                                    {rankings.rankscore}
                                                  </h6>
                                                </div>
                                              </TableCell>
                                              <TableCell className={classes.tableBody}>
                                                <div
                                                  count={rankings.totalCount}
                                                  value={rankings.rankscore}
                                                  ref={avgrankscoreRef}
                                                >
                                                  <h6 
                                                  // defaultValue={rankings.rankscore}
                                                  // count={rankings.totalCount}
                                                  // value={rankings.rankscore}
                                                  // ref={avgrankscoreRef}
                                                  // onChange={() =>
                                                  //   setavgrankscore(
                                                  //     avgrankscoreRef.current.value
                                                  //   )
                                                  // }
                                                  >
                                                    {totalCost += rankings.rankscore}
                                                  </h6>
                                                </div>
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                          <TableCell align="left">
                                            <div>
                                              <h6>

                                              </h6>
                                            </div>
                                          </TableCell>
                                          <TableCell>
                                            <div>
                                              <h6>

                                              </h6>
                                            </div>
                                          </TableCell>
                                          <TableCell>
                                            <div>
                                              <h6>
                                                Subtotal
                                              </h6>
                                            </div>
                                          </TableCell>
                                          <TableCell>
                                            <div
                                            value={avg=totalCost/data.event.rankings.totalCount}
                                            ref={avgrankscoreRef}
                                            >
                                              <h6
                                              >
                                                {avg=totalCost/data.event.rankings.totalCount}
                                              </h6>
                                            </div>
                                          </TableCell>
                                        </TableRow>
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
                              <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                onClick={handleChange}
                              >
                                <SaveIcon />
                                &nbsp; save
                              </Button>
                          </Grid>
                        </Container>
                      </Grid>
                    </Card>
                  </Container>
                </Grid>
              </Card>
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
export default AllRanking;
