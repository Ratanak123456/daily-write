const getFileExtension = (fileName) => {
  const extension = fileName?.split(".")?.pop()?.toLowerCase();
  return extension || "jpg";
};

/**
 * Resolves a media URL from an upload response.
 */
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
    if (directUrl.startsWith("http")) return directUrl;
    if (!baseUrl) return directUrl.startsWith("/") ? directUrl : `/${directUrl}`;
    return `${baseUrl.replace(/\/+$/, "")}/${directUrl.replace(/^\//, "")}`;
  }

  const fileName = media?.fileName || media?.name;
  if (fileName) {
    if (!baseUrl) return fileName.startsWith("/") ? fileName : `/${fileName}`;
    return `${baseUrl.replace(/\/+$/, "")}/${fileName.replace(/^\//, "")}`;
  }

  const uuid = media?.uuid || media?.id || media?.fileUuid || media?.mediaUuid;
  if (uuid) {
    const extension = getFileExtension(originalFileName);
    if (!baseUrl) return `/${uuid}.${extension}`;
    return `${baseUrl.replace(/\/+$/, "")}/${uuid}.${extension}`;
  }

  return "";
};

/**
 * Safely resolves a media URL from a string path or filename.
 * If it's already a full URL, returns it as is.
 * If it's a relative path or just a filename, prepends the base URL.
 */
export const getMediaUrl = (url, baseUrl = import.meta.env.VITE_BASE_URL) => {
  if (!url || url === "null" || url === "undefined") return "";
  if (url.startsWith("http") || url.startsWith("data:")) return url;
  
  // If baseUrl is missing, try to use a safe default or just return the path
  // In many cases, if it's a relative path, it might be in the public folder or relative to the origin
  if (!baseUrl) {
    return url.startsWith("/") ? url : `/${url}`;
  }

  // Clean up the base URL and the path to ensure they join correctly
  const cleanBase = baseUrl.replace(/\/+$/, "");
  const cleanPath = url.replace(/^\/+/, "");
  
  return `${cleanBase}/${cleanPath}`;
};
