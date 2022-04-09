import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
// import TablePagination from "@material-ui/core/TablePagination";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";

// icon
import EventIcon from "@mui/icons-material/Event";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
// import CloseIcon from "@mui/icons-material/Close";
// import ImageIcon from "@mui/icons-material/Image";

//lodergrapghl
const createSendemailMutations = loader(
  "../graphql/mutations/createSendemail.gql"
);
const sendemailsQueries = loader("../graphql/queries/sendemails.gql");

const EmailForm = ({ history }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: "100%",
    },
  });

  const classes = useStyles();

  const [createSendemail] = useMutation(createSendemailMutations);
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const eventgroupsIdRef = useRef();

  const [eventgroupsId, seteventgroupId] = useState();
  // const [check, setCheck] = React.useState(true);

  const handleCancel = async (e) => {
    window.location.reload();
    history.push(`/category`);
  };

  function sendEmail(e) {
    e.preventDefault();
       const check = eventgroupsIdRef.current.value;
       const ch = data.eventgroups.nodes.map((eventgroups) => eventgroups.id);
       for (let index = 0; index < ch.length; index++) {
          if (ch[index] == check) {
            const i = data.eventgroups.nodes.map((eventgroups) => eventgroups.follow);
              if(i[index].toString()=="true"){
                emailjs.sendForm('service_nrzagaf', 'template_rjdk914', e.target, 'usrgMdpsr9kWZLe0i')
                .then((result) => {
                  console.log("OK");
                },
                (error) => {
                  console.log(error.text);
                });
              e.target.reset()
              }
            console.log(i[index])
            // console.log(ch[index]+" : "+check)
            
          } else {
           const i = data.eventgroups.nodes.map((eventgroups) => eventgroups.follow);
           // console.log("dfsfsdf"+i[index])
          }
       }
  }

  
  const handleSubmit = async (e) => {
    if (
      eventgroupsIdRef.current.value === {eventgroupsId} ||
      firstnameRef.current.value === "" ||
      lastnameRef.current.value === ""
    ) {
      return;
    } else {
      // e.preventDefault();
      // alert("You have submitted the form.");

      const firstname = firstnameRef.current.value;
      const lastname = lastnameRef.current.value;
      const eventgroupsId = eventgroupsIdRef.current.value;
      // console.log(firstname,lastname,eventgroupsId)
      const { data } = await createSendemail({
        variables: {
          // id,
          firstname,
          lastname,
          eventgroupsId,
        },
      });
      // window.location.reload();
      history.push(`/send`);
    }
  };

  // function sendEmail(e) {
  //   e.preventDefault();
  //      const check = eventgroupsIdRef.current.value;
  //      const ch = data.eventgroups.nodes.map((eventgroups) => eventgroups.id);
  //      for (let index = 0; index < ch.length; index++) {
  //         if (ch[index] == check) {
  //           const i = data.eventgroups.nodes.map((eventgroups) => eventgroups.follow);
  //             if(i[index].toString()=="true"){
  //               emailjs.sendForm('service_nrzagaf', 'template_rjdk914', e.target, 'usrgMdpsr9kWZLe0i')
  //               .then((result) => {
  //               },
  //               (error) => {
  //                 console.log(error.text);
  //               });
  //             e.target.reset()
  //             }
  //           console.log(i[index])
  //           // console.log(ch[index]+" : "+check)
            
  //         } else {
  //          const i = data.eventgroups.nodes.map((eventgroups) => eventgroups.follow);
  //          // console.log("dfsfsdf"+i[index])
  //         }
  //      }
  // }

  const { error, loading, data } = useQuery(sendemailsQueries);

  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }

    // eventgroupsIdRef


  return (
    <Box xs={12} sx={{ display: "flex" }}>
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
                      <h2>ส่งเมล</h2>
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
                    <div>
                      <div className="container">
                        <form  onSubmit={sendEmail}>
                          <div className="row pt-3 mx-auto">
                            <div className="col-12 form-group mx-auto">
                            <ListItem>
                                <div className="form col-md-3 "></div>
                                <ListItemAvatar>
                                  <Avatar>
                                    <EventIcon />
                                  </Avatar>
                                </ListItemAvatar>

                                <div className="form col-md-6 ">
                                  <label>ชื่อกลุ่มงานวิ่ง</label>
                                  <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    name="eventgroupsId"
                                    ref={eventgroupsIdRef}
                                    required
                                  >
                                    {/* <option value={""}>None</option>
                                    {data.events.nodes.map((event) => (
                                      <option key={event.id} value={event.id}>
                                        {event.eventnameTh}
                                      </option>
                                    ))} */}
                                    <option value={""}>None</option>
                                    {/* {data.uploads.nodes.map((uploads) => (
                                      <option key={uploads.event.id} value={uploads.event.id}>
                                        {uploads.event.eventnameTh}
                                      </option>
                                    ))} */}
                                    {data.eventgroups.nodes.map((eventgroups) => (
                                      <option key={eventgroups.id} value={eventgroups.id}>
                                        {eventgroups.eventgroupnameTh}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="form col-md-3 "></div>
                              </ListItem>
                            </div>
                            <div className="col-12 form-group mx-auto">
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <EventIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <div className="col-11 form-group mx-auto">
                                  <label>ชื่อ</label>
                                  <input type="text" className="form-control" placeholder="ชื่อ" name="firstname" ref={firstnameRef} />
                                </div>
                              </ListItem>
                            </div>
                            <div className="col-12 form-group mx-auto">
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <EventIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <div className="col-11 form-group pt-2 mx-auto">
                                  <label>นามสกุล</label>
                                  <input type="text" className="form-control" placeholder="นามสกุล" name="lastname" ref={lastnameRef}
                                    pattern="[A-Za-z\s]*"
                                    title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ" />
                                </div>
                              </ListItem>
                            </div>
                            {/* <div className="col-2 pt-3 mx-auto">
                              <button type="submit" className="btn btn-info" color="primary" onClick={handleSubmit} >save</button>
                            </div> */}
                            <Grid
                              container
                              item
                              justifyContent="center"
                              xs={12}
                              my={2}
                            >
                              <Button
                                variant="contained"
                                color="inherit"
                                onClick={handleCancel}
                              >
                                <CancelIcon />
                                &nbsp; Cancel
                              </Button>
                              &nbsp; &nbsp; &nbsp;
                              <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                onClick={handleSubmit}
                              >
                                <SaveIcon />
                                &nbsp; save
                              </Button>
                            </Grid>
                          </div>
                        </form>
                      </div>
                    </div>
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
export default EmailForm;
