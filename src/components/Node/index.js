import React from 'react';
import * as styles from './styles.module.scss';
import classNames from 'classnames';

const Node = (props) => {
  const { name, weight, value } = props;
  const roundedValue = value.toFixed(2);
  return roundedValue >= 0 ? (
    <div className={styles.green}>
      {name}
      <br />
      {roundedValue}
    </div>
  ) : (
    <div className={styles.red}>
      {name}
      <br />
      {roundedValue}
    </div>
  );
};

export default Node;
