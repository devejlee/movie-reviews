import React from 'react';
import { useMachine } from '@xstate/react'
import { videoPlayerMachine } from '../machines/videoPlayerMachine'

const VideoPlayer = () => {
  const videoElement = React.useRef<HTMLVideoElement>(null);
  const [state, send] = useMachine(videoPlayerMachine, {
    actions: {
      playVideo: () => videoElement.current?.play(),
      pauseVideo: () => videoElement.current?.pause(),
      resetVideo: () => {
        const video = videoElement.current;
        if (video) {
          video.pause();
          video.currentTime = 0;
          video.play();
        }
      },
      stopVideo: () => {
        const video = videoElement.current;
        if (video) {
          video.pause();
          video.currentTime = videoElement.current.duration;
        }
      }
    }
  });

  const isPlaying = () => state.matches({ ready: "playing" });
  const isPaused = () => state.matches({ ready: "paused" });
  const isReady = () => state.matches("ready");
  const isStoped = () => state.matches({ ready: "ended" });
  console.log(state.value);
  return (
    <>
      <video
        src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_30mb.mp4"
        width={360}
        onCanPlay={() => send("SUCCESS")}
        onError={() => send("FAILED")}
        ref={videoElement}
      >
        <track kind="captions" />
      </video>
      <br />

      <button
        onClick={() => {
          send("PLAY");
        }}
        disabled={isPlaying()}
      >
        Play
      </button>

      <button onClick={() => send("PAUSE")} disabled={isPaused() || isStoped()}>
        Pause
      </button>

      <button onClick={() => send("RESET")} disabled={!isReady()}>
        Reset
      </button>

      <button onClick={() => send("END")} disabled={!isReady()}>
        Stop
      </button>
    </>
  );
};

export default VideoPlayer