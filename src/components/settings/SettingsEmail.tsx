import { TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";

//
function SettingsEmail() {
  const [ChangeEmail, setChangeEmail] = useState({ old: "", new: "" });
  //
  return (
    <>
      <h5 className="text-muted">Change Email</h5>
      <form
        onSubmit={() => console.log("Not availabel")}
        className="d-flex flex-column align-items-center  p-3"
        style={{ boxShadow: " 0 0 5px grey", borderRadius: "10px" }}
      >
        {" "}
        <TextField
          type="email"
          className="my-1"
          error={ChangeEmail.old === ChangeEmail.new ? false : true}
          id="email-change"
          label="Old email"
          variant="standard"
          value={ChangeEmail.old}
          onChange={(e) =>
            setChangeEmail({
              ...ChangeEmail,
              old: e.target.value,
            })
          }
        />
        <TextField
          type="email"
          className="my-1"
          error={ChangeEmail.old === ChangeEmail.new ? false : true}
          id="new-email"
          label="New email"
          variant="standard"
          value={ChangeEmail.new}
          onChange={(e) =>
            setChangeEmail({
              ...ChangeEmail,
              new: e.target.value,
            })
          }
        />
        <Button type="submit" disabled>
          Submit
        </Button>
      </form>
    </>
  );
}

export default SettingsEmail;
