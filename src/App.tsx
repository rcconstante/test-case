import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Download, FileText, Trash2, Edit2, TerminalSquare, Sparkles, Copy, Check } from 'lucide-react';
import { cn } from './lib/utils';
import { TestCase, Priority, loadTestCases, saveTestCases, exportTXT, exportCSV } from './utils/testCases';

export default function App() {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('');
  const [expected, setExpected] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    const data = loadTestCases();
    if (data.length > 0) {
      setTestCases(data);
    }
  }, []);

  // Sync to local storage
  useEffect(() => {
    saveTestCases(testCases);
  }, [testCases]);

  const handleSave = () => {
    if (!title.trim() || !steps.trim()) return;

    if (isEditing) {
      setTestCases(prev => prev.map(tc => tc.id === isEditing ? {
        ...tc,
        title,
        description,
        steps: steps.split('\\n').filter(s => s.trim() !== ''),
        expected,
        priority
      } : tc));
      setIsEditing(null);
    } else {
      const newTc: TestCase = {
        id: crypto.randomUUID(),
        title,
        description,
        steps: steps.split('\\n').filter(s => s.trim() !== ''),
        expected,
        priority,
        createdAt: Date.now()
      };
      setTestCases(prev => [newTc, ...prev]);
    }
    
    // Reset Form
    setTitle('');
    setDescription('');
    setSteps('');
    setExpected('');
    setPriority('Medium');
  };

  const handleEdit = (tc: TestCase) => {
    setIsEditing(tc.id);
    setTitle(tc.title);
    setDescription(tc.description);
    setSteps(tc.steps.join('\\n'));
    setExpected(tc.expected);
    setPriority(tc.priority);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setTestCases(prev => prev.filter(tc => tc.id !== id));
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to delete ALL test cases?")) {
      setTestCases([]);
    }
  };

  const copyToClipboard = async (tc: TestCase) => {
    const content = `Test Case: ${tc.title}\\nDescription: ${tc.description}\\nPriority: ${tc.priority}\\nSteps:\\n${tc.steps.map((s, i) => `${i + 1}. ${s}`).join('\\n')}\\nExpected:\\n${tc.expected}`;
    await navigator.clipboard.writeText(content);
    setCopiedId(tc.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const PriorityBadge = ({ level }: { level: Priority }) => {
    const colors = {
      Low: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
      Medium: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      High: 'text-brand-400 bg-brand-500/10 border-brand-500/20'
    };
    return (
      <span className={cn("px-2.5 py-1 rounded-md text-xs font-semibold border", colors[level])}>
        {level}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-dark-bg text-[#FAFAFA] font-outfit selection:bg-brand-500/30 font-light pb-20">
      
      {/* Background Orbs Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-600/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-brand-900/10 blur-[120px]" />
      </div>

      {/* Semantic Navbar Setup */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-purple-500 flex items-center justify-center p-[1px]">
               <div className="w-full h-full bg-dark-bg rounded-xl flex items-center justify-center">
                 <TerminalSquare className="w-5 h-5 text-brand-400 absolute opacity-80" />
               </div>
            </div>
            <span className="font-outfit font-bold text-xl tracking-tight text-white">Test-Case<span className="text-brand-400">.dev</span></span>
          </div>
          
          <div className="flex gap-4 items-center">
            <nav>
              <ul className="flex gap-4">
                <li><a href="#" className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors">API</a></li>
              </ul>
            </nav>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 rounded-full text-sm font-medium transition-all">
               <Sparkles className="w-4 h-4 text-brand-400" />
               <span className="hidden sm:inline">Unlock Pro</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gradient leading-tight">
            Build Structured Test Cases Instantly.
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            Turn your messy testing notes into organized, professional test cases in seconds. 
          </p>
          <p className="text-gray-500 text-sm">
            Strictly Private. No Login Required. Free to Export.
          </p>
        </div>

        {/* Input Form Panel */}
        <section className="glass-effect rounded-2xl overflow-hidden mb-12 shadow-glow">
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-200 flex items-center gap-2 uppercase tracking-wide">
              {isEditing ? <Edit2 className="w-4 h-4 text-brand-400" /> : <Plus className="w-4 h-4 text-brand-400" />}
              {isEditing ? 'Editing Test Case' : 'New Test Case'}
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-dark-surface/50">
            {/* Title & Priority */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Login Success"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-dark-surface border border-white/10 text-white focus:outline-none focus:border-brand-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Priority</label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as Priority)}
                  className="w-full px-4 py-3 rounded-xl bg-dark-surface border border-white/10 text-white focus:outline-none focus:border-brand-500/50 transition-colors appearance-none"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
               <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</label>
               <textarea
                  placeholder="What is the objective of this test case?"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-dark-surface border border-white/10 text-white focus:outline-none focus:border-brand-500/50 min-h-[80px] transition-colors"
               />
            </div>

            {/* Steps */}
            <div className="md:col-span-1">
               <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Steps (One per line) *</label>
               <textarea
                  placeholder={"1. Open browser\\n2. Navigate to login\\n3. Submit empty form"}
                  value={steps}
                  onChange={e => setSteps(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-dark-surface border border-white/10 text-white focus:outline-none focus:border-brand-500/50 min-h-[140px] resize-y transition-colors leading-relaxed"
               />
            </div>

            {/* Expected Result */}
            <div className="md:col-span-1">
               <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Expected Result</label>
               <textarea
                  placeholder="Form validation errors should be displayed. Setup should not proceed."
                  value={expected}
                  onChange={e => setExpected(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-dark-surface border border-white/10 text-white focus:outline-none focus:border-brand-500/50 min-h-[140px] resize-y transition-colors leading-relaxed"
               />
            </div>
          </div>
          <div className="px-6 py-4 border-t border-white/5 bg-white/[0.01] flex justify-end gap-3">
             {isEditing && (
               <button 
                onClick={() => {
                  setIsEditing(null);
                  setTitle(''); setDescription(''); setSteps(''); setExpected(''); setPriority('Medium');
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white transition-colors"
               >
                 Cancel
               </button>
             )}
             <button 
                onClick={handleSave}
                disabled={!title.trim() || !steps.trim()}
                className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {isEditing ? 'Save Changes' : 'Save Test Case'}
             </button>
          </div>
        </section>

        {/* Test Case List */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 border-b border-white/10 pb-4">
            <h2 className="text-xl font-semibold text-white">Your Test Cases ({testCases.length})</h2>
            
            <div className="flex items-center gap-3">
               <button 
                 onClick={() => exportTXT(testCases)}
                 disabled={testCases.length === 0}
                 className="flex items-center gap-2 px-4 py-2 bg-dark-surface border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
               >
                 <FileText className="w-4 h-4" /> Export TXT
               </button>
               <button 
                 onClick={() => exportCSV(testCases)}
                 disabled={testCases.length === 0}
                 className="flex items-center gap-2 px-4 py-2 bg-dark-surface border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
               >
                 <Download className="w-4 h-4" /> Export CSV
               </button>
               {testCases.length > 0 && (
                 <button 
                    onClick={clearAll}
                    className="flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-400/10 rounded-lg text-sm font-medium transition-colors"
                 >
                    <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Clear</span>
                 </button>
               )}
            </div>
          </div>

          <div className="glass-effect rounded-2xl overflow-hidden shadow-glow mb-12 border border-white/5 bg-dark-surface/30">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/5">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300 uppercase tracking-wider w-1/2">Title / Details</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300 uppercase tracking-wider">Priority</th>
                    <th className="py-4 px-6 text-sm font-semibold text-gray-300 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {testCases.length === 0 && (
                      <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <td colSpan={3} className="py-16 text-center">
                           <TerminalSquare className="w-12 h-12 text-gray-600 mx-auto mb-4 opacity-50" />
                           <h3 className="text-lg font-medium text-gray-400 mb-2">No test cases yet</h3>
                           <p className="text-sm text-gray-500 max-w-sm mx-auto">Create your first organized QA test case above. It will be saved instantly to your browser.</p>
                        </td>
                      </motion.tr>
                    )}
                    {testCases.map((tc) => (
                      <TableRow 
                        key={tc.id} 
                        tc={tc} 
                        isEditing={isEditing === tc.id}
                        onEdit={() => handleEdit(tc)} 
                        onDelete={() => handleDelete(tc.id)} 
                        onCopy={() => copyToClipboard(tc)} 
                        copied={copiedId === tc.id}
                        PriorityBadge={PriorityBadge}
                      />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

interface TableRowProps {
  tc: TestCase;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onCopy: () => void;
  copied: boolean;
  PriorityBadge: ({ level }: { level: Priority }) => JSX.Element;
}

// Subcomponent for Expandable Rows
function TableRow({ tc, isEditing, onEdit, onDelete, onCopy, copied, PriorityBadge }: TableRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.tr 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn("border-b border-white/5 group hover:bg-white/[0.01] transition-colors", isEditing && "bg-brand-500/5")}
      >
        <td className="py-4 px-6">
          <div className="flex flex-col">
             <button 
                onClick={() => setExpanded(!expanded)} 
                className="text-left flex items-center gap-2 hover:text-brand-300 transition-colors focus:outline-none"
             >
                <span className="font-semibold text-white text-base truncate max-w-[200px] md:max-w-md">{tc.title}</span>
                <span className="text-xs text-brand-400 border border-brand-400/20 bg-brand-400/10 px-2 py-0.5 rounded-full whitespace-nowrap hidden sm:inline-block">
                  {expanded ? 'Hide Details' : 'View Details'}
                </span>
             </button>
             {tc.description && !expanded && (
               <p className="text-sm text-gray-400 mt-1 truncate max-w-[200px] md:max-w-md">{tc.description}</p>
             )}
          </div>
        </td>
        <td className="py-4 px-6 align-top pt-5">
           <PriorityBadge level={tc.priority} />
        </td>
        <td className="py-4 px-6 align-top text-right pt-4">
          <div className="flex items-center justify-end gap-2">
            <button title="Copy" onClick={onCopy} className={cn("p-1.5 rounded-lg text-gray-400 hover:text-white transition-colors hover:bg-white/10", copied && "text-green-400 bg-green-400/10")}>
               {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <button title="Edit" onClick={onEdit} className="p-1.5 rounded-lg text-blue-400 hover:text-blue-300 transition-colors hover:bg-white/10">
               <Edit2 className="w-4 h-4" />
            </button>
            <button title="Delete" onClick={onDelete} className="p-1.5 rounded-lg text-red-400 hover:text-red-300 transition-colors hover:bg-red-500/10">
               <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </motion.tr>
      
      {/* Expandable Details Section */}
      <AnimatePresence>
        {expanded && (
          <motion.tr 
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
             className="bg-black/20 border-b border-white/5 overflow-hidden"
          >
            <td colSpan={3} className="py-6 px-6 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl border border-white/5 bg-dark-bg/50">
                {tc.description && (
                  <div className="col-span-1 md:col-span-2 mb-2">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Objective / Description</h4>
                    <p className="text-sm text-gray-300 bg-black/30 p-3 rounded-lg border border-white/5">{tc.description}</p>
                  </div>
                )}
                
                <div>
                   <h4 className="text-xs font-semibold text-brand-300 uppercase tracking-wider mb-2">Steps</h4>
                   <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1.5 bg-black/30 p-4 rounded-lg border border-white/5">
                     {tc.steps.map((s: string, i: number) => (
                       <li key={i}>{s}</li>
                     ))}
                   </ol>
                </div>
                
                <div>
                   <h4 className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">Expected Result</h4>
                   <div className="text-sm text-gray-300 whitespace-pre-wrap bg-black/30 p-4 rounded-lg border border-white/5 h-full">
                     {tc.expected || <span className="text-gray-600 italic">None provided</span>}
                   </div>
                </div>
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}
