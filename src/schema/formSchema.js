import * as yup from 'yup';

/** Custom Validator */

/**
 * 
 * @param {*} start_time 
 * @param {*} end_time 
 * @param {*} allDay 
 */
const timeValidator = (start_time, end_time, allDay) => {
  const regex = /:/gi; 

  //Bypass All day; 
  if(allDay || (start_time === "00:00" && end_time === "00:00")) return true;
  if(parseInt(start_time.replace(regex, ''),10) >= parseInt(end_time.replace(regex, ''),10)) return false
  return true
}

/**
 * 
 * @param {*} start_date 
 * @param {*} end_date 
 */
const dateValidator = (start_date, end_date) => {
  // if (!end_date) return false;
  if (new Date(start_date) > new Date(end_date)) return false
  return true
}



/** Yup Schema */
export const scheduleSchema = yup.object().shape({
  name: yup.string().required('Field is required').min(1, 'Minimum of 1 character is required').max(250, 'Title can not exceed 250 characters'),
  description: yup.string().max(250, 'Description can not exceed 250 characters'),
  schedule_data: yup.array().of(
    yup.object().shape({
      start_date:  
        yup.string().test('date validation', 'Start date cannot be after end date', async function(value){
          const valid = await dateValidator(value, this.parent.end_date);
          return valid; 
        }).required('Date field is required'),
      end_date: yup.string().required('Date field is required'),
      start_time: 
        yup.string().test('time validation', 'Start time cannot be after end time', async function(value){
          const valid = await timeValidator(value, this.parent.end_time, this.parent.allDay);
          return valid; 
        }).required('Time is required'),
      end_time: yup.string().required('Time is required'),
      allDay: yup.bool().notRequired(),
    })
  )
})