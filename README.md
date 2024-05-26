# To-Dog List 取り扱い説明書
**これはジョークアプリです。**

やりたくないけど、やらなきゃいけない...

あんなタスク、こんなタスクをTo-Dog List に記録しましょう。

かわいい犬が食べてくれます。
そう、あなたはもういやなことは何もしなくてよいのです！

## 使用上の注意
忘れてはいけないタスクを記録しないでください！

犬達が食べてしまうので、そのうちあなたの頭の中からも消えてしまい...

取り返しがつかないことになるかもしれません...:(

# To-Dog List User Manual
**THIS IS A JOKE APP!!**

Don't want to do it, but have to...

Let's record those tasks on the To-Dog List!

Cute dogs will eat them for you.
Yes, you don't have to do anything anymore!

## Please do not...
Don't record tasks you mustn't forget!

The dogs will eat them, and soon they'll disappear from your mind too...

It might lead to irreparable consequences... :(


## 開発メモ
### 画面イメージ
![画面構成検討](layout_memo.svg)

### 内部の処理
犬たちのアニメーションはCSSで設定、
スタート地点に画像を置いておきスタイル適応と同時に移動を開始する。

それと登録したタスクが消える動作は並行して行う必要がある。
task配列を空にしてしまうと一瞬でTaskListの内容が消えてしまうので、
eatenとか何かフェードアウトするための処理を追加したい。

