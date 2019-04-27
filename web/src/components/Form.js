import React, { useState } from 'react'

const Form = ({ getName, isValid, shouldResetName }) => {
  const [name, setName] = useState('')
  getName(name)
  if (shouldResetName && name !== '') {
    setName('')
  }
  return (
    <form style={{ position: 'relative' }} id='name-form' className='col-md-6'>
      <div className='form-group'>
        <label htmlFor='name-field'>Your Name</label>
        <input placeholder='Darrell Silver' type='text' id='name-field' className={`form-control ${!isValid && 'is-invalid'}`} value={name} onChange={e => setName(e.target.value)} />
        {!isValid && <div style={{ display: 'inline-block', position: 'absolute' }} className='invalid-feedback'>Please provide your name before booking</div>}
      </div>
    </form>
  )
}

export default Form
