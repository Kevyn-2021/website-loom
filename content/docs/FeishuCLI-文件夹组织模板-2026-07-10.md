# Feishu Workspace 文件夹组织模板

这份结构用于把 Markdown 草稿、SVG 源文件、验证记录和规则文件分开，避免飞书 CLI 相关任务散落在多个目录里。

## 推荐结构

```text
feishu-workspace/
├── README.md
├── drafts/
│   ├── project-a/
│   │   └── 2026-07-10_topic.md
│   └── project-b/
├── assets/
│   ├── 2026-07-10_topic.svg
│   └── 2026-07-10_topic-preview.png
├── svg-validation/
│   ├── 2026-07-10_topic-checklist.md
│   └── 2026-07-10_topic-node-readback.json
└── rules/
    ├── feishu-cli-guideline.md
    └── style-reference.md
```

## 为什么这样分

- `README.md`：作为入口和任务路由。
- `drafts/`：保存 Markdown 草稿与文档源文件，方便复用和回退。
- `assets/`：保存 SVG 这类可编辑视觉源文件。
- `svg-validation/`：保存导入飞书画板后的验证记录，避免“能看不能改”。
- `rules/`：保存完整规范，避免每次靠口头约定重复解释。

## 命名规则

```text
Markdown: YYYY-MM-DD_topic.md
SVG:      YYYY-MM-DD_topic.svg
飞书标题: YYYY-MM-DD_topic
```

## 需要替换的个人配置

```text
替换为个人的项目名称
替换为个人的 topic 命名习惯
替换为个人的验证记录格式
```
