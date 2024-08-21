const MAX_FILE_NAME_LENGTH = 20

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const truncateFileName = (name: string, maxLength = MAX_FILE_NAME_LENGTH) => {
  if (name.length <= maxLength) return name
  const half = Math.floor((maxLength - 3) / 2)
  return `${name.slice(0, half)}...${name.slice(-half)}`
}
