import React, { useState, useRef } from "react";
import { useQuery } from "@apollo/client";
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
import Switch from "@material-ui/core/Switch";

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
import Navbar from "../pages/layout/Navbar";
import NavbarEn from "../pages/layout/NavbarEn";

//page
import SearchCategoryEvent from "./SearchCategoryEvent";

import Logo from "../images/wheretorun_2.png";

const theme = createTheme();

// graphql
const eventsQuery = loader("../graphql/queries/events.gql");

function Home() {
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

  const [checked, setChecked] = React.useState(true);

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

  const inputeventThRef = useRef();
  const inputhashtagRef = useRef();
  const inputprovinceIdRef = useRef();

  const [eventnameTh, seteventnameTh] = useState("");
  const [hashtag, sethashtag] = useState("");
  const [provinceId, setprovinceId] = useState([]);
  const [status] = useState(true);

  const handleChangeToggle = async (event) => {
    setChecked(event.target.checked);
    console.log(checked);
  };

  const { error, loading, data } = useQuery(eventsQuery, {
    variables: {
      eventnameTh,
      hashtag,
      provinceId,
      status,
    },
  });

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
      <Box xs={12} sx={{ display: "top" }} className={classes.root}>
        {checked ? <Navbar /> : <NavbarEn />}
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
                width: "170vh",
                // height:"50%",
                boxShadow: 2,
                // bgcolor: "#EEF2FF",
              }}
            >
              <CssBaseline />
              <Grid
                item
                xs={false}
                sm={4}
                md={5}
                justifyContent="center"
                sx={{
                  backgroundImage: "url(https://source.unsplash.com/random)",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: (t) =>
                    t.palette.mode === "light"
                      ? t.palette.grey[50]
                      : t.palette.grey[900],
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <img height="530" src={Logo} />
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={7}
                component={Paper}
                elevation={6}
                square
              >
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h2>
                    {checked ? "งานวิ่งที่น่าสนใจ🔥" : "Interesting event🔥"}
                  </h2>
                  <br />

                  {/* <h2>งานวิ่งที่หน้าสนใจ</h2> */}
                  <Carousel>
                    {data.events.nodes.map((events) => (
                      <Carousel.Item>
                        <Link to={`/event/${events.id}`}>
                          <Card
                            sx={{
                              overflow: "hidden",
                              borderRadius: "8px",
                              boxShadow: 1,
                              mb: 2,
                            }}
                          >
                            <img
                              component="img"
                              width="640vh"
                              height="350"
                              src={events.coverphotourl}
                              alt="Live from space album cover"
                            />
                          </Card>
                        </Link>

                        {/* <Carousel.Caption>
                          <h3>{events.eventnameTh}</h3>
                        </Carousel.Caption> */}
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Box>
              </Grid>
            </Grid>
          </ThemeProvider>
        </Box>
        <Box>
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
                          mt: 2,
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
                                  <label>
                                    {checked ? "ชื่องานวิ่ง" : "eventName"}
                                  </label>
                                  <input
                                    id="standard-basic"
                                    className="form-control"
                                    ref={inputeventThRef}
                                    placeholder={
                                      checked
                                        ? "ค้นหาชื่องานวิ่ง..."
                                        : "search eventName"
                                    }
                                    // placeholder={eventnameTh}
                                    fullWidth
                                  />
                                </div>
                              </ListItem>
                            </Grid>
                            <Grid item xs={3}>
                              <ListItem>
                                <div className="form col-md-12 ">
                                  <label>
                                    {checked ? "จังหวัด" : "province"}
                                  </label>
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
                                      {checked
                                        ? "ค้นหาด้วยจังหวัด..."
                                        : "search province"}
                                    </option>
                                    {data.provinces.nodes.map((provinces) => (
                                      <option
                                        key={provinces.id}
                                        value={provinces.id}
                                      >
                                        {checked
                                          ? provinces.provinceTh
                                          : provinces.provinceEn}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </ListItem>
                            </Grid>
                            <Grid item xs={3}>
                              <ListItem>
                                <div className="form col-md-12 ">
                                  <label>
                                    {checked ? "#แฮชแท็ก" : "hashtag"}
                                  </label>
                                  <input
                                    id="standard-basic"
                                    className="form-control"
                                    // label="แฮชแท็ก"
                                    ref={inputhashtagRef}
                                    // placeholder={hashtag}
                                    placeholder={
                                      checked
                                        ? "ค้นหาด้วยแฮชแท็ก..."
                                        : "search hashtag"
                                    }
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
                                      sethashtag(inputhashtagRef.current.value),
                                      setprovinceId(
                                        inputprovinceIdRef.current.value
                                      )
                                    )}
                                  >
                                    <SearchIcon />{" "}
                                    <div>{checked ? "ค้นหา" : "search"}</div>
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
                                    <div>
                                      {checked ? "ล้างคำค้นหา" : "clear search"}
                                    </div>
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
              <Grid>
                {checked ? "งานวิ่ง" : "Event"} {data.events.totalCount}{" "}
                {checked ? "รายการ" : "List"}
              </Grid>
            </Grid>
            <Grid item xs={6} sm={1}>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                variant="contained"
                color="inherit"
              >
                <div>{checked ? "การจัดเรียง" : "Sort"}</div>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="/events">
                  <MenuItem onClick={handleClose}>
                    {checked ? "จัดเรียงตามตัวอักษร" : "sort alphabetically"}
                  </MenuItem>
                </Link>
                <Link to="/">
                  <MenuItem onClick={handleClose}>
                    {checked
                      ? "จัดเรียงตามวันที่การรับสมัคร"
                      : "Sort by open date"}
                  </MenuItem>
                </Link>
                {/* <MenuItem onClick={handleClose}>จัดเรียงตามวันที่รับสมัคร</MenuItem> */}
              </Menu>
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
                  <h2>{checked ? "กำลังรับสมัคร🔥" : "Openning🔥"}</h2>
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
                        <Box color="secondary.main">{events.hashtag}</Box>
                        <SwitchCase value={events.status} />
                        <Grid
                          sx={{
                            mt: 1,
                          }}
                        />
                        {/* <Link to={`/event/${events.id}`}> */}
                        <div className="form col-md-12 ">
                          <h6>
                            {checked ? events.eventnameTh : events.eventnameEn}
                          </h6>
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
                          &nbsp;{checked ? "รับสมัคร" : "open"}:&nbsp;
                          {events.openforapplications}
                          &nbsp;-&nbsp;
                          {events.applicationdeadline}
                        </div>
                        <div className="form col-md-12 ">
                          <DateRangeIcon />
                          &nbsp;{checked ? "จัดงานวิ่ง" : "event date"}:&nbsp;
                          {events.startdate}&nbsp;-&nbsp;
                          {events.enddate}
                        </div>
                        <div className="form col-md-12 ">
                          <AddLocationIcon />
                          &nbsp;
                          {checked ? events.locationTh : events.locationEn}
                          {checked
                            ? events.province.provinceTh
                            : events.province.provinceTh}
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
      <div className="flex justify-center items-center w-8 h-8 rounded-full m-2 fixed bottom-4 right-4">
        EN
        <Switch
          checked={checked}
          onChange={handleChangeToggle}
          inputProps={{ "aria-label": "controlled" }}
        />
        TH
      </div>
    </>
  );
}

export default Home;
