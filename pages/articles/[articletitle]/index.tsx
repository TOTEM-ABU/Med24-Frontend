import React from "react";
import ArticleDetailPage from "@/app/Articles/[articletitle]/page";
import { useRouter } from "next/router";

const ArticleDetail = () => {
  // Use Next.js router to get the query parameters
  const router = useRouter();
  const { articletitle } = router.query;

  // Only render the page when we have the articletitle
  if (!articletitle || typeof articletitle !== "string") {
    return <div>Loading...</div>;
  }

  return <ArticleDetailPage params={{ articletitle }} />;
};

export default ArticleDetail;
