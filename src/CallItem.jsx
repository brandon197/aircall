import React from "react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Badge } from "@mui/material";

import { DateTime } from "luxon";

import axios from "axios";
import { async } from "regenerator-runtime";

const CallItem = ({ obj, dialogSetter, fetchCalls }) => {
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

  return (
    <div style={{ display: "flex" }}>
      <ListItemButton onClick={() => dialogSetter(true)}>
        <ListItemAvatar>
          <Avatar>{/* <ImageIcon /> */}</Avatar>
        </ListItemAvatar>
        <Badge badgeContent={4} color="secondary">
          <ListItemText
            primary={obj.from}
            secondary={"tried to call " + obj.to}
          />
        </Badge>
        <div style={{ justifySelf: "end" }}>
          {DateTime.fromISO(obj.created_at).toFormat("t")}
        </div>
      </ListItemButton>
      <Button onClick={() => handleArchive(!obj.is_archived)}>
        {obj.is_archived ? "undo-Archive" : "Archive"}
      </Button>
    </div>
  );
};

export default CallItem;
