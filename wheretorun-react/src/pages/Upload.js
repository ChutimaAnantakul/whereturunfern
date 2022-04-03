import React, { useRef, useState } from "react";
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
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
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
const createCategoryMutations = loader(
  "../graphql/mutations/createRequest.gql"
);
const categoriesQueries = loader("../graphql/queries/categories.gql");

const Upload = ({ history }) => {
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

  const [createCategory] = useMutation(createCategoryMutations);
  const fileRef = useRef();
  let [file, setFile] = useState(null);
  let [filename, setFilename] = useState('');

  const filterBySize = (file) => {
    //filter out files larger than 5MB
    return file.size < 5242880;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("You have submitted the form.");

    const file = fileRef.current.files[0];
    let reader = new FileReader();
    /**Capture filename */
    setFilename(file.name);
    console.log(file);
    reader.onload = function (e) {

      setFile(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);

    if (file != ".png" || file != ".jpg") {
      window.alert("File does not support. You must use .png or .jpg ");
      return false;
    }
    if (file.size > 5242880) {
      window.alert("Please upload a file smaller than 1 MB");
      return false;
    }
    const { data } = await createCategory({
      variables: {
        // id,
        file,
      },
    });
    window.location.reload();
    history.push(`/up`);
  };


  const { error, loading, data } = useQuery(categoriesQueries);

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
                      <h2>อัพโหลดไฟล์</h2>
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
                            <label>อัพไฟล์</label>
                            <input
                              type="file"
                              className="form-control"
                              aria-describedby="emailHelp"
                              accept=".png, .jpg, .pdf, .docx, .jpeg"
                              fileFilter={filterBySize}
                              required
                              ref={fileRef}
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
                      //   boxShadow: 2,
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
                              {/* <TableCell></TableCell> */}
                              <TableCell>
                                <div>
                                  <h6>ประเภทหมวดหมู่งานวิ่ง (ภาษาไทย)</h6>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <h6>ประเภทหมวดหมู่งานวิ่ง (ภาษาอังกฤษ)</h6>
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
                            {data.categories.nodes
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((categories) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                  <TableCell align="left">
                                    <div>
                                      <h6>{categories.categorynameTh}</h6>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <h6>{categories.categorynameEn}</h6>
                                    </div>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Link to={`/editcategory/${categories.id}`}>
                                      <Button
                                        variant="contained"
                                        color="inherit"
                                        key={categories.id}
                                      // href={`/eventgroup/${eventgroup.id}`}
                                      // onClick={EdittoggleModal}
                                      >
                                        <EditIcon />
                                        &nbsp;Edit
                                      </Button>
                                    </Link>
                                    &nbsp; &nbsp;
                                    <Link to={`/delcategory/${categories.id}`}>
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        key={categories.id}
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
                        count={data.categories.totalCount}
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
export default Upload;
