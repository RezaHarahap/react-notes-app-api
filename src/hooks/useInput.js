import { useState } from 'react';

export default function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);
  const onChange = (event) => setValue(event.target.value);
  const reset = () => setValue(defaultValue);
  return [value, onChange, reset];
}
