import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTime } from "luxon";

import CallReceivedIcon from "@mui/icons-material/CallReceived";
import VoicemailIcon from "@mui/icons-material/Voicemail";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import CallMadeIcon from "@mui/icons-material/CallMade";

import axios from "axios";

const CallDetail = ({ obj }) => {
  const setIcon = () => {
    if (obj.direction == "inbound" && obj.call_type == "answered") {
      return <CallReceivedIcon />;
    } else if (obj.direction == "inbound" && obj.call_type == "voicemail") {
      return <VoicemailIcon />;
    } else if (obj.direction == "outbound" && obj.call_type == "missed") {
      return <CallMissedIcon />;
    } else if (obj.direction == "outbound" && obj.call_type == "answered") {
      return <CallMadeIcon />;
    }
  };

  const calculateDuration = () => {
    let sec = obj.duration;
    let mins = Math.trunc(sec / 60);
    let seconds = (sec - Math.floor(sec)) * 60;

    return `${mins} Minutes ${
      seconds > 0 ? "and " + seconds + " seconds" : ""
    }`;
  };
  return (
    <Card sx={{ width: "auto", p: 2 }}>
      <DialogTitle style={{ textAlign: "center" }}>{obj.from}</DialogTitle>
      <li style={{ textAlign: "center" }}>
        {obj.direction} call for {calculateDuration()}
      </li>
      <hr />
      <ul>
        <li>Call to: {obj.to}</li>
        <li>AirCall: {obj.via}</li>
      </ul>
      <div
        style={{
          paddingTop: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ marginRight: "10px" }}>{setIcon()}</div>
        {obj.call_type} on {DateTime.fromISO(obj.created_at).toFormat("ff")}
      </div>
    </Card>
  );
};

export default CallDetail;
