import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { registerStudentAction } from "../../../redux/actions/registerStudentAction";
import { connect } from "react-redux";
import { setAlert } from "../../../redux/actions/alertAction";

const useStyles = () => ({
  inputfield: {
    display: 'block',
    margin: 'var(--spacing-6)',
    width: '100%'
  },
  btn: {
    margin: 'var(--spacing-6)',
    width: '100%',
    padding: 'var(--spacing-4) var(--spacing-8)',
    fontSize: 'var(--font-size-lg)',
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: 'var(--radius-lg)',
    background: 'linear-gradient(135deg, var(--secondary-color), var(--primary-color))',
    color: 'var(--white)',
    boxShadow: 'var(--shadow-md)',
    transition: 'all var(--transition-normal)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      background: 'linear-gradient(135deg, #059669, var(--primary-dark))',
      transform: 'translateY(-2px)',
      boxShadow: 'var(--shadow-lg)'
    }
  },
  formClass: {
    margin: 'var(--spacing-6)',
    display: 'inline-block',
    textAlign: 'center',
    border: '1px solid var(--gray-200)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--spacing-8)',
    background: 'var(--white)',
    boxShadow: 'var(--shadow-lg)',
    position: 'relative',
    overflow: 'hidden',
    maxWidth: '500px',
    width: '100%'
  },
  formClassBefore: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, var(--secondary-color), var(--primary-color))'
  },
  formTitle: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: 700,
    color: 'var(--gray-900)',
    marginBottom: 'var(--spacing-8)',
    position: 'relative'
  },
  formTitleAfter: {
    content: '""',
    position: 'absolute',
    bottom: '-var(--spacing-4)',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, var(--secondary-color), var(--primary-color))',
    borderRadius: '2px'
  },
  // Material-UI TextField Overrides
  textFieldRoot: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 'var(--radius-lg)',
      background: 'var(--gray-50)',
      transition: 'all var(--transition-normal)',
      '&:hover': {
        background: 'var(--white)',
        boxShadow: 'var(--shadow-sm)'
      },
      '&.Mui-focused': {
        background: 'var(--white)',
        boxShadow: '0 0 0 3px rgb(16 185 129 / 0.1)'
      }
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--gray-300)',
      borderWidth: '2px',
      transition: 'all var(--transition-normal)'
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--gray-400)'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--secondary-color)',
      borderWidth: '2px'
    },
    '& .MuiInputLabel-root': {
      color: 'var(--gray-600)',
      fontWeight: 500,
      fontSize: 'var(--font-size-sm)'
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'var(--secondary-color)',
      fontWeight: 600
    },
    '& .MuiInputBase-input': {
      fontSize: 'var(--font-size-base)',
      color: 'var(--gray-900)',
      padding: 'var(--spacing-4)'
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'var(--gray-400)',
      opacity: 1
    }
  }
})

class StudentRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  }

  usernameInputHandler = (event) => {
    this.setState({
      ...this.state,
      username: event.target.value
    });
  }

  emailInputHandler = (event) => {
    this.setState({
      ...this.state,
      email: event.target.value
    });
  }

  passwordInputHandler = (event) => {
    this.setState({
      ...this.state,
      password: event.target.value
    });
  }

  confirmpasswordInputHandler = (event) => {
    this.setState({
      ...this.state,
      confirmPassword: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.confirmPassword !== this.state.password) {
      this.props.setAlert({
        isAlert: false,
        type: "error",
        title: 'Invalid Input',
        message: 'Confirm Password does not match',
      })
      return;
    }
    this.props.registerStudentAction({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    return (
      <form className={this.props.classes.formClass} onSubmit={(event) => (this.handleSubmit(event))}>
        <div className={this.props.classes.formTitle} color="primary">Student Registration</div>
        <TextField
          variant='outlined'
          color="primary"
          className={`${this.props.classes.inputfield} ${this.props.classes.textFieldRoot}`}
          label="Username"
          placeholder='Enter your username'
          type='text'
          error_text=''
          value={this.state.username}
          onChange={(event) => (this.usernameInputHandler(event))}
          required
        />
        <TextField
          variant='outlined'
          color="primary"
          className={`${this.props.classes.inputfield} ${this.props.classes.textFieldRoot}`}
          label="Email"
          placeholder='Enter your email address'
          type='email'
          error_text=''
          value={this.state.email}
          onChange={(event) => (this.emailInputHandler(event))}
          required
        />
        <TextField
          variant='outlined'
          color="primary"
          label="Password"
          className={`${this.props.classes.inputfield} ${this.props.classes.textFieldRoot}`}
          placeholder='Create a strong password'
          type='password'
          error_text=''
          value={this.state.password}
          onChange={(event) => (this.passwordInputHandler(event))}
          required
        />
        <TextField
          variant='outlined'
          color="primary"
          label="Confirm Password"
          className={`${this.props.classes.inputfield} ${this.props.classes.textFieldRoot}`}
          placeholder='Confirm your password'
          type='password'
          error_text=''
          value={this.state.confirmPassword}
          onChange={(event) => (this.confirmpasswordInputHandler(event))}
          required
        />
        <Button
          variant='contained'
          color="primary"
          type='submit'
          className={this.props.classes.btn}
        >
          Create Account
        </Button>
      </form>
    )
  }
}

const mapStatetoProps = state => ({

})

export default withStyles(useStyles)(connect(mapStatetoProps, {
  registerStudentAction,
  setAlert
})(StudentRegisterForm));