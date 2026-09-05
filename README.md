# Encounter Coffee Beans — ファイル構成

GitHub Pages に `assets/` を置き、BASE の HTML編集に `base-paste.html` の中身を貼り付けます。

## 1. GitHub Pages 側に置くファイル

```
リポジトリ/
└── assets/
    ├── 01-hero.css    ... 共通の色変数・トップ演出（豆の軌道、文字なぞり）
    ├── 02-book.css    ... 本（COFFEE BEANS MENU）と予備ページ
    ├── 03-menu.css    ... サイドメニュー・メニューアイコン
    ├── 01-stage.js    ... トップの拡縮制御
    ├── 02-book.js     ... 本のめくり制御・サイドメニュー開閉
    └── boy.png        ... 少年のイラスト
```

GitHub Pages の有効化：リポジトリの Settings → Pages → Source を `main` ブランチのルートに設定。
公開URLは `https://<ユーザー名>.github.io/<リポジトリ名>` になります。

## 2. BASE 側の作業

1. 有料テーマを購入し「HTML編集 App」をインストール
2. **編集前に、既存コード全体をコピーしてバックアップを取る**（BASEに自動バックアップはありません）
3. `base-paste.html` の中身を貼り付け
4. 冒頭の `https://<ユーザー名>.github.io/<リポジトリ名>` を自分のURLに一括置換

## 3. 注意点

- BASEの独自タグ（`{BASEMenuTag}`、ナビゲーション出力タグ、商品一覧タグなど）は消さないでください。消すとショップページが正常に表示されなくなります
- HTML編集を行うと、BASEによるテーマの自動更新が適用されない場合があります
- CSS/JSを更新したら、GitHub に push するだけで反映されます（BASE側の再編集は不要）
- 反映されない場合はブラウザのキャッシュが原因のことが多いです。URL末尾に `?v=2` のように付けると確実に更新できます

## 4. どこを直せばよいか

| やりたいこと | 編集するファイル |
|---|---|
| 色を変える | `01-hero.css` の `:root` 部分 |
| 豆の動きの速さ・軌道 | `01-hero.css` の `--bean-dur` / `offset-path` |
| 本の商品内容 | `base-paste.html` の `<div id="book">` 内 |
| 本の見た目 | `02-book.css` |
| メニューの項目 | `base-paste.html` の `<aside class="side-menu">` 内 |
| メニューの見た目 | `03-menu.css` |
