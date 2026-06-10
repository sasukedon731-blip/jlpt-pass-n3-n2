export type QuizSectionDef = {
  id: string
  title: string
  enabled: boolean
  order: number
}

export type QuizDef = {
  id: string
  title: string
  description: string
  level: "N5" | "N4" | "N3" | "N2"
  category: string
  enabled: boolean
  order: number
  sections: QuizSectionDef[]
}

export const quizCatalog: QuizDef[] = [
  {
    id: "japanese-n3",
    title: "JLPT N3",
    description: "N3レベルの語彙・文法・読解を学習します。",
    level: "N3",
    category: "jlpt",
    enabled: true,
    order: 1,
    sections: [
      { id: "vocabulary", title: "語彙", enabled: true, order: 1 },
      { id: "grammar", title: "文法", enabled: true, order: 2 },
      { id: "reading", title: "読解", enabled: true, order: 3 },
    ],
  },
  {
    id: "japanese-n2",
    title: "JLPT N2",
    description: "N2レベルの語彙・文法・読解を学習します。",
    level: "N2",
    category: "jlpt",
    enabled: true,
    order: 2,
    sections: [
      { id: "vocabulary", title: "語彙", enabled: true, order: 1 },
      { id: "grammar", title: "文法", enabled: true, order: 2 },
      { id: "reading", title: "読解", enabled: true, order: 3 },
    ],
  },
]

export function getQuizDef(id: string): QuizDef | undefined {
  return quizCatalog.find((quiz) => quiz.id === id)
}

export default quizCatalog