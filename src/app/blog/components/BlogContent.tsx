"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  authorRole: string;
}

interface BlogContentProps {
  posts: BlogPost[];
}

export default function BlogContent({ posts }: BlogContentProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter posts based on category and search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      categoryFilter === "all" ||
      post.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(posts.map((post) => post.category.toLowerCase())),
  ];

  return (
    <div
      className={`min-h-screen bg-background text-foreground font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Header Banner */}
      <div className="relative py-24 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tech Insights Blog
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Expert advice, tips, and industry insights from our IT professionals
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 md:px-8 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition duration-300 ${
                    categoryFilter === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setCategoryFilter(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <FadeIn
                  key={post.id}
                  delay={0.1 * index}
                  direction="up"
                  className="h-full"
                >
                  <Link href={`/blog/${post.id}`} className="block h-full">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                      <div className="relative h-48 bg-gray-200">
                        {/* Placeholder for blog post image */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                          <svg
                            className="h-12 w-12"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        </div>
                        <div className="flex items-center mt-4">
                          <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                            {post.author
                              .split(" ")
                              .map((name) => name[0])
                              .join("")}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {post.author}
                            </p>
                            <p className="text-sm text-gray-500">{post.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No articles found
              </h3>
              <p className="mt-1 text-gray-500">
                Try changing your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setCategoryFilter("all");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 text-blue-100">
            Subscribe to our newsletter for the latest tech tips, industry news,
            and exclusive offers.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition duration-300"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm mt-4 text-blue-200">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
