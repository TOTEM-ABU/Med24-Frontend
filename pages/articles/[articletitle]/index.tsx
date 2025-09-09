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

  // Create a Promise for the params to match the App Router component's expectation
  const paramsPromise = Promise.resolve({ articletitle });

  return <ArticleDetailPage params={paramsPromise} />;
};

export default ArticleDetail;
