import React, { Component } from 'react';
import './App.css';
import FormComp from './components/Form';
import { Formik, Form } from 'formik';
import {scheduleSchema } from './schema/formSchema';
import Paper from '@material-ui/core/Paper';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      submitted: null,
      initValues: {
        name: '',
        description: '',
        schedule_data: [
          {
            start_date: '',
            end_date: '',
            start_time: '',
            end_time: ''
          }
        ],
      }
    }
  }
  addMoreTimeSlots = (values, setFieldValue, formik) => {
    let newSchedule = {
      start_time: "",
      end_time: "",
      start_date: "",
      end_date: "",
    }
    let schedule_data = values.schedule_data;
    schedule_data.push(newSchedule);
    setFieldValue('schedule_data', schedule_data);
    formik.setFieldTouched(`schedule_data[${schedule_data.length-1}].touched`);
  }

  deleteTimeSlot = (index, values, formik) => {
    let timeslots = values.schedule_data
    timeslots.splice(index, 1);

    this.setState({
      initValues: {
        ...values
      }
    });
    formik.setFieldTouched(`schedule_data[${index}].touched`);
  };

  submitForm = (values, formik) => {
    this.setState({
      submitted: values
    })
  }
  render() {
    return (
      <div className="App" style={{padding: 50}}>
        <Formik
          initialValues={this.state.initValues}
          onSubmit={(values, formik)=>{
            this.submitForm(values, formik);
          }}
          validationSchema={scheduleSchema}
          enableReinitialize={true}
          render={props=>(
            <Form>
              <FormComp 
                formik={props}
                addMoreTimeSlots={()=>this.addMoreTimeSlots(props.values, props.setFieldValue, props)}
                deleteTimeSlot={index=>this.deleteTimeSlot(index, props.values, props)}
              />
            </Form>
          )}
        />
        {<Paper style={{padding: 20, minHeight: 300}}>{this.state.submitted && JSON.stringify(this.state.submitted)}</Paper>}
      </div>
    );
  }
}

export default App;
