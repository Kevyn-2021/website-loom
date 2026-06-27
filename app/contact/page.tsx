import { KevinZMark } from "@/components/KevinZMark"

export default function Contact() {
  return (
    <main className="page contact-page">
      <section className="contact-panel">
        <div>
          <p className="section-kicker">Contact</p>
          <h1>与我联系</h1>
          <p className="page-lede">
            如果你想交流产品定义、消费电子、机器人、AI硬件或写作相关话题，可以通过邮箱联系。
          </p>
        </div>

        <div className="contact-card">
          <KevinZMark className="contact-card-mark" />
          <span>Email</span>
          <a className="email-link" href="mailto:kevinzhang119@163.com">
            kevinzhang119@163.com
          </a>
          <p>这是目前唯一公开联系方式。</p>
        </div>
      </section>
    </main>
  )
}
