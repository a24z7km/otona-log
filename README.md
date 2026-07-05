# オトナログ — 大人版ぴよログ

ワンタップで行動を記録し、時間の使い方を可視化・分析するPWA。

## 機能

- **ワンタップ記録** — カテゴリボタンをタップで開始。別のボタンを押すと前の行動は自動終了(空白時間を作らない設計)
- **タイムライン** — 24時間バンド表示+記録一覧。開始/終了時刻の修正、カテゴリ変更、削除
- **分析** — 今日のカテゴリ別内訳と記録カバー率、直近7日の積み上げグラフ・合計・日平均
- **カテゴリ管理** — 追加・編集・色設定
- **データエクスポート** — JSON形式でダウンロード
- **オフライン動作** — Service Workerによるキャッシュで機内モードでも利用可

## 技術構成

- 依存ライブラリなしの単一HTML(Vanilla JS)
- データ保存: `localStorage`(端末内完結、外部送信なし)
- PWA: `manifest.webmanifest` + `sw.js`(cache-first)

## 使い方

### ローカルで試す

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

※ Service Workerの都合上、`file://` 直開きではなくHTTPサーバ経由を推奨。

### GitHub Pagesで公開

1. リポジトリの Settings → Pages → Branch: `main` / `(root)` を選択
2. `https://<username>.github.io/otona-log/` にアクセス
3. スマホのブラウザで開き「ホーム画面に追加」でアプリとしてインストール

## データ設計

```js
{
  categories: [{ id, name, emoji, color }],
  entries:    [{ id, cat, start, end }]   // end === null は進行中
}
```

## 既知の制約

- データは端末のlocalStorageのみに保存(機種変更・ブラウザデータ削除で消える)。バックアップはJSONエクスポートを利用
- 複数端末間の同期は未対応
