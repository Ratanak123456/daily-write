import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronDown, ImagePlus, Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {
  useCreateBlogMutation,
  useUploadMediaMutation,
  useGetBlogByUuidQuery,
} from "../app/features/services/productApi";
import { buildCreateBlogPayload } from "../app/features/services/blogPayload";

const FILE_PREVIEW_BASE_URL = import.meta.env.VITE_BASE_URL;

const getFileExtension = (fileName) => {
  const extension = fileName?.split(".")?.pop()?.toLowerCase();
  return extension || "jpg";
};

const resolveMediaPreviewUrl = (response, originalFileName) => {
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
      : `${FILE_PREVIEW_BASE_URL}/${directUrl.replace(/^\//, "")}`;
  }

  const fileName = media?.fileName || media?.name;
  if (fileName) {
    return `${FILE_PREVIEW_BASE_URL}/${fileName}`;
  }

  const uuid = media?.uuid || media?.id || media?.fileUuid || media?.mediaUuid;
  if (uuid) {
    return `${FILE_PREVIEW_BASE_URL}/${uuid}.${getFileExtension(originalFileName)}`;
  }

  return "";
};

export default function BlogPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uuid = queryParams.get("uuid");

  const { data: blogResult, isLoading: isFetching } = useGetBlogByUuidQuery(uuid, {
    skip: !uuid,
  });

  const editorRootRef = useRef(null);
  const quillInstanceRef = useRef(null);
  const coverInputRef = useRef(null);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isQuillReady, setIsQuillReady] = useState(false);

  const [uploadMedia, { isLoading: isUploadingImage }] =
    useUploadMediaMutation();
  const [createBlog, { isLoading: isCreatingBlog }] = useCreateBlogMutation();

  const handleCoverImagesChange = async (event) => {
    const file = event.target.files?.[0] || null;
    if (!file) return;

    setErrorMessage("");
    setSuccessMessage("");
    setCoverImage(file);

    const formData = new FormData();
    formData.append("files", file, file.name);

    try {
      const uploadResponse = await uploadMedia(formData).unwrap();
      const previewUrl = resolveMediaPreviewUrl(uploadResponse, file.name);

      if (!previewUrl) {
        throw new Error("Upload succeeded but preview URL is missing.");
      }

      setCoverPreview(previewUrl);
    } catch (error) {
      setCoverImage(null);
      setCoverPreview("");
      setErrorMessage(
        error?.data?.message ||
          (typeof error?.data === "string" ? error.data : "") ||
          error?.message ||
          "Failed to upload image.",
      );
    }
  };

  const handleRemoveCoverImage = () => {
    setCoverImage(null);
    setCoverPreview("");
    setErrorMessage("");
    setSuccessMessage("");
    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  };

  const handleCreatePost = async (status) => {
    setErrorMessage("");
    setSuccessMessage("");

    const plainTitle = title.trim();
    const plainCategory = category.trim();
    const content = quillInstanceRef.current?.root?.innerHTML || "";
    const plainContent = content.replace(/<[^>]*>/g, "").trim();

    if (!coverPreview) {
      setErrorMessage("Please upload cover image first.");
      return;
    }

    if (!plainTitle || !plainCategory || !plainContent) {
      setErrorMessage("Please fill image, category, title, and content.");
      return;
    }

    try {
      const payload = buildCreateBlogPayload({
        title: plainTitle,
        thumbnail: coverPreview,
        status,
        blogCategory: plainCategory,
        content,
      });

      await createBlog(payload).unwrap();
      setSuccessMessage(
        status === "DRAFT"
          ? "Draft saved successfully."
          : "Post published successfully.",
      );
      navigate("/profile");
    } catch (error) {
      setErrorMessage(
        error?.data?.message || error?.data?.error || "Failed to create post.",
      );
    }
  };

  // Initialize Quill
  useEffect(() => {
    if (!editorRootRef.current || quillInstanceRef.current) return;

    quillInstanceRef.current = new Quill(editorRootRef.current, {
      theme: "snow",
      placeholder: "Write your post content...",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ header: [1, 2, false] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
      },
    });

    setIsQuillReady(true);

    return () => {
      quillInstanceRef.current = null;
      setIsQuillReady(false);
    };
  }, []);

  // Pre-fill data when editing a draft
  useEffect(() => {
    if (!blogResult) return;

    const blog = blogResult?.data || blogResult;
    if (blog && typeof blog === 'object' && !Array.isArray(blog)) {
      setTitle(blog.title || "");
      setCategory(blog.blogCategory || "");

      if (quillInstanceRef.current && blog.content) {
        // Use a small timeout to ensure Quill is fully stable
        setTimeout(() => {
          if (quillInstanceRef.current) {
            quillInstanceRef.current.clipboard.dangerouslyPasteHTML(blog.content);
          }
        }, 0);
      }
    }
  }, [blogResult]);

  if (uuid && isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-main">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-orange"></div>
      </div>
    );
  }

  return (
    <section className="bg-bg-main text-text-main pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
        <div className="flex items-center justify-between mb-8 gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[22px] font-semibold text-text-main hover:text-primary-orange transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="text-xl md:text-2xl">Back</span>
          </button>

          <h1 className="text-primary-orange text-2xl md:text-4xl font-bold text-center">
            {uuid ? "Edit Draft" : "Create New Post"}
          </h1>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => handleCreatePost("DRAFT")}
              disabled={isUploadingImage || isCreatingBlog}
              className="border border-primary-orange text-primary-orange text-sm md:text-xl font-semibold px-4 md:px-7 py-2.5 rounded-lg hover:bg-primary-orange/10 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCreatingBlog ? "Saving..." : "Save Draft"}
            </button>
            <button
              type="button"
              onClick={() => handleCreatePost("PUBLISHED")}
              disabled={isUploadingImage || isCreatingBlog}
              className="bg-primary-orange text-white text-sm md:text-2xl font-semibold px-4 md:px-10 py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCreatingBlog ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-border-main px-4 md:px-6 py-6 md:py-8">
          <h2 className="text-primary-orange text-2xl md:text-4xl font-semibold mb-6">
            Post Details
          </h2>

          <div className="mb-6">
            <label className="block text-lg md:text-2xl font-semibold mb-2">
              Add Image Cover <span className="text-primary-orange">*</span>
            </label>

            <input
              ref={coverInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/gif"
              onChange={handleCoverImagesChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              disabled={isUploadingImage}
              className="w-full bg-bg-side border border-primary-orange/40 rounded-xl px-4 py-10 md:py-12 flex flex-col items-center text-center hover:border-primary-orange transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="w-full max-h-90 object-cover rounded-lg"
                />
              ) : isUploadingImage ? (
                <div className="flex items-center gap-3 text-primary-orange text-lg md:text-2xl font-semibold">
                  <Loader2 className="animate-spin" size={24} />
                  <span>Uploading image...</span>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary-orange/10 border border-primary-orange/40 flex items-center justify-center mb-6">
                    <ImagePlus className="text-primary-orange" size={26} />
                  </div>

                  <p className="text-primary-orange text-2xl md:text-4xl font-semibold mb-2">
                    Upload images to gallery
                  </p>
                  <p className="text-text-sub text-base md:text-2xl mb-2">
                    Drag and drop images here or click to browse
                  </p>
                  <p className="text-text-sub text-sm md:text-lg mb-6">
                    PNG, JPG, GIF up to 5MB (1 file only)
                  </p>

                  <span className="bg-primary-orange text-white text-base md:text-xl font-semibold px-6 py-2 rounded-xl hover:brightness-110 transition-all">
                    Select images
                  </span>
                </>
              )}
            </button>

            {coverImage && (
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={isUploadingImage}
                  className="border border-primary-orange text-primary-orange text-sm md:text-base font-semibold px-4 py-2 rounded-lg hover:bg-primary-orange/10 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Change image
                </button>
                <button
                  type="button"
                  onClick={handleRemoveCoverImage}
                  className="border border-border-main text-text-sub text-sm md:text-base font-semibold px-4 py-2 rounded-lg hover:border-primary-orange/40 hover:text-text-main transition-all"
                >
                  Remove image
                </button>
              </div>
            )}

            {errorMessage && (
              <p className="mt-3 text-sm md:text-base font-medium text-red-600">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="mt-3 text-sm md:text-base font-medium text-green-600">
                {successMessage}
              </p>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-lg md:text-2xl font-semibold mb-2">
                Category <span className="text-primary-orange">*</span>
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full appearance-none bg-bg-side border border-border-main rounded-lg h-12 px-4 text-primary-orange text-base md:text-xl focus:outline-none focus:ring-2 focus:ring-primary-orange"
                >
                  <option value="">Select category</option>
                  <option value="front-end">Front-End</option>
                  <option value="back-end">Back-End</option>
                  <option value="cyber-security">Cyber Security</option>
                  <option value="ux-ui-design">UXUI Design</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-sub"
                  size={22}
                />
              </div>
            </div>

            <div>
              <label className="block text-lg md:text-2xl font-semibold mb-2">
                Title <span className="text-primary-orange">*</span>
              </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter your title here..."
                className="w-full bg-bg-side border border-border-main rounded-lg h-12 px-4 text-base md:text-xl placeholder:text-primary-orange/70 focus:outline-none focus:ring-2 focus:ring-primary-orange"
              />
            </div>

            <div>
              <label className="block text-lg md:text-2xl font-semibold mb-2">
                Content <span className="text-primary-orange">*</span>
              </label>
              <div className="blog-post-editor rounded-lg border border-border-main overflow-hidden bg-bg-main">
                <div
                  ref={editorRootRef}
                  className="text-base md:text-lg"
                  style={{ minHeight: "320px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
