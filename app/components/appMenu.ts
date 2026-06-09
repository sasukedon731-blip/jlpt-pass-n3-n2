export type AppMenuItem = { href: string; label: string; icon: string }

export const APP_MENU: AppMenuItem[] = [
  { href: "/", icon: "🏠", label: "TOP" },
  { href: "/select-mode", icon: "📚", label: "学習を始める" },
  { href: "/game", icon: "🎮", label: "ゲーム" },
  { href: "/conversation", icon: "💬", label: "AI会話" },
  { href: "/speaking", icon: "🎙️", label: "AIスピーク" },
  { href: "/mypage", icon: "👤", label: "マイページ" },
  { href: "/plans", icon: "💳", label: "プラン" },
  { href: "/company", icon: "🏢", label: "企業管理" },
]
