# yskm_dev Astro Playground

Astro + microCMS を使用した Jamstack ブログサイトです。

## 技術スタック

- **フレームワーク**: [Astro](https://astro.build/)
- **CMS**: [microCMS](https://microcms.io/)
- **ホスティング**: [Cloudflare](https://www.cloudflare.com/)
- **アニメーション**: [GSAP](https://gsap.com/)
- **コードハイライト**: [Prism.js](https://prismjs.com/)

## プロジェクト構成

```text
/
├── public/
├── src/
│   ├── components/   # コンポーネント
│   ├── constants/    # 定数
│   ├── layouts/      # レイアウト
│   ├── libs/         # ライブラリ（microCMS SDK など）
│   ├── pages/        # ページ（ルーティング）
│   │   ├── about/
│   │   ├── notes/
│   │   ├── profile/
│   │   ├── rules/
│   │   ├── sketch/
│   │   └── index.astro
│   ├── styles/       # スタイル
│   ├── svg/          # SVG アセット
│   ├── types/        # 型定義
│   └── utils/        # ユーティリティ
└── package.json
```

## コマンド

すべてのコマンドはプロジェクトルートで実行します。

| コマンド                    | 説明                                              |
| :-------------------------- | :------------------------------------------------ |
| `npm install`               | 依存関係をインストール                            |
| `npm run dev`               | 開発サーバーを起動（`localhost:4321`）             |
| `npm run build`             | 本番用にビルド（`./dist/`）                       |
| `npm run preview`           | ビルド結果をローカルでプレビュー                  |
| `npm run lint`              | リント（ESLint / Prettier / Stylelint / Markuplint） |
| `npm run fix`               | リントエラーを自動修正                            |
| `npm run astro ...`         | Astro CLI コマンドを実行                          |
| `npm run astro -- --help`   | Astro CLI のヘルプを表示                          |

## 参考リンク

- [Astro ドキュメント](https://docs.astro.build)
- [microCMS ドキュメント](https://document.microcms.io/)
