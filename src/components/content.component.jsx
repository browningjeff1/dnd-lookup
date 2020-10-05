import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Search from './search.component.jsx';
import Header from './header.component.jsx';
import '../css/content.css';
import '../css/sidebar.css';
import AuthService from "../services/auth.service";

export default withRouter(class Content extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.width = this.width.bind(this)

    this.state = {
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  width() {
    if (window.innerWidth > 600) {
      return true
    } else {
      return false
    }
  }

  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser } = this.state;
    let width = this.width();

    return (
        <main className="content">
          <Header />
          <Search />
          {width && <div className="sidebar">
            <div className="sidebar-container">
            {currentUser ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
                <li><a href="#top">Back to top</a></li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto sidbar-links">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
                <li><a href="#top">Back to top</a></li>
              </ul>
            )}
            </div>
          </div>}
        </main>

    )
  }
})