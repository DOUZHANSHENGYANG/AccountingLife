import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  Transaction, 
  Category, 
  Budget, 
  MonthlyData, 
  UserSettings,
  UserProfile,
  FamilySharing
} from '../models/types';
import { mockCategories, mockTransactions } from '../models/mockData';

// 存储键名
const STORAGE_KEYS = {
  TRANSACTIONS: 'transactions',
  CATEGORIES: 'categories',
  BUDGETS: 'budgets',
  MONTHLY_DATA: 'monthlyData',
  USER_SETTINGS: 'userSettings',
  USER_PROFILE: 'userProfile',
  FAMILY_SHARING: 'familySharing',
};

// 存储服务
class StorageService {
  // 初始化存储，如果没有数据则使用模拟数据
  async initializeStorage(): Promise<void> {
    try {
      // 检查是否已经初始化
      const isInitialized = await AsyncStorage.getItem('isInitialized');
      
      if (!isInitialized) {
        // 使用模拟数据初始化
        await this.saveCategories(mockCategories as Category[]);
        await this.saveTransactions(mockTransactions as Transaction[]);
        
        // 设置默认用户设置
        const defaultSettings: UserSettings = {
          theme: 'dark',
          currency: 'CNY',
          language: 'zh-CN',
          notificationsEnabled: true,
        };
        await this.saveUserSettings(defaultSettings);
        
        // 标记为已初始化
        await AsyncStorage.setItem('isInitialized', 'true');
      }
    } catch (error) {
      console.error('初始化存储失败:', error);
      throw error;
    }
  }

  // 交易记录相关操作
  async getTransactions(): Promise<Transaction[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('获取交易记录失败:', error);
      return [];
    }
  }

  async saveTransactions(transactions: Transaction[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(transactions);
      await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, jsonValue);
    } catch (error) {
      console.error('保存交易记录失败:', error);
      throw error;
    }
  }

  async addTransaction(transaction: Transaction): Promise<void> {
    try {
      const transactions = await this.getTransactions();
      transactions.push(transaction);
      await this.saveTransactions(transactions);
    } catch (error) {
      console.error('添加交易记录失败:', error);
      throw error;
    }
  }

  async updateTransaction(updatedTransaction: Transaction): Promise<void> {
    try {
      const transactions = await this.getTransactions();
      const index = transactions.findIndex(t => t.id === updatedTransaction.id);
      
      if (index !== -1) {
        transactions[index] = updatedTransaction;
        await this.saveTransactions(transactions);
      } else {
        throw new Error('交易记录不存在');
      }
    } catch (error) {
      console.error('更新交易记录失败:', error);
      throw error;
    }
  }

  async deleteTransaction(id: string): Promise<void> {
    try {
      const transactions = await this.getTransactions();
      const filteredTransactions = transactions.filter(t => t.id !== id);
      await this.saveTransactions(filteredTransactions);
    } catch (error) {
      console.error('删除交易记录失败:', error);
      throw error;
    }
  }

  // 分类相关操作
  async getCategories(): Promise<Category[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('获取分类失败:', error);
      return [];
    }
  }

  async saveCategories(categories: Category[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(categories);
      await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, jsonValue);
    } catch (error) {
      console.error('保存分类失败:', error);
      throw error;
    }
  }

  // 预算相关操作
  async getBudgets(): Promise<Budget[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.BUDGETS);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('获取预算失败:', error);
      return [];
    }
  }

  async saveBudgets(budgets: Budget[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(budgets);
      await AsyncStorage.setItem(STORAGE_KEYS.BUDGETS, jsonValue);
    } catch (error) {
      console.error('保存预算失败:', error);
      throw error;
    }
  }

  // 月度数据相关操作
  async getMonthlyData(): Promise<MonthlyData[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.MONTHLY_DATA);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('获取月度数据失败:', error);
      return [];
    }
  }

  async saveMonthlyData(monthlyData: MonthlyData[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(monthlyData);
      await AsyncStorage.setItem(STORAGE_KEYS.MONTHLY_DATA, jsonValue);
    } catch (error) {
      console.error('保存月度数据失败:', error);
      throw error;
    }
  }

  // 用户设置相关操作
  async getUserSettings(): Promise<UserSettings | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('获取用户设置失败:', error);
      return null;
    }
  }

  async saveUserSettings(settings: UserSettings): Promise<void> {
    try {
      const jsonValue = JSON.stringify(settings);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_SETTINGS, jsonValue);
    } catch (error) {
      console.error('保存用户设置失败:', error);
      throw error;
    }
  }

  // 清除所有数据（用于测试或重置）
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('清除所有数据失败:', error);
      throw error;
    }
  }
}

// 导出单例实例
export const storageService = new StorageService();
