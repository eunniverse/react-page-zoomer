export const calculatePosition = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    return {
        x: rect.left + scrollX,
        y: rect.top + scrollY,
        width: rect.width,
        height: rect.height,
    };
};

export const startAnimation = (
    element: HTMLElement,
    position: { x: number; y: number; width: number; height: number },
    duration: number
) => {
    const { x, y, width, height } = position;

    const scaleX = window.innerWidth / width;
    const scaleY = window.innerHeight / height;
    const translateX = window.innerWidth / 2 - (x + width / 2);
    const translateY = window.innerHeight / 2 - (y + height / 2);

    element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
    element.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
    element.style.zIndex = "1000";
    element.style.position = "fixed";
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
};
