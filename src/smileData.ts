import { UnitItem } from "./types";

export const SMILE_UNITS: UnitItem[] = [
  {
    id: 1,
    title: "Welcome to English",
    arabicTitle: "",
    color: "bg-amber-400 text-amber-950 border-amber-600",
    icon: "✨",
    words: [
      { id: "w1-1", word: "Apple", arabic: "", image: "🍎", example: "an apple", soundText: "The letter a says /æ/ like in apple", unit: 1 },
      { id: "w1-2", word: "Bag", arabic: "", image: "🎒", example: "a bag", soundText: "The letter b says /b/ like in bag", unit: 1 },
      { id: "w1-3", word: "Cat", arabic: "", image: "🐱", example: "a cat", soundText: "The letter c says /k/ like in cat", unit: 1 },
      { id: "w1-4", word: "Bed", arabic: "", image: "🛏️", example: "a bed", soundText: "The letter b says /b/ like in bed", unit: 1 },
      { id: "w1-5", word: "Cap", arabic: "", image: "🧢", example: "a cap", soundText: "The letter c says /k/ like in cap", unit: 1 },
      { id: "w1-6", word: "Desk", arabic: "", image: "🪑", example: "a desk", soundText: "The letter d says /d/ like in desk", unit: 1 },
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
          songText: "a is in apple, b is in bed, c is in cat, d is in desk, e is in egg, f is in flag, g is in gate, h is in hat!",
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
    title: "Numbers",
    arabicTitle: "",
    color: "bg-sky-400 text-sky-950 border-sky-600",
    icon: "🔢",
    words: [
      { id: "w2-1", word: "Frog", arabic: "", image: "🐸", example: "How many frogs?", soundText: "How many frogs are there?", unit: 2 },
      { id: "w2-2", word: "Clock", arabic: "", image: "⏰", example: "Nine o'clock", soundText: "What's the time? It's nine o'clock", unit: 2 },
      { id: "w2-3", word: "Monkey", arabic: "", image: "🐒", example: "Hello monkeys!", soundText: "Hello monkeys! Hi Ali!", unit: 2 },
      { id: "w2-4", word: "Sun", arabic: "", image: "☀️", example: "Yellow sun", soundText: "The yellow sun rises in Sudan", unit: 2 },
      { id: "w2-5", word: "Rabbit", arabic: "", image: "🐇", example: "r is in rabbit", soundText: "r is in rabbit", unit: 2 },
      { id: "w2-6", word: "Van", arabic: "", image: "🚐", example: "v is in van", soundText: "v is in van", unit: 2 },
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
          ],
        },
      },
    ],
  },
  {
    id: 3,
    title: "Colours",
    arabicTitle: "",
    color: "bg-emerald-400 text-emerald-950 border-emerald-600",
    icon: "🎨",
    words: [
      { id: "w3-1", word: "Red", arabic: "", image: "🔴", example: "It is red", soundText: "It is red", unit: 3 },
      { id: "w3-2", word: "Yellow", arabic: "", image: "🟡", example: "A yellow sun", soundText: "A yellow sun", unit: 3 },
      { id: "w3-3", word: "Green", arabic: "", image: "🟢", example: "A green flag", soundText: "A green flag", unit: 3 },
      { id: "w3-4", word: "Blue", arabic: "", image: "🔵", example: "A blue bag", soundText: "A blue bag", unit: 3 },
      { id: "w3-5", word: "Black", arabic: "", image: "⚫", example: "Black eyes", soundText: "Black eyes", unit: 3 },
      { id: "w3-6", word: "White", arabic: "", image: "⚪", example: "White clouds", soundText: "White clouds", unit: 3 },
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
            { speaker: "Policeman", text: "STOP!", voice: "Charon" },
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
    ],
  },
  {
    id: 4,
    title: "About Me",
    arabicTitle: "",
    color: "bg-indigo-400 text-indigo-950 border-indigo-600",
    icon: "👦",
    words: [
      { id: "w4-1", word: "Lemon", arabic: "", image: "🍋", example: "I have got a yellow lemon", soundText: "I've got a yellow lemon", unit: 4 },
      { id: "w4-2", word: "Melon", arabic: "", image: "🍈", example: "My melon is green", soundText: "My melon is green", unit: 4 },
      { id: "w4-3", word: "Head", arabic: "", image: "👤", example: "I've got a body and a head", soundText: "I've got a body and a head", unit: 4 },
      { id: "w4-4", word: "Nose", arabic: "", image: "👃", example: "This is my nose", soundText: "This is my nose", unit: 4 },
      { id: "w4-5", word: "Arms", arabic: "", image: "💪", example: "I've got two arms", soundText: "I've got two arms", unit: 4 },
      { id: "w4-6", word: "Legs", arabic: "", image: "🦵", example: "I've got two legs", soundText: "I've got two legs", unit: 4 },
    ],
    lessons: [
      {
        id: 1,
        title: "I've Got a Body Poem!",
        type: "song",
        content: {
          songText: "I've got a body, a neck and a head. I've got two arms, I've got two legs. I've got feet, hands, a mouth, and a nose. I've got ears, eyes, and ten toes!",
        },
      },
      {
        id: 2,
        title: "Hamad and Hiba",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "Who's that boy with Ahmed?", voice: "Puck" },
            { speaker: "Ahmed", text: "He's got an apple and a book. His name is Hamad.", voice: "Kore" },
            { speaker: "Dalia", text: "Who's that girl with Fatma?", voice: "Zephyr" },
            { speaker: "Fatma", text: "She's got a green bag and a blue book. Her name is Hiba.", voice: "Kore" },
          ],
        },
      },
      {
        id: 3,
        title: "The Hedgehog Story",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Gonfooth", text: "Hello! I'm Gonfooth. I'm a hedgehog. I've got a small body.", voice: "Puck" },
            { speaker: "Mrs Hen", text: "Hello, Gonfooth.", voice: "Zephyr" },
            { speaker: "Gonfooth", text: "You've got a big white body, Mrs Hen.", voice: "Puck" },
            { speaker: "Mrs. Hen", text: "Yes, I have!", voice: "Zephyr" },
          ],
        },
      },
    ],
  },
  {
    id: 5,
    title: "My School",
    arabicTitle: "",
    color: "bg-teal-400 text-teal-950 border-teal-600",
    icon: "🏫",
    words: [
      { id: "w5-1", word: "Desk", arabic: "", image: "🪑", example: "Point to the desk", soundText: "Point to the desk", unit: 5 },
      { id: "w5-2", word: "Ruler", arabic: "", image: "📏", example: "Where is the ruler?", soundText: "Where is the ruler?", unit: 5 },
      { id: "w5-3", word: "Classroom", arabic: "", image: "🏫", example: "It is in the classroom", soundText: "It is in the classroom", unit: 5 },
      { id: "w5-4", word: "Library", arabic: "", image: "📚", example: "It isn't in the library", soundText: "It isn't in the library", unit: 5 },
      { id: "w5-5", word: "Tail", arabic: "", image: "🐒", example: "Where is my tail?", soundText: "Where is my tail?", unit: 5 },
    ],
    lessons: [
      {
        id: 1,
        title: "Point to the Room",
        type: "song",
        content: {
          songText: "Point to the window. Point to the door. Point to the board and point to the floor! Point to the teacher, point to the man!",
        },
      },
      {
        id: 2,
        title: "Where is My Toy?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Reem", text: "Where is my toy?", voice: "Puck" },
            { speaker: "Reem", text: "It isn't under my bed. It isn't in the library.", voice: "Puck" },
            { speaker: "Reem's Mum", text: "Your toy is here! It's in your bag.", voice: "Kore" },
            { speaker: "Reem", text: "Oh, thank you mum!", voice: "Puck" },
          ],
        },
      },
      {
        id: 3,
        title: "Sukkar's Tail Game",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Sukkar", text: "Where is my tail?", voice: "Puck" },
            { speaker: "Second Monkey", text: "Is it under your chair?", voice: "Kore" },
            { speaker: "Sukkar", text: "No, it isn't.", voice: "Puck" },
            { speaker: "Second Monkey", text: "Look, Sukkar! Your text is there. It's under your body!", voice: "Kore" },
          ],
        },
      },
    ],
  },
  {
    id: 6,
    title: "Home",
    arabicTitle: "",
    color: "bg-pink-400 text-pink-950 border-pink-600",
    icon: "🏠",
    words: [
      { id: "w6-1", word: "Bedroom", arabic: "", image: "🛌", example: "Put the bed in the bedroom", soundText: "Put the bed in the bedroom", unit: 6 },
      { id: "w6-2", word: "Kitchen", arabic: "", image: "🍳", example: "My mother is in the kitchen", soundText: "My mother is in the kitchen", unit: 6 },
      { id: "w6-3", word: "Bathroom", arabic: "", image: "🛀", example: "This is the bathroom", soundText: "This is the bathroom", unit: 6 },
      { id: "w6-4", word: "Living Room", arabic: "", image: "📺", example: "The TV is in the living room", soundText: "The TV is in the living room", unit: 6 },
      { id: "w6-5", word: "Fridge", arabic: "", image: "🧊", example: "The food is in the fridge", soundText: "The food is in the fridge", unit: 6 },
    ],
    lessons: [
      {
        id: 1,
        title: "Who Lives Here?",
        type: "song",
        content: {
          songText: "I'm a cat. I live in a flat. I'm a mouse. I live in a house. I'm a bird. I live in a tree. I'm a fish. I live in the sea!",
        },
      },
      {
        id: 2,
        title: "Finding the Library",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Cathy", text: "Where is the library?", voice: "Puck" },
            { speaker: "Fatma", text: "It's in Nile Road. It's next to the market.", voice: "Kore" },
          ],
        },
      },
      {
        id: 3,
        title: "Plant the Seeds",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Monkey", text: "Look at the seeds!", voice: "Puck" },
            { speaker: "Mouse", text: "Plant the seeds and grow new trees.", voice: "Zephyr" },
            { speaker: "Rabbit", text: "Yes, grow them for our children... and for our children's children.", voice: "Puck" },
          ],
        },
      },
    ],
  },
  {
    id: 7,
    title: "My Family",
    arabicTitle: "",
    color: "bg-orange-400 text-orange-950 border-orange-600",
    icon: "👨‍👩‍👧‍👦",
    words: [
      { id: "w7-1", word: "Father", arabic: "", image: "👨", example: "This is my father", soundText: "This is my father", unit: 7 },
      { id: "w7-2", word: "Mother", arabic: "", image: "👩", example: "This is my mother", soundText: "This is my mother", unit: 7 },
      { id: "w7-3", word: "Brother", arabic: "", image: "👦", example: "This is my brother", soundText: "This is my brother", unit: 7 },
      { id: "w7-4", word: "Sister", arabic: "", image: "👧", example: "This is my sister", soundText: "This is my sister", unit: 7 },
      { id: "w7-5", word: "Grandmother", arabic: "", image: "👵", example: "This is my grandmother", soundText: "This is my grandmother", unit: 7 },
    ],
    lessons: [
      {
        id: 1,
        title: "My Family Members",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "This is me. I'm with my sister.", voice: "Puck" },
            { speaker: "Adil", text: "This is me and this is my brother.", voice: "Kore" },
            { speaker: "Ahmed", text: "This is me. I'm with my father.", voice: "Puck" },
            { speaker: "Fatma", text: "This is me and this is my mother.", voice: "Kore" },
          ],
        },
      },
      {
        id: 2,
        title: "Adil's Day Schedule",
        type: "song",
        content: {
          songText: "My brother and I wake up at 6 o'clock! We go to school at 7 o'clock! We eat breakfast at 10 o'clock! We go to bed at 9 o'clock!",
        },
      },
      {
        id: 3,
        title: "Not Now, Chick!",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Baby Chick", text: "Chick! Chick!", voice: "Puck" },
            { speaker: "Cow", text: "Not now, Chick.", voice: "Kore" },
            { speaker: "Donkey", text: "Not now, Chick. We eat now.", voice: "Zephyr" },
            { speaker: "Cow", text: "Yes Chick, now. We wake up now. It's 6 o'clock!", voice: "Kore" },
          ],
        },
      },
    ],
  },
  {
    id: 8,
    title: "Toys and Games",
    arabicTitle: "",
    color: "bg-purple-400 text-purple-950 border-purple-600",
    icon: "⚽",
    words: [
      { id: "w8-1", word: "Book", arabic: "", image: "📖", example: "I can see a book", soundText: "I can see a book", unit: 8 },
      { id: "w8-2", word: "Ball", arabic: "", image: "⚽", example: "Don't kick it", soundText: "Don't kick the ball", unit: 8 },
      { id: "w8-3", word: "Tree", arabic: "", image: "🌳", example: "Two little birds in the tree", soundText: "Two little birds in the tree", unit: 8 },
      { id: "w8-4", word: "Beach", arabic: "", image: "🏖️", example: "I like the sun and the beach", soundText: "I like the sun and the beach", unit: 8 },
      { id: "w8-5", word: "Ice Cream", arabic: "", image: "🍦", example: "I like ice cream", soundText: "I like ice cream", unit: 8 },
    ],
    lessons: [
      {
        id: 1,
        title: "The Car Wheels Song!",
        type: "song",
        content: {
          songText: "The wheels on the car go round and round! The windows on the car go up and down! The doors on the car open and close!",
        },
      },
      {
        id: 2,
        title: "Commands Game",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Teacher", text: "Hello boys. We can play a game now.", voice: "Charon" },
            { speaker: "Teacher", text: "Stand up! Write your name. Go to your desk.", voice: "Charon" },
            { speaker: "Teacher", text: "Sit down. Thank you.", voice: "Charon" },
          ],
        },
      },
      {
        id: 3,
        title: "What I Like",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "I like the sun and the beach.", voice: "Kore" },
            { speaker: "Adil", text: "I like the sand and I like the sea.", voice: "Kore" },
            { speaker: "Eddie", text: "I like ice cream and I like tea.", voice: "Puck" },
            { speaker: "Badr", text: "I don't like fish!", voice: "Puck" },
          ],
        },
      },
    ],
  },
  {
    id: 9,
    title: "Animals",
    arabicTitle: "",
    color: "bg-cyan-400 text-cyan-950 border-cyan-600",
    icon: "🐪",
    words: [
      { id: "w9-1", word: "Camel", arabic: "", image: "🐪", example: "Camels have got short tails", soundText: "Camels have got short tails", unit: 9 },
      { id: "w9-2", word: "Crocodile", arabic: "", image: "🐊", example: "Crocodiles live in rivers", soundText: "Crocodiles live in rivers", unit: 9 },
      { id: "w9-3", word: "Goat", arabic: "", image: "🐐", example: "Hello, little goats, are you there?", soundText: "Hello little goats", unit: 9 },
      { id: "w9-4", word: "Cow", arabic: "", image: "🐄", example: "Hello, little cows", soundText: "Hello little cows", unit: 9 },
      { id: "w9-5", word: "Elephant", arabic: "", image: "🐘", example: "Elephants live in forests", soundText: "Elephants live in forests", unit: 9 },
    ],
    lessons: [
      {
        id: 1,
        title: "Animal Voices Song",
        type: "song",
        content: {
          songText: "One little hen is here to play! Hello little hen, how are you? I'm fine thank you. Cockle doodle doo!",
        },
      },
      {
        id: 2,
        title: "Nile Animals Facts",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Fish", text: "We're one metre long. We've got sharp teeth. We lay eggs. We're Nile fish.", voice: "Puck" },
            { speaker: "Crocodile", text: "We're five metres long. We've got sharp teeth. We lay eggs. We're Nile crocodiles.", voice: "Charon" },
            { speaker: "Hippo", text: "We're four metres long. We've got long teeth. We don't lay eggs. We're Nile hippos.", voice: "Zephyr" },
          ],
        },
      },
      {
        id: 3,
        title: "Waheed the Camel",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Waheed", text: "Hello Mr Fox. I'm Waheed. I'm a camel. Can you be my friend, please?", voice: "Puck" },
            { speaker: "Fox", text: "No. Camels are big. I don't like camels.", voice: "Charon" },
            { speaker: "Waheed", text: "Hello Mr Snake. Can you be my friend, please?", voice: "Puck" },
            { speaker: "Snake", text: "No. Camels can stand on me. I don't like camels.", voice: "Zephyr" },
          ],
        },
      },
    ],
  },
  {
    id: 10,
    title: "Food and Drink",
    arabicTitle: "",
    color: "bg-red-400 text-red-950 border-red-600",
    icon: "🍋",
    words: [
      { id: "w10-1", word: "Mango", arabic: "", image: "🥭", example: "Cut up the mangoes", soundText: "Cut up the mangoes", unit: 10 },
      { id: "w10-2", word: "Milk", arabic: "", image: "🥛", example: "There is some milk in the fridge", soundText: "There is some milk in the fridge", unit: 10 },
      { id: "w10-3", word: "Bread", arabic: "", image: "🥖", example: "Point to the bread", soundText: "Point to the bread", unit: 10 },
      { id: "w10-4", word: "Sweet", arabic: "", image: "🍬", example: "There are some sweets on the shelf", soundText: "There are some sweets on the shelf", unit: 10 },
      { id: "w10-5", word: "Juice", arabic: "", image: "🍹", example: "I like orange juice", soundText: "I like orange juice", unit: 10 },
    ],
    lessons: [
      {
        id: 1,
        title: "Food and Body Parts",
        type: "song",
        content: {
          songText: "Point to the lemons, point to the eggs. Point to the tomatoes and point to your legs! Point to the milk, point to the sweets. Point to the bananas and point to your feet!",
        },
      },
      {
        id: 2,
        title: "The Blindfold Game",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "OK, Ahmed. What's this?", voice: "Puck" },
            { speaker: "Ahmed", text: "Is it a vegetable or a fruit?", voice: "Kore" },
            { speaker: "Badr", text: "It's a fruit.", voice: "Puck" },
            { speaker: "Ahmed", text: "It isn't round? It's long. I think it's a banana!", voice: "Kore" },
            { speaker: "Badr", text: "Yes, it is!", voice: "Puck" },
          ],
        },
      },
      {
        id: 3,
        title: "Dalia's Breakfast",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Cathy", text: "Hello, Dalia. Cathy! Come in! Sit down and eat breakfast.", voice: "Puck" },
            { speaker: "Dalia", text: "Thank you. We've got eggs, bread, foul and ta'miya.", voice: "Zephyr" },
            { speaker: "Cathy", text: "My favourite breakfast!", voice: "Puck" },
          ],
        },
      },
    ],
  },
  {
    id: 11,
    title: "Our Environment",
    arabicTitle: "",
    color: "bg-emerald-400 text-emerald-950 border-emerald-600",
    icon: "🌳",
    words: [
      { id: "w11-1", word: "Museum", arabic: "", image: "🏛️", example: "Excuse me, where's the museum?", soundText: "Excuse me, where's the museum?", unit: 11 },
      { id: "w11-2", word: "Park", arabic: "", image: "🛝", example: "We can go to the park and play", soundText: "We can go to the park and play", unit: 11 },
      { id: "w11-3", word: "Rubbish", arabic: "", image: "🗑️", example: "Don't drop rubbish", soundText: "Don't drop rubbish", unit: 11 },
      { id: "w11-4", word: "Flower", arabic: "", image: "🌸", example: "Don't pick the flowers", soundText: "Don't pick the flowers", unit: 11 },
      { id: "w11-5", word: "School", arabic: "", image: "🏫", example: "The museum is near the school", soundText: "The museum is near the school", unit: 11 },
    ],
    lessons: [
      {
        id: 1,
        title: "Where is the Museum?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Boy", text: "Excuse me, where's the museum?", voice: "Puck" },
            { speaker: "Man", text: "The museum? It's in Nile Street. It's near the school.", voice: "Charon" },
            { speaker: "Boy", text: "Thank you.", voice: "Puck" },
          ],
        },
      },
      {
        id: 2,
        title: "Clean Park Day Song",
        type: "song",
        content: {
          songText: "We can go to the park, to the park and play! The sky there is blue, the grass there is green, there are trees and the air is clean!",
        },
      },
      {
        id: 3,
        title: "The Clean Classroom",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Teacher", text: "There's rubbish in the classroom. Pick up the paper, please.", voice: "Charon" },
            { speaker: "Boy", text: "Put it in the bin. Thank you.", voice: "Puck" },
            { speaker: "Teacher", text: "Don't hurt animals. Turn off the tap. Turn off the lights. Keep Sudan clean!", voice: "Charon" },
          ],
        },
      },
    ],
  },
  {
    id: 12,
    title: "Eid El Fitr",
    arabicTitle: "",
    color: "bg-rose-400 text-rose-950 border-rose-600",
    icon: "🌙",
    words: [
      { id: "w12-1", word: "Dress", arabic: "", image: "👗", example: "An orange dress", soundText: "An orange dress on the clothes line", unit: 12 },
      { id: "w12-2", word: "Trousers", arabic: "", image: "👖", example: "Shorts and trousers", soundText: "Shorts and trousers under the tree", unit: 12 },
      { id: "w12-3", word: "Hat", arabic: "", image: "👒", example: "There is a hat", soundText: "There's a cap, there's a hat", unit: 12 },
      { id: "w12-4", word: "Jalabeya", arabic: "", image: "🥋", example: "Adam has got a new jalabeya", soundText: "Adam has got a new jalabeya", unit: 12 },
      { id: "w12-5", word: "Present", arabic: "", image: "🎁", example: "Choose presents for Eid", soundText: "Choose presents for Eid", unit: 12 },
    ],
    lessons: [
      {
        id: 1,
        title: "Clothes Line Poem",
        type: "song",
        content: {
          songText: "Look at the garden, what can you see, there on the clothes line under the tree? There are shorts and trousers, there's a red T-shirt, there's an orange dress and a long grey skirt!",
        },
      },
      {
        id: 2,
        title: "Eid Clothes Surprise!",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Grandmother", text: "Eid Mubarak children! I have got Eid clothes for you.", voice: "Zephyr" },
            { speaker: "Children", text: "Grandma! Thank you!", voice: "Puck" },
            { speaker: "Mother", text: "Have you got a new skirt, Rayan?", voice: "Kore" },
            { speaker: "Rayan", text: "No, I haven't got a new skirt... but I have got a new dress. Adam has got a new jalabeya!", voice: "Puck" },
          ],
        },
      },
      {
        id: 3,
        title: "Greeting and Eating!",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Boy", text: "Welcome to Eid, everyone. Happy Eid, everyone.", voice: "Puck" },
            { speaker: "Girl", text: "Eid Mubarak, everyone. A time to eat. A time to greet.", voice: "Zephyr" },
          ],
        },
      },
    ],
  },
];
