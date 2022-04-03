import React, { useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Chip from '@material-ui/core/Chip';
import { makeStyles } from "@material-ui/core/styles";

// icon
// import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import GrainIcon from "@material-ui/icons/Grain";

// graphql
const eventsQuery = loader("../graphql/queries/searchCetagoryEvent.gql");

function SearchCategoryEvent() {
  function SwitchCase(props) {
    switch (props.value) {
      case false:
        return (
          <>
          <Chip label="หมดเขตรับสมัครแล้ว" color="secondary"/>
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

  // const [show, setShow] = useState(false);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const classes = useStyles();
  const [valuecategory, setValuecategory] = useState("1");
  const [valueenvironment, setValueenvironment] = useState("1");

  const handleChange = (event, newValue) => {
    setValuecategory(newValue);
  };
  const handleChangeEnvironment = (event, newValue) => {
    setValueenvironment(newValue);
  };

  const { error, loading, data } = useQuery(eventsQuery);

  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }

  return (
    <>
      <Grid
        sx={{
          p: 1,
          bgcolor: "#EDEEF7",
          mb: 1,
          // mx: { xs: 2, lg: 3 },
          // mt: -8,
          mr: 7,
          ml: 7,

          // borderRadius: "12px",
          // boxShadow: 2,
        }}
      />
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
              <h2>หมวดหมู่งานวิ่ง👏</h2>
            </CardContent>
          </Card>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid
              sx={{
                p: 2,
                // bgcolor: "#f3f4ff",
                mb: 3,
              }}
              className={classes.root}
            >
              <TabContext value={valuecategory}>
                <Grid position="static" color="default">
                  <TabList
                    // value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                  >
                    <Tab label="ทั้งหมด" value="1" />
                    {data.categories.nodes.map((categories) => (
                      <Tab
                        label={categories.categorynameTh}
                        value={categories.id}
                      />
                    ))}
                  </TabList>
                </Grid>
                <TabPanel value="1">
                  {/* <Container sx={{ mt: 2 }}> */}
                  <Grid container spacing={3} sx={{ mb: 3 }}>
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
                                  mb: 1,
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
                              <SwitchCase value={events.status} /><Grid
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
                                  mt: 1,
                                }}
                              />
                              <div className="form col-md-12 ">
                                <AccountCircleIcon />
                                &nbsp;{events.organizer}
                              </div>
                              <div className="form col-md-12 ">
                                <DateRangeIcon />
                                รับสมัคร:
                                {events.openforapplications}
                                &nbsp;-&nbsp;
                                {events.applicationdeadline}
                              </div>
                              <div className="form col-md-12 ">
                                <DateRangeIcon />
                                จัดงานวิ่ง:{events.startdate}
                                &nbsp;-&nbsp;
                                {events.enddate}
                              </div>

                              {/* <div className="form col-md-12 ">
                                <SwitchCase value={events.status} />
                              </div> */}
                            </Link>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* </Container> */}
                </TabPanel>

                {data.categories.nodes.map((categories) => (
                  <TabPanel value={categories.id}>
                    {/* <Container sx={{ mt: 2 }}> */}
                    <Grid item xs={12} lg={12}>
                      <Grid container direction="row" spacing={3}>
                        {categories.categoryevents.nodes.map(
                          (categoryevents) => (
                            <Grid
                              container
                              item
                              xs={12}
                              md={3}
                              key={categoryevents.event.id}
                            >
                              <Link to={`/event/${categoryevents.event.id}`}>
                                <Card
                                  sx={{
                                    overflow: "hidden",
                                    borderRadius: "8px",
                                    boxShadow: 1,
                                    mb: 1,
                                  }}
                                >
                                  <CardMedia
                                    component="img"
                                    width="100%"
                                    height="150"
                                    image={categoryevents.event.coverphotourl}
                                    alt="Live from space album cover"
                                  />
                                </Card>
                                <SwitchCase value={categoryevents.event.status} />
                                <Grid
                                  sx={{
                                    mt: 1,
                                  }} />
                                <div className="form col-md-12 ">
                                  <h6>{categoryevents.event.eventnameTh}</h6>
                                </div>
                                <Grid
                                  sx={{
                                    mt: 1,
                                  }}
                                />
                                <div className="form col-md-12 ">
                                  <AccountCircleIcon />
                                  {categoryevents.event.organizer}
                                </div>
                                <div className="form col-md-12 ">
                                  <DateRangeIcon />
                                  รับสมัคร:
                                  {categoryevents.event.openforapplications}
                                  &nbsp;-&nbsp;
                                  {categoryevents.event.applicationdeadline}
                                </div>
                                <div className="form col-md-12 ">
                                  <DateRangeIcon />
                                  จัดงานวิ่ง:
                                  {categoryevents.event.startdate}
                                  &nbsp;-&nbsp;
                                  {categoryevents.event.enddate}
                                </div>
                                <div className="form col-md-12 ">
                                  <AddLocationIcon />
                                  &nbsp;
                                  {categoryevents.event.locationTh}
                                  {categoryevents.event.province.provinceTh}
                                </div>
                              </Link>
                            </Grid>
                          )
                        )}
                      </Grid>
                    </Grid>
                    {/* </Container> */}
                  </TabPanel>
                ))}
              </TabContext>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Grid
        sx={{
          p: 1,
          bgcolor: "#f3f4ff",
          mb: 1,
          mr: 7,
          ml: 7,
        }}
      />
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
              <h2>สภาพแวดล้อมงานวิ่ง👏</h2>
            </CardContent>
          </Card>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid
              sx={{
                p: 2,
                // bgcolor: "#f3f4ff",
                mb: 8,
              }}
              className={classes.root}
            >
              <TabContext value={valueenvironment}>
                <Grid position="static" color="default">
                  <TabList
                    // value={value}
                    onChange={handleChangeEnvironment}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                  >
                    <Tab label="ทั้งหมด" value="1" />
                    {data.environments.nodes.map((environments) => (
                      <Tab
                        label={environments.environmentTh}
                        value={environments.id}
                      />
                    ))}
                  </TabList>
                </Grid>
                <TabPanel value="1">
                  {/* <Container sx={{ mt: 2 }}> */}
                  <Grid container spacing={3} sx={{ mb: 3 }}>
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
                                  mb: 1,
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
                                  mt: 1,
                                }}
                              />
                              <div className="form col-md-12 ">
                                <AccountCircleIcon />
                                &nbsp;{events.organizer}
                              </div>
                              <div className="form col-md-12 ">
                                <DateRangeIcon />
                                &nbsp;รับสมัคร:
                                {events.openforapplications}
                                &nbsp;-&nbsp;
                                {events.applicationdeadline}
                              </div>
                              <div className="form col-md-12 ">
                                <DateRangeIcon />
                                &nbsp;จัดงานวิ่ง:{events.startdate}
                                &nbsp;-&nbsp;
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
                  {/* </Container> */}
                </TabPanel>

                {data.environments.nodes.map((environments) => (
                  <TabPanel value={environments.id}>
                    <Container sx={{ mt: 2 }}>
                      <Grid item xs={12} lg={12}>
                        <Grid container direction="row" spacing={3}>
                          {environments.environmentevents.nodes.map(
                            (environmentevents) => (
                              <Grid
                                container
                                item
                                xs={12}
                                md={3}
                                key={environmentevents.event.id}
                              >
                                <Link
                                  to={`/event/${environmentevents.event.id}`}
                                >
                                  <Card
                                    sx={{
                                      overflow: "hidden",
                                      borderRadius: "8px",
                                      boxShadow: 1,
                                      mb: 1,
                                    }}
                                  >
                                    <CardMedia
                                      component="img"
                                      width="100%"
                                      height="150"
                                      image={
                                        environmentevents.event.coverphotourl
                                      }
                                      alt="Live from space album cover"
                                    />
                                  </Card>
                                  <SwitchCase value={environmentevents.event.status} />
                                  <div className="form col-md-12 ">
                                    <h6>
                                      {environmentevents.event.eventnameTh}
                                    </h6>
                                  </div>
                                  <Grid
                                    sx={{
                                      mt: 1,
                                    }}
                                  />
                                  <div className="form col-md-12 ">
                                    <AccountCircleIcon />
                                    &nbsp;{environmentevents.event.organizer}
                                  </div>
                                  <div className="form col-md-12 ">
                                    <DateRangeIcon />
                                    รับสมัคร:
                                    {
                                      environmentevents.event
                                        .openforapplications
                                    }
                                    &nbsp;-&nbsp;
                                    {
                                      environmentevents.event
                                        .applicationdeadline
                                    }
                                  </div>
                                  <div className="form col-md-12 ">
                                    <DateRangeIcon />
                                    จัดงานวิ่ง:
                                    {environmentevents.event.startdate}
                                    &nbsp;-&nbsp;
                                    {environmentevents.event.enddate}
                                  </div>
                                  <div className="form col-md-12 ">
                                    <AddLocationIcon />
                                    {environmentevents.event.locationTh}
                                    {
                                      environmentevents.event.province
                                        .provinceTh
                                    }
                                  </div>
                                </Link>
                              </Grid>
                            )
                          )}
                        </Grid>
                      </Grid>
                    </Container>
                  </TabPanel>
                ))}
              </TabContext>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* </Card> */}
      {/* <Box pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </Box> */}
    </>
  );
}

export default SearchCategoryEvent;
