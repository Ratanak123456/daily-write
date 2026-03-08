import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronDown, ImagePlus, Loader2 } from "lucide-react";
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
import { resolveMediaPreviewUrl } from "../util/mediaUrl";

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
  const [coverImage, setCoverImage] = useState(null);
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

  // Initialize Quill
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
    setIsEditorReady(true);

    return () => {
      quillInstanceRef.current = null;
      setIsEditorReady(false);
    };
  }, [uuid, isFetching, t]);

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
            <span className="text-xl md:text-2xl">{t("blogPost.back")}</span>
          </button>

          <h1 className="text-primary-orange text-xl md:text-2xl font-bold text-center">
            {uuid ? t("blogPost.editDraft") : t("blogPost.createNew")}
          </h1>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => handleCreatePost("DRAFT")}
              disabled={isUploadingImage || isCreatingBlog || isUpdatingBlog}
              className="border border-primary-orange text-primary-orange text-sm md:text-l font-semibold px-4 md:px-7 py-2.5 rounded-lg hover:bg-primary-orange/10 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCreatingBlog || isUpdatingBlog
                ? t("blogPost.saving")
                : t("blogPost.saveDraft")}
            </button>
            <button
              type="button"
              onClick={() => handleCreatePost("PUBLISHED")}
              disabled={isUploadingImage || isCreatingBlog || isUpdatingBlog}
              className="bg-primary-orange text-white text-sm md:text-l font-semibold px-4 md:px-10 py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCreatingBlog || isUpdatingBlog
                ? t("blogPost.publishing")
                : t("blogPost.publish")}
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-border-main px-4 md:px-6 py-6 md:py-8">
          <h2 className="text-primary-orange text-2xl md:text-4xl font-semibold mb-6">
            {t("blogPost.postDetails")}
          </h2>

          <div className="mb-6">
            <label className="block text-lg md:text-2xl font-semibold mb-2">
              {t("blogPost.addImageCover")}{" "}
              <span className="text-primary-orange">*</span>
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
                  <span>{t("blogPost.uploadingImage")}</span>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary-orange/10 border border-primary-orange/40 flex items-center justify-center mb-6">
                    <ImagePlus className="text-primary-orange" size={26} />
                  </div>

                  <p className="text-primary-orange text-2xl md:text-4xl font-semibold mb-2">
                    {t("blogPost.uploadToGallery")}
                  </p>
                  <p className="text-text-sub text-base md:text-2xl mb-2">
                    {t("blogPost.dragDrop")}
                  </p>
                  <p className="text-text-sub text-sm md:text-lg mb-6">
                    {t("blogPost.fileHint")}
                  </p>

                  <span className="bg-primary-orange text-white text-base md:text-xl font-semibold px-6 py-2 rounded-xl hover:brightness-110 transition-all">
                    {t("blogPost.selectImages")}
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
                  {t("blogPost.changeImage")}
                </button>
                <button
                  type="button"
                  onClick={handleRemoveCoverImage}
                  className="border border-border-main text-text-sub text-sm md:text-base font-semibold px-4 py-2 rounded-lg hover:border-primary-orange/40 hover:text-text-main transition-all"
                >
                  {t("blogPost.removeImage")}
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
            {!uuid && (
              <div>
                <label className="block text-lg md:text-2xl font-semibold mb-2">
                  {t("blogPost.category")}{" "}
                  <span className="text-primary-orange">*</span>
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="w-full appearance-none bg-bg-side border border-border-main rounded-lg h-12 px-4 text-primary-orange text-base md:text-xl focus:outline-none focus:ring-2 focus:ring-primary-orange"
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
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-sub"
                    size={22}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-lg md:text-2xl font-semibold mb-2">
                {t("blogPost.title")}{" "}
                <span className="text-primary-orange">*</span>
              </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder={t("blogPost.titlePlaceholder")}
                className="w-full bg-bg-side border border-border-main rounded-lg h-12 px-4 text-base md:text-xl placeholder:text-primary-orange/70 focus:outline-none focus:ring-2 focus:ring-primary-orange"
              />
            </div>

            <div>
              <label className="block text-lg md:text-2xl font-semibold mb-2">
                {t("blogPost.content")}{" "}
                <span className="text-primary-orange">*</span>
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
