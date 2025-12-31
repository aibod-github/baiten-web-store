// store.js

// DOM構築後にタイルを描画＆クリック動作を設定
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("product-grid");
  if (!grid || !Array.isArray(PRODUCTS)) return;

  // 1商品分の「回転タイル＋フッター」を生成する関数
  function createProductTile(product) {
    const container = document.createElement("div");
    container.className = "tile-container";
    if (product.category) {
      container.dataset.category = product.category;
    }

    const tile = document.createElement("div");
    tile.className = "tile";

    // ===== 表面 =====
    const front = document.createElement("div");
    front.className = "tile-face tile-front";

    const title = document.createElement("div");
    title.className = "tile-title";

    // 画像
    const img = document.createElement("img");
    img.className = "tile-character";
    img.src = product.image;
    img.alt = product.name || "";

    // タイトルブロック
    const titleTextWrap = document.createElement("div");

    const codeLine = document.createElement("div");
    codeLine.className = "tile-title-line";
    codeLine.textContent = product.code || "";

    const h3 = document.createElement("h3");
    h3.textContent = product.name || "";

    const badges = document.createElement("div");
    badges.className = "tile-filter-badges";
    (product.tags || []).forEach(tag => {
      const span = document.createElement("span");
      span.className = "filter-badge";
      span.textContent = tag;
      badges.appendChild(span);
    });

    titleTextWrap.appendChild(codeLine);
    titleTextWrap.appendChild(h3);
    titleTextWrap.appendChild(badges);

    // 価格バッジ
    const priceBadge = document.createElement("span");
    priceBadge.className = "tile-badge";
    if (product.shopifyProductId) {
      priceBadge.dataset.shopifyProductId = product.shopifyProductId;
      priceBadge.textContent = "読込中...";  // Shopifyから取得するまでの仮表示
    } else {
      const price = typeof product.price === "number" ? product.price.toLocaleString("ja-JP") : product.price;
      priceBadge.textContent = `${price}${product.priceLabel || "円"}`;
    }

    title.appendChild(img);
    title.appendChild(titleTextWrap);
    title.appendChild(priceBadge);

    // 説明文
    const descP = document.createElement("p");
    descP.className = "tile-content";
    descP.textContent = product.description || "";

    // メタ情報（制作者・在庫）
    const meta = document.createElement("div");
    meta.className = "tile-meta";

    const leftMeta = document.createElement("span");
    leftMeta.textContent = product.maker || "";

    const rightMeta = document.createElement("span");
    rightMeta.textContent = product.availability || "";

    meta.appendChild(leftMeta);
    meta.appendChild(rightMeta);

    // ヒント
    const hint = document.createElement("div");
    hint.className = "tile-hint";
    hint.textContent = product.frontHint || "スタッフの想いを見る →";

    front.appendChild(title);
    front.appendChild(descP);
    front.appendChild(meta);
    front.appendChild(hint);

    // ===== 裏面 =====
    const back = document.createElement("div");
    back.className = "tile-face tile-back";

    const backTitleWrap = document.createElement("div");
    backTitleWrap.className = "tile-title-back";

    const backTitleInner = document.createElement("div");

    const backLine = document.createElement("div");
    backLine.className = "tile-title-line";
    backLine.textContent = product.backTitleLine || "STAFF VOICE";

    const backH3 = document.createElement("h3");
    backH3.textContent = product.backTitle || product.name || "";

    backTitleInner.appendChild(backLine);
    backTitleInner.appendChild(backH3);
    backTitleWrap.appendChild(backTitleInner);

    back.appendChild(backTitleWrap);

    // 裏側の段落
    (product.backParagraphs || []).forEach(text => {
      const p = document.createElement("p");
      p.className = "tile-content";
      p.textContent = text;
      back.appendChild(p);
    });

    // 裏側メタ
    if (product.backMeta) {
      const backMeta = document.createElement("div");
      backMeta.className = "tile-meta";
      const metaSpan = document.createElement("span");
      metaSpan.textContent = product.backMeta;
      backMeta.appendChild(metaSpan);
      back.appendChild(backMeta);
    }

    // 裏面ヒント
    const backHint = document.createElement("div");
    backHint.className = "tile-hint";
    backHint.textContent = product.backHint || "← 表面に戻る";
    back.appendChild(backHint);

    // タイルに両面を追加
    tile.appendChild(front);
    tile.appendChild(back);

    // ===== フッターボタン =====
    const footer = document.createElement("div");
    footer.className = "tile-footer";

    const primaryBtn = document.createElement("a");
    primaryBtn.className = "btn primary";
    primaryBtn.href = product.primaryActionLink || "#contact";
    primaryBtn.textContent = product.primaryActionLabel || "購入を相談する";
    if (product.lineId) {
      primaryBtn.dataset.lineId = product.lineId;
      primaryBtn.dataset.productName = product.name || "";
    }

    const secondaryBtn = document.createElement("a");
    secondaryBtn.className = "btn ghost";
    secondaryBtn.href = product.secondaryActionLink || "#contact";
    secondaryBtn.textContent = product.secondaryActionLabel || "詳細を聞く";

    footer.appendChild(primaryBtn);
    footer.appendChild(secondaryBtn);

    // containerにタイル＋フッターを追加
    container.appendChild(tile);
    container.appendChild(footer);

    // クリックで回転（ボタン・リンクを除く）
    tile.addEventListener("click", e => {
      if (e.target.closest("a")) return;
      tile.classList.toggle("flipped");
    });

    return container;
  }

  // ===== すべての商品を描画 =====
  PRODUCTS.forEach(product => {
    const tileEl = createProductTile(product);
    grid.appendChild(tileEl);
  });

  // ===== （オプション）カテゴリフィルタに対応 =====
  const filterButtons = document.querySelectorAll(".filter-btn[data-filter-type='category']");
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const value = btn.dataset.filterValue || "";

        // activeクラスの付け替え
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        document.querySelectorAll(".tile-container").forEach(tc => {
          if (!value) {
            tc.style.display = "";
          } else {
            tc.style.display = tc.dataset.category === value ? "" : "none";
          }
        });
      });
    });
  }

  // ===== LINE相談ボタンの処理 =====
  (function() {
    const LINE_BASIC_ID = '@367bvydv';
    const encodedLineId = encodeURIComponent(LINE_BASIC_ID);
    const baseUrl = 'https://line.me/R/oaMessage/' + encodedLineId + '/?';

    document.querySelectorAll('.btn[data-line-id]').forEach(function(btn) {
      const lineId = btn.dataset.lineId;
      const productName = btn.dataset.productName || lineId;
      if (!lineId) return;

      // ボタンごとのメッセージ文面
      const message = `【BAITEN Web Store】「${productName}」について相談したいです。`;

      // URL エンコードして href にセット
      const url = baseUrl + encodeURIComponent(message);
      btn.href = url;
      btn.target = '_blank';
      btn.rel = 'noopener';
    });
  })();

  // ===== Shopifyから価格を取得 =====
  (function() {
    const SHOPIFY_DOMAIN = 'mre91v-dx.myshopify.com';
    const STOREFRONT_ACCESS_TOKEN = 'dc019dab51b9551c8845418e4298c540';

    // Shopify商品IDが設定されている価格バッジを取得
    const priceBadges = document.querySelectorAll('.tile-badge[data-shopify-product-id]');
    if (priceBadges.length === 0) return;

    // 各商品の価格を取得
    priceBadges.forEach(async function(badge) {
      const productId = badge.dataset.shopifyProductId;
      if (!productId) return;

      const gid = `gid://shopify/Product/${productId}`;

      const query = `
        query getProduct($id: ID!) {
          product(id: $id) {
            title
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN
          },
          body: JSON.stringify({
            query: query,
            variables: { id: gid }
          })
        });

        const data = await response.json();
        const product = data?.data?.product;
        const priceData = product?.variants?.edges?.[0]?.node?.price;

        if (priceData) {
          const amount = Math.floor(parseFloat(priceData.amount));
          badge.textContent = `${amount.toLocaleString('ja-JP')}円`;
        } else {
          // 商品が見つからない場合はフォールバック
          const fallbackProduct = PRODUCTS.find(p => p.shopifyProductId === productId);
          if (fallbackProduct && fallbackProduct.price) {
            const price = typeof fallbackProduct.price === "number"
              ? fallbackProduct.price.toLocaleString("ja-JP")
              : fallbackProduct.price;
            badge.textContent = `${price}${fallbackProduct.priceLabel || "円"}`;
          } else {
            badge.textContent = "価格未設定";
          }
        }
      } catch (error) {
        console.error('Shopify価格取得エラー:', error);
        // エラー時はフォールバック
        const fallbackProduct = PRODUCTS.find(p => p.shopifyProductId === productId);
        if (fallbackProduct && fallbackProduct.price) {
          const price = typeof fallbackProduct.price === "number"
            ? fallbackProduct.price.toLocaleString("ja-JP")
            : fallbackProduct.price;
          badge.textContent = `${price}${fallbackProduct.priceLabel || "円"}`;
        } else {
          badge.textContent = "価格取得失敗";
        }
      }
    });
  })();
});

