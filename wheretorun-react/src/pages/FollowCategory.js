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
import List from "@material-ui/core/List";
import Avatar from "@mui/material/Avatar";
// import TablePagination from "@material-ui/core/TablePagination";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import Card from "@mui/material/Card";
import Divider from "@material-ui/core/Divider";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
import Checkbox from '@mui/material/Checkbox';

// icon
import EventIcon from "@mui/icons-material/Event";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CommentIcon from "@material-ui/icons/Comment";
// import CloseIcon from "@mui/icons-material/Close";
// import ImageIcon from "@mui/icons-material/Image";

//page
import Navbar from "../pages/layout/Navbar";

//lodergrapghl
const categoriesQueries = loader("../graphql/queries/categories.gql");
const FollowCategoryMutations = loader("../graphql/mutations/FollowCategory.gql");

const FollowCategory = ({ history, match }) => {
    const [FollowCategory] = useMutation(FollowCategoryMutations);
    const IdRef = useRef();

    const [followcategory, setffollowcategory] = React.useState({
        followcategoryA: true,
        followcategoryB: false,
    });

    const useStyles = makeStyles({
        root: {
            width: "100%",
        },
        container: {
            maxHeight: "100%",
        },
    });

    const classes = useStyles();

    const handleChangeFollowCategory = async (event) => {

        // const id = IdRef.current.value;
        const id = event.target.value;
        const followcategory = event.target.checked
        setffollowcategory(followcategory);
        // setfollow(event.target.checked)
        // setfollowName(event.target.checked);
        console.log(followcategory, id);
        const { data } = await FollowCategory({
            variables: {
              id,
              followcategory,
            },
          });
    };

    //   const { id } = match.params;
    const { loading, error, data } = useQuery(categoriesQueries)
    if (loading) {
        return "loading...";
    }
    if (error) {
        return "error";
    }
    // console.log(data);

    return (
        <Box xs={12} sx={{ display: "flex" }}>
            <Navbar />
            <Toolbar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 1,
                    bgcolor: "#EDEEF7",
                }}
            >
                {/* <Toolbar /> */}
                <Container>
                    {/* <Card
            sx={{
              p: 2,
              mt: 2,
              mb: 4,
              borderRadius: "12px",
            }}
          > */}
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                    // style={{ minHeight: '100vh' }}
                    >
                        <Card
                            justifyContent="center"
                            alignItems="flex-start"
                            sx={{
                                overflow: "hidden",
                                borderRadius: "12px",
                                boxShadow: 1,
                                mt: 12,
                                mb: 4,
                                width: "40%",
                            }}
                        //   style={{ backgroundColor: 'teal',
                        //   align:"right"
                        //  }}
                        >
                            {" "}
                            <CardContent>
                                {/* <ListItem>
                  &nbsp;
                  <h5>ข้อมูลส่วนตัว</h5>

                </ListItem> */}
                                <Grid
                                    align="center"
                                    container
                                    direction="column"
                                    justify="center"
                                    spacing={0}
                                >
                                    <h5>ติดตามหมวดหมู่งานวิ่ง</h5>
                                </Grid>


                                <Grid
                                    container
                                    item
                                    // justifyContent="center"
                                    xs={12}
                                // my={2}
                                >
                                    <List className={classes.root}>
                                        {/* {data.event.reviews.nodes.map((reviews) => ( */}
                                        <div>
                                            <ListItem>
                                                {/* {data.categories.nodes.map((categories) => {
                                                    <h6>{categories.categorynameTh}</h6>
                                                })}; */}
                                                <Grid
                                                    container
                                                    item
                                                    // justifyContent="center"
                                                    xs={12}
                                                // my={2}
                                                >
                                                    <List className={classes.root}>
                                                        {data.categories.nodes.map((categories) => (
                                                            <div
                                                            // key={categories.id}
                                                            // value={categories.id}
                                                            // ref={IdRef}
                                                            >
                                                                <Grid item xs={12} >
                                                                    <ListItem>
                                                                        <div className="form col-md-12">
                                                                            <div className="form col-md-12">
                                                                                <h6>
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        style={{
                                                                                            color: "#00e676",
                                                                                            width: 20,
                                                                                            height: 20
                                                                                        }}
                                                                                        // className="form-control"
                                                                                        aria-describedby="emailHelp"
                                                                                        required
                                                                                        checked={followcategory.followcategoryB}
                                                                                        value={categories.id}
                                                                                        onChange={handleChangeFollowCategory}

                                                                                    />&nbsp;
                                                                                    {/* <Checkbox
                                                                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                                                        checked={followcategory.followcategoryB}
                                                                                        value={categories.id}
                                                                                        onChange={handleChangeFollowCategory}

                                                                                    /> */}
                                                                                    {categories.categorynameTh}
                                                                                    {/* <select
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        aria-describedby="emailHelp"
                                                                                        defaultValue={categories.categorynameTh}
                                                                                        value={categories.id}
                                                                                        ref={IdRef}
                                                                                    > */}
                                                                                    {/* <option key={categories.id} value={categories.id}  ref={IdRef}>
                                                                                            {categories.categorynameTh}
                                                                                        </option> */}
                                                                                    {/* </select> */}
                                                                                </h6>
                                                                            </div>
                                                                        </div>
                                                                    </ListItem>
                                                                </Grid>
                                                                <Divider variant="inset" component="li" />
                                                            </div>
                                                        ))}
                                                    </List>
                                                </Grid>
                                                {/* <Avatar
                            alt={data.admin.firstname}
                            src={data.admin.profileimageurl}
                            sx={{ width: 130, height: 130 }}
                          />
                          &nbsp; */}
                                                {/* <div className="form col-md-12">
                            <div className="form col-md-12">
                              <p><b>รหัสผ่าน : </b>&nbsp;{data.admin.password}</p>
                            </div>
                          </div> */}
                                            </ListItem>
                                            <Grid
                                                container
                                                item
                                                justifyContent="center"
                                                xs={12}
                                                my={2}
                                            >
                                                <Link to="/">
                                                    <Button
                                                        variant="contained"
                                                        type="submit"
                                                    // onClick={handleSubmit}
                                                    // onClick={handleChangeFollowCategory}
                                                    >
                                                        follow
                                                    </Button>
                                                </Link>
                                            </Grid>
                                            <Divider variant="inset" component="li" />
                                        </div>
                                        {/* ))} */}
                                    </List>
                                </Grid>
                                <hr />
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* </Card> */}
                </Container>
            </Box>
        </Box>

    );
};
export default FollowCategory;
