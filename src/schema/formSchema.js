import * as yup from 'yup';

/** Custom Validator */

/**
 * @param {*} start_time 
 * @param {*} end_time 
 */
const timeValidator = (start_time, end_time) => {
  const regex = /:/gi; 
  if(parseInt(start_time.replace(regex, ''),10) >= parseInt(end_time.replace(regex, ''),10)) return false
  return true
}

/**
 * @param {*} start_date 
 * @param {*} end_date 
 */
const dateValidator = (start_date, end_date) => {
  if (new Date(start_date) > new Date(end_date)) return false
  return true
}

/** Yup Schema */
export const scheduleSchema = yup.object().shape({
  name: yup.string().required('Field is required').min(2, 'Minimum of 2 character is required').max(8, 'Title can not exceed 8 characters'),
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
          const valid = await timeValidator(value, this.parent.end_time);
          return valid; 
        }).required('Time is required'),
      end_time: yup.string().required('Time is required'),
    })
  )
})