## 1. Redux State Management
- [x] 1.1 在 `slice/mainSlice.js` 的 `initialState` 中新增 `excludedWinnersList: []`
- [x] 1.2 新增 reducer `setExcludedWinnersList` 用於更新已中獎名單
- [x] 1.3 匯出新的 action creator

## 2. UI Components
- [x] 2.1 在 `components/NameList/index.jsx` 中新增 Label + textarea 輸入欄位（位於「抽獎名單」下方）
- [x] 2.2 實作 textarea 的 onChange 處理，將逗號分隔的字串轉換為陣列並更新 Redux state
- [x] 2.3 新增「已中獎名單」List 區塊（位於「抽獎名單」區塊下方）
- [x] 2.4 在「已中獎名單」區塊中新增 CopyButton，複製功能將已中獎名單以逗號分隔格式複製

## 3. Lottery Drawing Logic
- [x] 3.1 在 `pages/index.jsx` 的 `handleStartClick` 中，從 Redux state 取得 `excludedWinnersList`
- [x] 3.2 修改剔除邏輯，將 `excludedWinnersList` 與 `allWinnerList` 合併後一起剔除
- [x] 3.3 確保即使 `isRemovedDuplicated` 為 false，`excludedWinnersList` 中的人員仍會被剔除

## 4. Validation & Testing
- [x] 4.1 執行 `npm run lint` 確保程式碼風格符合規範
- [x] 4.2 手動測試：輸入已中獎名單後，驗證抽獎時這些人不會被抽中
- [x] 4.3 手動測試：驗證複製已中獎名單功能正常運作
- [x] 4.4 手動測試：驗證已中獎名單與「去除重複得獎名單」選項同時啟用時的互動
