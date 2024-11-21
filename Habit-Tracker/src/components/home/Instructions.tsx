import { ReactNode, useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface Props {
  children: ReactNode;
  title: string;
}

const Instructions = ({ children, title }: Props) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      {/* Button to open the modal */}
      <Button
        variant="primary"
        onClick={() => {
          setShow(true);
        }}
      >
        <h5>🛈</h5>
      </Button>

      {/* Modal overlay */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default Instructions;
