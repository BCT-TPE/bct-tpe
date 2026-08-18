/* ---------------------------------------------------------------------------
   Bilingual copy (EN / 繁體中文), shared by every page.

   No markup changes: the dictionary is keyed by the exact English string and a
   text-node walk swaps them, remembering each node's original so switching back
   is lossless. Deliberately NOT translated: product and case-study names
   (Office Power, NOVA, DataLake, FLIR...), brand names, and the mock product UI
   inside the panels - those are proper nouns and read as themselves in both
   languages. Translations are kept close to the English in visual length so the
   layout holds.

   Add a page's strings to TC below and it starts working - the switcher markup
   is injected automatically wherever a .langsw placeholder exists.
--------------------------------------------------------------------------- */
(function () {
  const TC = {
    /* nav + chrome */
    "Services": "服務",
    "Products": "產品",
    "Case Studies": "案例",
    "Team": "團隊",
    "Contact Us": "聯絡我們",
    "Skip the tour ↓": "略過導覽 ↓",
    "Scroll": "向下捲動",
    "↺ Back to the story": "↺ 回到故事",
    "© 2026 BCT Taipei. All rights reserved. · Bahwan CyberTek Group":
      "© 2026 BCT 台北。保留所有權利 · Bahwan CyberTek Group",

    /* hero */
    "Step inside": "走進來看看",
    "Watch ideas ship": "看想法變成產品",

    /* the fly-through captions */
    "The Office": "辦公室",
    "Welcome to our world": "歡迎來到我們的世界",
    "This is BCT Taipei. Everything you're about to see was designed, built and shipped by our team. The tour takes a minute.":
      "這裡是 BCT 台北。接下來看到的一切，都由我們的團隊設計、開發並上線。導覽只需要一分鐘。",
    "The Stand-up": "每日站會",
    "Aligned every morning": "每天早上對齊方向",
    "Fifteen minutes every morning: visible progress, honest blockers, and no surprises in week twelve.":
      "每天早上十五分鐘：進度看得見、卡點說得出，第十二週不會有意外。",
    "The Work": "我們的作品",
    "Projects that ship": "真正上線的專案",
    "Every product in this showcase is live in production. The measure we trust most: clients who come back.":
      "這裡展示的每個產品都在正式環境運行。我們最看重的指標：回頭的客戶。",
    "The Meeting": "會議室",
    "The next seat is yours": "下一個位子是你的",
    "Bring an idea. Scope, design and delivery get worked out at this table, before a single line of code.":
      "帶著想法來。範圍、設計與交付都在這張桌子上談定，然後才開始寫程式。",
    "The Pantry": "茶水間",
    "Good work, good coffee": "好作品，好咖啡",
    "Pour-over, darts and the Taipei skyline. This is where the team recharges between sprints.":
      "手沖咖啡、飛鏢與台北的天際線。這是團隊在衝刺之間充電的地方。",
    "The Team": "團隊",
    "We're BCT Taipei 👋": "我們是 BCT 台北 👋",
    "The whole team, in one frame. Tell us about your next product, or come build it with us.":
      "全團隊，同一個畫面。告訴我們你的下一個產品，或加入我們一起打造。",
    "↓ Keep scrolling, there's more to explore": "↓ 繼續往下捲，還有更多",

    /* services statement */
    "27 years": "27 年",
    "98% on-time": "98% 準時交付",
    "50+ shipped 🌍": "50+ 產品上線 🌍",
    "Whether you need an": "不論你需要",
    "AI platform": "AI 平台",
    "or an": "或是",
    "app that ships": "能上線的 App",
    "Let's take it": "我們陪你",
    "from idea to production": "從構想走到上線",
    "Six ways we can help": "六個面向，我們都幫得上",
    "Six ways": "六個面向，",
    "we can help": "我們都幫得上",
    "End-to-end with one team in Taipei: strategy, design, build and run.":
      "一個台北團隊，包辦策略、設計、開發與維運。",
    "AI Agent Development": "AI Agent 開發",
    "Mobile & Web Apps": "行動與網頁應用",
    "RPA & ML Services": "RPA 與機器學習",
    "Cloud Services": "雲端服務",
    "UI / UX Design": "UI / UX 設計",
    "AR / VR Experiences": "AR / VR 體驗",

    /* products */
    "of our own": "產品",
    "Our own software, built and run by the team in Taipei.":
      "我們自己的軟體，由台北團隊打造並維運。",
    "Enterprise AI agent platform": "企業級 AI Agent 平台",
    "Your first AI coworker live in 15 minutes": "15 分鐘讓第一位 AI 同事上線",
    "Answers grounded in your own documents": "答案有憑有據，來自你自己的文件",
    "Budgets, keywords and permissions under IT control": "預算、關鍵字與權限，IT 全都管得住",
    "Office Power is a factory for AI employees, not another chatbot. Install it, run the wizard, and agents are answering on Discord, LINE and the web the same day - with every dollar, keyword and file permission governed.":
      "Office Power 不僅是一個聊天機器人，更是一座生產 AI 員工的工廠。安裝、跑完設定後，當天就有 AI 員工在 Discord、LINE 和網頁上回覆訊息，花費、關鍵字、檔案權限，全在控管之內。",
    "Visit Office Power": "前往 Office Power",
    "Collaborative AI page builder": "協作式 AI 網頁生成工具",
    "Production HTML from a plain-language message": "一句話生成可上線的 HTML",
    "An MCP server with every page": "每個頁面都自帶 MCP 服務",
    "Monaco editor - the whole team, live": "Monaco 編輯器，全團隊即時協作",
    "Describe your page like you're texting a colleague - NOVA writes it while you watch, spins up an MCP interface for AI agents, and your whole team edits together in real time.":
      "像傳訊息給同事一樣描述你要的頁面，NOVA 當場就寫出來，替 AI agent 開好 MCP 介面，整個團隊還能即時一起編輯。",
    "Visit NOVA": "前往 NOVA",

    /* case studies */
    "Work that": "作品",
    "speaks for itself": "自己會說話",
    "Real projects, really shipped. A few of our favorites.":
      "真實的專案，真的上線了。這是我們的幾個代表作。",
    "Machine-learning bike fitting that dials in every rider's perfect position.":
      "以機器學習調校，為每位騎士找到最合適的騎乘姿勢。",
    "A secure AWS data lake turning factory data into business intelligence.":
      "安全的 AWS 資料湖，把工廠數據變成商業決策依據。",
    "A mobile companion connecting FLIR's specialized sensors in one live view.":
      "行動裝置整合 FLIR 專業感測器，一個畫面即時掌握。",
    "Automated shipment tracking with real-time status from global carriers.":
      "自動化貨況追蹤，即時掌握全球承運商的最新狀態。",
    "A global customization platform for made-to-order bicycles, from paint styles to parts.":
      "全球客製化自行車平台，從烤漆樣式到零件一次搞定。",
    "One consumer identity across services, with secure multi-login.":
      "跨服務的單一消費者身分，安全支援多種登入方式。",
    "Fitness & Health": "健康運動",
    "Data": "數據",
    "Platform": "平台",
    "Digital Sensors": "數位感測",
    "Logistics": "物流",
    "Web": "網頁",
    "Commerce": "電商",
    "Consumer Platform": "消費者平台",

    /* culture + footer sections shared with the case pages */
    "Good coffee ☕": "好咖啡 ☕",
    "Hybrid work": "混合辦公",
    "Team outings 🌴": "團隊旅遊 🌴",
    "High": "高度",
    "freedom,": "自由，",
    "high": "高度",
    "responsibility": "當責",
    "The best work comes from people who own their craft, in the office or remote.":
      "最好的作品來自真正掌握自己專業的人，在辦公室或遠端都一樣。",
    "Join our team": "加入我們",
    "More case studies": "更多案例",
    "Our works": "更多案例",
    "We design systems and experiences that elevate how people connect, work, and grow.":
      "我們設計的系統與體驗，讓人們的連結、工作與成長更進一步。",
  };

  /* Chinese sets no space between words, but the markup carries English word
     spaces between inline spans (e.g. "High freedom, high responsibility").
     Collapse only the gaps that land between two CJK characters - the spaces
     around Latin runs like "AI 平台" must stay. */
  const CJK = /[\u2E80-\u9FFF\u3000-\u303F\uFF00-\uFFEF]/;
  let gapNodes = null;
  function collectGaps() {
    if (gapNodes) return gapNodes;
    const all = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (SKIP.test(n.parentNode.nodeName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    let n;
    while ((n = walk.nextNode())) all.push(n);
    gapNodes = [];
    all.forEach((node, i) => {
      if (node.nodeValue !== " " && !/^\s+$/.test(node.nodeValue)) return;
      let prev = null, next = null;
      for (let j = i - 1; j >= 0 && !prev; j--) if (all[j].nodeValue.trim()) prev = all[j].nodeValue.trim();
      for (let j = i + 1; j < all.length && !next; j++) if (all[j].nodeValue.trim()) next = all[j].nodeValue.trim();
      if (prev && next) gapNodes.push({ node, en: node.nodeValue, prev: () => prev, next: () => next });
    });
    return gapNodes;
  }
  function gaps(lang) {
    collectGaps().forEach((g) => {
      if (lang !== "tc") { g.node.nodeValue = g.en; return; }
      /* re-read live text: the neighbours have just been translated */
      const before = prevChar(g.node), after = nextChar(g.node);
      g.node.nodeValue = CJK.test(before) && CJK.test(after) ? "" : g.en;
    });
  }
  function prevChar(node) {
    let el = node;
    while (el) {
      let p = el.previousSibling;
      while (p) {
        const t = p.textContent;
        if (t && t.trim()) return t.trim().slice(-1);
        p = p.previousSibling;
      }
      el = el.parentNode === document.body ? null : el.parentNode;
    }
    return "";
  }
  function nextChar(node) {
    let el = node;
    while (el) {
      let p = el.nextSibling;
      while (p) {
        const t = p.textContent;
        if (t && t.trim()) return t.trim()[0];
        p = p.nextSibling;
      }
      el = el.parentNode === document.body ? null : el.parentNode;
    }
    return "";
  }

  const KEY = "bct-lang";
  const SKIP = /^(SCRIPT|STYLE|NOSCRIPT|CODE|PRE)$/;

  /* collect every text node once, remembering the English original */
  let nodes = null;
  function collect() {
    if (nodes) return nodes;
    nodes = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (SKIP.test(n.parentNode.nodeName)) return NodeFilter.FILTER_REJECT;
        if (n.parentNode.closest("[data-noi18n]")) return NodeFilter.FILTER_REJECT;
        return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    let n;
    while ((n = walk.nextNode())) {
      const key = n.nodeValue.trim();
      /* data-tc on the parent overrides the dictionary for that element's own
         first text node - for phrases that read differently in a heading than
         they do in the nav (e.g. "Products") */
      const host = n.parentElement;
      const override =
        host && host.dataset.tc && host.firstChild === n ? host.dataset.tc : null;
      if (override) nodes.push({ node: n, en: n.nodeValue, whole: override });
      else if (TC[key]) nodes.push({ node: n, en: n.nodeValue, key, tc: TC[key] });
    }
    return nodes;
  }

  function apply(lang) {
    collect().forEach(({ node, en, key, tc, whole }) => {
      node.nodeValue = lang !== "tc" ? en : whole !== undefined ? whole : en.replace(key, tc);
    });
    gaps(lang);
    document.documentElement.lang = lang === "tc" ? "zh-Hant" : "en";
    document.querySelectorAll(".langsw button").forEach((b) =>
      b.setAttribute("aria-current", b.dataset.lang === lang ? "true" : "false")
    );
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  function build() {
    document.querySelectorAll(".langsw").forEach((host) => {
      if (host.dataset.built) return;
      host.dataset.built = "1";
      host.innerHTML =
        '<button type="button" data-lang="en">EN</button>' +
        '<span aria-hidden="true">|</span>' +
        '<button type="button" data-lang="tc">TC</button>';
      host.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (b) apply(b.dataset.lang);
      });
    });
  }

  function start() {
    build();
    let saved = "en";
    try { saved = localStorage.getItem(KEY) || "en"; } catch (e) {}
    apply(saved);
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", start);
  else start();
})();
