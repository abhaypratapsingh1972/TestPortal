import { Button, withStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AlertBox from '../../atoms/Alertbox/AlertBox';
import LoginForm from '../../templates/loginForm/loginForm';
import Auth from '../../../helper/Auth';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = (theme) => ({
  addHeight: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    fontWeight: 600,
    color: 'var(--gray-900)'
  },
  main: {
    textAlign: 'center',
    paddingTop: '5%',
    margin: 'auto',
    minHeight: 'calc(100vh - 70px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 50%, var(--secondary-color) 100%)',
    position: 'relative',
    overflow: 'hidden'
  },
  mainBefore: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 100 100\\"><defs><pattern id=\\"grain\\" width=\\"100\\" height=\\"100\\" patternUnits=\\"userSpaceOnUse\\"><circle cx=\\"25\\" cy=\\"25\\" r=\\"1\\" fill=\\"white\\" opacity=\\"0.1\\"/><circle cx=\\"75\\" cy=\\"75\\" r=\\"1\\" fill=\\"white\\" opacity=\\"0.1\\"/><circle cx=\\"50\\" cy=\\"10\\" r=\\"0.5\\" fill=\\"white\\" opacity=\\"0.1\\"/><circle cx=\\"10\\" cy=\\"60\\" r=\\"0.5\\" fill=\\"white\\" opacity=\\"0.1\\"/><circle cx=\\"90\\" cy=\\"40\\" r=\\"0.5\\" fill=\\"white\\" opacity=\\"0.1\\"/></pattern></defs><rect width=\\"100\\" height=\\"100\\" fill=\\"url(%23grain)\\"/></svg>")',
    pointerEvents: 'none'
  },
  mainAfter: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)',
    pointerEvents: 'none'
  },
  endtestbtn: {
    background: 'var(--secondary-color)',
    color: 'var(--white)',
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-3) var(--spacing-6)',
    boxShadow: 'var(--shadow-md)',
    transition: 'all var(--transition-normal)',
    '&:hover': {
      background: '#059669',
      transform: 'translateY(-2px)',
      boxShadow: 'var(--shadow-lg)'
    }
  },
  appbar: {
    background: 'var(--white)',
    color: 'var(--gray-900)',
    boxShadow: 'var(--shadow-sm)',
    borderBottom: '1px solid var(--gray-200)'
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'var(--spacing-4)'
  }
})

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotoStudentRegister: false
    }
  }

  onStudentRegisterClick() {
    this.setState({
      ...this.state,
      gotoStudentRegister: true
    })
  }

  render() {
    if (this.state.gotoStudentRegister) {
      return (<Navigate to='/studentRegisterPage' />)
    }
    if (this.props.user.isLoggedIn) {
      if (this.props.user.userDetails.type === 'TEACHER')
        return (<Navigate to='/homeTeacher' />);
      else
        return (<Navigate to='/homeStudent' />);
    } else if (Auth.retriveToken() && Auth.retriveToken() !== 'undefined') {
      return (<Navigate to='/homeStudent' />);
    }
    else {
      return (
        <div>
          <AppBar
            elevation={0}
            className={this.props.classes.appbar}
          >
            <Toolbar>
              <Typography variant='h5' className={this.props.classes.title}>
                Exam Portal Login
              </Typography>
              <Typography variant='h6'>
                <Button 
                  variant="contained" 
                  className={this.props.classes.endtestbtn} 
                  onClick={() => (this.onStudentRegisterClick())}
                >
                  Student Register
                </Button>
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={this.props.classes.addHeight}></div>
          <div className={this.props.classes.main}>
            <div className={this.props.classes.contentWrapper}>
              <AlertBox />
              <LoginForm />
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStatetoProps = state => ({
  user: state.user
});

export default withStyles(useStyles)(connect(mapStatetoProps, {})(LoginPage));