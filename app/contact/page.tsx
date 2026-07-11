import { KevinZMark } from "@/components/KevinZMark"
import Image from "next/image"

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

      <figure className="contact-memory-card">
        <div className="contact-memory-image">
          <Image
            src="/assets/kevin-france-2019-sketch-anonymized.png"
            alt="2019 年在法国与团队工作的素描记录"
            fill
            sizes="(max-width: 860px) 100vw, 1160px"
          />
        </div>
        <figcaption>
          <span>2019 / France</span>
          <p>A moment from 2019, France - a memorable journey with an exceptional team.<br />Built on belief, teamwork, and execution, we overcame challenges and achieved extraordinary results.</p>
        </figcaption>
      </figure>
    </main>
  )
}
