// Import puppeteer for headless browser automation
import puppeteer from "puppeteer";

async function searchUrlGetContent(url) {
  // Launch headless browser
  const browser = await puppeteer.launch({
    headless: true, // run without opening a visible browser window
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  // Open a new page (tab)
  const page = await browser.newPage();

  // Navigate to the URL and wait for the network to be idle
  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

  // Extract fully rendered text from the <body>
  const bodyText = await page.evaluate(() => {
    const text = document.body.innerText; // 
    return text //.replace(/\s+/g, "").trim();
  });

  console.log(bodyText);

  // Close browser
  await browser.close();

  return bodyText;
}

module.exports = { searchUrlGetContent };
