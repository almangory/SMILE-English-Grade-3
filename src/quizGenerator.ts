import { SMILE_UNITS } from "./smileData";
import { UnitItem, Lesson, WordItem } from "./types";

export interface ConfiguredQuestion {
  question: string;
  answers: string[];
  correctAnswer: string;
  unitId: number;
  lessonId: number | null; // null means it's a general unit question
  type: "trivia" | "vocabulary" | "spelling" | "phonics";
}

// Handcrafted rich textbook trivia database strictly based on the Sudanese SMILE textbook and student story content
const HANDCRAFTED_TRIVIA: ConfiguredQuestion[] = [
  // --- UNIT 1 ---
  {
    question: "In Unit 1, Ahmed introduces himself saying:",
    answers: ["Hello, I'm Ahmed.", "Hi, I'm Badr.", "Goodbye!", "This is Cathy."],
    correctAnswer: "Hello, I'm Ahmed.",
    unitId: 1,
    lessonId: 1,
    type: "trivia"
  },
  {
    question: "When saying goodbye to Mrs Hind, Cathy says:",
    answers: ["Goodbye, Mrs Hind.", "What's your name?", "He's English.", "b is in bed."],
    correctAnswer: "Goodbye, Mrs Hind.",
    unitId: 1,
    lessonId: 1,
    type: "trivia"
  },
  {
    question: "Complete the textbook dialogue question: 'What's your ...?'",
    answers: ["name?", "color?", "clock?", "bed?"],
    correctAnswer: "name?",
    unitId: 1,
    lessonId: 3,
    type: "trivia"
  },
  {
    question: "Who is English in our SMILE school textbook?",
    answers: ["Eddie", "Ahmed", "Badr", "Fatma"],
    correctAnswer: "Eddie",
    unitId: 1,
    lessonId: 4,
    type: "trivia"
  },
  {
    question: "Complete the spelling chant: 'a is in apple, b is in ...'",
    answers: ["bed", "cat", "egg", "gate"],
    correctAnswer: "bed",
    unitId: 1,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "What does the letter 'c' say in phonics for 'Cap' or 'Cat'?",
    answers: ["/k/ phoneme", "/s/ phoneme", "/p/ phoneme", "/f/ phoneme"],
    correctAnswer: "/k/ phoneme",
    unitId: 1,
    lessonId: 5,
    type: "phonics"
  },

  // --- UNIT 2 ---
  {
    question: "How old is Cathy in Unit 2?",
    answers: ["I'm 9.", "I'm 8.", "I'm 10.", "I'm 5."],
    correctAnswer: "I'm 9.",
    unitId: 2,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "How old is Ahmed in Unit 2?",
    answers: ["I'm 8.", "I'm 9.", "I'm 10.", "I'm 7."],
    correctAnswer: "I'm 8.",
    unitId: 2,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "How many crocodiles are chanting in the numbers song?",
    answers: ["10 crocodiles", "3 crocodiles", "5 crocodiles", "9 crocodiles"],
    correctAnswer: "10 crocodiles",
    unitId: 2,
    lessonId: 1,
    type: "trivia"
  },
  {
    question: "What happened to Little Ali in Unit 2 when he met the monkeys?",
    answers: ["He is lost!", "He is sleeping.", "He is eating an apple.", "He is playing football."],
    correctAnswer: "He is lost!",
    unitId: 2,
    lessonId: 4,
    type: "trivia"
  },
  {
    question: "When the teacher asks: 'How many frogs are there?', Ahmed answers:",
    answers: ["3!", "10!", "5!", "There are none."],
    correctAnswer: "3!",
    unitId: 2,
    lessonId: 3,
    type: "trivia"
  },

  // --- UNIT 3 ---
  {
    question: "In the colors light game, the Yellow light commands you to:",
    answers: ["WAIT", "STOP", "GO!", "RUN"],
    correctAnswer: "WAIT",
    unitId: 3,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "In the colors light game, the Red light commands you to:",
    answers: ["STOP", "GO!", "WAIT", "DANCE"],
    correctAnswer: "STOP",
    unitId: 3,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "In the traffic light game, the Green light commands you to:",
    answers: ["GO!", "STOP", "WAIT", "SIT DOWN"],
    correctAnswer: "GO!",
    unitId: 3,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "How many colors are in the Sudanese national flag?",
    answers: ["4 colors", "3 colors", "5 colors", "2 colors"],
    correctAnswer: "4 colors",
    unitId: 3,
    lessonId: 3,
    type: "trivia"
  },
  {
    question: "Which of the following colors is NOT in our Sudanese flag?",
    answers: ["Blue", "Green", "Red", "Black"],
    correctAnswer: "Blue",
    unitId: 3,
    lessonId: 3,
    type: "trivia"
  },
  {
    question: "Complete: 'Point to yellow, point to red! Point to black and point to your ...'",
    answers: ["head!", "tail!", "fridge!", "desk!"],
    correctAnswer: "head!",
    unitId: 3,
    lessonId: 1,
    type: "trivia"
  },
  {
    question: "Amna's lost son Ali has got what color eyes?",
    answers: ["Black", "Brown", "Blue", "Green"],
    correctAnswer: "Black",
    unitId: 3,
    lessonId: 4,
    type: "trivia"
  },
  {
    question: "Amna says her lost son Ali has got what color hair?",
    answers: ["Brown", "Black", "Yellow", "White"],
    correctAnswer: "Brown",
    unitId: 3,
    lessonId: 4,
    type: "trivia"
  },

  // --- UNIT 4 ---
  {
    question: "In the body poem, how many toes has the reader got?",
    answers: ["ten toes", "two toes", "five toes", "no toes"],
    correctAnswer: "ten toes",
    unitId: 4,
    lessonId: 1,
    type: "trivia"
  },
  {
    question: "Which boy is with Ahmed and has got an apple and a book?",
    answers: ["Hamad", "Badr", "Adil", "Eddie"],
    correctAnswer: "Hamad",
    unitId: 4,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "What color is Hiba's school bag that she got with Fatma?",
    answers: ["green bag", "blue bag", "red bag", "black bag"],
    correctAnswer: "green bag",
    unitId: 4,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "Who is Gonfooth?",
    answers: ["A hedgehog", "A sweet baby chick", "A little monkey", "A big friendly cow"],
    correctAnswer: "A hedgehog",
    unitId: 4,
    lessonId: 3,
    type: "trivia"
  },
  {
    question: "Gonfooth tells Mrs Hen that she has got a:",
    answers: ["big white body", "small pink body", "long cute tail", "green bag"],
    correctAnswer: "big white body",
    unitId: 4,
    lessonId: 3,
    type: "trivia"
  },

  // --- UNIT 5 ---
  {
    question: "In the school song, complete: 'Point to the window. Point to the ...'",
    answers: ["door.", "lemon.", "bedroom.", "crocodile."],
    correctAnswer: "door.",
    unitId: 5,
    lessonId: 1,
    type: "trivia"
  },
  {
    question: "Where did Reem's mother find Reem's lost toy?",
    answers: ["In her bag", "Under her bed", "In the library", "On the desk"],
    correctAnswer: "In her bag",
    unitId: 5,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "In Sukkar the monkey's tail game, where is his tail hidden?",
    answers: ["Under his body", "Under his chair", "In the school book", "On the fridge"],
    correctAnswer: "Under his body",
    unitId: 5,
    lessonId: 3,
    type: "trivia"
  },

  // --- UNIT 6 ---
  {
    question: "Complete the poem line: 'I'm a cat. I live in a ...'",
    answers: ["flat.", "house.", "tree.", "sea."],
    correctAnswer: "flat.",
    unitId: 6,
    lessonId: 1,
    type: "trivia"
  },
  {
    question: "Complete the poem line: 'I'm a mouse. I live in a ...'",
    answers: ["house.", "flat.", "tree.", "sea."],
    correctAnswer: "house.",
    unitId: 6,
    lessonId: 1,
    type: "trivia"
  },
  {
    question: "Complete the poem line: 'I'm a fish. I live in the ...'",
    answers: ["sea!", "tree!", "house!", "flat!"],
    correctAnswer: "sea!",
    unitId: 6,
    lessonId: 1,
    type: "trivia"
  },
  {
    question: "Where is the local library in Nile Road located next to?",
    answers: ["the market", "the school", "the museum", "the fridge"],
    correctAnswer: "the market",
    unitId: 6,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "What does the rabbit want to grow seeds and plant trees for?",
    answers: ["our children and their children", "selling fruits", "building desks", "running games"],
    correctAnswer: "our children and their children",
    unitId: 6,
    lessonId: 3,
    type: "trivia"
  },

  // --- UNIT 7 ---
  {
    question: "Adil and his brother wake up at what time in their family schedule?",
    answers: ["6 o'clock", "7 o'clock", "10 o'clock", "9 o'clock"],
    correctAnswer: "6 o'clock",
    unitId: 7,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "What time do Adil and his brother eat their school breakfast?",
    answers: ["10 o'clock", "6 o'clock", "7 o'clock", "9 o'clock"],
    correctAnswer: "10 o'clock",
    unitId: 7,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "In the 'Not Now, Chick!' story, what animal says: 'We eat now'?",
    answers: ["Donkey", "Cow", "Baby Chick", "Frog"],
    correctAnswer: "Donkey",
    unitId: 7,
    lessonId: 3,
    type: "trivia"
  },

  // --- UNIT 8 ---
  {
    question: "Ahmed says: 'I like the sun and the ...'",
    answers: ["beach.", "tea.", "sea.", "ice cream."],
    correctAnswer: "beach.",
    unitId: 8,
    lessonId: 3,
    type: "trivia"
  },
  {
    question: "Adil says: 'I like the sand and I like the ...'",
    answers: ["sea.", "tea.", "beach.", "fish."],
    correctAnswer: "sea.",
    unitId: 8,
    lessonId: 3,
    type: "trivia"
  },
  {
    question: "Eddie is English and says he likes ice cream and:",
    answers: ["tea.", "sweet mangoes.", "fish.", "crispy bread."],
    correctAnswer: "tea.",
    unitId: 8,
    lessonId: 3,
    type: "trivia"
  },
  {
    question: "What does Badr disklike eating?",
    answers: ["fish!", "ice cream!", "mango!", "bread!"],
    correctAnswer: "fish!",
    unitId: 8,
    lessonId: 3,
    type: "trivia"
  },

  // --- UNIT 9 ---
  {
    question: "According to Nile animals lesson, how long is a Nile crocodile?",
    answers: ["five metres long", "four metres long", "one metre long", "ten metres long"],
    correctAnswer: "five metres long",
    unitId: 9,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "How long are native Nile hippos in the textbook facts?",
    answers: ["four metres long", "five metres long", "one metre long", "two metres long"],
    correctAnswer: "four metres long",
    unitId: 9,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "Why does the Snake say he cannot be Waheed the Camel's friend?",
    answers: ["Camels can stand on me.", "Camels are too small.", "I don't like camels.", "Camels live in forests."],
    correctAnswer: "Camels can stand on me.",
    unitId: 9,
    lessonId: 3,
    type: "trivia"
  },

  // --- UNIT 10 ---
  {
    question: "In the blindfold game, what fruit does Ahmed guess is long and yellow?",
    answers: ["banana", "mango", "lemon", "melon"],
    correctAnswer: "banana",
    unitId: 10,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "What is Cathy's favourite Sudanese breakfast that Dalia serves?",
    answers: ["eggs, bread, foul and ta'miya", "sweet mangoes and milk", "rice and chicken", "biscuits and red tea"],
    correctAnswer: "eggs, bread, foul and ta'miya",
    unitId: 10,
    lessonId: 3,
    type: "trivia"
  },

  // --- UNIT 11 ---
  {
    question: "In Unit 11, where is the museum located?",
    answers: ["In Nile Street, near the school.", "Next to the market.", "Under the tall tree.", "In the municipal park."],
    correctAnswer: "In Nile Street, near the school.",
    unitId: 11,
    lessonId: 1,
    type: "trivia"
  },
  {
    question: "What are children told NOT to do with paper in their classroom?",
    answers: ["Don't drop rubbish. Put it in the bin.", "Don't write names.", "Don't turn off lights.", "Don't use pencils."],
    correctAnswer: "Don't drop rubbish. Put it in the bin.",
    unitId: 11,
    lessonId: 3,
    type: "trivia"
  },

  // --- UNIT 12 ---
  {
    question: "Rayan says she has got what new clothing for the Eid holidays?",
    answers: ["a new dress", "a new skirt", "a new hat", "shorts and trousers"],
    correctAnswer: "a new dress",
    unitId: 12,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "What new Eid clothing has Adam got from his grandmother for the holidays?",
    answers: ["a new jalabeya", "shorts and blue trousers", "a red T-shirt", "an orange cap"],
    correctAnswer: "a new jalabeya",
    unitId: 12,
    lessonId: 2,
    type: "trivia"
  }
];

