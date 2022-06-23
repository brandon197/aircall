import React, { useState } from "react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Badge } from "@mui/material";

import { DateTime } from "luxon";

// import ImageIcon from '@mui/icons-material/Image';
// import WorkIcon from '@mui/icons-material/Work';
// import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const CallItem = (props) => {
    const [isArchived, setIsArchived] = useState(props.obj.is_archived);
    


  return (
      <ListItemButton style={{display:'flex'}}>
        <ListItemAvatar>
          <Avatar>{/* <ImageIcon /> */}</Avatar>
        </ListItemAvatar>
        <Badge badgeContent={4} color="secondary">
          <ListItemText
            primary={props.obj.from}
            secondary={"tried to call " + props.obj.to}
          />
        </Badge>
        <div style={{justifySelf:'end'}}>{DateTime.fromISO(props.obj.created_at).toFormat("t")}</div>
      </ListItemButton>
  );
};

export default CallItem;
