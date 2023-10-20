import React from "react";
import PageTitle from "@/molecules/page-title";
import SignInForm from "@/molecules/sign-in-form";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfigs } from "configs/auth";

export default async function Page() {
  const session = await getServerSession(authConfigs);

  if (session) {
    redirect("/");
  }

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
