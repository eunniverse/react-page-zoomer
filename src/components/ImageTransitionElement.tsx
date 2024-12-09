import React, { useRef, useState } from "react";
import { useImageTransition } from "./ImageTransitionProvider";

type ImageTransitionElementProps = {
    destinationContent: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void; // 페이지 전환을 위한 클릭 핸들러
};

export const ImageTransitionElement: React.FC<ImageTransitionElementProps> = ({
                                                                                  destinationContent,
                                                                                  children,
                                                                                  onClick,
                                                                              }) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const { triggerExpand, closeTransition } = useImageTransition();
    const [isExpanded, setIsExpanded] = useState(false); // 열림 여부 상태 관리

    const handleClick = () => {
        const element = elementRef.current;
        if (!element) return;

        if (!isExpanded) {
            // 열기
            console.log("open...");
            triggerExpand(element, destinationContent);
            setIsExpanded(true);
        } else {
            // 닫기
            console.log("close...");
            closeTransition();
            setIsExpanded(false);
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
