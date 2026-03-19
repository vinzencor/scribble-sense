"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import MouseSpark from "@/components/ui/mouse-spark";
import SEOHelmet from "@/components/SEOHelmet";
import { getBlogBySlug, Blog } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      const { data } = await getBlogBySlug(slug);
      setBlog(data ?? null);
      setLoading(false);
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#382467]" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <MouseSpark />
        <Navigation />
        <div className="pt-32 text-center text-slate-600">
          <p className="mb-4">Blog post not found.</p>
          <Link to="/blog" className="text-[#382467] font-semibold hover:text-[#4a3080]">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <SEOHelmet
        page="blog-post"
        title={blog.title}
        description={blog.excerpt}
        ogImageUrl={blog.featured_image_url}
      />
      <MouseSpark />
      <Navigation />

      <section className="pt-28 pb-10">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
              {blog.published_date ? format(new Date(blog.published_date), "MMMM d, yyyy") : ""}
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-[#382467] mb-4">
              {blog.title}
            </h1>
            <p className="text-sm text-slate-600 mb-6">By {blog.author || "ScribbleSense"}</p>
          </motion.div>
        </div>
      </section>

      {blog.featured_image_url ? (
        <section className="pb-10">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
              <img
                src={blog.featured_image_url}
                alt={blog.title}
                className="w-full h-[320px] md:h-[420px] object-cover"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="pb-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </section>
    </main>
  );
};

export default BlogPost;
