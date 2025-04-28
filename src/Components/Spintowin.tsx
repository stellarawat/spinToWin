import {FC, useCallback, useEffect, useState} from 'react';
import '../style.css';
import {HowToPlay} from './howToPlay.tsx';
import SpinCanvas from './SpinCanvas.tsx';
import { Settings} from '../Utils/type.ts';
import BetHistory from "./BetHistory.tsx";
import {useSpinWs} from "../wsSpin/wsspin.ts";
import {receiveSpinData, sendSpinData} from "../Utils/wssData.ts";
import {useSpinSound} from "../Hooks/SpinUseSound.ts";
import {SpinPopUp} from "./SpinPopUp.tsx";
import {SpinBetControls} from "./BetControls.tsx";
import {MultiplierCards} from "./MultiplierCards.tsx";


export const SpinToWin: FC = () => {
    const {playSound} = useSpinSound(false, true);
    const [spinState, setSpinState] = useState<number | null>(0);
    const [isSpinning, setIsSpinning] = useState<boolean>(false);
    const [balance, setBalance] = useState<number>(1000);
    const [betAmount, setBetAmount] = useState<number>(1);
    const [numSegments, setNumSegments] = useState<number>(20);
    const [riskLevel, setRiskLevel] = useState<string>('medium');
    const [winningKey, setWinningKey] = useState<number>(17);
    const [winningMultiplier, setWinningMultiplier] = useState<number | null>(null);
    const {connectSocketSpin, sendDataSpin, getSocketSpin} = useSpinWs();
    const [spinResult, setSpinResult] = useState<receiveSpinData | null>(null);
    const [settings, setSettings] = useState<Settings>({
        showDropdown: false,
        showHelpOverlay: false,
        betAmount: 20
    });
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        connectSocketSpin();
    }, [connectSocketSpin]);

    const handleSpinReceivedData = useCallback(
        (spinResult: receiveSpinData) => {
            setSpinResult(spinResult);
            setBalance(parseFloat(spinResult.balance));
            setWinningKey(spinResult.randomkey);
            // console.log("Updated Winning Key:", spinResult.random key);
            setTimeout(() => {
                setIsSpinning(false);
                const winnings = spinResult.winnings;
                if (winnings > 0) {
                    playSound("win");
                } else {
                    playSound("lost");
                }
                setIsPopupVisible(true);

            }, 5000);

        },
        [playSound]
    );
    useEffect(() => {
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
    }, [getSocketSpin, handleSpinReceivedData]);

    useEffect(() => {
        if (spinResult) {
            // console.log("backend random key", spinResult.random key)
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


    const toggleSetting = (key: keyof Settings) => {
        setSettings(prev => ({...prev, [key]: !prev[key]}));
    };



    const handleSpin = useCallback(() => {
        if (isSpinning) {
            alert("The wheel is already spinning!");
            return;
        }

        if (betAmount <= 0) {
            alert("Please enter a valid bet amount!");
            return;
        }

        if (betAmount > balance) {
            alert("Insufficient balance!");
            return;
        }
        setIsSpinning(true);
        playSound("bet");
        playSound("spinning");

        const spinSendData: sendSpinData = {
            msisdn: "",
            amount: betAmount,
            level: riskLevel,
        };

        sendDataSpin(spinSendData);
    }, [betAmount, balance, isSpinning, riskLevel, sendDataSpin, playSound]);

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
        <div className="main-spin-2-win bg-spin">
            <div className="spin-container">
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
                    <BetHistory/>
                </div>

                <div className="  ">
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
            </div>

            {isPopupVisible && (
                <SpinPopUp winningMultiplier={winningMultiplier}
                           betAmount={betAmount}
                           OnClosePopup={handleClosePopup}/>
            )}

            {settings.showHelpOverlay && (
                <HowToPlay onClose={() => toggleSetting('showHelpOverlay')}/>
            )}
        </div>

    );
};