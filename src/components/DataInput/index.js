import React, { useCallback } from 'react';
import * as styles from './styles.module.scss';
import { TextareaAutosize, InputLabel, TextField } from '@material-ui/core';
import classNames from 'classnames';

const DataInput = (props) => {
  const { className, dataListOnChange, rowOnChange } = props;
  const handleDataListChange = useCallback(
    (event) => {
      dataListOnChange(event.target.value);
    },
    [dataListOnChange]
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
        <InputLabel>Data</InputLabel>
        <TextareaAutosize
          className={styles.textarea}
          onChange={handleDataListChange}
        ></TextareaAutosize>
      </div>
      <div className={styles.inputContainer}>
        <TextField
          className={styles.input}
          label='Row Number'
          variant='outlined'
          type='number'
          onChange={handleRowChange}
        />
      </div>
    </div>
  );
};

export default DataInput;
