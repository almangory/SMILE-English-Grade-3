import { UnitItem } from "./types";

export const SMILE_UNITS: UnitItem[] = [
  {
    id: 1,
    title: "Welcome to English",
    arabicTitle: "مرحباً بكم في اللغة الإنجليزية",
    color: "bg-amber-400 text-amber-950 border-amber-600",
    icon: "✨",
    words: [
      { id: "w1-1", word: "Apple", arabic: "تفاحة", image: "🍎", example: "an apple", soundText: "The letter a says /æ/ like in apple", unit: 1 },
      { id: "w1-2", word: "Bag", arabic: "حقيبة", image: "🎒", example: "a bag", soundText: "The letter b says /b/ like in bag", unit: 1 },
      { id: "w1-3", word: "Cat", arabic: "قطة", image: "🐱", example: "a cat", soundText: "The letter c says /k/ like in cat", unit: 1 },
      { id: "w1-4", word: "Bed", arabic: "سرير", image: "🛏️", example: "a bed", soundText: "The letter b says /b/ like in bed", unit: 1 },
      { id: "w1-5", word: "Cap", arabic: "كاب / قبعة", image: "🧢", example: "a cap", soundText: "The letter c says /k/ like in cap", unit: 1 },
      { id: "w1-6", word: "Desk", arabic: "مكتب", image: "🪑", example: "a desk", soundText: "The letter d says /d/ like in desk", unit: 1 },
      { id: "w1-7", word: "Egg", arabic: "بيضة", image: "🥚", example: "an egg", soundText: "The letter e says /e/ like in egg", unit: 1 },
      { id: "w1-8", word: "Flag", arabic: "علم", image: "🇸🇩", example: "a flag", soundText: "The letter f says /f/ like in flag", unit: 1 },
      { id: "w1-9", word: "Gate", arabic: "بوابة", image: "🚪", example: "a gate", soundText: "The letter g says /g/ like in gate", unit: 1 },
    ],
    lessons: [
      {
        id: 1,
        title: "Hello & Goodbye!",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "Hi, I'm Badr.", voice: "Puck" },
            { speaker: "Ahmed", text: "Hello, I'm Ahmed.", voice: "Kore" },
            { speaker: "Cathy", text: "Goodbye, Mrs Hind.", voice: "Puck" },
            { speaker: "Mrs. Hind", text: "Goodbye!", voice: "Kore" },
          ],
        },
      },
      {
        id: 2,
        title: "The Alphabet Spell Chant!",
        type: "song",
        content: {
          songText: "a is in apple, b is in bed, c is in cat, d is in desk, e is in egg, f is in flag, g is in gate, h is in hat, i is in insect, j is in jam, k is in kick, l is in lamp!",
        },
      },
      {
        id: 3,
        title: "What's Your Name?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Cathy", text: "Hi, I'm Cathy.", voice: "Puck" },
            { speaker: "Fatma", text: "Hello, Cathy.", voice: "Kore" },
            { speaker: "Cathy", text: "What's your name?", voice: "Puck" },
            { speaker: "Fatma", text: "My name's Fatma.", voice: "Kore" },
          ],
        },
      },
      {
        id: 4,
        title: "This is Eddie!",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "Hello Mr Gamar. This is Eddie, Mr Gamar. He's English.", voice: "Kore" },
            { speaker: "Mr Gamar", text: "Hello, Eddie.", voice: "Zephyr" },
            { speaker: "Eddie", text: "Hello, Mr Gamar.", voice: "Puck" },
          ],
        },
      },
      {
        id: 5,
        title: "Are you Sudanese?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "Badr, this is Eddie.", voice: "Kore" },
            { speaker: "Badr", text: "Hello.", voice: "Puck" },
            { speaker: "Eddie", text: "Hello, Badr.", voice: "Puck" },
            { speaker: "Badr", text: "Are you Sudanese, Eddie?", voice: "Puck" },
            { speaker: "Eddie", text: "No, I'm not. I'm English.", voice: "Puck" },
          ],
        },
      },
      {
        id: 6,
        title: "Telephone Call",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Cathy", text: "Hello.", voice: "Puck" },
            { speaker: "Dalia", text: "Cathy! How are you?", voice: "Zephyr" },
            { speaker: "Cathy", text: "Hi, Dalia. This is Cathy. I'm fine, thanks.", voice: "Puck" },
          ],
        },
      },
      {
        id: 7,
        title: "Phonics Letters (a - l)",
        type: "phonics",
        content: {
          letters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"],
          games: [
            {
              question: "Complete the textbook vocabulary: 'b is in ...?'",
              answers: ["apple", "bed", "cat", "egg"],
              correctAnswer: "bed",
            },
            {
              question: "Who is English in our book?",
              answers: ["Ahmed", "Badr", "Eddie", "Fatma"],
              correctAnswer: "Eddie",
            },
          ],
        },
      },
    ],
  },
  {
    id: 2,
    title: "Numbers & Time",
    arabicTitle: "الأرقام والوقت",
    color: "bg-sky-400 text-sky-950 border-sky-600",
    icon: "🔢",
    words: [
      { id: "w2-1", word: "Frog", arabic: "ضفدع", image: "🐸", example: "How many frogs?", soundText: "How many frogs are there?", unit: 2 },
      { id: "w2-2", word: "Clock", arabic: "ساعة حائط", image: "⏰", example: "Nine o'clock", soundText: "What's the time? It's nine o'clock", unit: 2 },
      { id: "w2-3", word: "Monkey", arabic: "قرد", image: "🐒", example: "Hello monkeys!", soundText: "Hello monkeys! Hi Ali!", unit: 2 },
      { id: "w2-4", word: "Sun", arabic: "شمس", image: "☀️", example: "Yellow sun", soundText: "The yellow sun rises in Sudan", unit: 2 },
      { id: "w2-5", word: "Rabbit", arabic: "أرنب", image: "🐇", example: "r is in rabbit", soundText: "r is in rabbit", unit: 2 },
      { id: "w2-6", word: "Van", arabic: "سيارة نقل", image: "🚐", example: "v is in van", soundText: "v is in van", unit: 2 },
    ],
    lessons: [
      {
        id: 1,
        title: "Little Crocodiles Chant!",
        type: "song",
        content: {
          songText: "1 little, 2 little, 3 little crocodiles! 4 little, 5 little, 6 little crocodiles! 7 little, 8 little, 9 little crocodiles! 10 little crocodiles!",
        },
      },
      {
        id: 2,
        title: "How Old Are You?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "How old are you, Cathy?", voice: "Kore" },
            { speaker: "Cathy", text: "I'm 9.", voice: "Puck" },
            { speaker: "Fatma", text: "How old are you, Ahmed?", voice: "Kore" },
            { speaker: "Ahmed", text: "I'm 8.", voice: "Kore" },
          ],
        },
      },
      {
        id: 3,
        title: "How Many Frogs?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Teacher", text: "How many frogs are there?", voice: "Kore" },
            { speaker: "Ahmed", text: "3!", voice: "Kore" },
            { speaker: "Badr", text: "How many cats are there?", voice: "Puck" },
            { speaker: "Ahmed", text: "There are ten.", voice: "Kore" },
          ],
        },
      },
      {
        id: 4,
        title: "Little Ali is Lost",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ali", text: "Hello! This is Little Ali.", voice: "Puck" },
            { speaker: "Ali", text: "Hello, monkeys!", voice: "Puck" },
            { speaker: "Monkeys", text: "Hi, Ali!", voice: "Kore" },
            { speaker: "Ali", text: "I'm lost!", voice: "Puck" },
          ],
        },
      },
      {
        id: 5,
        title: "Finding the House",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ali", text: "Where is my house, frogs?", voice: "Puck" },
            { speaker: "Frogs", text: "This way, Ali!", voice: "Kore" },
            { speaker: "Ali", text: "Hello, mum!", voice: "Puck" },
            { speaker: "Mum", text: "Hello, Ali!", voice: "Kore" },
          ],
        },
      },
      {
        id: 6,
        title: "What's the Time?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "What's the time?", voice: "Puck" },
            { speaker: "Ahmed", text: "It's 9 o'clock.", voice: "Kore" },
          ],
        },
      },
      {
        id: 7,
        title: "Phonics Letters (m - z)",
        type: "phonics",
        content: {
          letters: ["m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
          games: [
            {
              question: "Where does Little Ali say he is?",
              answers: ["At school", "Lost!", "In London", "Sleeping"],
              correctAnswer: "Lost!",
            },
            {
              question: "What did the frogs tell Ali when he asked 'Where is my house'?",
              answers: ["No!", "This way, Ali!", "Goodbye", "It's 9 o'clock"],
              correctAnswer: "This way, Ali!",
            },
          ],
        },
      },
    ],
  },
  {
    id: 3,
    title: "Beautiful Colours",
    arabicTitle: "الألوان الجميلة",
    color: "bg-emerald-400 text-emerald-950 border-emerald-600",
    icon: "🎨",
    words: [
      { id: "w3-1", word: "Red", arabic: "أحمر", image: "🔴", example: "It is red", soundText: "It is red", unit: 3 },
      { id: "w3-2", word: "Yellow", arabic: "أصفر", image: "🟡", example: "A yellow sun", soundText: "A yellow sun", unit: 3 },
      { id: "w3-3", word: "Green", arabic: "أخضر", image: "🟢", example: "A green flag", soundText: "A green flag", unit: 3 },
      { id: "w3-4", word: "Blue", arabic: "أزرق", image: "🔵", example: "A blue bag", soundText: "A blue bag", unit: 3 },
      { id: "w3-5", word: "Black", arabic: "أسود", image: "⚫", example: "Black eyes", soundText: "Black eyes", unit: 3 },
      { id: "w3-6", word: "White", arabic: "أبيض", image: "⚪", example: "White clouds", soundText: "White clouds", unit: 3 },
      { id: "w3-7", word: "Brown", arabic: "بني", image: "🟫", example: "Brown hair", soundText: "Brown hair", unit: 3 },
    ],
    lessons: [
      {
        id: 1,
        title: "Point to the Colors Chant!",
        type: "song",
        content: {
          songText: "Point to yellow, point to red! Point to black and point to your head! Point to green, point to blue, point to white and point to you!",
        },
      },
      {
        id: 2,
        title: "Stop, Wait, Go!",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Policeman", text: "Stop!", voice: "Charon" },
            { speaker: "Policeman", text: "The yellow light is WAIT.", voice: "Charon" },
            { speaker: "Policeman", text: "The red light is STOP.", voice: "Charon" },
            { speaker: "Policeman", text: "The green light is GO! Go, go, go!", voice: "Charon" },
          ],
        },
      },
      {
        id: 3,
        title: "The Sudanese Flag!",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "This is the Sudanese flag. It's our flag.", voice: "Kore" },
            { speaker: "Cathy", text: "How many colours are there?", voice: "Puck" },
            { speaker: "Ahmed", text: "4! Green, red, white and black.", voice: "Kore" },
          ],
        },
      },
      {
        id: 4,
        title: "Amna's Lost Son",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Amna", text: "Hello, I'm Amna. My son is lost! He's 5.", voice: "Puck" },
            { speaker: "Policeman", text: "What's his name?", voice: "Charon" },
            { speaker: "Amna", text: "Ali.", voice: "Puck" },
            { speaker: "Policeman", text: "What colour are his eyes?", voice: "Charon" },
            { speaker: "Amna", text: "Black.", voice: "Puck" },
            { speaker: "Policeman", text: "What colour is his hair?", voice: "Charon" },
            { speaker: "Amna", text: "Brown.", voice: "Puck" },
          ],
        },
      },
      {
        id: 5,
        title: "In the Painting Room",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "Look at my picture! It's a red car.", voice: "Puck" },
            { speaker: "Eddie", text: "My picture is a green frog.", voice: "Puck" },
            { speaker: "Cathy", text: "My picture is a blue bag.", voice: "Puck" },
          ],
        },
      },
      {
        id: 6,
        title: "Colour Spell Game",
        type: "phonics",
        content: {
          letters: ["r", "e", "d", "b", "l", "u", "e", "g", "r", "e", "e", "n"],
          games: [
            {
              question: "How many colors are there in the Sudanese flag?",
              answers: ["2", "3", "4", "5"],
              correctAnswer: "4",
            },
            {
              question: "What color is Amna's son Ali's hair?",
              answers: ["Red", "Yellow", "Brown", "Black"],
              correctAnswer: "Brown",
            },
          ],
        },
      },
    ],
  },
];

