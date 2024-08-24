export interface Vault {
  // Unique identifier for the vault
  id: string;
  
  // Domain associated with the vault
  domain: string;
  
  // Array of cookies stored in the vault
  cookies: chrome.cookies.Cookie[];
  
  // Local storage key-value pairs
  localStorage: Record<string, string>;
  
  // URL of the website associated with the vault
  url: string;
  
  // List of receipts associated with the vault
  receipts: string[];
  
  // List of users imported vault into the vault
  imported: string[];
  
  // User email of the person who shared the vault
  sharedBy: string;
}
