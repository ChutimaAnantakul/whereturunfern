import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
// import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
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
// import Typography from "@mui/material/Typography";

// icon
import EventIcon from "@mui/icons-material/Event";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
// import CloseIcon from "@mui/icons-material/Close";
// import ImageIcon from "@mui/icons-material/Image";

//lodergrapghl
const updateEnvironmentMutations = loader(
  "../../../graphql/mutations/updateEnvironment.gql"
);
const environmentIDQueries = loader(
  "../../../graphql/queries/environmentID.gql"
);

const EditEnvironment = ({ match, history }) => {

  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);

  const [valueid, setid] = useState();
  const [environmentTh, setenvironmentTh] = useState();
  const [environmentEn, setenvironmentEn] = useState();

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  const [updateEnvironment] = useMutation(updateEnvironmentMutations);
  const idRef = useRef();
  const environmentThRef = useRef();
  const environmentEnRef = useRef();

  const handleChange = async (e) => {
    if (
      environmentThRef.current.value === "" ||
      environmentEnRef.current.value === ""
    ) {
      return;
    } else {
      e.preventDefault();
      alert("You have submitted the form.");

      // const id = idRef.current.value;
      const environmentTh = environmentThRef.current.value;
      const environmentEn = environmentEnRef.current.value;

      const { data } = await updateEnvironment({
        variables: {
          id,
          environmentTh,
          environmentEn,
        },
      });

      history.push(`/environment`);
      window.location.reload();
    }
  };
  //   const handleCancel = async (e) => {
  //     window.location.reload();
  //     history.push(`/environment`);
  //   };

  const { id } = match.params;
  const { loading, error, data } = useQuery(environmentIDQueries, {
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
                      <h2>?????????????????????????????????????????????????????????????????????</h2>
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
                            <label>?????????????????????????????????????????????????????? (?????????????????????)</label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              defaultValue={data.environment.environmentTh}
                              value={environmentTh}
                              required
                              ref={environmentThRef}
                              onChange={() =>
                                setenvironmentTh(
                                  environmentThRef.current.value
                                )
                              }
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
                            <label>????????????????????????????????????????????????????????????????????????????????????</label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              defaultValue={data.environment.environmentEn}
                              value={environmentEn}
                              required
                              pattern="[A-Za-z0-9,():;* '%#<>_^|./\\s]*"
                                title="?????????????????????????????????????????????????????????????????????????????????????????????"
                              ref={environmentEnRef}
                              onChange={() =>
                                setenvironmentEn(
                                  environmentEnRef.current.value
                                )
                              }
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
                        <Link to={`/environment`}>
                          <Button variant="contained" color="inherit">
                            <CancelIcon />
                            &nbsp; Cancel
                          </Button>
                        </Link>
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
                      {/* </Grid> */}
                    </form>
                  </Card>
                </Grid>
              </Container>
            </Box>
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
                          <label>????????????</label>
                          <input
                            type="text"
                            className="form-control"
                            aria-describedby="emailHelp"
                            value={valueid}
                            defaultValue={data.environment.id}
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
export default EditEnvironment;
