import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../components/notification/Notifica";
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

//page
import Navbar from "../pages/layout/Navbar";

// icon
import EventIcon from "@mui/icons-material/Event";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import DoneIcon from "@material-ui/icons/Done";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";


//graphql
const requesteventQueries = loader(
  "../graphql/queries/requestevent.gql"
);
const createRequestapprovalMutations = loader(
  "../graphql/mutations/createRequestapproval.gql"
);

function UploadRequest({ history }) {

  const [createRequestapproval] = useMutation(createRequestapprovalMutations);
  const linkdriveRef = useRef();
  const eventIdRef = useRef();

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  // const changeHandler = (e) => {
  //   setSelectedFile(e.target.files[0]);
  //   setIsFilePicked(true);
  //   console.log(e.target.files[0])
  // };

  const handleSubmit = async (e) => {
    if (
      eventIdRef.current.value === "" ||
      linkdriveRef.current.value === ""  
    ) {
      return;
    } else {
      e.preventDefault();
      alert("You have submitted the form.");

      const eventId = eventIdRef.current.value;
      const linkdrive = linkdriveRef.current.value;
      
      console.log(eventId, linkdrive);
      const { data } = await createRequestapproval({
        variables: {
          // id,
          eventId,
          linkdrive
        },
      });
      window.location.reload();
      history.push(`/uprequest`);
    }
  };

  // const handleCancel = async (e) => {
  //   window.location.reload();
  //   // history.push(`/environment`);
  // };


  const { error, loading, data } = useQuery(requesteventQueries);

  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }

  // console.log(data.uploads.nodes.map((uploads) => uploads.event.id));

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      {/* <Sidebar /> */}
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
                          <h2>ขอสิทธิ์แก้ไขข้อมูลงานวิ่ง</h2>
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
                                <div className="form col-md-5 ">
                                  <label>ชื่องานวิ่ง</label>
                                  <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    ref={eventIdRef}
                                    required
                                  >
                                    {/* <option value={""}>None</option>
                                    {data.events.nodes.map((event) => (
                                      <option key={event.id} value={event.id}>
                                        {event.eventnameTh}
                                      </option>
                                    ))} */}
                                    <option value={""}>None</option>
                                    {/* {data.uploads.nodes.map((uploads) => (
                                      <option key={uploads.event.id} value={uploads.event.id}>
                                        {uploads.event.eventnameTh}
                                      </option>
                                    ))} */}
                                    {data.events.nodes.map((events) => (
                                      <option key={events.id} value={events.id}>
                                        {events.eventnameTh}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <ListItemAvatar>
                                  <Avatar>
                                    <EventIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <div className="form col-md-6 ">
                                  <label>ลิ้งค์ไดรฟ์</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    aria-describedby="emailHelp"
                                    required
                                    ref={linkdriveRef}
                                    accept=".png,.jpg,.pdf,.docx,.gif, .jpeg, .tiff, .gif"
                                  // onChange={changeHandler}
                                  />
                                  {/* {isFilePicked ? (
                                    <div>
                                      <p>Filename: {selectedFile.name}</p>
                                      <p>Filetype: {selectedFile.type}</p>
                                      <p>Size in bytes: {selectedFile.size}</p>
                                      <p>
                                        lastModifiedDate:{' '}
                                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                                      </p>
                                    </div>
                                  ) : (
                                    <p>Select a file to show details</p>
                                  )} */}
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
                            {/* <Button
                              variant="contained"
                              color="inherit"
                            // onClick={handleCancel}
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
                              &nbsp; save
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
export default UploadRequest;
