# Task Board

## プロジェクト概要

タスク管理ボードアプリケーション。

## Git 運用ルール

### 基本方針
- コードを変更するたびに、必ず GitHub にプッシュすること
- コミットとプッシュはセットで行う

### ワークフロー
1. コードを変更する
2. 変更内容を確認: `git diff`
3. ステージング: `git add <ファイル名>`（`git add -A` は使わない）
4. コミット: わかりやすいメッセージでコミット
5. プッシュ: `git push origin <ブランチ名>`

### コミットメッセージ規則
- 変更の「なぜ」を中心に書く
- 短く明確に（1〜2文）
- プレフィックス例:
  - `feat:` 新機能追加
  - `fix:` バグ修正
  - `refactor:` リファクタリング
  - `docs:` ドキュメント変更
  - `test:` テスト追加・修正

### ブランチ戦略
- `main`: 本番相当の安定ブランチ
- `feature/<名前>`: 機能開発ブランチ
- 直接 `main` へのプッシュは避け、Pull Request を使う

### 注意事項
- `.env` などの機密情報を含むファイルはコミットしない
- `git push --force` は原則禁止（共有ブランチへの force push は厳禁）
- コミット前にテストが通ることを確認する

## デプロイ先

- **本番 URL**: https://carecreate-tech.github.io/task_board/
- **デプロイ方法**: `main` ブランチへのプッシュで GitHub Actions が自動ビルド・デプロイ
- **ワークフロー**: `.github/workflows/deploy.yml`

## 技術スタック

| 用途 | 技術 |
|------|------|
| UI フレームワーク | React 18 |
| ビルドツール | Vite 6 |
| 言語 | JavaScript (JSX) |
| スタイリング | Plain CSS (BEM) |
| 状態管理 | React useState / useEffect |
| 永続化 | localStorage |
| ホスティング | GitHub Pages |
| CI/CD | GitHub Actions |

## コンポーネント命名規約

### ファイル・コンポーネント名
- コンポーネントファイルは **PascalCase**: `TaskBoard.jsx`, `TaskItem.jsx`
- CSS ファイルはコンポーネントと同名: `TaskBoard.css`
- 配置先: `src/components/`

### CSS クラス名（BEM）
- **Block**: コンポーネント名をケバブケースで `board`, `task-item`
- **Element**: `block__element` 形式 `board__title`, `task-item__text`
- **Modifier**: `block--modifier` 形式 `task-item--done`

### その他
- ローカルストレージのキーは `task-board-<用途>` 形式: `task-board-tasks`
- イベントハンドラは `handle<Event>` 形式: `handleAdd`, `handleKeyDown`

## コーディング規則

- コメントは「なぜ」が自明でない場合のみ記述する
- セキュリティ: ユーザー入力は必ずバリデーションする
- エラーハンドリングは境界（ユーザー入力・外部 API）にのみ追加する
