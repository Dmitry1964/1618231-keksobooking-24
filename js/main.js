import { setUserFormSubmit, setDisabledFields, setDisabledForms } from './form.js';
import './filter.js';


const toggleSwitch = () => {
  setDisabledFields();
  setDisabledForms();
};

document.addEventListener('DOMContentLoaded', toggleSwitch());

setUserFormSubmit();

export { toggleSwitch };
