/**
 * This code parses the html from instagram url
 */
import puppeteer from "puppeteer";

import fs from "fs/promises";

/**
 * 
 * @param url 
 * @returns 
 * 
(async () => {
  try {
    // Fetch the content of the Instagram post
    const response = await fetch(instagramPostUrl);
    const postContent = await response.text();

    // Define the variable name you're looking for
    const variableName = "reeshma_nanaiah";

    // Create a regular expression to match the variable name
    const regex = new RegExp(`\\b${variableName}\\b`);

    // Test if the variable name exists in the response
    const doesExist = regex.test(postContent);

    if (doesExist) {
      console.log(`Variable '${variableName}' exists in the response.`);
    } else {
      console.log(`Variable '${variableName}' does not exist in the response.`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
})();
 */

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

    console.log("Content written to res.txt", redirectedContent);

    return redirectedContent;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
};

// export const htmlParser = async (url: string) => {
//   console.log("url--", url);
//   try {
//     // Fetch the content from the provided URL
//     const response = await fetch(url);
//     const content = await response.text();

//     // Save the fetched HTML content as res.html
//     await fs.writeFile("res.html", content);

//     console.log("HTML content saved to res.html");
//     return content;
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// };
