import puppeteer from 'puppeteer';

import fs from 'fs/promises'; // Use fs.promises for Promise-based file operations

const instagramPostUrl = "https://www.instagram.com/p/CwMtxbYrhLI/";

const test = async () => {
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
        await fs.writeFile('res-pupp.html', redirectedContent);

        console.log("Content written to res.txt");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await browser.close();
    }
};

test()
