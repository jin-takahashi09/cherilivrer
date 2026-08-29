# Cheri Livrer

手作りバルーン・フラワーギフトブランド **Cheri Livrer（シェリリヴレ）** の公式 Web サイトです。  
コンセプト紹介、コレクション一覧、オンラインショップ・SNS への導線を掲載しています。

---

## アプリケーション概要

Cheri Livrer は、バルーンやアーティフィシャルフラワーを用いたオリジナルギフトの制作・販売を行うアトリエの公式サイトです。

記念日や特別な日に贈るギフトの世界観を伝え、作品の魅力を分かりやすく紹介できるように制作しました。

- トップページでのブランドコンセプト・作品導線の提示
- コレクション一覧（Balloon / Flower / Season / Bridal / Photo Booth）
- About ページでのブランド・事業内容の紹介
- オンラインショップ（BASE）・LINE への導線
- SEO 対応（JSON-LD・OGP・canonical・sitemap）
- PC / スマホ対応 UI

---

## 主な機能


| 機能        | 内容                                                              |
| --------- | --------------------------------------------------------------- |
| トップページ    | ヒーロー、コンセプト、コレクション導線、オンラインショップ案内                                 |
| コレクション    | 5 カテゴリの作品を横スクロールで閲覧。各作品から BASE ショップへリンク                         |
| About     | ブランド紹介、オンラインショップ販売・オーダーメイド・フォトブース装飾の事業内容                        |
| レスポンシブ UI | スマホでは商品セクションの縦スクロール連動横スライド、モバイルメニューに対応                          |
| アニメーション   | スクロール連動のフェードイン（トップ・コレクション・About）                                |
| SEO       | ページ別の title / description、構造化データ（WebSite / Organization / 各ページ） |
| 404       | 専用の 404 ページ（`noindex` 対応）                                       |


---

## 技術スタック


| 区分      | 技術                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| フロントエンド | ![ASTRO](https://img.shields.io/badge/ASTRO-2F2F2F?style=for-the-badge&logo=astro&logoColor=BC52EE) ![TYPESCRIPT](https://img.shields.io/badge/TYPESCRIPT-2F2F2F?style=for-the-badge&logo=typescript&logoColor=3178C6) ![TAILWINDCSS](https://img.shields.io/badge/TAILWINDCSS-2F2F2F?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)                                                                  |
| 開発ツール   | ![NODE.JS](https://img.shields.io/badge/NODE.JS-2F2F2F?style=for-the-badge&logo=nodedotjs&logoColor=339933) ![NPM](https://img.shields.io/badge/NPM-2F2F2F?style=for-the-badge&logo=npm&logoColor=CB3837) ![GIT](https://img.shields.io/badge/GIT-2F2F2F?style=for-the-badge&logo=git&logoColor=F05032) ![GITHUB](https://img.shields.io/badge/GITHUB-2F2F2F?style=for-the-badge&logo=github&logoColor=white) |


---

## ローカル起動

### 前提

- Node.js **22.12.0** 以上
- npm

### 起動

```bash
npm install
npm run dev
# http://localhost:4325
```

本番ビルド・プレビュー:

```bash
npm run build
npm run preview
```



### 外部リンク


| サービス      | URL                                                                              |
| --------- | -------------------------------------------------------------------------------- |
| オンラインショップ | [https://cherilivrer.base.shop](https://cherilivrer.base.shop)                   |
| Instagram | [https://www.instagram.com/cheri_livrer](https://www.instagram.com/cheri_livrer) |
| LINE      | [https://lin.ee/m3M0UIf](https://lin.ee/m3M0UIf)                                 |


