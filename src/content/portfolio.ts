import type { StaticImageData } from "next/image";
import mangoImage from "../../Portfolio/mango.png";
import honeyFreshImage from "../../Portfolio/honeyfreshnfrozen.png";
import caRamitImage from "../../Portfolio/carammit.png";
import meraHalwaiImage from "../../Portfolio/merahalwai.png";
import honeyMoneyImage from "../../Portfolio/honeymoneyfishcompany.png";
import jayEssImage from "../../Portfolio/jayess.png";
import sonnetCafeMockup from "../../onelink_mockups/sonnet-cafe.png";
import poshakEHoorMockup from "../../onelink_mockups/poshak-e-hoor.png";
import dograAssociatesMockup from "../../onelink_mockups/dogra-associates.png";
import hotelMetropolisMockup from "../../onelink_mockups/hotel-metropolis.png";
import newVisionMockup from "../../onelink_mockups/new-vision.png";
import linguaVibeMockup from "../../onelink_mockups/lingua-vibe.png";

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  label?: string;
  href: string;
  image: StaticImageData;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "sonnet-cafe",
    title: "Sonnet Café",
    category: "Restaurants",
    label: "Café",
    href: "https://sonnet.onelink.cards/",
    image: sonnetCafeMockup,
  },
  {
    id: "new-vision",
    title: "New Vision Diagnostics",
    category: "Clinics & Doctors",
    label: "Clinic",
    href: "https://newvision.onelink.cards/",
    image: newVisionMockup,
  },
  {
    id: "metropolis-hotel",
    title: "Metropolis Hotel",
    category: "Hotels",
    label: "Hotel",
    href: "https://metropolis.onelink.cards/",
    image: hotelMetropolisMockup,
  },
  {
    id: "mango",
    title: "Mango",
    category: "Restaurants",
    label: "Restaurant",
    href: "https://mango.onelink.cards/",
    image: mangoImage,
  },
  {
    id: "poshak-e-hoor",
    title: "Poshak-e-Hoor",
    category: "Retail Shops",
    label: "Fashion Boutique",
    href: "https://poshak-e-hoor.onelink.cards/",
    image: poshakEHoorMockup,
  },
  {
    id: "ca-ramit",
    title: "CA Ramit",
    category: "Professional Services",
    label: "Chartered Accountant",
    href: "https://caramit.onelink.cards/",
    image: caRamitImage,
  },
  {
    id: "jay-ess",
    title: "Jay Ess",
    category: "Professional Services",
    label: "Professional Services",
    href: "https://jayess.onelink.cards/",
    image: jayEssImage,
  },
  {
    id: "honey-fresh",
    title: "Honey's Fresh N Frozen",
    category: "Products",
    label: "Frozen Foods",
    href: "https://honeysfreshnfrozen.onelink.cards/",
    image: honeyFreshImage,
  },
  {
    id: "honey-money",
    title: "Honey Money Fish Company",
    category: "Products",
    label: "Seafood",
    href: "https://honeymoneyfish.onelink.cards/",
    image: honeyMoneyImage,
  },
  {
    id: "mera-halwai",
    title: "Mera Halwai",
    category: "Startups",
    label: "Sweets & Bakery",
    href: "https://merahalwai.onelink.cards/",
    image: meraHalwaiImage,
  },
  {
    id: "lingua-vibe",
    title: "Lingua Vibe",
    category: "Education",
    label: "Education",
    href: "https://linguavibe.onelink.cards/",
    image: linguaVibeMockup,
  },
];
