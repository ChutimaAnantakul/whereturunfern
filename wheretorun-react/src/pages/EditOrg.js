import React, { useRef, useState } from "react";
import { enableExperimentalFragmentVariables, useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import DatePicker from "gestalt-datepicker";
import "gestalt-datepicker/dist/gestalt-datepicker.css";
import "gestalt/dist/gestalt.css";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
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
import { teardown } from "@mui/utils/useIsFocusVisible";

//graphql
const updateEditEventMutations = loader(
  "../graphql/mutations/updateEditEvent.gql"
);
const eventseditQuery = loader("../graphql/queries/editeventID.gql");

function EditORG({ match, history }) {
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);

  // const [shouldShow, setShouldShow] = useState(true);
  const [disabled, setDisabled] = React.useState(true);
  // const statusRef = useRef();
 

  const [valueid, setid] = useState();
  const [eventnameTh, seteventnameTh] = useState();
  const [eventnameEn, seteventnameEn] = useState();
  const [eventgroupId, seteventgroupId] = useState();
  

  const [updateEditEvent] = useMutation(updateEditEventMutations);
  const idRef = useRef();
  const eventnameThRef = useRef();
  const eventnameEnRef = useRef();
  const eventgroupIdRef = useRef();

  const handleChange = async (e) => {
    if (
      eventgroupIdRef.current.value === "" ||
      eventnameThRef.current.value === "" ||
      eventnameEnRef.current.value === "" 
    ) {
      return;
    } else {
      e.preventDefault();
      alert("You have submitted the form.");

      const eventnameTh = eventnameThRef.current.value;
      const eventnameEn = eventnameEnRef.current.value;
      const eventgroupId = eventgroupIdRef.current.value;

      const { data } = await updateEditEvent({
        variables: {
          id,
          eventnameTh,
          eventnameEn,
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

  // if check try=ue false
  const dis = data.event.requestapprovals.nodes.map((requestapprovals) => requestapprovals.status); 
  const disa = dis[0];
  if(disabled===disa){
    return setDisabled(!disabled)
  }
  console.log("ยังไม่อนุมัติ",disa);
  console.log("อนุมัติแล้ว",disabled);
  

  return (
    <Box sx={{ display: "flex" }}>
      {/* <Topbar /> */}
      {/* <Sidebar /> */}
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
              mb: 12,
              borderRadius: "12px",
              boxShadow: 10,
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
                      bgcolor: "#5870cb",
                      color: "primary.contrastText",
                      //   boxShadow: 2,
                    }}
                    fullWidth
                  >
                    <CardContent>
                      <h2 >แก้ไขงานวิ่ง</h2>
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
                    <fieldset 
                     disabled = {disabled}
                    >
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
                                disabled
                                
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
                                required
                                fullWidth
                              />
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
                        {/* <Link to={`/category`}>
                          <Button variant="contained" color="inherit">
                            <CancelIcon />
                            &nbsp; Cancel
                          </Button>
                        </Link> */}
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
                      </fieldset>
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
  );
}
export default EditORG;
