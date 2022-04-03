import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Historydate from "./pages/Historydate";
// import CreateEventRaceEvm from "./pages/CreateEventRaceEvm";
import People from "./pages/People";

// import Home from "./pages/Home";
// import Event_edit from "./pages/Event_edit";
// import Edit from "./pages/Edit";
import Searchyear from "./pages/Searchyear";
// import Navbar from "./pages/layout/Navbar";
import Footer from "./pages/layout/Footer";

//Nawpage
import NewHome from "./pages/NewHome";
import NewEventdetail from "./pages/NewEventdetail";
import SearchCategoryEvent from "./pages/SearchCategoryEvent";
import SearchEventGroup from "./pages/SearchEventGroup";
// admin
import CreatedEvent from "./pages/Admin/Event/CreatedEvent";
import EditEvent from "./pages/Admin/Event/EditEvent";
import EditEventORG from "./pages/Admin/Event/EditEventOrg";
import EditEventHome from "./pages/Admin/Event/EditEventHome";
//categoryevent
import CreatedCategoryEvent from "./pages/Admin/CategoryEvent/CreatedCategoryEvent";
import EditCategoryEvent from "./pages/Admin/CategoryEvent/EditCategoryEvent";
import DeletedCategoryEvent from "./pages/Admin/CategoryEvent/DeletedCategoryEvent";
//environmenrevent
import CreatedEnvironmentEvent from "./pages/Admin/EnvironmentEvent/CreatedEnvironmentEvent";
import EditEnvironmentEvent from "./pages/Admin/EnvironmentEvent/EditEnvironmentEvent";
import DeletedEnvironmentEvent from "./pages/Admin/EnvironmentEvent/DeletedEnvironmentEvent";
//racetyprevent
import CreatedRaceEvent from "./pages/Admin/RacetypeEvent/CreatedRaceEvent";
import EditRaceEvent from "./pages/Admin/RacetypeEvent/EditRaceEvent";
import DeletedRaceEvent from "./pages/Admin/RacetypeEvent/DeletedRaceEvent";
//eventgroup
import EventGroup from "./pages/Admin/EventGroup/EventGroup";
import EditEventGroup from "./pages/Admin/EventGroup/EditEventGroup";
import DeletedEventGroup from "./pages/Admin/EventGroup/DeletedEventGroup";
//category
import Category from "./pages/Admin/Category/Category";
import EditCategory from "./pages/Admin/Category/EditCategory";
import DeletedCategory from "./pages/Admin/Category/DeletedCategory";
//environment
import Environment from "./pages/Admin/Environment/Environment";
import EditEnvironment from "./pages/Admin/Environment/EditEnvironment";
import DeletedEnvironment from "./pages/Admin/Environment/DeletedEnvironment";
//race
import Race from "./pages/Admin/Race/Race";
import EditRace from "./pages/Admin/Race/EditRace";
import DeletedRace from "./pages/Admin/Race/DeletedRace";
// year
import Year from "./pages/Admin/Year/Year";
import EditYear from "./pages/Admin/Year/EditYear";
import DeletedYear from "./pages/Admin/Year/DeletedYear";

// requestapproval
import Approvals from "./pages/Admin/Approval/Approvals";
import PassApprovals from "./pages/Admin/Approval/PassApprovals";
import AllApprovals from "./pages/Admin/Approval/AllApprovals";
import Request from "./pages/Request";

// profile
import Profile from "./pages/Profile";
import ProfileAdmin from "./pages/ProfileAdmin";

// ranking
import TypeOfRank from "./pages/TypeOfRank";
import TypeOfRankTwo from "./pages/TypeOfRankTwo";
import AllRanking from "./pages/AllRanking";

// calendar
import Calender from "./pages/Calender";

// test
import Upload from "./pages/Upload";
import UploadRequest from "./pages/UploadRequest";
// import ContactUs from "./pages/contactForm";
import sendEmail from "./pages/EmailForm";
// import Language from "./pages/Language";
// import ApprovalUpload from "./pages/ApprovalUpload";
// import EditOrg from "./pages/EditOrg";




