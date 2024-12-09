import React, { createContext, useContext, useState } from "react";

type TransitionContextType = {
    triggerExpand: (
        element: HTMLElement,
        destinationContent: React.ReactNode
    ) => void;
    closeTransition: () => void;
    currentContent: React.ReactNode | null;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useImageTransition = () => {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error("useImageTransition must be used within ImageTransitionProvider");
    }
    return context;
};

export const ImageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                                     children,
                                                                                 }) => {
    const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
    const [currentContent, setCurrentContent] = useState<React.ReactNode | null>(
        null
    );
    const [originalStyles, setOriginalStyles] = useState<{
        left: string;
        top: string;
        width: string;
        height: string;
        position: string;
        transform: string;
        zIndex: string;
    } | null>(null);

    const triggerExpand = (
        element: HTMLElement,
        destinationContent: React.ReactNode
    ) => {
        // 현재 요소의 위치와 크기 계산 (스크롤 포함)
        const rect = element.getBoundingClientRect();
        const scrollX = window.scrollX || document.documentElement.scrollLeft;
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        // 원래 스타일 저장
        setOriginalStyles({
            left: `${rect.left + scrollX}px`,
            top: `${rect.top + scrollY}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            position: element.style.position || "static",
            transform: element.style.transform || "none",
            zIndex: element.style.zIndex || "auto",
        });

        // 클릭한 요소를 fixed로 설정하여 현재 화면에서 고정
        element.style.position = "fixed";
        element.style.left = `${rect.left + scrollX}px`;
        element.style.top = `${rect.top + scrollY}px`;
        element.style.width = `${rect.width}px`;
        element.style.height = `${rect.height}px`;
        element.style.zIndex = "1000"; // 최상위로 올리기

        // 애니메이션 효과 설정
        const scaleX = window.innerWidth / rect.width;
        const scaleY = window.innerHeight / rect.height;
        const translateX = window.innerWidth / 2 - (rect.left + scrollX + rect.width / 2);
        const translateY = window.innerHeight / 2 - (rect.top + scrollY + rect.height / 2);

        element.style.transition = "transform 0.8s ease, left 0.8s ease, top 0.8s ease, width 0.8s ease, height 0.8s ease";
        element.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;

        // 상태 업데이트
        setActiveElement(element);
        setCurrentContent(destinationContent);

        console.log(
            "Animation applied:",
            `Left: ${rect.left + scrollX}, Top: ${rect.top + scrollY}, TranslateX: ${translateX}, TranslateY: ${translateY}`
        );
    };


    const closeTransition = () => {
        if (!activeElement || !originalStyles) return;

        // 원래 위치로 복구
        activeElement.style.transition = "transform 0.8s ease, left 0.8s ease, top 0.8s ease, width 0.8s ease, height 0.8s ease";
        activeElement.style.left = originalStyles.left; // 저장된 절대 위치로 복구
        activeElement.style.top = originalStyles.top;   // 저장된 절대 위치로 복구
        activeElement.style.width = originalStyles.width;
        activeElement.style.height = originalStyles.height;
        activeElement.style.transform = originalStyles.transform;

        // 복구 완료 후 초기화
        setTimeout(() => {
          //  activeElement.style.position = "fixed"; //originalStyles.position;
            activeElement.style.zIndex = originalStyles.zIndex;
            activeElement.style.transition = "";
            setActiveElement(null);
            setCurrentContent(null);
            console.log('activeElement  ', activeElement)
        }, 800);
    };


    return (
        <TransitionContext.Provider value={{ triggerExpand, closeTransition, currentContent }}>
            {children}
        </TransitionContext.Provider>
    );
};
