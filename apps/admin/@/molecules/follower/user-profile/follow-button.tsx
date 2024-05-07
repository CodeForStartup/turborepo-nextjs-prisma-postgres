"use client";

import React from "react";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import useFollowUser from "@/hooks/useFollowUser";

import { cn } from "../../lib/utils";
import { Button, buttonVariants } from "./button";

const FollowButton: React.FC<{ authorId: string }> = ({
  authorId,
}: {
  authorId: string;
}) => {
  const t = useTranslations();
  const session = useSession();

  const { isLoading, isFollowing, onFollowUser } = useFollowUser();

  if (authorId === session?.data?.user?.id) {
    return (
      <Link
        className={cn(
          buttonVariants({
            variant: "outline",
          }),
          "mt-4 w-full",
        )}
        href="/user/profile"
      >
        {t("common.update_profile").toUpperCase()}
      </Link>
    );
  }

  return (
    <Button
      className="mt-4 w-full"
      variant="outline"
      disabled={isLoading}
      onClick={() => onFollowUser(authorId)}
    >
      {t(isFollowing ? "common.unfollow" : "common.follow").toUpperCase()}
    </Button>
  );
};

export default FollowButton;
