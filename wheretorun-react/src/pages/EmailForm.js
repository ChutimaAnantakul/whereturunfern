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
const createCategoryMutations = loader(
  "../graphql/mutations/createCategory.gql"
);
const categoriesQueries = loader("../graphql/queries/categories.gql");

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

  const [createCategory] = useMutation(createCategoryMutations);
  const categorynameThRef = useRef();
  const categorynameEnRef = useRef();

  // function sendEmail(e) {
  //   e.preventDefault();

  //   emailjs.sendForm('service_nrzagaf', 'template_ns9i3ca', e.target, 'usrgMdpsr9kWZLe0i')
  //     .then((result) => {
  //       console.log(result.text);
  //     }, (error) => {
  //       console.log(error.text);
  //     });
  //   e.target.reset()
  // }

  // const handleSubmit = async (e) => {
  //   if (
  //     categorynameThRef.current.value === "" ||
  //     categorynameEnRef.current.value === ""
  //   ) {
  //     return;
  //   } else {
  //     e.preventDefault();
  //     alert("You have submitted the form.");

  //     const categorynameTh = categorynameThRef.current.value;
  //     const categorynameEn = categorynameEnRef.current.value;
  //     const { data } = await createCategory({
  //       variables: {
  //         // id,
  //         categorynameTh,
  //         categorynameEn,
  //       },
  //     });
  //     window.location.reload();
  //     history.push(`/category`);
  //   }
  // };

  const handleCancel = async (e) => {
    window.location.reload();
    history.push(`/category`);
  };

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_nrzagaf', 'template_rjdk914', e.target, 'usrgMdpsr9kWZLe0i')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset()
  }

  const handleSubmit = async (e) => {
    if (
      categorynameThRef.current.value === "" ||
      categorynameEnRef.current.value === ""
    ) {
      return;
    } else {
      // e.preventDefault();
      // alert("You have submitted the form.");

      const categorynameTh = categorynameThRef.current.value;
      const categorynameEn = categorynameEnRef.current.value;
      const { data } = await createCategory({
        variables: {
          // id,
          categorynameTh,
          categorynameEn,
        },
      });
      // window.location.reload();
      history.push(`/send`);
    }
  };


  const { error, loading, data } = useQuery(categoriesQueries);

  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }

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
                      <h2>เพิ่มประเภทหมวดหมู่งานวิ่ง</h2>
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
                        <form onSubmit={sendEmail}>
                          <div className="row pt-3 mx-auto">
                            <div className="col-12 form-group mx-auto">
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <EventIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <div className="col-11 form-group mx-auto">
                                  <label>ประเภทหมวดหมู่งานวิ่ง (ภาษาไทย)</label>
                                  <input type="text" className="form-control" placeholder="ประเภทหมวดหมู่งานวิ่ง (ภาษาไทย)" name="categorynameTh" ref={categorynameThRef} />
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
                                  <label>ประเภทหมวดหมู่งานวิ่ง (ภาษาอังกฤษ)</label>
                                  <input type="text" className="form-control" placeholder="ประเภทหมวดหมู่งานวิ่ง (ภาษาอังกฤษ)" name="categorynameEn" ref={categorynameEnRef}
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
