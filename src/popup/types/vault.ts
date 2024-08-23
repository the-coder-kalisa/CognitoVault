export interface Vault {
  id: string;
  domain: string;
  cookies: chrome.cookies.Cookie[];
  localStorage: Record<string, string>;
  url: string;
  receipts: string[];
  imported: string[];
  sharedBy: string;
}
