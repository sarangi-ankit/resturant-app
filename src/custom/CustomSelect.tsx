import React, { ReactNode } from 'react';
import { Select } from '@radix-ui/react-select';

interface CustomSelectProps {
  value: string; 
  onChange: (newValue: string) => void; 
  children: ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, children }) => {
  const handleChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      {children}
    </Select>
  );
};

export default CustomSelect;
