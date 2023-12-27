import axios from "axios";
import { parse } from "node-html-parser";
import { AxiosResponse } from "axios";

interface OpenGraphMetadata {
  [key: string]: any;
}

export const sanitizeKey = (key: string) => {
  return key.replace(/[.#$/[\]]/g, (match) => {
    switch (match) {
      case ".":
        return "_DOT_";
      case "#":
        return "_HASH_";
      case "$":
        return "_DOLLAR_";
      case "/":
        return "_SLASH_";
      case "[":
        return "_LEFT_BRACKET_";
      case "]":
        return "_RIGHT_BRACKET_";
      default:
        return match;
    }
  });
};

export const unsanitizeKey = (key: string) => {
  return key.replace(
    /_DOT_|_HASH_|_DOLLAR_|_SLASH_|_LEFT_BRACKET_|_RIGHT_BRACKET_/g,
    (match) => {
      switch (match) {
        case "_DOT_":
          return ".";
        case "_HASH_":
          return "#";
        case "_DOLLAR_":
          return "$";
        case "_SLASH_":
          return "/";
        case "_LEFT_BRACKET_":
          return "[";
        case "_RIGHT_BRACKET_":
          return "]";
        default:
          return match;
      }
    }
  );
};

export const fetchOpenGraphMetadata = async (
  url: string
): Promise<OpenGraphMetadata> => {
  try {
    const response: AxiosResponse<string> = await axios.get(
      "https://youtube.com"
    );
    const root = parse(response.data);
    const metaTags = root.querySelectorAll("meta");
    const metaTagObj: OpenGraphMetadata = {};

    metaTags.forEach((metaTag) => {
      if (metaTag.attributes.property) {
        metaTagObj[metaTag.attributes.property] = metaTag.attributes.content;
      } else if (metaTag.attributes.name) {
        metaTagObj[metaTag.attributes.name] = metaTag.attributes.content;
      }
    });

    metaTagObj.title = root.querySelector("title")?.text;

    return metaTagObj;
  } catch (error) {
    throw error;
  }
};
