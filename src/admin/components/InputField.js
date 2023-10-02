import React from "react";
import PropTypes from 'prop-types';

export default function InputField(props) {
  return (
    <div className="py-2 sm:col-span-2">
      <label
        htmlFor={props.FieldId}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>
      <input
        value={props.currentvalue}
        onChange={props.onChange}
        type={props.type == undefined ? "text" : props.type}
        name={props.FieldId}
        id={props.FieldId}
        className={
          "mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        }
        placeholder={props.placeholder}
        required=""
      />
    </div>
  );
}

InputField.prototype = {
  type: PropTypes.string,
  label: PropTypes.string,
  currentvalue: PropTypes.any,
  placeholder: PropTypes.string,
  FieldId: PropTypes.string,
  onChange: PropTypes.func,
};
