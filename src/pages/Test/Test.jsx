import React, { useRef, useEffect } from 'react';

const AudioPlayer = ({
    audioSrc = 'http://localhost:8080/api/v1/song/audio/1',
}) => {
    const audioRef = useRef();

    useEffect(() => {
        const audio = audioRef.current;

        const handleCanPlay = () => {
            // When enough data is available to play
            audio.play();
        };

        const handleEnded = () => {
            // Handle what should happen when audio playback ends
        };

        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('ended', handleEnded);

        // Handle cleanup when the component unmounts
        return () => {
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    return (
        <div>
            <audio controls preload="auto" ref={audioRef}>
                <source src={audioSrc} type="audio/mp3" />
            </audio>
        </div>
    );
};

export default AudioPlayer;
