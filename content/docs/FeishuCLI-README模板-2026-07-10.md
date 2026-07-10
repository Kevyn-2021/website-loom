# Feishu Workspace README 模板

这份 README 用于约束飞书 CLI 相关任务的入口方式。它适合作为团队或个人的工作台首页，用来告诉使用者：

- 这个目录是做什么的；
- 哪类任务先看哪份规则；
- 本地源文件和云端交付之间的关系；
- 文件应该放在哪里。

## 1. 快速约束

- 默认工作方式：先本地创作，再导入云端。
- 飞书云端默认位置：替换为个人的目标文件夹名称。
- 本地源文件只放在当前 workspace 内，不放到桌面、临时目录或其他项目目录。
- 本地文件名与飞书云端文档标题都遵循同一套排序规则：`YYYY-MM-DD_topic`。
- 本地文件保留扩展名，例如 `.md`、`.svg`；飞书云端文档标题不写扩展名。
- topic 使用英文小写、数字和下划线；不使用空格、中文或含义不明的缩写。
- 如果实际调用飞书 CLI，最后建议增加一条状态通知。

## 2. 任务路由

| 任务类型 | 先看哪里 | 产物位置 |
|---|---|---|
| 新建或编辑飞书文档 | `rules/feishu-cli-guideline.md` 第 3 节 | `drafts/` 与飞书云端 |
| 创建 SVG 或导入飞书画板 | `rules/feishu-cli-guideline.md` 第 4、5 节 | `assets/` 与飞书画板 |
| 验证 SVG 可编辑性 | `rules/feishu-cli-guideline.md` 第 4、6 节 | `svg-validation/` |
| 调用飞书 CLI 后收尾 | `rules/feishu-cli-guideline.md` 第 7 节 | 状态通知 |
| 修改工作规则 | 本文件与 `rules/feishu-cli-guideline.md` | `rules/` |

## 3. 目录说明

```text
feishu-workspace/
├── README.md            # 必读入口与任务路由
├── drafts/              # Markdown 草稿与文档源文件
├── assets/              # SVG 等可编辑视觉源文件
├── svg-validation/      # SVG/画板验证记录或辅助材料
└── rules/               # 完整工作规则
```

## 4. 推荐启动语

```text
请按 feishu-workspace/README.md 的规则创建一个 SVG，并导入飞书画板。
```

或：

```text
请参考 feishu-workspace 里的规则，创建一份飞书文档。
```

## 5. 需要替换的个人配置

```text
替换为个人的目标文件夹名称
替换为个人的飞书云端目录链接
替换为个人的飞书 folder token
替换为个人的通知应用名称
替换为个人的应用 app id
替换为个人的收件人 user id
```
