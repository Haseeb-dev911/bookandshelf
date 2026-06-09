// import AvatarForm from "@/features/profile_settings/components/AvatarForm";
import DetailsForm from "@/features/profile_settings/components/DetailsForm";
import PasswordForm from "@/features/profile_settings/components/PasswordForm";
import { Header } from "@/shared/components/Header";


export function ProfileSettingsPage() {

  return (
    <>
    <Header/>
      <div className="mx-auto mt-25 max-w-3xl space-y-8 p-6">
        {/* Profile Picture */}
        <section className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Profile Picture
          </h2>

          {/* <AvatarForm /> */}
        </section>

        {/* Profile Info */}
        <section className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Profile Information
          </h2>

          <DetailsForm />
        </section>

        {/* Password */}
        <section className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Change Password
          </h2>

          <PasswordForm />
        </section>
      </div>
    </>
  );
};
