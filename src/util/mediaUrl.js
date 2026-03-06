const getFileExtension = (fileName) => {
  const extension = fileName?.split(".")?.pop()?.toLowerCase();
  return extension || "jpg";
};

export const resolveMediaPreviewUrl = (
  response,
  originalFileName,
  baseUrl = import.meta.env.VITE_BASE_URL,
) => {
  const payload = response?.data ?? response;
  const media = Array.isArray(payload) ? payload[0] : payload;

  if (typeof media === "string" && media.startsWith("http")) {
    return media;
  }

  const directUrl =
    media?.previewLink ||
    media?.previewUrl ||
    media?.url ||
    media?.fileUrl ||
    media?.downloadUrl;

  if (directUrl) {
    return directUrl.startsWith("http")
      ? directUrl
      : `${baseUrl}/${directUrl.replace(/^\//, "")}`;
  }

  const fileName = media?.fileName || media?.name;
  if (fileName) {
    return `${baseUrl}/${fileName}`;
  }

  const uuid = media?.uuid || media?.id || media?.fileUuid || media?.mediaUuid;
  if (uuid) {
    return `${baseUrl}/${uuid}.${getFileExtension(originalFileName)}`;
  }

  return "";
};
