import React, { useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "../components/topbar/Topbar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CardMedia from "@mui/material/CardMedia";
// import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

// icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DateRangeIcon from "@mui/icons-material/DateRange";

import styled from 'styled-components';
import { DatepickerRange } from '@zendeskgarden/react-datepickers';
import { Field, Label, Input, Message } from '@zendeskgarden/react-forms';
import { compareAsc, addDays } from 'date-fns';
import { Row, Col } from '@zendeskgarden/react-grid';


import { makeStyles } from "@material-ui/core/styles";

//graphql
const calendarQuery = loader("../graphql/queries/calendar.gql");

const isCompact = false;

// const StyledRow = styled(Row)`
//   margin-top: ${p => p.theme.space[isCompact ? 'sm' : 'md']};
// `;

function Calender({ history }) {
  const [startdate, setStartValue] = useState(new Date());
  const [enddate, setEndValue] = useState(addDays(new Date(), 16));
  const calendarRangeWidth = isCompact ? 488 : 600;

  const inputstartRef = useRef();

  const isInvalid = () => compareAsc(startdate, enddate) === 1;

  // cal startdate
  const yyyy = new Date(startdate).getFullYear();
  const mm = ("0" + (new Date(startdate).getMonth() + 1)).slice(-2);
  // const mm = new Date(startValue).getMonth()+1;
  const dd = ("0" + new Date(startdate).getDate()).slice(-2);
  // const dd = new Date(startValue).getDate();

  const start = yyyy + '-' + mm + '-' + dd;


  // cal enddate
  const yyyy2 = new Date(enddate).getFullYear();
  const mm2 = ("0" + (new Date(enddate).getMonth() + 1)).slice(-2);
  const dd2 = ("0" + new Date(enddate).getDate()).slice(-2);

  const end = yyyy2 + '-' + mm2 + '-' + dd2;
  console.log(start, end);

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: "100%",
    },
  });

  const classes = useStyles();

  const { error, loading, data } = useQuery(calendarQuery, {
    variables: {
      startdate,
      enddate,
      // provinceId,
      // status,
    },
  });

  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }
