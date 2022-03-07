import { createContext, FC, useState } from "react";
import { Modal } from "../components";

type ModalContextType = {
  handleOpen?: (id: number) => void;
  handleClose?: () => void;
}

export const ModalContext = createContext<ModalContextType>({});

const ModalContextProvider: FC = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [releaseId, setReleaseId] = useState<number>(0)

  const handleOpen = (id: number) => {
    setOpen(true);
    setReleaseId(id)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ModalContext.Provider value={{ handleOpen, handleClose }}>
      {children}
      {open && <Modal open={open} handleClose={handleClose} releaseId={releaseId} />}
    </ModalContext.Provider>
  )
}

export default ModalContextProvider;