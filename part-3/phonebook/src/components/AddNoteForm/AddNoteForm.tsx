import React, { FC, FormEventHandler } from 'react';


interface AddNoteFormProps {
  name:string,
  phone:string,
  handleNameChange:FormEventHandler<HTMLInputElement>
  handleFormSubmit:FormEventHandler<HTMLFormElement>
  handlePhoneChange:FormEventHandler<HTMLInputElement>
}

const AddNoteForm: FC<AddNoteFormProps> = ({name,phone,handleFormSubmit,handleNameChange,handlePhoneChange}) => (
  <form onSubmit={handleFormSubmit}>
    <div>
      <label>Name  </label>
      <input value={name} onChange={handleNameChange}/>
    </div>
    <div>
      <label>Phone  </label>
      <input value={phone} onChange={handlePhoneChange}/>
    </div>
    <div>
      <button type='submit'>Add</button>
    </div>
  </form>
);

export default AddNoteForm;
