import React from "react";

export class VideoComponent extends React.Component<{
  stream: any;
}> {
  private video: HTMLVideoElement | null = null;
  componentDidMount() {
    this.update();
  }
  componentDidUpdate() {
    this.update();
  }

  update() {
    console.log("update");
    if (this.video && this.props.stream) {
      this.video.srcObject = this.props.stream;
    }
  }

  render() {
    return (
      <video
        autoPlay={true}
        onLoadedMetadata={(e) => {
          console.log(e);
          (e.target as HTMLMediaElement).play();
        }}
        ref={(e) => {
          this.video = e;
        }}
      ></video>
    );
  }
}

export default VideoComponent;
