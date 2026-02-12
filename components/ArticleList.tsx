import React from 'react';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';
import { Plus } from 'lucide-react';

interface ArticleListProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles, onEdit, onCreate, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {articles.map((article) => (
        <ArticleCard 
          key={article.id} 
          article={article} 
          onClick={() => onEdit(article)}
          onDelete={onDelete}
        />
      ))}
      
      {/* Create New Card (Always present as the last item or placeholder) */}
      <div 
        onClick={onCreate}
        className="group relative rounded-2xl p-4 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-white/50 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center min-h-[280px]"
      >
        <div className="w-16 h-16 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
          <Plus className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h3 className="font-serif font-medium text-text-main text-lg">Create New Article</h3>
        <p className="text-sm text-text-muted mt-1">Start writing something new</p>
      </div>
    </div>
  );
};