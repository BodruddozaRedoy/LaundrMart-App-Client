module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // 👇 Always keep Reanimated as the last plugin
      "react-native-reanimated/plugin",
    ],
  };
};
