import { FC } from "react";
import CloseImage from "../assets/image/close (1).png"

interface HowToPlayProp {
    onClose: () => void;
}

export const HowToPlay: FC<HowToPlayProp> = ({ onClose}) => {


    return (
        <div className="how-to-play">
            <img
                style={{width: "26px"}}
                src={CloseImage}
                onClick={onClose}
                alt="Close"
            />
            <div className="how-to-play-content">
                <h1>How to Play Spin 2 Win</h1>
                <ol>
                    <li>
                        <strong>Ensure Sufficient Funds:</strong> Before spinning the wheel, make sure you have enough
                        money in your account. The spin costs from 1ksh
                    </li>
                    <li>
                        <strong>Place Your Bet:</strong> The spin cost will be deducted from your balance when you
                        initiate a spin.
                    </li>
                    <li>
                        <strong>Spin the Wheel:</strong> Press the <em>"BET"</em> button to start spinning the wheel.
                        The wheel will spin and stop on your winning segment
                    </li>
                    <li>
                        <strong>Winning Multipliers:</strong> Each segment of the wheel has a multiplier (e.g., x0.5, x1.00, x2.00).
                        If the wheel lands on a segment, the corresponding multiplier will determine your winnings.
                    </li>
                    <li>
                        <strong>Results:</strong> The winning multiplier will be applied to your bet amount. Your balance will
                        be updated with your winnings or deductions.
                    </li>
                    <li>
                        <strong>Repeat:</strong> You can keep spinning as long as you have enough funds in your account.
                        Play strategically to maximize your winnings!
                    </li>
                </ol>
                <p>
                    If you have any questions or issues, please refer to the help section or contact support.
                </p>
            </div>
        </div>
    );
};
