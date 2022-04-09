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

import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// icon
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddLocationIcon from "@mui/icons-material/AddLocation";
// import DateRangeIcon from '@material-ui/icons/DateRange';

// page
import Navbar from "./layout/Navbar";
// graphql
const searchEventGroupQuery = loader("../graphql/queries/searchEventGroup.gql");
const createFollowingMutations = loader("../graphql/mutations/createFollowing.gql");

function SearchEventGroup() {
  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: "100%",
  },
  col: {
    color: "#ECB365",
    background: "#ECB365",
  },
  });

  const classes = useStyles();

  // insert follow
  const [createFollowing] = useMutation(createFollowingMutations);
  const eventgroupIdRef = useRef();

  const handleSubmitFollow = async (e) => {

  // const classes = useStyles();
    // e.preventDefault();
    // if (eventIdRef.current.value === { eventId }) {
    //   return;
    // } else {
    // setstatus(!status)
    const eventgroupId = e.target.value;
    console.log(eventgroupId)
    const { data } = await createFollowing({
      variables: {
        // id,
        eventgroupId,
      },
    });

    // window.location.reload();
    // history.push(`/event/${data.createFollowing.following.eventId}`);
    // }
  };
  const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

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
  // console.log(data.eventgroups.nodes.map((eventgroups) => eventgroups.id))

  return (
    <>
      {/* <Navbar /> */}
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
        <Container className={classes.root}>
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
          mb: 3,
          // mr: 25,
          // ml: 25,
          backgroundColor: "while",
          backdropFilter: "saturate(200%) blur(30px)",
          overflow: "hidden",
          // borderRadius: "12px",
          boxShadow: 2,
          bgcolor: "#676FA3",
        }}
      >
        <Box>
          <Container>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid color="primary.contrastText">
                <h4>ดูรายการวิ่งย้อนหลัง</h4>
              </Grid>
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
                        {/* <label>ค้นหางานวิ่ง...</label> */}
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
                  <Grid item xs={3}>
                    <ListItem>
                      <div className="form col-md-12 ">
                        <Button
                          variant="contained"
                          size="large"
                          value="search"
                          type="submit"
                          onClick={() =>
                            seteventgroupnameTh(inputRef.current.value)
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
      {data.eventgroups.nodes.map((eventgroups) => (
        <Container sx={{ mt: 2 }} key={eventgroups.id} >
          <Grid
            item
            xs={3}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Link
              // to={'/searchEventGroup'}
            to={`/eventgroup/${eventgroups.id}`}
            >
              <Card
                sx={{
                  overflow: "hidden",
                  borderRadius: "12px",
                  width: "100%",
                  bgcolor: "#ECB365",
                  color: "primary.contrastText",
                  // md:4
                  //   boxShadow: 2,
                }}

              >
                <CardContent
                >
                  <h5>
                    {/* {show& */}
                   
                    {/* } */}
                    {eventgroups.eventgroupnameTh}🔥
                    </h5>
                    <input
                      type="button"
                      className={classes.col}
                      value={eventgroups.id}
                      ref={eventgroupIdRef}
                      onClick={handleSubmitFollow}
                    />
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <br />
          <Grid container spacing={3} sx={{ mb: 5 }}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                {eventgroups.events.nodes.map((events) => (
                  <Grid item xs={12} md={3} key={events.id}>
                    {/* {show ? ( */}
                    <Link to={`/event/${events.id}`}>
                      <Card
                        sx={{
                          overflow: "hidden",
                          borderRadius: "8px",
                          boxShadow: 1,
                          mb: 2,
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
                      </div>{" "}
                      <Grid
                        sx={{
                          mt: 2,
                        }}
                      />
                      <div className="form col-md-12 ">
                        <AccountCircleIcon />
                        &nbsp;{events.organizer}
                      </div>
                      <div className="form col-md-12 ">
                        <DateRangeIcon />
                        &nbsp;รับสมัคร:&nbsp;{events.openforapplications}
                        &nbsp;-&nbsp;
                        {events.applicationdeadline}
                      </div>
                      <div className="form col-md-12 ">
                        <DateRangeIcon />
                        &nbsp;จัดงานวิ่ง:&nbsp;{events.startdate}&nbsp;-&nbsp;
                        {events.enddate}
                      </div>
                      <div className="form col-md-12 ">
                        <AddLocationIcon />
                        &nbsp;{events.locationTh}
                        {events.province.provinceTh}
                      </div>
                    </Link>
                    {/* // ) : null} */}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      ))}
      {/* </Card> */}

      {/* <Box pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </Box> */}
    </>
  );
}

export default SearchEventGroup;
