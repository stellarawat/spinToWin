import {FC} from "react";

interface SpinPopUpProps {
    winningMultiplier: number | null;
    betAmount: number;
    OnClosePopup: () => void;

}

export const SpinPopUp: FC<SpinPopUpProps> = ({winningMultiplier, betAmount, OnClosePopup}) => {
    return (
        <>
            <div className="spin-popup-backdrop" onClick={OnClosePopup}>

                <div className="spin-popup-container">
                    {winningMultiplier !== null ? (
                        <div className="spin-popup-container-content">
                            <span className="spin-popup-message" style={{
                                color: winningMultiplier > 0 ? "green" : "rgb(210, 43, 43)",
                            }}>
                                {winningMultiplier > 0 ? "You Won" : "You Lost"}
                            </span>
                            <span className="spin-popup-header">
                              {(betAmount * winningMultiplier).toFixed(2)}ksh
                            </span>
                            <div className="spin-Mult=iplier">
                                <span>
                                        Multiplier
                                </span>
                                <span>
                                {winningMultiplier}X

                            </span>

                            </div>
                        </div>
                    ) : (
                        <p>Invalid calculation data.</p>
                    )}
                </div>
            </div>
        </>
    )
}

