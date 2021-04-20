import React, { useEffect, useState } from 'react';

import './useColorFlash.css';

const useColorFlash = (value: any, duration: number = 1) => {
    const [style, setStyle] = useState<React.CSSProperties>({});

    // We can take advantage of the fact that useEffect is run whenever the dependencies change. 
    // Assuming that duration stays static, that means the the effect will be run whenever the value changes.
    // So we return a style object which contains the animation name and duration, defining
    // the color transition in the css file imported above. 
    // To perform this effect multiple times, we set a timeout so that the animation
    // property is unset slightly after the animation completes. 
    // The highest frequency this hook should be called is 1/duration seconds. 
    useEffect(
        () => {
            setStyle({
                animationName: "flash",
                animationDuration: `${duration}s`,
                borderRadius: "2px"
            });

            setTimeout(
                () => {
                    setStyle({});
                },
                duration * 1050
            );
        },
        [value, duration]
    );

    return style;
};

export default useColorFlash;