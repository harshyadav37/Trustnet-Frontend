import { useEffect, useRef, useState } from "react";
import { Button } from "@/app/components/ui/button";

const EditProfileModal = ({ isOpen, onClose, user, onSave }: { isOpen: boolean; onClose: () => void; user: any; onSave: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    about: "",
    location: "",
    dob: "",
    avatar: "",
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        about: user.about || "",
        location: user.location || "",
        dob: user.dob || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, avatar: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Profile Image */}
          <div>
            <label className="text-sm text-slate-600 block mb-2">Profile Image</label>
            <div className="flex items-center gap-4">
              <div>
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    className="w-20 h-20 rounded-full object-cover"
                    alt="Avatar preview"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">No Image</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  id="profile-avatar-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button variant="outline" onClick={() => fileInputRef.current?.click()} size="sm">Upload</Button>
                {formData.avatar && (
                  <Button variant="ghost" onClick={() => setFormData({ ...formData, avatar: '' })} size="sm">Remove</Button>
                )}
              </div>
            </div>
          </div>

              <InputField label="Username" name="name" value={formData.name} onChange={handleChange} />
              <InputField label="Email" name="email" value={formData.email} onChange={handleChange} />

          {/* About */}
          <div>
            <label className="text-sm text-slate-600">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>

          <InputField label="Location" name="location" value={formData.location} onChange={handleChange} />

          {/* Date of Birth */}
          <div>
            <label className="text-sm text-slate-600">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange }: { label: string; name: string; value: string; onChange: (e: any) => void }) => (
  <div>
    <label className="text-sm text-slate-600">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full mt-1 px-3 py-2 border rounded-md"
    />
  </div>
);

export default EditProfileModal;
