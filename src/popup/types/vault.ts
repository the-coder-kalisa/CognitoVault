export interface Vault {
  domain: string;
  cookies: chrome.cookies.Cookie[];
  localStorage: Record<string, string>;
  url: string;
  receipts: string[];
  imported: string[];
  sharedBy: string;
}
