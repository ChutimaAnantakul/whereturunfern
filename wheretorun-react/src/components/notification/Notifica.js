import * as React from 'react';
import { useQuery } from "@apollo/client";
import { styled, useTheme } from '@mui/material/styles';
import { loader } from "graphql.macro";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import SendIcon from "@mui/icons-material/Send";
const NotificationQueries = loader("../../graphql/queries/notification.gql");

const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginRight: -drawerWidth,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginRight: 0,
//     }),
//   }),
// );

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

function Notifica() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  const noti = data.requestapprovals.totalCount;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" 
      // open={open}
      >
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Where to Run
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
              <Badge badgeContent={noti} color="error">
            <MailIcon />
            </Badge>
          </IconButton>



          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
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
            // aria-controls={menuId}
            aria-haspopup="true"
            // onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
     
      <Drawer
        sx={{
          // width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            <h6><b>Events {data.requestapprovals.totalCount} ??????????????????</b></h6>
          </IconButton>
        </DrawerHeader>
        <Divider />
        {data.requestapprovals.nodes.map((requestapprovals) => (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Events
              </ListSubheader>
            }
          >
            <ListItemText >
            &nbsp; &nbsp;?????????????????????: &nbsp;
              <b>{requestapprovals.event.eventnameTh}</b><br />
              &nbsp; &nbsp;????????????????????????????????????????????????????????????
            </ListItemText>

            <Link to={`/editEventOrg/${requestapprovals.event.id}`}>
              <ListItemButton>
                <ListItemIcon>
                  <SendIcon />
                  &nbsp; <b>Edit</b>
                </ListItemIcon>
                {/* <ListItemText primary="Edit" /> */}
              </ListItemButton>
            </Link>
            <Divider />
          </List>
        ))}
        
      </Drawer>
    </Box>
  );
}

export default Notifica;
