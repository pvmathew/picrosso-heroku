// file.js - contains helper function that reads in Nonogram
import axios from "axios";

export const loadNonogram = async () => {
  let res = await axios(
    "https://raw.githubusercontent.com/mikix/nonogram-db/master/db/gnonograms/42.non"
  );
  let data = res.data;
  const lines = data.split("\n");
  let width, height, ans, currentLine, ans_count;

  for (let index = 0; index < lines.length; ++index) {
    currentLine = lines[index];
    if (currentLine.includes("height")) {
      height = parseInt(currentLine.slice(7, currentLine.length));
    }
    if (currentLine.includes("width")) {
      width = parseInt(currentLine.slice(6, currentLine.length));
    }
    if (currentLine.includes("goal")) {
      ans = currentLine.slice(5, currentLine.length).replace(/['"]+/g, "");
      ans_count = ans
        .split("")
        .map(Number)
        .reduce((a, b) => a + b, 0);
    }

    if (width && height && ans) break;
  }

  const getRows = (height) => {
    const startingIndex = lines.indexOf("rows") + 1;
    return lines
      .slice(startingIndex, startingIndex + height)
      .map((row) => row.split(",").map((num) => parseInt(num)));
  };
  const getColumns = (width) => {
    const startingIndex = lines.indexOf("columns") + 1;
    console.log("Starting index width: " + startingIndex);
    return lines
      .slice(startingIndex, startingIndex + width)
      .map((column) => column.split(",").map((num) => parseInt(num)));
  };
  const toPsqlStr = (data) => {
    let values = data
      .map(([k, v, z]) => {
        let returnString = `[${k}`;
        if (v) {
          returnString += `, ${v}`;
        }
        if (z) {
          returnString += `, ${z}]`;
        } else {
          returnString += `]`;
        }
        return returnString;
      })
      .join(`,`);
    return `[${values}]`;
  };

  let rows = toPsqlStr(getRows(height));
  let columns = toPsqlStr(getColumns(width));

  return { height, width, ans, rows, columns, ans_count };
};
