export enum AppStatus {
  Enabled = "Enabled",
  Disabled = "Disabled",
  Unknowed = "Unknowed",
}

export enum AppCategories {
  CreativeDesign = "创意设计",
  EnhanceImages = "美图",
}

export enum AccessType {
  PageView = "PageView",
  ClickGenerate = "ClickGenerate",
}

export enum RankTypes {
  Week = "Week",
  Month = "Month",
  Total = "Total",
}

export type AppEntityTypeWithPrompt = {
  id: number;
  name: string;
  points: number;
  status: string;
  createAt: Date;
  updateAt: Date;
  routeId: number;
  category: string;
  tags: string[];
  keywords: string[];
  description: string;
  seoKeywords: string[];
  seoDescription: string;
  model: string;
  source: string;
  icon: string;
  barImg: string;
  rate: string;
  useCount: number;
};
