export const makeNewConnection = (
  setSdp: (sdp: string) => void,
  onTrack?: (event: RTCTrackEvent) => void
) => {
  const pc = new RTCPeerConnection({ iceServers: [] });
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      console.log("onicecandidate", event.candidate);
    } else {
      // empty ice event. it means that we can complete SDP.
      console.log("empty ice event");
      setSdp(pc.localDescription!.sdp);
    }
  };
  if (onTrack) {
    pc.ontrack = onTrack;
  }

  return pc;
};
