import { useEffect, useMemo, useRef} from 'react';
import betSnd from '../audio/bet.DUx2OBl3.mp3';
import spinningSnd from '../audio/Plastic Spin.mp3';
import backgroundSnd from '../audio/Explainer_Video_Music_Full_The_Win_Minimal.mp3';
import lostSnd from '../audio/Bonus Lost.mp3';
import gameWinSnd from '../audio/Game Win.mp3';

export const useSpinSound = (mute: boolean, loop: boolean) => {
    const soundsRef = useRef<{ [key: string]: HTMLAudioElement }>({});
    const soundFiles = useMemo(() => ({
        background: backgroundSnd,
        win: gameWinSnd,
        lost: lostSnd,
        bet: betSnd,
        spinning: spinningSnd
    }), []);

    // Handle background music
    useEffect(() => {
        const audio = new Audio(soundFiles.background);
        audio.loop = loop;
        audio.volume = mute ? 0 : 0.1;
        soundsRef.current.background = audio;
        // Try to play audio immediately
        const tryPlayAudio = () => {
            audio.play().catch(() => {
                // console.log("Autoplay blocked, waiting for user interaction...");
                // Add an event listener to handle user interaction
                const handleUserInteraction = () => {
                    audio.play().catch(err => console.log("Failed to play on user interaction", err));
                    document.removeEventListener("click", handleUserInteraction); // Remove after successful interaction
                };
                document.addEventListener("click", handleUserInteraction);
            });
        };

        // Try to play on mount
        tryPlayAudio();

        // Cleanup on unmount
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [mute, loop, soundFiles]);

    // Function to play specific sound
    const playSound = (soundName: "win" | "lost" | "spinning"| "bet") => {
        const sound = new Audio(soundFiles[soundName]);
        sound.volume = mute ? 0 : 0.1;
        sound.play().catch(e => console.error("", e));
    };

    return { playSound };
};

