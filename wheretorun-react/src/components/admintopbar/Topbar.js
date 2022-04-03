import React from "react";
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
const NotificationQueries = loader("../../graphql/queries/approvaluploads.gql");

export default function Topbar(match) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

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
          {/* <Link to={`/createdEvent`}> */}
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            {/* <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge> */}
            <Link to={`/createdEvent`}>
              {/* <Typography variant="subtitle1" noWrap component="div">
              Manage Event
            </Typography> */}
              <WhiteTextTypography variant="subtitle1" noWrap component="div">
                Manage Event
              </WhiteTextTypography>
            </Link>
          </IconButton>
          {/* </Link> */}

          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Link to={`/allapproval`}>
            <Badge badgeContent={noti} color="error">
            <WhiteTextTypography>
              <NotificationsIcon />
            </WhiteTextTypography>
            </Badge></Link>&nbsp;
            <Link to={`/allapproval`}>
              <WhiteTextTypography variant="subtitle1" noWrap component="div">
              Approval
              </WhiteTextTypography>
            </Link>
          </IconButton>

          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            {/* <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge> */}
            <Link to={`/passapproval`}>
              <WhiteTextTypography variant="subtitle1" noWrap component="div">
              Pass Approval
              </WhiteTextTypography>
            </Link>
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
