import {FC} from "react";
import {colorOccurrences, colorOccurrencesHigh, colorOccurrencesLow} from "../Utils/type.ts";

interface MultiplierCardsProps {
    riskLevel: string;
    winningMultiplier: number | null;
    isSpinning: boolean;
}

export const MultiplierCards: FC<MultiplierCardsProps> = ({
                                                              riskLevel,
                                                              winningMultiplier,
                                                              isSpinning,
                                                          }) => {
    const riskLevelColorMap: { [key: string]: string[] } = {
        low: ['red', 'blue', 'green'],
        medium: ['red', 'blue', 'green', 'indigo', 'DarkMagenta', 'DodgerBlue', 'orange'],
        high: ['red', 'blue'],
    };
    const selectedColorOccurrences = riskLevel === "low"
        ? colorOccurrencesLow
        : riskLevel === "high"
            ? colorOccurrencesHigh
            : colorOccurrences;
    return (
        <div className="spin-multiply-cards">
            {selectedColorOccurrences
                .filter(item => riskLevelColorMap[riskLevel].includes(item.color))
                .map((item, index) => {
                    const isWinningCard = item.multiplier === winningMultiplier;
                    return (
                        <div
                            key={index}
                            className={`spin-multiply-card card-${index} ${isSpinning ? "" : isWinningCard ? "highlighted" : ""}`}
                        >
                            <span className="multiplier-value">{item.multiplier}×</span>
                        </div>
                    );
                })}
        </div>
    );
};

