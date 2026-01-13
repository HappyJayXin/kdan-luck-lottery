# Change: Add Excluded Winners Input

## Why
目前系統僅支援透過「去除重複得獎名單」選項自動剔除已中獎者，但無法手動指定某些人員不參與抽獎。在實際使用場景中，可能需要預先排除某些已中獎或不符合資格的人員，即使他們仍在抽獎名單中。此功能讓使用者可以手動輸入已中獎名單（逗號分隔），確保這些人員在抽獎時被自動剔除。

## What Changes
- 新增 Redux state `excludedWinnersList` 儲存手動輸入的已中獎名單
- 在 NameList 組件中新增 Label + textarea 輸入欄位，用於輸入已中獎名單（逗號分隔格式）
- 修改抽獎邏輯，在剔除已中獎者時同時考慮手動輸入的已中獎名單
- 新增「已中獎名單」區塊顯示，提供複製功能（僅 CopyButton，不顯示完整列表）

## Impact
- Affected specs: `lottery-drawing` (new capability)
- Affected code:
  - `slice/mainSlice.js` - 新增 state 與 reducer
  - `components/NameList/index.jsx` - 新增輸入欄位與顯示區塊
  - `pages/index.jsx` - 修改抽獎邏輯
  - `utility/index.js` - 可能需要擴充工具函式（如需要）
