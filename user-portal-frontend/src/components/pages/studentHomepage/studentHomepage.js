import React from "react";
import { connect } from "react-redux";
import LogoutButton from "../../atoms/LogoutButton/LogoutButton";
import Auth from "../../../helper/Auth";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../../../redux/actions/loginAction";
import { Drawer, Typography, withStyles, AppBar, Toolbar, List, ListItem, ListItemText } from "@material-ui/core";
import AlertBox from '../../atoms/Alertbox/AlertBox';
import TestDetailsStudent from "../../templates/TestDetails/TestDetailsStudent";
import UpcomingStudentTestsDetails from "../../templates/TestDetails/UpcomingStudentTestsDetails";
import CompletedTestsDetailsStudent from "../../templates/TestDetails/CompletedTestsDetailsStudent";

const drawerWidth = 280
const appbarHeight = 70

const useStyles = (theme) => ({
  drawer: {
    width: drawerWidth,
    height: `calc(100% - ${appbarHeight}px)`,
    top: appbarHeight,
    background: 'var(--white)',
    borderRight: '1px solid var(--gray-200)'
  },
  drawerPaper: {
    width: drawerWidth,
    height: `calc(100% - ${appbarHeight}px)`,
    top: appbarHeight,
    background: 'var(--white)',
    borderRight: '1px solid var(--gray-200)'
  },
  flex: {
    display: 'flex'
  },
  content: {
    margin: 'auto',
    background: 'var(--gray-50)',
    minHeight: `calc(100vh - ${appbarHeight}px)`,
    padding: 'var(--spacing-8)',
    width: '100%'
  },
  addHeight: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    fontWeight: 600,
    color: 'var(--gray-900)'
  },
  appbar: {
    height: appbarHeight,
    background: 'var(--white)',
    color: 'var(--gray-900)',
    boxShadow: 'var(--shadow-sm)',
    borderBottom: '1px solid var(--gray-200)'
  },
  welcomeText: {
    color: 'var(--gray-600)',
    fontWeight: 500,
    fontSize: 'var(--font-size-lg)'
  },
  drawerList: {
    padding: 'var(--spacing-4)'
  },
  drawerListItem: {
    margin: 'var(--spacing-1) 0',
    borderRadius: 'var(--radius)',
    transition: 'all var(--transition-normal)',
    '&:hover': {
      background: 'var(--gray-50)',
      transform: 'translateX(4px)'
    },
    '&.Mui-selected': {
      background: 'var(--primary-color)',
      color: 'var(--white)',
      '&:hover': {
        background: 'var(--primary-dark)'
      }
    }
  },
  drawerListItemText: {
    '& .MuiListItemText-primary': {
      fontWeight: 500,
      fontSize: 'var(--font-size-sm)'
    }
  },
  welcomeMessage: {
    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
    color: 'var(--white)',
    padding: 'var(--spacing-12)',
    borderRadius: 'var(--radius-xl)',
    textAlign: 'center',
    boxShadow: 'var(--shadow-lg)',
    marginBottom: 'var(--spacing-8)'
  },
  welcomeMessageTitle: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: 700,
    marginBottom: 'var(--spacing-4)'
  },
  welcomeMessageText: {
    fontSize: 'var(--font-size-lg)',
    opacity: 0.9,
    margin: 0
  }
})

class StudentHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: (
        <div className={this.props.classes.welcomeMessage}>
          <h1 className={this.props.classes.welcomeMessageTitle}>Welcome to Exam Portal</h1>
          <p className={this.props.classes.welcomeMessageText}>
            Navigate through the sidebar to access your tests and manage your exam activities.
          </p>
        </div>
      ),
      menuList: [{
        title: 'Home',
        content: (
          <div className={this.props.classes.welcomeMessage}>
            <h1 className={this.props.classes.welcomeMessageTitle}>Welcome to Exam Portal</h1>
            <p className={this.props.classes.welcomeMessageText}>
              Navigate through the sidebar to access your tests and manage your exam activities.
            </p>
          </div>
        )
      }, {
        title: 'View All Tests',
        content: <TestDetailsStudent />
      }, {
        title: 'Upcoming Tests',
        content: <UpcomingStudentTestsDetails />
      }, {
        title: 'Completed Tests',
        content: <CompletedTestsDetailsStudent />
      }]
    }
  }

  onMenuItemClick(content) {
    this.setState({
      ...this.state,
      content: content
    })
  }

  render() {
    if (!Auth.retriveToken() || Auth.retriveToken() === 'undefined') {
      return (<Navigate to='/' />);
    } else if (!this.props.user.isLoggedIn) {
      this.props.getUserDetails();
      return (<div></div>);
    } else if (this.props.user.userDetails.type !== 'STUDENT') {
      return (<Navigate to='/' />);
    }
    return (
      <div>
        <div>
          <AppBar
            elevation={0}
            className={this.props.classes.appbar}
          >
            <Toolbar>
              <Typography variant='h5' className={this.props.classes.title}>
                Student Dashboard
              </Typography>
              <Typography variant='h6' className={this.props.classes.welcomeText}>
                Welcome, {this.props.user.userDetails.username}!
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={this.props.classes.addHeight}></div>
        </div>
        <div className={this.props.classes.flex}>
          <Drawer
            className={this.props.classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{ paper: this.props.classes.drawerPaper }}
          >
            <List className={this.props.classes.drawerList}>
              {this.state.menuList.map((item, index) => (
                <ListItem 
                  button 
                  key={index} 
                  onClick={() => (this.onMenuItemClick(item.content))}
                  className={this.props.classes.drawerListItem}
                >
                  <ListItemText 
                    primary={item.title} 
                    className={this.props.classes.drawerListItemText}
                  />
                </ListItem>
              ))}
              <ListItem className={this.props.classes.drawerListItem}>
                <LogoutButton />
              </ListItem>
            </List>
          </Drawer>
          <div className={this.props.classes.content}>
            <AlertBox></AlertBox>
            {this.state.content}
          </div>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  user: state.user
})

export default withStyles(useStyles)(connect(mapStatetoProps, {
  getUserDetails
})(StudentHomepage));