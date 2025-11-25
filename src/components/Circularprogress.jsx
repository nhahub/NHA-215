import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Circularprogress = ({ value, text, text1 }) => {
  return (
    <div className="w-[100px] h-[100px] p-4 flex flex-col content-center items-center gap-3">
      <CircularProgressbar
        value={value}
        text={text}
        styles={buildStyles({
          pathColor: '#0E898E',
          textColor: '#ffffff',
          trailColor: '#222',
        })}
      />
      <span className="text-white text-[22px]">{text1}</span>
    </div>
  );
};

export default Circularprogress;