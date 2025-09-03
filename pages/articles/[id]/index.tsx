import React from "react";
import ArticleDetailPage from "@/app/Articles/[id]/page";

const ArticleDetail = ({ params }: { params: { id: string } }) => {
  return <ArticleDetailPage params={params} />;
};

export default ArticleDetail;
