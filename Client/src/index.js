import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Home from "./components/Home";
import About from "./components/about/About";
import Zahra from "./components/about/Zahra";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { HeaderProvider } from "./components/HeaderContext";
import User from "./components/User";
import UserList from "./components/admin/UserList";
import ProductList from "./components/admin/ProductList";
import AdminPanel from "./components/admin/AdminPanel";
import ReactGA from "react-ga";
import GA from "./utils/GoogleAnalytics";
import "./css/index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import NotFound from "./components/NotFound";
import UserInfo from "./components/UserInfo";
import Error5oo from "./components/Error500";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Purchase from "./components/Purchase";

const Contents = (
  <Provider store={store}>
    <Router>
      {GA.init() && <GA.RouteTracker />}
      <div id="wrap">
        <HeaderProvider>
          <div id="content" style={{ paddingBottom: "100px" }}>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/detail" component={ProductDetails} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={SignIn} />
              <Route exact path="/purchase" component={Purchase} />
              <Route path="/signup" component={SignUp} />
              <Route exact path="/about/zahra" component={Zahra} />
              <Route exact path="/user" component={User} />
              <Route exact path="/adminUsers" component={UserList} />
              <Route exact path="/adminProducts" component={ProductList} />
              <Route exact path="/userInfo" component={UserInfo} />
              <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
              <Route path="/error500" component={Error5oo} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </HeaderProvider>
      </div>
    </Router>
  </Provider>
);

function initializeReactGA() {
  ReactGA.initialize("UA-154627567-1");
  ReactGA.pageview("/");
}

ReactDOM.render(Contents, document.getElementById("root"));
