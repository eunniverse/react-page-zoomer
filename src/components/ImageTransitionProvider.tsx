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
        // 원래 스타일 저장
        const rect = element.getBoundingClientRect();
        setOriginalStyles({
            left: `${rect.left}px`,
            top: `${rect.top}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            position: element.style.position || "static",
            transform: element.style.transform || "",
            zIndex: element.style.zIndex || "",
        });

        // 확대 애니메이션 적용
        element.style.position = "fixed";
        element.style.left = `${rect.left}px`;
        element.style.top = `${rect.top}px`;
        element.style.width = `${rect.width}px`;
        element.style.height = `${rect.height}px`;
        element.style.transition = "transform 0.8s ease";
        const scaleX = window.innerWidth / rect.width;
        const scaleY = window.innerHeight / rect.height;
        const translateX = window.innerWidth / 2 - (rect.left + rect.width / 2);
        const translateY = window.innerHeight / 2 - (rect.top + rect.height / 2);
        element.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;

        setActiveElement(element);
        setCurrentContent(destinationContent);
    };

    const closeTransition = () => {
        if (!activeElement || !originalStyles) return;

        // 원래 위치와 크기로 복귀
        activeElement.style.transition = "transform 0.8s ease, left 0.8s ease, top 0.8s ease, width 0.8s ease, height 0.8s ease";
        activeElement.style.left = originalStyles.left;
        activeElement.style.top = originalStyles.top;
        activeElement.style.width = originalStyles.width;
        activeElement.style.height = originalStyles.height;
        activeElement.style.position = originalStyles.position;
        activeElement.style.transform = originalStyles.transform;
        activeElement.style.zIndex = originalStyles.zIndex;

        // 복귀 완료 후 상태 초기화
        setTimeout(() => {
            setActiveElement(null);
            setCurrentContent(null);
        }, 800);
    };

    return (
        <TransitionContext.Provider value={{ triggerExpand, closeTransition, currentContent }}>
            {children}
        </TransitionContext.Provider>
    );
};