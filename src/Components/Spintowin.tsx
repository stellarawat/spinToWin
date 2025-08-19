import {useCallback, useEffect, useState} from 'react';
import '../style.css';
import {HowToPlay} from './howToPlay.tsx';
import SpinCanvas from './SpinCanvas.tsx';
import {Settings} from '../Utils/type.ts';
// import BetHistory from "./BetHistory.tsx";
import {useSpinWs} from "../wsSpin/wsspin.ts";
import {receiveSpinData, sendSpinData} from "../Utils/wssData.ts";
import {SpinPopUp} from "./SpinPopUp.tsx";
import {SpinBetControls} from "./BetControls.tsx";
import {MultiplierCards} from "./MultiplierCards.tsx";
import closeIcon from "../assets/image/close (1).png";
import menuIcon from "../assets/image/menu-bar-w2xGH3o5.png";
import helpIcon from "../assets/image/help-MqG1XedK.png";
import UnmuteIcon from "../assets/image/unmute-COvvfrUR.png";
import muteIcon from "../assets/image/mute-BE9m29EQ.png";
import spinlogo from "../assets/image/logo.png";
import {useNewSpinAudio} from "../Hooks/useNewSpinAudio.ts";

export const SpinToWin = () => {
    const [spinState, setSpinState] = useState<number | null>(0);
    const [isSpinning, setIsSpinning] = useState<boolean>(false);
    const [balance, setBalance] = useState<number>(0);
    const [betAmount, setBetAmount] = useState<number>(1);
    const [numSegments, setNumSegments] = useState<number>(20);
    const [riskLevel, setRiskLevel] = useState<string>('medium');
    const [winningKey, setWinningKey] = useState<number>(17);
    const [winningMultiplier, setWinningMultiplier] = useState<number | null>(null);
    const {connectSocketSpin, sendDataSpin, getSocketSpin} = useSpinWs();
    const [spinResult, setSpinResult] = useState<receiveSpinData | null>(null);

    const [settings, setSettings] = useState<Settings>({
        isMuted: false,
        showDropdown: false,
        showHelpOverlay: false,
        betAmount: 20
    });
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const {playSpinSound, playSpinLoop} = useNewSpinAudio(settings.isMuted, true)

//add toast /insufficient balance
    const handleSpinReceivedData = useCallback(
        (spinResult: receiveSpinData) => {
            setSpinResult(spinResult);
            setBalance(parseFloat(spinResult.Balance));
            setWinningKey(spinResult.randomkey);
            // console.log("Updated Winning Key:", spinResult.random key);
            setTimeout(() => {
                setIsSpinning(false);
                const winnings = spinResult.winnings;
                if (winnings > 0) {
                    playSpinSound("WinSnd");
                } else {
                    playSpinSound("LoseSnd");
                }
                setIsPopupVisible(true);

            }, 5000);

        }, [playSpinSound]);

    useEffect(() => {
        connectSocketSpin();

        const socket = getSocketSpin();
        if (socket) {
            socket.onmessage = (event: { data: string }) => {
                console.log("Message received:", event.data);
                if (event && event.data) {
                    try {
                        const spinReceivedData: receiveSpinData = JSON.parse(event.data);
                        handleSpinReceivedData(spinReceivedData);
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    } catch (e) {
                        // console.error('an error occurred', e);
                    }
                } else {
                    // console.error('could not get data');
                }
            };
        }
        return () => {
            if (socket) socket.onmessage = null;
        };
    }, [connectSocketSpin, getSocketSpin, handleSpinReceivedData]);

    useEffect(() => {
        if (spinResult) {
            setWinningKey(spinResult.randomkey);
            setTimeout(() => {
                setWinningMultiplier(spinResult.multiplier);
            }, 5000)

            if (winningKey !== null) {
                const segmentAngle = 360 / numSegments;
                const segmentStartAngle = winningKey * segmentAngle;
                const spinRotations = Math.floor(Math.random() * (10 - (-10) + 1)) + (-10);
                const spinAngles = Math.random() * (6.0 - 1.1) + 1.1;
                const point = segmentAngle / spinAngles;
                const finalAngle = (-90 + point) - segmentStartAngle + spinRotations * 360;
                setSpinState(finalAngle);
            }
        }
    }, [numSegments, spinResult, winningKey]);

    const handleSpin = useCallback(() => {
        setIsSpinning(true);
        const queryParams = new URLSearchParams(window.location.search);
        const sess = queryParams.get("sess") || " ";
        const spinSendData: sendSpinData = {
            msisdn: sess,
            amount: betAmount,
            level: riskLevel,
        };
        sendDataSpin(spinSendData);
        playSpinSound("BetSnd");

        if (isSpinning) {
            playSpinLoop();
            alert("The wheel is already spinning!");
            return;
        }
        // else if (betAmount <= 0) {
        //     alert("Please enter a valid bet amount!");
        //     return;
        // } else if (betAmount > balance) {
        //     alert("Insufficient balance!");
        //     return;
        // }


    }, [isSpinning, betAmount, balance, playSpinLoop, playSpinSound, riskLevel, sendDataSpin]);

    const handleRiskLevelChange = (level: string) => {
        if (isSpinning) return;
        setIsSpinning(false);
        setSpinState(null);
        setTimeout(() => setSpinState(0), 10);
        setWinningKey(-1);
        setSpinResult(null);
        setWinningMultiplier(null);

        const numSegments = level === 'low' ? 14 : level === 'medium' ? 20 : level === 'high' ? 7 : undefined;

        if (numSegments !== undefined) {
            setNumSegments(numSegments);
        }

        setRiskLevel(level);
    };
    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    useEffect(() => {
        if (isPopupVisible) {
            const timer = setTimeout(() => {
                setIsPopupVisible(false);

            }, 1500);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isPopupVisible]);

    return (
        <div className="main-spin-2-win">
            <div className="main-spin-2-win-cont">
                <div className="spin-classic-header">
                    <img
                        className="header-icon"
                        src={settings.showDropdown ? closeIcon : menuIcon}
                        alt={settings.showDropdown ? 'Close Menu' : 'Open Menu'}
                        onClick={() => setSettings(prev => ({
                            ...prev,
                            showDropdown: !prev.showDropdown
                        }))
                        }
                    />
                    <img
                        className="header-logo"
                        src={spinlogo}
                        alt="Back"
                    />
                    <div className="user-balance">
                        {balance > 0 ? balance:"---"}
                    </div>

                </div>
                {settings.showDropdown && (
                    <div className="menu-content-container-overlay">
                        <img
                            className="help-classic"
                            src={helpIcon} alt="Help"
                            onClick={() =>
                                setSettings(prev => ({
                                    ...prev,
                                    showHelpOverlay: true
                                }))
                            }

                        />

                        <img
                            className="help-classic"
                            src={settings.isMuted ? muteIcon : UnmuteIcon}
                            alt="Sound"
                            onClick={() =>
                                setSettings(prev => ({
                                    ...prev,
                                    isMuted: !prev.isMuted
                                }))
                            }

                        />
                    </div>
                )}

                <div className="spin-container-canvas">
                    <SpinCanvas
                        riskLevel={riskLevel}
                        spinState={spinState}
                        numSegments={numSegments}
                        winningKey={winningKey}
                    />

                    <MultiplierCards
                        riskLevel={riskLevel}
                        winningMultiplier={winningMultiplier}
                        isSpinning={isSpinning}
                    />
                </div>
                <div className="main-spi-content-2">
                    <SpinBetControls
                        spinBetAmount={betAmount}
                        SpinBalance={balance}
                        HandleLevelChange={handleRiskLevelChange}
                        HandleSpinClick={handleSpin}
                        riskLevel={riskLevel}
                        isSpinning={isSpinning}
                        onChangeSpinBetAmount={setBetAmount}
                    />
                    {/*<BetHistory/>*/}
                </div>

                {isPopupVisible && (
                    <SpinPopUp winningMultiplier={winningMultiplier}
                               betAmount={betAmount}
                               OnClosePopup={handleClosePopup}/>
                )}

                {settings.showHelpOverlay && (
                    <HowToPlay onClose={() => setSettings(prev => ({
                            ...prev,
                            showHelpOverlay: false
                        })
                    )
                    }/>
                )}
            </div>

        </div>

    );
};