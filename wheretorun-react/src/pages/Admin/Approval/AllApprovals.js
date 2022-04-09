import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../../../components/admintopbar/Topbar";
// import Topbar from "../../../components/orgtopbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

// import FormHelperText from "@mui/material/FormHelperText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";

// icon
import EventIcon from "@mui/icons-material/Event";


//graphql
// const approvalQueries = loader(
//     "../../../graphql/queries/approval.gql"
// );

const approvaluploadsQueries = loader("../../../graphql/queries/approvaluploads.gql");

const AllApprovals = ({ match, history }) => {

    const [valueid, setid] = useState();
    const [status, setstatus] = useState(false);

    const idRef = useRef();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (requestapproval, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (requestapproval) => {
        setRowsPerPage(+requestapproval.target.value);
        setPage(0);
    };

    const useStyles = makeStyles({
        root: {
            width: "100%",
        },
        container: {
            maxHeight: "100%",
        },
        flink: {
            color: "#0000FF",
        },
    });

    const classes = useStyles();
    const { id } = match.params;

    const { error, loading, data } = useQuery(approvaluploadsQueries
        , {
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
                    //   borderRadius: "12px",
                    //   boxShadow: 10,
                    //   mt: 2,
                }}
            >
                <Toolbar />

                <Container>
                    <Card
                        sx={{
                            p: 2,
                            // mx: { xs: 2, lg: 12 },
                            mt: 2,
                            // mb: 12,
                            borderRadius: "12px",
                            boxShadow: 10,
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            // lg={12}
                            spacing={1}
                            container
                        >
                            <Container>
                                <Grid
                                    item
                                    xs={8}
                                    // container
                                    // direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Card
                                        sx={{
                                            overflow: "hidden",
                                            borderRadius: "12px",
                                            mb: 2,
                                            mt: 2,
                                            width: "100%",
                                            bgcolor: "#5870cb",
                                            color: "primary.contrastText",
                                            //   boxShadow: 2,
                                        }}
                                        fullWidth
                                    >
                                        <CardContent>
                                            <h2>ตารางรายการอนุมัติสิทธิ์ผู้จัดงาน</h2>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Container>

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
                                        className={classes.root}
                                        fullWidth
                                    >
                                        <Paper
                                            className={classes.root}
                                        >
                                            <form>
                                                <TableContainer
                                                    className={classes.container}
                                                >
                                                    <Table stickyHeader aria-label="sticky table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <div>
                                                                        <h6>ชื่อผู้ใช้งาน</h6>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div>
                                                                        <h6>ชื่องานวิ่ง</h6>
                                                                    </div>
                                                                </TableCell>

                                                                <TableCell align="center">
                                                                    <div>
                                                                        <h6>Action</h6>
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        

                                                        <TableBody>
                                                            {data.requestapprovals.nodes
                                                                // .map((requestapprovals) => (

                                                                .slice(
                                                                    page * rowsPerPage,
                                                                    page * rowsPerPage + rowsPerPage
                                                                )
                                                                .map((requestapprovals) => (
                                                                    <TableRow hover role="checkbox" tabIndex={-1}>
                                                                        <TableCell align="left">
                                                                            <div>
                                                                                <h6>
                                                                                    {requestapprovals.user.firstname}
                                                                                    &nbsp;{requestapprovals.user.lastname}
                                                                                </h6>
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell align="left">
                                                                            <div>
                                                                                <h6>
                                                                                    
                                                                                    <a href={requestapprovals.linkdrive}
                                                                                        download
                                                                                        target="_blank"
                                                                                        className={classes.flink}
                                                                                    ><u>
                                                                                            {requestapprovals.event.eventnameTh}
                                                                                        </u>
                                                                                    </a>
                                                                                </h6>
                                                                            </div>
                                                                        </TableCell>
                                                                        
                                                                        {/* <TableCell>
                                                                            <div>
                                                                                <h6>
                                                                                    <a href={uploads.fileEvent}
                                                                                        download
                                                                                        target="_blank"
                                                                                        className={classes.flink}
                                                                                    ><u>
                                                                                            {uploads.eventName}
                                                                                        </u>
                                                                                    </a>
                                                                                </h6>
                                                                            </div>
                                                                        </TableCell> */}
                                                                        <TableCell align="center">
                                                                            <Link to={`/approval/${requestapprovals.id}`}>
                                                                                <Button
                                                                                    variant="contained"
                                                                                    type="submit"
                                                                                    color="primary"
                                                                                >
                                                                                    {/* <SaveIcon /> */}
                                                                                    &nbsp; ทำการอนุมัติ
                                                                                </Button>
                                                                            </Link>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                <TablePagination
                                                    rowsPerPageOptions={[
                                                        5,
                                                        10,
                                                        25,
                                                        { label: "All", value: -1 },
                                                    ]}
                                                    // rowsPerPageOptions={[10, 25, 100]}
                                                    component="div"
                                                    // count={data.requestapprovals.totalCount}
                                                    count={data.requestapprovals.totalCount}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                />
                                            </form>
                                        </Paper>
                                    </Card>
                                </Grid>
                            </Container>
                        </Grid>
                    </Card>
                </Container>
            </Box>
        </Box>
    );
};
export default AllApprovals;
