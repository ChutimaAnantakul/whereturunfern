
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
import DateRangeIcon from "@mui/icons-material/DateRange";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

//icon
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";

const usersQuery = loader("../../graphql/queries/users.gql");

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
  }));
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
                <MailIcon /><>หน้าหลัก</>
              </Badge> */}
              <HomeIcon />
              &nbsp;
              <div>หน้าหลัก</div>
            </Button>
            <Button
              // size="large"
              color="inherit"
              ariant="contained"
              size="large"
              href="/searchEventGroup"
            >
              <SearchIcon />
              &nbsp;<div>ค้นหางานวิ่งย้อนหลัง</div>
            </Button>
            <Button
              // size="large"
              color="inherit"
              ariant="contained"
              size="large"
              href="/calendar"
            >
              <DateRangeIcon />
              &nbsp;<div>ปฏทินงานวิ่ง</div>
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
              <Link to="/profile">
                <MenuItem onClick={handleClose}>โปรไฟล์</MenuItem>
              </Link>
              <Link to="/orghome">
                <MenuItem onClick={handleClose}>สำหรับผู้จัดงาน</MenuItem>
              </Link>
              <MenuItem onClick={handleClose}>
                <>ขออนุมัติ</>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
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
              &nbsp;<div>เข้าสู่ระบบ</div>
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
