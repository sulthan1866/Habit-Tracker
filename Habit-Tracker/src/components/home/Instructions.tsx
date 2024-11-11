import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Props{
  children:string
  title:string
  after:string
  onAfter:()=>void
}

const Instructions = ({children,title,after,onAfter}:Props) => {
const[show,setShow]=useState<boolean>(false)

  return <>
  {/* Button to open the modal */}
  <Button variant="primary" onClick={()=>{setShow(true)}}>
      Open Card
  </Button>

  {/* Modal overlay */}
  <Modal show={show} onHide={()=>(setShow(false))} centered>
      <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {children}
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={onAfter}>
              {after}
          </Button>
      </Modal.Footer>
  </Modal>
</>
};

export default Instructions;
