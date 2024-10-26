import fs from "node:fs";

const env = fs.readFileSync(".env", "utf8");
const envArr = env.split("\n");
const envObj = {};
envArr.forEach((line) => {
  const [key, value] = line.split("=");
  envObj[key] = value;
});

console.log(`Loaded env: ${JSON.stringify(envObj)}`);

const indexHtml = fs.readFileSync("dist/index.html", "utf8");

const updatedIndexHtml = indexHtml.replace(
  /window\.env.*$/m,
  `window.env = ${JSON.stringify(envObj)};`
);

// const updatedIndexHtml = indexHtml.replace(/window/, `windoww`);

console.debug(`Updated index.html: ${updatedIndexHtml}`);

fs.writeFileSync("dist/index.html", updatedIndexHtml);
