import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// icon
import EventIcon from "@mui/icons-material/Event";

//graphql
// const updateRequestApprovalsMutations = loader(
//     "../../../graphql/mutations/UpdateRequestApprovals.gql"
// );

const updateUploadMutations = loader(
    "../../../graphql/mutations/updateUpload.gql"
);

// const requestapprovalIDQueries = loader(
//     "../../../graphql/queries/requestapprovalID.gql"
// );

const approvaluploadIDQueries = loader("../../../graphql/queries/approvaluploadID.gql");

const Approvals = ({ match, history }) => {
    const { id } = match.params;
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    const [valueid, setid] = useState();

    const [updateRequestApprovals] = useMutation(updateUploadMutations);

    const [status, setstatus] = React.useState({
        checkedA: true,
        checkedB: false,
    });

    const handleChangeSwitch = async (e) => {
        // this.setState({
        //   [`${e.target.name}Checked`]: e.target.checked
        // });
        const status = e.target.checked;
        console.log(status);
        const { data } = await updateRequestApprovals({
            variables: {
                id,
                status,
            },
        });
        history.push(`/passapproval`);
        window.location.reload();
    }

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
    const { error, loading, data } = useQuery(approvaluploadIDQueries
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
                                                                        <h6>ชื่องาน</h6>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div>
                                                                        <h6>ไฟล์สำเนาบัตรประชาชน</h6>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div>
                                                                        <h6>ไฟล์งานวิ่ง</h6>
                                                                    </div>
                                                                </TableCell>

                                                                <TableCell align="center">
                                                                    <div>
                                                                        <h6>Action</h6>
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        {/* <TableBody>
                                                                <TableRow hover role="checkbox" tabIndex={-1}>
                                                                    <TableCell align="left">
                                                                        <div>
                                                                            <h6>
                                                                                {data.requestapproval.user.firstname}
                                                                                &nbsp;{data.requestapproval.user.lastname}
                                                                            </h6>
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell align="left">
                                                                        <div>
                                                                            <h6>
                                                                                {data.requestapproval.event.eventnameTh}
                                                                            </h6>
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell align="left">
                                                                        <div>
                                                                            <h6>
                                                                                {data.requestapproval.fileIacard}
                                                                            </h6>
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <div>
                                                                            <h6>
                                                                                {data.requestapproval.fileEvent}
                                                                            </h6>
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Switch
                                                                                    checked={status.checkedB}
                                                                                    onChange={handleChangeSwitch}
                                                                                />
                                                                                
                                                                            }
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                        </TableBody> */}

                                                        <TableBody>
                                                            <TableRow hover role="checkbox" tabIndex={-1}>
                                                                <TableCell align="left">
                                                                    <div>
                                                                        <h6>
                                                                            {data.upload.user.firstname}
                                                                            &nbsp;{data.upload.user.lastname}
                                                                        </h6>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <div>
                                                                        <h6>
                                                                            {data.upload.event.eventnameTh}
                                                                        </h6>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div>
                                                                        <h6>
                                                                            <a
                                                                                href={data.upload.fileIacard}
                                                                                download
                                                                                target="_blank"
                                                                                className={classes.flink}
                                                                            ><u>
                                                                                    {data.upload.iacardName}
                                                                                </u>
                                                                            </a>
                                                                        </h6>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div>
                                                                        <h6>
                                                                        <a
                                                                                href={data.upload.fileEvent}
                                                                                download
                                                                                target="_blank"
                                                                                className={classes.flink}
                                                                            ><u>
                                                                            {data.upload.eventName}
                                                                            </u>
                                                                            </a>
                                                                        </h6>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell align="center">

                                                                    <FormControlLabel
                                                                        control={
                                                                            <Switch
                                                                                checked={status.checkedB}
                                                                                onChange={handleChangeSwitch}
                                                                            />

                                                                        }
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
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
export default Approvals;
