import React, { useRef } from "react";
import { useImageTransition } from "./ImageTransitionProvider";

type ImageTransitionElementProps = {
    destinationContent: React.ReactNode;
    children: React.ReactNode;
};

export const ImageTransitionElement: React.FC<ImageTransitionElementProps> = ({
                                                                                  destinationContent,
                                                                                  children,
                                                                              }) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const { triggerExpand, closeTransition } = useImageTransition();

    const handleClick = () => {
        const element = elementRef.current;
        if (element) {
            if (destinationContent) {
                triggerExpand(element, destinationContent);
            } else {
                closeTransition();
            }
        }
    };

    return (
        <div
            ref={elementRef}
            onClick={handleClick}
            style={{
                cursor: "pointer",
                display: "inline-block",
                position: "relative",
            }}
        >
            {children}
        </div>
    );
};
