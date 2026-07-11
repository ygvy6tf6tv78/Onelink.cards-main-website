import Link from "next/link";
import { Wordmark } from "@/components/ui/brand-mark";
import { siteConfig } from "@/content/site";

export function Footer() {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}`;

  return (
    <footer className="relative mt-24 overflow-hidden bg-[#0A0A0A] pt-20 sm:mt-32 sm:pt-24 lg:pt-32">
      {/* Glow effect at the top */}
      <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#00A9FF] to-transparent opacity-80" />
      <div className="absolute left-1/2 top-0 h-[250px] w-full max-w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,#00A9FF_0%,transparent_70%)] opacity-20 blur-[60px]" />
      <div className="absolute inset-x-0 -top-24 h-48 w-full bg-[#00A9FF]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-12">
        <div className="xl:grid xl:grid-cols-4 xl:gap-12">
          <div className="space-y-8 xl:col-span-2">
            <Wordmark className="h-10 brightness-0 invert opacity-100" />
            <p className="max-w-sm text-[15px] leading-relaxed text-gray-400">
              One smart business page for better discovery, customer action and business growth. Stop sharing links, start sharing OneLink.
            </p>
            <div className="flex space-x-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[12px] font-medium text-gray-300">
                A venture by <strong className="font-bold text-white">Kriyon Group Private Limited</strong>
              </p>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.15em] text-white">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="/portfolio" className="text-[14px] font-medium text-gray-400 transition hover:text-white">Portfolio</Link></li>
                  <li><Link href="/#pricing" className="text-[14px] font-medium text-gray-400 transition hover:text-white">Pricing</Link></li>
                  <li><Link href="/#faqs" className="text-[14px] font-medium text-gray-400 transition hover:text-white">FAQs</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-[13px] font-bold uppercase tracking-[0.15em] text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><a href={whatsappHref} target="_blank" rel="noreferrer" className="text-[14px] font-medium text-gray-400 transition hover:text-white">WhatsApp</a></li>
                  <li><a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="text-[14px] font-medium text-gray-400 transition hover:text-white">Call</a></li>
                  <li><a href={`mailto:${siteConfig.contact.email}`} className="text-[14px] font-medium text-gray-400 transition hover:text-white">Email</a></li>
                </ul>
              </div>
            </div>
            
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.15em] text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="/terms" className="text-[14px] font-medium text-gray-400 transition hover:text-white">Terms</Link></li>
                  <li><Link href="/privacy" className="text-[14px] font-medium text-gray-400 transition hover:text-white">Privacy</Link></li>
                  <li><Link href="/refund" className="text-[14px] font-medium text-gray-400 transition hover:text-white">Refund Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-[13px] font-medium text-gray-500">&copy; {new Date().getFullYear()} OneLink. All rights reserved.</p>
          </div>
          <p className="mt-4 text-[13px] font-medium text-gray-500 lg:mt-0 lg:text-right">
            Designed and built by <a href="https://www.repixelx.com" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-400 transition hover:text-white">RepixelX Studio</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
