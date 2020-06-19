import React, { useState } from 'react';
import { ButtonToInput } from './button-to-input';

export default {
  title: 'Utility Components/Button To Input',
  component: ButtonToInput,
};

export const Basic = () => {
  const [value, setValue] = useState('some value');
  return <div>
    <ButtonToInput value={value} onChange={setValue} />
    Value: {value}
  </div>;
}