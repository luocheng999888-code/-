import React from 'react';
import { Article } from '../types';
import { MoreVertical, FileText } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  onDelete: (id: string) => void;
}

const ArticleSkeleton = () => (
  <div className="w-full h-full bg-white p-4 flex flex-col gap-2 opacity-80 group-hover:opacity-100 transition-opacity select-none cursor-pointer">
    <div className="w-3/4 h-2 bg-gray-100 rounded-full mb-2"></div>
    <div className="w-full h-1.5 bg-gray-50 rounded-full"></div>
    <div className="w-full h-1.5 bg-gray-50 rounded-full"></div>
    <div className="w-5/6 h-1.5 bg-gray-50 rounded-full"></div>
    <div className="w-full h-1.5 bg-gray-50 rounded-full mt-2"></div>
    <div className="w-4/5 h-1.5 bg-gray-50 rounded-full"></div>
    <div className="w-full h-1.5 bg-gray-50 rounded-full mt-2"></div>
  </div>
);

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick, onDelete }) => {
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(article.id);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-2xl p-4 shadow-soft hover:shadow-soft-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-100 flex flex-col"
    >
      {/* Thumbnail / Skeleton Area */}
      <div className="w-full aspect-[4/3] bg-gray-50 rounded-xl mb-4 overflow-hidden border border-gray-100 relative">
        <ArticleSkeleton />
        
        {/* Type Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm border border-gray-100">
           <FileText className="w-4 h-4 text-blue-500" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-serif font-semibold text-text-main text-lg leading-tight mb-1 truncate pr-2">
            {article.title}
          </h3>
          <p className="text-xs text-text-muted font-medium">
            Edited {getTimeAgo(article.lastModified)}
          </p>
        </div>
        
        <button 
          onClick={handleMenuClick}
          className="text-gray-300 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors"
          title="Delete article"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};