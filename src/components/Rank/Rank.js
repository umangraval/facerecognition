import React from 'react';

const Rank = ({ names, entries }) => {
  return (
    <div>
      <div className='white f3'>
        {`${names}, your current entry count is...`}
      </div>
      <div className='white f1'>
        {entries}
      </div>
    </div>
  );
}

export default Rank;