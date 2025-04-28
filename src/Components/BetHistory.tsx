import { useState } from "react";
import { dummyBetHistory } from "../Lib/constrains.ts";

const BetHistory = () => {
    const [historyLevel, setHistoryLevel] = useState<number>(5);
    const displayedHistory = dummyBetHistory.slice(0, historyLevel);

    return (
        <>
            <div className="spin-history-dropdown-container">
                <div className="spin-history-select-name">History table</div>
                {/* Change div to select */}
                <select
                    id="history-select"
                    className="spin-history-select"
                    value={historyLevel}
                    onChange={(e) => setHistoryLevel(Number(e.target.value))}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="spin-history-dropdown">
                <table className="spin-history-table">
                    <thead>
                    <tr>
                        <th>Bet Amount</th>
                        <th>Multiplier</th>
                        <th>Outcome</th>
                    </tr>
                    </thead>
                    <tbody className="spin-history-tbody">
                    {displayedHistory.map((bet, index) => (
                        <tr key={index}>
                            <td>{bet.betAmount}</td>
                            <td>{bet.multiplier}x</td>
                            <td className={bet.outcome === "Win" ? "win" : "loss"}>
                                {bet.outcome}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default BetHistory;
