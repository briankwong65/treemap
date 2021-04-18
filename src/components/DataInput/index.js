import React, { useCallback } from 'react';
import * as styles from './styles.module.scss';

const DataInput = (props) => {
  const { dataOnChange, rowOnChange } = props;
  const handleDataChange = useCallback(
    (event) => {
      dataOnChange(event.target.value);
    },
    [dataOnChange]
  );

  const handleRowChange = useCallback(
    (event) => {
      rowOnChange(event.target.value);
    },
    [rowOnChange]
  );

  return (
    <div>
      <div>Data</div>
      <textarea onChange={handleDataChange}></textarea>
      <div>Row Number</div>
      <input type='text' onChange={handleRowChange}></input>
    </div>
  );
};

export default DataInput;
