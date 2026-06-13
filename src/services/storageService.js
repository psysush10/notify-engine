import fs from "fs";
import path from "path";


const readJsonFile = (filePath) => {

  if (!fs.existsSync(filePath)) {
    return {};
  }

  const data =
    fs.readFileSync(
      filePath,
      "utf-8"
    );

  return JSON.parse(data);
};

const writeJsonFile = (
  filePath,
  data
) => {

  fs.writeFileSync(
    filePath,
    JSON.stringify(
      data,
      null,
      2
    )
  );
};

export {
  readJsonFile,
  writeJsonFile
};