import React, { useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import { CardActionArea } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
// import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";
// import DirectionsIcon from '@mui/icons-material/Directions';
// import Topbar from "../components/orgtopbar/Topbar";
import Topbar from "../components/notification/Notifica";

// import Navbar from "pages/Navbar";
// icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddLocationIcon from "@mui/icons-material/AddLocation";

// Images
// import bgImage from "assets/images/bg-presentation.jpg";

// graql
const searchYearQuery = loader("../graphql/queries/searchYear.gql");

const Searchyear = () => {
  const inputRef = useRef();
  const [year, setyear] = useState("");

  const { error, loading, data } = useQuery(searchYearQuery, {
    variables: {
      year,
    },
  });

  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error..";
  }

  // const handleSearch = (inputRef) => {
  //  setyear(inputRef.current.value)}
  // };

  return (
    <>
      {/* <DefaultNavbar routes={routes} /> */}
      {/* <Navbar /> */}
      <Topbar/>
      <Box sx={{ display: "flex" }}>
        
      <Box
        minHeight="50vh"
        width="100%"
        sx={{
          backgroundImage: `url(${"https://ev.runlah.com/api/1/images/e-j9FFm10GV6bC-banner.jpg?size=xl"})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <Typography
              variant="h1"
              color="white"
              mt={-8}
              mb={1}
              // sx={({ breakpoints, typography: { size } }) => ({
              //   [breakpoints.down("md")]: {
              //     fontSize: size["3xl"],
              //   },
              // })}
            >
              {/* Material Kit 2 React */}
            </Typography>
            <Typography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={-11}
            >
              {/* Free & Open Source Web UI Kit built over ReactJS &amp; MUI. Join over 1.6 million
              developers around the world. */}
            </Typography>
          </Grid>
        </Container>
      </Box>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -7,
          mb: 8,
          // backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          // boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <br />
        <Grid item xs={12} lg={6} justifyContent="center" alignItems="center">
          <Box>
            <Container>
              <FormControl fullWidth>
                <Grid container spacing={3} ml={80}>
                  <Paper
                    component="form"
                    fullWidth
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      ref={inputRef}
                      placeholder="ค้นหาปี ค.ศ."
                      inputProps={{ "aria-label": { year } }}
                    />
                    <IconButton
                      type="submit"
                      sx={{ p: "10px" }}
                      aria-label="search"
                      onClick={() => setyear(inputRef.current.value)}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
                {/* <InputLabel id="demo-simple-select-label">year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  ref={inputRef}
                  value={year}
                  label="year"
                  // onChange={handleSearch}
                >
                  {data.years.nodes.map((years) => (
                    <MenuItem key={years.id} value={years.year}>
                      {years.year}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  variant="contained"
                  type="submit"
                  value="Search"
                  onClick={() => setyear(inputRef.current.value)}
                >
                  search
                </Button> */}
              </FormControl>
            </Container>
          </Box>
        </Grid>
        {/* <hr/> */}
        <Container sx={{ mt: 4 }}>
          {data.years.nodes.map((years) => (
            <Grid container spacing={3} sx={{ mb: 8 }}>
              <Grid item xs={12} lg={12}>
                <Box position="sticky" top="100px" pb={{ xs: 2, lg: 6 }}>
                  <Typography
                    variant="h5"
                    fontWeight="regular"
                    // color="secondary"
                    mb={1}
                    pr={2}
                  >
                    Year : {years.year}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Grid container spacing={3}>
                  {years.events.nodes.map((events) => (
                    <Grid item xs={12} md={3} mt={-3}>
                      <Link to={`/event/${events.id}`}>
                        <Card>
                          <CardMedia
                            component="img"
                            alt="green iguana"
                            width="100%"
                            height="130vw"
                            objectfit="cover"
                            image={events.coverphotourl}
                          />
                        </Card>
                        <CardContent>
                          <Typography gutterBottom variant="h7" component="div">
                            {events.eventnameTh}
                          </Typography>

                          <ListItem>
                            <AccountCircleIcon />
                            <Typography variant="body2" color="text">
                              &nbsp;{events.organizer}
                            </Typography>
                          </ListItem>

                          <ListItem>
                            <DateRangeIcon />
                            <Typography variant="body2" color="text">
                              &nbsp;{events.startdate} - {events.enddate}
                            </Typography>
                          </ListItem>

                          <ListItem>
                            <AddLocationIcon />
                            <Typography variant="body2" color="text">
                              &nbsp; {events.locationTh}{" "}
                              {events.province.provinceTh}
                            </Typography>
                          </ListItem>
                        </CardContent>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Container>
      </Card>
      </Box>
    </>

  );
};

export default Searchyear;
