import React, { useState, useEffect } from 'react';
import type { PortfolioData } from '../types';

interface SearchBarProps {
  data: PortfolioData | null;
  onResults: (results: SearchResult[]) => void;
}

interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: string;
  section: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ data, onResults }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!data || query.length < 2) {
      setResults([]);
      onResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const searchTerm = query.toLowerCase();

    // Search in experience
    data.experience.forEach((exp, index) => {
      if (exp.role.toLowerCase().includes(searchTerm) || 
          exp.company.toLowerCase().includes(searchTerm) ||
          exp.responsibilities.some(r => r.toLowerCase().includes(searchTerm))) {
        searchResults.push({
          id: `exp-${index}`,
          title: exp.role,
          content: exp.company,
          type: 'Experience',
          section: '#experience'
        });
      }
    });

    // Search in projects
    data.projects.forEach((project) => {
      if (project.name.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          project.technologies.some(t => t.toLowerCase().includes(searchTerm))) {
        searchResults.push({
          id: project.id,
          title: project.name,
          content: project.description,
          type: 'Project',
          section: '#projects'
        });
      }
    });

    // Search in skills
    data.skills.forEach((skillCat, index) => {
      if (skillCat.category.toLowerCase().includes(searchTerm) ||
          skillCat.skills.some(s => s.toLowerCase().includes(searchTerm))) {
        searchResults.push({
          id: `skill-${index}`,
          title: skillCat.category,
          content: skillCat.skills.join(', '),
          type: 'Skill',
          section: '#skills'
        });
      }
    });

    // Search in publications
    data.publications.forEach((pub, index) => {
      if (pub.title.toLowerCase().includes(searchTerm) ||
          pub.details.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          id: `pub-${index}`,
          title: pub.title,
          content: pub.details,
          type: 'Publication',
          section: '#publications'
        });
      }
    });

    // Search in blog posts
    if (data.blogPosts) {
      data.blogPosts.forEach((post) => {
        if (post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.tags.some(t => t.toLowerCase().includes(searchTerm))) {
          searchResults.push({
            id: post.id,
            title: post.title,
            content: post.excerpt,
            type: 'Blog Post',
            section: '#blog'
          });
        }
      });
    }

    setResults(searchResults.slice(0, 8)); // Limit to 8 results
    onResults(searchResults);
  }, [query, data, onResults]);

  const handleResultClick = (result: SearchResult) => {
    const element = document.querySelector(result.section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search portfolio..."
          className="w-full px-4 py-2 pl-10 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800 text-sm">{result.title}</h4>
                  <p className="text-slate-600 text-xs mt-1 line-clamp-2">{result.content}</p>
                </div>
                <span className="text-xs text-cyan-600 bg-cyan-50 px-2 py-1 rounded ml-2">
                  {result.type}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 p-4 text-center">
          <p className="text-slate-500 text-sm">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;