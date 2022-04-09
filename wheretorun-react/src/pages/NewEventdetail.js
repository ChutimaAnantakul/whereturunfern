import React, { useRef, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import { FacebookShareButton } from "react-share";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import Fab from "@material-ui/core/Fab";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Switch from '@material-ui/core/Switch';


// icon
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventNoteIcon from "@material-ui/icons/EventNote";
import AddIcon from "@material-ui/icons/Add";
import NavigationIcon from "@material-ui/icons/Navigation";
import CommentIcon from "@material-ui/icons/Comment";
import SendIcon from "@mui/icons-material/Send";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Forward from "@mui/icons-material/Forward";

//page
import Navbar from "../pages/layout/Navbar";
import NavbarEn from "../pages/layout/NavbarEn";

// graql
const eventdetailQuery = loader("../graphql/queries/eventdetail.gql");
const createdReviewMutations = loader("../graphql/mutations/createdReview.gql");
const updateFollowMutations = loader("../graphql/mutations/updateFollow.gql");
const createFollowingMutations = loader("../graphql/mutations/createFollowing.gql");


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function NewEventdetail({ match, history }) {
  const classes = useStyles();
  // const [show, setShow] = useState(false);
  // const toggleModal = () => setShow(!show);

  const [eventId, seteventId] = useState();
  // const [userId, setId] = useState();

  const eventgroupIdRef = useRef();
  const [checked, setChecked] = React.useState(false);
  const [followName, setfollowName] = React.useState({
    followNameA: "ติดตาม",
    followNameB: "กำลังติดตาม",
  });

  // const userIdRef = useRef();
  // const [followname, setfollowName] = React.useState({
  //   followA: true,
  //   followB: false,
  // });


// review
  const [createdReview] = useMutation(createdReviewMutations);
  const eventIdRef = useRef();
  const reviewRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (eventIdRef.current.value === { eventId }) {
      return;
    } else {
      const eventId = eventIdRef.current.value;
      const review = reviewRef.current.value;

      const { data } = await createdReview({
        variables: {
          // id,
          eventId,
          review,
        },
      });

      window.location.reload();
      history.push(`/event/${data.createReview.review.eventId}`);
    }
  };


// insert follow
const [createFollowing] = useMutation(createFollowingMutations);

  const handleSubmitFollow = async (e) => {
    // e.preventDefault();
    // if (eventIdRef.current.value === { eventId }) {
    //   return;
    // } else {
    // setstatus(!status)
    const eventgroupId = eventgroupIdRef.current.value;
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


  // update follow
  const [updateFollow] = useMutation(updateFollowMutations);
  const [status, setstatus] = React.useState(false);

  const handleChange = async (event) => {

    const id = event.target.value;
    // const id = eventgroupIdRef.current.value;
    // const followname = event.target.checked
    setstatus(event.target.checked);
    setstatus(!status)
    // setfollowName(event.target.checked);
    console.log(status, id);
    const { data } = await updateFollow({
      variables: {
        // id,
        id,
        status,
      },
    });

    // window.location.reload();
    // history.push(`/event/${data.event.id}`);
  };

  const handleChangeToggle = async (event) => {
    setChecked(event.target.checked);
    console.log(checked)
  };


  const { id } = match.params;
  const { loading, error, data } = useQuery(eventdetailQuery, {
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
  // const fo = data.follownames.nodes.map((follownames) => follownames.followName)
  // const un = fo[1]
  // console.log(un)

  //   const classes = UseStyles();

  const defaultProps = {
    center: {
      lat: 13.753816127312334,
      lng: 99.44982485617943,
    },
    zoom: 7,
  };

  return (
    <div>
      {checked ? <Navbar /> : <NavbarEn />}
      <Toolbar />
      <Box
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${data.event.coverphotourl})`,
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
              mt={-6}
              mb={1}
              fontSize={"3xl"}
            // sx={({ breakpoints, typography: { size } }) => ({
            //   [breakpoints.down("md")]: {
            //     fontSize: size["3xl"],
            //   },
            // })}
            >
              {/* Material Kit 2 React{" "} */}
            </Typography>
            <Typography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              {/* Free & Open Source Web UI Kit built over ReactJS &amp; MUI. Join
              over 1.6 million developers around the world. */}
            </Typography>
          </Grid>
        </Container>
      </Box>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: "while",
          // backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
          //   rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          // boxShadow: ({ boxShadows: { xxl } }) => xxl,
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: 1,
          // bgcolor: "#eceff1",
        }}
      >
        {/* <Counters /> */}
        <Container sx={{ mt: 6 }}>
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} lg={12} spacing={2} container>
              <Grid
                item
                xs={8}
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
              >
                <Card
                  sx={{
                    overflow: "hidden",
                    borderRadius: "12px",
                    mb: 4,
                    width: "100%",
                    // boxShadow: 1,
                    bgcolor: "#EDEEF7",
                  }}
                  fullWidth
                >
                  <CardContent>
                    <h2>{checked ? data.event.eventnameTh : data.event.eventnameEn}</h2> <hr />
                    <h4>
                      <AccountCircleIcon />{checked ? "ผู้จัดงาน" : "Organizer"} | {data.event.organizer}
                    </h4>
                    <h5>
                      <AddLocationIcon /> {data.event.locationTh}{" "}
                      {data.event.province.provinceTh}
                    </h5>
                    <h5>
                      คะแนน: {data.event.avgrankscore}
                      {/* <ReactStars 
                      count={5} 
                      value={data.event.avgrankscore} 
                      size={24} 
                      activeColor="#ffd700" 
                      readOnly
                       /> 
                       */}
                    </h5>
                    <Stack spacing={1}>
                      <Rating name="half-rating-read" defaultValue={data.event.avgrankscore} precision={0.5} readOnly />
                    </Stack>

                    {/* <Typography variant="h6" fontWeight="bold" component="div">
                      วันที่ : {data.event.startdate} - {data.event.enddate}
                    </Typography> */}
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    overflow: "hidden",
                    borderRadius: "12px",
                    boxShadow: 1,
                    mb: 4,
                    width: "100%",
                  }}
                  fullWidth
                >
                  <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
                    image={data.event.poster}
                    alt="green iguana"
                  />
                </Card>
                <Card
                  sx={{
                    overflow: "hidden",
                    borderRadius: "12px",
                    boxShadow: 1,
                    mb: 4,
                    width: "100%",
                  }}
                  fullWidth
                >
                  <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
                    image={data.event.shirtsize}
                    alt="green iguana"
                  />
                </Card>
                <Card
                  sx={{
                    overflow: "hidden",
                    borderRadius: "12px",
                    boxShadow: 1,
                    mb: 4,
                    width: "100%",
                  }}
                  fullWidth
                >
                  <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
                    image={data.event.awardphoto}
                    alt="green iguana"
                  />
                </Card>
              </Grid>
              <Grid
                item
                xs={4}
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
              >
                <Container>
                  <Card
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      boxShadow: 1,
                      mb: 4,
                      height: "35vh",
                      width: "100%",
                    }}
                    fullWidth
                  // className={classes.mapContainer}
                  >
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: "AIzaSyDMdJAvnef2-gXkSNdmOC14l1FcYFsSdCY",
                      }}
                      defaultCenter={defaultProps.center}
                      defaultZoom={defaultProps.zoom}
                    >
                      <Marker
                        lat={data.event.latitude}
                        lng={data.event.longitude}
                        name="My Marker"
                        // color="blue"
                        color="red"
                      />
                    </GoogleMapReact>
                  </Card>
                  <Card
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      boxShadow: 1,
                      mb: 4,
                      width: "100%",
                      // bgcolor :"#FFFCEA",
                    }}
                    fullWidth
                  >
                    <div>
                      <CardContent>
                        <ListItem>
                          {/* <ListItemAvatar>
                            <Avatar> */}
                          <EventAvailableIcon />
                          &nbsp;
                          {/* </Avatar>
                          </ListItemAvatar> */}
                          <h4>ช่วงรับสมัคร</h4>
                        </ListItem>
                        <hr />
                        <Grid item>
                          <ListItem>
                            <DateRangeIcon />
                            <h7
                              variant="body1"
                              color="text"
                            // fontWeight="text.secondary"
                            >
                              &nbsp;วันรับสมัคร &nbsp;
                              {data.event.openforapplications} -{" "}
                              {data.event.applicationdeadline}
                            </h7>
                          </ListItem>
                        </Grid>
                        <Grid item>
                          <ListItem>
                            <DateRangeIcon />
                            <h7>
                              &nbsp;วันจัดงานวิ่ง &nbsp; {data.event.startdate}{" "}
                              - {data.event.enddate}
                            </h7>
                          </ListItem>
                        </Grid>
                        <hr />
                        <Grid item>
                          <ListItem>
                            <AnnouncementIcon />
                            <h7>
                              &nbsp;หรือปิดรับสมัครทันทีเมื่อมีผู้สมัครครบเต็มจำนวน
                            </h7>
                          </ListItem>
                        </Grid>
                      </CardContent>
                    </div>
                  </Card>
                  <Card
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      boxShadow: 1,
                      mb: 4,
                      width: "100%",
                    }}
                    fullWidth
                  >
                    <div>
                      <CardContent>
                        <ListItem>
                          {/* <ListItemAvatar>
                            <Avatar> */}
                          <EventNoteIcon />
                          &nbsp;
                          {/* </Avatar>
                          </ListItemAvatar> */}
                          <h4>รายละเอียดงานวิ่ง</h4>
                        </ListItem>
                        <hr />
                        <Grid item>
                          <ListItem>
                            {/* <EventIcon /> */}
                            <h7
                              variant="body1"
                              color="text"
                            // fontWeight="text.secondary"
                            >
                              {data.event.descriptionTh}
                            </h7>
                          </ListItem>
                        </Grid>
                        <hr />
                        <Grid item>
                          <Link href={data.event.facebookurl}>
                            <ListItem>
                              <FacebookOutlinedIcon />
                              <div>&nbsp;{data.event.facebookurl}</div>
                            </ListItem>
                          </Link>
                        </Grid>
                      </CardContent>
                    </div>
                  </Card>
                  <Card
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      boxShadow: 1,
                      mb: 4,
                      width: "100%",
                    }}
                  >
                    <CardContent>
                      <ListItem>
                        <CommentIcon />
                        &nbsp;
                        <h5>ประเภทการแข่งขันงานวิ่ง</h5>
                      </ListItem>

                      <hr />
                      <Grid
                        container
                        item
                        // justifyContent="center"
                        xs={12}
                      // my={2}
                      >
                        {data.event.racetypeevents.nodes.map(
                          (racetypeevents) => (
                            <div>
                              <ListItem>
                                <div>{racetypeevents.race.raceTh}</div>
                                &nbsp;
                                <div className="form col-md-12">
                                  <h6>
                                    ระยะทาง {racetypeevents.race.distance} กม.
                                    ราคา {racetypeevents.race.price} บาท
                                  </h6>
                                </div>
                              </ListItem>
                              {/* <Divider variant="inset" component="li" /> */}
                            </div>
                          )
                        )}
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      boxShadow: 1,
                      mb: 4,
                      width: "100%",
                    }}
                  >
                    <CardContent>
                      <ListItem>
                        {/* <ListItemAvatar> */}
                        {/* <Avatar> */}
                        <EventNoteIcon />
                        &nbsp;
                        {/* </Avatar> */}
                        {/* </ListItemAvatar> */}
                        <h4>การดูรายละเอียดงานวิ่งเพิ่มเติม</h4>
                      </ListItem>
                      <hr />
                      <h6>
                        สามารถดูได้จากการคลิกปุ่มดูข้อมูลงานวิ่งเพิ่มเติม
                        หรือคลิกลิ้งค์ Facebook ได้
                      </h6>
                    </CardContent>
                    <CardActions>
                      <Grid
                        container
                        item
                        justifyContent="center"
                        xs={12}
                        sx={{
                          mb: 2,
                          width: "100%",
                        }}
                      // my={2}
                      >
                        <Fab
                          variant="extended"
                          color="inherit"
                          size="large"
                          href={data.event.linkurl}
                        >
                          <AssignmentIcon />
                          &nbsp;<div>ดูข้อมูลงานวิ่งเพิ่มเติม</div>
                        </Fab>
                        &nbsp; &nbsp; &nbsp;
                        <FacebookShareButton
                          url={data.event.linkurl}
                          quote={"ร่วมสนุกงานวิ่งนี้ด้วยกันมั้ย"}
                          hashtag={"#งานวิ่งนี้ต้องไป"}
                        >
                          <Fab variant="extended" color="primary" size="large">
                            <FacebookOutlinedIcon size={40} round={true} />
                            &nbsp;<div>แชร์</div>
                          </Fab>
                        </FacebookShareButton>
                        {/* <EmailShareButton
                          url={data.event.linkurl}
                          quote={"ร่วมสนุกงานวิ่งนี้ด้วยกันมั้ย"}
                          hashtag={"#งานวิ่งนี้ต้องไป"}
                        >
                          <EmailIcon size={40} round={true} />
                        </EmailShareButton> */}
                        {/* <Button
                          variant="contained"
                          color="primary"
                          size="large"
                        >
                          <FacebookOutlinedIcon size={40} round={true} />
                          &nbsp;<div>แชร์</div>
                        </Button> */}
                      </Grid>
                    </CardActions>
                  </Card>

                  <Card
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      boxShadow: 1,
                      mb: 4,
                      width: "100%",
                    }}
                  >
                    {" "}
                    <CardContent>
                      <ListItem>
                        <CommentIcon />
                        &nbsp;
                        <h5>การแสดงความคิดเห็น</h5>
                      </ListItem>

                      <select
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        defaultValue={data.event.eventnameTh}
                        value={data.event.id}
                        ref={eventIdRef}
                      // disabled
                      >
                        <option key={data.event.id} value={data.event.id}>
                          : {data.event.eventnameTh}
                        </option>
                      </select>
                      {/* <h5>การแสดงความคิดเห็น</h5> */}
                      <hr />
                      <Grid
                        container
                        item
                        // justifyContent="center"
                        xs={12}
                      // my={2}
                      >
                        <List className={classes.root}>
                          {data.event.reviews.nodes.map((reviews) => (
                            <div>
                              <ListItem>
                                <Avatar
                                  alt={reviews.user.firstname}
                                  src={reviews.user.profileimageurl}
                                />
                                &nbsp;
                                <div className="form col-md-12">
                                  <div className="form col-md-12">
                                    <h6>
                                      {reviews.user.firstname}&nbsp;
                                      {reviews.user.lastname}
                                    </h6>
                                  </div>
                                  <div className="form col-md-12">
                                    <p>{reviews.review}</p>
                                  </div>
                                </div>
                              </ListItem>
                              <Divider variant="inset" component="li" />
                            </div>
                          ))}
                        </List>
                      </Grid>
                      <hr />
                      <Grid
                        container
                        item
                        // justifyContent="center"
                        xs={12}
                      // my={2}
                      >
                        {/* <form> */}
                        <ListItem>
                          <Avatar
                            // alt="Remy Sharp"
                            src={data.users.nodes.map((users) => users.profileimageurl)}
                          />
                          &nbsp;&nbsp;
                          <div>
                            <input
                              id="outlined-basic"
                              // variant="outlined"
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              placeholder="แสดงความคิดเห็น...."
                              fullWidth
                              ref={reviewRef}
                            />
                          </div>{" "}
                          <Fab
                            variant="extended"
                            size="medium"
                            color="primary"
                            type="submit"
                            aria-label="add"
                            className={classes.margin}
                            onClick={handleSubmit}
                          >
                            <NavigationIcon className={classes.extendedIcon} />
                            send
                          </Fab>

                        </ListItem>
                        <ListItem>
                          <Link to={`/typeofrank/${data.event.id}`}>
                            <Button
                              variant="contained"
                              color="primary"
                            >
                              &nbsp; ให้คะแนนงานวิ่ง
                            </Button>
                          </Link>
                        </ListItem>

                        {/* {show ? ( */}
                        {/* <div className="form col-md-12">
                            
                          </div> */}
                        {/*  ) : null} */}
                        {/* </form> */}
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      boxShadow: 1,
                      mb: 4,
                      width: "100%",
                    }}
                  >
                    {" "}
                    <CardContent>
                      <ListItem>
                        {/* <CommentIcon /> */}
                        &nbsp;
                        <h5>กลุ่มงานวิ่ง</h5>
                      </ListItem>
                      <select
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        defaultValue={data.event.eventgroup.eventgroupnameTh}
                        value={data.event.eventgroup.id}
                        ref={eventgroupIdRef}
                      // disabled
                      >
                        <option key={data.event.eventgroup.id} value={data.event.eventgroup.id}>
                          : {data.event.eventgroup.eventgroupnameTh}
                        </option>
                      </select>
                      {/* <hr /> */}
                      <Grid
                        container
                        item
                        // justifyContent="center"
                        xs={12}
                      // my={2}
                      >
                        {/* <form> */}
                        <ListItem>
                          {/* <h6>Event Group : <b
                          value={data.event.eventgroup.id}
                          ref={eventgroupIdRef}
                          >{data.event.eventgroup.eventgroupnameTh}</b></h6> */}
                          {/* <h6>Follow</h6>&nbsp; */}
                          {/* <Forward /> */}
                          &nbsp;


                          {/* <input type="checkbox"
                            checked={follow.followB}
                            value={data.event.eventgroup.followings.nodes.map((followings) => followings.id)}
                            onChange={handleChange}
                            onClick={handleSubmitFollow}
                          />
                          &nbsp;
                          {follow ? "กำลังติดตาม" : "ติดตาม"} */}

                          {/* {follow ? (
                            <Button
                              color="inherit"
                              ariant="contained"
                              size="large"
                              checked={follow.followB}
                              value={data.event.eventgroup.followings.nodes.map((followings) => followings.id)}
                              onChange={handleChange}
                            >
                              &nbsp;<div>กำลังติดตาม</div>
                            </Button>
                          ) : (
                            <Button
                              color="inherit"
                              ariant="contained"
                              size="large"
                              value={data.event.eventgroup.id}
                              ref={eventgroupIdRef}
                              onClick={handleSubmitFollow}
                            >
                              &nbsp;<div>ติดตาม</div>
                            </Button>
                          )} */}

                          {status ? (
                            <button
                              checked={status}
                              value={data.event.eventgroup.followings.nodes.map((followings) => followings.id)}
                              onClick={handleChange}
                            >Unfollow</button>) : (<button

                              value={data.event.eventgroup.id}
                              ref={eventgroupIdRef}
                              onClick={handleSubmitFollow}
                            >Follow</button>)}
                          

                          {/*                           
                          <div className="flex justify-center items-center w-8 h-8 rounded-full m-2 fixed bottom-4 right-4">
                            <Switch
                              checked={followname}
                              onChange={handleChange}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </div> */}

                        </ListItem>
                      </Grid>
                    </CardContent>
                  </Card>


                </Container>
              </Grid>
            </Grid>

            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                {/* {data.events.nodes.map((events) => ( */}
                <Grid item xs={12} md={3}></Grid>
                {/* ))} */}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Card>
      {/* <Box pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </Box> */}
      <div className="flex justify-center items-center w-8 h-8 rounded-full m-2 fixed bottom-4 right-4">
        EN<Switch
          checked={checked}
          onChange={handleChangeToggle}
          inputProps={{ "aria-label": "controlled" }}
        />TH
      </div>
    </div>
  );
}

export default NewEventdetail;