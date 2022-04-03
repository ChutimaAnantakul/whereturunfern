import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import DatePicker from "gestalt-datepicker";
import "gestalt-datepicker/dist/gestalt-datepicker.css";
import "gestalt/dist/gestalt.css";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

// icon
import ImageIcon from "@mui/icons-material/Image";
import EventIcon from "@mui/icons-material/Event";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import TagIcon from "@mui/icons-material/Tag";
import LinkIcon from "@mui/icons-material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import DescriptionIcon from "@mui/icons-material/Description";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

//graphql
const updateEditEventMutations = loader(
  "../../../graphql/mutations/updateEditEvent.gql"
);
const eventseditQuery = loader("../../../graphql/queries/editeventID.gql");

function EditEvent({ match, history }) {
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);

  const [valueid, setid] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startDate2, setStartDate2] = useState();
  const [endDate2, setEndDate2] = useState();
  const [eventnameTh, seteventnameTh] = useState();
  const [eventnameEn, seteventnameEn] = useState();
  const [locationTh, setlocationTh] = useState();
  const [locationEn, setlocationEn] = useState();
  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const [linkurl, setlinkurl] = useState();
  const [coverphotourl, setcoverphotourl] = useState();
  const [descriptionTh, setdescriptionTh] = useState();
  const [descriptionEn, setdescriptionEn] = useState();
  const [organizer, setorganizer] = useState();
  const [poster, setposter] = useState();
  const [facebookurl, setfacebookurl] = useState();
  const [hashtag, sethashtag] = useState();
  const [yearId, setyearId] = useState();
  const [awardphoto, setawardphoto] = useState();
  const [provinceId, setprovinceId] = useState();
  const [shirtsize, setshirtsize] = useState();
  const [eventgroupId, seteventgroupId] = useState();

  const [updateEditEvent] = useMutation(updateEditEventMutations);
  const idRef = useRef();
  const eventnameThRef = useRef();
  const eventnameEnRef = useRef();
  const locationThRef = useRef();
  const locationEnRef = useRef();
  const openforapplicationsRef = useRef();
  const applicationdeadlineRef = useRef();
  const latitudeRef = useRef();
  const longitudeRef = useRef();
  const linkurlRef = useRef();
  const coverphotourlRef = useRef();
  const startdateRef = useRef();
  const enddateRef = useRef();
  const descriptionThRef = useRef();
  const descriptionEnRef = useRef();
  const organizerRef = useRef();
  const posterRef = useRef();
  const facebookurlRef = useRef();
  const hashtagRef = useRef();
  const yearIdRef = useRef();
  const awardphotoRef = useRef();
  const provinceIdRef = useRef();
  const shirtsizeRef = useRef();
  const eventgroupIdRef = useRef();

  const handleChange = async (e) => {
    if (
      eventgroupIdRef.current.value === "" ||
      eventnameThRef.current.value === "" ||
      eventnameEnRef.current.value === "" ||
      locationThRef.current.value === "" ||
      locationEnRef.current.value === "" ||
      provinceIdRef.current.value === "" ||
      organizerRef.current.value === "" ||
      // latitudeRef.current.value === "" ||
      // longitudeRef.current.value === "" ||
      openforapplicationsRef.current.value === "" ||
      applicationdeadlineRef.current.value === "" ||
      startdateRef.current.value === "" ||
      enddateRef.current.value === "" ||
      yearIdRef.current.value === "" ||
      hashtagRef.current.value === "" ||
      linkurlRef.current.value === "" ||
      // facebookurlRef.current.value === "" ||
      coverphotourlRef.current.value === "" ||
      posterRef.current.value === "" ||
      awardphotoRef.current.value === "" ||
      shirtsizeRef.current.value === "" ||
      descriptionThRef.current.value === "" ||
      descriptionEnRef.current.value === ""
    ) {
      return;
    } else {
      e.preventDefault();
      alert("You have submitted the form.");

      const eventnameTh = eventnameThRef.current.value;
      const eventnameEn = eventnameEnRef.current.value;
      const locationTh = locationThRef.current.value;
      const locationEn = locationEnRef.current.value;
      const openforapplications = new Date(
        openforapplicationsRef.current.value
      ).toDateString();
      const applicationdeadline = new Date(
        applicationdeadlineRef.current.value
      ).toDateString();
      const linkurl = linkurlRef.current.value;
      const coverphotourl = coverphotourlRef.current.value;
      const startdate = new Date(startdateRef.current.value).toDateString();
      const enddate = new Date(enddateRef.current.value).toDateString();
      const descriptionTh = descriptionThRef.current.value;
      const descriptionEn = descriptionEnRef.current.value;
      const hashtag = hashtagRef.current.value;
      const latitude = Number(latitudeRef.current.value);
      const longitude = Number(longitudeRef.current.value);
      const poster = posterRef.current.value;
      const awardphoto = awardphotoRef.current.value;
      const shirtsize = shirtsizeRef.current.value;
      const facebookurl = facebookurlRef.current.value;
      const organizer = organizerRef.current.value;
      const provinceId = provinceIdRef.current.value;
      const yearId = yearIdRef.current.value;
      const eventgroupId = eventgroupIdRef.current.value;

      const { data } = await updateEditEvent({
        variables: {
          id,
          eventnameTh,
          eventnameEn,
          locationTh,
          locationEn,
          linkurl,
          coverphotourl,
          startdate,
          enddate,
          descriptionTh,
          openforapplications,
          applicationdeadline,
          facebookurl,
          descriptionEn,
          hashtag,
          organizer,
          latitude,
          longitude,
          poster,
          awardphoto,
          shirtsize,
          provinceId,
          yearId,
          eventgroupId,
        },
      });

      history.push(`/edit`);
      window.location.reload();
    }
  };

  const { id } = match.params;
  const { loading, error, data } = useQuery(eventseditQuery, {
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
              mb: 12,
              borderRadius: "12px",
              // boxShadow: 10,
            }}
          >
            <Box component="section">
              <Container>
                <Grid
                  item
                  xs={8}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Card
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      mb: 2,
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
            </Box>
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
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      mb: 4,
                      width: "100%",
                      //   boxShadow: 2,
                    }}
                    fullWidth
                  >
                    <form>
                      {" "}
                      <Grid container spacing={3}>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            mr: 6,
                          }}
                        >
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <EventIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-12 ">
                              <label>ชื่อกลุ่มงานวิ่ง</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                ref={eventgroupIdRef}
                                defaultValue={
                                  data.event.eventgroup.eventgroupnameTh
                                }
                                value={eventgroupId}
                                onChange={() =>
                                  seteventgroupId(eventgroupIdRef.current.value)
                                }
                                required
                                // disabled
                              >
                                <option
                                  key={data.event.eventgroup.id}
                                  value={data.event.eventgroup.id}
                                >
                                  {data.event.eventgroup.eventgroupnameTh}
                                </option>
                                {data.eventgroups.nodes.map((eventgroups) => (
                                  <option
                                    key={eventgroups.id}
                                    value={eventgroups.id}
                                  >
                                    {eventgroups.eventgroupnameTh}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <EventIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>ชื่องานวิ่งภาษาไทย</label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="ชื่องานวิ่งภาษาไทย"
                                defaultValue={data.event.eventnameTh}
                                value={eventnameTh}
                                ref={eventnameThRef}
                                onChange={() =>
                                  seteventnameTh(eventnameThRef.current.value)
                                }
                                required
                                fullWidth
                              />
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <EventIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>ชื่องานวิ่งภาษาอังกฤษ</label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="ชื่องานวิ่งภาษาอังกฤษ"
                                defaultValue={data.event.eventnameEn}
                                value={eventnameEn}
                                ref={eventnameEnRef}
                                onChange={() =>
                                  seteventnameEn(eventnameEnRef.current.value)
                                }

                                pattern="[A-Za-z0-9,():;* '%#<>_^|./\\s]*"
                                title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                                required
                                fullWidth
                              />
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <AddLocationIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>สถานที่จัดงานวิ่งภาษาไทย</label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="สถานที่จัดงานวิ่งภาษาไทย"
                                defaultValue={data.event.locationTh}
                                value={locationTh}
                                ref={locationThRef}
                                onChange={() =>
                                  setlocationTh(locationThRef.current.value)
                                }
                                required
                                fullWidth
                              />
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <AddLocationIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>สถานที่จัดงานวิ่งภาษาอังกฤษ</label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="สถานที่จัดงานวิ่งภาษาอังกฤษ"
                                defaultValue={data.event.locationEn}
                                value={locationEn}
                                ref={locationEnRef}
                                onChange={() =>
                                  setlocationEn(locationEnRef.current.value)
                                }
                                pattern="[A-Za-z0-9,():;* '%#<>_^|./\\s]*"
                                title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                                required
                                fullWidth
                              />
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar>
                                  <LocationCityIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <div className="form col-md-11 ">
                                <label>จังหวัด</label>
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  defaultValue={data.event.province.provinceTh}
                                  ref={provinceIdRef}
                                  value={provinceId}
                                  onChange={() =>
                                    setprovinceId(provinceIdRef.current.value)
                                  }
                                  required
                                >
                                  <option
                                    selected
                                    key={data.event.province.id}
                                    value={data.event.province.id}
                                  >
                                    {data.event.province.provinceTh}
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
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <PermIdentityIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>จัดโดย</label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="จัดโดย"
                                defaultValue={data.event.organizer}
                                value={organizer}
                                ref={organizerRef}
                                onChange={() =>
                                  setorganizer(organizerRef.current.value)
                                }
                                required
                                fullWidth
                              />
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <AddLocationIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>ละติจูด</label>
                              <input
                                type="number"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="ละติจูด"
                                defaultValue={data.event.latitude}
                                value={latitude}
                                ref={latitudeRef}
                                onChange={() =>
                                  setlatitude(latitudeRef.current.value)
                                }
                                fullWidth
                              />
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <AddLocationIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>ลองจิจูด</label>
                              <input
                                type="number"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="ลองจิจูด"
                                defaultValue={data.event.longitude}
                                value={longitude}
                                ref={longitudeRef}
                                onChange={() =>
                                  setlongitude(longitudeRef.current.value)
                                }
                                fullWidth
                              />
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <DateRangeIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <div className="form col-md-11">
                                <label>วันเปิด-ปิดรับสมัคร</label>
                                <DatePicker
                                  rangeStartDate={startDate}
                                  rangeEndDate={endDate}
                                  id="example-start-date"
                                  label="วันแรก"
                                  defaultValue={data.event.openforapplications}
                                  nextRef={openforapplicationsRef}
                                  onChange={({ event, value }) => {
                                    setStartDate(value);
                                  }}
                                  rangeSelector="start"
                                  value={startDate}
                                  ref={openforapplicationsRef}
                                  required
                                />
                                <DatePicker
                                  rangeStartDate={startDate}
                                  rangeEndDate={endDate}
                                  id="example-end-date"
                                  label="วันสุดท้าย"
                                  defaultValue={data.event.applicationdeadline}
                                  nextRef={applicationdeadlineRef}
                                  onChange={({ event, value }) =>
                                    setEndDate(value)
                                  }
                                  rangeSelector="end"
                                  value={endDate}
                                  ref={applicationdeadlineRef}
                                  required
                                />
                              </div>
                            </LocalizationProvider>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <DateRangeIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <div className="form col-md-11">
                                <label>วันจัดงานวิ่ง</label>
                                <DatePicker
                                  rangeStartDate={startDate2}
                                  rangeEndDate={endDate2}
                                  id="example-start-date"
                                  label="วันแรก"
                                  defaultValue={data.event.startdate}
                                  nextRef={enddateRef}
                                  onChange={({ event, value }) => {
                                    setStartDate2(value);
                                  }}
                                  rangeSelector="start"
                                  value={startDate2}
                                  ref={startdateRef}
                                  required
                                />
                                <DatePicker
                                  rangeStartDate={startDate2}
                                  rangeEndDate={endDate2}
                                  id="example-end-date"
                                  label="วันสุดท้าย"
                                  defaultValue={data.event.enddate}
                                  nextRef={startdateRef}
                                  onChange={({ event, value }) =>
                                    setEndDate2(value)
                                  }
                                  rangeSelector="end"
                                  value={endDate2}
                                  ref={enddateRef}
                                  required
                                />
                              </div>
                            </LocalizationProvider>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar>
                                  <DateRangeIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <div className="form col-md-11 ">
                                <label>ปีที่จัดงาน</label>
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  // defaultValue={data.event.year.year}
                                  value={yearId}
                                  ref={yearIdRef}
                                  onChange={() =>
                                    setyearId(yearIdRef.current.value)
                                  }
                                  required
                                  // disabled
                                >
                                  <option
                                    // selected
                                    key={data.event.year.id}
                                    value={data.event.year.id}
                                  >
                                    {data.event.year.year}
                                  </option>
                                  {data.years.nodes.map((years) => (
                                    <option key={years.id} value={years.id}>
                                      {years.year}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </ListItem>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <TagIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>แฮชแท็ก</label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="แฮชแท็ก"
                                defaultValue={data.event.hashtag}
                                value={hashtag}
                                ref={hashtagRef}
                                onChange={() =>
                                  sethashtag(hashtagRef.current.value)
                                }
                                fullWidth
                              />
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <LinkIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>ลิ้งค์เว็บ</label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="ลิ้งค์เว็บ"
                                defaultValue={data.event.linkurl}
                                value={linkurl}
                                ref={linkurlRef}
                                onChange={() =>
                                  setlinkurl(linkurlRef.current.value)
                                }
                                fullWidth
                                required
                              />
                              <small>ลิงค์ URL งานวิ่ง</small>
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <FacebookIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>ลิงค์เฟสบุ๊ค</label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="ลิงค์เฟสบุ๊ค (ถ้ามี)"
                                defaultValue={data.event.facebookurl}
                                value={facebookurl}
                                ref={facebookurlRef}
                                onChange={() =>
                                  setfacebookurl(facebookurlRef.current.value)
                                }
                                fullWidth
                              />
                              <small>ลิงค์เฟสบุ๊คงานวิ่ง</small>
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <ImageIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>ภาพปกงานวิ่ง</label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="ภาพปกงานวิ่ง"
                                defaultValue={data.event.coverphotourl}
                                value={coverphotourl}
                                ref={coverphotourlRef}
                                onChange={() =>
                                  setcoverphotourl(
                                    coverphotourlRef.current.value
                                  )
                                }
                                fullWidth
                                required
                              />
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <ImageIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>ภาพโปสเตอร์งานวิ่ง</label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="ภาพโปสเตอร์งานวิ่ง"
                                defaultValue={data.event.poster}
                                value={poster}
                                ref={posterRef}
                                onChange={() =>
                                  setposter(posterRef.current.value)
                                }
                                fullWidth
                                required
                              />
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <ImageIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>ภาพของรางวัล</label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="ภาพของรางวัล"
                                defaultValue={data.event.awardphoto}
                                value={awardphoto}
                                ref={awardphotoRef}
                                onChange={() =>
                                  setawardphoto(awardphotoRef.current.value)
                                }
                                fullWidth
                                required
                              />
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <ImageIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>ภาพขนาดของเสื้อ</label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="ภาพขนาดของเสื้อ"
                                defaultValue={data.event.shirtsize}
                                value={shirtsize}
                                ref={shirtsizeRef}
                                onChange={() =>
                                  setshirtsize(shirtsizeRef.current.value)
                                }
                                fullWidth
                                required
                              />
                            </div>
                          </ListItem>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <DescriptionIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>รายละเอียดงานวิ่งภาษาไทย</label>
                              <textarea
                                className="form-control"
                                placeholder="รายละเอียดงานวิ่งภาษาไทย"
                                defaultValue={data.event.descriptionTh}
                                value={descriptionTh}
                                ref={descriptionThRef}
                                onChange={() =>
                                  setdescriptionTh(
                                    descriptionThRef.current.value
                                  )
                                }
                                rows="3"
                                fullWidth
                                required
                              ></textarea>
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <DescriptionIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>รายละเอียดงานวิ่งภาษาอังกฤษ</label>
                              <textarea
                                className="form-control"
                                placeholder="รายละเอียดงานวิ่งภาษาอังกฤษ"
                                defaultValue={data.event.descriptionEn}
                                value={descriptionEn}
                                ref={descriptionEnRef}
                                onChange={() =>
                                  setdescriptionEn(
                                    descriptionEnRef.current.value
                                  )
                                }
                                rows="3"
                                fullWidth
                                pattern="[A-Za-z0-9,():;* '%#<>_^|./\\s]*"
                                title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                                required
                              ></textarea>
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} alignItems="center" ml={-1}>
                          {/* <Switch checked={checked} onChange={handleChecked} /> */}
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        item
                        justifyContent="center"
                        xs={12}
                        my={2}
                      >
                        <Link to={`/edit`}>
                          <Button variant="contained" color="inherit">
                            <CancelIcon />
                            &nbsp; Cancel
                          </Button>
                        </Link>
                        &nbsp; &nbsp; &nbsp;
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          onClick={handleChange}
                        >
                          <SaveIcon />
                          &nbsp; save change
                        </Button>
                      </Grid>
                    </form>
                  </Card>
                </Grid>
              </Container>
            </Box>
          </Card>
        </Container>
        {/* id */}
        <Container>
          <Box component="section" py={6}>
            <Container>
              <Modal
                open={show}
                onClose={toggleModal}
                sx={{ display: "grid", placeItems: "center" }}
              >
                <Slide direction="down" in={show} timeout={700}>
                  <Card
                    position="relative"
                    width="700px"
                    display="flex"
                    flexDirection="column"
                    borderRadius="xl"
                    bgColor="white"
                    shadow="xl"
                    sx={{
                      p: 2,
                      // mx: { xs: 2, lg: 12 },
                      mt: 8,
                      mb: 8,
                      borderRadius: "12px",
                      boxShadow: 10,
                    }}
                  >
                    <div className="form col-md-12">
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <EventIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <div className="form col-md-11">
                          <label>รหัส</label>
                          <input
                            type="text"
                            className="form-control"
                            aria-describedby="emailHelp"
                            value={valueid}
                            defaultValue={data.event.id}
                            required
                            ref={idRef}
                          />
                        </div>
                      </ListItem>
                    </div>
                    <Divider sx={{ my: 0 }} />
                  </Card>
                </Slide>
              </Modal>
            </Container>
          </Box>
        </Container>
      </Box>
    </Box>
    // <Box pt={6} px={1} mt={6}>
    //     {/* <DefaultFooter content={footerRoutes} /> */}
    //   </Box>
  );
}
export default EditEvent;
