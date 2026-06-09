import { japaneseN3Quiz } from "./japanese-n3"
import { japaneseN2Quiz } from "./japanese-n2"

export const quizzes = {
  "japanese-n3": japaneseN3Quiz,
  "japanese-n2": japaneseN2Quiz,
} as const
