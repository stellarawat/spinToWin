import {useCallback, useEffect, useMemo} from "react";
import betSndSrc from '../audio/bet.DUx2OBl3.mp3';
import spinningSnd from '../audio/Plastic Spin.mp3';
import backgroundSnd from '../audio/Explainer_Video_Music_Full_The_Win_Minimal.mp3';
import LoseSndSrc from '../audio/Bonus Lost.mp3';
import gameWinSnd from '../audio/Game Win.mp3';

export const useNewSpinAudio = (isMuted: boolean, loop: boolean) => {
    const SpinAudioInstances = useMemo(() => {
        return {
            SpinSnd: new Audio(spinningSnd),
            WinSnd: new Audio(gameWinSnd),
            LoseSnd: new Audio(LoseSndSrc),
            BetSnd: new Audio(betSndSrc),
        };
    }, []);

    const SpinBackgroundSound = useMemo(() => {
        const bgSound = new Audio(backgroundSnd);
        bgSound.loop = loop;
        bgSound.volume = 0.4;
        return bgSound;
    }, [loop]);

    useEffect(() => {
        if (!isMuted) {
            SpinBackgroundSound.play().catch((err) => {
                if (err.name === 'NotAllowedError') {
                    console.warn('User interaction required for audio playback.');
                } else {
                    // console.error('Audio playback error:', err);
                }
            });
        }

        return () => {
            SpinBackgroundSound.pause();
            SpinBackgroundSound.currentTime = 0;
        };
    }, [SpinBackgroundSound, isMuted]);

    const playSpinLoop = useCallback(() => {
        if (isMuted) return;

        const shuffleSound = SpinAudioInstances.SpinSnd;
        shuffleSound.currentTime = 0;
        // shuffleSound.volume= 10;
        shuffleSound.play().then(() => {
            shuffleSound.currentTime = 0;
        });

        const interval = setInterval(() => {
            shuffleSound.currentTime = 0;
            shuffleSound.play().then(() => {
                console.log("error", shuffleSound.currentTime);
            });
        }, shuffleSound.duration * 1000);

        setTimeout(() => {
            clearInterval(interval);
            shuffleSound.pause();
            shuffleSound.currentTime = 0;
        }, 4200);
    }, [SpinAudioInstances.SpinSnd, isMuted]);

    const playSpinSound = useCallback(
        (soundKey: keyof typeof SpinAudioInstances) => {
            if (isMuted) return;

            const sound = SpinAudioInstances[soundKey];
            if (!sound.paused) {
                sound.pause();
                sound.currentTime = 0;
            }
            sound.play().catch((err) => {
                if (err.name === 'NotAllowedError') {
                    // console.warn('User interaction required for audio playback.');
                } else {
                    // console.error('Audio playback error:', err);
                }
            });
        },
        [SpinAudioInstances, isMuted]
    );
    return {playSpinSound,playSpinLoop};
};