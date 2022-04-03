import React, { useState, useRef, Fragment } from "react";
import emailjs from "emailjs-com";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import DatePicker from "gestalt-datepicker";
// import  th-TH  from "date-fns/locale";

import "gestalt-datepicker/dist/gestalt-datepicker.css";
import "gestalt/dist/gestalt.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";

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
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CancelIcon from "@mui/icons-material/Cancel";
import Save from "@mui/icons-material/Save";

//graphql
const yearprovinceseventgroupsQueries = loader(
  "../../../graphql/queries/yearprovinceseventgroups.gql"
);

const createEventMutations = loader(
  "../../../graphql/mutations/createEvent.gql"
);

const CreatedEvent = ({ history }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  // const [endDate, setEndDate] = useState(new Date());

  const [startDate2, setStartDate2] = useState(new Date());
  const [endDate2, setEndDate2] = useState();

  const [createEvent] = useMutation(createEventMutations);
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


  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_nrzagaf', 'template_ns9i3ca', e.target, 'usrgMdpsr9kWZLe0i')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset()
  }

 
  // const {
  //   createevent,
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(validationSchema),
  // });

  const handleSubmit = async (e) => {
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
      // e.preventDefault();
      // alert("You have submitted the form.");

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

      const { data } = await createEvent({
        variables: {
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

      history.push(`/createdRaceEvent`);
      window.location.reload();
    }
  };

  const { error, loading, data } = useQuery(yearprovinceseventgroupsQueries);

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
              mt: 2,
              mb: 12,
              borderRadius: "4px",
              // boxShadow: 10,
              // bgcolor: "#EDEEF7",
            }}
          >
            <Box component="section">
              <Container>
                <Grid
                  item
                  xs={4}
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
                      <h2>เพิ่มงานวิ่ง</h2>
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
                    <br />
                    <form onSubmit={sendEmail}>
                      <Grid container spacing={2}>
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
                                required
                              >
                                <option selected>None</option>
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
                                id="outlined-basic"
                                label="ชื่องานวิ่งภาษาไทย"
                                variant="outlined"
                                placeholder="ชื่องานวิ่งภาษาไทย"
                                name="eventnameTh"
                                ref={eventnameThRef}
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
                                name="eventnameEn"
                                ref={eventnameEnRef}
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
                                <EventIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>สถานที่จัดงานวิ่งภาษาไทย</label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="สถานที่จัดงานวิ่งภาษาไทย"
                                ref={locationThRef}
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
                                ref={locationEnRef}
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
                                <LocationCityIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>จังหวัด</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                ref={provinceIdRef}
                                required
                              >
                                {/* <option>จังหวัด</option> */}
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
                        <Grid item xs={12} md={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <PermIdentityIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-11 ">
                              <label>ผู้จัดงาน</label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="ผู้จัดงาน"
                                name="organizer"
                                ref={organizerRef}
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
                                ref={latitudeRef}
                                min="5.00000000000000000"
                                max="20.00000000000000000"
                                step="0.00000000000000001"
                                title="ไม่ได้อยู่ในพิกัดละติจูดของประเทศไทย"
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
                                ref={longitudeRef}
                                min="97.00000000000000000"
                                max="150.00000000000000000"
                                step="0.00000000000000001"
                                title="ไม่ได้อยู่ในพิกัดลองจิจูดของประเทศไทย"
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
                                  // localeData="th-TH"
                                  rangeStartDate={startDate}
                                  rangeEndDate={endDate}
                                  id="example-start-date"
                                  label="วันแรก"
                                  minDate={new Date()}
                                  // format="dd MMM yyyy"
                                  nextRef={applicationdeadlineRef}
                                  onChange={({ event, value }) => {
                                    setStartDate(value);
                                  }}
                                  rangeSelector="start"
                                  value={startDate}
                                  name="openforapplications"
                                  ref={openforapplicationsRef}
                                />
                                <DatePicker
                                  rangeStartDate={startDate}
                                  rangeEndDate={endDate}
                                  id="example-end-date"
                                  label="วันสุดท้าย"
                                  nextRef={openforapplicationsRef}
                                  onChange={({ event, value }) =>
                                    setEndDate(value)
                                  }
                                  rangeSelector="end"
                                  value={endDate}
                                  name="applicationdeadline"
                                  ref={applicationdeadlineRef}
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
                              <div className="form col-md-11 ">
                                <label>วันจัดงานวิ่ง</label>
                                <DatePicker
                                  rangeStartDate={startDate2}
                                  rangeEndDate={endDate2}
                                  id="example-start-date"
                                  label="วันแรก"
                                  minDate={new Date()}
                                  nextRef={enddateRef}
                                  onChange={({ event, value }) => {
                                    setStartDate2(value);
                                  }}
                                  rangeSelector="start"
                                  value={startDate2}
                                  name="startdate"
                                  ref={startdateRef}
                                />
                                <DatePicker
                                  rangeStartDate={startDate2}
                                  rangeEndDate={endDate2}
                                  id="example-end-date"
                                  label="วันสุดท้าย"
                                  nextRef={startdateRef}
                                  onChange={({ event, value }) =>
                                    setEndDate2(value)
                                  }
                                  rangeSelector="end"
                                  value={endDate2}
                                  name="enddate"
                                  ref={enddateRef}
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
                                  ref={yearIdRef}
                                  required
                                >
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
                                ref={hashtagRef}
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
                                name="linkurl"
                                ref={linkurlRef}
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
                                ref={facebookurlRef}
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
                                ref={coverphotourlRef}
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
                                ref={posterRef}
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
                                ref={awardphotoRef}
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
                                ref={shirtsizeRef}
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
                                rows="3"
                                ref={descriptionThRef}
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
                                rows="3"
                                ref={descriptionEnRef}
                                pattern="[A-Za-z0-9,():;* '%#<>_^|./\\s]*"
                                title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                                fullWidth
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
                        <Link to="/edit">
                          <Button variant="contained" color="inherit">
                            <CancelIcon />
                            &nbsp; cancel
                          </Button>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Link>
                        {/* <Link to="/createdRaceEvent"> */}
                        <Button
                          variant="contained"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          <Save /> &nbsp; save
                        </Button>
                        {/* </Link> */}
                      </Grid>
                    </form>
                  </Card>
                </Grid>
              </Container>
            </Box>
          </Card>
        </Container>
      </Box>
    </Box>
    // <Box pt={6} px={1} mt={6}>
    //     {/* <DefaultFooter content={footerRoutes} /> */}
    //   </Box>
  );
};
export default CreatedEvent;
