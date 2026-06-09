export type QuizMode = "normal" | "exam" | "review"
export type IndustryId = "jlpt"

export type QuizSectionDef = {
  id: string
  title: string
  description?: string
  enabled: boolean
  order: number
}

export type QuizDef = {
  id: string
  title: string
  description?: string
  enabled: boolean
  order: number
  modes: QuizMode[]
  sections: QuizSectionDef[]
  industries?: IndustryId[] | "all"
}

export const quizCatalog: QuizDef[] = [
  {
    id: "japanese-n3",
    title: "JLPT N3",
    description: "文字・語彙・文法・読解・聴解をまとめて学習",
    enabled: true,
    order: 1,
    industries: "all",
    modes: ["normal", "exam", "review"],
    sections: [
      { id: "all", title: "すべて", enabled: true, order: 1 },
      { id: "vocab", title: "文字・語彙", enabled: true, order: 2 },
      { id: "grammar", title: "文法", enabled: true, order: 3 },
      { id: "reading", title: "読解", enabled: true, order: 4 },
      { id: "listening", title: "聴解", enabled: true, order: 5 },
    ],
  },
  {
    id: "japanese-n2",
    title: "JLPT N2",
    description: "N2合格に向けた文法・語彙・読解・聴解対策",
    enabled: true,
    order: 2,
    industries: "all",
    modes: ["normal", "exam", "review"],
    sections: [
      { id: "all", title: "すべて", enabled: true, order: 1 },
      { id: "vocab", title: "文字・語彙", enabled: true, order: 2 },
      { id: "grammar", title: "文法", enabled: true, order: 3 },
      { id: "reading", title: "読解", enabled: true, order: 4 },
      { id: "listening", title: "聴解", enabled: true, order: 5 },
    ],
  },
]
