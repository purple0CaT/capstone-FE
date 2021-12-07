import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import { AiOutlinePaperClip } from "react-icons/ai";

function PictureModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <AiOutlinePaperClip
        onClick={handleShow}
        size="1.4rem"
        style={{ cursor: "pointer" }}
      /> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Send picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <input name="myFile" type="file" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PictureModal;
