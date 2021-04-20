import React from 'react';

import './Pill.css';

const Pill = (props: { children: React.ReactNode, style?: React.CSSProperties, className?: string, title?: string}) => {
    return <div className={"pill-shell " + props.className} style={props.style} title={props.title}>
        {props.children}
    </div>;
};

export default Pill;