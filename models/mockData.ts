// 月度概览数据
export const mockMonthlyData = [
  {
    month: 4, // 五月 (0-indexed)
    year: 2025,
    income: 12500,
    expenses: 8700,
  },
  {
    month: 3, // 四月
    year: 2025,
    income: 12000,
    expenses: 7800,
  },
];

// 分类数据（饼图）
export const mockCategoryData = [
  { name: "餐饮", amount: 2500, color: "#FF6B6B" },
  { name: "交通", amount: 1200, color: "#4ECDC4" },
  { name: "购物", amount: 1800, color: "#FFD166" },
  { name: "住房", amount: 2500, color: "#6C8EB6" },
  { name: "娱乐", amount: 700, color: "#C06C84" },
];

// 趋势数据（柱状图）
export const mockTrendData = [
  { date: "05-01", amount: 320 },
  { date: "05-05", amount: 450 },
  { date: "05-10", amount: 280 },
  { date: "05-15", amount: 600 },
  { date: "05-20", amount: 350 },
  { date: "05-25", amount: 420 },
  { date: "05-30", amount: 380 },
];

// 分类
export const mockCategories = [
  { id: "food", name: "餐饮", icon: "🍔", color: "#FF6B6B", type: "expense" },
  { id: "transport", name: "交通", icon: "🚗", color: "#4ECDC4", type: "expense" },
  { id: "shopping", name: "购物", icon: "🛍️", color: "#FFD166", type: "expense" },
  { id: "housing", name: "住房", icon: "🏠", color: "#6C8EB6", type: "expense" },
  { id: "entertainment", name: "娱乐", icon: "🎮", color: "#C06C84", type: "expense" },
  { id: "medical", name: "医疗", icon: "💊", color: "#F78FB3", type: "expense" },
  { id: "education", name: "教育", icon: "📚", color: "#3F72AF", type: "expense" },
  { id: "other_expense", name: "其他", icon: "📝", color: "#7F7F7F", type: "expense" },
  { id: "salary", name: "工资", icon: "💰", color: "#4CAF50", type: "income" },
  { id: "bonus", name: "奖金", icon: "🎁", color: "#8BC34A", type: "income" },
  { id: "investment", name: "投资", icon: "📈", color: "#009688", type: "income" },
  { id: "other_income", name: "其他", icon: "📝", color: "#7F7F7F", type: "income" },
];

// 交易记录
export const mockTransactions = [
  {
    id: "t1",
    title: "午餐",
    amount: -45,
    date: "2025-05-14T12:30:00",
    category: "food",
    categoryIcon: "🍔",
    categoryColor: "#FF6B6B",
    note: "公司附近的餐厅",
  },
  {
    id: "t2",
    title: "打车",
    amount: -35,
    date: "2025-05-14T09:15:00",
    category: "transport",
    categoryIcon: "🚗",
    categoryColor: "#4ECDC4",
    note: "去公司",
  },
  {
    id: "t3",
    title: "超市购物",
    amount: -210,
    date: "2025-05-13T18:45:00",
    category: "shopping",
    categoryIcon: "🛍️",
    categoryColor: "#FFD166",
    note: "周末采购",
  },
  {
    id: "t4",
    title: "电影票",
    amount: -80,
    date: "2025-05-12T20:00:00",
    category: "entertainment",
    categoryIcon: "🎮",
    categoryColor: "#C06C84",
    note: "周末看电影",
  },
  {
    id: "t5",
    title: "工资",
    amount: 12000,
    date: "2025-05-10T09:00:00",
    category: "salary",
    categoryIcon: "💰",
    categoryColor: "#4CAF50",
    note: "5月工资",
  },
];
