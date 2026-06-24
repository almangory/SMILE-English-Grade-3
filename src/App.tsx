import React, { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  Volume2, 
  Music, 
  Gamepad2, 
  Sparkles, 
  CheckCircle, 
  XSquare, 
  ArrowRight, 
  RotateCcw, 
  Heart, 
  User, 
  Send, 
  Check, 
  VolumeX, 
  Clock, 
  Star, 
  Compass, 
  Smile, 
  SmilePlus, 
  Activity, 
  Grid,
  Play,
  Square,
  Eye,
  EyeOff,
  FileText,
  Lock,
  Unlock,
  Printer
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SMILE_UNITS } from "./smileData";
import { UnitItem, Lesson, WordItem, ChatMessage } from "./types";
import { generateQuiz } from "./quizGenerator";
import { WORKSHEETS } from "./worksheetsData";

export default function App() {
  const [selectedUnit, setSelectedUnit] = useState<UnitItem>(SMILE_UNITS[0]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(SMILE_UNITS[0].lessons[0]);
  const [activeTab, setActiveTab] = useState<"book" | "dictionary" | "quiz" | "adventure" | "syllabus" | "worksheets">("book");
  
  // Voice selection mode (Vibrant server-side AI Voice with zero-config HTML5 audio fallbacks)
  const [voiceMode, setVoiceMode] = useState<"system" | "gemini">("gemini");

  // Game states
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizScoreFinished] = useState(false);
  const [points, setPoints] = useState(10);
  const [badges, setBadges] = useState<string[]>(["⭐️ First Explorer"]);

  // Worksheets states
  const [watermarkUnlocked, setWatermarkUnlocked] = useState<boolean>(false);
  const [watermarkCodeInput, setWatermarkCodeInput] = useState<string>("");
  const [selectedWorksheetId, setSelectedWorksheetId] = useState<number>(1);
  const [worksheetStudentAnswers, setWorksheetStudentAnswers] = useState<Record<string, string>>({});
  const [worksheetSubmitted, setWorksheetSubmitted] = useState<boolean>(false);
  const [worksheetScore, setWorksheetScore] = useState<number>(0);
  const [studentName, setStudentName] = useState<string>("");
  const [studentClass, setStudentClass] = useState<string>("");
  const [studentSchool, setStudentSchool] = useState<string>("");
  const [watermarkMsg, setWatermarkMsg] = useState<string>("");

  // Custom configurable exam state
  const [quizScope, setQuizScope] = useState<"all" | "unit" | "lesson">("unit");
  const [quizSelectedUnitId, setQuizSelectedUnitId] = useState<number>(SMILE_UNITS[0].id);
  const [quizSelectedLessonId, setQuizSelectedLessonId] = useState<number>(SMILE_UNITS[0].lessons[0].id);
  const [quizQuestionCount, setQuizQuestionCount] = useState<number>(10);
  const [quizActiveQuestions, setQuizActiveQuestions] = useState<Array<{ question: string; answers: string[]; correctAnswer: string; badge: string }>>([]);
  const [quizIsConfiguring, setQuizIsConfiguring] = useState<boolean>(true);

  // Sync state selections on user interactions
  useEffect(() => {
    if (selectedUnit) {
      setQuizSelectedUnitId(selectedUnit.id);
      if (selectedUnit.lessons && selectedUnit.lessons.length > 0) {
        setQuizSelectedLessonId(selectedUnit.lessons[0].id);
      }
    }
  }, [selectedUnit]);

  useEffect(() => {
    if (selectedLesson) {
      setQuizSelectedLessonId(selectedLesson.id);
    }
  }, [selectedLesson]);

  const startCustomQuiz = () => {
    const questions = generateQuiz(quizScope, quizSelectedUnitId, quizSelectedLessonId, quizQuestionCount);
    setQuizActiveQuestions(questions);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizScoreFinished(false);
    setQuizIsConfiguring(false);
  };

  // Audio state
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [audioPlaybackActive, setAudioPlaybackActive] = useState(false);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Warm up system voices queue
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      // Bind event for asynchronously loaded voices
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    }
  }, []);

  // Interactive Dialogue Builder state (completely AI-free textbook game)
  const allBookDialogueLessons = SMILE_UNITS.flatMap((unit) => 
    (unit.lessons || [])
      .filter((l) => l.type === "conversation" && l.content && l.content.dialogue)
      .map((l) => ({
        unitId: unit.id,
        unitTitle: unit.title,
        lessonId: l.id,
        title: l.title,
        dialogue: l.content.dialogue || []
      }))
  );

  const [selectedDialogueIndex, setSelectedDialogueIndex] = useState<number>(0);
  const [scrambledLines, setScrambledLines] = useState<{ id: string; speaker: string; text: string; voice: string }[]>([]);
  const [arrangedLines, setArrangedLines] = useState<{ id: string; speaker: string; text: string; voice: string }[]>([]);
  const [dialogueCompleted, setDialogueCompleted] = useState(false);
  const [builderWrongSelectionId, setBuilderWrongSelectionId] = useState<string | null>(null);
  const [showTextbookGuide, setShowTextbookGuide] = useState(false);
  const [isPlayingEntireDialogue, setIsPlayingEntireDialogue] = useState(false);
  const [activeSpeakingLineIndex, setActiveSpeakingLineIndex] = useState<number | null>(null);
  
  const initDialogueBuilder = (index: number) => {
    const dialogueItem = allBookDialogueLessons[index];
    if (!dialogueItem) return;
    
    // Add unique index keys to avoid keys clashing if lines are identical
    const linesWithIds = dialogueItem.dialogue.map((line, idx) => ({
      ...line,
      id: `${dialogueItem.unitId}-${dialogueItem.lessonId}-${idx}`
    }));
    
    // Shuffle the lines
    const scrambled = [...linesWithIds].sort(() => Math.random() - 0.5);
    
    setSelectedDialogueIndex(index);
    setScrambledLines(scrambled);
    setArrangedLines([]);
    setDialogueCompleted(false);
    setBuilderWrongSelectionId(null);
    setShowTextbookGuide(false);
    setIsPlayingEntireDialogue(false);
    setActiveSpeakingLineIndex(null);
  };

  // Run initialization on activeTab change to adventure
  useEffect(() => {
    if (activeTab === "adventure") {
      initDialogueBuilder(selectedDialogueIndex);
    }
  }, [activeTab]);

  const getSpeakerEmoji = (speaker: string): string => {
    const s = speaker.toLowerCase();
    if (s.includes("ahmed") || s.includes("adil") || s.includes("badr") || s.includes("boy") || s.includes("hamad") || s.includes("ali") || s.includes("bassel") || s.includes("babar") || s.includes("adam")) {
      return "👦";
    }
    if (s.includes("cathy") || s.includes("fatma") || s.includes("dalia") || s.includes("rayan") || s.includes("girl") || s.includes("riba") || s.includes("hiba") || s.includes("reem")) {
      return "👧";
    }
    if (s.includes("hind") || s.includes("grandmother") || s.includes("amna") || s.includes("mother") || s.includes("mum") || s.includes("hen") || s.includes("cow") || s.includes("grandma")) {
      return "👩";
    }
    if (s.includes("gamar") || s.includes("man") || s.includes("policeman") || s.includes("officer") || s.includes("teacher") || s.includes("un") || s.includes("mr") || s.includes("fox")) {
      return "👨";
    }
    if (s.includes("monkey") || s.includes("sukkar")) {
      return "🐒";
    }
    if (s.includes("gonfooth")) {
      return "🦔";
    }
    if (s.includes("crocodile")) {
      return "🐊";
    }
    if (s.includes("fish")) {
      return "🐟";
    }
    return "✨";
  };

  const handleLineTap = (line: { id: string; speaker: string; text: string; voice: string }) => {
    const dialogueItem = allBookDialogueLessons[selectedDialogueIndex];
    if (!dialogueItem) return;

    // The correct line we expect next is:
    const expectedLineIndex = arrangedLines.length;
    const expectedLine = dialogueItem.dialogue[expectedLineIndex];

    if (line.text === expectedLine.text && line.speaker === expectedLine.speaker) {
      // Correct!
      const newArranged = [...arrangedLines, line];
      setArrangedLines(newArranged);
      setScrambledLines(scrambledLines.filter(item => item.id !== line.id));
      setBuilderWrongSelectionId(null);

      // Play audio
      speakText(line.text, line.voice);

      // Check completion
      if (newArranged.length === dialogueItem.dialogue.length) {
        setDialogueCompleted(true);
        setPoints(prev => prev + 15);
        if (points + 15 >= 75 && !badges.includes("🗣 Master Speaker")) {
          setBadges(prev => [...prev, "🗣 Master Speaker"]);
        }
      }
    } else {
      // Wrong choice
      setBuilderWrongSelectionId(line.id);
      speakText("Try again!", "Kore");
      setTimeout(() => setBuilderWrongSelectionId(null), 800);
    }
  };

  const playEntireShow = async () => {
    if (isPlayingEntireDialogue) return;
    setIsPlayingEntireDialogue(true);
    
    const dialogueItem = allBookDialogueLessons[selectedDialogueIndex];
    if (!dialogueItem) return;
    
    for (let i = 0; i < dialogueItem.dialogue.length; i++) {
      const line = dialogueItem.dialogue[i];
      setActiveSpeakingLineIndex(i);
      
      speakText(line.text, line.voice);
      const approxDuration = Math.max(2500, line.text.split(" ").length * 450 + 1200);
      await new Promise(resolve => setTimeout(resolve, approxDuration));
    }
    
    setActiveSpeakingLineIndex(null);
    setIsPlayingEntireDialogue(false);
  };

  // Synchronize first lesson whenever unit changes
  const handleUnitSelect = (unit: UnitItem) => {
    setSelectedUnit(unit);
    setSelectedLesson(unit.lessons[0]);
    // reset quiz index
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizScoreFinished(false);
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizScoreFinished(false);
  };

  // Text-To-Speech function using full-stack API or speech synthesis fallback
  const speakText = (text: string, voiceName: string = "Kore") => {
    // If the exact same text is playing, toggle pause
    if (speakingText === text && audioPlaybackActive) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      window.speechSynthesis.cancel();
      setAudioPlaybackActive(false);
      setSpeakingText(null);
      return;
    }

    // Cancel any previous audio immediately (prevents overlapping/stuck sounds)
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    window.speechSynthesis.cancel();

    const cleanText = text.trim();
    setSpeakingText(cleanText);
    setAudioPlaybackActive(true);

    // If System Voice mode is selected, speak synchronously to guarantee user-gesture context is kept intact
    if (voiceMode === "system") {
      fallbackSpeechSynthesis(cleanText);
      return;
    }

    // List of premium, super fast free client-side and server-side TTS providers
    const sources = [
      `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText)}&type=2`, // US English (Highly resilient & clears iframe barriers)
      `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(cleanText)}`, // Google Translate Direct client-use
      `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText)}&type=1`, // UK English
      `/api/tts?text=${encodeURIComponent(cleanText)}` // Server proxy self-healing endpoint
    ];

    let currentSourceIndex = 0;

    const playNextSource = () => {
      if (!audioPlayerRef.current) {
        fallbackSpeechSynthesis(cleanText);
        return;
      }

      if (currentSourceIndex >= sources.length) {
        console.warn("All direct stream providers failed or timed out. Defaulting to local System voice.");
        fallbackSpeechSynthesis(cleanText);
        return;
      }

      const activeUrl = sources[currentSourceIndex];
      
      // Assign source
      audioPlayerRef.current.src = activeUrl;
      audioPlayerRef.current.load(); // Prepare media decoder

      audioPlayerRef.current.onended = () => {
        setAudioPlaybackActive(false);
        setSpeakingText(null);
      };

      audioPlayerRef.current.onerror = (e) => {
        console.warn(`Source #${currentSourceIndex} (${activeUrl}) failed to load. Trying next provider.`);
        currentSourceIndex++;
        playNextSource();
      };

      const playPromise = audioPlayerRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn(`Autoplay or play issue with provider #${currentSourceIndex}:`, err);
          // Auto cascade to next source
          currentSourceIndex++;
          playNextSource();
        });
      }
    };

    try {
      playNextSource();
    } catch (err) {
      console.warn("Audio element play sequence crashed, reverting to local voice synthesizer:", err);
      fallbackSpeechSynthesis(cleanText);
    }
  };

  const fallbackSpeechSynthesis = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose high quality English voices to avoid reading English text with Arabic or System voices
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith("en-") && v.name.includes("Google")) 
        || voices.find(v => v.lang.startsWith("en-") && (v.name.includes("Microsoft") || v.name.includes("Natural")))
        || voices.find(v => v.lang.startsWith("en-")) 
        || voices[0];
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
    }

    utterance.lang = "en-US";
    utterance.rate = 0.85; // Speak moderately slow for children
    utterance.onend = () => {
      setAudioPlaybackActive(false);
      setSpeakingText(null);
    };
    utterance.onerror = () => {
      setAudioPlaybackActive(false);
      setSpeakingText(null);
    };
    window.speechSynthesis.speak(utterance);
  };

  // Vocabulary & Phonics Matching Game state
  const handleQuizAnswerSubmit = (ans: string, index: number, totalQuestions: number, quizList: any[]) => {
    setSelectedAnswer(ans);
    const correct = ans === quizList[index].correctAnswer;
    if (correct) {
      setQuizScore(prev => prev + 1);
      setPoints(prev => prev + 10);
      // Give confetti / popup badges logic
      if (points + 10 >= 100 && !badges.includes("🏆 Master Pupil")) {
        setBadges(prev => [...prev, "🏆 Master Pupil"]);
      }
    }

    setTimeout(() => {
      if (index + 1 < totalQuestions) {
        setCurrentQuizIndex(index + 1);
        setSelectedAnswer(null);
      } else {
        setQuizScoreFinished(true);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-sky-50/50 flex flex-col font-sans select-none antialiased p-3 sm:p-6">
      {/* Top Header section in Bento grid style */}
      <header className="max-w-6xl w-full mx-auto mb-6 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-yellow-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-3xl animate-spin-slow">☀️</div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-sky-800 tracking-tight leading-none uppercase">SMILE English</h1>
            <p className="text-sky-600 font-bold text-sm sm:text-lg">Grade 3 • School Textbook Companion</p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <div className="bg-white px-6 py-3 rounded-[24px] shadow-sm border-b-4 border-gray-200 flex items-center gap-2">
            <span className="text-2xl">⭐️</span>
            <span className="text-lg sm:text-xl font-black text-amber-500">{points} Points</span>
          </div>
          <div className="w-14 h-14 bg-purple-500 rounded-2xl border-b-4 border-purple-700 flex items-center justify-center text-2xl text-white font-bold cursor-pointer hover:scale-105 transition-transform" onClick={() => setPoints(prev => prev + 5)}>👦</div>
        </div>
      </header>

      {/* Main Container Grid */}
      <div className="max-w-6xl w-full mx-auto flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Navigation Rail / Left bar - list of book units as beautiful compact Bento tiles */}
        <aside className="lg:col-span-3 flex flex-col gap-5">
          <div className="bg-white rounded-[32px] p-5 shadow-sm border-b-8 border-r-8 border-sky-100 flex flex-col gap-4">
            <h2 className="text-xs font-black text-sky-800 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <BookOpen className="w-4 h-4 text-sky-500" />
              SMILE Units • Student Book Chapters
            </h2>
            
            <div className="flex flex-col gap-3 max-h-[340px] lg:max-h-[none] overflow-y-auto pr-1">
              {SMILE_UNITS.map((u) => {
                const isSelected = selectedUnit.id === u.id;
                return (
                  <motion.button
                    key={u.id}
                    onClick={() => handleUnitSelect(u)}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full text-left p-3.5 rounded-[24px] border-b-4 transition-all flex items-start gap-3 relative cursor-pointer ${
                      isSelected 
                        ? `${u.color} shadow-md border-amber-600 font-bold text-amber-950` 
                        : "bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-700"
                    }`}
                  >
                    <span className="text-3xl pt-0.5">{u.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-wider font-extrabold opacity-75">Unit {u.id}</div>
                      <div className="text-[13px] truncate leading-tight font-black uppercase text-sky-950">{u.title}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Sound & Pronunciation Settings Widget */}
          <div className="bg-white rounded-[32px] p-5 shadow-sm border-b-8 border-r-8 border-indigo-100 flex flex-col gap-3">
            <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Volume2 className="w-4 h-4 text-indigo-500" />
              Sound Settings • Voice Engine
            </h3>
            
            <p className="text-[11px] font-extrabold text-slate-500 leading-snug">
              The read-aloud voice system is fully integrated! If you experience any playback issues, you can switch between the sound modes below and test using the button:
            </p>

            <div className="flex flex-col gap-2 mt-1">
              <button
                onClick={() => setVoiceMode("gemini")}
                className={`w-full text-left p-3 rounded-[16px] border-b-4 transition-all flex items-center justify-between cursor-pointer ${
                  voiceMode === "gemini"
                    ? "bg-indigo-600 border-indigo-800 text-white font-black"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 font-bold"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-md">✨</span>
                  <div className="flex flex-col">
                    <span className="text-[12px] leading-tight">Embedded Voice (Free & Fast)</span>
                    <span className="text-[10px] opacity-80 leading-tight">High Quality AI Voice (Recommended)</span>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setVoiceMode("system")}
                className={`w-full text-left p-3 rounded-[16px] border-b-4 transition-all flex items-center justify-between cursor-pointer ${
                  voiceMode === "system"
                    ? "bg-indigo-600 border-indigo-800 text-white font-black"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 font-bold"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-md">⚡</span>
                  <div className="flex flex-col">
                    <span className="text-[12px] leading-tight">Device System Voice</span>
                    <span className="text-[10px] opacity-80 leading-tight">Standard Browser Voice (Offline Fallback)</span>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={() => speakText("Welcome to SMILE English Grade 3 pupil! As-salamu alaykum!", "Kore")}
              className="mt-1 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase py-3 px-4 rounded-[16px] border-b-4 border-emerald-700 transition-all flex items-center justify-center gap-2 cursor-pointer transform active:translate-y-0.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Test & Play Word Sounds</span>
            </button>
          </div>

          {/* Award achievements section */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 shadow-sm border border-amber-100/50">
            <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2.5 flex items-center gap-1">
              🏆 My Badges ({badges.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {badges.map((b, idx) => (
                <span 
                  key={idx} 
                  className="bg-white border border-amber-200 text-xs px-2.5 py-1 rounded-full text-amber-800 shadow-sm font-semibold flex items-center gap-1 animate-bounce"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Central interactive screen workspace */}
        <main className="lg:col-span-9 flex flex-col gap-6">
          
          {/* Main Interactive Sub-tabs selection - Bento Style */}
          <div className="bg-white rounded-[32px] p-2 shadow-sm border-b-6 border-sky-100 flex flex-wrap gap-1.5">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("book")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "book"
                  ? "bg-sky-500 text-white border-b-4 border-sky-700 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-sky-900 font-bold"
              }`}
            >
              <BookOpen className="w-5 h-5 mb-0.5" />
              <span>Pupil's Book</span>
              <span className="text-[10px] opacity-80 font-bold">Study & Sing</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("dictionary")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "dictionary"
                  ? "bg-amber-400 text-white border-b-4 border-amber-600 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-amber-900 font-bold"
              }`}
            >
              <Compass className="w-5 h-5 mb-0.5" />
              <span>Vocabulary</span>
              <span className="text-[10px] opacity-80 font-bold">Word Definitions</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("quiz")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "quiz"
                  ? "bg-emerald-400 text-white border-b-4 border-emerald-600 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-emerald-950 font-bold"
              }`}
            >
              <Gamepad2 className="w-5 h-5 mb-0.5" />
              <span>Quiz Games</span>
              <span className="text-[10px] opacity-80 font-bold">Play and Score</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("adventure")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "adventure"
                  ? "bg-purple-500 text-white border-b-4 border-purple-700 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-purple-950 font-bold"
              }`}
            >
              <Smile className="w-5 h-5 mb-0.5" />
              <span>AI Chat Partner</span>
              <span className="text-[10px] opacity-80 font-bold">Speaking Area</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("syllabus")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "syllabus"
                  ? "bg-rose-500 text-white border-b-4 border-rose-700 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-rose-950 font-bold"
              }`}
            >
              <Grid className="w-5 h-5 mb-0.5" />
              <span>Syllabus Map</span>
              <span className="text-[10px] opacity-80 font-bold">Book Outline</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("worksheets")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "worksheets"
                  ? "bg-violet-500 text-white border-b-4 border-violet-700 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-violet-950 font-bold"
              }`}
            >
              <FileText className="w-5 h-5 mb-0.5" />
              <span>Worksheets 📝</span>
              <span className="text-[10px] opacity-80 font-bold">أوراق العمل</span>
            </motion.button>
          </div>

          {/* ACTIVE CONTENT WORKSPACE AREA WITH BENTO STYLING AND GRAPHICS */}
          <div className="bg-white rounded-[40px] p-6 sm:p-8 shadow-sm border-b-8 border-r-8 border-sky-100/80 flex-grow relative overflow-hidden min-h-[480px]">
            
            <AnimatePresence mode="wait">
              {/* TAB 1: PUPIL BOOK READER */}
              {activeTab === "book" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-sky-50/50 p-5 rounded-[32px] border-b-6 border-r-6 border-sky-100">
                    <div>
                      <span className="text-[10px] bg-orange-100 text-orange-800 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        Unit {selectedUnit.id} • {selectedUnit.title}
                      </span>
                      <h3 className="text-xl font-black text-sky-950 uppercase mt-1 tracking-tight">
                        Interactive Lesson Space
                      </h3>
                    </div>
                    {/* Lesson tabs list inside selected unit - Bento-style */}
                    <div className="flex flex-wrap gap-2">
                      {selectedUnit.lessons.map((l) => (
                        <button
                          key={l.id}
                          onClick={() => handleLessonSelect(l)}
                          className={`px-4 py-2.5 rounded-[16px] text-xs font-black uppercase tracking-wider transition-all border-b-4 border-r-4 cursor-pointer transform hover:scale-[1.03] ${
                            selectedLesson.id === l.id
                              ? "bg-sky-500 text-white border-sky-700"
                              : "bg-white hover:bg-slate-50 text-slate-700 border-slate-300"
                          }`}
                        >
                          Lesson {l.id}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 sm:p-8 rounded-[40px] border-b-8 border-r-8 border-indigo-100 flex flex-col gap-4 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-black text-indigo-950 flex items-center gap-2 uppercase tracking-wide">
                        {selectedLesson.type === "song" && <Music className="w-5 h-5 text-indigo-500" />}
                        {selectedLesson.type === "conversation" && <Volume2 className="w-5 h-5 text-indigo-500" />}
                        {selectedLesson.type === "phonics" && <Sparkles className="w-5 h-5 text-indigo-500" />}
                        {selectedLesson.title}
                      </h4>
                      <span className="text-xs bg-indigo-100 text-indigo-800 font-black px-3 py-1 rounded-full uppercase tracking-wider">
                        {selectedLesson.type}
                      </span>
                    </div>

                    {/* Lesson Song chant layout */}
                    {selectedLesson.type === "song" && selectedLesson.content.songText && (
                      <div className="bg-indigo-50 p-6 rounded-[32px] border-b-4 border-r-4 border-indigo-200 flex flex-col items-center text-center gap-5">
                        <span className="text-5xl animate-bounce">🎵</span>
                        <div className="max-w-md mx-auto">
                          <p className="text-lg sm:text-xl font-black text-indigo-950 leading-relaxed font-serif italic">
                            "{selectedLesson.content.songText}"
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => speakText(selectedLesson.content.songText || "")}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase py-4 px-8 rounded-[24px] shadow-[0_5px_0_0_#4338ca] hover:shadow-[0_2px_0_0_#4338ca] transition-all flex items-center justify-center gap-2 transform active:translate-y-1 cursor-pointer"
                        >
                          {speakingText === selectedLesson.content.songText && audioPlaybackActive ? (
                            <>
                              <VolumeX className="w-5 h-5 animate-spin" />
                              <span>Stop Singing</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-5 h-5" />
                              <span>Listen and Sing! 🎙</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    )}

                    {/* Lesson conversation dialogue layout */}
                    {selectedLesson.type === "conversation" && selectedLesson.content.dialogue && (
                      <div className="flex flex-col gap-4 max-w-xl mx-auto w-full mt-2">
                        {selectedLesson.content.dialogue.map((line, key) => {
                          const isSpecial = line.speaker === "Mrs. Hind" || line.speaker === "Mrs Hind" || line.speaker === "Teacher" || line.speaker === "Policeman";
                          const isPlaying = speakingText === line.text && audioPlaybackActive;
                          return (
                            <div 
                              key={key} 
                              className={`flex items-start gap-3 w-full ${isSpecial ? "flex-row-reverse" : ""}`}
                            >
                              <div className={`p-3 rounded-[20px] text-3xl font-black shadow-sm select-none ${isSpecial ? "bg-amber-100 text-amber-700 border-2 border-amber-300" : "bg-sky-100 text-sky-700 border-2 border-sky-300"}`}>
                                {line.speaker === "Ahmed" ? "👦" : line.speaker === "Badr" ? "👶" : line.speaker === "Cathy" ? "👧" : "👩"}
                              </div>
                              <motion.div 
                                onClick={() => speakText(line.text, line.voice)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex-1 p-5 rounded-[24px] shadow-sm border-b-6 border-r-6 cursor-pointer transition-all ${
                                  isSpecial 
                                    ? isPlaying 
                                      ? "bg-amber-100/90 border-amber-400 text-amber-950" 
                                      : "bg-amber-50/60 border-amber-200 hover:border-amber-400 text-slate-800"
                                    : isPlaying 
                                      ? "bg-sky-100/90 border-sky-400 text-sky-950" 
                                      : "bg-slate-50/70 border-slate-200 hover:border-sky-400 text-slate-800"
                                }`}
                              >
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{line.speaker}</span>
                                  <div className="text-slate-400 p-1">
                                    {isPlaying ? (
                                      <VolumeX className="w-5 h-5 text-red-500 animate-pulse" />
                                    ) : (
                                      <Volume2 className="w-5 h-5 text-slate-500 hover:scale-110 transition-transform" />
                                    )}
                                  </div>
                                </div>
                                <p className="text-[16px] font-black leading-snug">{line.text}</p>
                              </motion.div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Lesson Phonics list */}
                    {selectedLesson.type === "phonics" && selectedLesson.content.letters && (
                      <div className="flex flex-col gap-6 text-center">
                        <div className="flex items-center justify-center gap-4 py-2 flex-wrap">
                          {selectedLesson.content.letters.map((l) => (
                            <motion.button
                              key={l}
                              onClick={() => speakText(`Letter ${l} says, /${l}/ pronunciation`, "Zephyr")}
                              whileHover={{ scale: 1.1, rotate: 2 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-20 h-20 rounded-[24px] bg-white hover:bg-slate-50 border-b-6 border-r-6 border-slate-300 shadow-sm flex flex-col items-center justify-center transition-all cursor-pointer group"
                            >
                              <span className="text-4xl font-black text-sky-500 uppercase group-hover:text-indigo-600 leading-none">{l}</span>
                              <span className="text-[10px] text-slate-400 font-extrabold italic uppercase mt-1">say /{l}/</span>
                            </motion.button>
                          ))}
                        </div>

                        <p className="text-xs text-sky-700 font-bold bg-sky-50 inline-block py-2 px-4 rounded-full max-w-sm mx-auto">💡 Click each letter box to hear how it sounds in English phonics! 😊</p>

                        {selectedLesson.content.games && (
                          <div className="mt-4 p-6 bg-slate-50 rounded-[32px] border-b-4 border-r-4 border-slate-300 text-left">
                            <span className="text-xs bg-indigo-100 text-indigo-800 font-black px-3 py-1 rounded-full uppercase tracking-wider">Mini Phonics Challenge</span>
                            <div className="mt-3">
                              <p className="font-black text-slate-800 text-md">{selectedLesson.content.games[0].question}</p>
                              <div className="grid grid-cols-2 gap-3 mt-4">
                                {selectedLesson.content.games[0].answers.map((option) => (
                                  <motion.button
                                    key={option}
                                    whileHover={{ scale: 1.05, rotate: 1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleQuizAnswerSubmit(option, 0, 1, selectedLesson.content.games || [])}
                                    className={`py-3 px-4 rounded-[20px] border-b-4 border-r-4 font-black text-sm uppercase tracking-wider transition-all text-center cursor-pointer ${
                                      selectedAnswer === option
                                        ? option === selectedLesson.content.games?.[0].correctAnswer
                                          ? "bg-emerald-500 border-emerald-700 text-white"
                                          : "bg-rose-500 border-rose-700 text-white"
                                        : "bg-white border-slate-300 hover:bg-slate-50 text-slate-700"
                                    }`}
                                  >
                                    {option}
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Vocabulary words card section for quick study */}
                  <div>
                    <h3 className="text-xs font-black text-sky-800 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      📖 Unit {selectedUnit.id} Picture Cards • Interactive Word Cards
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {selectedUnit.words.map((w) => (
                        <motion.div
                          key={w.id}
                          onClick={() => speakText(w.word, "Kore")}
                          whileHover={{ scale: 1.04, y: -4, rotate: 1 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white border-b-6 border-r-6 border-slate-200 hover:border-sky-300 rounded-[24px] p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-1.5 relative group justify-between cursor-pointer"
                        >
                          <div className="absolute right-2 top-2">
                            <span
                              className="text-slate-400 group-hover:text-blue-600 transition-colors p-2 block"
                              title="Listen to Word"
                            >
                              <Volume2 className="w-5 h-5" />
                            </span>
                          </div>
                          
                          <span className="text-5xl mt-3 group-hover:scale-110 transition-transform">{w.image}</span>
                          <div className="text-center mt-2 w-full">
                            <p className="font-extrabold text-[15px] text-sky-950 group-hover:text-sky-600 transition-colors uppercase leading-tight font-black mb-1.5">{w.word}</p>
                            <span className="text-[10px] bg-slate-50 text-slate-600 px-2.5 py-1 rounded-full inline-block font-bold leading-tight">
                              {w.example}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: DETAILED INTERACTIVE VOCABULARY DICTIONARY */}
              {activeTab === "dictionary" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  <div className="bg-teal-50 p-6 rounded-[32px] border-b-6 border-r-6 border-teal-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-teal-955 flex items-center gap-2 uppercase tracking-wide">
                        🎒 Interactive Picture Dictionary
                      </h3>
                      <p className="text-xs font-bold text-teal-850 mt-1">Learn new words from Sudan's Grade 3 book by clicking pronunciation options and hearing active examples!</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedUnit.words.map((w) => (
                      <motion.div 
                        key={w.id} 
                        onClick={() => speakText(w.word, "Kore")}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white rounded-[28px] p-5 shadow-sm border-b-6 border-r-6 border-slate-200/90 hover:border-teal-400 flex items-center gap-4 transition-all group cursor-pointer"
                      >
                        <div className="text-5xl p-3 bg-slate-50 border-2 border-slate-100 rounded-[20px] transition-transform group-hover:rotate-6">{w.image}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-black text-[16px] text-sky-950 uppercase">{w.word}</h4>
                            <span className="text-[10px] bg-slate-100 text-slate-500 font-extrabold px-2 py-0.5 rounded-full uppercase">Unit {w.unit}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/70 inline-block font-sans">
                            📝 {w.example}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speakText(w.word, "Kore");
                            }}
                            className="bg-teal-50 hover:bg-teal-100 text-teal-700 p-3 rounded-full shadow-sm transition-all cursor-pointer flex items-center justify-center"
                            title="Hear individual word"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speakText(w.soundText, "Zephyr");
                            }}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] uppercase font-black px-2.5 py-1.5 rounded-[12px] border-b-4 border-emerald-700 transition-all cursor-pointer shadow-sm text-center"
                            title="Hear example sentence"
                          >
                            Sentence
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-4 rounded-[20px] text-center">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">💡 Tip: Switch the pupil book unit on the left column to explore more cute picture cards!</p>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: SUDANESE SMILE QUIZ GAME CORNER */}
              {activeTab === "quiz" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  <div className="bg-amber-50 p-6 rounded-[32px] border-b-6 border-r-6 border-amber-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-amber-950 flex items-center gap-2 uppercase tracking-wide">
                        🎮 Pupil SMILE Quiz Corner!
                      </h3>
                      <p className="text-xs font-bold text-amber-850 mt-1">Let's solve fun challenges from your book lessons and win yellow stars! 🌟</p>
                    </div>
                    <span className="text-xs font-black bg-amber-200 text-amber-900 px-4 py-1.5 rounded-full uppercase tracking-wider">
                      PLAY MODE
                    </span>
                  </div>

                  {/* Combined Dynamic Quiz Engine based on Configured Scope */}
                  {quizIsConfiguring ? (
                    <div className="bg-white p-6 sm:p-8 rounded-[36px] border-b-8 border-r-8 border-slate-200/90 shadow-sm flex flex-col gap-6 max-w-2xl mx-auto w-full">
                      <div className="border-b border-slate-100 pb-4 text-center">
                        <span className="text-4xl animate-bounce inline-block">📝🎒</span>
                        <h4 className="text-xl font-black text-slate-800 uppercase mt-2">Personalized Exam Setup • إعداد الاختبار</h4>
                        <p className="text-xs font-bold text-slate-500 mt-1">Practice and challenge yourself on Grade 3 English syllabus!</p>
                      </div>

                      {/* Scope Selectors */}
                      <div className="space-y-3">
                        <label className="text-xs font-black text-sky-800 uppercase tracking-wider block">
                          🎯 Questions Scope • نطاق الأسئلة:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { id: "all", label: "Full Syllabus", ar: "كامل المنهج" },
                            { id: "unit", label: "Select Unit", ar: "وحدة محددة" },
                            { id: "lesson", label: "Select Lesson", ar: "درس محدد" }
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => setQuizScope(opt.id as any)}
                              className={`p-3.5 rounded-[22px] border-b-4 border-r-4 transition-all text-center flex flex-col justify-center items-center cursor-pointer ${
                                quizScope === opt.id
                                  ? "bg-sky-500 border-sky-700 text-white font-black scale-102 shadow-sm"
                                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              <span className="text-[13px] font-black uppercase">{opt.label}</span>
                              <span className="text-[10px] opacity-95 font-bold mt-0.5">{opt.ar}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Dropdowns contingent on Choice */}
                      {quizScope !== "all" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-[26px] border border-slate-200/40">
                          {/* Unit selection */}
                          <div className="space-y-1.5 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Select Textbook Unit:</label>
                            <select
                              value={quizSelectedUnitId}
                              onChange={(e) => {
                                const uId = Number(e.target.value);
                                setQuizSelectedUnitId(uId);
                                const unit = SMILE_UNITS.find(u => u.id === uId);
                                if (unit && unit.lessons.length > 0) {
                                  setQuizSelectedLessonId(unit.lessons[0].id);
                                }
                              }}
                              className="w-full px-3 py-2.5 rounded-[16px] bg-white border-2 border-slate-200 font-extrabold text-xs text-sky-950 focus:outline-none focus:border-sky-500 cursor-pointer"
                            >
                              {SMILE_UNITS.map(u => (
                                <option key={u.id} value={u.id}>Unit {u.id}: {u.title.toUpperCase()}</option>
                              ))}
                            </select>
                          </div>

                          {/* Lesson selection */}
                          {quizScope === "lesson" && (
                            <div className="space-y-1.5 text-left">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Select Lesson:</label>
                              <select
                                value={quizSelectedLessonId}
                                onChange={(e) => setQuizSelectedLessonId(Number(e.target.value))}
                                className="w-full px-3 py-2.5 rounded-[16px] bg-white border-2 border-slate-200 font-extrabold text-xs text-sky-950 focus:outline-none focus:border-sky-500 cursor-pointer"
                              >
                                {(SMILE_UNITS.find(u => u.id === quizSelectedUnitId)?.lessons || []).map(l => (
                                  <option key={l.id} value={l.id}>Lesson {l.id}: {l.title} ({l.type.toUpperCase()})</option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Number of questions slider */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-wider">
                          <span>❓ Question Count • عدد الأسئلة:</span>
                          <span className="text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full text-sm font-black">{quizQuestionCount} Questions</span>
                        </div>

                        {/* Slide Selector */}
                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-[24px] border border-slate-200/40">
                          <input
                            type="range"
                            min="5"
                            max="30"
                            step="1"
                            value={quizQuestionCount}
                            onChange={(e) => setQuizQuestionCount(Number(e.target.value))}
                            className="flex-1 h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                        </div>

                        {/* Hot Preset numbers */}
                        <div className="flex flex-wrap gap-2 justify-center pt-1">
                          {[5, 10, 15, 20, 25, 30].map(cnt => (
                            <button
                              key={cnt}
                              onClick={() => setQuizQuestionCount(cnt)}
                              className={`px-4 py-2 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
                                quizQuestionCount === cnt
                                  ? "bg-indigo-600 text-white shadow-sm"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                            >
                              {cnt} Questions
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Action generator button */}
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={startCustomQuiz}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black uppercase py-4 rounded-[24px] border-b-6 border-indigo-900 transition-all cursor-pointer text-center font-sans tracking-wide mt-2 shadow-sm"
                      >
                        🚀 Let's Start the Test • ابدأ الاختـبار!
                      </motion.button>
                    </div>
                  ) : (
                    (() => {
                      if (quizActiveQuestions.length === 0) {
                        return (
                          <div className="text-center py-12 bg-white rounded-[32px] border-2 border-dashed border-slate-300 max-w-md mx-auto w-full p-6">
                            <span className="text-4xl">⚠️</span>
                            <p className="text-md font-black text-slate-700 mt-2">No custom questions produced!</p>
                            <p className="text-xs font-extrabold text-slate-400 mt-1">Try to increase the questions setting or choose another unit.</p>
                            <button
                              onClick={() => setQuizIsConfiguring(true)}
                              className="mt-4 bg-slate-100 px-4 py-2 rounded-full font-black text-xs text-slate-700 uppercase"
                            >
                              Back to Setup
                            </button>
                          </div>
                        );
                      }

                      if (quizFinished) {
                        return (
                          <div className="bg-white border-b-8 border-r-8 border-slate-200 rounded-[40px] p-8 text-center flex flex-col items-center gap-5 max-w-md mx-auto w-full shadow-sm">
                            <span className="text-6xl animate-bounce">🏆⭐</span>
                            <h4 className="text-2xl font-black text-sky-950 uppercase tracking-tight">Well Done! أحسنت!</h4>
                            <p className="text-sm font-bold text-slate-600">
                              You scored <span className="font-extrabold text-indigo-600 text-lg">{quizScore} / {quizActiveQuestions.length}</span> correct answers! Great progress!
                            </p>
                            <div className="bg-amber-100 text-amber-900 font-extrabold px-6 py-2.5 rounded-[20px] text-sm shadow-sm border-2 border-amber-200 uppercase tracking-wider">
                              ⭐ Got +{quizScore * 10} Points!
                            </div>
                            <div className="flex flex-col gap-2 w-full mt-2">
                              <button
                                onClick={startCustomQuiz}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase py-3.5 px-8 rounded-[24px] border-b-4 border-indigo-800 transition-all cursor-pointer w-full text-xs tracking-wider"
                              >
                                Try Same settings again
                              </button>
                              <button
                                onClick={() => setQuizIsConfiguring(true)}
                                className="bg-slate-100 hover:bg-slate-250 text-slate-700 font-black uppercase py-3.5 px-8 rounded-[24px] border-b-4 border-slate-300 transition-all cursor-pointer w-full text-xs tracking-wider"
                              >
                                Configure New Test ⚙️
                              </button>
                            </div>
                          </div>
                        );
                      }

                      const currentQuestion = quizActiveQuestions[currentQuizIndex];

                      return (
                        <div className="bg-white p-6 sm:p-8 rounded-[36px] border-b-8 border-r-8 border-slate-200 shadow-sm flex flex-col gap-6 max-w-xl mx-auto w-full">
                          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 tracking-wider uppercase">
                            <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-100">
                              {currentQuestion.badge}
                            </span>
                            <span>Progress: {currentQuizIndex + 1} / {quizActiveQuestions.length}</span>
                            <span className="text-amber-500 font-extrabold">Correct: {quizScore}</span>
                          </div>

                          <div className="py-2 flex flex-col items-center gap-2">
                            <p className="text-lg sm:text-xl font-black text-slate-800 text-center leading-relaxed">
                              {currentQuestion.question}
                            </p>
                            <button
                              onClick={() => speakText(currentQuestion.question)}
                              className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors cursor-pointer flex items-center justify-center"
                              title="Listen to question"
                            >
                              <Volume2 className="w-5 h-5 animate-pulse" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                            {currentQuestion.answers.map((option) => {
                              const isSelected = selectedAnswer === option;
                              const isCorrect = option === currentQuestion.correctAnswer;
                              
                              let buttonStyle = "bg-white border-slate-300 hover:bg-slate-50 text-slate-700 border-b-4 border-r-4";
                              if (selectedAnswer) {
                                  if (isCorrect) {
                                    buttonStyle = "bg-emerald-500 border-emerald-700 text-white border-b-4 border-r-4 shadow-sm";
                                  } else if (isSelected) {
                                    buttonStyle = "bg-rose-500 border-rose-700 text-white border-b-4 border-r-4 shadow-sm";
                                  } else {
                                    buttonStyle = "opacity-50 bg-slate-50 border-slate-200 text-slate-400 border-b-4 border-r-4";
                                  }
                              }

                              return (
                                <motion.button
                                  key={option}
                                  disabled={selectedAnswer !== null}
                                  whileHover={{ scale: selectedAnswer ? 1 : 1.03 }}
                                  whileTap={{ scale: selectedAnswer ? 1 : 0.97 }}
                                  onClick={() => handleQuizAnswerSubmit(option, currentQuizIndex, quizActiveQuestions.length, quizActiveQuestions)}
                                  className={`py-4 px-5 rounded-[20px] text-center font-black text-[14px] transition-all cursor-pointer flex items-center justify-between uppercase tracking-wide relative group ${buttonStyle}`}
                                >
                                  <span className="flex-1 text-left truncate pr-8">{option}</span>
                                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        speakText(option);
                                      }}
                                      className="p-1.5 rounded-full hover:bg-black/5 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                                      title="Listen"
                                    >
                                      <Volume2 className="w-4 h-4" />
                                    </button>
                                    {selectedAnswer && isCorrect && <Check className="w-5 h-5 text-white" />}
                                    {selectedAnswer && isSelected && !isCorrect && <span className="text-white text-xs font-black font-mono">X</span>}
                                  </div>
                                </motion.button>
                              );
                            })}
                          </div>

                          {selectedAnswer && (
                            <div className="text-center text-xs font-black text-sky-950 uppercase tracking-wider animate-pulse pt-2 border-t border-slate-100">
                              {selectedAnswer === currentQuestion.correctAnswer 
                                ? "🎉 Brilliant answer! You got it right!" 
                                : `❌ Oops, matches: "${currentQuestion.correctAnswer}".`}
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-2">
                            <button
                              onClick={() => {
                                if (confirm("Do you want to stop this test?")) {
                                  setQuizIsConfiguring(true);
                                }
                              }}
                              className="text-[10px] font-black uppercase text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
                            >
                              Quit Test 👋
                            </button>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">SMILE Grade 3 Exam</span>
                          </div>
                        </div>
                      );
                    })()
                  )}
                </motion.div>
              )}

              {/* TAB 4: ENGLISH CONVERSATION BUILDER & THEATER (100% AI-free Textbook Sequence Game) */}
              {activeTab === "adventure" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6 h-full"
                >
                  {/* Title Banner */}
                  <div className="bg-gradient-to-r from-purple-500 via-indigo-600 to-indigo-700 text-white p-6 rounded-[32px] border-b-6 border-r-6 border-indigo-900 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="relative z-10">
                      <div className="bg-white/20 text-purple-100 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-2">
                        🎭 offline dialogue builder
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2 uppercase tracking-wide">
                        <span>ركن المحادثة وبناء الحوار التفاعلي</span>
                      </h3>
                      <p className="text-xs text-indigo-100 font-bold mt-1">
                        Select a dialogue from your SMILE book, arrange the scrambled sentences, and listen to the real voices play back!
                      </p>
                    </div>
                    <div className="shrink-0 bg-white/10 px-4 py-2.5 rounded-[20px] backdrop-blur-md border border-white/20 flex items-center gap-2">
                      <span className="text-2xl">🏆</span>
                      <div className="text-left">
                        <div className="text-[10px] text-indigo-100 font-black uppercase">Points Score</div>
                        <div className="text-lg font-black leading-none text-yellow-300">{points} PTS</div>
                      </div>
                    </div>
                  </div>

                  {/* 1. Selecting the Book Dialogue block */}
                  <div className="bg-white rounded-[32px] p-5 shadow-sm border-b-6 border-r-6 border-slate-100 flex flex-col gap-3">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
                      <BookOpen className="w-4 h-4 text-purple-500" />
                      Step 1: Choose a Dialogue from your Textbook • اختر محادثة من الكتاب
                    </h4>

                    {/* Left & Right selection scroller wrapper or direct select bento grid */}
                    <div className="flex gap-2 overflow-x-auto pb-2 pr-1 scrollbar-thin">
                      {allBookDialogueLessons.map((dialogueItem, idx) => {
                        const isSelected = selectedDialogueIndex === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => initDialogueBuilder(idx)}
                            className={`shrink-0 px-4 py-3 rounded-[20px] font-black text-xs uppercase tracking-wide transition-all cursor-pointer border-b-4 border-r-4 ${
                              isSelected
                                ? "bg-amber-400 border-amber-600 text-amber-950 scale-102 shadow-sm"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <span className="opacity-75 block text-[9px]">UNIT {dialogueItem.unitId}</span>
                            <span>{dialogueItem.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. MAIN BUILDING WORKSPACE */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    
                    {/* Left Workspace Panel: Scrambled sentences */}
                    <div className="bg-white rounded-[32px] p-5 shadow-sm border-b-6 border-r-6 border-indigo-50 flex flex-col gap-4">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <h4 className="text-xs font-black text-indigo-950 uppercase tracking-widest flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-indigo-500 animate-spin-slow" />
                          Scrambled Pieces • الجمل المبعثرة
                        </h4>
                        
                        {/* Cheat button */}
                        <button
                          onClick={() => setShowTextbookGuide(!showTextbookGuide)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                        >
                          {showTextbookGuide ? <EyeOff className="w-3.1 h-3.1" /> : <Eye className="w-3.1 h-3.1" />}
                          <span>{showTextbookGuide ? "Hide textbook Guide" : "Show textbook Guide"}</span>
                        </button>
                      </div>

                      {/* Display Textbook Sequence Cheat Guide if activated */}
                      <AnimatePresence>
                        {showTextbookGuide && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[24px] p-4 text-[11px] font-bold text-slate-600 space-y-1.5 overflow-hidden"
                          >
                            <span className="text-[10px] text-purple-600 font-extrabold uppercase block mb-1">📖 Textbook Dialogue Guide (SMILE Book):</span>
                            {allBookDialogueLessons[selectedDialogueIndex]?.dialogue.map((lin, idx) => (
                              <div key={idx} className="flex gap-2 items-start text-xs border-b border-slate-100/50 pb-1">
                                <span className="font-mono bg-indigo-100 text-indigo-800 rounded px-1.5 py-0.2 select-none shrink-0">{idx+1}</span>
                                <span>
                                  <strong>{lin.speaker}:</strong> "{lin.text}"
                                </span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* If Completed, show winning box */}
                      {dialogueCompleted ? (
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="bg-emerald-50 border-4 border-emerald-300 rounded-[30px] p-6 text-center flex flex-col items-center gap-4 py-8"
                        >
                          <span className="text-5xl animate-bounce">🏆🌟</span>
                          <h5 className="text-xl font-black text-sky-950 uppercase tracking-tight">Super Job! أحسنت يا بطل!</h5>
                          <p className="text-xs font-bold text-emerald-800 max-w-sm">
                            You correctly placed and ordered all textbook dialogue sentences in sequence! You earned <strong className="text-md text-emerald-700">+15 PTS</strong>!
                          </p>

                          {/* Controls */}
                          <div className="flex flex-col sm:flex-row gap-2.5 w-full mt-2">
                            <button
                              onClick={playEntireShow}
                              disabled={isPlayingEntireDialogue}
                              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white border-b-4 border-indigo-800 h-[48px] rounded-[18px] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-0.5"
                            >
                              {isPlayingEntireDialogue ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  <span>Playing Show...</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 fill-current" />
                                  <span>Play Entire Act 🎭</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => initDialogueBuilder(selectedDialogueIndex)}
                              className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border-b-4 border-slate-300 h-[48px] rounded-[18px] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-0.5"
                            >
                              <RotateCcw className="w-4 h-4" />
                              <span>Try Again 🔄</span>
                            </button>
                            
                            {selectedDialogueIndex < allBookDialogueLessons.length - 1 && (
                              <button
                                onClick={() => initDialogueBuilder(selectedDialogueIndex + 1)}
                                className="flex-1 bg-amber-400 hover:bg-amber-500 text-amber-950 border-b-4 border-amber-600 h-[48px] rounded-[18px] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-all active:translate-y-0.5"
                              >
                                <span>Next Dialogue</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <p className="text-[11px] font-bold text-slate-500 leading-snug">
                            Tap the speech bubbles below in the correct order to piece together the conversation!
                          </p>

                          <div className="flex flex-col gap-2.5">
                            <AnimatePresence mode="popLayout">
                              {scrambledLines.map((line) => {
                                const isWrong = builderWrongSelectionId === line.id;
                                return (
                                  <motion.button
                                    key={line.id}
                                    layout
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    animate={isWrong ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                                    transition={isWrong ? { duration: 0.4 } : { type: "spring", stiffness: 350, damping: 25 }}
                                    onClick={() => handleLineTap(line)}
                                    className={`w-full text-left p-4 rounded-[22px] border-b-4 border-r-4 transition-all cursor-pointer flex gap-3.5 items-center relative active:translate-y-0.5 ${
                                      isWrong
                                        ? "bg-rose-100 border-rose-400 text-rose-950"
                                        : "bg-slate-50 border-slate-200 text-sky-950 hover:bg-indigo-50/70 hover:border-indigo-200"
                                    }`}
                                  >
                                    <span className="text-2xl pt-0.5 shrink-0 select-none">
                                      {getSpeakerEmoji(line.speaker)}
                                    </span>
                                    <div className="flex-1 min-w-0 pr-6 text-left">
                                      <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1">
                                        {line.speaker}
                                      </div>
                                      <p className="font-extrabold text-[14px] leading-tight text-slate-800 break-words">
                                        "{line.text}"
                                      </p>
                                    </div>
                                    <div className="absolute right-3 top-3 text-[9px] bg-slate-250 border border-slate-300/40 text-slate-400 font-extrabold uppercase px-1.5 py-0.5 rounded-full select-none">
                                      Tap
                                    </div>
                                  </motion.button>
                                );
                              })}
                            </AnimatePresence>
                          </div>
                          
                          {scrambledLines.length === 0 && (
                            <div className="text-center text-xs font-black text-slate-400 py-6">
                              All lines are placed! Awesome!
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right Workspace Panel: Arraged Conversation Stage */}
                    <div className="bg-slate-50 rounded-[32px] p-5 shadow-sm border-b-6 border-r-6 border-slate-200 flex flex-col gap-4 min-h-[360px] relative">
                      
                      {/* Playback overall status title bar */}
                      <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Smile className="w-4 h-4 text-sky-500" />
                          Arranged Stage • مسرح الحوار المرتّب
                        </h4>
                        
                        <div className="text-[10px] bg-indigo-50 text-indigo-700 font-black px-3 py-1 rounded-full border border-indigo-200">
                          {arrangedLines.length} / {allBookDialogueLessons[selectedDialogueIndex]?.dialogue.length} Complete
                        </div>
                      </div>

                      {/* Progression stage log */}
                      <div className="flex-1 flex flex-col gap-3 max-h-[460px] overflow-y-auto pr-1">
                        <AnimatePresence mode="popLayout">
                          {arrangedLines.map((line, idx) => {
                            const isCurrentlyActiveSpeaker = isPlayingEntireDialogue && activeSpeakingLineIndex === idx;
                            return (
                              <motion.div
                                key={`arranged-${line.id}`}
                                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                                animate={{ 
                                  opacity: 1, 
                                  scale: 1, 
                                  y: 0,
                                  boxShadow: isCurrentlyActiveSpeaker ? "0 0 0 4px rgba(99, 102, 241, 0.45)" : "none"
                                }}
                                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                className={`p-4 rounded-[24px] border-b-4 border-r-4 transition-all relative flex gap-3 ${
                                  isCurrentlyActiveSpeaker 
                                    ? "bg-indigo-50 border-indigo-300 text-indigo-950 scale-102"
                                    : "bg-white border-slate-200 text-slate-800"
                                }`}
                              >
                                {/* Active speaker glowing tag */}
                                {isCurrentlyActiveSpeaker && (
                                  <span className="absolute -top-2 left-6 bg-indigo-600 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                                    Speaking...
                                  </span>
                                )}

                                <span className="text-3xl pt-0.5 select-none shrink-0">
                                  {getSpeakerEmoji(line.speaker)}
                                </span>
                                <div className="flex-1 min-w-0 text-left">
                                  <div className="flex items-center gap-1.5 mb-1">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{line.speaker}</span>
                                    <span className="text-[8px] font-mono text-slate-300 bg-slate-100 rounded px-1">Seq {idx+1}</span>
                                  </div>
                                  <p className="font-extrabold text-[14px] leading-tight text-slate-900 pr-5 break-words">
                                    "{line.text}"
                                  </p>
                                </div>

                                {/* Hear again btn */}
                                <button
                                  onClick={() => speakText(line.text, line.voice)}
                                  className="self-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-2 border-indigo-200 rounded-full p-2 cursor-pointer transition-all active:scale-90"
                                  title="Listen again"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>

                        {/* Blank initial instructions */}
                        {arrangedLines.length === 0 && (
                          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 text-slate-400 gap-3">
                            <span className="text-5xl animate-pulse">🎭</span>
                            <div className="max-w-xs space-y-1">
                              <p className="text-xs font-black uppercase tracking-wider text-slate-500">Stage is Empty</p>
                              <p className="text-[11px] font-bold text-slate-400">
                                Click the scrambled sentence blocks on the left in the correct chronological order to seat the speakers on the stage!
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Stage footer play show shortcut bar */}
                      {arrangedLines.length > 0 && (
                        <div className="pt-2 border-t border-slate-200 flex justify-between items-center gap-3">
                          <button
                            onClick={() => initDialogueBuilder(selectedDialogueIndex)}
                            className="bg-white hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-[14px] text-[10px] font-black uppercase tracking-wider text-slate-500 cursor-pointer"
                          >
                            Reset Sequence
                          </button>

                          <button
                            onClick={playEntireShow}
                            disabled={isPlayingEntireDialogue || !dialogueCompleted}
                            className={`px-4 py-2 rounded-[16px] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all border-b-4 border-r-4 ${
                              dialogueCompleted
                                ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-700 text-white cursor-pointer active:translate-y-0.5"
                                : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                            }`}
                          >
                            {isPlayingEntireDialogue ? (
                              <>
                                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Playing act...</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 fill-current" />
                                <span>Play show</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: SYLLABUS MAP (قسم المنهج بكتاب الطالب) */}
              {activeTab === "syllabus" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white p-6 rounded-[32px] border-b-6 border-r-6 border-rose-800/80">
                    <h3 className="text-xl font-black flex items-center gap-2 uppercase tracking-wide">
                      📚 SMILE Grade 3 Syllabus Map
                    </h3>
                    <p className="text-xs text-rose-100 font-bold mt-1">
                      Explore the whole textbook here! Tap any unit to learn, play songs, and test your vocabulary instantly!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SMILE_UNITS.map((unit) => (
                      <motion.div
                        key={unit.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-5 rounded-[28px] border-2 bg-white flex flex-col justify-between gap-4 shadow-sm relative overflow-hidden transition-all ${
                          selectedUnit.id === unit.id ? "border-rose-400 ring-4 ring-rose-100" : "border-slate-100 hover:border-rose-200"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-3xl">{unit.icon}</span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 font-extrabold px-2.5 py-1 rounded-full uppercase">
                              Unit {unit.id}
                            </span>
                          </div>
                          <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight leading-tight">
                            {unit.title}
                          </h4>
                          
                          {/* Book Map Info Summary for parents and kids */}
                          <div className="mt-3 flex flex-col gap-2">
                            <div className="bg-slate-50 p-2.5 rounded-xl text-xs font-semibold text-slate-600">
                              <span className="font-extrabold text-slate-700 uppercase block mb-1">📖 Lessons Included:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {unit.lessons.map((l) => (
                                  <span
                                    key={l.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleUnitSelect(unit);
                                      handleLessonSelect(l);
                                      setActiveTab("book");
                                    }}
                                    className="bg-white border border-slate-200/80 hover:border-rose-400 py-1 px-2 rounded-lg text-[10px] font-bold text-slate-700 cursor-pointer transition-colors"
                                  >
                                    L{l.id}: {l.title}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="bg-rose-50/50 p-2.5 rounded-xl text-xs font-semibold text-rose-950">
                              <span className="font-extrabold text-rose-800 uppercase block mb-1">🔑 Core Vocabulary:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {unit.words.map((w) => (
                                  <span
                                    key={w.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleUnitSelect(unit);
                                      setActiveTab("dictionary");
                                    }}
                                    className="bg-white/80 border border-rose-100 hover:border-rose-400 py-0.5 px-1.5 rounded-md text-[10px] font-extrabold cursor-pointer transition-colors"
                                  >
                                    {w.word} {w.image}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            handleUnitSelect(unit);
                            setActiveTab("book");
                          }}
                          className="w-full mt-2 bg-slate-900 hover:bg-rose-600 text-white py-2.5 rounded-[16px] text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <span>Open Chapter {unit.id}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 6: WORKSHEETS (أوراق العمل) */}
              {activeTab === "worksheets" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-6 rounded-[32px] border-b-6 border-r-6 border-violet-800/80 no-print">
                    <h3 className="text-xl font-black flex items-center gap-2 uppercase tracking-wide">
                      📝 Interactive & Printable Worksheets • أوراق عمل تفاعلية
                    </h3>
                    <p className="text-xs text-violet-100 font-bold mt-1">
                      Solve worksheets interactively with auto-correction, listen to pronunications, or print clean sheets with watermarks!
                    </p>
                  </div>

                  {/* Worksheet list switcher */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 no-print">
                    {WORKSHEETS.map((ws) => {
                      const isSelected = selectedWorksheetId === ws.id;
                      return (
                        <motion.button
                          key={ws.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedWorksheetId(ws.id);
                            setWorksheetStudentAnswers({});
                            setWorksheetSubmitted(false);
                            setWorksheetScore(0);
                          }}
                          className={`p-3.5 rounded-[22px] border-b-4 border-r-4 text-center cursor-pointer transition-all flex flex-col gap-1 ${
                            isSelected
                              ? "bg-violet-600 text-white border-violet-800 shadow-md"
                              : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <span className="text-[10px] font-extrabold uppercase opacity-85">Sheet {ws.id}</span>
                          <span className="text-xs font-black truncate w-full">{ws.title}</span>
                          <span className="text-[9px] font-semibold opacity-75">{ws.arabicTitle}</span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Teacher Tools Lock control */}
                  <div className="bg-violet-50 border-2 border-dashed border-violet-200 p-5 rounded-[28px] flex flex-col md:flex-row justify-between items-center gap-4 no-print">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white rounded-full text-2xl shadow-sm">
                        {watermarkUnlocked ? "🔓" : "🔒"}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-violet-950 uppercase">Teacher Print Setup • أوراق العمل والطباعة</h4>
                        <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                          {watermarkUnlocked 
                            ? "Excellent! The watermark is removed. Ready for clean printing! 🖨️"
                            : "To remove the watermark for clean printable paper distribution, enter the teacher code: 20302060"}
                        </p>
                      </div>
                    </div>
                    
                    {!watermarkUnlocked ? (
                      <div className="flex gap-2 w-full md:w-auto shrink-0">
                        <input
                          type="text"
                          value={watermarkCodeInput}
                          onChange={(e) => {
                            setWatermarkCodeInput(e.target.value);
                            setWatermarkMsg("");
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              if (watermarkCodeInput.trim() === "20302060") {
                                setWatermarkUnlocked(true);
                                setWatermarkMsg("Success! Watermark unlocked.");
                              } else {
                                setWatermarkMsg("Incorrect code. Please try again!");
                              }
                            }
                          }}
                          placeholder="Enter code (20302060)"
                          className="px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-xs font-extrabold text-sky-950 w-full md:w-48 focus:outline-none focus:border-violet-500"
                        />
                        <button
                          onClick={() => {
                            if (watermarkCodeInput.trim() === "20302060") {
                              setWatermarkUnlocked(true);
                              setWatermarkMsg("Success! Watermark unlocked.");
                            } else {
                              setWatermarkMsg("Incorrect code. Please try again!");
                            }
                          }}
                          className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-black uppercase py-2.5 px-5 rounded-xl border-b-4 border-violet-800 tracking-wide transition-all shrink-0 cursor-pointer"
                        >
                          Unlock 🔓
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setWatermarkUnlocked(false);
                          setWatermarkCodeInput("");
                          setWatermarkMsg("");
                        }}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-black uppercase py-2 px-4 rounded-xl border-b-4 border-slate-400 transition-all cursor-pointer"
                      >
                        Lock Again 🔒
                      </button>
                    )}
                  </div>

                  {watermarkMsg && (
                    <p className={`text-xs font-bold text-center -mt-2 no-print ${watermarkUnlocked ? "text-emerald-600" : "text-rose-500"}`}>
                      {watermarkMsg}
                    </p>
                  )}

                  {/* Selected Worksheet Container */}
                  <div className="printable-worksheet bg-white border-b-8 border-r-8 border-slate-200 rounded-[36px] p-6 sm:p-10 relative overflow-hidden flex flex-col gap-6 shadow-sm">
                    {/* Watermark overlay */}
                    {!watermarkUnlocked && (
                      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.06] overflow-hidden z-0 flex flex-col justify-around items-center">
                        <div className="text-3xl sm:text-5xl font-black uppercase rotate-[-25deg] whitespace-nowrap">بوابة المعلم السوداني - SMILE GRADE 3</div>
                        <div className="text-3xl sm:text-5xl font-black uppercase rotate-[-25deg] whitespace-nowrap">بوابة المعلم السوداني - SMILE GRADE 3</div>
                        <div className="text-3xl sm:text-5xl font-black uppercase rotate-[-25deg] whitespace-nowrap">بوابة المعلم السوداني - SMILE GRADE 3</div>
                        <div className="text-3xl sm:text-5xl font-black uppercase rotate-[-25deg] whitespace-nowrap">بوابة المعلم السوداني - SMILE GRADE 3</div>
                      </div>
                    )}

                    {/* Sudan Ministry layout header */}
                    <div className="border-b-4 border-double border-slate-300 pb-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 z-10">
                      <div className="text-[10px] font-black text-slate-700 uppercase tracking-wide flex flex-col gap-1">
                        <span>جمهورية السودان • Republic of Sudan</span>
                        <span>وزارة التربية والتعليم • Ministry of Education</span>
                        <span>ولاية الخرطوم • Khartoum State</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-3xl">🇸🇩</span>
                        <span className="text-md font-black text-slate-800 uppercase tracking-tight mt-1">SMILE Book 1</span>
                      </div>
                      <div className="text-[10px] font-black text-slate-700 uppercase tracking-wide text-center sm:text-right flex flex-col gap-1">
                        <span>Grade 3 Worksheet • ورقة عمل الصف الثالث</span>
                        <span>English Language • اللغة الإنجليزية</span>
                        <span>Total Marks: 20 • الدرجة الكاملة: 20</span>
                      </div>
                    </div>

                    {/* Input forms for Student Name, Class, School */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/50 z-10 no-print">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Student Name / اسم الطالب:</label>
                        <input
                          type="text"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="أدخل اسمك هنا..."
                          className="w-full px-3 py-2 rounded-xl bg-white border-2 border-slate-200 font-extrabold text-xs text-sky-950 focus:outline-none focus:border-violet-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Class / الصف:</label>
                        <input
                          type="text"
                          value={studentClass}
                          onChange={(e) => setStudentClass(e.target.value)}
                          placeholder="أدخل الصف (مثلاً: الثالث أ)..."
                          className="w-full px-3 py-2 rounded-xl bg-white border-2 border-slate-200 font-extrabold text-xs text-sky-950 focus:outline-none focus:border-violet-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase">School / المدرسة:</label>
                        <input
                          type="text"
                          value={studentSchool}
                          onChange={(e) => setStudentSchool(e.target.value)}
                          placeholder="اسم المدرسة..."
                          className="w-full px-3 py-2 rounded-xl bg-white border-2 border-slate-200 font-extrabold text-xs text-sky-950 focus:outline-none focus:border-violet-500"
                        />
                      </div>
                    </div>

                    {/* Print-only metadata display */}
                    <div className="hidden print:grid grid-cols-3 gap-6 border-b-2 border-slate-200 pb-3 z-10 text-xs">
                      <span className="font-black text-slate-700">Student Name: <span className="border-b border-dashed border-slate-900 px-2 font-bold">{studentName || "___________________"}</span></span>
                      <span className="font-black text-slate-700">Class: <span className="border-b border-dashed border-slate-900 px-2 font-bold">{studentClass || "__________"}</span></span>
                      <span className="font-black text-slate-700">School: <span className="border-b border-dashed border-slate-900 px-2 font-bold">{studentSchool || "_________________"}</span></span>
                    </div>

                    {/* Questions */}
                    <div className="flex flex-col gap-6 mt-2">
                      {(WORKSHEETS.find(ws => ws.id === selectedWorksheetId) || WORKSHEETS[0]).questions.map((q, idx) => {
                        const selectedOpt = worksheetStudentAnswers[q.id];
                        const isCorrect = selectedOpt === q.correctAnswer;
                        return (
                          <div key={q.id} className="border-b border-slate-100 pb-5 last:border-0 z-10 flex flex-col gap-3 relative">
                            <div className="flex items-start gap-2.5">
                              <span className="bg-violet-50 text-violet-700 text-xs font-black px-2.5 py-1 rounded-lg">Q{idx + 1}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-[15px] font-black text-slate-800 leading-snug">{q.question}</p>
                                  <button
                                    onClick={() => speakText(q.question)}
                                    className="p-1 rounded-full hover:bg-slate-100 text-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer shrink-0 no-print"
                                    title="Listen to question"
                                  >
                                    <Volume2 className="w-4 h-4 animate-bounce" />
                                  </button>
                                </div>
                                {q.arabicTranslation && (
                                  <p className="text-xs font-bold text-slate-400 mt-0.5 leading-snug">{q.arabicTranslation}</p>
                                )}
                              </div>
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider shrink-0">[{q.marks} Marks]</span>
                            </div>

                            {/* Options grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
                              {q.options.map((opt) => {
                                const isOptSelected = selectedOpt === opt;
                                const isOptCorrect = opt === q.correctAnswer;

                                let optStyle = "bg-white border-slate-200 hover:bg-slate-50 text-slate-700";
                                if (worksheetSubmitted) {
                                  if (isOptCorrect) {
                                    optStyle = "bg-emerald-500 border-emerald-700 text-white font-black shadow-sm";
                                  } else if (isOptSelected) {
                                    optStyle = "bg-rose-500 border-rose-700 text-white font-black shadow-sm";
                                  } else {
                                    optStyle = "opacity-60 bg-slate-50 border-slate-200 text-slate-400";
                                  }
                                } else {
                                  if (isOptSelected) {
                                    optStyle = "bg-violet-500 border-violet-700 text-white font-black shadow-md scale-[1.01]";
                                  }
                                }

                                return (
                                  <div key={opt} className="relative flex items-center w-full">
                                    <button
                                      disabled={worksheetSubmitted}
                                      onClick={() => {
                                        setWorksheetStudentAnswers(prev => ({
                                          ...prev,
                                          [q.id]: opt
                                        }));
                                      }}
                                      className={`w-full py-3.5 pl-4 pr-12 rounded-xl border-2 text-left font-black text-xs uppercase tracking-wide transition-all cursor-pointer flex items-center justify-between ${optStyle}`}
                                    >
                                      <span className="flex-1 truncate">{opt}</span>
                                      {worksheetSubmitted && isOptCorrect && <Check className="w-4 h-4 text-white ml-2" />}
                                      {worksheetSubmitted && isOptSelected && !isOptCorrect && <span className="text-white text-[10px] font-black ml-2 font-mono">X</span>}
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        speakText(opt);
                                      }}
                                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-black/5 text-slate-400 hover:text-indigo-600 transition-all cursor-pointer z-20 no-print"
                                      title="Listen to Option"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Submit, feedback & reset buttons */}
                    <div className="mt-4 border-t border-slate-100 pt-6 flex flex-col sm:flex-row gap-3 justify-between items-center z-10 no-print">
                      {!worksheetSubmitted ? (
                        <button
                          onClick={() => {
                            const ws = WORKSHEETS.find(w => w.id === selectedWorksheetId) || WORKSHEETS[0];
                            let score = 0;
                            ws.questions.forEach(q => {
                              if (worksheetStudentAnswers[q.id] === q.correctAnswer) {
                                score += q.marks;
                              }
                            });
                            setWorksheetScore(score);
                            setWorksheetSubmitted(true);
                            setPoints(prev => prev + 30);
                            
                            if (score === 20) {
                              if (!badges.includes("🏆 Worksheet Master")) {
                                setBadges(prev => [...prev, "🏆 Worksheet Master"]);
                              }
                            }
                          }}
                          disabled={Object.keys(worksheetStudentAnswers).length === 0}
                          className={`px-8 py-4 rounded-[20px] font-black uppercase text-xs tracking-wider transition-all shadow-md flex items-center gap-2 border-b-4 ${
                            Object.keys(worksheetStudentAnswers).length > 0
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-800 cursor-pointer"
                              : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60"
                          }`}
                        >
                          <Check className="w-4 h-4" />
                          <span>Correct Worksheet • تصحيح ورقة العمل</span>
                        </button>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => {
                              setWorksheetStudentAnswers({});
                              setWorksheetSubmitted(false);
                              setWorksheetScore(0);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-xs py-3.5 px-6 rounded-[20px] border-b-4 border-indigo-800 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                          >
                            <RotateCcw className="w-4 h-4" />
                            <span>Solve Again • حل مرة أخرى</span>
                          </button>
                        </div>
                      )}

                      <button
                        onClick={() => window.print()}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-black uppercase text-xs py-3.5 px-6 rounded-[20px] border-b-4 border-slate-950 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Print Worksheet • طباعة ورقة العمل</span>
                      </button>
                    </div>

                    {/* Post-submit Score Banner */}
                    {worksheetSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-amber-50 border-2 border-amber-200 p-5 rounded-[28px] text-center flex flex-col items-center gap-2.5 mt-2 z-10"
                      >
                        <span className="text-4xl">🎉🎓</span>
                        <h4 className="text-xl font-black text-amber-950 uppercase tracking-tight">Worksheet Corrected! تم التصحيح</h4>
                        <p className="text-xs font-bold text-slate-600">
                          Dear <span className="font-black text-indigo-600">{studentName || "Pupil"}</span>, you scored <span className="text-lg font-black text-violet-600">{worksheetScore} / 20 Marks</span>!
                        </p>
                        <div className="text-[10px] bg-white text-emerald-700 font-extrabold px-4 py-1.5 rounded-full shadow-sm border border-emerald-100 uppercase tracking-wider">
                          {worksheetScore === 20 ? "Perfect! أحسنت يا بطل! 🏆🌟" : "Good Try! راجع الأخطاء لتتعلم أكثر! 📚✨"}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </main>
      </div>

      {/* Hidden Audio Player for absolute compatibility in iframe sandbox contexts */}
      <audio ref={audioPlayerRef} className="hidden" aria-hidden="true" />

      {/* Sudan Modern Learning Pupil English Footer Credits */}
      <footer className="max-w-6xl w-full mx-auto mt-8 py-6 text-center text-sky-700/60 font-semibold border-t border-sky-100">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs uppercase tracking-wider font-extrabold px-4">
          <p>© SMILE English • Grade 3 Interactive Companion</p>
          <div className="flex gap-3">
            <span className="text-sky-800">Pupil's Book 1</span>
            <span>•</span>
            <span className="text-sky-800">Sudan</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
