import { TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";

//
function SettingsPass() {
  const [ChangePassword, setChangePassword] = useState({
    oldPass: "",
    pass: "",
    repeat: "",
  });
  return (
    <div className="d-flex flex-column align-items-center">
      <h5 className="text-muted">Change password</h5>
      <form
        onSubmit={() => console.log("Not availabel")}
        className="d-flex flex-column align-items-center  p-3"
        style={{ boxShadow: " 0 0 5px grey", borderRadius: "10px" }}
      >
        <TextField
          className="my-1"
          id="old-pass"
          label="Old password"
          type="password"
          // helperText="Incorrect entry."
          value={ChangePassword.oldPass}
          onChange={(e) =>
            setChangePassword({
              ...ChangePassword,
              oldPass: e.target.value,
            })
          }
          variant="standard"
        />
        <TextField
          error={ChangePassword.repeat === ChangePassword.pass ? false : true}
          type="password"
          id="new-pass"
          label="New password"
          variant="standard"
          value={ChangePassword.pass}
          className="my-1"
          onChange={(e) =>
            setChangePassword({
              ...ChangePassword,
              pass: e.target.value,
            })
          }
        />
        <TextField
          type="password"
          className="my-1"
          error={ChangePassword.repeat === ChangePassword.pass ? false : true}
          id="repeat-pass"
          label="Repeat password"
          variant="standard"
          value={ChangePassword.repeat}
          onChange={(e) =>
            setChangePassword({
              ...ChangePassword,
              repeat: e.target.value,
            })
          }
        />
        <Button type="submit" disabled>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default SettingsPass;
