import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { 
  TextField,
  Button,
  FormHelperText
} from '@material-ui/core';
import DateField from './DateField';

export default props => {
  const { index, formik} = props;
  return(
    <div>
      <Field
        name={'name'}
        render={({
          field, // { name, value, onChange, onBlur }
          form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          ...props
        })=>{
          return(
            <TextField
              id="name"
              label="Name"
              style={{marginTop: 20}}
              fullWidth
              required
              {...field}
              {...props}
            />
          )
      }}
      />
      <ErrorMessage name="name">{msg=><FormHelperText error={true}>{msg}</FormHelperText>}</ErrorMessage>
      <Field
        name={'description'}
        render={({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          ...props
        })=>{
          return(
            <TextField
              id="description"
              label="Description"
              style={{marginTop: 20}}
              fullWidth
              {...field}
              {...props}
            />
          )
      }}
      />
      <ErrorMessage name="description">{msg=><FormHelperText error={true}>{msg}</FormHelperText>}</ErrorMessage>
      <DateField index={index}/>
      <Button variant="contained" color="primary" onClick={()=>{formik.submitForm()}}>Submit</Button>
    </div>
  )
};

