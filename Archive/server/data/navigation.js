export const mainNavigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/history",
    children: [
      { label: "Our Generation", href: "/our-generation" },
      { label: "History", href: "/history" },
      { label: "Committee", href: "/committee" },
      { label: "Agenda", href: "/agenda" },
      { label: "Memories", href: "/memories" },
    ],
  },
  {
    label: "Forum",
    href: "/forum",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const utilityNavigation = [
  {
    label: "Our Team",
    href: "/our-team",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Support Center",
    href: "/support-center",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
];

export const socialNavigation = [
  {
    label: "Instagram Official",
    href: "https://www.instagram.com/impervious_generation.g7/?__d=1%2F",
  },
  {
    label: "YouTube Official",
    href: "https://www.youtube.com/@gontortv",
  },
  {
    label: "WhatsApp Official",
    href: "https://wa.me/6281547212932?text=Halo%20saya%20mau%20tanya",
  },
  {
    label: "Website",
    href: "https://imperviousgeneration.my.id/",
  },
];

export const navigationData = {
  mainNavigation,
  utilityNavigation,
  socialNavigation,
};

export default navigationData;