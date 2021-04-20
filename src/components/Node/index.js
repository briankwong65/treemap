import React from 'react';
import * as styles from './styles.module.scss';

const Node = (props) => {
  const { name, width, totalWidth, value } = props;
  const percentageValue = (value*100).toFixed(2);
  const color = percentageValue >= 0 ? 'green' : 'red';
  return( 
    <div className={styles.node} style={{backgroundColor: color, width: width*totalWidth*100}}>
      {name}
      <br />
      {percentageValue}%
    </div>
  )
};

export default Node;
