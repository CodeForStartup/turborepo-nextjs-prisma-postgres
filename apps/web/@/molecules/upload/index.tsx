import { ReactNode } from "react"

import { Image } from "database"
import { useTranslations } from "next-intl"
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Typography,
} from "ui"

import AssetManagement from "./AssetsManagement"
import FileManagerContainer, { useFileManager } from "./FileManagerContainer"
import UploadImageButton from "./UploadImageButton"

interface UploadProps {
  children: ReactNode
  onSelect: (image?: Image) => void
}

interface SelectButtonProps {
  onSelect: (image?: Image) => void
}

const SelectButton: React.FC<SelectButtonProps> = ({ onSelect }) => {
  const t = useTranslations("uploads")
  const { selectedFiles } = useFileManager()

  const handleSelect = () => {
    onSelect(selectedFiles?.at(0) || null)
  }

  return <Button onClick={handleSelect}>{t("select")}</Button>
}

const SelectedFiles: React.FC = () => {
  const t = useTranslations("uploads")

  const { selectedFiles } = useFileManager()

  if (!selectedFiles || selectedFiles.length === 0) return null

  if (selectedFiles.length === 1) {
    return (
      <div className="flex h-full items-center justify-center">
        <Typography
          variant="span"
          className="max-w-[100px] truncate text-sm font-semibold"
        >
          {selectedFiles[0].name}
        </Typography>
        <Typography
          variant="span"
          className="ml-1 text-sm"
        >
          {t("has_been_selected")}
        </Typography>
      </div>
    )
  }

  return <div className="flex h-full items-center">{selectedFiles?.length} files selected</div>
}

const Upload: React.FC<UploadProps> = ({ children, onSelect }) => {
  const t = useTranslations("uploads")

  return (
    <FileManagerContainer>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="w-full max-w-[800px] gap-0 p-0">
          <DialogHeader className="mb-0 flex flex-row items-center gap-4 border-b px-4 py-1">
            <DialogTitle className="mb-0">{t("asset_management")}</DialogTitle>
            <UploadImageButton />
          </DialogHeader>

          <div className="h-[400px] overflow-scroll px-4 py-0">
            <AssetManagement />
          </div>

          <DialogFooter className="mt-0 flex flex-row items-center justify-between border-t px-4 py-2">
            <SelectedFiles />

            <SelectButton onSelect={onSelect} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FileManagerContainer>
  )
}

export default Upload
