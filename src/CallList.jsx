import React, { useEffect, useState } from "react";

import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import "regenerator-runtime";

import { Button, ButtonGroup } from "@mui/material";

import axios from "axios";

import CallItem from "./CallItem.jsx";

const CallList = () => {
  const [list, setList] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
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
  async function fetchCall(id) {
    const res = await axios.get(
      `https://aircall-job.herokuapp.com/activities/${id}`
    );
    console.log(res.data);
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
        <div>
          <Dialog
            onClose={handleClose}
            open={showDialog}
            style={{ width: "100%" }}
          >
            <DialogTitle>Title</DialogTitle>
            <div>Hi</div>
          </Dialog>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {list.map((item, index) => (
              <CallItem
                dialogSetter={(e) => setShowDialog(e)}
                fetchCalls={() => fetchCalls()}
                key={index}
                obj={item}
              />
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default CallList;
