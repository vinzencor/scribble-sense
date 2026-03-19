"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import MouseSpark from "@/components/ui/mouse-spark";
import SEOHelmet from "@/components/SEOHelmet";
import { getBlogs, Blog } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const BlogIndex = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await getBlogs();
      setBlogs(data || []);
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <SEOHelmet page="blog" />
      <MouseSpark />
      <Navigation />

      <section className="relative h-[260px] md:h-[320px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#382467] via-[#6a48a8] to-pink-400" />
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-2">ScribbleSense Blog</h1>
          <p className="text-slate-100/90 max-w-2xl mx-auto text-xs md:text-sm">
            Insights, strategies, and stories about handwriting support, dysgraphia care, and family guidance.
          </p>
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#382467]" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center text-slate-500">No blog posts yet.</div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full"
                  >
                    {blog.featured_image_url ? (
                      <div className="h-44 overflow-hidden">
                        <img
                          src={blog.featured_image_url}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="p-6 flex flex-col h-full">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                        {blog.published_date ? format(new Date(blog.published_date), "MMMM d, yyyy") : ""}
                      </p>
                      <h3 className="text-lg md:text-xl font-semibold text-[#382467] mb-3">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-slate-600 flex-1">
                        {blog.excerpt}
                      </p>
                      <div className="mt-6">
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#382467] hover:text-[#4a3080]">
                          Read More
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogIndex;
