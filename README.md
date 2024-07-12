Kdan 抽獎系統

## 介紹
這是一個抽獎系統，可以讓用戶自行設定獎項與抽出的數量

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## 部署

目前是部署在 Roy 自己的 vercel 雲端平台上
[http://lottery-fawn.vercel.app](http://lottery-fawn.vercel.app)

## 功能
* 新增獎項
  字串並用半形comma做分隔，例：王大明,李大頭
* 設定單次抽獎數量
* 剔除中獎者
  中獎名單裡若已有相同項目被抽出，在下一次抽獎時將不會被抽出
* 顯示得獎名單
* 刪除得獎名單
* 複製得獎名單