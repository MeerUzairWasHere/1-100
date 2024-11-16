import { useEffect, useRef, useState } from "react";

export const Receiver: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "receiver",
        })
      );
    };

    startReceiving(socket);
  }, []);

  function startReceiving(socket: WebSocket) {
    const pc = new RTCPeerConnection();

    pc.ontrack = (event: RTCTrackEvent) => {
      if (videoRef.current) {
        videoRef.current.srcObject = new MediaStream([event.track]);
        // Delay playing until user interaction
        setIsReadyToPlay(true);
      }
    };

    socket.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === "createOffer") {
        pc.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(
          () => {
            pc.createAnswer().then((answer) => {
              pc.setLocalDescription(answer);
              socket.send(
                JSON.stringify({
                  type: "createAnswer",
                  sdp: answer,
                })
              );
            });
          }
        );
      } else if (message.type === "iceCandidate") {
        pc.addIceCandidate(new RTCIceCandidate(message.candidate));
      }
    };
  }

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Playback failed:", error);
      });
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay={false} playsInline controls></video>
      {isReadyToPlay && <button onClick={handlePlay}>Start Video</button>}
    </div>
  );
};
