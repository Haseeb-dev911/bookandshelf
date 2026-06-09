import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

import db from "./index.config.js";
import { countriesModel } from "./models/countries.schema.js";
import { citiesModel } from "./models/cites.schema.js";

async function seedCountries() {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2",
    );

    const data = await res.json();

    for (const country of data) {
      await db.insert(countriesModel).values({
        name: country.name?.common.toLowerCase() ?? null,

        phoneCode: country.idd?.root
          ? country.idd.root + (country.idd.suffixes?.[0] || "")
          : null,

        flagUrl: country.flags?.png ?? null,
        iso2: country.cca2,
      });
    }

    console.log("Countries inserted successfully");

  try {
    // 1. Load countries
    const countryRows = await db.select().from(countriesModel);

    const countryMap = {};

    for (const c of countryRows) {
      countryMap[c.iso2] = c.id; // PK, US, etc
    }

    console.log("Country map ready");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.resolve(__dirname, "../../cities15000.txt");

    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let batch = [];
    let inserted = 0;

    for await (const line of rl) {
      const cols = line.split("\t");

      const cityName = cols[1];
      const countryCode = cols[8];

      const countryId = countryMap[countryCode];

      if (!countryId) continue;

      batch.push({
        name: cityName.toLowerCase(),
        countryId,
      });

      if (batch.length === 500) {
        await db.insert(citiesModel).values(batch); // FIXED
        inserted += batch.length;
        console.log("Inserted:", inserted);
        batch = [];
      }
    }

    if (batch.length > 0) {
      await db.insert(citiesModel).values(batch);
    }

    console.log("DONE inserting cities");
  } catch (error) {
    console.log("SEED ERROR:", error);
  }
}

seedCountries();