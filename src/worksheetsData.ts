export interface WorksheetQuestion {
  id: string;
  question: string;
  arabicTranslation?: string;
  options: string[];
  correctAnswer: string;
  marks: number;
}

export interface Worksheet {
  id: number;
  title: string;
  arabicTitle: string;
  description: string;
  arabicDescription: string;
  unitId?: number; // Related Unit
  questions: WorksheetQuestion[];
}

export const WORKSHEETS: Worksheet[] = [
  {
    id: 1,
    title: "Greetings & Introductions",
    arabicTitle: "الترحيب والتعريف بالنفس",
    description: "Practice greetings, saying your name, saying goodbye, and letters A to D.",
    arabicDescription: "تدرب على كلمات الترحيب، التعريف بالاسم، الوداع، والحروف من A إلى D.",
    unitId: 1,
    questions: [
      {
        id: "ws1_q1",
        question: "Ahmed says: 'Hello! I'm Ahmed. What is your ___?'",
        arabicTranslation: "يقول أحمد: 'مرحباً! أنا أحمد. ما هو ___؟'",
        options: ["name", "cat", "clock", "bed"],
        correctAnswer: "name",
        marks: 5
      },
      {
        id: "ws1_q2",
        question: "How do you reply to: 'As-salamu alaykum'?",
        arabicTranslation: "كيف ترد على تحية: 'السلام عليكم'؟",
        options: ["Wa alaykumu s-salam", "Goodbye, Cathy", "He is English", "I'm nine"],
        correctAnswer: "Wa alaykumu s-salam",
        marks: 5
      },
      {
        id: "ws1_q3",
        question: "Cathy is from England. She is ___.",
        arabicTranslation: "كاثي من إنجلترا. هي ___.",
        options: ["English", "Sudanese", "sleeping", "lost"],
        correctAnswer: "English",
        marks: 5
      },
      {
        id: "ws1_q4",
        question: "Complete the spelling chant sound: 'a is in apple, b is in ___'",
        arabicTranslation: "أكمل أنشودة التهجئة: حرف a في تفاحة، وحرف b في ___",
        options: ["bed", "cat", "egg", "gate"],
        correctAnswer: "bed",
        marks: 5
      }
    ]
  },
  {
    id: 2,
    title: "Age, Numbers & Lost Friends",
    arabicTitle: "الأعمار، الأرقام والأصدقاء المفقودين",
    description: "Count from 1 to 10, ask about age, and learn about Little Ali lost in the zoo.",
    arabicDescription: "العد من 1 إلى 10، السؤال عن العمر، وقصة علي الصغير الضائع في حديقة الحيوان.",
    unitId: 2,
    questions: [
      {
        id: "ws2_q1",
        question: "When Ahmed says: 'I'm 8', Cathy replies: 'I'm ___.'",
        arabicTranslation: "عندما يقول أحمد: 'عمري 8 سنوات'، تجيب كاثي: 'عمري ___.'",
        options: ["9", "5", "10", "3"],
        correctAnswer: "9",
        marks: 5
      },
      {
        id: "ws2_q2",
        question: "Complete the numbers sequence: 'one, two, three, four, ___'",
        arabicTranslation: "أكمل تسلسل الأرقام: واحد، اثنان، ثلاثة، أربعة، ___",
        options: ["five", "ten", "eight", "six"],
        correctAnswer: "five",
        marks: 5
      },
      {
        id: "ws2_q3",
        question: "How many crocodiles are there chanting in the textbook song?",
        arabicTranslation: "كم عدد التماسيح التي تنشد في أغنية الكتاب المدرسي؟",
        options: ["10 crocodiles", "3 crocodiles", "5 crocodiles", "2 crocodiles"],
        correctAnswer: "10 crocodiles",
        marks: 5
      },
      {
        id: "ws2_q4",
        question: "What happened to Little Ali when he went to see the monkeys?",
        arabicTranslation: "ماذا حدث لعلي الصغير عندما ذهب لرؤية القرود؟",
        options: ["He is lost!", "He is singing.", "He is eating mango.", "He is sleeping in bed."],
        correctAnswer: "He is lost!",
        marks: 5
      }
    ]
  },
  {
    id: 3,
    title: "Sudan Flag, Colors & Signals",
    arabicTitle: "علم السودان، الألوان والإشارات",
    description: "Learn Sudan flag colors, describe eyes and hair, and play the traffic lights game.",
    arabicDescription: "تعرف على ألوان علم السودان، وصف العينين والشعر، ولعبة إشارات المرور.",
    unitId: 3,
    questions: [
      {
        id: "ws3_q1",
        question: "How many colors are in our Sudanese national flag?",
        arabicTranslation: "كم عدد الألوان في علمنا الوطني السوداني؟",
        options: ["4 colors", "3 colors", "5 colors", "2 colors"],
        correctAnswer: "4 colors",
        marks: 5
      },
      {
        id: "ws3_q2",
        question: "In the traffic lights game, the Yellow light says: '___!'",
        arabicTranslation: "في لعبة إشارات المرور، الضوء الأصفر يقول: '___!'",
        options: ["WAIT", "STOP", "GO", "RUN"],
        correctAnswer: "WAIT",
        marks: 5
      },
      {
        id: "ws3_q3",
        question: "Which of these colors is NOT in the Sudanese flag?",
        arabicTranslation: "أي من هذه الألوان ليس موجوداً في علم السودان؟",
        options: ["Blue", "Red", "Green", "Black"],
        correctAnswer: "Blue",
        marks: 5
      },
      {
        id: "ws3_q4",
        question: "Amna says her lost son Ali has got ___ eyes and ___ hair.",
        arabicTranslation: "تقول آمنة أن ابنها المفقود علي لديه عينان ___ وشعر ___.",
        options: ["black / brown", "blue / white", "green / black", "brown / yellow"],
        correctAnswer: "black / brown",
        marks: 5
      }
    ]
  },
  {
    id: 4,
    title: "My Body & Friendly Animals",
    arabicTitle: "أعضاء الجسد والحيوانات الأليفة",
    description: "Learn body parts, describe animals like Gonfooth the hedgehog, and use 'I have got'.",
    arabicDescription: "تعرف على أعضاء الجسم، وصف الحيوانات مثل القنفذ 'قنفذ'، واستخدام صيغة 'عندي/لدي'.",
    unitId: 4,
    questions: [
      {
        id: "ws4_q1",
        question: "How many toes has the reader got in the body poem?",
        arabicTranslation: "كم عدد أصابع القدم التي لدى القارئ في قصيدة الجسم؟",
        options: ["ten toes", "two toes", "five toes", "no toes"],
        correctAnswer: "ten toes",
        marks: 5
      },
      {
        id: "ws4_q2",
        question: "Who is Gonfooth?",
        arabicTranslation: "من هو قنفذ؟",
        options: ["A hedgehog", "A little monkey", "A white hen", "A sweet chick"],
        correctAnswer: "A hedgehog",
        marks: 5
      },
      {
        id: "ws4_q3",
        question: "Gonfooth tells Mrs Hen that she has got a 'big ___ body'.",
        arabicTranslation: "يخبر قنفذ السيدة دجاجة بأن لديها 'جسداً ___ كبيراً'.",
        options: ["white", "green", "pink", "black"],
        correctAnswer: "white",
        marks: 5
      },
      {
        id: "ws4_q4",
        question: "Complete: 'I have got two hands, two ears, and a ___ to breathe.'",
        arabicTranslation: "أكمل: 'عندي يدان، وأذنان، و___ للتنفس.'",
        options: ["nose", "toe", "tail", "finger"],
        correctAnswer: "nose",
        marks: 5
      }
    ]
  },
  {
    id: 5,
    title: "School Classrooms & Positions",
    arabicTitle: "الفصول المدرسية ومواقع الأشياء",
    description: "Identify classroom items and express position using in, on, and under.",
    arabicDescription: "التعرف على أدوات الصف الدراسي والتعبير عن المواقع باستخدام: داخل، على، تحت.",
    unitId: 5,
    questions: [
      {
        id: "ws5_q1",
        question: "In the classroom song: 'Point to the window. Point to the ___.'",
        arabicTranslation: "في أنشودة الصف الدراسي: 'أشر إلى النافذة. أشر إلى ___.'",
        options: ["door", "lemon", "bedroom", "crocodile"],
        correctAnswer: "door",
        marks: 5
      },
      {
        id: "ws5_q2",
        question: "Where did Reem find her lost toy school bag?",
        arabicTranslation: "أين وجدت ريم حقيبتها المدرسية المفقودة؟",
        options: ["In her bag", "Under her bed", "On the fridge", "In the market"],
        correctAnswer: "In her bag",
        marks: 5
      },
      {
        id: "ws5_q3",
        question: "Where was Sukkar the monkey's tail hidden during the game?",
        arabicTranslation: "أين كان ذيل القرد سكر مخبأً خلال اللعبة؟",
        options: ["Under his body", "Under his chair", "On the book", "In the bin"],
        correctAnswer: "Under his body",
        marks: 5
      },
      {
        id: "ws5_q4",
        question: "Complete the textbook instruction: 'Put the rubbish in the ___.'",
        arabicTranslation: "أكمل تعليمات الكتاب المدرسي: 'ضع القمامة في ___.'",
        options: ["bin", "bag", "desk", "window"],
        correctAnswer: "bin",
        marks: 5
      }
    ]
  }
];
