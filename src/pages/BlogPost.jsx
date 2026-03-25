import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft, ChevronDown, ImagePlus, Loader2, X, Check, AlertCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {
  useCreateBlogMutation,
  useUploadMediaMutation,
  useGetBlogByUuidQuery,
  useUpdateBlogMutation,
} from "../app/features/services/productApi";
import { buildCreateBlogPayload } from "../app/features/services/blogPayload";
import { useI18n } from "../i18n/useI18n";
import { resolveMediaPreviewUrl, getMediaUrl } from "../utils/mediaUrl";
import PageSkeleton from "../components/PageSkeleton";

const EDITOR_TOOLBAR_OPTIONS = [
  ["bold", "italic", "underline", "strike"],
  [{ header: [1, 2, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"],
];

export default function BlogPost() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uuid = queryParams.get("uuid");

  const { data: blogResult, isLoading: isFetching } = useGetBlogByUuidQuery(
    uuid,
    {
      skip: !uuid,
    },
  );

  const editorRootRef = useRef(null);
  const quillInstanceRef = useRef(null);
  const coverInputRef = useRef(null);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);

  const [uploadMedia, { isLoading: isUploadingImage }] =
    useUploadMediaMutation();
  const [createBlog, { isLoading: isCreatingBlog }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdatingBlog }] = useUpdateBlogMutation();

  const handleCoverImagesChange = async (event) => {
    const file = event.target.files?.[0] || null;
    if (!file) return;

    setErrorMessage("");
    setSuccessMessage("");
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
      setErrorMessage(t("blogPost.uploadCoverFirst"));
      return;
    }

    if (!plainTitle || !plainCategory || !plainContent) {
      setErrorMessage(t("blogPost.fillAllFields"));
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

      if (uuid) {
        await updateBlog({ uuid, payload }).unwrap();
      } else {
        await createBlog(payload).unwrap();
      }
      setSuccessMessage(
        uuid
          ? t("blogPost.updated")
          : status === "DRAFT"
            ? t("blogPost.draftSaved")
            : t("blogPost.published"),
      );
      navigate("/profile");
    } catch (error) {
      setErrorMessage(
        error?.data?.message ||
          error?.data?.error ||
          t("blogPost.createFailed"),
      );
    }
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("files", file);

        try {
          const res = await uploadMedia(formData).unwrap();
          const url = resolveMediaPreviewUrl(res, file.name);
          
          const quill = quillInstanceRef.current;
          if (quill) {
            const range = quill.getSelection();
            if (range) {
              quill.insertEmbed(range.index, "image", url);
              quill.setSelection(range.index + 1);
            } else {
              quill.insertEmbed(quill.getLength(), "image", url);
            }
          }
        } catch (err) {
          console.error("Image upload failed", err);
          setErrorMessage(t("blogPost.uploadImageFailed") || "Failed to upload image to content.");
        }
      }
    };
  }, [uploadMedia, t]);

  // Initialize Quill once
  useEffect(() => {
    if (
      (uuid && isFetching) ||
      !editorRootRef.current ||
      quillInstanceRef.current
    )
      return;

    quillInstanceRef.current = new Quill(editorRootRef.current, {
      theme: "snow",
      placeholder: t("blogPost.editorPlaceholder"),
      modules: {
        toolbar: {
          container: EDITOR_TOOLBAR_OPTIONS,
          handlers: {
            image: imageHandler,
          },
        },
      },
    });
    setIsEditorReady(true);

    return () => {
      const quill = quillInstanceRef.current;
      if (quill) {
        const toolbar = quill.container?.previousSibling;
        if (toolbar?.classList?.contains("ql-toolbar")) {
          toolbar.remove();
        }
      }

      quillInstanceRef.current = null;
      setIsEditorReady(false);
    };
  }, [uuid, isFetching, t, imageHandler]);

  // Update editor placeholder on language change
  useEffect(() => {
    const quill = quillInstanceRef.current;
    if (!quill) return;

    quill.root.dataset.placeholder = t("blogPost.editorPlaceholder");
  }, [t]);

  // Pre-fill data when editing a draft
  useEffect(() => {
    if (!blogResult || !isEditorReady || !quillInstanceRef.current) return;

    const blog = blogResult?.data || blogResult;
    if (blog && typeof blog === "object" && !Array.isArray(blog)) {
      setTitle(blog.title || "");
      setCategory(blog.blogCategory || "");
      setCoverPreview(blog.thumbnailUrl || blog.thumbnail || "");

      if (blog.content) {
        quillInstanceRef.current.setContents([]);
        quillInstanceRef.current.clipboard.dangerouslyPasteHTML(blog.content);
      }
    }
  }, [blogResult, isEditorReady]);

  if (uuid && isFetching) {
    return <PageSkeleton variant="blogPost" />;
  }

  return (
    <div className="min-h-screen bg-bg-main py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-text-sub hover:text-primary-orange transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-bg-side shadow-sm group-hover:shadow-md group-hover:-translate-x-1 transition-all">
                <ArrowLeft size={20} />
              </div>
              <span className="font-medium">{t("blogPost.back")}</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-orange to-primary-orange-dark bg-clip-text text-transparent">
              {uuid ? t("blogPost.editDraft") : t("blogPost.createNew")}
            </h1>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleCreatePost("DRAFT")}
                disabled={isUploadingImage || isCreatingBlog || isUpdatingBlog}
                className="px-6 py-2.5 rounded-xl border-2 border-primary-orange text-primary-orange font-semibold 
                         hover:bg-primary-orange/10 active:bg-primary-orange/20 transition-all duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
                         shadow-sm hover:shadow"
              >
                {isCreatingBlog || isUpdatingBlog ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    {t("blogPost.saving")}
                  </span>
                ) : (
                  t("blogPost.saveDraft")
                )}
              </button>
              <button
                type="button"
                onClick={() => handleCreatePost("PUBLISHED")}
                disabled={isUploadingImage || isCreatingBlog || isUpdatingBlog}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-orange to-primary-orange-dark 
                         text-white font-semibold shadow-md hover:shadow-lg 
                         hover:from-primary-orange-dark hover:to-primary-orange-dark
                         active:from-primary-orange-dark/90 active:to-primary-orange-dark/90
                         transition-all duration-200 disabled:opacity-50 
                         disabled:cursor-not-allowed disabled:hover:from-primary-orange disabled:hover:to-primary-orange-dark"
              >
                {isCreatingBlog || isUpdatingBlog ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    {t("blogPost.publishing")}
                  </span>
                ) : (
                  t("blogPost.publish")
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-bg-side rounded-2xl shadow-xl overflow-hidden">
          {/* Section Header */}
          <div className="px-6 py-5 border-b border-border-main bg-bg-main/50">
            <h2 className="text-xl font-semibold text-text-main">
              {t("blogPost.postDetails")}
            </h2>
          </div>

          <div className="p-6 space-y-8">
            {/* Cover Image Upload */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg font-medium text-text-main">
                {t("blogPost.addImageCover")}
                <span className="text-primary-orange">*</span>
              </label>

              <input
                ref={coverInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/gif"
                onChange={handleCoverImagesChange}
                className="hidden"
              />

              {coverPreview ? (
                <div className="relative group">
                  <img
                    src={getMediaUrl(coverPreview)}
                    alt="Cover preview"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => coverInputRef.current?.click()}
                      className="p-2 bg-bg-side rounded-lg hover:bg-bg-main transition-colors"
                      title="Change image"
                    >
                      <ImagePlus size={20} className="text-text-main" />
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveCoverImage}
                      className="p-2 bg-bg-side rounded-lg hover:bg-bg-main transition-colors"
                      title="Remove image"
                    >
                      <X size={20} className="text-text-main" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={isUploadingImage}
                  className="w-full group relative border-2 border-dashed border-border-main rounded-xl 
                           hover:border-primary-orange transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="px-6 py-12 flex flex-col items-center">
                    {isUploadingImage ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                          <div className="w-16 h-16 border-4 border-border-main border-t-primary-orange rounded-full animate-spin"></div>
                        </div>
                        <p className="text-text-sub font-medium">{t("blogPost.uploadingImage")}</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-20 h-20 rounded-2xl bg-primary-orange/10 
                                      flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <ImagePlus className="text-primary-orange" size={32} />
                        </div>
                        <p className="text-xl font-semibold text-text-main mb-2">
                          {t("blogPost.uploadToGallery")}
                        </p>
                        <p className="text-text-sub mb-1">{t("blogPost.dragDrop")}</p>
                        <p className="text-sm text-text-sub/70 mb-4">{t("blogPost.fileHint")}</p>
                        <span className="px-6 py-2.5 bg-gradient-to-r from-primary-orange to-primary-orange-dark 
                                       text-white font-medium rounded-lg shadow-md 
                                       group-hover:shadow-lg group-hover:from-primary-orange-dark group-hover:to-primary-orange-dark 
                                       transition-all duration-200">
                          {t("blogPost.selectImages")}
                        </span>
                      </>
                    )}
                  </div>
                </button>
              )}
            </div>

            {/* Category & Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {!uuid && (
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-text-main">
                    {t("blogPost.category")}
                    <span className="text-primary-orange">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="w-full appearance-none px-4 py-3 bg-bg-main border border-border-main 
                               rounded-lg text-text-main focus:outline-none focus:ring-2 
                               focus:ring-primary-orange/50 focus:border-primary-orange transition-all
                               hover:bg-bg-side"
                    >
                      <option value="">{t("blogPost.selectCategory")}</option>
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="Health & Wellness">Health & Wellness</option>
                      <option value="Travel">Travel</option>
                      <option value="Food & Recipes">Food & Recipes</option>
                      <option value="Personal Growth">Personal Growth</option>
                      <option value="Technology">Technology</option>
                    </select>
                    <ChevronDown
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sub pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-text-main">
                  {t("blogPost.title")}
                  <span className="text-primary-orange">*</span>
                </label>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder={t("blogPost.titlePlaceholder")}
                  className="w-full px-4 py-3 bg-bg-main border border-border-main rounded-lg 
                           text-text-main placeholder:text-text-sub/50
                           focus:outline-none focus:ring-2 focus:ring-primary-orange/50 
                           focus:border-primary-orange transition-all hover:bg-bg-side"
                />
              </div>
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-text-main">
                {t("blogPost.content")}
                <span className="text-primary-orange">*</span>
              </label>
              <div className="blog-post-editor rounded-lg border border-border-main overflow-hidden 
                            bg-bg-main shadow-sm focus-within:ring-2 focus-within:ring-primary-orange/50 
                            focus-within:border-primary-orange transition-all">
                <div
                  ref={editorRootRef}
                  className="[&_.ql-editor]:min-h-[320px] [&_.ql-editor]:text-text-main 
                           [&_.ql-toolbar]:border-border-main [&_.ql-toolbar]:bg-bg-side
                           [&_.ql-container]:border-border-main"
                />
              </div>
            </div>

            {/* Messages */}
            {errorMessage && (
              <div className="flex items-center gap-3 p-4 bg-red-50/10 border border-red-500/20 rounded-lg">
                <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
              </div>
            )}
            
            {successMessage && (
              <div className="flex items-center gap-3 p-4 bg-green-50/10 border border-green-500/20 rounded-lg">
                <Check className="text-green-500 flex-shrink-0" size={20} />
                <p className="text-green-500 text-sm font-medium">{successMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
