import { trustHighlights } from "@/content/site";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";

export function TrustSection() {
  return (
    <section className="section-shell relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
      <div className="relative z-10 mx-auto max-w-7xl rounded-[30px] bg-[#08111c] p-5 text-white shadow-[0_30px_90px_-54px_rgba(8,17,28,0.82)] sm:p-7">
        <div className="mb-7 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00A9FF]/25 bg-[#00A9FF]/10 px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-[#00A9FF]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7dd3fc]">Trust Layer</span>
              </div>
              <h2 className="font-display mt-5 max-w-[18ch] text-[1.8rem] font-bold leading-[1.04] tracking-[-0.055em] text-white sm:text-[2.45rem]">
                Built to feel safe before you pay.
              </h2>
            </div>
          </Reveal>
          <p className="max-w-md text-[13px] font-semibold leading-[1.7] text-white/60 lg:text-right">
            Clear payment, GST invoice, human onboarding and preview approval before your OneLink goes live.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustHighlights.map((signal, index) => (
              <Reveal key={signal} delay={index * 0.1}>
                <div className="group relative flex h-full min-h-[132px] flex-col items-start overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.045] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a9ff]/30 hover:bg-white/[0.07]">
                  
                  <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#00a9ff]/10 text-[#00a9ff] ring-1 ring-inset ring-[#00a9ff]/20">
                    {index === 0 && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>}
                    {index === 1 && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>}
                    {index === 2 && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                    {index === 3 && <Icon name="eye" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />}
                    {index > 3 && <Icon name="check" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />}
                  </div>
                  
                  <h3 className="mt-5 text-[15px] font-bold tracking-tight text-white transition-colors group-hover:text-[#00a9ff]">
                    {signal}
                  </h3>
                </div>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
