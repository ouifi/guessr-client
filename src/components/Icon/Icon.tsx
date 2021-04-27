import React from 'react';

import './Icon.css';

const sizes = {
    sm: {
        width: 10,
        height: 10
    },
    md: {
        width: 30,
        height: 30,
    }
};

const Icon = ({ children, size }: { children: React.ReactNode, size?: "sm" | "md" }) => {
    return <div className="guessr-icon" style={{...sizes[size || "md"]}}>
        {children}
    </div>;
};

export default Icon;