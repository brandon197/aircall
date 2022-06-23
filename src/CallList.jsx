import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import "regenerator-runtime";

import { Button, ButtonGroup } from "@mui/material";

import axios from "axios";

import CallItem from "./CallItem.jsx";

const CallList = () => {
  const [list, setList] = useState([]);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    async function fetchCalls() {
      const res = await axios.get(
        "https://aircall-job.herokuapp.com/activities"
      );
      console.log(res.data);

      setList(res.data.filter((e) => e.is_archived == showArchived));
    }
    fetchCalls();
  }, [showArchived]);

  return (
    <div className="main">
          <ButtonGroup style={{ display: 'flex', justifyContent:'center'}} variant="text" aria-label="text button group">
        <Button color="success" onClick={() => setShowArchived(false)}>
          Call History
        </Button>
        <Button color="warning" onClick={() => setShowArchived(true)}>
          Archived
        </Button>
      </ButtonGroup>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {list.map((item, index) => (
          <CallItem key={index} obj={item} />
        ))}
      </List>
    </div>
  );
};

export default CallList;
