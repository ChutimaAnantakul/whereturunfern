import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";


import DatePicker from "react-datepicker";


// icon
import EventIcon from "@mui/icons-material/Event";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

//page
import Navbar from "../../../pages/layout/Navbar";
import NavbarEn from "../../../pages/layout/NavbarEn";

//lodergraphgl
const updateUserMutations = loader(
  "../../../graphql/mutations/updateUser.gql"
);
const userIDQueries = loader("../../../graphql/queries/user.gql");

const theme = createTheme();

const EditMemberProfile = ({ match, history }) => {
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

  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);

  const [val, setVal] = React.useState(new Date());
  const [valueid, setid] = useState();
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [birthdate, setbirthdate] = useState(new Date());
  const [gender, setgender] = useState();
  const [phone, setphone] = useState();
  const [profileimageurl, setprofileimageurl] = useState();

  const [startDate, setStartDate] = useState(new Date());
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  const [updateUser] = useMutation(updateUserMutations);
  const idRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const birthdateRef = useRef();
  const genderRef = useRef();
  const phoneRef = useRef();
  const profileimageurlRef = useRef();

  const handleChange = async (e) => {
    if (
      firstnameRef.current.value === "" ||
      lastnameRef.current.value === "" ||
      birthdateRef.current.value === "" ||
      genderRef.current.value === "" ||
      phoneRef.current.value === "" ||
      profileimageurlRef.current.value === ""
    ) {
      return;
    } else {
      e.preventDefault();
      alert("You have submitted the form.");

      // const id = idRef.current.value;
      const firstname = firstnameRef.current.value;
      const lastname = lastnameRef.current.value;
      const birthdate = new Date(
        birthdateRef.current.value
      ).toDateString();
      const gender = genderRef.current.value;
      const phone = phoneRef.current.value;
      const profileimageurl = profileimageurlRef.current.value;
console.log(birthdateRef);
      const { data } = await updateUser({
        variables: {
          id,
          firstname,
          lastname,
          birthdate,
          gender,
          phone,
          profileimageurl,
        },
      });
      history.push(`/profilemember/${data.updateUser.user.id}`);
      window.location.reload();
    }
  };
  //   const handleCancel = async (e) => {
  //     window.location.reload();
  //     history.push(`/category`);
  //   };

  const { id } = match.params;
  const { loading, error, data } = useQuery(userIDQueries, {
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
          <Card
            sx={{
              p: 2,
              // mx: { xs: 2, lg: 12 },
              mt: 2,
              mb: 4,
              borderRadius: "12px",
              // boxShadow: 7,
            }}
          >
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
                      bgcolor: "#98BAE7",
                      color: "primary.contrastText",
                      mb: 2,
                      width: "100%",
                      //   boxShadow: 2,
                    }}
                    fullWidth
                  >
                    <CardContent>
                      <h2>แก้ไขข้อมูลโปรไฟล์</h2>
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
                      {/* <Grid container spacing={3}> */}
                      <br />
                      <div className="form col-md-12">
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <EventIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <div className="form col-md-5 ">
                            <label>ชื่อ</label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              defaultValue={data.user.firstname}
                              value={firstname}
                              required
                              pattern="[A-Za-z0-9,():;* '%#<>_^|./\\s]*"
                              // title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                              ref={firstnameRef}
                              onChange={() =>
                                setfirstname(
                                  firstnameRef.current.value
                                )
                              }
                            />
                          </div>
                          <ListItemAvatar>
                            <Avatar>
                              <EventIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <div className="form col-md-5 ">
                            <label>นามสกุล</label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              defaultValue={data.user.lastname}
                              value={lastname}
                              required
                              pattern="[A-Za-z0-9,():;* '%#<>_^|./\\s]*"
                              // title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                              ref={lastnameRef}
                              onChange={() =>
                                setlastname(
                                  lastnameRef.current.value
                                )
                              }
                            />
                          </div>
                        </ListItem>
                      </div>

                      <div className="form col-md-12">
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <EventIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <div className="form col-md-4 ">
                            <label>วันเดือนปีเกิด</label>
                            <DatePicker 
      selected={startDate} 
      onChange={date => setStartDate(date)} 
    />
                            {/* <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              defaultValue={data.user.birthdate}
                              value={birthdate}
                              required
                              ref={birthdateRef}
                              onChange={() =>
                                setbirthdate(
                                  birthdateRef.current.value
                                )
                              }
                            /> */}
                          </div>
                          <ListItemAvatar>
                            <Avatar>
                              <EventIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <div className="form col-md-3 ">
                            <label>เพศ</label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              defaultValue={data.user.gender}
                              value={gender}
                              required
                              pattern="[A-Za-z0-9,():;* '%#<>_^|./\\s]*"
                              // title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                              ref={genderRef}
                              onChange={() =>
                                setgender(
                                  genderRef.current.value
                                )
                              }
                            />
                          </div>
                          <ListItemAvatar>
                            <Avatar>
                              <EventIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <div className="form col-md-3 ">
                            <label>เบอร์โทรศัพท์</label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              defaultValue={data.user.phone}
                              value={phone}
                              required
                              pattern="[A-Za-z0-9,():;* '%#<>_^|./\\s]*"
                              // title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                              ref={phoneRef}
                              onChange={() =>
                                setphone(
                                  phoneRef.current.value
                                )
                              }
                            />
                          </div>
                        </ListItem>
                      </div>
                      <div className="form col-md-12">
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <EventIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <div className="form col-md-11 ">
                            <label>ลิ้งค์รูปโปรไฟล์</label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              defaultValue={data.user.profileimageurl}
                              value={profileimageurl}
                              required
                              // pattern="[A-Za-z0-9,():;* '%#<>_^|./\\s]*"
                              // title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                              ref={profileimageurlRef}
                              onChange={() =>
                                setprofileimageurl(
                                  profileimageurlRef.current.value
                                )
                              }
                            />
                          </div>
                        </ListItem>
                      </div>

                      {/* </Grid> */}
                      <Grid
                        container
                        item
                        justifyContent="center"
                        xs={12}
                        my={2}
                      >
                        <Link to={`/profilemember/${data.user.id}`}>
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
                      {/* </Grid> */}
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
                            defaultValue={data.user.id}
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
};
export default EditMemberProfile;
