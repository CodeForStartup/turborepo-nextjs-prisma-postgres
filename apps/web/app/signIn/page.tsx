import React from "react";
import PageTitle from "@/molecules/page-title";
import SignInForm from "@/molecules/sign-in-form";

export default async function Page() {
  return (
    <div>
      <PageTitle
        title="Sign in"
        description="Sign in to Code for Startup to create posts, comment on posts, and more."
      />
      <SignInForm />
    </div>
  );
}
