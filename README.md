# オトナログ — 大人版ぴよログ

ワンタップで行動を記録し、時間の使い方を可視化・分析するPWAです。PWAは「Webページをスマホアプリのようにホーム画面へ追加して使える仕組み」です。

## 📱 スマホで使うまでの手順

### 1. 公開する(初回のみ・PC作業)

1. PCでGitHubの `otona-log` リポジトリを開きます。
2. 画面上部の **Settings** をクリックします。
3. 左メニューの **Pages** をクリックします。
4. **Branch** の項目で `main` を選びます。
5. その右側で `/(root)` を選びます。
6. **Save** をクリックします。
7. 数分待ちます。
8. `https://a24z7km.github.io/otona-log/` を開きます。
9. オトナログの画面が表示されれば公開完了です。

反映されないときは、GitHubリポジトリ上部の **Actions** タブを開き、処理が完了しているか確認してください。GitHub Pagesは、GitHub上のファイルをWebページとして公開する機能です。

### 2. スマホでアプリとして入れる

#### iPhone(Safari)

1. iPhoneの **Safari** を開きます。
2. `https://a24z7km.github.io/otona-log/` を開きます。
3. 画面下部の共有ボタン(□に↑)をタップします。
4. **ホーム画面に追加** をタップします。
5. 名前が「オトナログ」になっていることを確認します。
6. **追加** をタップします。

※ iPhoneでは、Safari以外のブラウザからはホーム画面に追加できない場合があります。

#### Android(Chrome)

1. Androidの **Chrome** を開きます。
2. `https://a24z7km.github.io/otona-log/` を開きます。
3. 右上のメニュー(⋮)をタップします。
4. **ホーム画面に追加** または **アプリをインストール** をタップします。
5. 確認画面で **追加** または **インストール** をタップします。

### 3. 使い始める

1. スマホのホーム画面に追加された **オトナログ** のアイコンをタップします。
2. アプリのように全画面で起動します。
3. カテゴリボタンをタップして記録を始めます。
4. 別のカテゴリをタップすると、前の記録は自動で終了します。
5. 一度開いておけば、機内モードなどのオフライン状態でも使えます。

### 大事な注意

- 記録データはスマホ本体の中だけに保存され、どこにも送信されません。
- 公開URLは誰でも開けますが、あなたの記録データは他人からは一切見えません。
- ブラウザのデータ消去や機種変更をすると、記録が消えることがあります。
- 設定タブの **JSONをエクスポート** で、定期的にバックアップしてください。

## Googleカレンダー連携の設定(任意・初回のみ)

Googleカレンダーの予定をタイムラインに重ねて表示したい場合だけ設定します。予定は表示専用で、オトナログの記録データには混ざりません。

1. Google Cloud Consoleを開きます。
2. 新しいプロジェクトを作成します。
3. **APIとサービス** を開きます。
4. **ライブラリ** を開きます。
5. **Google Calendar API** を検索します。
6. **有効にする** をクリックします。
7. **OAuth同意画面** を開きます。
8. ユーザーの種類で **外部** を選びます。
9. アプリ名など必須項目を入力します。
10. テストユーザーに自分のGoogleアカウントを追加します。
11. **認証情報** を開きます。
12. **認証情報を作成** をクリックします。
13. **OAuthクライアントID** を選びます。
14. アプリケーションの種類で **ウェブアプリケーション** を選びます。
15. **承認済みのJavaScript生成元** に `https://a24z7km.github.io` を追加します。
16. パス(`/otona-log/`)は含めず、ドメイン部分だけを登録します。
17. 作成後に表示されるクライアントIDをコピーします。
18. オトナログの設定タブを開きます。
19. **Googleカレンダー連携** の入力欄にクライアントIDを貼り付けます。
20. **連携する** をタップします。

クライアントIDは公開情報であり、パスワードのような秘密情報ではありません。オトナログが要求する権限は読み取り専用の `https://www.googleapis.com/auth/calendar.readonly` だけです。予定データは端末内でタイムラインに表示するだけで、保存も外部送信もしません。

## 機能

- **ワンタップ記録** — カテゴリボタンをタップで開始。別のボタンを押すと前の行動は自動終了(空白時間を作らない設計)
- **タイムライン** — 日/週の24時間バンド表示+記録一覧。開始/終了時刻の修正、カテゴリ変更、削除
- **健康記録** — 小・大・水分量・カフェイン・アルコール・気分・体重を点イベントとして記録
- **分析** — 今日のカテゴリ別内訳と記録カバー率、直近7日の積み上げグラフ・合計・日平均、生活リズム、健康KPI、体重トレンド
- **Googleカレンダー表示** — 読み取り専用で予定をタイムラインに重ねて表示(任意)
- **ログイン・同期** — Firebase設定後、Googleログインで端末間の記録を同期(任意)
- **カテゴリ管理** — 追加・編集・色設定
- **データエクスポート/復元** — JSON / CSV / Excel形式でダウンロード。エクスポート時に行動記録・健康記録を含めるか選択可能
- **オフライン動作** — Service Workerによるキャッシュで機内モードでも利用可

## 技術構成

- 依存ライブラリなしの単一HTML(Vanilla JS)
- データ保存: `IndexedDB` + `localStorage`バックアップ。Firebase設定時のみFirestoreへ同期
- PWA: `manifest.webmanifest` + `sw.js`(cache-first)
- 公開先想定: GitHub Pages `https://a24z7km.github.io/otona-log/`

## 使い方

### ローカルで試す

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

※ Service Workerの都合上、`file://` 直開きではなくHTTPサーバ経由を推奨。

### GitHub Pagesで公開

1. リポジトリの Settings → Pages → Branch で `main` / `/(root)` を選択します。
2. **Save** をクリックします。
3. 数分待って `https://a24z7km.github.io/otona-log/` にアクセスします。
4. スマホのブラウザで開き、ホーム画面に追加します。

## データ設計

```js
{
  categories: [{ id, name, emoji, color }],
  entries:    [{ id, cat, start, end, note? }], // end === null は進行中
  logs:       [{ id, type, time, value?, note? }],
  // type: pee / poo / water / caffeine / alcohol / mood / weight
  settings:   { sleepCatId, restCatId, googleClientId }
}
```

## ログイン・同期の設定(任意)

ブラウザ版とホーム画面に追加したアプリ版で同じ記録を見たい場合は、Firebase AuthenticationとCloud Firestoreを使います。Firebase未設定のままなら、従来通り各端末内だけに保存されます。

1. Firebase Consoleでプロジェクトを作成します。
2. Webアプリを追加し、表示されるFirebase設定オブジェクトをコピーします。
3. AuthenticationでGoogleログインを有効にします。
4. Authenticationの承認済みドメインに `a24z7km.github.io` とローカル確認用の `localhost` を追加します。
5. Firestore Databaseを作成します。
6. `index.html` の `FIREBASE_CONFIG` に `apiKey`、`authDomain`、`projectId`、`appId` を入力します。
7. Firestore Rulesを次のように設定します。

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/otonaLog/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

FirebaseのWeb SDKはブラウザモジュール形式で読み込みます。設定値は秘密鍵ではありませんが、Firestore Rulesでログインユーザー本人以外が読めないようにすることが重要です。

## 既知の制約

- Firebase未設定時のデータは各端末のブラウザ内ストレージに保存(機種変更・ブラウザデータ削除で消える)。バックアップはJSONエクスポートを利用
- Firebase同期は同じGoogleログインのアカウント間で有効
