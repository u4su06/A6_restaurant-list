# 餐廳清單
- 這個專案收集並展示我最喜歡的餐廳資訊
- 採用 Node.js 和 Express 打造
- 擴充 CRUD 功能

## 功能描述 (features)
- 主頁可觀看所有的餐廳簡介
- 可進入個別頁面觀看詳細資訊
- 可新增、修改或刪除餐廳資訊

## 環境建置(prerequisites)

### global packages
- Node.js v10.15.0
- nodemon v2.0.6
- npm v6.4.1

### local packages
- 可於專案的 `package.json` 中查閱 `dependencies` 部分。

## 安裝與執行步驟 (installation and execution)
- 以下動作需使用 terminal 或 Git Bash 指令
1. 將專案clone到本地環境
```
git clone https://github.com/u4su06/ac-assignment6_restaurant-list.git
```
2. 進入專案資料夾
```
cd A6_restaurant-list
```
3. 至 package.json 檔案裝查看需安裝的npm套件，並搭配以下指令安裝
```
npm install
```
4. 執行種子資料
```
npm run seed
```
5. 啟動伺服器，執行專案
```
npm run dev
```
6. 打開瀏覽器，在網址列輸入
```
localhost:3000
```