import React from "react";
import DescriptionComponent from "./DescriptionComponent";
import RtcStartComponent from "./RtcStartComponent";
import VideoComponent from "./VideoComponent";

class TransmitterComponent extends React.Component<
  {},
  { stream: MediaStream | null; sdp: string | undefined }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      stream: null,
      sdp: undefined,
    };
  }
  componentDidMount() {
    const getUserMedia = navigator.getUserMedia.bind(navigator);

    if (getUserMedia) {
      getUserMedia(
        { audio: false, video: { width: 1280, height: 720 } },
        this.handleVideo.bind(this),
        function (err) {
          console.log("The following error occurred: " + err.name);
        }
      );
    } else {
      console.log("getUserMedia not supported");
    }
  }

  handleVideo(stream: MediaStream) {
    this.setState({ stream: stream });

    const videoTracks = stream.getVideoTracks();
    const audioTracks = stream.getAudioTracks();

    if (videoTracks.length > 0) {
      console.log(`Using video device: ${videoTracks[0].label}`);
    }
    if (audioTracks.length > 0) {
      console.log(`Using audio device: ${audioTracks[0].label}`);
    }
  }
  render() {
    return (
      <>
        <DescriptionComponent mode="Transmitter" />
        <RtcStartComponent
          mode={"Transmitter"}
          onStart={(pc) => {
            console.log("send start");
            // pc.addStream();
            this.state.stream!.getTracks().forEach((track) => {
              console.log("add track", track, this.state.stream);
              pc.addTrack(track, this.state.stream!);
            });
          }}
        />
        <VideoComponent stream={this.state.stream} />
      </>
    );
  }
}

export default TransmitterComponent;
