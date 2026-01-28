import React, { useState } from 'react';
import Section from './Section';
import type { BlogPost } from '../types';
import SkeletonLoader from './SkeletonLoader';

interface BlogProps {
  blogPosts: BlogPost[] | null;
}

const BlogSkeleton: React.FC = () => (
  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-slate-50 p-4 sm:p-6 rounded-lg space-y-3">
        <SkeletonLoader className="h-5 sm:h-6 w-3/4 rounded" />
        <SkeletonLoader className="h-4 w-full rounded" />
        <SkeletonLoader className="h-4 w-1/2 rounded" />
      </div>
    ))}
  </div>
);

const BlogModal: React.FC<{ post: BlogPost; onClose: () => void }> = ({ post, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">{post.title}</h2>
        <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-100">
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-slate-500 mb-4">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime} min read</span>
          {post.author && (
            <>
              <span className="mx-2">•</span>
              <span>by {post.author}</span>
            </>
          )}
          {post.category && (
            <>
              <span className="mx-2">•</span>
              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">{post.category}</span>
            </>
          )}
        </div>
        <div className="prose max-w-none text-slate-600">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {post.tags?.map((tag) => (
            <span key={tag} className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Blog: React.FC<BlogProps> = ({ blogPosts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <>
      <Section id="blog" title="Blog & Articles" iconClass="fas fa-pen-alt">
        {blogPosts ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-slate-50 p-4 sm:p-6 rounded-lg border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedPost(post)}>
                {post.featured && (
                  <span className="inline-block bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full mb-3">
                    Featured
                  </span>
                )}
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">{post.title}</h3>
                <p className="text-slate-600 mb-4 text-sm sm:text-base">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags?.map((tag) => (
                    <span key={tag} className="bg-slate-200 text-slate-700 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <BlogSkeleton />
        )}
      </Section>
      
      {selectedPost && (
        <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
};

export default Blog;