console.log(data.events)

  // const eventsta = data.events.nodes.map((events)=>events.startdate);
  // const eventend = data.events.nodes.map((events)=>events.enddate);
  // if(eventsta===startdate){
  //   return eventend
  // }
  // console.log(eventsta, eventend)

  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
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
                      width: "50%",
                      bgcolor: "#98BAE7",
                      color: "primary.contrastText",
                      //   boxShadow: 2,
                    }}
                    fullWidth
                  >
                    <CardContent>
                      <h2>Event Calendar</h2>
                    </CardContent>
                  </Card>
                </Grid>
              </Container>
          <Card
            sx={{
              p: 2,
              // mx: { xs: 2, lg: 12 },
              mt: 2,
              // mb: 12,
              borderRadius: "12px",
              // boxShadow: 10,
            }}
          >
            
            <Grid
              item
              xs={12}
              // lg={12}
              spacing={1}
              container
            >
              
              <Grid
                item
                xs={6}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <DatepickerRange
                  startValue={startdate}
                  endValue={enddate}
                  onChange={changes => {
                    changes.startValue && setStartValue(changes.startValue);
                    changes.endValue && setEndValue(changes.endValue);
                  }}
                  isCompact={isCompact}
                  ref={inputstartRef}
                  value="search"
                  onClick={() => (
                    setStartValue(
                      inputstartRef.current.value
                    ),
                    setEndValue(
                      inputstartRef.current.value
                    )
                  )}
                >
                  <Row justifyContent="center" style={{ minWidth: calendarRangeWidth }}>
                    <Col style={{ maxWidth: calendarRangeWidth }}>
                      <Row>
                        <Col>
                          <Field>
                            <Label>Start</Label>
                            <DatepickerRange.Start>
                              <Input isCompact={isCompact} />
                            </DatepickerRange.Start>
                          </Field>
                        </Col>
                        <Col>
                          <Field>
                            <Label>End</Label>
                            <DatepickerRange.End>
                              <Input isCompact={isCompact} validation={isInvalid() ? 'error' : undefined} />
                            </DatepickerRange.End>
                            {isInvalid() && (
                              <Message validation="error">End date must occur after the start date</Message>
                            )}
                          </Field>
                        </Col>
                      </Row>
                      {/* <StyledRow> */}
                      <Col>
                        <DatepickerRange.Calendar />
                      </Col>
                      {/* </StyledRow> */}
                    </Col>
                  </Row>
                </DatepickerRange>
              </Grid>
              <hr /><br />
              {/* แสดงผล */}
              
              <Grid
                  item
                  xs={6}
                  container
                  direction="row"
                  // justifyContent="center"
                  // alignItems="center"
                >
                  <h5>รายการวิ่ง {data.events.totalCount} รายการ</h5>
                  {/* <Card
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      mb: 4,
                      width: "100%",
                    }}
                    fullWidth
                  > */}
                    <br />
                    <Grid container spacing={3} sx={{ mb: 12 }}>
                      <Grid item xs={12} lg={12}>
                        <Grid container spacing={3}>
                          {data.events.nodes.map((events) => (
                            <Grid item xs={12} md={6} key={events.id}>
                              <Link to={`/event/${events.id}`}>
                              <div className="form col-md-12 ">
                                <Card
                                  sx={{
                                    overflow: "hidden",
                                    // borderRadius: "12px",
                                    boxShadow: 6,
                                    mb: 2,
                                    mr: 2,
                                    ml: 2,
                                  }}
                                >
                                  <CardMedia
                                    component="img"
                                    // width="100%"
                                    // height="150"
                                    image={events.coverphotourl}
                                    alt="Live from space album cover"
                                  />
                                </Card>
                                </div>
                                <div className="form col-md-12 ">
                                  <h6>{events.eventnameTh}</h6>
                                </div>
                                <br />
                                <div className="form col-md-12 ">
                                &nbsp;<AccountCircleIcon />
                                  &nbsp;{events.organizer}
                                </div>
                                <div className="form col-md-12 ">
                                &nbsp;<DateRangeIcon />
                                  &nbsp;จัดงานวิ่ง:{events.startdate}
                                  &nbsp;-&nbsp;
                                  {events.enddate}
                                </div>
                              </Link>
                              {/* <Box
                                display="flex"
                                justifyContent="space-between"
                                p={1.5}
                              >
                              </Box> */}
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  {/* </Card> */}
                </Grid>
            </Grid>
            {/* <br /><hr /><br /> */}
            {/* <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Container>
                <Grid
                  item
                  xs={6}
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
                    }}
                    fullWidth
                  >
                    <br />
                    <Grid container spacing={3} sx={{ mb: 12 }}>
                      <Grid item xs={12} lg={12}>
                        <Grid container spacing={3}>
                          {data.events.nodes.map((events) => (
                            <Grid item xs={12} md={6} key={events.id}>
                              <Link to={`/event/${events.id}`}>
                              <div className="form col-md-12 ">
                                <Card
                                  sx={{
                                    overflow: "hidden",
                                    borderRadius: "12px",
                                    boxShadow: 6,
                                    mb: 2,
                                    mr: 2,
                                    ml: 2,
                                  }}
                                >
                                  <CardMedia
                                    component="img"
                                    width="100%"
                                    height="150"
                                    image={events.coverphotourl}
                                    alt="Live from space album cover"
                                  />
                                </Card>
                                </div>
                                <div className="form col-md-12 ">
                                  <h6>{events.eventnameTh}</h6>
                                </div>
                                <br />
                                <div className="form col-md-12 ">
                                &nbsp;<AccountCircleIcon />
                                  &nbsp;{events.organizer}
                                </div>
                                <div className="form col-md-12 ">
                                &nbsp;<DateRangeIcon />
                                  &nbsp;จัดงานวิ่ง:{events.startdate}
                                  &nbsp;-&nbsp;
                                  {events.enddate}
                                </div>
                              </Link>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Container>
            </Grid> */}
          </Card>
        </Container>
      </Box>
    </Box>
  );
}
export default Calender;
