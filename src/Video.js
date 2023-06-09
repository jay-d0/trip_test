import ReactPlayer from 'react-player/lazy';
import {useState, useRef} from "react";
import './index.css'

const VideoPlayer = ({ title, vodPlaylistId }) => {
    const [playIndex, setPlayIndex] = useState(0);
    const playerRef = useRef();

    const playList = [
    //     {index:1, url: 'https://www.youtube.com/watch?v=z1LY5R8vvW0'}
        {index:1, url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
    ];

    if(playList === null) return <p>Loading...</p>;

    return (
        <>
            <h2>Player Test</h2>
            <div className = "video-player-container" >
            <ReactPlayer
                // @ts-ignore
                ref={playerRef}
                // @ts-ignore
                url={playList[playIndex].url + "#t=1,5"}
                playing
                controls
                muted
                progressInterval={1000}
                pip={true}
                width={'100%'}
                height={'100%'}
            />
            </div>
        </>
    )
}

export default VideoPlayer;