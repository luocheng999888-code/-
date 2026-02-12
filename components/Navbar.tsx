import React, { useRef } from 'react';
import { Search, Upload, PenTool } from 'lucide-react';
import { Article } from '../types';

interface NavbarProps {
  onSearch: (query: string) => void;
  onImport: (articles: Article[]) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newArticles: Article[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const text = await file.text();
      
      // Basic logic to extract title from filename
      const title = file.name.replace(/\.(txt|md)$/, '');
      
      newArticles.push({
        id: crypto.randomUUID(),
        title: title,
        content: text,
        excerpt: text.slice(0, 100) + '...',
        lastModified: new Date().toISOString()
      });
    }

    onImport(newArticles);
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-bg-cream/95 backdrop-blur-sm border-b border-gray-200/50 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <PenTool className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif font-semibold text-text-main hidden sm:block tracking-tight">
            My Articles
          </h1>
        </div>

        {/* Actions Area */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white px-4 py-2.5 rounded-xl shadow-sm border border-transparent focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all w-64">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input 
              type="text"
              placeholder="Search articles..."
              onChange={(e) => onSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-text-main placeholder-gray-400 w-full"
            />
          </div>

          {/* Import Button */}
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-text-main rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-gray-200 transition-all font-medium text-sm group"
          >
            <Upload className="w-4 h-4 text-primary group-hover:-translate-y-0.5 transition-transform" />
            <span className="hidden sm:inline">Import from Local</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt,.md"
            multiple
            className="hidden"
          />

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-200 to-orange-200 p-0.5 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <img 
              src="https://picsum.photos/100/100" 
              alt="User Profile" 
              className="w-full h-full rounded-full object-cover border-2 border-white"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};