/**
 * Generates a randomized, highly robust array of questions based on selected parameters.
 * Automatically guarantees up to 30 unique questions by dynamically manufacturing letters,
 * spelling, and matching questions from the standard words list if handcrafted trivias are exhausted.
 */
export function generateQuiz(
  scope: "all" | "unit" | "lesson",
  targetUnitId: number,
  targetLessonId: number,
  limit: number
): { question: string; answers: string[]; correctAnswer: string; badge: string }[] {
  
  let pool: ConfiguredQuestion[] = [];

  // 1. FILTER BY SCOPE
  if (scope === "all") {
    pool = [...HANDCRAFTED_TRIVIA];
  } else if (scope === "unit") {
    pool = HANDCRAFTED_TRIVIA.filter((t) => t.unitId === targetUnitId);
  } else if (scope === "lesson") {
    pool = HANDCRAFTED_TRIVIA.filter(
      (t) => t.unitId === targetUnitId && t.lessonId === targetLessonId
    );
  }

  // Convert structured configured questions to active array
  const finalQuestions: { question: string; answers: string[]; correctAnswer: string; badge: string }[] = pool.map((item) => ({
    question: item.question,
    answers: item.answers,
    correctAnswer: item.correctAnswer,
    badge: `UNIT ${item.unitId} • LESSON ${item.lessonId || "Book"}`
  }));

  // 2. BACKUP CONSTRUCTORS (to fulfill up to 30 questions) - generate dynamic questions if pool is smaller than limit
  const activeUnitIds = scope === "all" 
    ? SMILE_UNITS.map(u => u.id) 
    : [targetUnitId];

  // Fetch words that fall into our scope
  const targetWords = SMILE_UNITS
    .filter(u => activeUnitIds.includes(u.id))
    .flatMap(u => u.words);

  // Dynamic Generator Type A: Image emoji matching
  targetWords.forEach((wordObj) => {
    if (finalQuestions.length >= 60) return; // Cap at a high margin to shuffle later
    
    // Choose distractor words
    const allDistractors = targetWords
      .filter((w) => w.word !== wordObj.word)
      .map((w) => w.word);
    
    const uniqueDistractors = Array.from(new Set(allDistractors));
    const randomDistractors = uniqueDistractors.sort(() => Math.random() - 0.5).slice(0, 3);
    
    const answers = [wordObj.word, ...randomDistractors].sort(() => Math.random() - 0.5);

    if (answers.length === 4) {
      finalQuestions.push({
        question: `Which English word matches the picture: ${wordObj.image}?`,
        answers,
        correctAnswer: wordObj.word,
        badge: `VOCAB • UNIT ${wordObj.unit}`
      });
    }
  });

  // Dynamic Generator Type B: First letter spelling match
  targetWords.forEach((wordObj) => {
    if (finalQuestions.length >= 100) return;

    const firstLetter = wordObj.word.charAt(0).toUpperCase();
    const otherWordsWithDifferentStarts = targetWords
      .filter((w) => w.word.charAt(0).toUpperCase() !== firstLetter)
      .map((w) => w.word);

    const uniqueOthers = Array.from(new Set(otherWordsWithDifferentStarts));
    const randomOthers = uniqueOthers.sort(() => Math.random() - 0.5).slice(0, 3);

    const answers = [wordObj.word, ...randomOthers].sort(() => Math.random() - 0.5);

    if (answers.length === 4) {
      finalQuestions.push({
        question: `Find the word that starts with the letter '${firstLetter}' sound (hint: ${wordObj.image}):`,
        answers,
        correctAnswer: wordObj.word,
        badge: `PHONICS • UNIT ${wordObj.unit}`
      });
    }
  });

  // Dynamic Generator Type C: Example sentence matching
  targetWords.forEach((wordObj) => {
    if (finalQuestions.length >= 140) return;

    // Convert e.g., "an apple" -> "an ___" or similar, or match example directly
    const sentenceHint = wordObj.example;
    const allOtherExamples = targetWords
      .filter((w) => w.word !== wordObj.word)
      .map((w) => w.word);

    const uniqueOthers = Array.from(new Set(allOtherExamples));
    const randomOthers = uniqueOthers.sort(() => Math.random() - 0.5).slice(0, 3);

    const answers = [wordObj.word, ...randomOthers].sort(() => Math.random() - 0.5);

    if (answers.length === 4) {
      finalQuestions.push({
        question: `Which textbook item goes with the book detail: "${sentenceHint}"?`,
        answers,
        correctAnswer: wordObj.word,
        badge: `EXAMPLE • UNIT ${wordObj.unit}`
      });
    }
  });

  // Shuffle the questions pool and slice to the custom requested limit (up to 30)
  const randomizedSubset = finalQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(limit, 30));

  return randomizedSubset;
}
