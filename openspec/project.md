# Project Context

## Purpose
本專案為 **Kdan 抽獎系統**（kdan-luck-lottery），是一個基於 Next.js 開發的互動式抽獎應用程式。

### 專案背景
此專案旨在解決企業活動、尾牙或社群互動中手動抽獎的繁瑣問題，提供一個自動化、公平且易用的抽獎解決方案。傳統抽獎方式需要手動記錄、容易出錯，且缺乏視覺化效果。本系統透過網頁介面提供：
- 自動化的隨機抽選機制
- 中獎者自動剔除功能，確保公平性
- 多獎項順序抽獎支援
- 即時視覺化動畫效果
- 中獎記錄與時間戳記
- 一鍵複製結果功能

### 解決的問題
1. **公平性問題**：自動剔除已中獎者，避免重複中獎
2. **效率問題**：快速設定獎項與名單，即時抽選結果
3. **記錄問題**：自動記錄中獎時間與獎項，便於後續統計
4. **體驗問題**：提供視覺化動畫與互動效果，提升活動氣氛

## Tech Stack
### 核心框架與語言
- **Next.js 13.1**：採用 `pages/` 目錄結構（未使用 app router）
- **React 18.2.0**：函式型元件為主
- **JavaScript**：主要開發語言（TypeScript 支援但未強制使用）

### 狀態管理
- **Redux Toolkit 1.9.1**：集中式狀態管理
- **react-redux 8.0.5**：React 與 Redux 整合

### 樣式與動畫
- **styled-components 5.3.6**：CSS-in-JS 樣式方案
- **babel-plugin-styled-components 2.0.7**：SSR 支援
- **GSAP 3.12.4**：動畫庫（部分元件使用）

### 開發工具
- **TypeScript 4.9.4**：型別支援（`allowJs` 模式）
- **ESLint 8.30.0**：程式碼檢查（繼承 `next/core-web-vitals`）
- **@next/font 13.1.1**：字型優化

### 部署
- **Vercel**：生產環境部署平台

## Project Conventions

### Code Style
#### 命名規則
- **元件與 styled wrapper**：PascalCase（如 `WinnerContainer`、`GoButton`）
- **函式、hook、工具**：camelCase（如 `handleSubmit`、`shuffle`、`smoothScrollTo`）
- **Redux action**：現在式動詞（如 `setActive`、`undoLottery`）
- **檔案/資料夾**：依區域慣例，元件資料夾使用 PascalCase，工具使用 camelCase
- **變數**：避免一字母變數，使用具體名稱（如 `currentPrize`、`isAnimating`）

#### 程式碼格式
- **縮排**：兩空格
- **分號**：使用分號
- **引號**：單引號
- **行寬**：建議 100-120 字元
- **結尾逗號**：與周邊程式碼一致
- **箭頭函式**：明確 return 並加上大括號
- **優先使用 `const`**：僅需重新賦值時用 `let`，避免 `var`

#### 匯入規則
- **順序**：外部套件 → 絕對/別名路徑 → 相對路徑（各群組間空一行）
- **命名匯出**：使用解構（如 `{ useSelector }`）
- **預設匯出**：元件/自訂 hook 可用預設匯入
- **副檔名**：JS/TS/JSX/TSX 模組省略副檔名
- **避免循環匯入**

### Architecture Patterns
#### React 與 Next.js
- **函式型元件**：避免類別元件
- **Hook 使用**：React hook 於元件最上層呼叫
- **狀態管理**：Redux 狀態以 `useSelector` 取得，避免手動傳遞 store
- **副作用**：計時器、監聽器置於 `useEffect`，正確撰寫清除函式
- **外部 script**：使用 `next/script` 注入
- **頁面標頭**：使用 `next/head` 管理

#### Redux Toolkit
- **Slice 位置**：`slice/mainSlice.js`
- **狀態更新**：由 Immer 處理，reducer 內可直接賦值
- **Action 命名**：具體命名（如 `setX`、`toggleY`、`addItem`）
- **初始狀態**：保持簡潔且可序列化

#### Styled-components
- **命名**：PascalCase，與使用處同檔案
- **主題**：優先使用主題 token（見 `_app.jsx`），避免硬編碼色值
- **動態樣式**：使用 CSS-in-JS 屬性，必要時才用 inline style

