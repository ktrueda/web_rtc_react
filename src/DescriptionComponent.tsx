import React from "react";
import { Mode } from "./App";
import styles from "./RtcSample.module.css";

type Props = {
  mode: Mode;
};

const DescriptionComponent: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.Description}>
      <h2>How to start</h2>
      <ol>
        <li>
          [Transmitter] Click create button to create Transmitter SDP(Our SDP).
        </li>
        <li>
          [Transmitter] Copy Transmitter SDP and sending it to Receiver via
          email,slack etc.
        </li>
        <li>
          [Receiver] Receive Transmitter SDP, and paste it to There SDP textarea
          and click receive button.
        </li>
        <li>
          [Receiver] Copy Receiver SDP(Our SDP) and sending it to Transmitter
          via email, slack etc.
        </li>
        <li>
          [Transmitter] Receive Receiver SDP, and paste it to There SDP textarea
          and click receive button.
        </li>
        <li>Tha's all. You can see their video.</li>
      </ol>
    </div>
  );
};

export default DescriptionComponent;
