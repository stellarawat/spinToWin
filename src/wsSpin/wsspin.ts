import {useCallback, useRef} from 'react';

import {sendSpinData} from "../Utils/wssData.ts";

export const useSpinWs = () => {
    const messageQueueSpin = useRef<(sendSpinData)[]>([]);
    const wsSpin = useRef<WebSocket | null>(null);

    const connectSocketSpin = useCallback(() => {
        if (wsSpin.current && wsSpin.current.readyState !== WebSocket.CLOSED) {
            // console.log('WebSocket connected');
            return;
        }
        wsSpin.current = new WebSocket('wss://lottomotto.co.ke/ws11');

        wsSpin.current.onopen = () => {
            // console.log('WebSocket connection established');
            processMessageQueueSpin();
        };

        const processMessageQueueSpin = () => {
            while (messageQueueSpin.current.length > 0) {
                const data = messageQueueSpin.current.shift();
                if (data) {
                    sendDataSpin(data);
                }
            }
        };

        wsSpin.current.onmessage = (event: MessageEvent<string>) => {
            // console.log('Received a raw message event:', event);

            if (event && event.data) {
                // console.log('Raw message data:', event.data);


            } else {
                // console.error('Event or event.data is null');
            }
        };

        wsSpin.current.onerror = () => {
            // console.error('WebSocket error observed:', error);
        };

        wsSpin.current.onclose = () => {
            // console.log('WebSocket connection closed');
        };
    }, []);

    const sendDataSpin = (data: sendSpinData) => {
        const message = JSON.stringify(data);

        if (wsSpin.current && wsSpin.current.readyState === WebSocket.OPEN) {
            wsSpin.current.send(message);
            // console.log('Message sent:', message);
        } else {
            messageQueueSpin.current.push(data);
            // console.error('WebSocket is not open. Message queued.');
        }
    };

    const getSocketSpin = () => wsSpin.current;

    return {
        connectSocketSpin,
        sendDataSpin,
        getSocketSpin,
    };
};