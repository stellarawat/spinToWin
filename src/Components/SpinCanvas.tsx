import {FC, useEffect, useRef} from 'react';
import useImageData from '../Hooks/useImageData.ts';
import pointerImg from '../assets/image/fortune-wheel-arrow.webp';
import centerImg from '../assets/image/fortune-wheel-btn-red.webp';

interface SpinCanvasProps {
    riskLevel: string;
    spinState: number | null;
    winningKey: number | null;
    numSegments: number;
}

const SpinCanvas: FC<SpinCanvasProps> = ({numSegments, riskLevel, spinState, winningKey}) => {
    const wheelCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const centerCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const pointerCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasSize = 300;
    const center = canvasSize / 2;
    const radius = center - 12;
    const segmentAngle = 360 / numSegments;
    const wheelData = useImageData(riskLevel, numSegments);

    useEffect(() => {
        const canvas = wheelCanvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        wheelData.forEach(({color, id}) => {
            const startAngle = ((id - 1) * segmentAngle * Math.PI) / 180;
            const endAngle = startAngle + (segmentAngle * Math.PI) / 180;

            const gradient = ctx.createRadialGradient(center, center, radius * 0.8, center, center, radius);
            gradient.addColorStop(0, color || 'gray');
            gradient.addColorStop(1, '#000');

            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.arc(center, center, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();
        });

        const outerGradient = ctx.createLinearGradient(0, 0, canvasSize, canvasSize);
        outerGradient.addColorStop(0, '#F9E898');
        outerGradient.addColorStop(0.5, '#FF8C00');
        outerGradient.addColorStop(1, '#F9E898');

        ctx.beginPath();
        ctx.arc(center, center, radius + 5, 0, 2 * Math.PI);
        ctx.lineWidth = 12;
        ctx.strokeStyle = outerGradient;
        ctx.stroke();

        const dotRadius = 6;
        const dotInnerRadius = 3;
        for (let i = 0; i < numSegments; i++) {
            const angle = (i * segmentAngle * Math.PI) / 180;
            const dotX = center + (radius + 8) * Math.cos(angle);
            const dotY = center + (radius + 8) * Math.sin(angle);

            ctx.beginPath();
            ctx.arc(dotX, dotY, dotRadius, 0, 2 * Math.PI);
            ctx.fillStyle = '#000';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(dotX, dotY, dotInnerRadius, 0, 2 * Math.PI);
            ctx.fillStyle = '#c0c0c0';
            ctx.fill();
        }
    }, [wheelData, segmentAngle, center, radius, numSegments, winningKey]);

    useEffect(() => {
        const canvas = centerCanvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;

        const image = new Image();
        image.src = centerImg;
        image.onload = () => {
            ctx.clearRect(0, 0, canvasSize, canvasSize);
            const imageSize = radius * 0.9;
            ctx.drawImage(image, center - imageSize / 2, center - imageSize / 2, imageSize, imageSize);
        };
    }, [center, radius]);

    useEffect(() => {
        const canvas = pointerCanvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;

        const image = new Image();
        image.src = pointerImg;
        image.onload = () => {
            ctx.clearRect(0, 0, canvasSize, canvasSize);

            const pointerWidth = 30;
            const pointerHeight = 40;

            const pointerX = center - pointerWidth / 2;
            const pointerY = 0;

            ctx.drawImage(image, pointerX, pointerY, pointerWidth, pointerHeight);
        };
    }, [canvasSize, center]);

    return (
        <div className='spin-canvas' style={{position: 'relative'}}>

            <canvas
                ref={wheelCanvasRef}
                width={canvasSize}
                height={canvasSize}
                style={{
                    transform: `rotate(${spinState}deg)`,
                    transition: spinState ? 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
                }}
            />
            <canvas
                className="canvas-images"
                ref={centerCanvasRef}
                height={canvasSize}
            />
            <canvas
                className="canvas-images"
                ref={pointerCanvasRef}
                height={canvasSize}
            />
        </div>
    );
};

export default SpinCanvas;
