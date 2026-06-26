# KevinZ Knowledge Graph

这份 Markdown 是 KevinZ 知识图谱的源头。维护图谱时，优先修改这里，而不是直接修改页面代码。

## 维护规则

- `id` 必须唯一，建议使用英文小写和连字符。
- `cluster` 用于控制视觉分组，可选值：`core`、`method`、`gtm`、`experience`、`output`、`frontier`、`personal`。
- `x` 和 `y` 是节点在画布中的百分比位置，范围为 `0-100`。
- `from` 和 `to` 是有向关系，表示从一个知识点指向另一个知识点。
- `relation` 尽量短，只描述关系动作，例如：提炼、定义、协同、反馈、迁移。

## Nodes

| id | label | cluster | x | y | note |
| --- | --- | --- | ---: | ---: | --- |
| kevinz | KevinZ | core | 50 | 48 | 产品经理 / 写作者 |
| market-insight | 市场洞察 | method | 30 | 24 | 识别机会和约束 |
| user-need | 用户需求 | method | 42 | 21 | 场景、痛点、动机 |
| product-definition | 产品定义 | method | 54 | 23 | 边界、规格、取舍 |
| roadmap | 路线图 | method | 66 | 28 | 节奏和版本 |
| ipms | IPMS | method | 47 | 35 | 跨职能协同 |
| pricing | 价格 | gtm | 70 | 43 | 价值、成本、竞争 |
| marketing | 营销 | gtm | 82 | 35 | 信息和触达 |
| channel | 渠道 | gtm | 77 | 54 | 覆盖和效率 |
| launch | 上市 | gtm | 64 | 61 | GTM 节奏 |
| chip | 芯片 | experience | 20 | 39 | 技术底层 |
| phone | 手机 | experience | 23 | 52 | 规模化消费电子 |
| robot | 机器人 | experience | 26 | 65 | 家庭场景 |
| global-market | 全球市场 | experience | 36 | 74 | 中国、拉美、欧洲 |
| writing | 写作 | output | 46 | 76 | 经验整理 |
| product-book | 产品书 | output | 56 | 82 | 生命周期方法 |
| career-book | 职场书 | output | 38 | 87 | 成长框架 |
| ai-hardware | AI 硬件 | frontier | 79 | 74 | 新体验和新边界 |
| data-algorithm | 数据与算法 | frontier | 88 | 64 | 硬件的新变量 |
| basketball | 篮球 | personal | 15 | 83 | 生活碎片 |

## Links

| from | to | relation |
| --- | --- | --- |
| kevinz | market-insight | 观察 |
| market-insight | user-need | 提炼 |
| user-need | product-definition | 定义 |
| product-definition | roadmap | 规划 |
| product-definition | ipms | 协同 |
| roadmap | launch | 进入市场 |
| ipms | pricing | 价格 |
| ipms | marketing | 传播 |
| ipms | channel | 渠道 |
| pricing | launch | 上市 |
| marketing | launch | 触达 |
| channel | launch | 覆盖 |
| kevinz | chip | 起点 |
| chip | phone | 产品化 |
| phone | global-market | 出海 |
| phone | robot | 品类迁移 |
| robot | ai-hardware | 演进 |
| global-market | pricing | 竞争反馈 |
| global-market | channel | 市场反馈 |
| kevinz | writing | 表达 |
| writing | product-book | 产品方法 |
| writing | career-book | 成长方法 |
| product-book | market-insight | 复用 |
| product-book | roadmap | 复用 |
| career-book | ipms | 协作 |
| ai-hardware | data-algorithm | 新变量 |
| data-algorithm | product-definition | 反向约束 |
| ai-hardware | user-need | 新场景 |

