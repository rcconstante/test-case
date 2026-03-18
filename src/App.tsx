import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Trash2, ArrowRightLeft, Sparkles, TerminalSquare } from 'lucide-react';
import { cn } from './lib/utils';
import {
  toUppercase,
  toLowercase,
  toTitleCase,
  toSentenceCase,
  removeExtraSpaces,
  removeLineBreaks,
} from './utils/textUtils';

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTransformation, setActiveTransformation] = useState<string | null>(null);

  // Character and word counts
  const inputChars = input.length;
  const inputWords = input.trim() ? input.trim().split(/\s+/).length : 0;
  
  const outputChars = output.length;
  const outputWords = output.trim() ? output.trim().split(/\s+/).length : 0;



  const handleTransform = (
    label: string,
    transformFn: (text: string) => string
  ) => {
    setOutput(transformFn(input));
    setActiveTransformation(label);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setActiveTransformation(null);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-[#FAFAFA] font-outfit selection:bg-brand-500/30 font-light pb-20">
      
      {/* Background Orbs Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-600/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-brand-900/10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-purple-500 flex items-center justify-center p-[1px]">
               <div className="w-full h-full bg-dark-bg rounded-xl flex items-center justify-center">
                 <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain rounded-md" onError={(e) => { e.currentTarget.style.display='none' }} />
                 <TerminalSquare className="w-4 h-4 text-brand-400 absolute opacity-50" />
               </div>
            </div>
            <span className="font-outfit font-bold text-xl tracking-tight text-white">Text-Case<span className="text-brand-400">.dev</span></span>
          </div>
          
          <div className="flex gap-4 items-center">
            <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</button>
            <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">API</button>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 rounded-full text-sm font-medium transition-all">
               <Sparkles className="w-4 h-4 text-brand-400" />
               Unlock Pro
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-medium tracking-wide mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            V2.0 Now Live - Instantly Transform Your Text
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            The Ultimate Text <span className="text-gradient">Transformer.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Paste your text below and instantly format, clean, and optimize it. Free, fast, and entirely strictly private layout.
          </motion.p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-stretch">
          
          {/* Input Block */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="glass-effect rounded-2xl overflow-hidden flex-1 flex flex-col group focus-within:ring-2 focus-within:ring-brand-500/50 transition-all">
              <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-500"></div> Input Text
                </h2>
                <div className="text-xs text-gray-500 font-mono">
                  {inputWords} words · {inputChars} chars
                </div>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your text here to get started..."
                className="w-full flex-1 min-h-[300px] lg:min-h-[400px] p-5 bg-transparent resize-none text-gray-200 placeholder:text-gray-600 focus:outline-none font-sans leading-relaxed text-base"
                spellCheck="false"
              />
              <div className="p-3 border-t border-white/5 bg-white/[0.01] flex justify-end">
                <button 
                  onClick={handleClear}
                  disabled={!input}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Trash2 className="w-4 h-4" /> Clear
                </button>
              </div>
            </div>
          </motion.div>

          {/* Action Center (Buttons Grid) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 justify-center"
          >
            <div className="glass-effect rounded-2xl p-4 w-full lg:w-[220px]">
              
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Case Convert</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  {[
                    { label: 'UPPERCASE', fn: toUppercase },
                    { label: 'lowercase', fn: toLowercase },
                    { label: 'Title Case', fn: toTitleCase },
                    { label: 'Sentence case', fn: toSentenceCase },
                  ].map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleTransform(action.label, action.fn)}
                      disabled={!input}
                      className={cn(
                        "text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between group",
                        !input ? "opacity-50 cursor-not-allowed bg-white/5 text-gray-500" :
                        activeTransformation === action.label 
                          ? "bg-brand-500 text-white shadow-glow" 
                          : "bg-dark-surface hover:bg-white/10 text-gray-300 border border-white/5 hover:border-white/10"
                      )}
                    >
                      {action.label}
                      <ArrowRightLeft className={cn("w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all", input && "group-hover:opacity-100 group-hover:translate-x-0", activeTransformation === action.label && "opacity-100 translate-x-0")} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Clean Up</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  {[
                    { label: 'Remove Spaces', fn: removeExtraSpaces },
                    { label: 'Remove Breaks', fn: removeLineBreaks },
                  ].map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleTransform(action.label, action.fn)}
                      disabled={!input}
                      className="text-left px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 bg-dark-surface hover:bg-white/10 text-gray-300 border border-white/5 hover:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 mb-3 cursor-not-allowed opacity-60">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  <h3 className="text-xs font-semibold text-brand-300 uppercase tracking-wider">Pro Tools</h3>
                </div>
                <div className="grid grid-cols-1 gap-2 opacity-50">
                   <button disabled className="text-left px-3 py-2 rounded-xl text-sm font-medium bg-dark-surface border border-brand-500/10 text-gray-400 cursor-not-allowed flex justify-between items-center group">
                      Remove Emojis
                   </button>
                   <button disabled className="text-left px-3 py-2 rounded-xl text-sm font-medium bg-dark-surface border border-brand-500/10 text-gray-400 cursor-not-allowed flex justify-between items-center group">
                      Grammar Fix
                   </button>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Output Block */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="glass-effect rounded-2xl overflow-hidden flex-1 flex flex-col group">
              <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                 <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div> Output Result
                 </h2>
                 <div className="text-xs text-gray-500 font-mono">
                  {outputWords} words · {outputChars} chars
                </div>
              </div>
              <textarea
                value={output}
                readOnly
                placeholder="Transformed text will appear here..."
                className="w-full flex-1 min-h-[300px] lg:min-h-[400px] p-5 bg-transparent resize-none text-white focus:outline-none font-sans leading-relaxed text-base selection:bg-brand-500/40"
              />
              <div className="p-3 border-t border-white/5 bg-white/[0.01] flex justify-between items-center">
                <div className="text-xs text-brand-400 px-3 opacity-0 animate-fade-in" style={{ opacity: activeTransformation ? 1 : 0}}>
                  Applied: {activeTransformation}
                </div>
                <button 
                  onClick={handleCopy}
                  disabled={!output}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
                    !output ? "bg-white/5 text-gray-500 cursor-not-allowed" : 
                    copied ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-brand-600 hover:bg-brand-500 text-white shadow-glow"
                  )}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} 
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
              </div>
            </div>
          </motion.div>
          
        </div>

      </main>
    </div>
  );
}
