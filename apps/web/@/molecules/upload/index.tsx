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
import UploadImageButton from "./UploadImageButton"

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
      <DialogContent className="w-full max-w-[800px]">
        <DialogHeader className="flex flex-row items-center gap-4">
          <DialogTitle className="mb-0">Asset Management</DialogTitle>
          <UploadImageButton />
        </DialogHeader>

        <div className="h-[300px] overflow-scroll">
          <AssetManagement />
        </div>

        <DialogFooter>
          <Button>Select</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Upload
