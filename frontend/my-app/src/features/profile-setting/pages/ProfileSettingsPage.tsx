import AvatarForm from "@/features/profile-setting/components/AvatarForm";
import DetailsForm from "@/features/profile-setting/components/DetailsForm";
import PasswordForm from "@/features/profile-setting/components/PasswordForm";
import { Header } from "@/shared/components/Header";
import { useProfileDataQuery } from "../services/query.service";
import { settingService } from "../services/setting.page.service";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import defaultImg from "@/assets/default-img.jpg";

export function ProfileSettingsPage() {
  const { data, isLoading } = useProfileDataQuery();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await settingService.logout();
      queryClient.clear();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const defaultAvatar = defaultImg;
  const avatarUrl = data?.payload?.profileImageUrl || defaultAvatar;
  const hasCustomImage = data?.payload?.profileImageUrl && data?.payload?.profileImageId;

  return (
    <>
      <Header />
      <div className="mx-auto mt-25 max-w-3xl space-y-8 p-6 pb-16">
        <div className="border-b border-gray-100 pb-4">
          <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
          <p className="text-gray-500 mt-1">Manage your public profile settings and security details.</p>
        </div>

        {/* Profile Picture */}
        <section className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-xs">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Profile Picture
          </h2>
          {isLoading ? (
            <div className="h-28 w-28 animate-pulse rounded-full bg-gray-100" />
          ) : (
            <AvatarForm initialAvatarUrl={avatarUrl} hasCustomImage={hasCustomImage} />
          )}
        </section>

        {/* Profile Info */}
        <section className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-xs">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Profile Information
          </h2>
          <DetailsForm />
        </section>

        {/* Password */}
        <section className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-xs">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Change Password
          </h2>
          <PasswordForm />
        </section>

        {/* Danger Zone / Logout */}
        <section className="rounded-xl border border-red-200/80 bg-red-50/20 p-6 shadow-xs">
          <h2 className="mb-2 text-xl font-semibold text-red-800">
            Session Management
          </h2>
          <p className="text-gray-500 text-sm mb-4">Logout from your account securely. You can log back in at any time.</p>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 font-medium transition-all shadow-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout from Book&Shelf
          </button>
        </section>
      </div>
    </>
  );
}
