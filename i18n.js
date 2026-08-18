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
    "Work that": "從想法到上線，",
    "speaks for itself": "我們陪你走完",
    "Real projects, really shipped. A few of our favorites.":
      "以下是幾個從零開始、一路帶到上線的專案。",
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

    /* ---- case pages: shared nav + footer ---- */
    "About": "關於",
    "Process": "流程",
    "Global digital transformation. Delivering innovative technology since 1999.":
      "全球數位轉型，自 1999 年持續交付創新技術。",
    "AI Application": "AI 應用",
    "Company": "公司",
    "About Us": "關於我們",
    "Our Process": "服務流程",
    "Careers": "職缺",
    "Contact": "聯絡",
    "Taipei, Taiwan": "台灣・台北",
    "© 2026 BCT Taipei. All rights reserved.": "© 2026 BCT 台北。保留所有權利。",

    /* ---- fitting (Dynamic Cycling Fit) ---- */
    "Start from a tablet": "從一台平板開始",
    "Dynamic Cycling Fit (DCF) is an app designed to help cyclists optimise their bike setup for maximum comfort, efficiency, and performance, all with just a tablet.":
      "Dynamic Cycling Fit（DCF）是一款幫助騎士優化單車設定的 App，只需一台平板，就能兼顧舒適、效率與表現。",
    "AutoFit using Machine Learning": "以機器學習驅動的 AutoFit",
    "AutoFit is an innovative technology using machine learning to detect the user's joint points and calculate fitting information in real-time.":
      "AutoFit 是一項創新技術，以機器學習即時偵測使用者的關節位置，當場算出調校數據。",
    "No sweat for getting results": "結果輕鬆到手",
    "By using our technology, user data can be quickly integrated and analysed, producing real-time insights and results for more accurate experience.":
      "透過我們的技術，使用者數據能快速整合與分析，即時產出洞察與結果，體驗更精準。",
    "Design & UX": "設計與體驗",
    "How we design": "我們如何設計",
    "We focused on creating an intuitive and easy-to-use interface, ensuring that both professional technicians and first-time users can quickly get started.":
      "我們專注打造直覺易用的介面，無論是專業技師或第一次使用的人，都能快速上手。",
    "Technology": "技術",
    "Using the updated": "用最新的",
    "development strategies": "開發策略",
    "We developed DCF App that leverages machine learning technology to accurately detect the user's joint points and provide real-time posture analysis.":
      "我們開發的 DCF App 運用機器學習精準偵測關節位置，提供即時姿勢分析。",
    "Seamless experience": "無縫的調校體驗",
    "with AutoFit": "就交給 AutoFit",
    "AutoFit is an innovative technology integrates with the bicycle hardware, automatically adjusting the seat and handlebar position to achieve a fully automated fitting process.":
      "AutoFit 與自行車硬體整合，自動調整座墊與把手位置，完成全自動的調校流程。",
    "Deliver on time": "準時交付",
    "with a confident smile": "，也交付信心",
    "Voices of": "客戶的",
    "our customers": "真實回饋",
    "The BCT team showed a great balance between app development while ensuring the app was developed with real life adaptation.":
      "BCT 團隊在 App 開發與真實情境的落地之間，拿捏得恰到好處。",
    "Global Head of Digital Transformation, Giant Group": "Giant 集團全球數位轉型負責人",

    /* ---- DataLake ---- */
    "Building a": "打造",
    "Solution": "解決方案",
    "for a Large Bicycle Manufacturer": "，為大型自行車製造商而生",
    "Data Integration": "為自行車製造商",
    "for": "，",
    "Bicycle Manufacturer": "打造資料整合",
    "A large bicycle manufacturer had data scattered across ERP, MES, POS and consumer systems. We built a unified Data Lake that centralizes access, querying and analysis for better business decisions.":
      "一家大型自行車製造商的資料分散在 ERP、MES、POS 與消費者系統。我們打造了統一的 Data Lake，集中資料的存取、查詢與分析，支撐更好的商業決策。",
    "Building a Secure, Analytical Data Lake": "打造安全、可分析的 Data Lake",
    "Create a Data Lake that consolidates data from various sources.": "建立一座整併多方來源資料的 Data Lake。",
    "Provide a unified platform for data access, querying, and analysis.": "提供統一的平台，進行資料存取、查詢與分析。",
    "Offer an analytical platform compatible with analysis tools like Tableau and Power BI.":
      "提供可分析的平台，相容 Tableau、Power BI 等分析工具。",
    "Ensure data privacy and compliance.": "確保資料隱私與法規遵循。",
    "Technical Architecture": "技術架構",
    "Built on AWS, using the following services.": "以 AWS 為基礎，使用下列服務。",
    "The main storage layer, divided into three zones: Landing, Raw and Analysis.":
      "主要儲存層，分為 Landing、Raw 與 Analysis 三個區域。",
    "Used for data transformation, cleansing, and formatting to integrate data from various sources.":
      "負責資料的轉換、清理與格式化，整合各來源的資料。",
    "Runs custom scripts that de-identify data in real time as it enters the Landing Zone.":
      "執行自訂腳本，在資料進入 Landing Zone 的當下即時去識別化。",
    "Provides querying capabilities, allowing analysis tools to directly access the data within the Analysis Bucket.":
      "提供查詢能力，讓分析工具直接存取 Analysis Bucket 內的資料。",
    "Data Processing Workflow": "資料處理流程",
    "Data Ingestion": "資料匯入",
    "IT teams export data from ERP, MES, POS and consumer sources into the Landing Zone.":
      "IT 團隊將 ERP、MES、POS 與消費者來源的資料匯出至 Landing Zone。",
    "Various sources": "多方來源",
    "ETL Processing": "ETL 處理",
    "Data De-identification": "資料去識別化",
    "AWS Lambda de-identifies incoming data in real time, masking PII and converting it into anonymized identifiers.":
      "AWS Lambda 即時去識別化進入的資料，遮罩個資並轉換為匿名識別碼。",
    "Data Transformation and Integration": "資料轉換與整合",
    "AWS Glue then cleanses, formats and transforms the data before moving it to the Raw Zone.":
      "接著由 AWS Glue 清理、格式化並轉換資料，再移入 Raw Zone。",
    "Data Analysis": "資料分析",
    "Processed data lands in the Analysis Bucket, where Tableau and Power BI query it directly through Amazon Athena.":
      "處理完的資料進入 Analysis Bucket，Tableau 與 Power BI 透過 Amazon Athena 直接查詢。",
    "Enhancing Business Intelligence": "讓商業智慧更上一層",
    "through a Secure": "，靠一座安全的",
    "This solution consolidated multiple systems into one governed Data Lake: de-identified by Lambda and Glue, compliant with data-privacy regulations, and query-ready for BI tools.":
      "這套方案把多個系統整併為一座受治理的 Data Lake：由 Lambda 與 Glue 去識別化、符合資料隱私法規，並隨時可供 BI 工具查詢。",

    /* ---- eShipping ---- */
    "eShipping Tracking System": "eShipping 貨況追蹤系統",
    "Shipment Management for Efficiency": "更有效率的貨運管理",
    "Inefficiencies Cause by the Labor Intensive Processes": "人力密集流程造成的低效率",
    "Clients struggled with manually tracking large volumes of shipping documents, which was time-consuming and inefficient. The growing business made the manual approach unsustainable.":
      "客戶過去得人工追蹤大量航運文件，費時又沒效率；業務持續成長，讓人工作業難以為繼。",
    "Seamless Shipping Information Integration": "無縫整合航運資訊",
    "Effortless Tracking": "追蹤毫不費力",
    "Upload the Bill of Lading": "上傳提單",
    "Drop in scanned paper B/Ls or PDFs, no manual data entry required.":
      "掃描的紙本提單或 PDF 直接拖進來，不需要人工輸入。",
    "Scan & Auto-Extract": "掃描並自動擷取",
    "Our engine reads the document and pulls every field: BOL, carrier, container, vendor.":
      "引擎讀取文件，抓出每個欄位：提單號、承運商、貨櫃、供應商。",
    "Sync to Global Carriers": "同步全球承運商",
    "Extracted data is sent to worldwide shipping systems to fetch live shipment status.":
      "擷取的資料送往全球航運系統，取得即時貨況。",
    "Track in Transit": "航程即時追蹤",
    "As the vessel sails, the global network reports back every milestone in real time.":
      "船在海上航行時，全球網路即時回報每個里程碑。",
    "Status Updates Itself": "狀態自動更新",
    "Departure, arrival, clearance: statuses sync automatically, no one lifts a finger.":
      "出港、抵達、清關：狀態自動同步，不必任何人動手。",
    "Leveraging AWS Cloud Technologies to": "以 AWS 雲端技術",
    "Automate Shipping Management": "自動化航運管理",
    "Handles customer requests and triggers shipping data retrieval.":
      "處理客戶請求，並觸發航運資料的擷取。",
    "S3 Storage": "S3 儲存",
    "Used for storing all shipping documents and related files.": "儲存所有航運文件與相關檔案。",
    "Automatically extracts key information from the bills of lading, such as shipping numbers and dates.":
      "自動從提單擷取關鍵資訊，例如貨運編號與日期。",
    "Frontend Technology": "前端技術",
    "Built with React, providing users with a friendly interface to view real-time shipment statuses and receive instant updates.":
      "以 React 打造，提供友善介面，即時查看貨況並接收更新。",
    "Streamlined Shipment Management and": "更精簡的貨運管理",
    "Real-Time Visibility": "與即時可視化",
    "Time-Saving": "省下時間",
    "Reduces the time spent on manual tracking and minimizes human error.":
      "減少人工追蹤的時間，也把人為錯誤降到最低。",
    "Enhanced Workflow": "流程升級",
    "Simplifies operations and reduces labor dependency, offering an intuitive, transparent shipment tracking platform.":
      "簡化作業、降低人力依賴，提供直覺透明的貨況追蹤平台。",
    "Efficiency Boost": "效率躍升",
    "Clients can upload bills of lading, and the system automatically processes and provides real-time shipment updates.":
      "客戶上傳提單後，系統自動處理並提供即時貨況更新。",

    /* ---- Custom Bike ---- */
    "The Innovation Path for": "全球客製化自行車的",
    "Global Customized Bicycles": "創新之路",
    "Project Goal": "專案目標",
    "Craft Your Dream Bike": "打造你的夢想單車",
    "with Seamless Global Support": "全球支援無縫接軌",
    "Innovation": "創新",
    "Create Excellence UX Flow": "卓越的購物流程",
    "Make Shopping Enjoyable & Efficient": "讓選購愉快又有效率",
    "Real-Time Preview the Paint Styles on the bike": "即時預覽車身烤漆樣式",
    "Customized bike parts and show on the screen on real time, make user could preview the products.":
      "客製化的零件即時呈現在畫面上，讓使用者邊選邊預覽成品。",
    "Convenient Order Management Functions": "便利的訂單管理功能",
    "Allowing consumers to track the progress of their customizations at all times.":
      "消費者隨時都能掌握客製化訂單的進度。",
    "Powerful Management System": "強大的後台管理系統",
    "Streamlines the Process of": "精簡",
    "Managing Bicycle Models and Parts": "車款與零件的管理流程",
    "Efficiency of Global Orders Handling": "全球訂單的高效處理",
    "Supports Global Pricing and Logistics": "支援全球定價與物流",
    "Management": "管理",

    /* ---- Account System (gac) ---- */
    "Design and Implementation of a": "設計與實作",
    "Consumer Account System": "消費者帳號系統",
    "We created a consumer account system that centralizes user data, improves experience, offers multiple logins, and ensures secure integration.":
      "我們打造了消費者帳號系統：集中使用者資料、改善體驗、支援多種登入方式，並確保整合安全。",
    "Building a Secure, Multi-Login Consumer Account System": "打造安全、支援多重登入的消費者帳號系統",
    "To establish a robust and secure consumer account system that supports multiple login methods and centralizes user data management. The system must adhere to industry-standard authentication protocols to enable seamless integration with other systems.":
      "建立一套穩健安全的消費者帳號系統，支援多種登入方式並集中管理使用者資料。系統遵循業界標準的驗證協定，能與其他系統無縫整合。",
    "User Count": "使用者數",
    "Supported Nations": "支援國家",
    "Rating": "評分",
    "Advanced Features": "進階功能",
    "Advanced Features of Our": "完整帳號系統的",
    "Comprehensive User Account System": "進階功能",
    "Multiple Login Methods": "多種登入方式",
    "Supports traditional login and integrates with social login options like Facebook, Google, LINE, and Apple ID to enhance user convenience.":
      "支援傳統帳密登入，並整合 Facebook、Google、LINE、Apple ID 等社群登入，使用更方便。",
    "Unique Identifier": "唯一識別碼",
    "Each user is assigned a unique identifier upon registration, used for subsequent data binding and operations.":
      "每位使用者註冊時取得唯一識別碼，作為後續資料綁定與操作的依據。",
    "Protocol Compliance": "協定遵循",
    "Adheres to OAuth and OpenID Connect (OIDC) protocols for secure and standardized authentication, while leveraging OIDC for secure system integration and data exchange.":
      "遵循 OAuth 與 OpenID Connect（OIDC）協定，驗證安全且標準化，並以 OIDC 進行安全的系統整合與資料交換。",
    "User Data Management": "使用者資料管理",
    "Manages and securely stores personal data, including name, phone number, and physical information, ensuring privacy protection and sharing only under authorized conditions.":
      "管理並安全儲存姓名、電話、身體數據等個資，確保隱私保護，僅在授權情況下分享。",
    "Future-Ready Integration": "面向未來的整合",
    "Future-Ready Integration:": "面向未來的整合：",
    "Centralizing Identity Management": "集中化的身分管理",
    "Across Services": "，橫跨所有服務",
    "This account system will serve as the core identity management platform for other services, allowing for integration with multiple external systems in the future to provide unified authentication and user data management.":
      "這套帳號系統將成為其他服務的核心身分管理平台，未來可與多個外部系統整合，提供統一的驗證與使用者資料管理。",

    /* ---- FLIR ---- */
    "Seamless Connectivity": "無縫連接",
    "for Your": "你的",
    "Specialized": "專業",
    "Sensors": "感測器",
    "A mobile companion connecting FLIR's environmental sensors to real-time monitoring, intelligent alarms, and custom PDF reports over a proprietary Bluetooth protocol.":
      "一款行動裝置上的好夥伴：以專屬藍牙協定連接 FLIR 環境感測器，提供即時監控、智慧警報與客製 PDF 報告。",
    "App Develop": "App 開發",
    "Real-time Data": "即時數據",
    "Our Mission": "我們的任務",
    "What We Built for FLIR": "我們為 FLIR 打造了什麼",
    "Remote Monitoring": "遠端監控",
    "Monitor from a safe distance": "保持安全距離監測",
    "Technicians can remotely monitor a variety of environmental conditions from outside unsafe or difficult to reach areas.":
      "技術人員能在危險或難以進入的區域之外，遠端監控各種環境條件。",
    "Capture Data": "擷取數據",
    "Record, analyse, and share": "記錄、分析、分享",
    "Collect measurement data for displaying trend and further analysis as well as sharing findings with others.":
      "收集量測數據，呈現趨勢、深入分析，也能與他人分享發現。",
    "Service Concept": "服務概念",
    "One App · Every Meter · Real‑Time": "一個 App・每台儀器・即時同步",
    "Remote connection &": "遠端連線與",
    "Real time monitoring": "即時監控",
    "Allow multiple and different meters to connect through FLIR's BT protocol. Display live readings from all devices simultaneously on a single screen, from a safe distance.":
      "透過 FLIR 藍牙協定連接多台不同儀器，在安全距離外，把所有裝置的即時讀數同時呈現在同一個畫面。",
    "Display trends &": "趨勢圖表與",
    "Custom report": "客製報告",
    "Graphical and numerical representation of all measurement data. Generate detailed custom PDF reports with user-defined information, timestamps, and alarm records.":
      "所有量測數據以圖表與數值呈現，並能產出含自訂資訊、時間戳與警報紀錄的詳細 PDF 報告。",
    "Features": "功能",
    "Enable alarms.": "設定警報。",
    "Return to live view.": "回到即時畫面。",
    "Select any connected device and configure its high and low alarm thresholds. Toggle the alarm on and tap back to return to the live dashboard. Your settings are saved instantly.":
      "選擇任一已連接的裝置，設定高低警報門檻。開啟警報後點返回，即可回到即時儀表板，設定即刻儲存。",
    "All meters.": "所有儀器，",
    "One live screen.": "同一個畫面。",
    "Watch Humidity and Sound Level values shift in real-time as conditions change. When a reading demands a closer look, tap its card to drill into the full measurement detail.":
      "看著濕度與音量數值隨環境即時變動；需要細看時，點卡片即可進入完整的量測細節。",
    "Tap any point.": "點任一數據點，",
    "See the exact moment.": "看見那一刻。",
    "The detail view renders a full measurement graph with alarm threshold lines. Switch to light mode for bright environments, or export a timestamped PDF report directly from the app.":
      "細節頁呈現完整量測圖表與警報門檻線。亮處可切換淺色模式，也能直接從 App 匯出含時間戳的 PDF 報告。",
    "High efficiency and quick response, also has good quality output. Great communication and knowledge about mobile app launches. Very patient team willing to work through challenges.":
      "高效率、快速回應，產出品質也好。溝通順暢，對行動應用上架的知識充足，團隊非常有耐心，願意一起解決挑戰。",
    "– Vernis Yang, Director R&D": "– Vernis Yang，研發總監",
    "downloads": "次下載",
    "Ratings of": "評分",
    "/ 5 on Play & App Stores": "/ 5・雙平台商店",
  };

  const KEY = "bct-lang";
  const SKIP = /^(SCRIPT|STYLE|NOSCRIPT|CODE|PRE)$/;
  /* CJK characters incl. fullwidth punctuation */
  const CJK = /[\u2E80-\u9FFF\u3000-\u303F\uFF00-\uFFEF\u2018-\u201D\u00B7]/;
  const PUNCT_AFTER = /[\s]+(?=[，。：、；！？）」』・])/g;

  /* Collect every text node once, in document order, remembering originals.
     A node is translatable if its whitespace-normalized text matches the
     dictionary, or its parent carries data-tc (whole-node override). */
  let nodes = null;
  function collect() {
    if (nodes) return nodes;
    nodes = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (SKIP.test(n.parentNode.nodeName)) return NodeFilter.FILTER_REJECT;
        if (n.parentNode.closest("[data-noi18n]")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    let n;
    while ((n = walk.nextNode())) {
      const orig = n.nodeValue;
      const key = orig.trim().replace(/\s+/g, " ");
      const host = n.parentElement;
      const override =
        host && host.dataset.tc && host.firstChild === n && key ? host.dataset.tc : null;
      /* a neighbouring text-less element (e.g. the services card-deck slot)
         still occupies width - whitespace beside it must survive collapsing */
      const g = (el) => !!(el && el.nodeType === 1 && !el.textContent.trim());
      nodes.push({ node: n, orig, tc: override || (key && TC[key]) || null,
        gBefore: g(n.previousSibling), gAfter: g(n.nextSibling) });
    }
    return nodes;
  }

  function apply(lang) {
    const list = collect();
    if (lang !== "tc") {
      list.forEach((e) => { e.node.nodeValue = e.orig; });
    } else {
      /* 1. whole-node swaps, preserving each node's own surrounding whitespace */
      list.forEach((e) => {
        if (!e.tc) { e.node.nodeValue = e.orig; return; }
        const lead = e.orig.match(/^\s*/)[0], trail = e.orig.match(/\s*$/)[0];
        e.node.nodeValue = lead + e.tc + trail;
      });
      /* 2. no space ever sits before fullwidth punctuation */
      list.forEach((e) => {
        if (PUNCT_AFTER.test(e.node.nodeValue))
          e.node.nodeValue = e.node.nodeValue.replace(PUNCT_AFTER, "");
      });
      /* 3. collapse whitespace runs BETWEEN two CJK characters, wherever the
         whitespace lives (a node's tail, whitespace-only nodes, the next
         node's head). Runs beside Latin (AI 平台) are kept. */
      let anchorIdx = -1, anchorChar = "";
      const between = [];
      const flush = (nextIdx, nextChar) => {
        const guarded =
          list[anchorIdx] && (list[anchorIdx].gAfter || list[nextIdx].gBefore ||
          between.some((k) => list[k].gBefore || list[k].gAfter));
        if (anchorIdx >= 0 && !guarded && CJK.test(anchorChar) && CJK.test(nextChar)) {
          const a = list[anchorIdx];
          a.node.nodeValue = a.node.nodeValue.replace(/\s+$/, "");
          between.forEach((k) => { list[k].node.nodeValue = ""; });
          const b = list[nextIdx];
          b.node.nodeValue = b.node.nodeValue.replace(/^\s+/, "");
        }
        between.length = 0;
      };
      list.forEach((e, i) => {
        const v = e.node.nodeValue;
        if (!v.trim()) { if (anchorIdx >= 0) between.push(i); return; }
        const first = v.trim()[0];
        flush(i, first);
        anchorIdx = i; anchorChar = v.trim().slice(-1);
      });
    }
    document.documentElement.lang = lang === "tc" ? "zh-Hant" : "en";
    document.querySelectorAll(".langsw button").forEach((b) =>
      b.setAttribute("aria-current", b.dataset.lang === lang ? "true" : "false")
    );
    /* text reflow moves anything positioned from measured rects (the services
       card deck, pinned scenes) - let those recompute on the next frame */
    requestAnimationFrame(() => {
      dispatchEvent(new Event("resize"));
      dispatchEvent(new Event("scroll"));
    });
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
