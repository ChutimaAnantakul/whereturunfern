
import React from "react";
import Box from "@mui/material/Box";
import { Link, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import CardMedia from "@mui/material/CardMedia";
// import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

//icon
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EditIcon from "@mui/icons-material/Edit";
import { height } from "@mui/system";

const usersQuery = loader("../../graphql/queries/notification.gql");

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Topbar() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    flink: {
      color: "#0000FF",
    },
  }));
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseNoti = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { error, loading, data } = useQuery(usersQuery);
  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }
  const noti = data.users.nodes.map((users) => users.requestapprovals.totalCount);

  // const menuId = "primary-search-account-menu";
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{ vertical: "top", horizontal: "right" }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  //   </Menu>
  // );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  return (
    <>
      <AppBar
        // position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: 6,
          p: 1,
          bgcolor: "#676FA3",
          // mr:15,
          // ml:20,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Where To Run
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              // size="large"
              // aria-label="show 4 new mails"
              color="inherit"
              ariant="contained"
              size="large"
              href="/"
            >
              {/* <Badge badgeContent={4} color="error">
                <MailIcon /><>????????????????????????</>
              </Badge> */}
              <HomeIcon />
              &nbsp;
              <div>????????????????????????</div>
            </Button>
            <Button
              // size="large"
              color="inherit"
              ariant="contained"
              size="large"
              href="/searchEventGroup"
            >
              <SearchIcon />
              &nbsp;<div>????????????????????????????????????????????????????????????</div>
            </Button>
            <Button
              // size="large"
              color="inherit"
              ariant="contained"
              size="large"
              href="/calendar"
            >
              <DateRangeIcon />
              &nbsp;<div>????????????????????????????????????</div>
            </Button>
            <Avatar
              aria-haspopup="true"
              onClick={handleClick}
              className={classes.purple}
              src={data.users.nodes.map((users) => users.profileimageurl)}
            >
              {data.users.nodes.map((users) => users.firstname)}
            </Avatar>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* <Link to="/profile">
                <MenuItem onClick={handleClose}>?????????????????????</MenuItem>
              </Link> */}
              <Link to="/uprequest">
                <MenuItem onClick={handleClose}>???????????????????????????</MenuItem>
              </Link>
              <MenuItem onClick={handleClickOpen}>
                <>?????????????????????????????????????????????</>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={noti} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
              
              <Dialog
                PaperProps={{
                  style: {
                    width: "30%",
                    height: "auto"
                  },
                }}
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseNoti}
                aria-describedby="alert-dialog-slide-description"
              >
                
                <DialogTitle>{"????????????????????????????????????"}&nbsp; {data.users.nodes.map((users) => users.requestapprovals.totalCount)}&nbsp; {"??????????????????"}</DialogTitle>
                {data.users.nodes.map((users) => users.requestapprovals.nodes.map((requestapprovals) => (
                  <DialogContent>
                  <Card
                    sx={{
                      overflow: "hidden",
                      borderRadius: "12px",
                      boxShadow: 3,
                      mb: 2,
                      mr: 10,
                      ml: 10,
                    }}
                  >
                    <CardMedia
                      component="img"
                      width="100%"
                      height="100"
                      image={requestapprovals.event.coverphotourl}
                      alt="Live from space album cover"
                    />
                  </Card>
                  <DialogContentText id="alert-dialog-slide-description">
                    <div className="form col-md-12 ">
                      <h6>{requestapprovals.event.eventnameTh}</h6>
                    </div>
                    <div className="form col-md-12 ">
                      <AccountCircleIcon />
                      &nbsp;{requestapprovals.event.organizer}
                    </div>
                    <div className="form col-md-12 ">
                      <DateRangeIcon />
                      &nbsp;??????????????????????????????:&nbsp;{requestapprovals.event.startdate}
                      &nbsp;-&nbsp;
                      {requestapprovals.event.enddate}
                    </div>
                    <div className="form col-md-12 ">
                      <EditIcon />
                      &nbsp;?????????????????????????????????:
                      <Link to={`/editEventOrg/${requestapprovals.event.id}`}>
                        {/* <ListItemButton>
                          <ListItemIcon> */}
                        &nbsp; <b
                          className={classes.flink}
                        ><u>Link</u></b>
                        {/* </ListItemIcon>
                        </ListItemButton> */}
                      </Link>

                    </div><br />
                    <Divider />
                  </DialogContentText>
                </DialogContent>
                 )))}
                <DialogActions>
                  <Button onClick={handleCloseNoti}>Cancel</Button>
                </DialogActions>
                
              </Dialog>
               
            </Menu>
            <Button
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              ariant="contained"
              size="large"
            >
              <AccountCircle />
              &nbsp;<div>?????????????????????????????????</div>
            </Button>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </>
  );
}
