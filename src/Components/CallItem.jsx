import React, { useState } from "react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Collapse } from "@mui/material";

import { MoreVert } from "@mui/icons-material";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import VoicemailIcon from "@mui/icons-material/Voicemail";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import CallMadeIcon from "@mui/icons-material/CallMade";

import { DateTime } from "luxon";

import axios from "axios";

const CallItem = ({ obj, dialogSetter, currentId, fetchCalls }) => {
  const [collapseToggle, setCollapseToggle] = useState(false);
  const handleArchive = async (toggle) => {
    try {
      const res = await axios.post(
        `https://aircall-job.herokuapp.com/activities/${obj.id}`,
        { is_archived: toggle }
      );
      fetchCalls();
    } catch (e) {
      console.log(e);
    }
  };
  const handleDialogToggle = () => {
    dialogSetter(true);
    currentId(obj);
  };
  const handleCollapse = () => {
    setCollapseToggle(!collapseToggle);
  };

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

  return (
    <div id="call-item">
      <div style={{ display: "flex" }}>
        <ListItemButton dense={true} onClick={() => handleDialogToggle()}>
          <ListItemAvatar>
            <Avatar>{setIcon()}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={obj.from}
            secondary={"tried to call " + obj.to}
          />
          <div style={{ justifySelf: "end" }}>
            {DateTime.fromISO(obj.created_at).toFormat("t")}
          </div>
        </ListItemButton>
        <IconButton sx={{ p: 0 }} onClick={() => handleCollapse()}>
          <MoreVert />
        </IconButton>
      </div>
      <Collapse
        in={collapseToggle}
        style={{ alignSelf: "center", textAlign: "center" }}
      >
        <Button onClick={() => handleArchive(!obj.is_archived)}>
          {obj.is_archived ? "undo-Archive" : "Archive"}
        </Button>
      </Collapse>
    </div>
  );
};

export default CallItem;
