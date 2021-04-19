import React, { useCallback } from 'react';
import * as styles from './styles.module.scss';
import classNames from 'classnames';

const DataInput = (props) => {
  const { className, dataOnChange, rowOnChange } = props;
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
    <div className={classNames(styles.container, className)}>
      <div className={styles.inputContainer}>
        <div>Data</div>
        <textarea onChange={handleDataChange}></textarea>
      </div>
      <div className={styles.inputContainer}>
      <div>Row Number</div>
        <input type='number' onChange={handleRowChange}></input>
      </div>
    </div>
  );
};

export default DataInput;
