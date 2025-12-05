// products.js

// BAITEN Web Store で扱う商品マスタ
// 新しい商品を追加するときは、この配列にオブジェクトを追加すればOKです。
const PRODUCTS = [
  {
    id: "emboss_coaster_sakura",
    name: "エンボスコースター（桜）",
    code: "ITEM-001",
    price: 1200,
    category: "interior", // 例: "interior", "craft", "food" など
    tags: ["インテリア雑貨", "地域産品", "南相馬"],
    image: "https://drive.google.com/uc?id=1HmkrDLDenbeLOizF0EIRpNliy9IdSEGq",

    // 表面の説明（短め）
    description:
      "日本ならではの「桜」をあしらった、精密板金加工の技術を応用したコースター。エンボス加工により、グラスが少し浮き上がることで、持ち上げたときにコースターがくっつきにくい、さりげない使いやすさが特徴です。普段使いはもちろん、天井から吊り下げてアクセサリーとしても楽しめます。",

    maker: "福島県南相馬市 昭陽製作所",
    availability: "在庫あり",        // 表示用のテキスト
    statusBadge: "NEW",             // 例: "NEW", "限定", "" など
    priceLabel: "円",               // 通貨ラベル（必要なら変えられる）

    // 裏面：スタッフのコメント・想い
    backTitleLine: "STAFF VOICE",
    backTitle: "この一枚に込めたもの",
    backParagraphs: [
      "普段は工場や装置向けの精密板金加工を行っている昭陽製作所さん。「せっかくの技術を、暮らしのそばに置ける形にしたい」という想いから生まれたのが、このエンボスコースターです。",
      "桜のモチーフには、「震災後の浜通りの春を、毎年きちんと迎えたい」という静かな願いが込められています。手に取るたびに、ものづくりの背景にあるストーリーを少しだけ感じていただけたらうれしいです。"
    ],
    backMeta: "BAITEN Web Store スタッフより",

    // アクションリンク（とりあえず Contact セクションに飛ばす）
    primaryActionLabel: "購入を相談する",
    secondaryActionLabel: "詳細を聞く",
    primaryActionLink: "#contact",
    secondaryActionLink: "#contact"
  }
];

