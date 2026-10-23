import { expect, test } from "@playwright/test";

const PAGES = [
  "/", "/profil/", "/contact/", "/newsletter/", "/merci/",
  "/en/", "/en/profile/", "/en/contact/", "/en/newsletter/", "/en/thanks/",
  "/mentions-legales/", "/confidentialite/",
];

for (const path of PAGES) {
  test(`${path} s'affiche sans erreur ni débordement horizontal`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("footer")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test("chaque page a un titre, une description et une URL canonique", async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path);
    expect(await page.title()).not.toBe("");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\//);
  }
});

test("le sélecteur de langue mène à la page équivalente", async ({ page }) => {
  await page.goto("/profil/");
  await page.getByRole("group", { name: "Langue" }).getByRole("link", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en\/profile\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("le profil reprend tout le parcours", async ({ page }) => {
  await page.goto("/profil/");
  await expect(page.locator(".job")).toHaveCount(8);
  await expect(page.locator(".card")).toHaveCount(6);
  await expect(page.getByRole("link", { name: "Télécharger mon CV" }).first()).toHaveAttribute("href", "/cv-ismail-haiber.pdf");
});

test("les formulaires sont déclarés pour Netlify Forms", async ({ page }) => {
  await page.goto("/contact/");
  const form = page.locator('form[name="contact"]');
  await expect(form).toHaveAttribute("data-netlify", "true");
  for (const name of ["nom", "email", "motif", "message"]) await expect(form.locator(`[name="${name}"]`)).toBeVisible();
  await page.goto("/");
  await expect(page.locator('form[name="newsletter"] input[type="email"]')).toBeVisible();
});

test("le menu mobile s'ouvre et se ferme", async ({ page, isMobile }) => {
  test.skip(!isMobile, "menu burger seulement sur mobile");
  await page.goto("/");
  const burger = page.getByRole("button", { name: "Menu" });
  await expect(page.locator("#nav-links")).toBeHidden();
  await burger.click();
  await expect(page.locator("#nav-links").getByRole("link", { name: "Profil" })).toBeVisible();
  await burger.click();
  await expect(page.locator("#nav-links")).toBeHidden();
});

test("robots.txt et sitemap sont publiés", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /admin/");
  expect(robots).toContain("sitemap-index.xml");
  const sitemap = await request.get("/sitemap-0.xml");
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  expect(xml).toContain("/profil/");
  expect(xml).not.toContain("/merci/");
});

test("une adresse inconnue renvoie la page 404", async ({ page }) => {
  const res = await page.goto("/cette-page-n-existe-pas/");
  expect(res?.status()).toBe(404);
  await expect(page.getByText("Test")).toBeVisible();
});
