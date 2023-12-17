import { merge } from "webpack-merge";
import common from "./webpack.common";

const config = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
});

export default config;
