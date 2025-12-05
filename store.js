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
    const price = typeof product.price === "number" ? product.price.toLocaleString("ja-JP") : product.price;
    priceBadge.textContent = `${price}${product.priceLabel || "円"}`;

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
});

