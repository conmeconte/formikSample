import React, { Component } from 'react';
import './App.css';
import FormComp from './components/Form';
import { Formik, Form } from 'formik';
import {scheduleSchema } from './schema/formSchema';
class App extends Component {
  constructor(props){
    super(props);
    this.initValues={
      name: '',
      description: '',
      schedule_data: [
        {start_date: '',
        end_date: '',
        start_time: '',
        end_time: ''}
      ],
    };
  }
  addMoreTimeSlots = (values, setFieldValue, formik) => {
    let newSchedule = {
      start_time: "00:00",
      end_time: "00:00",
      days: [],
      allDay: true
    }
    let schedule_data = values.schedule_data;
    schedule_data.push(newSchedule);
    setFieldValue('schedule_data', schedule_data);
    formik.setFieldTouched(`schedule_data[${schedule_data.length-1}].touched`);
  }

  deleteTimeSlot = (index, values, formik) => {
    let timeslots = values.schedule_data
    timeslots.splice(index, 1);
    /** updating initValue of formik through state instead of using formik method
     * issue on tracking the touched and validation state of delete when use formik method
     */
    this.setState({
      scheduleInit: {
        ...values
      }
    });
    formik.setFieldTouched(`schedule_data[${index}].touched`);
  };

  submitForm = (form, formik, type) => {
    alert('Form submitted', form); 
  }
  render() {
    return (
      <div className="App" style={{padding: 50}}>
        <Formik
          initialValues={this.initValues}
          onSubmit={(values, formik)=>{
            this.submitForm(values, formik, 'nameEdit');
          }}
          validationSchema={scheduleSchema}
          enableReinitialize={true}
          render={props=>(
            <Form>
              <FormComp 
                index={0} 
                formik={props}
                addMoreTimeSlots={()=>this.addMoreTimeSlots(props.values, props.setFieldValue, props)}
                deleteTimeSlot={index=>this.deleteTimeSlot(index, props.values, props)}
              />
            </Form>
          )}
        />
      </div>
    );
  }
}

export default App;
