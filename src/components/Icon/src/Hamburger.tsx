// Font Awesome Icon
// Used with permission from font awesome under CCA 4.0 International license
// https://fontawesome.com/license

// Minor changes are made removing unneeded props
import React from 'react';

const Hamburger = ({ wide, width, height }: { wide?: boolean, width?: number, height?: number }) => {
    return <svg width={wide ? "90%" : (width ? width : "")} height={height} preserveAspectRatio="none" viewBox="0 0 448 512">
        <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
        </path>
    </svg>;
};

export default Hamburger;