export interface Animal {
  id: number;
  created_at: string;
  tags: Record<string, string>;
  images: string[];
  "dog/cat": "dog" | "cat";
  name: string;
}

export interface CookieData {
  data: Animal[];
  timestamp: number;
}
