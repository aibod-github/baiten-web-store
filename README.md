# BAITEN Web Store

福島の浜通り発の無人販売システム「BAITEN STAND」のオンラインストアです。

---

## プロジェクト構造

```
baiten-web-store/
├── index.html      # メインHTMLファイル
├── baiten.css      # スタイルシート
├── products.js     # 商品データ定義
├── store.js        # 商品タイル生成・動的処理
├── img/            # 画像フォルダ
│   ├── embosscoaster-kirinuki.jpg  # 商品画像
│   └── line-qr.png                 # LINE QRコード
└── README.md       # このファイル
```

---

## 商品情報の編集

### 編集ファイル: `products.js`

商品情報は `PRODUCTS` 配列に定義されています。

### 商品データの構造

```javascript
{
  // === 基本情報 ===
  id: "emboss_coaster_sakura",           // 商品ID（一意の識別子）
  lineId: "emboss_coaster_sakura",       // LINE相談時に送信される識別子
  shopifyProductId: "9876543210123",     // Shopify商品ID（価格連携用）
  name: "エンボスコースター（桜）",        // 商品名
  code: "ITEM-001",                      // 商品コード
  price: 1200,                           // 価格（Shopify未設定時のフォールバック）
  priceLabel: "円",                      // 通貨ラベル

  // === カテゴリ・タグ ===
  category: "interior",                  // カテゴリ（フィルタ用）
  tags: ["インテリア雑貨", "地域産品"],   // タグ（バッジ表示）

  // === 画像・説明 ===
  image: "img/embosscoaster-kirinuki.jpg",  // 商品画像パス
  description: "商品の説明文...",            // 表面の説明文

  // === 制作情報 ===
  maker: "福島県南相馬市 昭陽製作所",      // 制作者
  availability: "在庫あり",               // 在庫状況
  statusBadge: "NEW",                    // ステータスバッジ

  // === 裏面（スタッフコメント） ===
  backTitleLine: "STAFF VOICE",          // 裏面のラベル
  backTitle: "この一枚に込めたもの",       // 裏面のタイトル
  backParagraphs: [                      // 裏面の段落（配列）
    "段落1の文章...",
    "段落2の文章..."
  ],
  backMeta: "BAITEN Web Store スタッフより",  // 裏面のメタ情報

  // === アクションボタン ===
  primaryActionLabel: "購入を相談する",    // プライマリボタンのラベル
  secondaryActionLabel: "詳細を聞く",      // セカンダリボタンのラベル
  primaryActionLink: "#contact",          // プライマリボタンのリンク先
  secondaryActionLink: "#contact"         // セカンダリボタンのリンク先
}
```

### 新商品の追加

`products.js` の `PRODUCTS` 配列に新しいオブジェクトを追加するだけで、自動的に商品タイルが生成されます。

---

## Shopify価格連携

### 概要

`shopifyProductId` を設定すると、Shopify Storefront APIから価格を動的に取得して表示します。

### Shopify商品IDの確認方法

1. Shopify管理画面にログイン（`https://admin.shopify.com/`）
2. 「商品管理」から対象商品を開く
3. URLから商品IDを確認

```
https://admin.shopify.com/store/mre91v-dx/products/9876543210123
                                                   ↑ この数字が商品ID
```

### 設定方法

`products.js` で `shopifyProductId` に商品IDを設定：

```javascript
{
  id: "emboss_coaster_sakura",
  shopifyProductId: "9876543210123",  // ← ここにShopify商品IDを設定
  price: 1200,                        // Shopify取得失敗時のフォールバック価格
  // ...
}
```

### 動作

| 状態 | 価格表示 |
|------|----------|
| `shopifyProductId: null` | `products.js` の `price` を表示 |
| `shopifyProductId` 設定済み | Shopifyから価格を取得して表示 |
| Shopify取得失敗時 | `products.js` の `price` をフォールバック表示 |

### 現在のShopify設定

| 項目 | 値 |
|------|-----|
| ストアドメイン | `mre91v-dx.myshopify.com` |
| コレクションID | `507848032578` |

---

## LINE相談機能

### 概要

「購入を相談する」ボタンをクリックすると、LINEアプリが起動し、商品名を含むメッセージが自動入力されます。

### 設定

`products.js` で `lineId` を設定：

```javascript
{
  lineId: "emboss_coaster_sakura",  // LINE相談時の識別子
  name: "エンボスコースター（桜）",   // メッセージに含まれる商品名
  // ...
}
```

### 自動送信メッセージ

```
【BAITEN Web Store】「エンボスコースター（桜）」について相談したいです。
```

### LINE設定

| 項目 | 値 |
|------|-----|
| LINE BASIC ID | `@367bvydv` |

---

## 画像の管理

### 商品画像

`img/` フォルダに画像を配置し、`products.js` で参照：

```javascript
image: "img/商品画像ファイル名.jpg"
```

### 対応形式

- JPG / JPEG
- PNG
- WebP

---

## その他の編集箇所

| 変更内容 | 編集ファイル |
|----------|-------------|
| 商品情報 | `products.js` |
| ストア説明・お問い合わせ情報 | `index.html` |
| デザイン・レイアウト | `baiten.css` |
| 商品タイルの表示ロジック | `store.js` |

---

## 技術スタック

- HTML5
- CSS3（カスタムプロパティ、Grid、3D Transform）
- Vanilla JavaScript（ES6+）
- Shopify Buy Button / Storefront API
