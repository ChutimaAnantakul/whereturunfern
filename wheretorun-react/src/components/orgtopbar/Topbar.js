import React, { useState, useRef }  from "react";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { loader } from "graphql.macro";
// import Card from "@mui/material/Card";



// import { NotificationsNone, Language, Settings } from "@material-ui/icons";

// graphql
const NotificationQueries = loader("../../graphql/queries/notification.gql");

export default function Topbar(match) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // const [notification, setNotification] = React.useState(true);
  // const { window } = props;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";

  const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);

  const { error, loading, data } = useQuery(NotificationQueries)
  // , {
  //     variables: {
  //         id,
  //     },
  //     fetchPolicy: "network-only",
  // });
  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }

  const noti = data.uploads.totalCount;

  // const Notifi = async (e) => {
  //   if(notification===noti){
  //       return setNotification(!notification)
  //     }
  //   console.log(noti);
  // }

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: 6,
        p: 1,
        bgcolor: "#1a237e"
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Where To Run
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>


          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={noti} color="error"
            // onClick={Notifi} 
            // disabled={notification
            >
              <WhiteTextTypography>
                <MailIcon />
              </WhiteTextTypography>
            </Badge>
          </IconButton>
          

          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            {/* <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge> */}
            <Link to={`/searchyear`}>
              <WhiteTextTypography variant="subtitle1" noWrap component="div">
                History Event
              </WhiteTextTypography>
            </Link>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
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
  );
}
