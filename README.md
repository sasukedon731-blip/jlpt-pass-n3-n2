# JLPT PASS N3・N2 Japanese Study App

N3・N2教材、ゲーム、AI会話、AIスピーク、マイページ、企業コード登録、企業管理画面、PWA、KOMOJU決済、法定ページを入れた販売用アプリです。

## 重要方針

- 個人ユーザー: 登録後1日無料体験（billing.status = trialing）
- 無料体験終了後: KOMOJUで有料プラン購入（billing.status = active）
- 企業コード登録ユーザー: billing.accountType = company / status = active / 支払い不要
- 読み込み時にFirestoreへ課金情報を自動修復書き込みしない
- ZIPに `.env.local` / `node_modules` / `.next` は入れない

## Firebase / Firestore

企業コードは `companies/{code}` に作成します。

```json
{
  "name": "企業名",
  "inviteEnabled": true
}
```

企業管理者は `users/{uid}` に以下を設定します。

```json
{
  "role": "company_admin",
  "managedCompanyCode": "企業コード"
}
```

## Vercel環境変数

```txt
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_SERVICE_ACCOUNT_KEY={...Firebase Admin SDK JSON...}
KOMOJU_SECRET_KEY=
OPENAI_API_KEY=
```

## KOMOJU

- Checkout API: `/api/komoju/checkout`
- Webhook: `/api/komoju/webhook`
- アプリ名表示: `JLPT PASS N3・N2 Japanese Study App`

## 法定ページ

- `/legal/tokushoho`
- `/legal/terms`
- `/legal/privacy`
- `/legal/refund`
- `/contact`
