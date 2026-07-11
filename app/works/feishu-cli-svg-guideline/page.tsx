import { readDoc } from "@/lib/docs"
import { MarkdownActions } from "@/components/MarkdownActions"

const readmeDoc = "FeishuCLI-README模板-2026-07-10.md"
const guidelineDoc = "FeishuCLI-SVG工作指南模板-2026-07-10.md"

const styleCards = [
  {
    label: "Style A",
    title: "Apple 产品展示风格",
    body: "适合做产品介绍、方案封面和高端消费电子体验展示。画面应该有一个主角，其余元素全部退后。",
    points: ["大标题 + 大留白", "单核心视觉", "少量标签与说明", "强调高级感而非信息密度"],
  },
  {
    label: "Style B",
    title: "McKinsey 咨询分析风格",
    body: "适合战略分析、管理汇报和方案框架说明。重点不是好看，而是让管理层几秒内抓到结论和结构。",
    points: ["网格化框架", "因果关系清楚", "标题直接写判断", "模块统一，像一页咨询图"],
  },
  {
    label: "Style C",
    title: "Information Graphic 信息图风格",
    body: "适合知识体系、技术架构和操作指南。画面可以更丰富，但必须让复杂信息被逐层解释，而不是堆满。",
    points: ["多分区说明", "标签与节点", "复杂信息拆解", "颜色帮助分组而不是装饰"],
  },
]

export default function FeishuCliSvgGuidelinePage() {
  const readme = readDoc(readmeDoc)
  const guideline = readDoc(guidelineDoc)

  return (
    <main className="page work-detail-page">
      <p className="section-kicker">Feishu CLI</p>
      <h1>飞书CLI-画板创作</h1>
      <p className="page-lede">
        这套 guideline 用来约束飞书文档、SVG 源文件和画板导入之间的工作方式。它既是执行规则，也是一个方便别人复用的模板系统。
      </p>

      <section className="context-preview" aria-label="作品介绍">
        <article>
          <span>01</span>
          <h2>统一工作方式</h2>
          <p>把本地创作、云端导入、节点验证和状态通知串成同一条可复用流程。</p>
        </article>
        <article>
          <span>02</span>
          <h2>支持三种视觉风格</h2>
          <p>针对产品展示、咨询分析和信息图表达，预设三种 SVG 设计语言。</p>
        </article>
        <article>
          <span>03</span>
          <h2>适合对外参考</h2>
          <p>页面中的 source 已完成脱敏处理，所有个人 token、id 和目录信息都明确标注为必须替换。</p>
        </article>
      </section>

      <section className="feishu-demo-board" aria-label="三种风格示例">
        {styleCards.map((card, index) => (
          <article className={`feishu-demo-card feishu-demo-${index + 1}`} key={card.label}>
            <span>{card.label}</span>
            <h2>{card.title}</h2>
            <p>{card.body}</p>
            <div className="feishu-demo-scene" aria-hidden="true">
              {index === 0 ? (
                <>
                  <div className="feishu-scene-hero">
                    <strong>Product Hero</strong>
                    <em>one focal concept, minimal support</em>
                  </div>
                  <div className="feishu-scene-frame">
                    <div className="feishu-scene-device" />
                    <div className="feishu-scene-caption">
                      <b>Feature Callout</b>
                      <span>clear focal hierarchy</span>
                    </div>
                  </div>
                  <div className="feishu-scene-pills">
                    <i />
                    <i />
                    <i className="is-accent" />
                  </div>
                </>
              ) : null}

              {index === 1 ? (
                <>
                  <div className="feishu-scene-summary">
                    <strong>Decision</strong>
                    <span>Market entry should prioritize channel control</span>
                  </div>
                  <div className="feishu-scene-grid">
                    <b>Context</b>
                    <b>Decision</b>
                    <b>Action</b>
                    <b>Risk</b>
                  </div>
                  <div className="feishu-scene-line" />
                  <div className="feishu-scene-metrics">
                    <i />
                    <i />
                    <i className="is-accent" />
                  </div>
                </>
              ) : null}

              {index === 2 ? (
                <>
                  <div className="feishu-scene-header">
                    <b>README</b>
                    <b>Rules</b>
                    <b>Validation</b>
                  </div>
                  <div className="feishu-scene-infograph">
                    <div className="feishu-scene-donut">
                      <i className="is-accent" />
                    </div>
                    <div className="feishu-scene-bars">
                      <i style={{ height: "34px" }} />
                      <i className="is-accent" style={{ height: "52px" }} />
                      <i style={{ height: "26px" }} />
                    </div>
                  </div>
                  <div className="feishu-scene-nodes">
                    <i className="is-accent" />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="feishu-scene-tags">
                    <b>README</b>
                    <b>Rules</b>
                    <b>Assets</b>
                  </div>
                  <div className="feishu-scene-notes">
                    <span>Node</span>
                    <span>Guide</span>
                    <span>Flow</span>
                  </div>
                </>
              ) : null}
            </div>
            <ul>
              {card.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="feishu-folder-panel" aria-label="文件夹组织方式">
        <div className="feishu-folder-copy">
          <p className="section-kicker">Folder Structure</p>
          <h2>一套便于维护的文件组织方式</h2>
          <p>
            不必额外提供一份目录模板文档。只要把入口、草稿、SVG 源文件、验证记录和规则文件分开，使用者就能按自己的项目结构搭起来。
          </p>
        </div>
        <div className="feishu-folder-map" aria-hidden="true">
          <div className="feishu-folder-root">feishu-workspace</div>
          <div className="feishu-folder-branches">
            <article>
              <strong>README</strong>
              <span>入口与任务路由</span>
            </article>
            <article>
              <strong>drafts</strong>
              <span>Markdown 草稿</span>
            </article>
            <article>
              <strong>assets</strong>
              <span>SVG 源文件</span>
            </article>
            <article>
              <strong>svg-validation</strong>
              <span>节点验证记录</span>
            </article>
            <article>
              <strong>rules</strong>
              <span>完整规范</span>
            </article>
          </div>
        </div>
      </section>

      <section className="code-section" aria-label="README Source">
        <div className="code-section-heading">
          <div>
            <p className="section-kicker">Source / README</p>
            <h2>入口说明模板</h2>
          </div>
          <MarkdownActions content={readme} filename={readmeDoc} />
        </div>
        <pre>
          <code>{readme}</code>
        </pre>
      </section>

      <section className="code-section" aria-label="Guideline Source">
        <div className="code-section-heading">
          <div>
            <p className="section-kicker">Source / Guideline</p>
            <h2>脱敏后的完整规则</h2>
          </div>
          <MarkdownActions content={guideline} filename={guidelineDoc} />
        </div>
        <pre>
          <code>{guideline}</code>
        </pre>
      </section>
    </main>
  )
}
