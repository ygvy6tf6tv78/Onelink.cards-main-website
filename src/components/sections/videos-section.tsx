import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";

const videos = [
  {
    title: "Restaurant reel",
    description: "Menu, payments, and WhatsApp in one customer flow.",
    src: "/videos/0301-web.mp4",
  },
  {
    title: "Consultant reel",
    description: "Calls, credibility, and enquiry flow on one page.",
    src: "/videos/0301-3-web.mp4",
  },
];

export function VideosSection() {
  return (
    <section className="section-shell bg-[linear-gradient(180deg,#f8fbff_0%,#f1f6ff_100%)] px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow">Videos</span>
              <h2 className="font-display mt-4 text-[1.9rem] font-bold tracking-[-0.05em] text-[var(--foreground)] sm:text-[2.6rem] lg:text-[3.2rem] leading-[1.1]">
                See OneLink in motion.
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-7 text-[var(--muted)]">
                Short reel-style previews that show how OneLink looks for real businesses.
              </p>
            </div>

            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-black/8 bg-white px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-[0_12px_30px_rgba(14,30,37,0.05)] transition hover:-translate-y-0.5 hover:text-[var(--accent-strong)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white text-[var(--foreground)] shadow-[0_10px_24px_rgba(14,30,37,0.05)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:scale-110" viewBox="0 0 448 512"><defs><linearGradient id="ig-grad-vid1" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="25%" stopColor="#e6683c"/><stop offset="50%" stopColor="#dc2743"/><stop offset="75%" stopColor="#cc2366"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs><path fill="url(#ig-grad-vid1)" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
              </span>
              Follow on Instagram
            </a>
          </div>
        </Reveal>

        <div className="mt-9 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {videos.map((video, index) => (
            <Reveal key={video.title} delay={index * 0.06}>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <div className="overflow-hidden rounded-[32px] border border-black/8 bg-[#12131a] p-2 shadow-[0_24px_60px_rgba(10,14,24,0.16)]">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[26px] bg-black">
                    <video
                      className="h-full w-full object-cover"
                      src={video.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,18,0.04),rgba(6,10,18,0.14)_40%,rgba(6,10,18,0.6)_100%)]" />
                    <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                      <span className="rounded-full bg-white/12 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                        Reel preview
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:scale-110" viewBox="0 0 448 512"><defs><linearGradient id="ig-grad-vid2" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="25%" stopColor="#e6683c"/><stop offset="50%" stopColor="#dc2743"/><stop offset="75%" stopColor="#cc2366"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs><path fill="url(#ig-grad-vid2)" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/62">
                        Open on Instagram
                      </p>
                      <h3 className="font-display mt-2 text-[1.2rem] font-semibold tracking-[-0.04em] text-white">
                        {video.title}
                      </h3>
                      <p className="mt-2 max-w-[24ch] text-sm leading-6 text-white/72">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
