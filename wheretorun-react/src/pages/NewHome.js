import React, { useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@mui/material/Toolbar";
import CardContent from "@mui/material/CardContent";
import Fab from "@material-ui/core/Fab";

// icon
import EventSharpIcon from "@material-ui/icons/EventSharp";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddLocationIcon from "@mui/icons-material/AddLocation";

//page
import SearchCategoryEvent from "./SearchCategoryEvent";
import Navbar from "../pages/layout/Navbar";

// graphql
const eventsQuery = loader("../graphql/queries/events.gql");

function NewHome() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const classes = useStyles();

  const handleReload = () => {
    // e.preventDefault();
    window.location.reload();
  };

  const inputeventThRef = useRef();
  const inputhashtagRef = useRef();
  const inputprovinceIdRef = useRef();

  const [eventnameTh, seteventnameTh] = useState("");
  const [hashtag, sethashtag] = useState("");
  const [provinceId, setprovinceId] = useState([]);
  const [status] = useState(true);

  const { error, loading, data } = useQuery(eventsQuery, {
    variables: {
      eventnameTh,
      hashtag,
      provinceId,
      status,
    },
  });
console.log(eventnameTh);
  // const handleClick = () => {
  //   // setShow(!show);
  //   seteventnameTh(inputeventThRef.current.value);
  //   sethashtag(inputhashtagRef.current.value);
  //   setprovinceId(inputprovinceIdRef.current.value);
  // };

  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }

  return (
    <>
      <Box xs={12} sx={{ display: "top" }}>
        <Navbar />
        <Toolbar />
        <Box
          minHeight="70vh"
          // height="100%"
          width="100%"
          sx={{
            backgroundImage: `url(${"https://th.hellomagazine.com/wp-content/uploads/2020/02/3240975.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Container>
            <Grid
              container
              item
              xs={12}
              lg={12}
              justifyContent="center"
              mx="auto"
            >
              <Container position="fixed">
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
                        position="fixed"
                        sx={{
                          overflow: "hidden",
                          borderRadius: "12px",
                          mb: 4,
                          mt: 72,
                          mr: 12,
                          ml: 12,
                          width: "100%",
                          boxShadow: 2,
                          bgcolor: "#EEF2FF",
                        }}
                        fullWidth
                      >
                        <form>
                          <Grid
                            container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                            // spacing={1}
                            item
                            xs={12}
                          >
                            <Grid item xs={3}>
                              <ListItem>
                                <div className="form col-md-12 ">
                                  <label>ชื่องานวิ่ง</label>
                                  <input
                                    id="standard-basic"
                                    className="form-control"
                                    ref={inputeventThRef}
                                    placeholder="ค้นหาชื่องานวิ่ง..."
                                    // placeholder={eventnameTh}
                                    fullWidth
                                  />
                                </div>
                              </ListItem>
                            </Grid>
                            <Grid item xs={3}>
                              <ListItem>
                                <div className="form col-md-12 ">
                                  <label>จังหวัด</label>
                                  <select
                                    className="form-select"
                                    native
                                    ref={inputprovinceIdRef}
                                    defaultValue={provinceId}
                                    // value={provinceId}
                                    // onChange={() =>
                                    //   setprovinceId(inputprovinceIdRef.current.value)
                                    // }
                                    fullWidth
                                    inputProps={{
                                      name: "age",
                                      id: "age-native-simple",
                                    }}
                                  >
                                    <option aria-label="None">
                                      ค้นหาด้วยจังหวัด...
                                    </option>
                                    {data.provinces.nodes.map((provinces) => (
                                      <option
                                        key={provinces.id}
                                        value={provinces.id}
                                      >
                                        {provinces.provinceTh}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </ListItem>
                            </Grid>
                            <Grid item xs={3}>
                              <ListItem>
                                <div className="form col-md-12 ">
                                  <label>#แฮชแท็ก</label>
                                  <input
                                    id="standard-basic"
                                    className="form-control"
                                    // label="แฮชแท็ก"
                                    ref={inputhashtagRef}
                                    // placeholder={hashtag}
                                    placeholder="ค้นหาด้วยแฮชแท็ก..."
                                    fullWidth
                                  />
                                </div>
                              </ListItem>
                            </Grid>
                            {/* <Grid
                              container
                              direction="row"
                              justifyContent="space-evenly"
                              alignItems="center"
                            > */}
                              <Grid item xs={1}>
                                <ListItem>
                                  <div className="form col-md-12 ">
                                    <label></label>
                                    <br />
                                    <Button
                            variant="contained"
                                      size="large"
                                      value="search"
                                      color="primary"
                                      type="submit"
                                      onClick={() => (
                                        seteventnameTh(
                                          inputeventThRef.current.value
                                        ),
                                        sethashtag(
                                          inputhashtagRef.current.value
                                        ),
                                        inputprovinceIdRef(
                                          inputprovinceIdRef.current.value
                                        )
                                      )}
                                    >
                                      <SearchIcon /> <div>ค้นหา</div>
                                      {/* <div>{show ? "ค้นหา" : "ค้นหา"}</div> */}
                                    </Button>
                                  </div>
                                  
                                </ListItem>
                              </Grid>
                              <Grid item xs={2}>
                                <ListItem>
                                  <div className="form col-md-12 ">
                                    <label></label>
                                    <br />
                                    <Button
                                      variant="outlined"
                                      onClick={handleReload}
                                      size="large"
                                      // color="inherit"
                                    >
                                      <div>ล้างคำค้นหา</div>
                                    </Button>
                                  </div>
                                </ListItem>
                              </Grid>
                            {/* </Grid> */}
                          </Grid>
                          <br />
                        </form>
                      </Card>
                    </Grid>
                  </Container>
                </Box>
              </Container>
            </Grid>
          </Container>
        </Box>
        <Card
          sx={{
            p: 3,
            // mx: { xs: 2, lg: 3 },
            // mt: -8,
            mb: 4,
            // mr: 25,
            // ml: 25,
            backgroundColor: "while",
            backdropFilter: "saturate(200%) blur(30px)",
            overflow: "hidden",
            // borderRadius: "12px",
            boxShadow: 2,
            // bgcolor: "#EDEEF7",
          }}
        ></Card>
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
                  <h2>กำลังรับสมัคร🔥</h2>
                </CardContent>
              </Card>
            </Grid>
            <br />
            <Grid container spacing={3} sx={{ mb: 5 }}>
              <Grid item xs={12} lg={12}>
                <Grid container spacing={3}>
                  {data.events.nodes.map((events) => (
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
          {/* search */}
          <SearchCategoryEvent />
        </Card>

        {/* <Box pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </Box> */}
      </Box>
    </>
  );
}

export default NewHome;
