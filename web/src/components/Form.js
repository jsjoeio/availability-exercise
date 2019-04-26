import React from 'react'

const Form = () => (
  <form id='name-form' className='col-md-6'>
    <div className='form-group'>
      <label htmlFor='name-field'>Your Name</label>
      <input placeholder='Darrell Silver' type='text' id='name-field' className='form-control' />
    </div>
  </form>
)

export default Form
