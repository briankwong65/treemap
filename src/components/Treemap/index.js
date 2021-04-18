import React from 'react';
import * as styles from './styles.module.scss';

const Treemap = (props) => {
  const { data, row } = props;
  return (
    <div>
      <div className={styles.treemap}>Hi, I am Treemap!</div>
      <div>{data}</div>
      <div>{row}</div>
    </div>
  );
};

export default Treemap;
