import { ReactNode, useState } from "react"

import { Image } from "database"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
  Typography,
} from "ui"

import { useGetImages } from "@/hooks/useGetImages"
import { truncateFileName } from "@/utils/text"

import AssetManagement from "./AssetsManagement"
import FileManagerContainer, { useFileManager } from "./FileManagerContainer"
import ImageSearchBar from "./ImageSearchBar"
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

  return (
    <Button
      onClick={handleSelect}
      disabled={!selectedFiles || selectedFiles?.length === 0}
    >
      {t("select")}
    </Button>
  )
}

const SelectedFiles: React.FC = () => {
  const t = useTranslations("uploads")

  const { selectedFiles, setSelectedFiles } = useFileManager()

  if (!selectedFiles || selectedFiles.length === 0) return <div className="flex flex-1" />

  if (selectedFiles.length === 1) {
    return (
      <div className="flex h-full flex-1 items-center justify-start gap-1">
        <Separator
          className="mr-4 h-4"
          orientation="vertical"
        />
        <Typography variant="smallText">{truncateFileName(selectedFiles[0].name)}</Typography>
        <Typography variant="mutedText">{t("has_been_selected")}</Typography>
        <Button
          size="icon"
          variant="ghost"
          className="ml-2"
          onClick={() => {
            setSelectedFiles([])
          }}
        >
          <X
            size={16}
            color="red"
          />
        </Button>
      </div>
    )
  }

  return <div className="flex h-full items-center">{selectedFiles?.length} files selected</div>
}

const TotalItems: React.FC = () => {
  const { total } = useFileManager()
  const t = useTranslations("uploads")

  return <Typography variant="smallText">{t("total_images", { total: total || 0 })}</Typography>
}

const Upload: React.FC<UploadProps> = ({ children, onSelect }) => {
  const t = useTranslations("uploads")
  const [open, setOpen] = useState(false)

  const onSelectImage = (image?: Image) => {
    onSelect(image)
    setOpen(false)
  }

  return (
    <FileManagerContainer>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="w-full max-w-[800px] gap-0 p-0">
          <DialogHeader className="mb-0 flex flex-row items-center gap-4 border-b px-4 py-1">
            <DialogTitle className="mb-0">{t("asset_management")}</DialogTitle>
            <UploadImageButton />
          </DialogHeader>

          <ImageSearchBar />

          <AssetManagement />

          <DialogFooter className="mt-0 flex flex-row items-center justify-between border-t px-4 py-2">
            <div className="flex flex-1 flex-row items-center gap-4">
              <TotalItems />
              <SelectedFiles />
            </div>
            <SelectButton onSelect={onSelectImage} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FileManagerContainer>
  )
}

export default Upload
