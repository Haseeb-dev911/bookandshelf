import express from "express";
import fs from "fs";
import readline from "readline";

import db from "../../../db/index.config.js";
import { countriesModel } from "../../../db/models/countries.schema.js";
import { citiesModel } from "../../../db/models/cites.schema.js";
import { eq, ilike } from "drizzle-orm";
import { id } from "zod/locales";
import { AppError } from "../../../error/App.error.js";

export const seedLocationsRouter = express.Router();

seedLocationsRouter.get("/countries", (req, res) => {

    async function seedCountries() {
        const res = await fetch(
            "https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2"
        );

        const data = await res.json();

        for (const country of data) {
            await db.insert(countriesModel).values({
                name: country.name?.common.toLowerCase() ?? null,

                phoneCode: country.idd?.root
                    ? country.idd.root + (country.idd.suffixes?.[0] || "")
                    : null,

                flagUrl: country.flags?.png ?? null,
                iso2: country.cca2
            });
        }

        console.log("Countries inserted successfully");
    }

    seedCountries();
    return res.json("done");
});

seedLocationsRouter.get("/cities", async (req, res) => {
    try {

        // 1. Load countries
        const countryRows = await db.select().from(countriesModel);

        const countryMap = {};

        for (const c of countryRows) {
            countryMap[c.iso2] = c.id;   // PK, US, etc
        }

        console.log("Country map ready");

        // 2. File stream
        const fileStream = fs.createReadStream(
            process.cwd() + "/cities15000.txt"
        );

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        let batch = [];
        let inserted = 0;

        for await (const line of rl) {

            const cols = line.split("\t");

            const cityName = cols[1];
            const countryCode = cols[8]; // ✅ CORRECT

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

        res.json({ success: true, inserted });

    } catch (error) {
        console.log("SEED ERROR:", error);
        res.status(500).json({ error: "failed" });
    }
});


seedLocationsRouter.get("/getCountry", async (req, res, next) => {
    try {
        const countryName = req.query?.country;

        const getCountryDataFromDB = await db
            .select({
                id: countriesModel.id,
                name: countriesModel.name,
                phoneCode: countriesModel.phoneCode,
                flagUrl: countriesModel.flagUrl,
            })
            .from(countriesModel)
            .where(
                countryName ?
                    ilike(countriesModel.name, `%${countryName}%`)
                    : undefined
            );

        return res.status(200).json({
            success: true,
            message: "Country details",
            errors: null,
            payload: getCountryDataFromDB
        });

    } catch (error) {
        throw new AppError("Try to search you country again", 400,
            [{ field: "country", message: "Try to search you country again" }]);
    }
});

seedLocationsRouter.get("/getCity/:id", async (req, res, next) => {
    try {
        const countryId = Number(req.params?.id);
        if (!countryId) {
            return next(new AppError("Country is required", 400,
                [{ field: "city", message: "Country is required" }]));
        }

        const cityName = req.query?.city;

        const getCityFromSpecificCountry = await db
            .select({
                id: citiesModel.id,
                name: citiesModel.name
            })
            .from(citiesModel)
            .where(
                eq(citiesModel.countryId, countryId),
                ilike(citiesModel.name, `%${cityName}%`)
            );


        return res.status(200).json({
            success: true,
            message: "City details",
            errors: null,
            payload: getCityFromSpecificCountry
        });
    } catch (error) {
        throw new AppError("Try to search you country again", 400,
            [{ field: "city", message: "Try to search you country again" }]);
    }
})