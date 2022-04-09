import React from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@mui/material/ListItem";
import List from "@material-ui/core/List";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Card from "@mui/material/Card";
import Divider from "@material-ui/core/Divider";
import CardContent from "@mui/material/CardContent";

//page
import Navbar from "../../../pages/layout/Navbar";
import NavbarEn from "../../../pages/layout/NavbarEn";

//lodergrapghl
const adminsQueries = loader("../../../graphql/queries/admin.gql");

const ProfileAdmin = ({ history, match }) => {
  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: "100%",
    },
  });

  const classes = useStyles();

  const { id } = match.params;
  const { loading, error, data } = useQuery(adminsQueries, {
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
  console.log(data);

  return (
    <Box xs={12} sx={{ display: "flex" }}>
<Navbar />
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
          {/* <Card
            sx={{
              p: 2,
              mt: 2,
              mb: 4,
              borderRadius: "12px",
            }}
          > */}
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              // style={{ minHeight: '100vh' }}
            >
              <Card
                justifyContent="center"
                alignItems="flex-start"
                sx={{
                  overflow: "hidden",
                  borderRadius: "12px",
                  boxShadow: 1,
                  mt: 4,
                  mb: 4,
                  width: "40%",
                }}
              //   style={{ backgroundColor: 'teal',
              //   align:"right"
              //  }}
              >
                {" "}
                <CardContent>
                  {/* <ListItem>
                  &nbsp;
                  <h5>ข้อมูลส่วนตัว</h5>

                </ListItem> */}
                  <Grid
                    align="center"
                    container
                    direction="column"
                    justify="center"
                    spacing={0}
                  >
                    <h5>ข้อมูลส่วนตัว</h5>
                  </Grid>


                  <Grid
                    container
                    item
                    // justifyContent="center"
                    xs={12}
                  // my={2}
                  >
                    <List className={classes.root}>
                      {/* {data.event.reviews.nodes.map((reviews) => ( */}
                      <div>
                        <ListItem>
                          <Avatar
                            alt={data.admin.firstname}
                            src={data.admin.profileimageurl}
                            sx={{ width: 130, height: 130 }}
                          />
                          &nbsp;
                          <div className="form col-md-12">
                            <div className="form col-md-12">
                              <p><b> ชื่อ - นามสกุล : 
                              </b>&nbsp;
                              {data.admin.firstname}&nbsp;
                                {data.admin.lastname}</p>
                            </div>
                            <div className="form col-md-12">
                              <p><b>อีเมล : </b>&nbsp;{data.admin.email}</p>
                            </div>
                            <div className="form col-md-12">
                              <p><b>รหัสผ่าน : </b>&nbsp;{data.admin.password}</p>
                            </div>
                          </div>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>
                      {/* ))} */}
                    </List>
                  </Grid>
                  <hr />
                </CardContent>
              </Card>
            </Grid>
          {/* </Card> */}
        </Container>
      </Box>
    </Box>

  );
};
export default ProfileAdmin;
