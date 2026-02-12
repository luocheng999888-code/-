import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { ArrowLeft, Save, Trash2, Clock } from 'lucide-react';

interface EditorProps {
  initialArticle: Article | null;
  onSave: (article: Article) => void;
  onBack: () => void;
  onDelete: (id: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ initialArticle, onSave, onBack, onDelete }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    if (initialArticle) {
      setTitle(initialArticle.title);
      setContent(initialArticle.content);
      setLastSaved(initialArticle.lastModified);
    }
  }, [initialArticle]);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;

    const newArticle: Article = {
      id: initialArticle?.id || crypto.randomUUID(),
      title: title || 'Untitled',
      content: content,
      excerpt: content.slice(0, 150).replace(/\n/g, ' ') + (content.length > 150 ? '...' : ''),
      lastModified: new Date().toISOString()
    };
    onSave(newArticle);
  };

  const handleDelete = () => {
    if (initialArticle) {
      onDelete(initialArticle.id);
    } else {
      onBack();
    }
  };

  return (
    <div className="fixed inset-0 bg-bg-cream z-50 flex flex-col animate-fade-in">
      {/* Editor Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-gray-200/50 bg-bg-cream/95 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-black/5 rounded-full transition-colors text-text-muted hover:text-text-main"
            title="Go Back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          {lastSaved && (
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <Clock className="w-3.5 h-3.5" />
              <span>Last saved {new Date(lastSaved).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
           {initialArticle && (
            <button 
              onClick={handleDelete}
              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Delete Article"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all font-medium"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </header>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-12">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article Title..."
            className="w-full text-4xl sm:text-5xl font-serif font-bold bg-transparent border-none outline-none placeholder-gray-300 text-text-main mb-8 leading-tight"
            autoFocus={!initialArticle}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your thoughts..."
            className="w-full h-[calc(100vh-300px)] resize-none bg-transparent border-none outline-none text-lg text-text-main/90 leading-relaxed placeholder-gray-300 font-serif"
          />
        </div>
      </div>
    </div>
  );
};