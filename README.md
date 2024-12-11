# Kdan 抽獎系統

## 介紹
這是一個基於 Next.js 開發的抽獎系統，可以讓用戶自行設定獎項與抽出的數量，並且具備中獎剔除等功能，適合用於企業活動、尾牙或社群互動。

此專案原始碼是從 [orange7986/lottery](https://github.com/orange7986/lottery) fork 而來，感謝原作者提供基礎功能，並在此基礎上進行擴充和部署。

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

---

## 部署

目前是部署在 Jay 自己的 Vercel 平台上：
[https://kdan-luck-lottery.vercel.app](https://kdan-luck-lottery.vercel.app)

---

## 功能

- **新增獎項**：
  用戶可以輸入獎項名稱，並使用半形逗號（`, `）分隔多個項目。例如：`王大明,李大頭`。
- **設定單次抽獎數量**：
  提供簡單的介面來設置每次抽出的名額。
- **剔除中獎者**：
  中獎名單中若已有相同項目被抽出，在下一次抽獎時將不會再被選中。
- **顯示得獎名單**：
  即時展示已抽出的得獎名單，方便查看。
- **刪除得獎名單**：
  支援一鍵清空得獎名單，重新開始抽獎。
- **複製得獎名單**：
  提供快速複製功能，方便將結果貼上到其他平台。

---

## 貢獻
感謝 [orange7986](https://github.com/orange7986) 提供原始專案。
