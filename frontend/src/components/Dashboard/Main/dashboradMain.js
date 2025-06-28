import { withStyles} from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logoutUser, getAdminDetails } from "../../../redux/actions/loginAction";
import { getDashboardCount } from "../../../redux/actions/dashboardDetails";
import Auth from "../../../services/Auth";
import { HomepageHeader } from "../../basic/header/header";
import logoImg from '../../basic/Homepage/main.jpg'
import { MainCard } from "../Card/card";
import TeacherImg from '../teacher.png';
import StudentImg from '../student.jfif';
import SubjectImg from '../subject.jfif';
import TeacherTable from "../teacherTable/teacherTable";
import SubjectTable from "../subjectTable/subjectTable";
import StudentTable from "../studentTable/studentTable";

const useStyles = (theme)=>({
  dashboard_container: {
    minHeight: '100vh',
    background: 'var(--gray-50)',
    paddingTop: '80px' // Account for fixed header
  },
  dashboard_content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'var(--spacing-8)'
  },
  dashboard_header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--spacing-8)',
    flexWrap: 'wrap',
    gap: 'var(--spacing-4)'
  },
  dashboard_title: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: '700',
    color: 'var(--gray-900)',
    margin: '0'
  },
  dashboard_subtitle: {
    fontSize: 'var(--font-size-lg)',
    color: 'var(--gray-600)',
    margin: 'var(--spacing-2) 0 0 0'
  },
  logout_btn: {
    padding: 'var(--spacing-3) var(--spacing-6)',
    background: 'var(--error)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-normal)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-2)'
  },
  logout_btn_hover: {
    '&:hover': {
      background: '#dc2626',
      transform: 'translateY(-2px)',
      boxShadow: 'var(--shadow-md)'
    }
  },
  cards_section: {
    marginBottom: 'var(--spacing-12)'
  },
  cards_grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--spacing-6)',
    marginBottom: 'var(--spacing-8)'
  },
  card_actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-4)',
    marginTop: 'var(--spacing-4)',
    flexWrap: 'wrap'
  },
  action_button: {
    padding: 'var(--spacing-2) var(--spacing-4)',
    background: 'var(--primary-color)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: 'var(--radius)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all var(--transition-normal)',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-2)'
  },
  action_button_hover: {
    '&:hover': {
      background: 'var(--primary-dark)',
      transform: 'translateY(-1px)',
      boxShadow: 'var(--shadow-md)'
    }
  },
  action_button_secondary: {
    background: 'var(--gray-100)',
    color: 'var(--gray-700)',
    border: '1px solid var(--gray-300)'
  },
  action_button_secondary_hover: {
    '&:hover': {
      background: 'var(--gray-200)',
      color: 'var(--gray-900)',
      borderColor: 'var(--gray-400)'
    }
  },
  table_section: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--gray-200)',
    overflow: 'hidden'
  },
  table_header: {
    padding: 'var(--spacing-6)',
    borderBottom: '1px solid var(--gray-200)',
    background: 'var(--gray-50)'
  },
  table_title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: '600',
    color: 'var(--gray-900)',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-3)'
  },
  stats_summary: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'var(--spacing-6)',
    marginBottom: 'var(--spacing-8)'
  },
  stat_item: {
    background: 'var(--white)',
    padding: 'var(--spacing-6)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--gray-200)',
    textAlign: 'center'
  },
  stat_value: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: '700',
    color: 'var(--primary-color)',
    marginBottom: 'var(--spacing-2)'
  },
  stat_label: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--gray-600)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '500'
  }
})

class DashboardMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.expand = "none"
  }

  logout(obj) {
    obj.props.logoutUser();
    obj.forceUpdate();
  }

  handleTableExapand(type) {
    console.log("handle table")
    if(type === this.expand) {
      this.expand = "none"
    } else {
      this.expand = type
    }
    this.forceUpdate();
  }

  render(){
    console.log(this.props.user);
    if(!Auth.retriveToken() || Auth.retriveToken()==='undefined'){
      return (<Navigate to='/'/>);
    } else if(!this.props.user.isLoggedIn) {
      this.props.getAdminDetails();
      return (<div></div>);
    } else {
      if(!this.props.dashboardDetails.retrived){
        this.props.getDashboardCount();
      }
      let x;
      if(this.expand === "Teacher") {
        x = <TeacherTable/>;
      } else if (this.expand === "Student") {
        x = <StudentTable/>;
      } else if (this.expand === "Subject") {
        x = <SubjectTable/>;
      }
        return (
          <div className={this.props.classes.dashboard_container}>
            <HomepageHeader title='Exam Portal' img={logoImg}/>
            <div className={this.props.classes.dashboard_content}>
              <div className={this.props.classes.dashboard_header}>
                <div>
                  <h1 className={this.props.classes.dashboard_title}>Admin Dashboard</h1>
                  <p className={this.props.classes.dashboard_subtitle}>
                    Manage your exam portal efficiently
                  </p>
                </div>
                <button 
                  onClick={()=>(this.logout(this))} 
                  className={`${this.props.classes.logout_btn} ${this.props.classes.logout_btn_hover}`}
                >
                  <span>🚪</span>
                  Logout
                </button>
              </div>

              <div className={this.props.classes.stats_summary}>
                <div className={this.props.classes.stat_item}>
                  <div className={this.props.classes.stat_value}>
                    {this.props.dashboardDetails.teacherActive + this.props.dashboardDetails.teacherBlocked}
                  </div>
                  <div className={this.props.classes.stat_label}>Total Teachers</div>
                </div>
                <div className={this.props.classes.stat_item}>
                  <div className={this.props.classes.stat_value}>
                    {this.props.dashboardDetails.studentActive + this.props.dashboardDetails.studentBlocked}
                  </div>
                  <div className={this.props.classes.stat_label}>Total Students</div>
                </div>
                <div className={this.props.classes.stat_item}>
                  <div className={this.props.classes.stat_value}>
                    {this.props.dashboardDetails.subjectActive + this.props.dashboardDetails.subjectBlocked}
                  </div>
                  <div className={this.props.classes.stat_label}>Total Subjects</div>
                </div>
              </div>

              <div className={this.props.classes.cards_section}>
                <div className={this.props.classes.cards_grid}>
                  <div>
                    <MainCard 
                      title='Teacher' 
                      value={this.props.dashboardDetails.teacherActive} 
                      total={this.props.dashboardDetails.teacherActive + this.props.dashboardDetails.teacherBlocked}  
                      image={TeacherImg} 
                    />
                    <div className={this.props.classes.card_actions}>
                      <Link to="/addTeacher" className={`${this.props.classes.action_button} ${this.props.classes.action_button_hover}`}>
                        <span>➕</span>
                        Add Teacher
                      </Link>
                      <button 
                        onClick={()=>(this.handleTableExapand("Teacher"))}
                        className={`${this.props.classes.action_button} ${this.props.classes.action_button_secondary} ${this.props.classes.action_button_secondary_hover}`}
                      >
                        <span>👁️</span>
                        View All
                      </button>
                    </div>
                  </div>

                  <div>
                    <MainCard 
                      title='Student' 
                      value={this.props.dashboardDetails.studentActive} 
                      total={this.props.dashboardDetails.studentActive + this.props.dashboardDetails.studentBlocked} 
                      image={StudentImg} 
                    />
                    <div className={this.props.classes.card_actions}>
                      <button 
                        onClick={()=>(this.handleTableExapand("Student"))}
                        className={`${this.props.classes.action_button} ${this.props.classes.action_button_secondary} ${this.props.classes.action_button_secondary_hover}`}
                      >
                        <span>👁️</span>
                        View All
                      </button>
                    </div>
                  </div>

                  <div>
                    <MainCard 
                      title='Subject' 
                      value={this.props.dashboardDetails.subjectActive} 
                      total={this.props.dashboardDetails.subjectActive + this.props.dashboardDetails.subjectBlocked} 
                      image={SubjectImg} 
                    />
                    <div className={this.props.classes.card_actions}>
                      <Link to="/addSubject" className={`${this.props.classes.action_button} ${this.props.classes.action_button_hover}`}>
                        <span>➕</span>
                        Add Subject
                      </Link>
                      <button 
                        onClick={()=>(this.handleTableExapand("Subject"))}
                        className={`${this.props.classes.action_button} ${this.props.classes.action_button_secondary} ${this.props.classes.action_button_secondary_hover}`}
                      >
                        <span>👁️</span>
                        View All
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {x && (
                <div className={this.props.classes.table_section}>
                  <div className={this.props.classes.table_header}>
                    <h2 className={this.props.classes.table_title}>
                      <span>
                        {this.expand === "Teacher" ? "👨‍🏫" : this.expand === "Student" ? "👨‍🎓" : "📚"}
                      </span>
                      {this.expand} Management
                    </h2>
                  </div>
                  {x}
                </div>
              )}
            </div>
          </div>
        );
    }
  }
}

const mapStateToProps = state => ({
  user:state.user,
  dashboardDetails:state.dashboardDetails
});

export default withStyles(useStyles)(connect(mapStateToProps,{
  logoutUser,
  getAdminDetails,
  getDashboardCount,
})(DashboardMain));
