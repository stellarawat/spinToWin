import {Dispatch, FC, SetStateAction, useState} from "react";
import {riskLevels} from "../Lib/constrains.ts";

interface SpinBetProps {
    // onUpdateBetAmount: (betAmount: number) => void;
    spinBetAmount: number;
    SpinBalance: number;
    onChangeSpinBetAmount: Dispatch<SetStateAction<number>>;
    HandleLevelChange: (level: string) => void;
    HandleSpinClick: () => void;
    riskLevel: string;
    isSpinning: boolean;


}

export const SpinBetControls: FC<SpinBetProps> = ({
                                                      SpinBalance,
                                                      spinBetAmount,
                                                      onChangeSpinBetAmount,
                                                      HandleLevelChange,
                                                      HandleSpinClick,
                                                      isSpinning,
                                                      riskLevel
                                                  }) => {
    const [spinActiveBet, setSpinActiveBet] = useState<string>()
    const handleBetAmountChange = (amount: number) => {
        if (amount < 1) return;
        if (amount > SpinBalance) return;

        onChangeSpinBetAmount(amount);
        setSpinActiveBet(String(amount));
    };

    return (
        <>
            <div className='spin-bet-amount-title'> Bet Amount</div>
            <div className='spin-bet-amount-area'>
                <div className='spin-bet-controls'>
                    {[5, 10, 50, 100].map((amount) => (
                        <div
                            className={`spin-bet-controls-buttons ${spinActiveBet === String(amount) ? "spin-active-bet" : ""}`}
                            key={amount}
                            onClick={() => handleBetAmountChange(amount)}
                        >
                            {amount}
                        </div>
                    ))}
                </div>
                <div className='spin-plus-minus-input-container'>
                    <div className='spin-plus-minus'
                         onClick={() => handleBetAmountChange(Math.max(spinBetAmount - 1, 0))}
                    >
                        -
                    </div>
                    <input className='spin-bet-Amount'
                           disabled={isSpinning}
                           type="number"
                           value={spinBetAmount}
                           onChange={(e) => handleBetAmountChange(parseInt(e.target.value, 10) || 0)}
                    />

                    <div className='spin-plus-minus'
                         onClick={() => handleBetAmountChange(spinBetAmount + 1)}
                    >
                        +
                    </div>
                </div>
            </div>

            <div
                className={`spin-button ${isSpinning ? 'disabled' : ''}`}
                onClick={HandleSpinClick}
            >
                {isSpinning ? (
                    <>
                        <span style={{marginRight: "4px"}}>Spinning</span>
                        <span className=" spin-dot dot1">.</span>
                        <span className="spin-dot dot2">.</span>
                        <span className="spin-dot dot3">.</span>
                    </>
                ) : (
                    <>
                        <span>Spin</span>
                    </>
                )}

            </div>

            <div className="spin-risk-select-container">
                <span className='spin-risk-select-label'> Risk level</span>
                <div className="risk-select-option-spin">
                    {riskLevels.map((level, index) => (
                        <div
                            key={index}
                            className={`spin-risk-select ${isSpinning ? 'disabled' : ''}`}
                            onClick={() => !isSpinning && HandleLevelChange(level)}
                            role="button"
                            aria-pressed={riskLevel === level}
                            tabIndex={0}
                        >
                                <span className={`spin-risk-option ${riskLevel === level ? "risk-active" : ""}`}>
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                </span>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}