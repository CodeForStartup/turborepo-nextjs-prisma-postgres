import { ReactNode, useState } from "react"

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui"

import AssetManagement from "./AssetsManagement"

interface UploadProps {
  children: ReactNode
}

const Upload: React.FC<UploadProps> = ({ children }) => {
  //   const [isOpen, setIsOpen] = useState(false)

  //   const handleOpenChange = (open: boolean) => {
  //     setIsOpen(open)
  //   }

  return (
    <Dialog
    //   open={isOpen}
    //   onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-[200px] w-full max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Asset Management</DialogTitle>
        </DialogHeader>

        <AssetManagement />

        <DialogFooter>
          <Button>Select</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Upload
