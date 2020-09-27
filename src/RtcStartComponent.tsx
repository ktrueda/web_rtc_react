import React from "react";
import { makeNewConnection } from "./RtcUtil";
import styles from "./RtcSample.module.css";
import { Mode } from "./App";

type Props = {
  mode: Mode;
  onStart?: (pc: RTCPeerConnection) => void;
  onTrack?: (event: RTCTrackEvent) => void;
};

type State = {
  ourSdp: string | undefined;
  thereSdp: string | undefined;
  pc: RTCPeerConnection | null;
};

const isCreateBtnEnabled = (mode: Mode, state: State) => {
  switch (mode) {
    case "Transmitter":
      return state.ourSdp === undefined && state.pc !== undefined;
    case "Receiver":
      return false;
  }
};

const isReceiveBtnEnabled = (mode: Mode, state: State) => {
  switch (mode) {
    case "Transmitter":
      return state.ourSdp !== undefined && state.pc !== undefined;
    case "Receiver":
      return state.pc !== undefined;
  }
};

class RtcStartComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ourSdp: undefined,
      thereSdp: undefined,
      pc: null,
    };
  }

  render() {
    return (
      <div className={styles.RtcStartComponentContainer}>
        <div className={styles.Sdps}>
          <div>
            <p>Our SDP</p>
            <div>
              <textarea
                readOnly={true}
                placeholder="Out SDP (click button below to create)"
                value={this.state.ourSdp}
              />
            </div>
            <button
              disabled={!isCreateBtnEnabled(this.props.mode, this.state)}
              onClick={() => {
                const pc = makeNewConnection((sdp) => {
                  this.setState({ ourSdp: sdp });
                });
                if (this.props.onStart) {
                  this.props.onStart(pc);
                }
                pc.createOffer().then((desc) => {
                  console.log(desc);
                  pc.setLocalDescription(desc);
                });
                this.setState({
                  pc: pc,
                });
              }}
            >
              create
            </button>
          </div>
          <div>
            <div>
              <p>Their SDP</p>
              <textarea
                placeholder="There SDP(click button below to receive)"
                onChange={(e) => {
                  this.setState({ thereSdp: e.target.value });
                }}
              />
            </div>
            <button
              disabled={!isReceiveBtnEnabled(this.props.mode, this.state)}
              onClick={() => {
                if (this.state.pc) {
                  this.state.pc
                    .setRemoteDescription(
                      new RTCSessionDescription({
                        type: "answer",
                        sdp: this.state.thereSdp,
                      })
                    )
                    .then(function () {
                      console.log(
                        "setRemoteDescription(answer) succsess in promise"
                      );
                    })
                    .catch(function (err) {
                      console.error(
                        "setRemoteDescription(answer) ERROR: ",
                        err
                      );
                    });
                } else {
                  const pc = makeNewConnection((sdp) => {
                    this.setState({ ourSdp: sdp });
                  }, this.props.onTrack);
                  pc.setRemoteDescription(
                    new RTCSessionDescription({
                      type: "offer",
                      sdp: this.state.thereSdp!,
                    })
                  )
                    .then(function () {
                      console.log(
                        "setRemoteDescription(answer) succsess in promise"
                      );
                    })
                    .catch(function (err) {
                      console.error(
                        "setRemoteDescription(answer) ERROR: ",
                        err
                      );
                    });
                  pc.createAnswer()
                    .then((sessionDescription) => {
                      console.log(
                        "createAnswer() succsess in promise",
                        sessionDescription
                      );
                      return pc.setLocalDescription(sessionDescription);
                    })
                    .then(function () {
                      console.log("setLocalDescription() succsess in promise");
                    })
                    .catch(function (err) {
                      console.error(err);
                    });
                  this.setState({ pc: pc });
                }
              }}
            >
              receive
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RtcStartComponent;
