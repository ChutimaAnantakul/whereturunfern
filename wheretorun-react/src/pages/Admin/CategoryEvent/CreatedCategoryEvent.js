import React, { useRef } from "react";
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
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";

//graphql

const categoryEventQueries = loader(
  "../../../graphql/queries/categoryEvent.gql"
);

const createCategoryMutations = loader(
  "../../../graphql/mutations/createCategory.gql"
);
const createdcategoryEventsMutations = loader(
  "../../../graphql/mutations/createdcategoryEvents.gql"
);

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const CreatedCategoryEvent = ({ history }) => {
  const [createCategory] = useMutation(createCategoryMutations);
  const categorynameThRef = useRef();
  const categorynameEnRef = useRef();

  const handleSubmit = async (e) => {
    if (
      categorynameThRef.current.value === "" ||
      categorynameEnRef.current.value === ""
    ) {
      return;
    } else {
      e.preventDefault();
      alert("You have submitted the form.");

      const categorynameTh = categorynameThRef.current.value;
      const categorynameEn = categorynameEnRef.current.value;

      const { data } = await createCategory({
        variables: {
          // id,
          categorynameTh,
          categorynameEn,
        },
      });
      window.location.reload();
      history.push(`/createdCategoryEvent`);
    }
  };

  const handleCancel = async (e) => {
    window.location.reload();
    // history.push(`/category`);
  };

  const [createCategories] = useMutation(createdcategoryEventsMutations);
  const eventIdofcategoryRef = useRef();
  const categoryIdRef = useRef();

  const categoriesSubmit = async (e) => {
    if (
      eventIdofcategoryRef.current.value === "" ||
      categoryIdRef.current.value === ""
    ) {
      return;
    } else {
      e.preventDefault();
      alert("You have submitted the form.");

      const eventId = eventIdofcategoryRef.current.value;
      const categoryId = categoryIdRef.current.value;

      const { data } = await createCategories({
        variables: {
          eventId,
          categoryId,
        },
      });

      window.location.reload();
      history.push(`/createdCategoryEvent`);
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
                          <h2>เพิ่มประเภทหมวดหมู่งานวิ่ง</h2>
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
                        <br />
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
                                  <label>ประเภทหมวดหมู่งานวิ่ง (ภาษาไทย)</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    aria-describedby="emailHelp"
                                    placeholder="ประเภทหมวดหมู่งานวิ่ง (ภาษาไทย)"
                                    required
                                    ref={categorynameThRef}
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
                                  <label>
                                    ประเภทหมวดหมู่งานวิ่ง (ภาษาอังกฤษ)
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    aria-describedby="emailHelp"
                                    placeholder="ประเภทหมวดหมู่งานวิ่ง (ภาษาอังกฤษ)"
                                    pattern="[A-Za-z0-9,():;* '%#<>_^|./\\s]*"
                                    title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                                    required
                                    ref={categorynameEnRef}
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
                    {/* <Box
                      display="flex"
                      justifyContent="space-between"
                      p={1.5}
                      sx={{
                        p: 2,
                        mx: { xs: 2, lg: 12 },
                        mt: 2,
                        mb: 2,
                      }}
                    /> */}
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
                          <h2>เลือกประเภทหมวดหมู่ของงานวิ่ง</h2>
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
                                  <label>ชื่องานวิ่ง</label>
                                  <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    ref={eventIdofcategoryRef}
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
                                  <label>ประเภทหมวดหมู่งานวิ่ง</label>
                                  <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    ref={categoryIdRef}
                                    required
                                  >
                                    {/* <option value={""}>None</option> */}
                                    {data.categories.nodes.map((categories) => (
                                      <option
                                        key={categories.id}
                                        value={categories.id}
                                      >
                                        {categories.categorynameTh}
                                      </option>
                                    ))}
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
                              onClick={categoriesSubmit}
                            >
                              <SaveIcon />
                              &nbsp;save
                            </Button>
                          </Grid>
                        </form>
                      </Card>
                    </Grid>
                    {/* <Box display="flex" justifyContent="space-between" p={1.5}>
                      <Link to="/createdRaceEvent">
                        <Button size="large" color="primary">
                          <ArrowBackIcon />
                          &nbsp; back
                        </Button>
                      </Link>
                      <Link to="/createdEnvironmentEvent">
                        <Button size="large" color="primary">
                          next&nbsp;
                          <ArrowForwardIcon />
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
                      <h2>ตารางประเภทหมวดหมู่ของงานวิ่ง</h2>
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
                                  <h6>ประเภทหมวดหมู่งานวิ่ง</h6>
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
                            {data.categoryevents.nodes
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((categoryevents) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                  <TableCell align="left">
                                    <div>
                                      <h6>
                                        {categoryevents.event.eventnameTh}
                                      </h6>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <h6>
                                        {categoryevents.category.categorynameTh}
                                      </h6>
                                    </div>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Link
                                      to={`/editcategoryevent/${categoryevents.id}`}
                                    >
                                      <Button
                                        variant="contained"
                                        color="inherit"
                                        key={categoryevents.id}
                                        // href={`/eventgroup/${eventgroup.id}`}
                                        // onClick={EdittoggleModal}
                                      >
                                        <EditIcon />
                                        &nbsp;Edit
                                      </Button>
                                    </Link>
                                    &nbsp; &nbsp; &nbsp;
                                    <Link
                                      to={`/delCategoryEvent/${categoryevents.id}`}
                                    >
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        key={categoryevents.id}
                                        // key={categories.id}
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
                        count={data.categoryevents.totalCount}
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
};
export default CreatedCategoryEvent;
