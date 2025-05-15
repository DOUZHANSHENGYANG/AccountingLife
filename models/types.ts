// 定义应用中使用的所有数据模型类型

// 交易记录类型
export interface Transaction {
  id: string;
  title: string;
  amount: number; // 正数表示收入，负数表示支出
  date: string; // ISO 格式的日期字符串
  category: string; // 分类ID
  categoryIcon?: string;
  categoryColor?: string;
  note?: string;
  attachmentUrl?: string;
}

// 分类类型
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'expense' | 'income';
  parentId?: string;
  children?: Category[];
}

// 预算类型
export interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  period: 'monthly' | 'yearly';
  spent: number;
  year: number;
  month?: number; // 仅当 period 为 'monthly' 时有效
}

// 月度概览数据类型
export interface MonthlyData {
  month: number; // 0-11 表示 1-12 月
  year: number;
  income: number;
  expenses: number;
}

// 分类统计数据类型（用于饼图）
export interface CategoryData {
  name: string;
  amount: number;
  color: string;
  icon?: string;
}

// 趋势数据类型（用于柱状图）
export interface TrendData {
  date: string;
  amount: number;
}

// 用户设置类型
export interface UserSettings {
  theme: 'light' | 'dark';
  currency: string;
  language: string;
  notificationsEnabled: boolean;
}

// 用户信息类型
export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  createdAt: string;
}

// 家庭共享类型
export interface FamilySharing {
  id: string;
  name: string;
  members: {
    id: string;
    name: string;
    avatar?: string;
    role: 'admin' | 'member';
  }[];
  createdAt: string;
}
