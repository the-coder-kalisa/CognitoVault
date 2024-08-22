export interface Vault {
  cookies: chrome.cookies.Cookie[];
  localStorage: { [key: string]: string };
  url: string;
  receipts: string[];
  imported: string[];
  path: string;
  sharedBy: string;
}
