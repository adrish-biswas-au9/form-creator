import React from 'react'
import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignupComponent';
import {Route} from 'react-router-dom';
import Home from './container/Home';
import ProfilePage from './container/ProfilePage';
import Forms from './container/Forms';
import FormsRendering from './container/FormRendering';
import Responses from './container/Responses';
import ResponseRendering from './container/ResponseRendering';
import FormSubmitted from './container/FormSubmitted';
import {BrowserRouter} from 'react-router-dom';
import Footer from './components/Footer';

// import Movie from './container/Movie';
// import Character from './container/Character';
// import Location from './container/Location';
// import Vehicle from './container/Vehicle';
// import MyGhibliUniverse from './container/MyGhibliUniverse';
// import SideBar from './components/SideBar';
// import Shopping from './container/Shopping'

// import Bluray from './container/Bluray';
// import Dvd from './container/Dvd';
// import Accessories from './container/Accessories';
// import Poster from './container/Poster';
// import Tshirt from './container/Tshirts';
// import Videogames from './container/Videogames';
// import AllMovie from './container/AllMovie';
// import AllCharacter from './container/AllCharacter';
// import AllLocation from './container/AllLocation';
// import Community from './container/Community'

// import ForgotPassword from './container/ForgotPassword'

// import Admin from './container/Admin'
// import MyPlan from './container/MyPlan';
// import User from './container/User';


const Routing = () => {
    return (
        <BrowserRouter>
          <Route exact path='/' component={SignupComponent} />
          <Route path='/logincomponent' component={LoginComponent}/>
          <Route path="/home" component={Home}/>
          <Route path="/profilePage" component={ProfilePage}/>
          <Route path="/forms" component={Forms}/>
          <Route path="/formsRendered/:id" component={FormsRendering}/>
          <Route path="/responses" component={Responses}/>
          <Route path="/responseRendered/:id" component={ResponseRendering}/>
          <Route path='/formsubmitted' component={FormSubmitted}/>
          {/* <Route path="/films/:id" component={Movie}/>
          <Route path="/characters/:id" component={Character}/>
          <Route path="/locations/:id" component={Location}/>
          <Route path="/vehicles/:id" component={Vehicle}/>
          <Route path="/bluray/:id" component={Bluray}/>
          <Route path="/dvd/:id" component={Dvd}/>
          <Route path="/poster/:id" component={Poster}/>
          <Route path="/tshirt/:id" component={Tshirt}/>
          <Route path="/accessories/:id" component={Accessories}/>
          <Route path="/videogames/:id" component={Videogames}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/movies" component={AllMovie}/>
          <Route path="/allcharacters" component={AllCharacter}/>
          <Route path="/alllocations" component={AllLocation}/>
          <Route path="/myplan" component={MyPlan}/>
          <Route path="/community" component={Community}/>
          <Route path="/user/:id" component={User}/>
          <Route path="/forgotpassword" component={ForgotPassword}/> */}
          
          <Footer />
        </BrowserRouter>
    );
  }

export default Routing;
