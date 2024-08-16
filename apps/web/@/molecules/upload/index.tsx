import { ReactNode, useState } from "react"

import { useTranslations } from "next-intl"
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
import FileManagerContainer from "./FileManagerContainer"
import UploadImageButton from "./UploadImageButton"

interface UploadProps {
  children: ReactNode
}

const Upload: React.FC<UploadProps> = ({ children }) => {
  const t = useTranslations("common")

  return (
    <FileManagerContainer>
      <Dialog>
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
    </FileManagerContainer>
  )
}

export default Upload
