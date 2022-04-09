import React, { useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";

// icon
import SearchIcon from "@material-ui/icons/Search";

// page
import Navbar from "./layout/Navbar";
// graphql
const searchEventGroupQuery = loader("../graphql/queries/searchEventGroup.gql");

function SearchEventGroup() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const inputRef = useRef();
  const [eventgroupnameTh, seteventgroupnameTh] = useState("");

  const { error, loading, data } = useQuery(searchEventGroupQuery, {
    variables: {
      eventgroupnameTh,
    },
  });
  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }

  return (
    <>
      <Navbar />
      <Box
        // height="100%"
        minHeight="37vh"
        minWidth="100%"
        sx={{
          backgroundImage: `url(${"https://image.makewebeasy.net/makeweb/0/8TDs3xVVu/article_football/starting_running_feet_runners.png"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "fixed",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <Typography
              variant="h1"
              color="white"
              mt={32}
              mb={1}
              fontSize={"3xl"}
            >
              {/* ค้นหางานวิ่งย้อนหลัง */}
            </Typography>
          </Grid>
        </Container>
      </Box>
      <Card
        sx={{
          p: 3,
          // mx: { xs: 2, lg: 3 },
          // mt: -8,
          mb: 3,
          // mr: 25,
          // ml: 25,
          backgroundColor: "while",
          backdropFilter: "saturate(200%) blur(30px)",
          overflow: "hidden",
          // borderRadius: "12px",
          boxShadow: 2,
        }}
      >
        <div>
          <h4>ดูรายการวิ่งย้อนหลัง</h4>
        </div>
      </Card>

      {/* <Card
        sx={{
          //   p: 2,
          //   mx: { xs: 2, lg: 3 },
          //   mt: -8,
          mb: 2,
          mr: 30,
          ml: 30,
          backgroundColor: "while",
          backdropFilter: "saturate(200%) blur(30px)",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: 4,
        }}
      > */}
      <Container sx={{ mt: 6 }}>
        <Grid container spacing={3} sx={{ mb: 12 }}>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={3}>
              <Container>
                <Grid
                  item
                  xs={12}
                  // lg={12}
                  spacing={2}
                  container
                  justifyContent="space-between"
                  alignItems="baseline"
                >
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
                          mr: 17,
                          ml: 23,
                          overflow: "hidden",
                          borderRadius: "12px",
                          mb: 4,
                          width: "100%",
                          boxShadow: 2,
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
                                    {/* <div>
                                      <h4>รูปภาพ</h4>
                                    </div> */}
                                    <div>
                                      <h4>งานวิ่ง</h4>
                                    </div>
                                    <div>
                                      <h6>
                                        {data.eventgroups.totalCount}
                                        &nbsp;&nbsp;รายการ
                                      </h6>
                                    </div>
                                  </TableCell>
                                  <TableCell></TableCell>

                                  <TableCell>
                                    <Box
                                      display="flex"
                                      justifyContent="space-between"
                                      p={1}
                                    >
                                      <Container>
                                        <Grid
                                          item
                                          xs={12}
                                          container
                                          direction="row"
                                          justifyContent="flex-end"
                                          alignItems="center"
                                        >
                                          <form>
                                            <Grid
                                              container
                                              direction="row"
                                              justifyContent="center"
                                              alignItems="center"
                                              // spacing={1}
                                              item
                                              xs={12}
                                            >
                                              <Grid item xs={7}>
                                                <ListItem>
                                                  <div className="form col-md-12 ">
                                                    <label>
                                                      ค้นหางานวิ่ง...
                                                    </label>
                                                    <input
                                                      type="text"
                                                      className="form-control"
                                                      aria-describedby="emailHelp"
                                                      ref={inputRef}
                                                      placeholder="ค้นหางานวิ่ง..."
                                                      // placeholder={
                                                      //   eventgroupnameTh
                                                      // }
                                                    />
                                                  </div>
                                                </ListItem>
                                              </Grid>
                                              <Grid item xs={2}>
                                                <ListItem>
                                                  <div className="form col-md-12 ">
                                                    <label></label>
                                                    <br />
                                                    <Button
                                                      variant="contained"
                                                      size="large"
                                                      value="search"
                                                      type="submit"
                                                      onClick={() =>
                                                        seteventgroupnameTh(
                                                          inputRef.current.value
                                                        )
                                                      }
                                                    >
                                                      <SearchIcon /> &nbsp;
                                                      <div>ค้นหา</div>&nbsp;
                                                    </Button>
                                                  </div>
                                                </ListItem>
                                              </Grid>
                                            </Grid>
                                          </form>
                                        </Grid>
                                      </Container>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {data.eventgroups.nodes
                                  .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                  .map((eventgroups) => (
                                    <TableRow
                                      hover
                                      role="checkbox"
                                      tabIndex={-1}
                                    >
                                      <TableCell align="left">
                                        {/* <div> */}
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
                                            height="50"
                                            image={
                                              eventgroups.eventGroupImageUrl
                                            }
                                            // alt="Live from space album cover"
                                          />
                                        </Card>
                                        {/* </div> */}
                                      </TableCell>
                                      <TableCell align="left">
                                        <div>
                                          <h6>
                                            {eventgroups.eventgroupnameTh}
                                          </h6>
                                        </div>
                                      </TableCell>

                                      <TableCell
                                        align="center"
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                      >
                                        <ButtonGroup
                                          variant="text"
                                          color="primary"
                                          aria-label="text primary button group"
                                        >
                                          {/* {eventgroups.events.nodes.map(
                                            (events) => (
                                              <Link to={`/event/${events.id}`}>
                                                <Button key={events.id}>
                                                  <div>{events.year.year}</div>
                                                </Button>
                                              </Link>
                                            )
                                          )} */}
                                        </ButtonGroup>
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
                            //   rowsPerPageOptions={[10, 25, 100]}
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
                </Grid>
                {/* </Card> */}
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* </Card> */}

      {/* <Box pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </Box> */}
    </>
  );
}

export default SearchEventGroup;
