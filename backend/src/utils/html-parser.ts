/**
 * This code parses the html from instagram url
 */
import puppeteer from "puppeteer";

import fs from "fs/promises";

export const htmlParser = async (instagramPostUrl: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the Instagram post URL
    await page.goto(instagramPostUrl);

    // Get the redirected URL after navigation
    const redirectedUrl = page.url();

    // Navigate to the redirected URL
    await page.goto(redirectedUrl);

    // Get the content of the redirected URL
    const redirectedContent = await page.content();

    // Write the redirectedContent to res.txt file
    await fs.writeFile("res.html", redirectedContent);

    //.console.log("Content written to res.txt");

    return redirectedContent;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
};
