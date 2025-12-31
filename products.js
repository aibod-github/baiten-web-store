// products.js

// BAITEN Web Store で扱う商品マスタ
// 新しい商品を追加するときは、この配列にオブジェクトを追加すればOKです。
const PRODUCTS = [
  {
    id: "emboss_coaster_sakura",
    lineId: "emboss_coaster_sakura",  // LINE相談時に送信される商品識別子
    shopifyProductId: "10177648525634",  // Shopifyの商品ID（数字部分のみ）。設定するとShopifyから価格を取得
    name: "エンボスコースター（桜）",
    code: "ITEM-001",
    price: 1200,  // shopifyProductIdが設定されている場合はShopifyの価格で上書きされる
    category: "interior", // 例: "interior", "craft", "food" など
    tags: ["インテリア雑貨", "地域産品", "南相馬"],
    image: "img/embosscoaster-kirinuki.jpg",

    // 表面の説明（短め）
    description:
      "桜をモチーフにした精密板金加工のコースター。エンボス加工でグラスがくっつきにくく、吊り下げアクセサリーとしても楽しめます。",

    maker: "福島県南相馬市 昭陽製作所",
    availability: "在庫あり",        // 表示用のテキスト
    statusBadge: "NEW",             // 例: "NEW", "限定", "" など
    priceLabel: "円",               // 通貨ラベル（必要なら変えられる）

    // 裏面：スタッフのコメント・想い
    backTitleLine: "STAFF VOICE",
    backTitle: "この一枚に込めたもの",
    backParagraphs: [
      "精密板金加工の技術を暮らしのそばに届けたい——そんな想いから生まれた一品です。",
      "桜には、浜通りの春を毎年迎えたいという願いが込められています。"
    ],
    backMeta: "BAITEN Web Store スタッフより",

    // アクションリンク（とりあえず Contact セクションに飛ばす）
    primaryActionLabel: "購入を相談する",
    secondaryActionLabel: "詳細を聞く",
    primaryActionLink: "#contact",
    secondaryActionLink: "#contact"
  }
];

