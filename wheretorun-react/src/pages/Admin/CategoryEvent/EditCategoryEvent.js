import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
// import FormHelperText from "@mui/material/FormHelperText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

// icon
import EventIcon from "@mui/icons-material/Event";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

//graphql
// const categoryEventQueries = loader(
//   "../../../graphql/queries/categoryEvent.gql"
// );
const updateCategoryEventMutations = loader(
  "../../../graphql/mutations/updateCategoryEvent.gql"
);

const categoryEventIDQueries = loader(
  "../../../graphql/queries/categoryEventID.gql"
);

const EditCategoryEvent = ({ match, history }) => {
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);

  const [valueid, setid] = useState();
  const [eventId, seteventId] = useState();
  const [categoryId, setcategoryId] = useState();

  const [updateCategoryEvent] = useMutation(updateCategoryEventMutations);
  const idRef = useRef();
  const eventIdRef = useRef();
  const categoryIdRef = useRef();

  const handleChange = async (e) => {
    if (eventIdRef.current.value === "" || categoryIdRef.current.value === "") {
      return;
    } else {
      e.preventDefault();
      alert("You have submitted the form.");

      const eventId = eventIdRef.current.value;
      const categoryId = categoryIdRef.current.value;

      const { data } = await updateCategoryEvent({
        variables: {
          id,
          eventId,
          categoryId,
        },
      });

      history.push(`/createdCategoryEvent`);
      window.location.reload();
    }
  };
  const { id } = match.params;
  const { error, loading, data } = useQuery(categoryEventIDQueries, {
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
            {/* startประเภทหมวดหมู่งานวิ่ง */}
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
                      <h2>แก้ไขการเลือกประเภทหมวดหมู่ของงานวิ่ง</h2>
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
                                ref={eventIdRef}
                                defaultValue={
                                  data.categoryevent.event.eventnameTh
                                }
                                value={eventId}
                                onChange={() =>
                                  seteventId(eventIdRef.current.value)
                                }
                                required
                                disabled
                              >
                                <option
                                  key={data.categoryevent.event.id}
                                  value={data.categoryevent.event.id}
                                >
                                  {data.categoryevent.event.eventnameTh}
                                </option>
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
                              <label>ประเภทหมวดหมู่งานวิ่ง</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                ref={categoryIdRef}
                                defaultValue={
                                  data.categoryevent.category.categorynameTh
                                }
                                value={categoryId}
                                onChange={() =>
                                  setcategoryId(categoryIdRef.current.value)
                                }
                                required
                              >
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
                       <Link to={`/createdCategoryEvent`}>
                        <Button variant="contained" color="inherit">
                          <CancelIcon />
                          &nbsp; Cancel
                        </Button></Link>
                        &nbsp; &nbsp; &nbsp;
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          onClick={handleChange}
                        >
                          <SaveIcon />
                          &nbsp; save change
                        </Button>
                      </Grid>
                    </form>
                  </Card>
                </Grid>
              </Container>
            </Grid>
            {/* endประเภทหมวดหมู่งานวิ่ง */}
          </Card>
        </Container>

        {/* id */}
        <Container>
          <Box component="section" py={6}>
            <Container>
              <Modal
                open={show}
                onClose={toggleModal}
                sx={{ display: "grid", placeItems: "center" }}
              >
                <Slide direction="down" in={show} timeout={700}>
                  <Card
                    position="relative"
                    width="700px"
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
                    <div className="form col-md-12">
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <EventIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <div className="form col-md-11">
                          <label>รหัส</label>
                          <input
                            type="text"
                            className="form-control"
                            aria-describedby="emailHelp"
                            value={valueid}
                            defaultValue={data.categoryevent.id}
                            required
                            ref={idRef}
                          />
                        </div>
                      </ListItem>
                    </div>
                    <Divider sx={{ my: 0 }} />
                  </Card>
                </Slide>
              </Modal>
            </Container>
          </Box>
        </Container>
      </Box>
    </Box>
    // <Box pt={6} px={1} mt={6}>
    //     {/* <DefaultFooter content={footerRoutes} /> */}
    //   </Box>
  );
};
export default EditCategoryEvent;