#### 檔案組織
- **共用邏輯**：`utility/` 目錄
- **元件專屬 hook**：與元件同目錄（如 `NameList/useUndoKey.js`）
- **主要元件**：預設匯出
- **工具函式**：命名匯出

### Testing Strategy
目前專案尚未配置自動化測試工具。未來規劃：
- **單元測試**：Jest + React Testing Library
- **E2E 測試**：Playwright（如需要）
- **測試位置**：與原始碼同目錄或 `__tests__/`，檔名以 `.test.(js|ts)x` 結尾
- **目前驗證方式**：`npm run lint` + 手動操作驗證

### Git Workflow
#### Branch 策略
- **主分支**：`main`（生產環境）
- **功能分支**：`feature-*` 或 `feat-*`（如 `feature-2025-year-end`、`feat-dialog`）
- **命名慣例**：使用 kebab-case，描述性名稱

#### Commit 規範
- **格式**：建議使用語意化 commit 訊息
- **常見前綴**：
  - `feat:`：新功能
  - `update:` 或 `fix:`：更新或修復
  - `refactor:`：重構
  - `docs:`：文件更新
- **範例**：
  - `feat: enhance dialog component with styled elements`
  - `update(NameList): default value`
  - `Refactor prize logic to support sequential prize queue`
  - `Add collaboration guideline and update visuals and defaults`
- **訊息語言**：中文或英文皆可，保持一致性
- **重大更新**：於 commit message 記錄時間與變更重點

## Domain Context
### 抽獎系統核心概念
- **獎項佇列（Prize Queue）**：支援多個獎項依序抽選，每個獎項可設定名稱與抽出數量
- **抽獎名單（Lottery List）**：參與抽獎的人員名單，支援逗號分隔輸入
- **中獎名單（Winner List）**：記錄每輪抽出的中獎者，包含獎項 ID、名稱、時間戳記
- **中獎剔除（Remove Duplicated）**：選項，啟用後已中獎者不會再次被抽中
- **復原機制（Undo）**：支援 Ctrl+Z / Cmd+Z 復原上一輪抽獎結果

### 業務邏輯
- 抽獎前需先設定至少一個獎項
- 抽獎名單不可為空
- 當所有獎項完成後，系統會提示無法繼續抽獎
- 中獎記錄包含 ISO 時間戳記，便於後續統計與匯出

### UI/UX 特色
- 全螢幕背景圖片（`kdan_hero.png`）
- 火箭動畫效果（Rocket 元件）
- 中獎結果彈窗（Winner 元件）
- 側邊欄名單管理（NameList 元件）
- 3D 按鈕效果與動畫過渡

## Important Constraints
### 技術限制
- **Node 版本**：Next.js 13 相容於 Node 16+（建議使用 LTS 版本）
- **套件管理器**：優先使用 `npm`（已存在 `package-lock.json`），避免與 `yarn` 混用
- **型別系統**：TypeScript 已配置但未開啟 `strict` 模式，主要使用 JavaScript
- **SSR 限制**：styled-components 需透過 Babel plugin 正確處理 SSR

### 業務限制
- **語言**：主要使用中文介面與訊息
- **瀏覽器相容性**：需支援 `navigator.clipboard` API（已有 fallback 機制）
- **資料持久化**：目前為前端應用，狀態不持久化（重新整理後重置）

### 開發限制
- **程式碼風格**：需通過 ESLint 檢查（`npm run lint`）
- **匯入規則**：避免循環匯入
- **Redux 狀態**：僅儲存可序列化資料，避免 DOM 節點或 class 實例

## External Dependencies
### 外部服務
- **Vercel**：生產環境部署平台，自動化 CI/CD 流程（見 `.github/workflows/main.yml`）
- **Font Awesome**：透過 CDN 載入圖示庫（`https://kit.fontawesome.com/94b5ea6607.js`）

### 靜態資源
- **背景圖片**：`public/kdan_hero.png`、`public/kdan_dream_team.png` 等
- **品牌資源**：`public/kdan_logo.png`、`public/kdan_hero.png`

### 無外部 API
本專案為純前端應用，不依賴外部 API 或後端服務。所有功能均在瀏覽器端執行。
