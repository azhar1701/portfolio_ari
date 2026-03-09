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
  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
    <div className="bg-bg-canvas rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-border-subtle">
      <div className="sticky top-0 bg-bg-canvas/80 backdrop-blur-md border-b border-border-subtle p-5 flex justify-between items-center z-10">
        <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight">{post.title}</h2>
        <button onClick={onClose} className="p-2 rounded-full text-text-muted hover:bg-bg-app transition-colors" aria-label="Close modal">
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center text-sm text-text-secondary mb-6 gap-x-4 gap-y-2">
          <span className="flex items-center"><i className="far fa-calendar-alt mr-2"></i>{new Date(post.date).toLocaleDateString()}</span>
          <span className="flex items-center"><i className="far fa-clock mr-2"></i>{post.readTime} min read</span>
          {post.author && (
            <span className="flex items-center"><i className="far fa-user mr-2"></i>{post.author}</span>
          )}
          {post.category && (
            <span className="bg-brand-accent-soft text-brand-accent-text px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest">
              {post.category}
            </span>
          )}
        </div>
        <div className="prose prose-slate dark:prose-invert max-w-none text-text-secondary leading-relaxed">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border-subtle/50">
          {post.tags?.map((tag) => (
            <span key={tag} className="bg-bg-app text-text-secondary text-[10px] px-3 py-1 rounded-full border border-border-subtle font-extrabold uppercase tracking-widest">
              #{tag}
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
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-bg-canvas p-6 rounded-xl border border-border-subtle hover:shadow-lg hover:border-brand-accent/50 transition-all duration-300 cursor-pointer group flex flex-col"
                onClick={() => setSelectedPost(post)}>
                {post.featured && (
                  <span className="inline-block bg-brand-accent text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md mb-4 self-start">
                    Featured
                  </span>
                )}
                <h3 className="text-lg font-extrabold text-text-primary mb-2 group-hover:text-brand-accent transition-colors leading-tight tracking-tight">{post.title}</h3>
                <p className="text-text-secondary mb-6 text-sm flex-grow line-clamp-3 leading-relaxed">{post.excerpt}</p>
                <div className="mt-auto">
                  <div className="flex items-center justify-between text-xs text-text-muted font-medium mb-3">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>
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