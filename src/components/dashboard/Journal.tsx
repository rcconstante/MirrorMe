import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Calendar, 
  Heart, 
  Frown, 
  Smile, 
  Meh, 
  Angry,
  Search,
  Filter,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  emotion: 'happy' | 'sad' | 'neutral' | 'angry' | 'excited' | 'anxious';
  mood: number; // 1-10 scale
  date: string;
  tags: string[];
}

const emotionColors = {
  happy: 'text-yellow-400 bg-yellow-400/20',
  sad: 'text-blue-400 bg-blue-400/20',
  neutral: 'text-gray-400 bg-gray-400/20',
  angry: 'text-red-400 bg-red-400/20',
  excited: 'text-green-400 bg-green-400/20',
  anxious: 'text-purple-400 bg-purple-400/20'
};

const emotionIcons = {
  happy: <Smile size={16} />,
  sad: <Frown size={16} />,
  neutral: <Meh size={16} />,
  angry: <Angry size={16} />,
  excited: <Heart size={16} />,
  anxious: <Frown size={16} />
};

// Mock emotion detection function
const detectEmotion = (text: string): { emotion: JournalEntry['emotion'], mood: number } => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('happy') || lowerText.includes('joy') || lowerText.includes('excited') || lowerText.includes('great')) {
    return { emotion: 'happy', mood: Math.floor(Math.random() * 3) + 8 };
  }
  if (lowerText.includes('sad') || lowerText.includes('depressed') || lowerText.includes('down') || lowerText.includes('upset')) {
    return { emotion: 'sad', mood: Math.floor(Math.random() * 3) + 2 };
  }
  if (lowerText.includes('angry') || lowerText.includes('frustrated') || lowerText.includes('mad')) {
    return { emotion: 'angry', mood: Math.floor(Math.random() * 3) + 3 };
  }
  if (lowerText.includes('anxious') || lowerText.includes('worried') || lowerText.includes('nervous')) {
    return { emotion: 'anxious', mood: Math.floor(Math.random() * 3) + 4 };
  }
  if (lowerText.includes('amazing') || lowerText.includes('fantastic') || lowerText.includes('wonderful')) {
    return { emotion: 'excited', mood: Math.floor(Math.random() * 2) + 9 };
  }
  
  return { emotion: 'neutral', mood: Math.floor(Math.random() * 3) + 5 };
};

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEmotion, setFilterEmotion] = useState<string>('all');

  // Load mock data on component mount
  useEffect(() => {
    const mockEntries: JournalEntry[] = [
      {
        id: '1',
        title: 'Great Day at Work',
        content: 'Today was amazing! I finally completed the project I\'ve been working on for weeks. I feel so accomplished and happy.',
        emotion: 'happy',
        mood: 9,
        date: '2024-01-15',
        tags: ['work', 'achievement']
      },
      {
        id: '2',
        title: 'Feeling Overwhelmed',
        content: 'I\'ve been feeling quite anxious lately about the upcoming presentation. I keep worrying about what could go wrong.',
        emotion: 'anxious',
        mood: 4,
        date: '2024-01-14',
        tags: ['work', 'anxiety']
      },
      {
        id: '3',
        title: 'Weekend Reflections',
        content: 'Had a quiet weekend. Nothing special happened, just relaxed at home and watched some movies.',
        emotion: 'neutral',
        mood: 6,
        date: '2024-01-13',
        tags: ['relaxation', 'weekend']
      }
    ];
    setEntries(mockEntries);
  }, []);

  const handleSaveEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const detection = detectEmotion(newEntry.content);
    const entry: JournalEntry = {
      id: editingId || Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      emotion: detection.emotion,
      mood: detection.mood,
      date: new Date().toISOString().split('T')[0],
      tags: []
    };

    if (editingId) {
      setEntries(prev => prev.map(e => e.id === editingId ? entry : e));
      setEditingId(null);
    } else {
      setEntries(prev => [entry, ...prev]);
    }

    setNewEntry({ title: '', content: '' });
    setIsWriting(false);
  };

  const handleEdit = (entry: JournalEntry) => {
    setNewEntry({ title: entry.title, content: entry.content });
    setEditingId(entry.id);
    setIsWriting(true);
  };

  const handleDelete = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterEmotion === 'all' || entry.emotion === filterEmotion;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-[#5BC0BE]" />
          <h1 className="text-2xl font-bold">Personal Journal</h1>
        </div>
        <button
          onClick={() => setIsWriting(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <Plus size={20} />
          New Entry
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your entries..."
            className="w-full bg-[#1C2541]/40 border border-[#5BC0BE]/20 rounded-lg py-2 px-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#5BC0BE] transition-colors"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            value={filterEmotion}
            onChange={(e) => setFilterEmotion(e.target.value)}
            className="bg-[#1C2541]/40 border border-[#5BC0BE]/20 rounded-lg py-2 px-10 text-white focus:outline-none focus:border-[#5BC0BE] transition-colors"
          >
            <option value="all">All Emotions</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="neutral">Neutral</option>
            <option value="angry">Angry</option>
            <option value="excited">Excited</option>
            <option value="anxious">Anxious</option>
          </select>
        </div>
      </div>

      {/* Writing Interface */}
      <AnimatePresence>
        {isWriting && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {editingId ? 'Edit Entry' : 'New Journal Entry'}
              </h2>
              <button
                onClick={() => {
                  setIsWriting(false);
                  setEditingId(null);
                  setNewEntry({ title: '', content: '' });
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                value={newEntry.title}
                onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Entry title..."
                className="w-full bg-[#0B132B]/50 border border-[#5BC0BE]/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#5BC0BE] transition-colors"
              />
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                placeholder="How are you feeling today? Write about your experiences, thoughts, and emotions..."
                rows={6}
                className="w-full bg-[#0B132B]/50 border border-[#5BC0BE]/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#5BC0BE] transition-colors resize-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsWriting(false);
                    setEditingId(null);
                    setNewEntry({ title: '', content: '' });
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEntry}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <Save size={16} />
                  {editingId ? 'Update' : 'Save'} Entry
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
            <p>No journal entries found. Start writing to track your mental wellness journey!</p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20 hover:border-[#5BC0BE]/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{entry.title}</h3>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${emotionColors[entry.emotion]}`}>
                      {emotionIcons[entry.emotion]}
                      {entry.emotion}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart size={14} />
                      Mood: {entry.mood}/10
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(entry)}
                    className="p-2 text-gray-400 hover:text-[#5BC0BE] transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{entry.content}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal; 