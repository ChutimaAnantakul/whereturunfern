import React, { useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
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
import Divider from "@material-ui/core/Divider";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
// import Typography from "@mui/material/Typography";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

// icon
import SearchIcon from "@material-ui/icons/Search";

// page
import Navbar from "./layout/Navbar";
// graphql
const categoriesQueries = loader("../graphql/queries/categories.gql");
const FollowCategoryMutations = loader("../graphql/mutations/FollowCategory.gql");

function CateFollow() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [FollowCategory] = useMutation(FollowCategoryMutations);
  const IdRef = useRef();
  const followRef = useRef();
  const [followcategory, setffollowcategory] = React.useState({
    followcategoryA: true,
    followcategoryB: false,
  });

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: "100%",
    },
  });

  const classes = useStyles();

  const handleChangeFollowCategory = async (event) => {

    // const id = IdRef.current.value;
    const id = event.target.value;
    const followcategory = event.target.checked
    // setffollowcategory(event.target.checked)
    setffollowcategory(followcategory);
    // setfollowName(event.target.checked);
    console.log(id, followcategory);
    const { data } = await FollowCategory({
      variables: {
        id,
        followcategory,
      },
    });
    // history.push(`/category`);
    // window.location.reload();
  };

  const { error, loading, data } = useQuery(categoriesQueries)
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
      // minHeight="37vh"
      // minWidth="100%"
      // sx={{
      //   backgroundImage: `url(${"https://image.makewebeasy.net/makeweb/0/8TDs3xVVu/article_football/starting_running_feet_runners.png"})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   display: "fixed",
      //   placeItems: "center",
      // }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <Typography
              variant="h1"
              color="white"
              mt={10}
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
                          width: "40%",
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
                                  <TableCell align="center">
                                    {/* <div>
                                      <h4>รูปภาพ</h4>
                                    </div> */}
                                    <div>
                                      <h4>ติดตามหมวดหมู่งานวิ่ง</h4>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {data.categories.nodes.map((categories) => (
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                  >

                                    <TableCell align="left">
                                      <div>
                                        <h6>
                                          <input
                                            type="checkbox"
                                            style={{
                                              color: "#00e676",
                                              width: 20,
                                              height: 20
                                            }}
                                            // className="form-control"
                                            aria-describedby="emailHelp"
                                            required
                                            checked={followcategory.followcategoryB}
                                            value={categories.id}
                                            onChange={handleChangeFollowCategory}

                                          />&nbsp; 
                                          {/* <FormGroup>
                                            <FormControlLabel
                                              control={
                                                <Checkbox
                                                  checked={followcategory.followcategoryB}
                                                  value={categories.id}
                                                  onChange={handleChangeFollowCategory}
                                                />
                                              }
                                              label={categories.categorynameTh} />
                                          </FormGroup> */}

                                          {/* <Checkbox
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                            checked={followcategory.followcategoryB}
                                            value={categories.id}
                                            ref={followRef}
                                            onChange={handleChangeFollowCategory}

                                          /> */}
                                          {categories.categorynameTh}
                                        </h6>
                                      </div>
                                    </TableCell>

                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>

                        </Paper>
                        <Grid
                          container
                          item
                          justifyContent="center"
                          xs={12}
                          my={2}
                        >
                          <Link to="/">
                            <Button
                              variant="contained"
                              type="submit"
                            // onClick={handleSubmit}
                            // onClick={handleChangeFollowCategory}
                            >
                              follow
                            </Button>
                          </Link>
                        </Grid>
                        <Divider variant="inset" component="li" />
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

export default CateFollow;
