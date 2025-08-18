import "./style.css";
import './App.css';
import {SpinToWin} from "./Components/Spintowin.tsx";
import {useEffect, useState} from "react";
import greatechLogo from "./assets/greatech_logo.png"
import spinLoader from "./assets/image/spi2win-loader.png"

const App = () => {
    const [spinLoading, setSpinLoading] = useState<boolean>(true);
    const [spinProgress, setSpinProgress] = useState<number>(0);

    useEffect(() => {
        const images = import.meta.glob("./assets/image/*.{png, jpeg, jpg, gif, svg}", {
            eager: true,
            import: "default",
        });

        const spinAssets = Object.values(images) as string[];
        let spinLoadedImgCount = 0;

        const spinLoadImg = (src: string) => {
            return new Promise<void>((resolve) => {
                const spinImg = new Image();
                spinImg.src = src;
                spinImg.onload = spinImg.onerror = () => {
                    spinLoadedImgCount += 1;
                    setSpinProgress((spinLoadedImgCount / spinAssets.length) * 100);
                    resolve();
                };
            });
        }

        Promise.all(spinAssets.map(spinLoadImg)).then(() => {
            setTimeout(() => {
                setSpinLoading(false);
            }, 3000);
        });
    }, []);

    return (
        <>
            {spinLoading ? (
                <div className="spin-loader-container">
                    <div className="spin-icon-wrapper">
                        <img src={spinLoader} alt="SpinLogo" className="spin-logo"/>
                        <div className="spin-loader-content">
                            <img src={greatechLogo} alt="Greatech-logo" className="greatech-logo"/>

                            <div className="spin-loader-progress">
                                <div className="spin-progress" style={{width: `${spinProgress}%`}}></div>
                            </div>
                            <p>Loading...{Math.round(spinProgress)}%</p>
                        </div>
                    </div>
                </div>
            ) : (
                <SpinToWin/>
            )}
        </>
    );
};

export default App;
