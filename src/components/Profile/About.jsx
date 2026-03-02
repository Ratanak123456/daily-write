import React, { useState, useEffect } from "react";
import { 
  usePatchUserMutation, 
  useUploadMediaMutation 
} from "../../app/features/services/productApi";
import { Camera, Edit2, Save, X } from "lucide-react";
import Toast from "../Toast";

export default function About({ uuid, fullName, email, profileUrl, coverUrl, createdAt, bio }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: fullName || "",
    email: email || "",
    profileUrl: profileUrl || "",
    coverUrl: coverUrl || "",
    bio: bio || ""
  });

  const [toast, setToast] = useState(null);
  const [patchUser, { isLoading: isSaving }] = usePatchUserMutation();
  const [uploadMedia] = useUploadMediaMutation();
  const [isUploading, setIsUploading] = useState({ profile: false, cover: false });

  useEffect(() => {
    setFormData({
      fullName: fullName || "",
      email: email || "",
      profileUrl: profileUrl || "",
      coverUrl: coverUrl || "",
      bio: bio || ""
    });
  }, [fullName, email, profileUrl, coverUrl, bio]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(prev => ({ ...prev, [type]: true }));
    try {
      const result = await uploadMedia(file).unwrap();
      const fileName = result?.data?.fileName || result?.fileName || result?.name;
      const fileUrl = `${import.meta.env.VITE_BASE_URL}/files/${fileName}`;
      
      setFormData(prev => ({
        ...prev,
        [type === "profile" ? "profileUrl" : "coverUrl"]: fileUrl
      }));
      showToast(`${type === "profile" ? "Profile" : "Cover"} image uploaded!`);
    } catch (error) {
      console.error("FULL ERROR RESPONSE:", error); // This will show you exactly why the server said 400
      const message = error?.data?.message || "Failed to upload image. Please check console for details.";
      showToast(message, "error");
    } finally {
      setIsUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleSave = async () => {
    try {
      await patchUser({
        uuid,
        payload: formData
      }).unwrap();
      setIsEditing(false);
      showToast("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      showToast("Failed to update profile. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans text-(--text-primary)">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-(--primary-500) tracking-tight">
          About
        </h2>
      </div>
      
      <div className="max-w-4xl mx-auto bg-(--bg-primary) rounded-3xl p-8 border border-(--border-color) shadow-sm">
        <div className="flex justify-between items-start mb-10">
          <div className="text-left">
            <h2 className="text-2xl font-bold">
              <span className="text-(--primary-500)">Profile</span> Overview
            </h2>
            <p className="text-(--text-secondary) text-sm">
              {isEditing ? "Edit your personal information" : "Manage your personal information"}
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 border border-(--border-color) text-(--text-primary) px-4 py-2 rounded-xl text-sm font-medium hover:bg-(--bg-secondary) transition"
                >
                  <X size={16} /> Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-(--primary-500) text-white px-4 py-2 rounded-xl text-sm font-medium hover:brightness-110 transition disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : <><Save size={16} /> Save Changes</>}
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-(--primary-500) text-white px-4 py-2 rounded-xl text-sm font-medium hover:brightness-110 transition"
              >
                <Edit2 size={16} /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Picture Section */}
        <div className="mb-12 flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-(--primary-500) overflow-hidden bg-(--bg-secondary) flex items-center justify-center">
              {formData.profileUrl ? (
                <img
                  src={formData.profileUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl">👤</span>
              )}
              {isUploading.profile && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-1 right-1 bg-(--primary-500) p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform">
                <Camera size={18} className="text-white" />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "profile")}
                />
              </label>
            )}
          </div>
          <p className="mt-2 text-xs text-(--text-secondary)">Profile Picture</p>
        </div>

        <div className="mb-12">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="text-(--primary-500)">Basic</span> Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-(--text-secondary) text-xs ml-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-(--bg-secondary) border border-(--border-color) p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary-500) text-(--text-primary)"
                />
              ) : (
                <div className="bg-(--bg-secondary) bg-opacity-30 p-4 rounded-xl border border-transparent">
                  <p className="font-bold text-(--text-primary)">{formData.fullName}</p>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-(--text-secondary) text-xs ml-1">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-(--bg-secondary) border border-(--border-color) p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary-500) text-(--text-primary)"
                />
              ) : (
                <div className="bg-(--bg-secondary) bg-opacity-30 p-4 rounded-xl border border-transparent">
                  <p className="font-bold text-(--text-primary)">{formData.email}</p>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-(--text-secondary) text-xs ml-1">Member Since</label>
              <div className="bg-(--bg-secondary) bg-opacity-30 p-4 rounded-xl border border-transparent">
                <p className="font-bold text-(--text-primary)">{createdAt}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="text-(--primary-500)">Biography</span> & Cover
          </h3>

          <div className="relative mb-6 group">
            <div className="w-full h-64 overflow-hidden rounded-2xl bg-(--bg-secondary) border border-(--border-color)">
              {formData.coverUrl ? (
                <img
                  src={formData.coverUrl}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-(--text-secondary)">
                  No cover image
                </div>
              )}
              {isUploading.cover && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl cursor-pointer shadow-lg hover:bg-white transition flex items-center gap-2 text-sm font-medium text-gray-800">
                <Camera size={18} className="text-(--primary-500)" /> 
                Change Cover
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "cover")}
                />
              </label>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-(--text-secondary) text-xs ml-1">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full bg-(--bg-secondary) border border-(--border-color) p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-(--primary-500) text-(--text-primary) resize-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <div className="bg-(--bg-secondary) bg-opacity-30 p-6 rounded-2xl border border-transparent">
                <p className="text-(--text-primary) leading-relaxed">
                  {formData.bio || <span className="text-(--text-secondary) italic">No biography provided yet.</span>}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
