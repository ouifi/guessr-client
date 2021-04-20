import React from 'react';

import './Spinner.css';

interface SpinnerProps { size?: string, ease?: boolean, style?: React.CSSProperties, color?: number, className?: string }

const Spinner = ({ size, ease, style, color, className }: SpinnerProps) => {

    const classNm = ["spinner", (size || "sm" ), (ease ? "ease" : "spin"), className].join(" ");
    return (
        <div className={classNm} style={{ color: "coral", ...style }} data-testid="spinner"/>
    );
};

export default Spinner;