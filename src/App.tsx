import { Search, Mic } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen relative bg-white flex flex-col items-center justify-center font-sans overflow-hidden text-neutral-900 px-4 sm:px-12 w-full">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-gradient-to-r from-blue-50/40 via-purple-50/40 to-pink-50/40 blur-3xl rounded-full opacity-60 pointer-events-none"></div>

      {/* Subtle background dots texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <motion.main 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
        className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl z-10"
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-[100px] font-black leading-[0.9] tracking-tighter text-neutral-900 mb-10 sm:mb-16 text-center select-none"
        >
          SOMETHING FINDER
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl px-4 sm:px-0 group"
        >
          <form 
            action="http://localhost:5678/webhook-test/bc30a955-42b6-43de-b918-8dfb1f01a881"
            method="GET"
            className="relative flex items-center bg-white border border-neutral-200 rounded-full h-16 sm:h-[72px] px-5 sm:px-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-neutral-300 focus-within:shadow-xl focus-within:border-neutral-400 w-full"
          >
            
            <button type="submit" className="flex-shrink-0 mr-3 sm:mr-4 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded-full" aria-label="Search">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <input
              ref={inputRef}
              name="query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search anything..."
              className="flex-1 h-full w-full bg-transparent border-none outline-none text-lg sm:text-xl font-medium placeholder-neutral-400 text-neutral-800"
            />
            
            <div className="flex items-center gap-3 sm:gap-5 pl-2 sm:pl-4 flex-shrink-0">
              <kbd className="hidden sm:flex items-center gap-1 bg-neutral-100 px-2 py-1 rounded-md select-none">
                <span className="text-[10px] font-bold text-neutral-500 font-sans">⌘</span>
                <span className="text-[10px] font-bold text-neutral-500 font-sans">K</span>
              </kbd>
              <button 
                type="button"
                className="text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer outline-none"
                aria-label="Search by voice"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </form>
        </motion.div>
      </motion.main>
    </div>
  );
}
