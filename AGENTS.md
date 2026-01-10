# AGENTS.md for kdan-luck-lottery
本文件為 kdan-luck-lottery 專案協作代理人指引。
請於本倉庫根目錄下所有文件遵循此規範，並於工具鏈變更時負責任地更新內容。
目前本專案未有 Cursor 或 Copilot 指令文件。

## 建構、開發、檢查與測試指令
- 優先使用套件管理器：`npm`（已存在 package-lock）；除非必要請勿與 `yarn` 混用。
- 啟動開發伺服器：`npm run dev`（Next.js 熱重載，網址 http://localhost:3000）。
- 生產環境建構：`npm run build`。
- 建構後啟動生產伺服器：`npm run start`。
- 靜態匯出（如有需要）：`npm run export`（會先執行 `next build` 再 `next export`）。
- 全專案檢查程式碼風格：`npm run lint`（Next.js + `next/core-web-vitals` 規則）。
- 測試套件：目前未配置自動化測試；如需測試請自行加入 Jest/RTL 或 Playwright。
- 在測試工具尚未加入前，請以 `npm run lint` 與手動操作驗證修改內容。
- 單一測試（加入 Jest 後）：`npm test -- --watch -- test-name-pattern` 或 `npm test -- <file or pattern>`。
- 若加入 Playwright，單一測試建議使用 `npx playwright test path/to/spec.ts`。

## 執行環境、框架與結構
- 框架：Next.js 13.1 搭配 React 18，採用 `pages/` 目錄（未使用 app router）。
- 狀態管理：Redux Toolkit，store 於 `store.js`，唯一 slice 為 `slice/mainSlice.js`。
- 樣式：`styled-components` 並搭配 `babel-plugin-styled-components`；主題已於 `_app.jsx` 建立 scaffold。
- 動畫：已安裝 GSAP，相依組件部分註解但需維持相容性。
- 資源：靜態檔案存放於 `public/`（如 `kdan_dream_team.png`）。
- 工具方法：共用輔助函式於 `utility/index.js`（shuffle、複製剪貼簿、reduceArray、平滑捲動）。
- 元件：UI 分布於 `components/`（Rocket、Winner、NameList、HelpButton 等）。
- 頁面：`_app.jsx`、`_document.jsx`、`index.jsx` 為主要進入點。
- 型別支援：有 `tsconfig.json` 且開啟 `allowJs`；現有程式碼以 JavaScript 為主。

## 相依與環境說明
- Node 版本：Next 13 相容於 Node 16+（不確定時請用 LTS）。
- 請勿修改 `node_modules`；依賴管理僅透過 `package.json` 與 `package-lock.json`。
- 請勿新增全域套件；如需工具請用 `npx`。
- 新增依賴時，請與現有主要版本一致，除非有意升級。
- 若擴充 styled-components，伺服端渲染需 classnames 時請確認 Babel plugin 已正確設定。
- ESLint 設定繼承 `next/core-web-vitals`；如需額外規則請於 `.eslintrc.json` 增加，不建議單檔案停用。

## 程式碼檢查、格式化與慣例
- 發布變更前請以 `npm run lint` 執行 ESLint 並盡量修正警告。
- 未有 Prettier 設定；請遵循現有風格：兩空格縮排、分號、單引號。
- 陣列/物件等結尾逗號請與周邊程式碼一致。
- 行寬建議維持約 100-120 字元內；JSX 屬性過長時請分行書寫。
- 箭頭函式盡量明確 return 並加上大括號；JSX 區塊避免過度簡寫。
- 優先使用 `const`；僅於需重新賦值（如迴圈、可變陣列）時用 `let`。
- 請避免 `var`；編輯舊程式段落時可同步調整。
- JSX 空標籤請自閉合；多行屬性分行書寫。
- 請勿全域停用 ESLint 規則；如需區域停用請附上簡短原因註解。

## 匯入規則
- 匯入順序：外部套件優先，再絕對/別名路徑（目前未定義），最後相對路徑；各群組間空一行。
- 有命名匯出請解構使用（如 `{ useSelector }`）；元件/自訂 hook 可用預設匯入。
- JS/TS/JSX/TSX 模組請省略副檔名，必要時再加上。
- 儘量避免過深相對路徑；重構時可考慮 index 檔案。
- 請勿在元件、工具、slice 間產生循環匯入。
- 新增 TypeScript 型別時請用 `import type` 避免影響執行時。

## React 與 Next.js 實作模式
- 請使用函式型元件，避免類別元件。
- 元件定義請置於檔案本地，若僅有一主元件請預設匯出。
- Hook：React hook 請於元件最上層呼叫；自訂 hook 請放於同資料夾（如 `NameList/useUndoKey`）。
- 記憶體優化：僅於確有 rerender 性能瓶頸時引入 `useMemo`/`useCallback`，並正確維護依賴陣列。
- 事件處理：建議於 JSX 上方定義箭頭函式，避免於渲染迴圈中直接宣告匿名函式。
- Redux 狀態請以 `useSelector` 取得，避免手動傳遞 store。
- 副作用（如計時器、監聽器）請置於 `useEffect`，並正確撰寫清除函式與依賴陣列。
- 外部 script 請用 `next/script` 注入（如 `index.jsx`）。
- 頁面標頭請用 `next/head` 管理；`_document.jsx` 僅處理結構、字型、meta 標籤。

## Redux Toolkit 使用原則
- slice 位置為 `slice/mainSlice.js`；請使用產生的 action（如 `setActive`、`setOpened`、`undoLottery`）。
- 狀態更新由 Immer 處理，reducer 內可直接賦值，但請勿於 reducer 外變動巢狀物件。
- 新增 reducer 時請用具體命名（如 `setX`、`toggleY`、`addItem`），避免模糊動詞。
- 請於 selector 派生資料，避免儲存重複值。
- 初始狀態請保持簡潔且可序列化，勿於 Redux 儲存不可序列化資料（如 DOM 節點、class 實例）。
- 非同步邏輯建議用 RTK thunk 或 middleware；目前尚未使用，若需新增請謹慎設計並加型別。

