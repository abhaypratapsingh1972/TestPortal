import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { connect } from 'react-redux';
import { clearAlert } from '../../../redux/actions/alertAction';
import { withStyles } from '@material-ui/core/styles';

const useStyles = () => ({
  alert: {
    marginBottom: 'var(--spacing-6)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    border: 'none',
    '& .MuiAlert-icon': {
      fontSize: 'var(--font-size-xl)'
    },
    '& .MuiAlert-message': {
      fontSize: 'var(--font-size-base)',
      fontWeight: 500
    },
    '& .MuiAlertTitle-root': {
      fontSize: 'var(--font-size-lg)',
      fontWeight: 600,
      marginBottom: 'var(--spacing-2)'
    },
    '&.MuiAlert-standardSuccess': {
      background: 'rgba(16, 185, 129, 0.1)',
      color: 'var(--success)',
      border: '1px solid rgba(16, 185, 129, 0.2)'
    },
    '&.MuiAlert-standardError': {
      background: 'rgba(239, 68, 68, 0.1)',
      color: 'var(--error)',
      border: '1px solid rgba(239, 68, 68, 0.2)'
    },
    '&.MuiAlert-standardWarning': {
      background: 'rgba(245, 158, 11, 0.1)',
      color: 'var(--warning)',
      border: '1px solid rgba(245, 158, 11, 0.2)'
    },
    '&.MuiAlert-standardInfo': {
      background: 'rgba(59, 130, 246, 0.1)',
      color: 'var(--info)',
      border: '1px solid rgba(59, 130, 246, 0.2)'
    }
  }
})

class AlertBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    if (this.props.alertDetails.isAlert) {
      return (
        <Alert 
          severity={this.props.alertDetails.type} 
          onClose={this.props.clearAlert}
          className={this.props.classes.alert}
        >
          <AlertTitle>{this.props.alertDetails.title}</AlertTitle>
          {this.props.alertDetails.message}
        </Alert>
      )
    }
    else {
      return (<div></div>)
    }
  }
}

const mapStatetoProps = state => ({
  alertDetails: state.alertDetails
})

export default withStyles(useStyles)(connect(mapStatetoProps, {
  clearAlert
})(AlertBox));