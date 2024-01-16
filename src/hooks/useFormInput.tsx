import { useState } from 'react';

function useFormInput(initialValue: string | number) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue: string | number) => {
    setValue(newValue);
  };

  return {
    value,
    onChange: handleChange,
  };
}

export default useFormInput;
