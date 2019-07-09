const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    "@babel/plugin-transform-runtime",
    [
      "emotion",
      {
        sourceMap: !prod,
        autoLabel: !prod,
        labelFormat: "[local]",
        cssPropOptimization: false,
      },
    ],
  ],
};
