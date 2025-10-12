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

export type AppDisplayType = {
  routeId: string;
  icon: string;
  name: string;
  description: string;
  category: string;
  rate: number;
  useCount: number;
};
