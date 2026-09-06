# Encounter Coffee Beans — ファイル構成と手順

## 1. リポジトリの構成

```
リポジトリ/
├── index.html                    ... 動作確認用（BASEには不要）
└── ecbdesign/
    ├── Image/
    │   └── boy.png               ... 少年のイラスト
    ├── css/
    │   ├── 01-hero.css           ... 共通の色変数・トップ演出（豆の軌道、文字なぞり）
    │   ├── 02-book.css           ... 本（COFFEE BEANS MENU）と予備ページ
    │   ├── 03-menu.css           ... サイドメニュー・メニューアイコン
    │   └── 04-base.css           ... BASE必須タグ要素（ロゴ・カート・各ページ）
    └── javascript/
        ├── 01-stage.js           ... トップの拡縮制御
        └── 02-book.js            ... 本のめくり制御・サイドメニュー開閉
```

**注意：GitHub Pages はパスの大文字小文字を区別します。**
画像フォルダは `Image/`（先頭大文字）です。`image/` と書くと 404 になります。
手元のMac/Windowsでは区別されないため、ローカルでは動くのに公開すると画像だけ出ない、という事故が起きやすい箇所です。

## 2. GitHub Pages の設定

1. GitHubで **Public** のリポジトリを作成
2. 「Add file」→「Upload files」で `ecbdesign` フォルダごとアップロード
3. **Settings → Pages** を開く
4. Source を「Deploy from a branch」、Branch を「main」、フォルダは「/ (root)」→ Save
5. 1〜2分後、同じ画面に公開URLが表示される

公開URLは `https://ユーザー名.github.io/リポジトリ名/` の形式です。

### 動作確認
ブラウザで下記を直接開き、中身が表示されればOKです。404ならパス・ブランチ・Public設定を確認してください。

```
https://ユーザー名.github.io/リポジトリ名/ecbdesign/css/01-hero.css
https://ユーザー名.github.io/リポジトリ名/ecbdesign/Image/boy.png
```

## 3. BASE 側の作業

1. 有料テーマを購入し「HTML編集 App」をインストール
2. **編集前に既存コード全体をコピーしてバックアップ**（BASEに自動バックアップはありません）
3. `base-paste.html` の中身を貼り付け
4. **head内の `ECB_BASE` 変数（1か所だけ）** を自分のURLに書き換える

```html
var ECB_BASE = "https://ユーザー名.github.io/リポジトリ名/ecbdesign";
```

CSS・JS・画像のURLはすべてこの変数から組み立てられるので、**書き換えるのはここ1行だけ**です。
末尾にスラッシュは付けないでください。

以後、CSS/JSの修正は GitHub に push するだけで反映されます（BASE側の再編集は不要）。
反映されない場合はブラウザキャッシュが原因のことが多いので、URL末尾に `?v=2` を付けると確実です。

## 4. BASE必須タグ（削除厳禁）

`base-paste.html` には必須タグを配置済みです。**削除するとテーマが利用できません。**

### head内
| タグ | 役割 |
|---|---|
| `{FaviconTag}` | ファビコン／ホームアイコン |
| `{BackgroundTag}` | デザイン編集で設定した背景 |
| `{GoogleAnalyticsTag}` | Google Analytics（**独自のGAタグは貼らないこと**） |

※ `{JQueryTag}` は非推奨のため未使用。jQueryは不要な構成です。

### body内
| タグ | 配置場所 |
|---|---|
| `{LogoTag}` | ヘッダー左 |
| `{BASEMenuTag}` | ヘッダー右（カート・BASEリンク） |
| `{ContactPageURL}` | サイドメニュー（お問い合わせ） |
| `{PrivacyPageURL}` | サイドメニュー（プライバシーポリシー） |
| `{LawPageURL}` | サイドメニュー（特定商取引法に基づく表記） |
| `{PageContents}` | フッター手前（各ページの内容） |
| `{ItemAttentionTag}` | フッター手前（商品ページの注意文） |
| `{IllegalReportTag}` | フッター手前（商品ページの通報リンク） |

`{PageContents}` などは該当ページ以外では空になるため、`04-base.css` の `:empty` 指定で自動的に非表示になります。

**商品の表示について**：必須タグだけでは商品一覧・商品詳細・カートボタンは表示されません。
実運用では、購入したテーマの商品まわりのタグを残したうえで、トップの表示部分にこのデザインを差し込む形をおすすめします。

## 5. どこを直せばよいか

| やりたいこと | 編集するファイル |
|---|---|
| 色を変える | `css/01-hero.css` の `:root` |
| 豆の動きの速さ・軌道 | `css/01-hero.css` の `--bean-dur` / `offset-path` |
| 本の商品内容 | `base-paste.html` の `<div id="book">` 内 |
| 本の見た目 | `css/02-book.css` |
| メニューの項目 | `base-paste.html` の `<aside class="side-menu">` 内 |
| メニューの見た目 | `css/03-menu.css` |
| ロゴ・カート周りの見た目 | `css/04-base.css` |

## 6. ローカルでの確認

`index.html` をブラウザで開くと、BASEタグをダミーに置き換えた状態で見た目と動作を確認できます。
リポジトリ直下に置けば、GitHub Pages 上でも `https://ユーザー名.github.io/リポジトリ名/` でそのまま確認できます。


## 7. 表示サイズについて

トップの演出部分は、画面幅に応じて自動で拡大・縮小します。

| 画面幅 | 挙動 |
|---|---|
| 900px以上（PC） | 左サイドバーを除いた領域で、**左右に約100pxの余白**が残る大きさまで拡大（上限1.8倍） |
| 900px未満（スマホ・タブレット） | はみ出さないよう縮小（拡大はしない） |

調整したい場合は `javascript/01-stage.js` の冒頭の定数を変更してください。

| 定数 | 意味 |
|---|---|
| `PC_MARGIN` | PC時に左右へ確保する余白（初期値100px） |
| `MAX_SCALE` | 拡大率の上限（初期値1.8倍） |
| `SIDEBAR` | 左サイドバーの幅（`03-menu.css` の240pxと合わせる） |
