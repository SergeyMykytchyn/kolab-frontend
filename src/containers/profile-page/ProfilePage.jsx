import React from "react";
import HeaderGroups from "../../components/header-groups/HeaderGroups";
import ProfileForm from "../../components/profile-form/ProfileForm";

const ProfilePage = () => {
  return (
    <>
      <HeaderGroups displayAdd={false} profile={true} title="Profile" />
      <ProfileForm />
    </>
  );
};

export default ProfilePage;
