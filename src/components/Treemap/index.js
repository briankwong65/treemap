import React from 'react';
import * as styles from './styles.module.scss';
import classNames from 'classnames';

const Treemap = (props) => {
  const { className, data, row } = props;
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.treemap}>Hi, I am Treemap!</div>
      <div>{data}</div>
      <div>{row}</div>
    </div>
  );
};

export default Treemap;
