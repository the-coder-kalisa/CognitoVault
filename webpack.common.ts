import path from "path";
import { Configuration } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: Configuration = {
  entry: {
    popup: "./src/popup/index.tsx",
    contentScript: "./src/contentScript/contentScript.ts",
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx?$|\.d\.ts$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader", // postcss loader needed for tailwindcss
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      '@': path.resolve(__dirname, 'src/popup'),
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve("src/static"), to: path.resolve("dist") },
      ],
    }),
    ...getHtmlPlugins(["popup"]),
  ],
};

function getHtmlPlugins(chunks: string[]) {
  return chunks.map(
    (chunk: string) =>
      new HtmlWebpackPlugin({
        title: "CognitoVault",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}

export default config;
