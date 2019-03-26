import React from 'react';
import { withStyles } from '@material-ui/core';
import { Field, ErrorMessage } from 'formik';
import { TextField } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';

const styles = theme => ({
  paper: {
    display: 'flex', 
    flexDirection: 'column', 
    position: 'relative', 
    padding: 24,
    marginBottom: 24,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  remove: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  datefields: {
    margin: '12px 12px 0px 0px',
    maxWidth: 150
  },
  timeFields: {
    margin: '12px 12px 0px 24px',
    maxWidth: 150
  },
  calendarIcon: {
    marginRight: 4,
    color: '#757575',
    fontSize: 20,
  }
});
export default withStyles(styles)(props => {
  const { classes, index } = props;
  return(
    <div className={classes.row}>
      <DateRangeIcon className={classes.calendarIcon}/>
        <Field
          name={`schedule_data[${index}].start_date`}
          render={({
            field, 
            form,
            ...props
          })=>(
            <TextField
              id={`schedule_data[${index}].start_date`}
              label="Start Date"
              type="date"
              InputLabelProps={{shrink: true}}
              className={classes.datefields}
              FormHelperTextProps={{error: true}}
              helperText={
                <ErrorMessage name={`schedule_data[${index}].start_date`}>{msg=>msg}</ErrorMessage>
              }
              {...field}
            />   
            )
          }
        />          
        <DateRangeIcon className={classes.calendarIcon}/>
          <Field
            name={`schedule_data[${index}].end_date`}
            render={({
              field, 
              form,
              ...props
            })=>(
              <TextField
              id="end_date"
              label="End Date"
              type="date"
              InputLabelProps={{shrink: true}}
              className={classes.datefields}
              FormHelperTextProps={{error: true}}
              helperText={
                <ErrorMessage name={`schedule_data[${index}].end_date`}>{msg=>msg}</ErrorMessage>
              }
              {...field}
              />   
              )
            }
          />
      <Field
        name={`schedule_data[${index}].start_time`}
        render={({
          field, 
          form,
          ...props
        })=>(
          <TextField
            id="start_time"
            label="Start Time"
            type="time"
            InputLabelProps={{shrink: true}}
            className={classes.timeFields}
            FormHelperTextProps={{error: true}}
            helperText={
              <ErrorMessage name={`schedule_data[${index}].start_time`}>{msg=>msg}</ErrorMessage>
            }
            {...field}
          />   
          )
        }
      />
      <Field
        name={`schedule_data[${index}].end_time`}
        render={({
          field, 
          form,
          ...props
        })=>(
          <TextField
            id="end_time"
            label="End Time"
            type="time"
            InputLabelProps={{shrink: true}}
            className={classes.timeFields}
            FormHelperTextProps={{error: true}}
            helperText={
              <ErrorMessage name={`schedule_data[${index}].end_time`}>{msg=>msg}</ErrorMessage>
            }
            {...field}
          />   
          )
        }
      />
    </div>
  )
})