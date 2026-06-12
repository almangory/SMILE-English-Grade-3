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
  Grid
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SMILE_UNITS } from "./smileData";
import { UnitItem, Lesson, WordItem, ChatMessage } from "./types";

export default function App() {
  const [selectedUnit, setSelectedUnit] = useState<UnitItem>(SMILE_UNITS[0]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(SMILE_UNITS[0].lessons[0]);
  const [activeTab, setActiveTab] = useState<"book" | "dictionary" | "quiz" | "adventure">("book");
  
  // Voice selection mode (Vibrant server-side AI Voice with zero-config HTML5 audio fallbacks)
  const [voiceMode, setVoiceMode] = useState<"system" | "gemini">("gemini");

  // Game states
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizScoreFinished] = useState(false);
  const [points, setPoints] = useState(10);
  const [badges, setBadges] = useState<string[]>(["⭐️ First Explorer"]);

  // Audio state
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [audioPlaybackActive, setAudioPlaybackActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Chat/Adventure state
  const [chatCharacter, setCharacter] = useState<string>("Ahmed");
  const [userChatInput, setUserChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      role: "model",
      text: "As-salamu alaykum! Ahlan! I am Ahmed. I am 8 years old. Let's practice English! Write to me or click simple questions below!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

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
      if (audioRef.current) {
        audioRef.current.pause();
      }
      window.speechSynthesis.cancel();
      setAudioPlaybackActive(false);
      setSpeakingText(null);
      return;
    }

    // Cancel any previous audio immediately (prevents overlapping/stuck sounds)
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    window.speechSynthesis.cancel();

    setSpeakingText(text);
    setAudioPlaybackActive(true);

    // If System Voice mode is selected, speak synchronously to guarantee user-gesture context is kept intact
    if (voiceMode === "system") {
      fallbackSpeechSynthesis(text);
      return;
    }

    try {
      // Direct stream URL using our highly reliable, free, non-AI Google Translation server-side pipe
      const audioUrl = `/api/tts?text=${encodeURIComponent(text)}`;
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setAudioPlaybackActive(false);
        setSpeakingText(null);
      };
      audio.onerror = (e) => {
        console.warn("Direct stream play failed, trying system speech synthesis fallback:", e);
        fallbackSpeechSynthesis(text);
      };

      // Play instantly inside the user click microtask thread
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay block detected on direct stream, falling back:", err);
          fallbackSpeechSynthesis(text);
        });
      }
    } catch (err) {
      console.warn("Audio element setup failed. Falling back:", err);
      fallbackSpeechSynthesis(text);
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

  // Send message to Badr/Ahmed AI Chatbot partner
  const sendChatMessage = async (presetText?: string) => {
    const messageToSend = presetText || userChatInput.trim();
    if (!messageToSend) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: "user",
      text: messageToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!presetText) {
      setUserChatInput("");
    }
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageToSend,
          character: chatCharacter,
          history: chatMessages.slice(-8).map(m => ({ role: m.role, text: m.text })),
        }),
      });
      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: "model",
        text: data.text || "Pardon me? Let's read simple English!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => [...prev, botMsg]);
      // Award point for conversation output
      setPoints(prev => prev + 5);
      if (points + 5 >= 50 && !badges.includes("🗣 English Speaker")) {
        setBadges(prev => [...prev, "🗣 English Speaker"]);
      }
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsChatLoading(false);
    }
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
            <p className="text-sky-600 font-bold text-sm sm:text-lg">Grade 3 • الصف الثالث الابتدائي</p>
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
              SMILE Units • كتابك المدرسي
            </h2>
            
            <div className="flex flex-col gap-3 max-h-[340px] lg:max-h-[none] overflow-y-auto pr-1">
              {SMILE_UNITS.map((u) => {
                const isSelected = selectedUnit.id === u.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => handleUnitSelect(u)}
                    className={`w-full text-left p-3.5 rounded-[24px] border-b-4 transition-all flex items-start gap-3 relative transform hover:scale-[1.02] cursor-pointer ${
                      isSelected 
                        ? `${u.color} shadow-md border-amber-600 font-bold scale-[1.02] text-amber-950` 
                        : "bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-700"
                    }`}
                  >
                    <span className="text-3xl pt-0.5">{u.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-wider font-extrabold opacity-75">Unit {u.id}</div>
                      <div className="text-[13px] truncate leading-tight font-black uppercase text-sky-950">{u.title}</div>
                      <div className="text-[11px] opacity-90 font-medium block leading-tight mt-0.5">{u.arabicTitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sound & Pronunciation Settings Widget */}
          <div className="bg-white rounded-[32px] p-5 shadow-sm border-b-8 border-r-8 border-indigo-100 flex flex-col gap-3">
            <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Volume2 className="w-4 h-4 text-indigo-500" />
              Sound Settings • إعدادات الصوت
            </h3>
            
            <p className="text-[11px] font-extrabold text-slate-500 leading-snug">
              الآن الصوت مدمج بالكامل ومجاني! إذا واجهت أي مشكلة، يمكنك التبديل بين مشغلات الصوت أدناه ثم الضغط على زر التجربة:
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
                    <span className="text-[10px] opacity-80 leading-tight">صوت الموقع المدمج (مجاني فوري)</span>
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
                    <span className="text-[10px] opacity-80 leading-tight">صوت النظام المحلي بالجهاز</span>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={() => speakText("Welcome to SMILE English Grade 3 pupil! As-salamu alaykum!", "Kore")}
              className="mt-1 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase py-3 px-4 rounded-[16px] border-b-4 border-emerald-700 transition-all flex items-center justify-center gap-2 cursor-pointer transform active:translate-y-0.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Test & Play • تجربة وتشغيل الصوت</span>
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
            <button
              onClick={() => setActiveTab("book")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "book"
                  ? "bg-sky-500 text-white border-b-4 border-sky-700 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-sky-900 font-bold"
              }`}
            >
              <BookOpen className="w-5 h-5 mb-0.5" />
              <span>Pupil's Book</span>
              <span className="text-[10px] opacity-80 font-bold">كتاب الطالب</span>
            </button>

            <button
              onClick={() => setActiveTab("dictionary")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "dictionary"
                  ? "bg-amber-400 text-white border-b-4 border-amber-600 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-amber-900 font-bold"
              }`}
            >
              <Compass className="w-5 h-5 mb-0.5" />
              <span>Vocabulary</span>
              <span className="text-[10px] opacity-80 font-bold">المفردات والكلمات</span>
            </button>

            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "quiz"
                  ? "bg-emerald-400 text-white border-b-4 border-emerald-600 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-emerald-950 font-bold"
              }`}
            >
              <Gamepad2 className="w-5 h-5 mb-0.5" />
              <span>Quiz Games</span>
              <span className="text-[10px] opacity-80 font-bold">المسابقات والألعاب</span>
            </button>

            <button
              onClick={() => setActiveTab("adventure")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "adventure"
                  ? "bg-purple-500 text-white border-b-4 border-purple-700 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-purple-950 font-bold"
              }`}
            >
              <Smile className="w-5 h-5 mb-0.5" />
              <span>AI Chat Partner</span>
              <span className="text-[10px] opacity-80 font-bold">ركن المحادثة</span>
            </button>
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
                        <button
                          onClick={() => speakText(selectedLesson.content.songText || "")}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase py-4 px-8 rounded-[24px] shadow-[0_5px_0_0_#4338ca] hover:shadow-[0_2px_0_0_#4338ca] transition-all flex items-center gap-2 transform active:translate-y-1"
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
                        </button>
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
                              <div 
                                onClick={() => speakText(line.text, line.voice)}
                                className={`flex-1 p-5 rounded-[24px] shadow-sm border-b-6 border-r-6 cursor-pointer hover:scale-[1.01] transition-all ${
                                  isSpecial 
                                    ? isPlaying 
                                      ? "bg-amber-100/90 border-amber-400 text-amber-950 scale-[1.01]" 
                                      : "bg-amber-50/60 border-amber-200 hover:border-amber-400 text-slate-800"
                                    : isPlaying 
                                      ? "bg-sky-100/90 border-sky-400 text-sky-950 scale-[1.01]" 
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
                              </div>
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
                            <button
                              key={l}
                              onClick={() => speakText(`Letter ${l} says, /${l}/ pronunciation`, "Zephyr")}
                              className="w-20 h-20 rounded-[24px] bg-white hover:bg-slate-50 border-b-6 border-r-6 border-slate-300 shadow-sm flex flex-col items-center justify-center transition-all transform hover:scale-[1.05] active:translate-y-1 cursor-pointer group"
                            >
                              <span className="text-4xl font-black text-sky-500 uppercase group-hover:text-indigo-600 leading-none">{l}</span>
                              <span className="text-[10px] text-slate-400 font-extrabold italic uppercase mt-1">say /{l}/</span>
                            </button>
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
                                  <button
                                    key={option}
                                    onClick={() => handleQuizAnswerSubmit(option, 0, 1, selectedLesson.content.games || [])}
                                    className={`py-3 px-4 rounded-[20px] border-b-4 border-r-4 font-black text-sm uppercase tracking-wider transition-all text-center cursor-pointer transform active:scale-95 ${
                                      selectedAnswer === option
                                        ? option === selectedLesson.content.games?.[0].correctAnswer
                                          ? "bg-emerald-500 border-emerald-700 text-white"
                                          : "bg-rose-500 border-rose-700 text-white"
                                        : "bg-white border-slate-300 hover:bg-slate-50 text-slate-700"
                                    }`}
                                  >
                                    {option}
                                  </button>
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
                      📖 Unit {selectedUnit.id} Picture Cards • بطاقات الكلمات التفاعلية
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {selectedUnit.words.map((w) => (
                        <div
                          key={w.id}
                          onClick={() => speakText(w.word, "Kore")}
                          className="bg-white border-b-6 border-r-6 border-slate-200 hover:border-sky-300 hover:scale-[1.02] rounded-[24px] p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-1.5 relative group justify-between cursor-pointer"
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
                            <p className="font-extrabold text-[15px] text-sky-950 group-hover:text-sky-600 transition-colors uppercase leading-tight font-black">{w.word}</p>
                            <p className="text-[12px] text-slate-400 font-extrabold block mb-1.5">{w.arabic}</p>
                            <span className="text-[10px] bg-slate-50 text-slate-600 px-2.5 py-1 rounded-full inline-block mt-0.5 font-bold leading-tight">
                              {w.example}
                            </span>
                          </div>
                        </div>
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
                      <div 
                        key={w.id} 
                        onClick={() => speakText(w.word, "Kore")}
                        className="bg-white rounded-[28px] p-5 shadow-sm border-b-6 border-r-6 border-slate-200/90 hover:border-teal-400 hover:scale-[1.01] flex items-center gap-4 transition-all group cursor-pointer"
                      >
                        <div className="text-5xl p-3 bg-slate-50 border-2 border-slate-100 rounded-[20px] transition-transform group-hover:rotate-6">{w.image}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-black text-[16px] text-sky-950 uppercase">{w.word}</h4>
                            <span className="text-[10px] bg-slate-100 text-slate-500 font-extrabold px-2 py-0.5 rounded-full uppercase">Unit {w.unit}</span>
                          </div>
                          <p className="text-sm font-black text-teal-600 mt-0.5">{w.arabic}</p>
                          <p className="text-xs font-bold text-slate-500 mt-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/70 inline-block font-sans">
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
                      </div>
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

                  {/* Combined Dynamic Quiz Engine based on Unit Selection */}
                  {(() => {
                    // Extract all games from selected unit
                    const quizQuestionsList = selectedUnit.lessons
                      .filter(l => l.content.games)
                      .flatMap(l => l.content.games || []);

                    if (quizQuestionsList.length === 0) {
                      return (
                        <div className="text-center py-12 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-300">
                          <p className="text-lg font-black text-slate-700">No games built for this Unit yet!</p>
                          <p className="text-xs font-extrabold text-slate-400 mt-1">Please select another Unit (e.g. Unit 1, 2, or 3) on the left layout column!</p>
                        </div>
                      );
                    }

                    if (quizFinished) {
                      return (
                        <div className="bg-slate-50 border-b-8 border-r-8 border-slate-200 rounded-[40px] p-8 text-center flex flex-col items-center gap-5 max-w-md mx-auto w-full">
                          <span className="text-6xl animate-bounce">🏆</span>
                          <h4 className="text-2xl font-black text-sky-950 uppercase tracking-tight">Alf Mabrouk! (Well Done!)</h4>
                          <p className="text-sm font-bold text-slate-600">
                            You scored <span className="font-extrabold text-indigo-600 text-lg">{quizScore} / {quizQuestionsList.length}</span> correct answers! Keep learning!
                          </p>
                          <div className="bg-amber-100 text-amber-900 font-extrabold px-6 py-2.5 rounded-[20px] text-sm shadow-sm border-2 border-amber-200 uppercase tracking-wider">
                            ⭐ Got +{quizScore * 10} Extra Points!
                          </div>
                          <button
                            onClick={() => {
                              setCurrentQuizIndex(0);
                              setSelectedAnswer(null);
                              setQuizScore(0);
                              setQuizScoreFinished(false);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase py-4 px-8 rounded-[24px] shadow-[0_5px_0_0_#4338ca] hover:shadow-[0_2px_0_0_#4338ca] transition-all cursor-pointer transform active:translate-y-1 w-full"
                          >
                            Play Again!
                          </button>
                        </div>
                      );
                    }

                    const currentQuestion = quizQuestionsList[currentQuizIndex];

                    return (
                      <div className="bg-white p-6 sm:p-8 rounded-[36px] border-b-8 border-r-8 border-slate-200 shadow-sm flex flex-col gap-6 max-w-xl mx-auto w-full">
                        <div className="flex justify-between items-center text-xs font-black text-slate-400 tracking-wider uppercase">
                          <span>Progress: {currentQuizIndex + 1} / {quizQuestionsList.length}</span>
                          <span className="text-amber-500 font-black">Score: {quizScore}</span>
                        </div>

                        <div>
                          <p className="text-lg sm:text-xl font-black text-slate-800 text-center leading-relaxed">
                            {currentQuestion.question}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
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
                              <button
                                key={option}
                                disabled={selectedAnswer !== null}
                                onClick={() => handleQuizAnswerSubmit(option, currentQuizIndex, quizQuestionsList.length, quizQuestionsList)}
                                className={`py-4 px-5 rounded-[20px] text-center font-black text-[15px] transition-all transform active:scale-95 cursor-pointer flex items-center justify-between uppercase tracking-wide ${buttonStyle}`}
                              >
                                <span>{option}</span>
                                {selectedAnswer && isCorrect && <Check className="w-5 h-5 text-white" />}
                                {selectedAnswer && isSelected && !isCorrect && <span className="text-white text-xs font-black font-mono">X</span>}
                              </button>
                            );
                          })}
                        </div>

                        {selectedAnswer && (
                          <div className="text-center text-xs font-black text-sky-950 uppercase tracking-wider animate-pulse pt-2 border-t border-slate-100">
                            {selectedAnswer === currentQuestion.correctAnswer 
                              ? "🎉 Brilliant answer! You got it right!" 
                              : `❌ Oops, almost there! The correct answer was "${currentQuestion.correctAnswer}".`}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </motion.div>
              )}

              {/* TAB 4: ENGLISH CONVERSATION ADVENTURE (AI-powered Sudanese partner chat!) */}
              {activeTab === "adventure" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-4 h-full"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-[32px] border-b-6 border-r-6 border-indigo-800/80 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-black flex items-center gap-2 uppercase tracking-wide">
                        💬 Conversational English Partner
                      </h3>
                      <p className="text-xs text-indigo-100 font-bold">Talk in English to Ahmed or Fatma! They live in Sudan and have studied SMILE Book 1!</p>
                    </div>
                    {/* Character toggle selector - Bento style */}
                    <div className="flex bg-indigo-950 p-1.5 rounded-[20px] gap-1 shadow-inner border border-indigo-400/20 shrink-0">
                      <button
                        onClick={() => {
                          setCharacter("Ahmed");
                          setChatMessages([
                            {
                              id: "init-ahmed",
                              role: "model",
                              text: "Hello, my friend! I am Ahmed and I live next to the market in Nile Road. What is your name and how old are you?",
                              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            }
                          ]);
                        }}
                        className={`px-4 py-2 rounded-[14px] text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          chatCharacter === "Ahmed" ? "bg-white text-indigo-950 shadow" : "bg-transparent text-white hover:bg-white/10"
                        }`}
                      >
                        👦 Ahmed
                      </button>
                      <button
                        onClick={() => {
                          setCharacter("Fatma");
                          setChatMessages([
                            {
                              id: "init-fatma",
                              role: "model",
                              text: "Hi, I am Fatma! I live in flat twelve. I love beautiful colors! How are you today? Let's speak English!",
                              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            }
                          ]);
                        }}
                        className={`px-4 py-2 rounded-[14px] text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          chatCharacter === "Fatma" ? "bg-white text-indigo-950 shadow" : "bg-transparent text-white hover:bg-white/10"
                        }`}
                      >
                        👧 Fatma
                      </button>
                    </div>
                  </div>

                  {/* Chat interface box */}
                  <div className="border-b-6 border-r-6 border-slate-200 rounded-[32px] bg-slate-50 p-5 flex flex-col gap-4 min-h-[300px] h-[340px] overflow-y-auto">
                    {chatMessages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex flex-col max-w-[80%] ${
                          m.role === "user" ? "self-end items-end" : "self-start items-start"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 px-1">
                          <span className="text-[10px] font-black text-slate-400 capitalize">{m.role === "user" ? "Me" : chatCharacter}</span>
                          <span className="text-[9px] text-slate-400">{m.timestamp}</span>
                        </div>
                        <div className={`p-4 rounded-[24px] text-[15px] leading-relaxed shadow-sm font-black border-b-4 border-r-4 ${
                          m.role === "user"
                            ? "bg-sky-500 border-sky-700 text-white rounded-tr-none"
                            : "bg-white border-slate-200 text-sky-950 rounded-tl-none relative"
                        }`}>
                          <p>{m.text}</p>
                          {m.role === "model" && (
                            <button
                              onClick={() => speakText(m.text, chatCharacter === "Ahmed" ? "Kore" : "Puck")}
                              className="absolute -right-2 -bottom-2 bg-indigo-50 border-2 border-indigo-200 hover:bg-indigo-150 text-indigo-700 rounded-full p-2 shadow-sm cursor-pointer"
                              title="Listen to response"
                            >
                              <Volume2 className="w-4 h-4 ml-0.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="self-start bg-white border-2 border-slate-200 p-4 rounded-2xl shadow-sm">
                        <span className="text-xs font-black text-slate-400 animate-pulse">{chatCharacter} is thinking... 💭</span>
                      </div>
                    )}
                    <div ref={chatBottomRef} />
                  </div>

                  {/* Simple Tap and Chat preset suggestions */}
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                      💡 Tap an expression to answer instantly:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => sendChatMessage("Hello! My name is Khalid, nice to meet you!")}
                        className="bg-white hover:bg-slate-50 border-b-4 border-r-4 border-slate-300 text-xs py-2.5 px-4 rounded-[20px] font-black uppercase tracking-wider text-slate-700 shadow-sm transition-transform active:scale-95 cursor-pointer"
                      >
                        👋 Khalid!
                      </button>
                      <button
                        onClick={() => sendChatMessage("How are you Badr?")}
                        className="bg-white hover:bg-slate-50 border-b-4 border-r-4 border-slate-300 text-xs py-2.5 px-4 rounded-[20px] font-black uppercase tracking-wider text-slate-700 shadow-sm transition-transform active:scale-95 cursor-pointer"
                      >
                        ❓ How are you?
                      </button>
                      <button
                        onClick={() => sendChatMessage("I am nine years old!")}
                        className="bg-white hover:bg-slate-50 border-b-4 border-r-4 border-slate-300 text-xs py-2.5 px-4 rounded-[20px] font-black uppercase tracking-wider text-slate-700 shadow-sm transition-transform active:scale-95 cursor-pointer"
                      >
                        🎂 Nine Years Old
                      </button>
                      <button
                        onClick={() => sendChatMessage("I live in Khartoum, Sudan.")}
                        className="bg-white hover:bg-slate-50 border-b-4 border-r-4 border-slate-300 text-xs py-2.5 px-4 rounded-[20px] font-black uppercase tracking-wider text-slate-700 shadow-sm transition-transform active:scale-95 cursor-pointer"
                      >
                        🌍 Khartoum Sudan
                      </button>
                    </div>
                  </div>

                  {/* Message Input container */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendChatMessage();
                    }}
                    className="flex gap-3 mt-1"
                  >
                    <input
                      type="text"
                      value={userChatInput}
                      onChange={(e) => setUserChatInput(e.target.value)}
                      placeholder="Write your friendly English text message..."
                      className="flex-1 px-4 py-3.5 rounded-[24px] border-b-4 border-r-4 border-slate-300 bg-white text-sm focus:outline-none focus:border-indigo-400 font-extrabold text-indigo-950 placeholder-slate-400"
                    />
                    <button
                      type="submit"
                      disabled={isChatLoading || !userChatInput.trim()}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-[24px] px-6 py-3.5 flex items-center justify-center font-black uppercase tracking-wider text-xs border-b-4 border-indigo-800 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      <span>Send</span>
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </main>
      </div>

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
