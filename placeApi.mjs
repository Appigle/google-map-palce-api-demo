import { config } from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { categories } from './palceCategories.js';
import { getSimpleData } from './response.js';

// Load environment variables
config();

const API_KEY = process.env.API_KEY;
const LOCATION = process.env.LOCATION_WATERLOO;
const RADIUS = parseInt(process.env.RADIUS, 10);
const MAX_PAGES = parseInt(process.env.MAX_PAGES, 10);

// Helper to fetch places by category
async function fetchPlacesByCategory(type) {
  let results = [];
  let nextPageToken = null;

  for (let i = 0; i < MAX_PAGES; i++) {
    if (i > 0 && nextPageToken) {
      console.log(`Waiting for next_page_token for "${type}"...`);
      await new Promise((res) => setTimeout(res, 2000));
    }

    // google maps api url
    const baseUrl =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const params = new URLSearchParams({
      location: LOCATION,
      radius: RADIUS,
      type,
      key: API_KEY,
    });

    if (nextPageToken) {
      params.append('pagetoken', nextPageToken);
    }
    const url = `${baseUrl}?${params.toString()}`;
    console.log(
      '%c [ request:url ]-38',
      'font-size:13px; background:pink; color:#bf2c9f;',
      url
    );
    const response = await fetch(url);

    const data = await response.json();

    if (data.results) results.push(...data.results);
    if (!data.next_page_token) break;

    nextPageToken = data.next_page_token;
  }

  return results;
}

// Create output dir if it doesn't exist
async function ensureOutputDir() {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const outPath = path.join(dirname, 'output');
  try {
    await fs.mkdir(outPath);
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
  return outPath;
}

// Main runner
(async () => {
  const outputDir = await ensureOutputDir();

  for (const category of categories) {
    if (!category) {
      console.error('Category is not defined');
      continue;
    }
    console.log(`\n⏳ Fetching category: ${category}`);
    const data = await fetchPlacesByCategory(category);
    console.log(`✅ Fetched ${data.length} places for "${category}"`);

    const filePath = path.join(outputDir, `${category}.json`);
    const filePathSimple = path.join(outputDir, `${category}_simple.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    await fs.writeFile(
      filePathSimple,
      JSON.stringify(getSimpleData(data), null, 2)
    );
  }

  console.log('\n🎉 Done! All data saved to /output directory.');
})();
