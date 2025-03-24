const fs = require("fs");
const path = require("path");
const SVGSpriter = require("svg-sprite");

const inputDir = path.join(__dirname, "input");
const outputDir = path.join(__dirname, "output");

const spriter = new SVGSpriter({
  mode: {
    symbol: {
      dest: ".",
      sprite: "sprite.svg",
    },
  },
  shape: {
    id: {
      generator: (name) => path.basename(name, ".svg"),
    },
  },
});

{/* <svg><use xlink:href="output/sprite.svg#icon-name"></use></svg> */}


fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Ошибка чтения папки:", err);
    return;
  }

  files
    .filter((file) => file.endsWith(".svg"))
    .forEach((file) => {
      const filePath = path.join(inputDir, file);
      spriter.add(filePath, file, fs.readFileSync(filePath, "utf-8"));
    });

  spriter.compile((error, result) => {
    if (error) {
      console.error("Ошибка сборки спрайта:", error);
      return;
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(outputDir, "sprite.svg"),
      result.symbol.sprite.contents
    );

    console.log("Спрайт успешно собран!");
  });
});
