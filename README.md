# twitch multi player reactive

指定のストリーマーが配信を開始したらプレーヤーを動的に追加、配信を停止したらプレーヤーを動的に削除するマルチツイッチ

# 構築・起動

```sh
cp .env.sample .env
# .envにいろいろ書く 

npm ci
npm run serve
```

localhost:3000 でサーバが起動する。下記のことをしてます

- a. `http://localhost:3000/` でプレーヤーのHTMLをサーブ
- b. twitchのAPIのプロキシ
- c. twitchのEventSubのSubscriberサーバ役

c.のために、HTTPS環境にデプロイする必要あり。ngrokが便利です

```sh
ngrok by @inconshreveable                                                                               (Ctrl+C to quit)
                                                                                                                        
Session Status                online                                                                                    
Account                       xxx@gmail.com (Plan: Free)                                                          
Update                        update available (version 2.3.40, Ctrl-U to update)                                       
Version                       2.3.39                                                                                    
Region                        United States (us)                                                                        
Web Interface                 http://127.0.0.1:4040                                                                     
Forwarding                    http://7f8e82d2f058.ngrok.io -> http://localhost:3000                                     
Forwarding                    https://7f8e82d2f058.ngrok.io -> http://localhost:3000
```

この場合の`http://7f8e82d2f058.ngrok.io`をEventSubへのリクエストに載せないといけないので`npm run serve`で環境変数として渡してます

```
  "scripts": {
    "serve": "CALLBACK_ENDPOINT=$(curl -s localhost:4040/api/tunnels | jq -r '.tunnels[1].public_url') ts-node -r tsconfig-paths/register src/index.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## 環境変数

```
CLIENT_ID=
CLIENT_SECRET=
PUSHER_KEY=
PUSHER_SECRET=
HMAC_SECRET=
```

- `CLIENT_ID`,`CLIENT_SECRET`
  - twitchのAPIの認証用。
  - https://dev.twitch.tv/docs/authentication
  - https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#oauth-client-credentials-flow
- `PUSHER_KEY`, `PUSHER_SECRET`
  - サーバからブラウザへの通知にpusherを使用しています。
    https://pusher.com/ でちゃちゃっとsign upしてサンプルコードの中のを引っこ抜く。
- `HMAC_SECRET`
  - twitchからのコールバックリクエストの真性性確認用。  
    Subscription登録時に署名鍵をつけて送ると、コールバックリクエストにHMAC-SHA256の署名がくっついて送られてくるので署名を検証して真性性を確認できます。    
    が、確認が面倒くさいのでしてません。そのうちします


# プレーヤ閲覧

```
http://localhost:3000/?pusher_key=xxxxxxxx&width=1600&height=900&channels=streamer_name_a,streamer_name_b,...
```

クエリパラメータでいろいろ指定する


- `pusher_key`
  - サーバからプレーヤへの通知に使用。めんどくさいのでindex.htmlレンダリング時に渡すようにしたい
- `width`, `height`
  - この幅/高さの中でプレーヤーをやりくりします
  - 未指定時はwindow.innerWidth/window.innerHeightにフォールバック
- `channels`
  - チャンネル名をカンマ区切り
