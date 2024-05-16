import { useState } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { Colors } from '../../utils/Helpers';

const defaultStyles = {
  control: (styles, state) => ({
    display: 'flex',
    backgroundColor: '#212121',
    color: Colors.gray100,
    borderRadius: '.6rem',
    width: "100%",
    alignItems: "center",
    border: state.isFocused 
            ? `1px solid ${Colors.gray100}`
            : `1px solid ${Colors.gray600}`,
    outline: 'none',
    justifyContent: "space-between",
    gap: "8px",
    padding: ".2rem .2rem",
    borderRadius: ".6rem",
    transition: "all .1s",
    color: "#7D7D7D",
    fontSize: '.8rem',
    fontFamily: 'Poppins',
  }),
  menu: (styles, state) => ({
    ...styles,
    backgroundColor: '#212121',
    color: Colors.gray100,
    padding: '.5rem',
    border:`1px solid ${Colors.gray600}`,
    borderRadius: '.6rem'
  }),
  option: (styles, state) => ({
    ...styles,
    fontFamily: 'Poppins',
    borderRadius: '.5rem',
    backgroundColor: state.isFocused 
    ? Colors.orange500
    : Colors.gray600,
    '&:hover': {
      backgroundColor: Colors.orange300
    }
  }),
  input: (styles, state) => ({
    ...styles,
    color: Colors.gray100
  }),
  placeholder: (styles, state) => ({
    ...styles,
  }),
  singleValue: (styles, state)=> ({
    ...styles,
    color: Colors.gray100
  })
};

export default ({options, name, placeholder, isSearchable, isClearable, isLoading, isDisabled, defaultValue, styles = defaultStyles, ...props }) => {
  return (
    <Select 
      {...props}
      name={name}
      options={options}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isLoading={isLoading}
      isDisabled={isDisabled}
      defaultValue={defaultValue}
      placeholder={placeholder}
      styles={styles}
    />
  )
}

export function CustomAsyncSelect({ cacheOptions, defaultOptions, options, name, placeholder, isSearchable, isClearable, isLoading, isDisabled, defaultValue, styles = defaultStyles, ...props }) {
  return (
    <AsyncSelect 
      {...props}
      name={name}
      options={options}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isLoading={isLoading}
      isDisabled={isDisabled}
      defaultValue={defaultValue}
      placeholder={placeholder}
      styles={styles}
    />
  )
} 