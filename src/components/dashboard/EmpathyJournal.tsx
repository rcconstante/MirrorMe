import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Calendar, 
  Heart, 
  Smile,
  Frown,
  Meh,
  Search,
  Edit,
  Trash2,
  Save,
  X,
  TrendingUp,
  Globe,
  Brain,
  Sparkles,
  Clock,
  Tag,
  BarChart3
} from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  primaryEmotion: string;
  culturalEmotions: CulturalEmotion[];
  empathyInsights: string[];
  moodScore: number;
  date: string;
  tags: string[];
  wordCount: number;
}

interface CulturalEmotion {
  culture: string;
  emotion: string;
  interpretation: string;
  confidence: number;
}

const EmpathyJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Emotion detection with cultural perspectives
  const detectEmotions = (text: string): { 
    primary: string, 
    cultural: CulturalEmotion[], 
    mood: number,
    insights: string[] 
  } => {
    const lowerText = text.toLowerCase();
    
    // Primary emotion detection
    let primary = 'neutral';
    let mood = 5;
    
    if (lowerText.includes('happy') || lowerText.includes('joy') || lowerText.includes('excited')) {
      primary = 'joyful';
      mood = Math.floor(Math.random() * 3) + 8;
    } else if (lowerText.includes('sad') || lowerText.includes('down') || lowerText.includes('depressed')) {
      primary = 'melancholic';
      mood = Math.floor(Math.random() * 3) + 2;
    } else if (lowerText.includes('anxious') || lowerText.includes('worried') || lowerText.includes('nervous')) {
      primary = 'anxious';
      mood = Math.floor(Math.random() * 3) + 4;
    } else if (lowerText.includes('grateful') || lowerText.includes('thankful') || lowerText.includes('blessed')) {
      primary = 'grateful';
      mood = Math.floor(Math.random() * 2) + 9;
    } else if (lowerText.includes('peaceful') || lowerText.includes('calm') || lowerText.includes('serene')) {
      primary = 'peaceful';
      mood = Math.floor(Math.random() * 3) + 7;
    }

    // Cultural emotion interpretations
    const cultural: CulturalEmotion[] = [
      {
        culture: 'Japanese',
        emotion: primary === 'joyful' ? 'Ikigai' : primary === 'melancholic' ? 'Mono no aware' : 'Ma',
        interpretation: primary === 'joyful' 
          ? 'Finding purpose and meaning in daily life'
          : primary === 'melancholic' 
          ? 'The gentle sadness of the impermanence of all things'
          : 'The pause between things that gives them meaning',
        confidence: Math.floor(Math.random() * 20) + 80
      },
      {
        culture: 'Brazilian',
        emotion: primary === 'joyful' ? 'Alegria' : primary === 'melancholic' ? 'Saudade' : 'Ginga',
        interpretation: primary === 'joyful'
          ? 'Pure joy that comes from within and spreads to others'
          : primary === 'melancholic'
          ? 'A deep longing mixed with sweet memories'
          : 'The flow and rhythm of life',
        confidence: Math.floor(Math.random() * 20) + 80
      },
      {
        culture: 'Danish',
        emotion: primary === 'peaceful' ? 'Hygge' : primary === 'joyful' ? 'Arbejdsglæde' : 'Pyt',
        interpretation: primary === 'peaceful'
          ? 'Cozy contentment and well-being through simplicity'
          : primary === 'joyful'
          ? 'Happiness derived from doing work you love'
          : 'Accepting and moving on from lifes small frustrations',
        confidence: Math.floor(Math.random() * 20) + 80
      }
    ];

    // Generate insights
    const insights = [
      'Your writing shows signs of self-reflection and growth',
      'Consider exploring these feelings through different cultural lenses',
      'This emotion connects you to universal human experiences',
      'Your empathy towards yourself is growing stronger'
    ];

    return { primary, cultural, mood, insights };
  };

  // Load mock data
  useEffect(() => {
    const mockEntries: JournalEntry[] = [
      {
        id: '1',
        title: 'A Day of Cultural Discovery',
        content: 'Today I learned about different ways cultures express gratitude. It made me feel incredibly grateful for the diversity in our world.',
        primaryEmotion: 'grateful',
        culturalEmotions: [
          {
            culture: 'Japanese',
            emotion: 'Kansha',
            interpretation: 'Deep gratitude that creates social bonds',
            confidence: 92
          },
          {
            culture: 'Hindi',
            emotion: 'Kritajna',
            interpretation: 'Gratitude as a state of being',
            confidence: 88
          }
        ],
        empathyInsights: [
          'Gratitude is expressed differently across cultures',
          'Your awareness of cultural diversity is expanding'
        ],
        moodScore: 9,
        date: '2024-01-15',
        tags: ['gratitude', 'culture', 'learning'],
        wordCount: 156
      },
      {
        id: '2',
        title: 'Navigating Change',
        content: 'Feeling anxious about the upcoming changes, but trying to see them as opportunities for growth.',
        primaryEmotion: 'anxious',
        culturalEmotions: [
          {
            culture: 'Chinese',
            emotion: 'Wei-ji',
            interpretation: 'Crisis as danger plus opportunity',
            confidence: 85
          }
        ],
        empathyInsights: [
          'Anxiety often precedes personal growth',
          'Different cultures view change differently'
        ],
        moodScore: 5,
        date: '2024-01-14',
        tags: ['change', 'growth', 'anxiety'],
        wordCount: 89
      }
    ];
    setEntries(mockEntries);
  }, []);

  const handleSaveEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const detection = detectEmotions(newEntry.content);
    const wordCount = newEntry.content.split(' ').length;
    
    const entry: JournalEntry = {
      id: editingId || Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      primaryEmotion: detection.primary,
      culturalEmotions: detection.cultural,
      empathyInsights: detection.insights,
      moodScore: detection.mood,
      date: new Date().toISOString().split('T')[0],
      tags: detection.primary ? [detection.primary] : [],
      wordCount
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

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || entry.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(entries.flatMap(e => e.tags)));

  const emotionColors = {
    joyful: 'from-yellow-400 to-orange-500',
    melancholic: 'from-blue-400 to-indigo-500',
    anxious: 'from-purple-400 to-pink-500',
    grateful: 'from-green-400 to-emerald-500',
    peaceful: 'from-cyan-400 to-teal-500',
    neutral: 'from-gray-400 to-gray-500'
  };

  const totalWords = entries.reduce((sum, entry) => sum + entry.wordCount, 0);
  const avgMood = entries.length > 0 
    ? Math.round(entries.reduce((sum, entry) => sum + entry.moodScore, 0) / entries.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-[#5BC0BE]" />
          <div>
            <h1 className="text-2xl font-bold">Empathy Journal</h1>
            <p className="text-sm text-gray-400">Explore your emotions through cultural perspectives</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              showAnalytics 
                ? 'bg-[#5BC0BE] text-white' 
                : 'bg-[#1C2541]/40 border border-[#5BC0BE]/20 text-[#5BC0BE]'
            }`}
          >
            <BarChart3 size={16} />
            Analytics
          </button>
          
          <button
            onClick={() => setIsWriting(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <Plus size={20} />
            New Entry
          </button>
        </div>
      </div>

      {/* Analytics Panel */}
      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-[#5BC0BE]" />
              Your Emotional Journey
            </h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-[#0B132B]/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={16} className="text-[#5BC0BE]" />
                  <span className="text-sm text-gray-400">Total Entries</span>
                </div>
                <p className="text-2xl font-bold">{entries.length}</p>
              </div>
              
              <div className="bg-[#0B132B]/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={16} className="text-red-400" />
                  <span className="text-sm text-gray-400">Average Mood</span>
                </div>
                <p className="text-2xl font-bold">{avgMood}/10</p>
              </div>
              
              <div className="bg-[#0B132B]/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Edit size={16} className="text-green-400" />
                  <span className="text-sm text-gray-400">Words Written</span>
                </div>
                <p className="text-2xl font-bold">{totalWords.toLocaleString()}</p>
              </div>
              
              <div className="bg-[#0B132B]/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={16} className="text-purple-400" />
                  <span className="text-sm text-gray-400">Cultural Insights</span>
                </div>
                <p className="text-2xl font-bold">{entries.length * 3}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your journal entries..."
            className="w-full bg-[#1C2541]/40 border border-[#5BC0BE]/20 rounded-lg py-2 px-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#5BC0BE] transition-colors"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              selectedTag === 'all' 
                ? 'bg-[#5BC0BE] text-white' 
                : 'bg-[#1C2541]/40 text-gray-300 hover:text-white'
            }`}
          >
            All Emotions
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                selectedTag === tag 
                  ? 'bg-[#6E44FF] text-white' 
                  : 'bg-[#1C2541]/40 text-gray-300 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Writing Interface */}
      <AnimatePresence>
        {isWriting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Sparkles size={20} className="text-[#5BC0BE]" />
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
                placeholder="Give your entry a meaningful title..."
                className="w-full bg-[#0B132B]/50 border border-[#5BC0BE]/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#5BC0BE] transition-colors"
              />
              
              <div className="relative">
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Pour your thoughts here... How are you feeling? What happened today? What did you learn about yourself or others?"
                  rows={8}
                  className="w-full bg-[#0B132B]/50 border border-[#5BC0BE]/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#5BC0BE] transition-colors resize-none"
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {newEntry.content.split(' ').filter(w => w).length} words
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">
                  💡 Tip: Express your authentic feelings. The AI will show how different cultures understand your emotions.
                </p>
                
                <div className="flex gap-2">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries List */}
      <div className="space-y-6">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No journal entries yet</p>
            <p className="text-sm">Start writing to explore your emotions through different cultural lenses</p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl border border-[#5BC0BE]/20 hover:border-[#5BC0BE]/40 transition-all duration-300 overflow-hidden"
            >
              {/* Entry Header */}
              <div className={`p-6 pb-4 bg-gradient-to-r ${emotionColors[entry.primaryEmotion as keyof typeof emotionColors]} bg-opacity-20`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-white">{entry.title}</h3>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-white">
                        <Calendar size={14} />
                        {new Date(entry.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-1 text-white">
                        <Heart size={14} />
                        Mood: {entry.moodScore}/10
                      </div>
                      <div className="flex items-center gap-1 text-white">
                        <Edit size={14} />
                        {entry.wordCount} words
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setNewEntry({ title: entry.title, content: entry.content });
                        setEditingId(entry.id);
                        setIsWriting(true);
                      }}
                      className="p-2 text-gray-400 hover:text-[#5BC0BE] transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => setEntries(prev => prev.filter(e => e.id !== entry.id))}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Entry Content */}
              <div className="p-6 pt-4">
                <p className="text-gray-300 leading-relaxed mb-6">{entry.content}</p>

                {/* Cultural Emotions */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
                    <Globe size={16} />
                    Cultural Emotional Perspectives
                  </h4>
                  
                  <div className="grid md:grid-cols-3 gap-3">
                    {entry.culturalEmotions.map((cultural, idx) => (
                      <div key={idx} className="bg-[#0B132B]/50 rounded-lg p-4 border border-[#5BC0BE]/20">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-[#5BC0BE]">{cultural.culture}</h5>
                          <span className="text-xs text-gray-300">{cultural.confidence}%</span>
                        </div>
                        <p className="text-sm font-semibold text-white mb-1">{cultural.emotion}</p>
                        <p className="text-xs text-gray-300 leading-relaxed">{cultural.interpretation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Empathy Insights */}
                <div className="bg-gradient-to-r from-[#5BC0BE]/10 to-[#6E44FF]/10 rounded-lg p-4 border border-[#5BC0BE]/20">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Brain size={16} className="text-[#6E44FF]" />
                    Empathy Insights
                  </h4>
                  <ul className="space-y-2">
                    {entry.empathyInsights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-[#5BC0BE] rounded-full mt-1.5" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                {entry.tags.length > 0 && (
                  <div className="flex items-center gap-2 mt-4">
                    <Tag size={14} className="text-gray-400" />
                    {entry.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-[#5BC0BE]/20 text-[#5BC0BE] rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmpathyJournal; 