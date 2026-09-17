import React, { useState } from 'react';
import Section from './Section';
import type { BlogPost } from '../types';
import SkeletonLoader from './SkeletonLoader';

interface BlogProps {
  blogPosts: BlogPost[] | null;
}


const BlogModal: React.FC<{ post: BlogPost; onClose: () => void }> = ({ post, onClose }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        aria-hidden="true"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-bg-canvas rounded-2xl border border-border-subtle shadow-xl flex flex-col overflow-hidden">
        <div className="sticky top-0 bg-bg-canvas border-b border-border-subtle px-6 py-4 flex justify-between items-center z-10 shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight pr-4">{post.title}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-bg-app hover:bg-red-50 text-text-muted hover:text-red-500 border border-border-subtle transition-all flex items-center justify-center shrink-0 cursor-pointer"
            aria-label="Close"
          >
            <i className="fas fa-xmark"></i>
          </button>
        </div>
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-wrap items-center text-sm text-text-secondary mb-6 gap-x-4 gap-y-2">
            <span className="flex items-center"><i className="far fa-calendar-alt mr-2"></i>{new Date(post.date).toLocaleDateString()}</span>
            <span className="flex items-center"><i className="far fa-clock mr-2"></i>{post.readTime} min read</span>
            {post.author && (
              <span className="flex items-center"><i className="far fa-user mr-2"></i>{post.author}</span>
            )}
            {post.category && (
              <span className="bg-brand-accent-soft text-brand-accent-text px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-widest">
                {post.category}
              </span>
            )}
          </div>
          <div className="text-text-secondary leading-relaxed">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border-subtle/50">
            {post.tags?.map((tag) => (
              <span key={tag} className="bg-bg-app text-text-secondary text-xs px-3 py-1 rounded-full border border-border-subtle font-bold uppercase tracking-widest">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Blog: React.FC<BlogProps> = ({ blogPosts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <>
      <Section id="blog" title="Blog" iconClass="fas fa-lightbulb">
        {blogPosts ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-bg-canvas p-6 rounded-xl border border-border-subtle hover:shadow-lg hover:border-brand-accent/50 transition-all duration-300 cursor-pointer group flex flex-col"
                onClick={() => setSelectedPost(post)}>
                {post.featured && (
                  <span className="inline-block bg-brand-accent text-white text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-md mb-4 self-start">
                    Featured
                  </span>
                )}
                <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-brand-accent transition-colors leading-tight tracking-tight">{post.title}</h3>
                <p className="text-text-secondary mb-6 text-sm flex-grow line-clamp-3 leading-relaxed">{post.excerpt}</p>
                <div className="mt-auto">
                  <div className="flex items-center justify-between text-xs text-text-muted font-medium mb-3">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs font-bold text-text-muted uppercase tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <SkeletonLoader.CardGrid items={3} />
        )}
      </Section>

      {selectedPost && (
        <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
};

export default Blog;