import React, { useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@mui/material/Toolbar";
import CardContent from "@mui/material/CardContent";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import CssBaseline from "@mui/material/CssBaseline";

import Paper from "@mui/material/Paper";

import Chip from "@material-ui/core/Chip";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Carousel from "react-bootstrap/Carousel";

// icon
// import EventSharpIcon from "@material-ui/icons/EventSharp";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddLocationIcon from "@mui/icons-material/AddLocation";

//page
import SearchCategoryEvent from "./SearchCategoryEvent";

import Logo from "../images/wheretorun_2.png";

const theme = createTheme();
// graphql
const eventGroupIDQuery = loader("../graphql/queries/eventGroupID.gql");
const updateFollowMutations = loader("../graphql/mutations/updateFollow.gql");

function EventGroupp({ match, history }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));
  const classes = useStyles();


  function SwitchCase(props) {
    switch (props.value) {
      case false:
        return (
          <>
            <Chip label="หมดเขตรับสมัครแล้ว" color="secondary" />
            {/* <Typography color="secondary">
              <GrainIcon />
              หมดเขตรับสมัครแล้ว
            </Typography> */}
          </>
        );
      default:
        return (
          <>
            {/* <Typography color="primary" >
              <GrainIcon />
             <>กำลังรับสมัครอยู่</>
            </Typography> */}
          </>
        );
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReload = () => {
    // e.preventDefault();
    window.location.reload();
  };


  // update follow
  const [updateFollow] = useMutation(updateFollowMutations);
  const [status, setstatus] = React.useState(true);


  // function SwitchCaseFollow(props) {

  //   switch (props.value) {
  //     case true:
  //       return
  //       // <span className="text-muted small"><a href={this.props.url} target="_blank" rel="noopener noreferrer">{this.props.title} {this.props.videoid}</a><VideoModal value={this.props.videoid}/></span>
  //       <Card
  //         sx={{
  //           overflow: "hidden",
  //           borderRadius: "12px",
  //           width: "50%",
  //           bgcolor: "#98BAE7",
  //           color: "primary.contrastText",
  //           textAlign: "center"
  //           // md:4
  //           //   boxShadow: 2,
  //         }}
  //         fullWidth
  //       >
  //         <CardContent>
  //           {/* {status ? ( */}
  //           <button
  //             // checked={status}
  //             checked={followName.followNameB}
  //             value={data.eventgroup.followings.nodes.map((followings) => followings.id)}
  //             onClick={handleChange}
  //           >กำลังติดตาม</button>
  //         </CardContent>
  //       </Card>

  //     case false:
  //       return
  //       // <span className="text-muted small"><a href={this.props.url} target="_blank" rel="noopener noreferrer">{this.props.title} {this.props.videoid}</a></span>
  //       <Card
  //         sx={{
  //           overflow: "hidden",
  //           borderRadius: "12px",
  //           width: "50%",
  //           bgcolor: "#98BAE7",
  //           color: "primary.contrastText",
  //           textAlign: "center"
  //           // md:4
  //           //   boxShadow: 2,
  //         }}
  //         fullWidth
  //       >
  //         <CardContent>
  //           {/* {status ? ( */}
  //           <button
  //             // checked={status}

  //             checked={followName.followNameA}
  //             value={data.eventgroup.followings.nodes.map((followings) => followings.id)}
  //             onClick={handleChange}
  //           >ติดตาม</button>
  //         </CardContent>
  //       </Card>
  //     default:
  //       return props;
  //   }
  // }


  const followNameRef = useRef();
  // const [followName, setfollowName] = React.useState({
  //   followNameA: "ติดตาม",
  //   followNameB: "กำลังติดตาม",
  // });

  const handleChange = async (event) => {

    const id = event.target.value;
    const followName = followNameRef.current.name;
    // setfollowName(event.target.checked)
    setstatus(event.target.checked);
    setstatus(!status)
    // setfollowName(event.target.checked);
    console.log(followName, status, id);
    const { data } = await updateFollow({
      variables: {
        // id,
        id,
        status,
        followName,
      },
    });

    // window.location.reload();
    history.push(`/eventgroup/${data.eventgroup.id}`);
  };

  const { id } = match.params;
  const { loading, error, data } = useQuery(eventGroupIDQuery, {
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
  // console.log(data.eventgroup.followings.nodes.map((followings) => followings.status))

  return (
    <>
      <Box xs={12} sx={{ display: "top" }} className={classes.root}>
        {/* <Navbar /> */}
        <Toolbar />
        <Box>
          <ThemeProvider theme={theme}>
            <Grid
              container
              component="main"
              justifyContent="center"
              mx="auto"
              sx={{
                md: 2,
                overflow: "hidden",
                borderRadius: "12px",
                width: "100%",
                // height:"50%",
                boxShadow: 2,
                // bgcolor: "#EEF2FF",
              }}
            >
              <CssBaseline />

              <img height="530" src={data.eventgroup.eventgroupimageurl} />


            </Grid>
          </ThemeProvider>
        </Box>

        <Card
          sx={{
            p: 1,
            // mx: { xs: 2, lg: 3 },
            // mt: -8,
            mb: 4,
            // mr: 25,
            // ml: 25,
            backdropFilter: "saturate(200%) blur(30px)",
            overflow: "hidden",
            // borderRadius: "12px",
            // boxShadow: 2,
            bgcolor: "#676FA3",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6} sm={3} color="primary.contrastText">
              <Grid>งานวิ่ง {data.eventgroup.events.totalCount} รายการ</Grid>
            </Grid>

          </Grid>
        </Card>
        <Card
          sx={{
            p: 1,
            // mx: { xs: 2, lg: 3 },
            mt: -3,
            mb: 6,
            mr: 10,
            ml: 10,
            backgroundColor: "while",
            backdropFilter: "saturate(200%) blur(30px)",
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: 2,
          }}
        >
          <Container sx={{ mt: 2 }}>
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
                  overflow: "hidden",
                  borderRadius: "12px",
                  width: "100%",
                  bgcolor: "#98BAE7",
                  color: "primary.contrastText",
                  // md:4
                  //   boxShadow: 2,
                }}
                fullWidth
              >
                {/* <EventSharpIcon color="primary" style={{ fontSize: 35 }} /> */}
                <CardContent>
                  <h2>{data.eventgroup.eventgroupnameTh}</h2>
                </CardContent>
              </Card>

            </Grid>
            <Grid
              item
              xs={3}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Card
                sx={{
                  overflow: "hidden",
                  borderRadius: "12px",
                  width: "50%",
                  bgcolor: "#98BAE7",
                  color: "primary.contrastText",
                  textAlign: "center"
                }}
                fullWidth
              >
                <CardContent>
                  {/* <button
                    checked={status}
                    // checked={followName.followNameA}
                    value={data.eventgroup.followings.nodes.map((followings) => followings.id)}
                    onClick={handleChange}
                  >{data.eventgroup.followings.nodes.map((followings) => followings.followName)}</button> */}

                  {status ? (
                    <button
                    checked={status}
                    // checked={followName.followNameA}
                    value={data.eventgroup.followings.nodes.map((followings) => followings.id)}
                    name="UnFollow"
                    ref={followNameRef}
                    onClick={handleChange}
                  >{data.eventgroup.followings.nodes.map((followings) => followings.followName)}</button>) : (<button
                    checked={status}
                    // checked={followName.followNameB}
                    value={data.eventgroup.followings.nodes.map((followings) => followings.id)}
                    name="Follow"
                    ref={followNameRef}
                    onClick={handleChange}
                  >{data.eventgroup.followings.nodes.map((followings) => followings.followName)}</button>)}
                </CardContent>
              </Card>
              {/* <SwitchCaseFollow value={data.eventgroup.followings.nodes.map((followings) => followings.status)} /> */}
            </Grid>
            <br />
            <Grid container spacing={3} sx={{ mb: 5 }}>
              <Grid item xs={12} lg={12}>
                <Grid container spacing={3}>
                  {data.eventgroup.events.nodes.map((events) => (
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
                        <Box color="secondary.main">{events.hashtag}</Box>
                        <SwitchCase value={events.status} />
                        <Grid
                          sx={{
                            mt: 1,
                          }}
                        />
                        {/* <Link to={`/event/${events.id}`}> */}
                        <div className="form col-md-12 ">
                          <h6>{events.eventnameTh}</h6>
                        </div>

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

        </Card>

        {/* <Box pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </Box> */}
      </Box>
    </>
  );
}

export default EventGroupp;
