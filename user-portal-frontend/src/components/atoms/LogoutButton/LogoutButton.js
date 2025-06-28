import { Button, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../../redux/actions/loginAction";

const useStyles = () => ({
  logoutButton: {
    background: 'var(--error)',
    color: 'var(--white)',
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-3) var(--spacing-6)',
    boxShadow: 'var(--shadow-md)',
    transition: 'all var(--transition-normal)',
    width: '100%',
    marginTop: 'var(--spacing-4)',
    '&:hover': {
      background: '#dc2626',
      transform: 'translateY(-2px)',
      boxShadow: 'var(--shadow-lg)'
    }
  }
})

class LogoutButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Button
        variant='contained'
        className={this.props.classes.logoutButton}
        onClick={() => (this.props.logoutUser())}
      >
        Logout
      </Button>
    )
  }
}

const mapStatetoProps = state => ({
  user: state.user
})

export default withStyles(useStyles)(connect(mapStatetoProps, {
  logoutUser
})(LogoutButton))