import theme from "./Styles/createtheme"
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import EmailForm from "./pages/EmailForm";

const apolloClient = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        {/* <Navbar /> */}
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/historydate" component={Historydate} />
          <Route path="/searchyear" component={Searchyear} />
          <Route path="/people" component={People} />
          <Route path="/searchCategoryEvent" component={SearchCategoryEvent} />
          <Route path="/searchEventGroup" component={SearchEventGroup} />
          {/* profile */}
          <Route path="/profile/:id" component={Profile} />
          <Route path="/profileadmin/:id" component={ProfileAdmin} />
           {/* event */}
          <Route path="/createdEvent" component={CreatedEvent} />
          <Route path="/editEvent/:id" component={EditEvent} />
          <Route path="/editEventOrg/:id" component={EditEventORG} />
          {/* categoryevent */}
          <Route path="/createdCategoryEvent" component={CreatedCategoryEvent} />
          <Route path="/editcategoryevent/:id" component={EditCategoryEvent} />
          <Route path="/delCategoryEvent/:id" component={DeletedCategoryEvent} />
          {/* environmentevent */}
          <Route path="/createdEnvironmentEvent" component={CreatedEnvironmentEvent} />
          <Route path="/editEnvironmentEvent/:id" component={EditEnvironmentEvent} />
          <Route path="/delEnvironmentEvent/:id" component={DeletedEnvironmentEvent} />
          {/* raceevent */}
          <Route path="/createdRaceEvent" component={CreatedRaceEvent} />
          <Route path="/editRaceEvent/:id" component={EditRaceEvent} />
          <Route path="/delRaceEvent/:id" component={DeletedRaceEvent} />
          <Route path="/edit" component={EditEventHome} />
          {/* eventgroup */}
          <Route path="/eventgroup" component={EventGroup} />
          <Route path="/editeventgroup/:id" component={EditEventGroup} />
          <Route path="/deleventgroup/:id" component={DeletedEventGroup} />
          {/* category */}
          <Route path="/category" component={Category} />
          <Route path="/editcategory/:id" component={EditCategory} />
          <Route path="/delcategory/:id" component={DeletedCategory} />
          {/* environment */}
          <Route path="/environment" component={Environment} />
          <Route path="/editenvironment/:id" component={EditEnvironment} />
          <Route path="/delenvironment/:id" component={DeletedEnvironment} />
          {/* race */}
          <Route path="/race" component={Race} />
          <Route path="/editrace/:id" component={EditRace} />
          <Route path="/delrace/:id" component={DeletedRace} />
          {/* yaer */}
          <Route path="/year" component={Year} />
          <Route path="/edityear/:id" component={EditYear} />
          <Route path="/delyear/:id" component={DeletedYear} />

          {/* approval */}
          <Route path="/allapproval" component={AllApprovals} />
          <Route path="/approval/:id" component={Approvals} />
          <Route path="/passapproval" component={PassApprovals} />
          <Route path="/request" component={Request} />

          {/* ranking */}
          <Route path="/typeofrank/:id" component={TypeOfRank} />
          <Route path="/typeofranktwo/:id" component={TypeOfRankTwo} />
          <Route path="/allranking/:id" component={AllRanking} />

          {/* calendar */}
          <Route path="/calendar" component={Calender} />

          {/* test */}
          <Route path="/up" component={Upload} />
          <Route path="/uprequest" component={UploadRequest} />
          {/* <Route path="/con" component={ContactUs} /> */}
          <Route path="/send" component={EmailForm} />
          {/* <Route path="/lan" component={Language} /> */}
          {/* <Route path="/testallap" component={ApprovalUpload} /> */}
          {/* <Route path="/org/:id" component={EditOrg} /> */}

          <Route exact path="/" component={NewHome} />
          <Route path="/event/:id" component={NewEventdetail} />
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

