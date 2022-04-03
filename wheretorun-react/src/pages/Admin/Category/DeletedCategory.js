import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
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
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// icon
import EventIcon from "@mui/icons-material/Event";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
// import ImageIcon from "@mui/icons-material/Image";

//lodergrapghl
const deletedCategoryMutations = loader(
  "../../../graphql/mutations/deletedCategory.gql"
);

const categoryIDQueries = loader("../../../graphql/queries/categoryID.gql");

const DeletedCategory = ({ match, history }) => {
  const [show, setShow] = useState(true);
  const toggleModal = () => setShow(show);

  // const [del, setdel] = useState(false);
  // const deltoggleModal = () => setdel(!del);

  const [deletedCategory] = useMutation(deletedCategoryMutations);
  const idRef = useRef();

  const handleSubmit = async (e) => {
    if (idRef.current.value === "") {
      return;
    } else {
      e.preventDefault();
      alert("You have submitted the form.");

      const id = idRef.current.value;

      const { data } = await deletedCategory({
        variables: {
          id,
        },
      });

      history.push(`/category`);
      window.location.reload();
    }
  };
  const { id } = match.params;
  const { error, loading, data } = useQuery(categoryIDQueries, {
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
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Card
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      bgcolor: "#5870cb",
                      color: "primary.contrastText",
                      mb: 2,
                      width: "100%",
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
                            <label>ประเภทหมวดหมู่งานวิ่ง (ภาษาไทย)</label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              placeholder="ประเภทหมวดหมู่งานวิ่ง (ภาษาไทย)"
                              required
                              // ref={categorynameThRef}
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
                            <label>ประเภทหมวดหมู่งานวิ่ง (ภาษาอังกฤษ)</label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              placeholder="ประเภทหมวดหมู่งานวิ่ง (ภาษาอังกฤษ)"
                              required
                              // ref={categorynameEnRef}
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
                          // onClick={handleCancel}
                        >
                          <CancelIcon />
                          &nbsp; Cancel
                        </Button>
                        &nbsp; &nbsp; &nbsp;
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          // onClick={handleSubmit}
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
                    <Link to="/category">
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
                    <h6>You want to delete this category !!</h6> <br />
                    {/* <Modal open={del} onClose={deltoggleModal}>
                      <Slide direction="down" in={del} timeout={500}> */}
                    <select
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                      defaultValue={data.category.categorynameTh}
                      value={data.category.id}
                      ref={idRef}
                      required
                      disabled
                    >
                      {" "}
                      <option key={data.category.id} value={data.category.id}>
                        {data.category.categorynameTh}
                      </option>
                    </select>
                    {/* </Slide>
                    </Modal> */}
                    <br />
                  </Box>
                  <Divider sx={{ my: 0 }} />
                  <Box display="flex" justifyContent="space-between" p={1.5}>
                    <Link to="/category">
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
export default DeletedCategory;
