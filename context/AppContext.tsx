import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Transaction, 
  Category, 
  Budget, 
  MonthlyData, 
  CategoryData,
  TrendData,
  UserSettings
} from '../models/types';
import { dataService } from '../services/dataService';
import { storageService } from '../services/storage';

// 上下文状态类型
interface AppContextState {
  // 数据状态
  transactions: Transaction[];
  categories: Category[];
  budgets: Budget[];
  monthlyData: MonthlyData | null;
  categoryData: CategoryData[];
  trendData: TrendData[];
  recentTransactions: Transaction[];
  
  // 应用状态
  isLoading: boolean;
  currentMonth: number;
  currentYear: number;
  
  // 用户设置
  userSettings: UserSettings | null;
  
  // 操作方法
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  updateCategories: (categories: Category[]) => Promise<void>;
  updateBudgets: (budgets: Budget[]) => Promise<void>;
  updateUserSettings: (settings: UserSettings) => Promise<void>;
  setCurrentMonth: (month: number) => void;
  setCurrentYear: (year: number) => void;
  refreshData: () => Promise<void>;
}

// 创建上下文
const AppContext = createContext<AppContextState | undefined>(undefined);

// 上下文提供者组件
export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 数据状态
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  
  // 应用状态
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // 用户设置
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  
  // 初始化数据
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        
        // 初始化存储
        await storageService.initializeStorage();
        
        // 加载用户设置
        const settings = await storageService.getUserSettings();
        setUserSettings(settings);
        
        // 加载数据
        await refreshData();
        
        setIsLoading(false);
      } catch (error) {
        console.error('初始化数据失败:', error);
        setIsLoading(false);
      }
    };
    
    initializeData();
  }, []);
  
  // 当月份或年份变化时，刷新数据
  useEffect(() => {
    refreshData();
  }, [currentMonth, currentYear]);
  
  // 刷新数据
  const refreshData = async () => {
    try {
      setIsLoading(true);
      
      // 加载分类
      const categoriesData = await storageService.getCategories();
      setCategories(categoriesData);
      
      // 加载预算
      const budgetsData = await storageService.getBudgets();
      setBudgets(budgetsData);
      
      // 加载当月交易记录
      const transactionsData = await dataService.getTransactionsByMonth(currentMonth, currentYear);
      setTransactions(transactionsData);
      
      // 加载月度概览数据
      const monthlyOverview = await dataService.getMonthlyOverview(currentMonth, currentYear);
      setMonthlyData(monthlyOverview);
      
      // 加载分类统计数据
      const categoryStats = await dataService.getCategoryDataByMonth(currentMonth, currentYear);
      setCategoryData(categoryStats);
      
      // 加载趋势数据
      const trendStats = await dataService.getTrendDataByMonth(currentMonth, currentYear);
      setTrendData(trendStats);
      
      // 加载最近交易记录
      const recentTrans = await dataService.getRecentTransactions(5);
      setRecentTransactions(recentTrans);
      
      setIsLoading(false);
    } catch (error) {
      console.error('刷新数据失败:', error);
      setIsLoading(false);
    }
  };
  
  // 添加交易记录
  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      await dataService.addTransaction(transaction);
      await refreshData();
    } catch (error) {
      console.error('添加交易记录失败:', error);
      throw error;
    }
  };
  
  // 更新交易记录
  const updateTransaction = async (transaction: Transaction) => {
    try {
      await storageService.updateTransaction(transaction);
      await refreshData();
    } catch (error) {
      console.error('更新交易记录失败:', error);
      throw error;
    }
  };
  
  // 删除交易记录
  const deleteTransaction = async (id: string) => {
    try {
      await storageService.deleteTransaction(id);
      await refreshData();
    } catch (error) {
      console.error('删除交易记录失败:', error);
      throw error;
    }
  };
  
  // 更新分类
  const updateCategories = async (updatedCategories: Category[]) => {
    try {
      await storageService.saveCategories(updatedCategories);
      setCategories(updatedCategories);
    } catch (error) {
      console.error('更新分类失败:', error);
      throw error;
    }
  };
  
  // 更新预算
  const updateBudgets = async (updatedBudgets: Budget[]) => {
    try {
      await storageService.saveBudgets(updatedBudgets);
      setBudgets(updatedBudgets);
    } catch (error) {
      console.error('更新预算失败:', error);
      throw error;
    }
  };
  
  // 更新用户设置
  const updateUserSettings = async (settings: UserSettings) => {
    try {
      await storageService.saveUserSettings(settings);
      setUserSettings(settings);
    } catch (error) {
      console.error('更新用户设置失败:', error);
      throw error;
    }
  };
  
  // 上下文值
  const contextValue: AppContextState = {
    transactions,
    categories,
    budgets,
    monthlyData,
    categoryData,
    trendData,
    recentTransactions,
    isLoading,
    currentMonth,
    currentYear,
    userSettings,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateCategories,
    updateBudgets,
    updateUserSettings,
    setCurrentMonth,
    setCurrentYear,
    refreshData,
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// 自定义钩子，用于访问上下文
export const useAppContext = () => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  
  return context;
};
