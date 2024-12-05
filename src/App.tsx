import React from "react";
import {ImageTransitionProvider} from "./components/ImageTransitionProvider";
import {ImageTransitionElement} from "./components/ImageTransitionElement";

const App: React.FC = () => {
    const images = [
        { src: "https://via.placeholder.com/150", alt: "Image 1" },
        { src: "https://via.placeholder.com/150", alt: "Image 2" },
        { src: "https://via.placeholder.com/150", alt: "Image 3" },
    ];

    return (
        <ImageTransitionProvider>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {images.map((img, idx) => (
                    <ImageTransitionElement
                        key={idx}
                        destinationContent={
                            <div
                                style={{
                                    width: "100vw",
                                    height: "100vh",
                                    backgroundColor: "#000",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                }}
                            >
                                <img src={img.src} alt={img.alt} style={{ maxWidth: "90%" }} />
                                <p>Expanded View</p>
                            </div>
                        }
                    >
                        <img src={img.src} alt={img.alt} />
                    </ImageTransitionElement>
                ))}
            </div>
        </ImageTransitionProvider>
    );
};

export default App;
