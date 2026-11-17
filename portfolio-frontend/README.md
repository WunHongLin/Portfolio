# 霧陶暖棕・個人作品集前端（Next.js）

這是一套根據提供的視覺稿編寫的**可執行前端專案**：繁體中文、霧陶暖棕配色、Hero / 個人介紹 / 作品卡片輪播 / 獎項時間軸 / Contact 表單 / Footer、響應式手機選單及作品詳細頁。

## Windows / VS Code 啟動

需求：Node.js 20.9+（建議 24 LTS）；npm。

在此資料夾執行：

```powershell
npm.cmd install
npm.cmd run dev
```

開啟 http://localhost:3000 。品質檢查：

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

> **已經有 `portfolio` 專案？** 建議先備份舊專案，再在獨立資料夾啟動這份完整專案，確定效果後才逐步移植，避免覆蓋先前程式碼。若要移植，主要檔案為 `src/`、`public/images/`，並安裝 `lucide-react`。請保留原專案的 Next / Tailwind 設定，避免版本衝突。

## 修改自己的資料

- `src/lib/site.ts`：姓名、角色、所在地、社群連結與 Email。
- `src/data/projects.ts`：作品清單與詳細頁內容。
- `src/data/awards.ts`：經歷／獎項時間軸內容。
- `public/images/`：替換照片，請保留檔名或同步修改程式中的路徑。
- `src/app/globals.css`：色彩、字型、細節樣式。

## 關於照片和示範資料

`public/images/` 使用先前 AI 生成的視覺稿**裁切成的攝影素材**；並非真實人像、工作經歷或得獎證明。這些圖片是為本機視覺示範而提供，因原圖為長頁面合成圖，裁切解析度有限，正式公開前請換成清晰的個人素材。所有專案及時間軸條目也都明確標為示意資料，不應當成個人履歷的真實事蹟。

## 功能範圍

- 作品卡片可用左右箭頭或觸控水平滑動；點擊進入 `/projects/[slug]`。
- Contact 僅進行前端必填／Email 格式驗證，**不傳送資料**，也不宣稱寄送成功。
- 沒有資料庫、API、後端與登入功能。
- 草寫手繪文字已移除；只保留簡潔排版和標準文字。

如果你仍要沿用既有專案，建議完成 UI 視覺比對後，再把這份當作全新設計分支來整合；先前專案的輪播問題不會因產生新檔案就自動修復。
