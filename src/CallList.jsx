import React, { useEffect, useState } from "react";

import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import { Button, ButtonGroup } from "@mui/material";

import "regenerator-runtime";
import axios from "axios";

import CallItem from "./CallItem.jsx";
import CallDetail from "./CallDetail.jsx";

const CallList = () => {
  const [list, setList] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [selectedId, setSelectedID] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleClose = () => {
    setShowDialog(false);
  };

  async function fetchCalls() {
    const res = await axios.get("https://aircall-job.herokuapp.com/activities");
    console.log(res.data);
    setList(
      res.data
        .sort((a, b) =>
          a.created_at < b.created_at ? 1 : b.created_at < a.created_at ? -1 : 0
        )
        .filter((e) => e.is_archived == showArchived)
    );
  }

  useEffect(() => {
    fetchCalls();
  }, [showArchived]);

  return (
    <div className="main">
      <ButtonGroup
        style={{ display: "flex", justifyContent: "center" }}
        variant="text"
        aria-label="text button group"
        sx={{ my: 1 }}
      >
        <Button color="success" onClick={() => setShowArchived(false)}>
          Call History
        </Button>
        <Button color="warning" onClick={() => setShowArchived(true)}>
          Archived
        </Button>
      </ButtonGroup>
      <Dialog onClose={() => handleClose()} open={showDialog}>
        <CallDetail obj={selectedId} />
      </Dialog>
      {list.length < 1 ? (
        <div id="default-banner">No items to Display</div>
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper", pt: 0 }}>
          {list.map((item, index) => (
            <div>
              <Divider />
              <CallItem
                key={index}
                dialogSetter={(e) => setShowDialog(e)}
                currentId={(e) => setSelectedID(e)}
                fetchCalls={() => fetchCalls()}
                obj={item}
              />
            </div>
          ))}
        </List>
      )}
    </div>
  );
};

export default CallList;
