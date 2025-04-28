import { useState, useEffect } from 'react';
import { getAdjustedColorOccurrences, ColorOccurrence } from '../Utils/type';

const useImageData = (riskLevel: string, numSegments: number) => {
    const [wheelData, setWheelData] = useState<{ id: number; color: string;  multiplier: number | null; }[]>([]);

    useEffect(() => {
        const adjustedColorOccurrences: ColorOccurrence[] = getAdjustedColorOccurrences(riskLevel, numSegments);

        const segments = adjustedColorOccurrences.flatMap(({ color, positions, multiplier }) =>
            positions.map((id) => ({ id, color, multiplier }))
        );

        setWheelData(segments);
    }, [riskLevel, numSegments]);

    return wheelData;
};

export default useImageData;