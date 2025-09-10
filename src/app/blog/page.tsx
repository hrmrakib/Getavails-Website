import BlogHero from "@/components/blog/BlogHero";
import BlogHeroContent from "@/components/blog/BlogHeroContent";
import LatestBlog from "@/components/blog/LatestBlog";
import React from "react";

const BlogPage = () => {
  return (
    <div>
      <BlogHero />
      <BlogHeroContent />
      <LatestBlog />
    </div>
  );
};

export default BlogPage;