## Styled-components 與 UI 準則
- styled-components 請盡量與使用處同檔案，命名採 PascalCase。
- 新增 UI 時請優先用主題 token（見 `_app.jsx` 主題 scaffold），避免硬編碼色值。
- 動態樣式建議用 CSS-in-JS 屬性，除非需動態計算才用 inline style。
- 請維持響應式設計，除非既有設計已限定高度。
- 新增動畫時請確保降級體驗良好，避免過度耗 GPU 造成效能問題。
- 輔助性請注意：按鈕須可聚焦，適當使用語意標籤。

## 資料處理與工具
- 請優先使用 `utility/index.js` 內輔助函式：`shuffle`、`copyTextToClipboard`、`reduceArray`、`smoothScrollTo`。
- 避免重複實作工具邏輯，若有共用需求請擴充 utilities。
- 剪貼簿操作請妥善處理無 `navigator.clipboard` 的瀏覽器（已有 fallback）。
- 調整隨機抽選邏輯時，請維持公平性（均勻分布）。
- 時間資料以 ISO 字串儲存，顯示時請用 `toLocaleString`（見 NameList）。

## 錯誤處理與用戶訊息
- 應用目前以 `alert`/`confirm` 作為用戶提示，訊息請保持簡潔且本地化（本專案以中文為主）。
- 用戶操作請加防呆：如抽獎前檢查名單是否為空、數值輸入須驗證（如抽出數量 >= 1）。
- 非預期錯誤請記錄於 console 以利除錯，生產路徑避免多餘 log。
- 控制流程建議提前 return 處理無效狀態。
- 新增非同步呼叫時，請用 try/catch 並將可操作訊息回饋給用戶。

## 命名慣例
- 元件與 styled wrapper：PascalCase（如 `WinnerContainer`、`GoButton`）。
- 函式、hook、工具：camelCase（如 `handleSubmit`、`shuffle`、`smoothScrollTo`）。
- Redux action：現在式動詞（如 `setActive`、`undoLottery`）。
- 檔案/資料夾：現有程式碼混用 PascalCase 元件資料夾與 camelCase 工具，新增時請依區域慣例。
- 除短期索引外避免一字母變數，優先用具體名稱（如 `currentPrize`、`isAnimating`）。

## 型別與 TypeScript 立場
- 目前以 JS 為主語言，已啟用 `allowJs`，未開啟 `strict`。
- 新增 TS 檔案時請明確定義 interface/type，避免使用 `any`；雖未開 strict 仍請注意 `noImplicitAny`。
- 型別僅匯入時請用 type-only import，避免增加 bundle。
- 若於 TS 實作 React 元件請型別化 props；JS 檔案則以註解或 JSDoc 說明非明顯型別。
- 請勿於同一符號混用預設與命名匯出，請擇一。

## 無障礙與使用體驗
- 互動元件須可鍵盤操作；無文字按鈕請加 aria-label。
- 新增遮罩/彈窗（如 Winner 遮罩）時請妥善管理焦點、還原捲動位置。
- 破壞性操作須提供復原/確認機制（NameList 已有 confirm 範例）。
- 色彩對比須充足；除非新增主題 token，請沿用現有深色/紅色主題。

## 效能與渲染
- 衍生值請於渲染外處理，避免不必要 re-render。
- 費時事件處理（如 scroll/resize）請先 debounce 或 throttle。
- 長列表建議虛擬化；現有列表規模小，避免過早引入複雜方案。

## 檔案組織與編輯
- 共用邏輯請放於 `utility/`；僅頁面用輔助可留於該頁面元件旁。
- 元件專屬 hook 請與元件同目錄（如 `NameList/useUndoKey.js`）。
- 主要元件請預設匯出；多工具共用檔案請用命名匯出。
- `_app.jsx` 僅作全域 provider（Redux、ThemeProvider、GlobalStyle）用途，避免功能邏輯。
- `_document.jsx` 僅處理結構、字型、meta 標籤，請勿於此取用資料。

## 測試指引（未來規劃）
- 新增測試時，請將單元測試與原始碼同目錄或置於 `__tests__/`，檔名以 `.test.(js|ts)x` 結尾。
- Jest + RTL：安裝 `jest`、`@testing-library/react`、`@testing-library/jest-dom`，並新增 `"test": "jest"` 指令。
- 執行全部測試（未來）：`npm test`。
- 執行單一測試檔（未來）：`npm test -- path/to/file.test.tsx`。
- 執行單一測試名稱（未來）：`npm test -- --watch --testNamePattern="pattern"`。
- Playwright e2e：新增 `playwright.config.ts`；單一規格：`npx playwright test tests/example.spec.ts`。
- 新增測試工具後請即時更新本文件指令。

## 本地開發小技巧
- 編輯 styled-components 時請保持 dev server 執行以即時看到熱重載樣式。
- Redux 狀態需能正確重置；互動測試時可多用 `undoLottery` 還原中獎名單。
- 調整動畫時請測試 `isAnimating` 為 true/false 兩種情境。

## 更新本文件時
- 長度請維持約 150 行，新增指引務必簡明扼要。
- 新增腳本、工具或模式後請即時反映於此文件。
- 保持章節結構，方便未來協作者快速查閱。
- 若日後有 Cursor 或 Copilot 規則，請於此註明。
- 重大更新請於 commit message 記錄時間，勿於文件內標註。
