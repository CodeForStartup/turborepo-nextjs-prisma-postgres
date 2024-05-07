import { useTranslations } from "next-intl";

const PreviewPostPage: React.FC = () => {
  const t = useTranslations();

  // Fetch the post content based on the lang and postId

  return (
    <div>
      <h1>{t("common.preview")}</h1>
    </div>
  );
};

export default PreviewPostPage;
