# kenchandayo.xyz ブログ

[HonoX](https://github.com/honojs/honox)（Hono + Vite SSG）と MDX で構築した個人ブログです。Cloudflare Pages にデプロイしています。

## 技術スタック

- [HonoX](https://github.com/honojs/honox) / [Hono](https://hono.dev/)
- [MDX](https://mdxjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Cloudflare Pages](https://pages.cloudflare.com/)（[Wrangler](https://developers.cloudflare.com/workers/wrangler/)）

## 前提条件

- [Bun](https://bun.sh/)（パッケージマネージャ・ランタイム）
- Cloudflare アカウント（デプロイ時）

## セットアップ

```bash
bun install
```

## 開発

### 開発サーバーの起動

```bash
bun run dev
```

ブラウザで表示しながら記事やレイアウトを確認できます。開発環境では `published: false` の記事も一覧・詳細ページに表示されます。

### 本番ビルドのプレビュー

```bash
bun run build
bun run preview
```

Wrangler 経由で Cloudflare Pages と同様の環境で確認できます。

### デプロイ

```bash
bun run deploy
```

`bun run deploy` でビルド後に Cloudflare Pages へデプロイします。

## 記事の書き方

### 記事ファイルの配置

記事は `app/articles/YYYY/MM/` 配下に `.mdx` ファイルとして置きます。

```
app/articles/
└── 2025/
    └── 12/
        └── how-to-use-nuqs.mdx
```

URL のスラッグは **ファイル名（拡張子なし）** になります。上記の例では `/entry/how-to-use-nuqs` です。

### 記事の新規作成

対話形式で frontmatter 付きのファイルを作成するスクリプトがあります。

```bash
bun createEntry.ts
```

1. 記事のタイトルを入力
2. 記事の URI（ファイル名）を入力

実行すると、現在日時の `YYYY/MM` ディレクトリに `.mdx` ファイルが作成され、Cursor で開きます。

手動で作成する場合は、上記ディレクトリ構成に従ってファイルを追加してください。

### frontmatter

各記事の先頭に YAML frontmatter を書きます。

```yaml
---
title: 記事タイトル
date: 2025-12-01T14:05:45.734Z
description: 記事の概要（一覧ページや OGP で使用）
iconUrl: https://example.com/icon.png
published: true
tags: ["react", "next.js"]
---
```

| フィールド    | 必須   | 説明                                                          |
| ------------- | ------ | ------------------------------------------------------------- |
| `title`       | はい   | 記事タイトル                                                  |
| `date`        | はい   | 公開日時（ISO 8601 形式）                                     |
| `description` | はい   | 記事の概要                                                    |
| `iconUrl`     | いいえ | 記事アイコン（未指定時はデフォルト絵文字）                    |
| `published`   | いいえ | `true` の記事のみ本番に公開（開発時は未指定・`false` も表示） |
| `tags`        | いいえ | タグの配列。`/entry/tag/{tag}` で絞り込み可能                 |

### 本文（Markdown / MDX）

通常の Markdown が使えます。見出し、リスト、引用、テーブル（GFM）などに対応しています。

#### 外部リンク

通常の Markdown リンク `[テキスト](https://example.com)` も使えます。外部リンクを目立たせたい場合は `AnchorLink` コンポーネントを使います（新しいタブで開きます）。

```mdx
<AnchorLink href="https://nuqs.dev/">nuqs 公式サイト</AnchorLink>
```

#### 外部サイトの OGP カード

```mdx
<ExternalOgp url="https://example.com/article" />
```

リンク先の OGP 情報を取得して、カード形式で表示します。

#### コードブロック

シンタックスハイライト（[rehype-pretty-code](https://rehype-pretty.pages.dev/) / Catppuccin Mocha テーマ）に対応しています。

````mdx
```tsx title="app/page.tsx" showLineNumbers
export default function Page() {
  return <h1>Hello</h1>;
}
```
````

| メタ情報          | 説明                                 |
| ----------------- | ------------------------------------ |
| `title="..."`     | コードブロック上部にファイル名を表示 |
| `showLineNumbers` | 行番号を表示                         |

#### 画像

画像ファイルは `app/assets/` に `.avif` 形式で配置します。

```mdx
![説明文](bundle-size1.avif)
```

Markdown の `img` は `ArticleImage` コンポーネントに変換されます。開発時は `/app/assets/`、本番では `/assets/` から配信されます。

記事内で import して使う場合（例: アバター画像）:

```mdx
import avatar from "../assets/avatar.avif?url";
```

### 下書きと公開

| 環境                    | `published` 未指定 / `false` | `published: true` |
| ----------------------- | ---------------------------- | ----------------- |
| 開発（`bun run dev`）   | 表示される                   | 表示される        |
| 本番（`bun run build`） | **非表示**                   | 表示される        |

公開前に `published: true` を設定してください。

## 品質チェック

### MDX の lint

```bash
bun run lint:text
```

[textlint](https://textlint.github.io/) で `.mdx` ファイルをチェックします。

### コードのフォーマット・lint

```bash
bun run format   # Biome でフォーマット
bun run check    # Biome で lint + 自動修正
```

## プロジェクト構成

```
.
├── app/
│   ├── articles/          # 記事（MDX）
│   ├── assets/            # 画像（.avif）
│   ├── components/        # UI コンポーネント
│   ├── constants/         # 定数（ドメイン名など）
│   ├── islands/           # クライアントサイドコンポーネント
│   ├── lib/
│   │   ├── mdx/           # MDX 用カスタムコンポーネント
│   │   └── posts.ts       # 記事の読み込み・フィルタ
│   ├── routes/            # ページルート
│   └── server.ts          # HonoX エントリポイント
├── createEntry.ts         # 記事作成スクリプト（Bun）
├── wrangler.toml          # Cloudflare Pages 設定
└── vite.config.ts         # Vite / MDX 設定
```

## 主要な URL

| パス               | 内容                      |
| ------------------ | ------------------------- |
| `/`                | トップページ              |
| `/entry`           | 記事一覧                  |
| `/entry/{slug}`    | 記事詳細                  |
| `/entry/tag/{tag}` | タグ別記事一覧            |
| `/ogp/{slug}`      | OGP 画像（Satori で生成） |
