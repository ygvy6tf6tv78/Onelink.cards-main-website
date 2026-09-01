import type { StaticImageData } from "next/image";
import mangoImage from "../../Portfolio/mango.png";
import burgerBazaarImage from "../../Portfolio/burger-bazaar.png";
import vastukarImage from "../../Portfolio/vastukar.png";
import smileHealthClinicImage from "../../Portfolio/smile-health-clinic.png";
import honeyFreshImage from "../../Portfolio/honeyfreshnfrozen.png";
import caRamitImage from "../../Portfolio/carammit.png";
import meraHalwaiImage from "../../Portfolio/merahalwai.png";
import honeyMoneyImage from "../../Portfolio/honeymoneyfishcompany.png";
import jayEssImage from "../../Portfolio/jayess.png";
import darziesCoutureImage from "../../Portfolio/darzies-couture.png";
import velouraImage from "../../Portfolio/veloura.png";
import sonnetCafeMockup from "../../onelink_mockups/sonnet-cafe.png";
import hotelMetropolisMockup from "../../onelink_mockups/hotel-metropolis.png";
import poshakEHoorMockup from "../../onelink_mockups/poshak-e-hoor.png";
import newVisionMockup from "../../onelink_mockups/new-vision.png";
import linguaVibeMockup from "../../onelink_mockups/lingua-vibe.png";

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  label?: string;
  description: string;
  href: string;
  image: StaticImageData;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "sonnet-cafe",
    title: "Sonnet Café",
    category: "Restaurants",
    label: "Café",
    description: "A mobile-first café experience connecting menu discovery, location and direct customer enquiries.",
    href: "https://sonnet.onelink.cards/",
    image: sonnetCafeMockup,
  },
  {
    id: "new-vision",
    title: "New Vision Diagnostics",
    category: "Clinics & Doctors",
    label: "Clinic",
    description: "A clear digital experience for services, patient enquiries, location and contact actions.",
    href: "https://newvision.onelink.cards/",
    image: newVisionMockup,
  },
  {
    id: "smile-health-clinic",
    title: "Smile Health Clinic",
    category: "Clinics & Doctors",
    label: "Clinic",
    description: "A patient-friendly clinic profile for services, appointments, location and direct healthcare enquiries.",
    href: "https://smilehealthclinic.onelink.cards/",
    image: smileHealthClinicImage,
  },
  {
    id: "metropolis-hotel",
    title: "Hotel Metropolis",
    category: "Hotels",
    label: "Hotel",
    description: "A hospitality-focused experience for rooms, amenities, bookings, location and direct guest enquiries.",
    href: "https://metropolis.onelink.cards/",
    image: hotelMetropolisMockup,
  },
  {
    id: "vastukar",
    title: "Vastukar",
    category: "Architects",
    label: "Architect",
    description: "An architecture-focused profile for services, project discovery, consultations and direct client enquiries.",
    href: "https://vastukar.onelink.cards/",
    image: vastukarImage,
  },
  {
    id: "burger-bazaar",
    title: "Burger Bazaar",
    category: "Restaurants",
    label: "Restaurant",
    description: "A bold restaurant experience connecting menus, online ordering, payments, location and customer actions.",
    href: "https://burgerbazaar.onelink.cards/",
    image: burgerBazaarImage,
  },
  {
    id: "mango",
    title: "Mango",
    category: "Restaurants",
    label: "Restaurant",
    description: "A scan-ready restaurant experience for menu discovery, directions and direct enquiries.",
    href: "https://mango.onelink.cards/",
    image: mangoImage,
  },
  {
    id: "poshak-e-hoor",
    title: "Poshak-e-Hoor",
    category: "Retail Shops",
    label: "Fashion Boutique",
    description: "A visual retail showcase connecting collections, store information and customer enquiries.",
    href: "https://poshak-e-hoor.onelink.cards/",
    image: poshakEHoorMockup,
  },
  {
    id: "darzies-couture",
    title: "Darzie’s Couture",
    category: "Retail Shops",
    label: "Bridal Couture",
    description: "A premium fashion showcase for bridal couture, occasion wear, collections and direct customer enquiries.",
    href: "https://darziescouture.onelink.cards/",
    image: darziesCoutureImage,
  },
  {
    id: "veloura",
    title: "Veloura",
    category: "Salons & Beauty",
    label: "Salon & Beauty",
    description: "A polished beauty experience for services, appointments, business details and direct customer enquiries.",
    href: "https://veloura.onelink.cards/",
    image: velouraImage,
  },
  {
    id: "ca-ramit",
    title: "CA Ramit",
    category: "Professional Services",
    label: "Chartered Accountant",
    description: "A professional destination for services, credibility, contact details and consultation enquiries.",
    href: "https://caramit.onelink.cards/",
    image: caRamitImage,
  },
  {
    id: "jay-ess",
    title: "Jay Ess",
    category: "Professional Services",
    label: "Professional Services",
    description: "A focused professional profile that makes services and customer contact actions easy to find.",
    href: "https://jayess.onelink.cards/",
    image: jayEssImage,
  },
  {
    id: "honey-fresh",
    title: "Honey's Fresh N Frozen",
    category: "Products",
    label: "Frozen Foods",
    description: "A product-led experience connecting the catalogue, availability and direct order enquiries.",
    href: "https://honeysfreshnfrozen.onelink.cards/",
    image: honeyFreshImage,
  },
  {
    id: "honey-money",
    title: "Honey Money Fish Company",
    category: "Products",
    label: "Seafood",
    description: "A clear product showcase for discovery, location and direct customer ordering actions.",
    href: "https://honeymoneyfish.onelink.cards/",
    image: honeyMoneyImage,
  },
  {
    id: "mera-halwai",
    title: "Mera Halwai",
    category: "Startups",
    label: "Sweets & Bakery",
    description: "A multi-vendor food experience connecting discovery, booking and customer enquiries.",
    href: "https://merahalwai.onelink.cards/",
    image: meraHalwaiImage,
  },
  {
    id: "lingua-vibe",
    title: "Lingua Vibe",
    category: "Education",
    label: "Education",
    description: "A modern education profile for programmes, enquiries, contact details and student actions.",
    href: "https://linguavibe.onelink.cards/",
    image: linguaVibeMockup,
  },
];
