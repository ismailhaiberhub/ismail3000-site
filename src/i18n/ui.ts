export type Lang = "fr" | "en";
export type Bi = { fr: string; en: string } | string | undefined;

// Chaque page connaît son équivalent dans l'autre langue, pour le sélecteur FR/EN et les balises hreflang.
export const ROUTES = {
  home: { fr: "/", en: "/en/" },
  profil: { fr: "/profil/", en: "/en/profile/" },
  contact: { fr: "/contact/", en: "/en/contact/" },
  newsletter: { fr: "/newsletter/", en: "/en/newsletter/" },
  merci: { fr: "/merci/", en: "/en/thanks/" },
  mentions: { fr: "/mentions-legales/", en: "/mentions-legales/" },
  confidentialite: { fr: "/confidentialite/", en: "/confidentialite/" },
} as const;
export type RouteKey = keyof typeof ROUTES;

export const route = (key: RouteKey, lang: Lang) => ROUTES[key][lang];

export const t = (o: Bi, lang: Lang): string =>
  o && typeof o === "object" ? (o[lang] ?? o.fr ?? "") : (o ?? "");

export const lines = (s: string) =>
  String(s || "").split("\n").map((x) => x.trim()).filter(Boolean);

export const paragraphs = (s: string) =>
  String(s || "").split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);

export const UI = {
  fr: {
    nav_home: "Accueil", nav_profil: "Profil", nav_contact: "Contact", nav_newsletter: "Newsletter",
    menu: "Menu", skip: "Aller au contenu",
    cta_contact: "Me contacter", cta_profil: "Voir mon profil", cta_cv: "Télécharger mon CV",
    about_label: "à propos", about_h: "Qualité <em>augmentée</em>",
    serv_h: "Ce que je <em>teste</em> pour vous", path_label: "parcours", path_h: "Journal <em>d'exécution</em>",
    stack_h: "Arsenal <em>technique</em>", cert_h: "Certifié <em>conforme</em>", edu_label: "formation",
    edu_h: "Base <em>de code</em>", langs: "langues", ok: "obtenue", progress: "en cours",
    contact_label: "'votre projet'", contact_h: "Lançons <em>le test</em>",
    copy: "Copier", copied: "Adresse copiée ✓", copyfail: "Sélectionnez l'adresse pour la copier",
    f_name: "Nom", f_email: "Email", f_reason: "Motif", f_message: "Message", f_send: "Envoyer",
    f_reasons: ["Mission QA", "Startup : lancer ma QA", "Partenariat", "Média, conférence", "Autre"],
    f_or: "ou écrivez-moi directement", rdv: "Prendre rendez-vous",
    home_offer_label: "ce que propose le site", home_offer_h: "Ce qui <em>arrive</em>",
    soon: "bientôt", available: "disponible",
    whoami: "Qui suis-je", follow: "Me suivre",
    nl_h: "La newsletter <em>QA du futur</em>", nl_email: "Votre email", nl_send: "M'inscrire",
    nl_consent: "En vous inscrivant, vous acceptez de recevoir la newsletter. Voir la",
    privacy: "politique de confidentialité", privacy_title: "Confidentialité",
    thanks_h: "Message <em>reçu</em>", thanks_p: "Merci ! Je reviens vers vous très vite.", back_home: "Retour à l'accueil",
    legal: "Mentions légales", footer_role: "Ingénieur QA Full-Stack · Paris",
    nf_h: "Test <em>échoué</em>", nf_p: "Cette page n'existe pas (ou plus).",
  },
  en: {
    nav_home: "Home", nav_profil: "Profile", nav_contact: "Contact", nav_newsletter: "Newsletter",
    menu: "Menu", skip: "Skip to content",
    cta_contact: "Get in touch", cta_profil: "See my profile", cta_cv: "Download my CV",
    about_label: "about", about_h: "Quality, <em>augmented</em>",
    serv_h: "What I <em>test</em> for you", path_label: "experience", path_h: "Execution <em>log</em>",
    stack_h: "Tech <em>arsenal</em>", cert_h: "Certified <em>compliant</em>", edu_label: "education",
    edu_h: "Core <em>code base</em>", langs: "languages", ok: "certified", progress: "in progress",
    contact_label: "'your project'", contact_h: "Let's run <em>the test</em>",
    copy: "Copy", copied: "Address copied ✓", copyfail: "Select the address to copy it",
    f_name: "Name", f_email: "Email", f_reason: "Reason", f_message: "Message", f_send: "Send",
    f_reasons: ["QA assignment", "Startup: launch my QA", "Partnership", "Media, conference", "Other"],
    f_or: "or write to me directly", rdv: "Book a call",
    home_offer_label: "what this site offers", home_offer_h: "What's <em>coming</em>",
    soon: "soon", available: "available",
    whoami: "Who am I", follow: "Follow me",
    nl_h: "The <em>Future QA</em> newsletter", nl_email: "Your email", nl_send: "Subscribe",
    nl_consent: "By subscribing, you agree to receive the newsletter. See the",
    privacy: "privacy policy", privacy_title: "Privacy",
    thanks_h: "Message <em>received</em>", thanks_p: "Thank you! I'll get back to you very soon.", back_home: "Back to home",
    legal: "Legal notice", footer_role: "Full-Stack QA Engineer · Paris",
    nf_h: "Test <em>failed</em>", nf_p: "This page does not exist (anymore).",
  },
} as const;
