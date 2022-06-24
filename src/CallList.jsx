import React, { useEffect, useState } from "react";

import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import "regenerator-runtime";

import { Button, ButtonGroup } from "@mui/material";

import axios from "axios";

import CallItem from "./CallItem.jsx";
import CallDetail from "./CallDetail.jsx";

const CallList = () => {
  const [list, setList] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [selectedId, setSelectedID] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShowDialog(false);
  };

  async function fetchCalls() {
    setLoading(true);
    const res = await axios.get("https://aircall-job.herokuapp.com/activities");
    console.log(res.data);

    setList(res.data.filter((e) => e.is_archived == showArchived));
    setLoading(false);
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
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "grey",
          }}
        >
          No items to Display
        </div>
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper", pt: 0 }}>
          {list.map((item, index) => (
            <div>
              {/* <hr /> */}
              <CallItem
                dialogSetter={(e) => setShowDialog(e)}
                currentId={(e) => setSelectedID(e)}
                fetchCalls={() => fetchCalls()}
                key={index}
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
