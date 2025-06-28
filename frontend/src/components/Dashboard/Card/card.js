import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  card_main: {
    background: 'var(--white)',
    display: 'inline-block',
    padding: 'var(--spacing-8)',
    margin: 'var(--spacing-6)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--gray-200)',
    transition: 'all var(--transition-normal)',
    minWidth: '280px',
    position: 'relative',
    overflow: 'hidden'
  },
  card_main_hover: {
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: 'var(--shadow-xl)',
      borderColor: 'var(--primary-color)'
    }
  },
  card_header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--spacing-6)'
  },
  name: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: '600',
    color: 'var(--gray-900)',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-3)'
  },
  card_icon: {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'var(--font-size-xl)',
    background: 'linear-gradient(135deg, var(--primary-color), var(--primary-light))',
    color: 'var(--white)',
    boxShadow: 'var(--shadow-md)'
  },
  stats_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--spacing-6)'
  },
  stats_numbers: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-2)'
  },
  current_value: {
    fontSize: 'var(--font-size-4xl)',
    fontWeight: '700',
    color: 'var(--primary-color)',
    lineHeight: '1'
  },
  total_value: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: '500',
    color: 'var(--gray-600)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-1)'
  },
  total_label: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--gray-500)'
  },
  img: {
    width: '80px',
    height: '80px',
    borderRadius: 'var(--radius-lg)',
    objectFit: 'cover',
    boxShadow: 'var(--shadow-md)',
    border: '3px solid var(--gray-100)'
  },
  progress_bar: {
    width: '100%',
    height: '6px',
    background: 'var(--gray-200)',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    marginTop: 'var(--spacing-4)'
  },
  progress_fill: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))',
    borderRadius: 'var(--radius)',
    transition: 'width var(--transition-slow)'
  },
  card_footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'var(--spacing-4)',
    paddingTop: 'var(--spacing-4)',
    borderTop: '1px solid var(--gray-200)'
  },
  status_badge: {
    padding: 'var(--spacing-1) var(--spacing-3)',
    borderRadius: 'var(--radius)',
    fontSize: 'var(--font-size-xs)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  status_active: {
    background: 'rgba(16, 185, 129, 0.1)',
    color: 'var(--success)'
  },
  status_inactive: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: 'var(--error)'
  },
  trend_indicator: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-1)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: '500'
  },
  trend_up: {
    color: 'var(--success)'
  },
  trend_down: {
    color: 'var(--error)'
  }
})

export const MainCard = (props) => {
  const classes = useStyles();
  const progressPercentage = props.total > 0 ? (props.value / props.total) * 100 : 0;
  const isActive = props.value > 0;
  
  return (
    <div className={`${classes.card_main} ${classes.card_main_hover} fade-in`}>
      <div className={classes.card_header}>
        <h3 className={classes.name}>
          <span className={classes.card_icon}>
            {props.title === 'Teacher' ? '👨‍🏫' : props.title === 'Student' ? '👨‍🎓' : '📚'}
          </span>
          {props.title}
        </h3>
      </div>
      
      <div className={classes.stats_container}>
        <div className={classes.stats_numbers}>
          <div className={classes.current_value}>{props.value}</div>
          <div className={classes.total_value}>
            <span className={classes.total_label}>of</span>
            {props.total}
          </div>
        </div>
        <img src={props.image} className={classes.img} alt={props.title} />
      </div>
      
      <div className={classes.progress_bar}>
        <div 
          className={classes.progress_fill} 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className={classes.card_footer}>
        <span className={`${classes.status_badge} ${isActive ? classes.status_active : classes.status_inactive}`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
        <div className={`${classes.trend_indicator} ${isActive ? classes.trend_up : classes.trend_down}`}>
          <span>{isActive ? '↗' : '↘'}</span>
          {isActive ? 'Growing' : 'Declining'}
        </div>
      </div>
    </div>
  )
}