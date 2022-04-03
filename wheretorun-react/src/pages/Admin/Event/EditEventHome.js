import React from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CardMedia from "@mui/material/CardMedia";
// import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

// icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DateRangeIcon from "@mui/icons-material/DateRange";

//graphql
const eventsQuery = loader("../../../graphql/queries/editEventEdit.gql");

function EditEventHome({ history }) {
  const { error, loading, data } = useQuery(eventsQuery);

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
                  xs={12}
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
                      <h2>แก้ไขงานวิ่ง</h2>
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
                      // boxShadow: 2,
                    }}
                    fullWidth
                  >
                    <br />
                    <Grid container spacing={3} sx={{ mb: 12 }}>
                      <Grid item xs={12} lg={12}>
                        <Grid container spacing={3}>
                          {data.events.nodes.map((events) => (
                            <Grid item xs={12} md={4} key={events.id}>
                              <Link to={`/event/${events.id}`}>
                                <Card
                                  sx={{
                                    overflow: "hidden",
                                    borderRadius: "12px",
                                    boxShadow: 3,
                                    mb: 2,
                                    mr: 2,
                                    ml: 2,
                                  }}
                                >
                                  <CardMedia
                                    component="img"
                                    width="100%"
                                    height="150"
                                    image={events.coverphotourl}
                                    alt="Live from space album cover"
                                  />
                                </Card>
                                {/* <Link to={`/event/${events.id}`}> */}
                                <div className="form col-md-12 ">
                                  <h6>{events.eventnameTh}</h6>
                                </div>
                                <div className="form col-md-12 ">
                                  <AccountCircleIcon />
                                  &nbsp;{events.organizer}
                                </div>
                                <div className="form col-md-12 ">
                                  <DateRangeIcon />
                                  &nbsp;รับสมัคร:{events.openforapplications}
                                  &nbsp;-&nbsp;
                                  {events.applicationdeadline}
                                </div>
                                <div className="form col-md-12 ">
                                  <DateRangeIcon />
                                  &nbsp;จัดงานวิ่ง:{events.startdate}
                                  &nbsp;-&nbsp;
                                  {events.enddate}
                                </div>
                              </Link>
                              {/* <Divider sx={{ my: 0 }} /> */}
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                p={1.5}
                              >
                                <div className="form col-md-12 ">

                                  <Link 
                                  to={`/editEvent/${events.id}`}
                                  >
                                    <Button
                                      variant="contained"
                                      color="inherit"
                                      key={events.id}
                                      // href={`/eventgroup/${eventgroup.id}`}
                                      // onClick={EdittoggleModal}
                                    >
                                      <EditIcon />
                                      &nbsp;Edit
                                    </Button>
                                  </Link>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {/* </Link> */}
                                  {/* <Link to={`/delcategory/${categories.id}`}> */}
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    // key={categories.id}
                                    // onClick={toggleModal}
                                  >
                                    <DeleteIcon />
                                    &nbsp; Delete
                                  </Button>
                                </div>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
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
}
export default EditEventHome;
