// Type for each color occurrence
export type ColorOccurrence = {
    id: number;
    color: string;
    positions: number[];
    multiplier: number;
};
// The settings type with a flexible structure
export type Settings = {
    showDropdown: boolean;
    showHelpOverlay: boolean;
    betAmount: number;
    isMuted: boolean ;
};

 export const colorOccurrences = [
    { id: 1, color: 'red', positions: [1, 3, 7, 11, 14], multiplier: 0.00 },
    { id: 2, color: 'blue', positions: [5, 8, 17, 20], multiplier: 0.50 },
    { id: 3, color: 'green', positions: [6, 12, 16], multiplier: 1.00},
    { id: 4, color: 'indigo', positions: [4, 9, 13], multiplier: 1.20},
    { id: 5, color: 'DarkMagenta', positions: [2, 19], multiplier: 1.50 },
    { id: 6, color: 'DodgerBlue', positions: [10, 15], multiplier: 1.75 },
    { id: 7, color: 'orange', positions: [18], multiplier: 2.00 },
];
export const colorOccurrencesHigh: ColorOccurrence[] = [
    { id: 1, color: 'red', positions: [1, 2, 3, 7, 5, 4,], multiplier: 0.0 },
    { id: 6, color: 'blue', positions: [6], multiplier: 2.00 },
];
export const colorOccurrencesLow: ColorOccurrence[] = [
    { id: 1, color: 'red', positions: [1, 3, 7, 11, 14,], multiplier: 0.00 },
    { id: 2, color: 'blue', positions: [5, 8, 9,13 ], multiplier: 1.00 },
    { id: 3, color: 'green', positions: [2, 4, 6, 10, 12, ], multiplier: 2.00 },
];

export const getAdjustedColorOccurrences = (
    riskLevel: string
    // numSegments: number
): ColorOccurrence[] => {
    const riskLevelColorMap: { [key: string]: string[] } = {
        //14
        low: ['red', 'blue', 'green'],
        //20
        medium: ['red', 'blue', 'green', 'indigo', 'DarkMagenta', 'DodgerBlue', 'orange'],
        //7
        high: ['red', 'blue'],
    };
    const allowedColors = riskLevelColorMap[riskLevel] || [];
    // Filter color occurrences based on allowed colors
    let filteredOccurrences = colorOccurrences.filter((occurrence) =>
        allowedColors.includes(occurrence.color)
    );
    if(riskLevel==="high"){
        filteredOccurrences = colorOccurrencesHigh.filter((occurrence) =>
            allowedColors.includes(occurrence.color)
        );
    }
    if(riskLevel==="low"){
        filteredOccurrences = colorOccurrencesLow.filter((occurrence) =>
            allowedColors.includes(occurrence.color)
        );
    }
    return filteredOccurrences.filter(({ positions }) => positions.length > 0);
};
