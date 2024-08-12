import SearchBar from "../nav/search-bar"
import ImageList from "./ImageList"
import UploadImageButton from "./UploadImageButton"

const AssetManagement = () => {
  return (
    <div className="gap-4">
      <div className="flex gap-4">
        <SearchBar />
        <UploadImageButton />
      </div>

      <ImageList />
    </div>
  )
}

export default AssetManagement
