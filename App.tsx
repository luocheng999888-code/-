import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ArticleList } from './components/ArticleList';
import { Editor } from './components/Editor';
import { Article, ViewState } from './types';
import { Plus } from 'lucide-react';

const INITIAL_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'How to Reflect on Your Own Behavior',
    excerpt: 'Self-reflection is the key to personal growth. In this article, we explore three fundamental steps...',
    content: 'Full content of the article would go here...',
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: '2',
    title: 'Deep Reflection: Five Dimensions of Action',
    excerpt: 'Action without thought is impulsive. Thought without action is paralysis. Let us bridge the gap.',
    content: 'Content...',
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
  },
  {
    id: '3',
    title: 'English Speaking Methodology',
    excerpt: 'Improving fluency requires more than just vocabulary lists. It requires immersion and confidence.',
    content: 'Content...',
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
  },
  {
    id: '4',
    title: 'Unlock Ultimate Focus',
    excerpt: 'In a world of distractions, focus is the new IQ. Here are techniques to regain your attention span.',
    content: 'Content...',
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
  }
];

export default function App() {
  const [viewState, setViewState] = useState<ViewState>('list');
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle creating a new article
  const handleCreateNew = useCallback(() => {
    setCurrentArticle(null);
    setViewState('editor');
  }, []);

  // Handle editing an existing article
  const handleEditArticle = useCallback((article: Article) => {
    setCurrentArticle(article);
    setViewState('editor');
  }, []);

  // Handle saving an article from the editor
  const handleSaveArticle = useCallback((article: Article) => {
    setArticles(prev => {
      const exists = prev.find(a => a.id === article.id);
      if (exists) {
        return prev.map(a => a.id === article.id ? article : a);
      }
      return [article, ...prev];
    });
    setViewState('list');
  }, []);

  // Handle deleting an article
  const handleDeleteArticle = useCallback((id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setArticles(prev => prev.filter(a => a.id !== id));
      if (viewState === 'editor' && currentArticle?.id === id) {
        setViewState('list');
      }
    }
  }, [currentArticle, viewState]);

  // Handle file import
  const handleImport = useCallback((importedArticles: Article[]) => {
    setArticles(prev => [...importedArticles, ...prev]);
  }, []);

  // Filter articles based on search
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-bg-cream text-text-main font-sans selection:bg-yellow-200">
      {viewState === 'list' && (
        <>
          <Navbar 
            onSearch={setSearchQuery} 
            onImport={handleImport}
          />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2 text-text-main font-medium cursor-pointer hover:text-primary transition-colors">
                <span className="font-serif text-lg">Last Opened Time</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-text-muted hover:bg-white/50 rounded-lg transition-colors" title="Grid View">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                </button>
                <button className="p-2 text-text-muted hover:bg-white/50 rounded-lg transition-colors" title="List View">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
                </button>
              </div>
            </div>

            <ArticleList 
              articles={filteredArticles} 
              onEdit={handleEditArticle} 
              onCreate={handleCreateNew}
              onDelete={handleDeleteArticle}
            />
          </main>

          {/* Sticky Floating Action Button */}
          <button 
            onClick={handleCreateNew}
            className="fixed bottom-8 right-8 w-14 h-14 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center z-50 group border border-blue-200"
            aria-label="Create new article"
          >
            <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </>
      )}

      {viewState === 'editor' && (
        <Editor 
          initialArticle={currentArticle} 
          onSave={handleSaveArticle}
          onBack={() => setViewState('list')}
          onDelete={handleDeleteArticle}
        />
      )}
    </div>
  );
}