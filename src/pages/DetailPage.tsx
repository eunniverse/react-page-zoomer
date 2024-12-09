import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const DetailPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const detailRef = useRef<HTMLDivElement | null>(null);

    const { elementPosition } = location.state || {};

    const handleBack = () => {
        if (detailRef.current && elementPosition) {
            const detailElement = detailRef.current;

            // 복귀 애니메이션
            detailElement.style.transition = "transform 0.8s ease";
            detailElement.style.transform = `translate(${elementPosition.left}px, ${elementPosition.top}px) scale(1)`;

            setTimeout(() => {
                navigate(-1); // 이전 페이지로 이동
            }, 800);
        }
    };

    useEffect(() => {
        if (detailRef.current && elementPosition) {
            const detailElement = detailRef.current;

            // 확대 애니메이션
            const scaleX = window.innerWidth / elementPosition.width;
            const scaleY = window.innerHeight / elementPosition.height;
            const translateX = window.innerWidth / 2 - (elementPosition.left + elementPosition.width / 2);
            const translateY = window.innerHeight / 2 - (elementPosition.top + elementPosition.height / 2);

            detailElement.style.position = "fixed";
            detailElement.style.left = `${elementPosition.left}px`;
            detailElement.style.top = `${elementPosition.top}px`;
            detailElement.style.width = `${elementPosition.width}px`;
            detailElement.style.height = `${elementPosition.height}px`;
            detailElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;

            setTimeout(() => {
                detailElement.style.transition = ""; // 애니메이션 종료 후 초기화
            }, 800);
        }
    }, [elementPosition]);

    return (
        <div
            ref={detailRef}
            style={{
                backgroundColor: "#000",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <div>
                <p>Expanded Content</p>
                <button
                    onClick={handleBack}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        backgroundColor: "#fff",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Back
                </button>
            </div>
        </div>
    );
};
