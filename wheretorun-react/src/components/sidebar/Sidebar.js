import "./sidebar.css";
import * as React from "react";
import { Link } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import Toolbar from "@mui/material/Toolbar";

// import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const drawerWidth = 240;

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          overflow: "hidden",
          borderRadius: "12px",
          // boxShadow: 10,
          p: 1,
          mt: 2,
        }}
      >
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
           <Link to={`/edit`}>
            <ListItemButton>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="งานวิ่ง" />
            </ListItemButton>
          </Link>
          
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="ข้อมูลงานวิ่ง" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton> */}
              <Link to={`/eventgroup`}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="กลุ่มของงานวิ่ง" />
            </ListItemButton>
          </Link>
          <Link to={`/createdEvent`}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="งานวิ่ง" />
            </ListItemButton>
          </Link>
          <Link to={`/createdRaceEvent`}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="ประเภทการแข่งขันงานวิ่ง" />
            </ListItemButton>
          </Link>
          <Link to={`/createdCategoryEvent`}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="หมวดหมู่งานวิ่ง" />
            </ListItemButton>
          </Link>
          <Link to={`/createdEnvironmentEvent`}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="สภาพแวดล้อมงานวิ่ง" />
            </ListItemButton>
          </Link>
            </List>
          </Collapse>
        </List>

        <Link to={`/race`}>
            <ListItemButton>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="ประเภทการแข่งขัน" />
            </ListItemButton>
          </Link>
          <Link to={`/category`}>
            <ListItemButton>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="หมวดหมู่งานวิ่ง" />
            </ListItemButton>
          </Link>
          <Link to={`/environment`}>
            <ListItemButton>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="สภาพแวดล้อม" />
            </ListItemButton>
          </Link>
        <Divider />
       
      </Box>
    </Drawer>
  );
}
