import {FC} from "react";
import CloseImage from "../assets/image/close (1).png"

interface HowToPlayProp {
    onClose: () => void;
}

export const HowToPlay: FC<HowToPlayProp> = ({onClose}) => {


    return (
            <div className="how-to-play-spin">
                {/* Header */}        <div className="how-to-play-spin-main">


                <div className="how-to-play-header-title">

                    <span>How To Play Spin 2 Win</span>
                    <img
                        style={{width: "26px", cursor: "pointer", marginLeft: "auto"}}
                        src={CloseImage}
                        onClick={onClose}
                        alt="Close"
                    />

                </div>
                <div className="how-to-play-content">
                    <ol>
                        <li><strong>Place Your Bet:</strong>
                            Decide how much you want to stake before spinning. You can choose from:
                            <ul>
                                <li><strong>Preset amounts:</strong> 5, 10, 50, 100 Ksh</li>
                                <li><strong>Custom bet:</strong> Enter your own stake manually (above 1 Ksh).</li>
                            </ul>
                            💡 <em>Tip:</em> The higher the bet, the higher the potential winnings — but also the higher the risk if you land on a losing segment.
                        </li>

                        <li><strong>Select Risk Level:</strong>
                            The wheel changes based on the risk level you choose:
                            <ul>
                                <li><strong>Low Risk:</strong>
                                    - More segments on the wheel (e.g., 32+).
                                    - Most multipliers are low (0.5×, 1×, 2×).
                                    - Safer gameplay, slower balance swings.
                                    - Perfect for <em>longer play sessions</em>.</li>
                                <li><strong>Medium Risk:</strong>
                                    - Balanced number of segments (e.g., 16–24).
                                    - Mixed multipliers (0×, 0.5×, 2×, 5×).
                                    - Balanced gameplay with a fair mix of wins and losses.</li>
                                <li><strong>High Risk:</strong>
                                    - Fewer segments (e.g., 8–12).
                                    - Contains big multipliers (10×, 20×, 50×+).
                                    - High chance of losing but massive rewards if you win.
                                    - Best for <em>thrill-seekers</em>.</li>
                            </ul>
                        </li>

                        <li><strong>Spin the Wheel:</strong>
                            Hit the <em>“Spin”</em> button and watch the wheel rotate.
                            - The wheel uses a <em>random outcome generator</em>.
                            - The arrow at the top marks the final result.
                            - Each spin is independent — previous results do not affect the next one.
                        </li>

                        <li><strong>Winning Multipliers:</strong>
                            Every wheel segment has a multiplier assigned.
                            <ul>
                                <li><strong>Example Multipliers:</strong> 0×, 0.5×, 1×, 2×, 5×, 10×, 20×, 50×</li>
                                <li>Your winnings = <strong>bet × multiplier</strong>.</li>
                            </ul>
                            🔎 <em>Example:</em>
                            - If you bet 50 Ksh and land on 5× → You win 250 Ksh.
                            - If you bet 50 Ksh and land on 0× → You lose your entire stake.
                        </li>

                        <li><strong>Results:</strong>
                            After the wheel stops:
                            <ul>
                                <li>If you land on <strong>0.5×</strong> → You lose half of your bet.</li>
                                <li>If you land on <strong>0×</strong> → You lose your full bet.</li>
                                <li>If you land on <strong>1×</strong> → You break even (no loss, no profit).</li>
                                <li>If you land on <strong>2× or more</strong> → You make a profit!</li>
                            </ul>
                        </li>

                        <li><strong>Special Features:</strong>
                            Some Spin-to-Win versions may include:
                            <ul>
                                <li><strong>Bonus Segments:</strong> Win free spins or double rewards.</li>
                                <li><strong>Jackpot Spot:</strong> A rare segment with a huge multiplier (e.g., 100× or 500×).</li>
                                <li><strong>Streak Wins:</strong> Consecutive winning spins may unlock bonus rewards.</li>
                            </ul>
                        </li>

                        <li><strong>Repeat & Play Responsibly:</strong>
                            You can continue playing as long as your balance allows.
                            - Always set a budget before starting.
                            - Higher risks can give massive wins but may also drain your balance quickly.
                            - Remember: <strong>Winning is based on luck</strong>, not skill.
                        </li>

                    </ol>

                    <p style={{marginTop:"10px"}}>
                        🎯 <em>Strategy Tip:</em> Higher risks can bring huge wins, but they can also empty your balance quickly.
                        Mix low and medium risks to stay in the game longer, and only use high risk when you’re comfortable with the chance of losing.
                        Always play responsibly and stick to your budget!
                    </p>

                </div>
            </div>
        </div>
    );
};
