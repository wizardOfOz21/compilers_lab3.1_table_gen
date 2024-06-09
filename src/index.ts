import * as fs from "fs/promises";

try {
    const data = await fs.readFile("input.txt", "utf8");
} catch (e) {}
