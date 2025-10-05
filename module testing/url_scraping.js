import fetch from "node-fetch"; // Not needed in Node 18+
import * as cheerio from "cheerio";

async function scrapePage(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    // Parse HTML with Cheerio (like jQuery)
    const $ = cheerio.load(html);

    // Example: get all links
    const links = [];
    $("a").each((_, el) => {
      links.push($(el).attr("href"));
    });

    console.log("✅ Page title:", $("title").text());
    console.log("🔗 Found links:", links.slice(0, 10)); // sample

    console.log(response);

    return html; // or return $ if you want to parse later
  } catch (err) {
    console.error("❌ Error fetching:", err);
  }
}

// Example usage:
scrapePage("https://developer.mozilla.org/en-US/docs/Web/JavaScript");
