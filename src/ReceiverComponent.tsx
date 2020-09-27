import React from "react";
import DescriptionComponent from "./DescriptionComponent";
import RtcStartComponent from "./RtcStartComponent";
import VideoComponent from "./VideoComponent";

class ReceiverComponent extends React.Component<
  {},
  { sdp: string | null; stream: MediaStream | null }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sdp: null,
      stream: null,
    };
  }

  render() {
    return (
      <>
        <DescriptionComponent mode="Receiver" />
        <RtcStartComponent
          mode="Receiver"
          onTrack={(event) => {
            console.log("onTrack", event);
            this.setState({
              stream: event.streams[0],
            });
          }}
        />
        <div>
          <VideoComponent stream={this.state.stream} />
        </div>
      </>
    );
  }
}

export default ReceiverComponent;
