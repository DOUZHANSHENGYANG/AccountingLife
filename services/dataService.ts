import { 
  Transaction, 
  Category, 
  Budget, 
  MonthlyData, 
  CategoryData,
  TrendData
} from '../models/types';
import { storageService } from './storage';

// 数据服务
class DataService {
  // 获取指定月份的交易记录
  async getTransactionsByMonth(month: number, year: number): Promise<Transaction[]> {
    try {
      const transactions = await storageService.getTransactions();
      return transactions.filter(transaction => {
        const date = new Date(transaction.date);
        return date.getMonth() === month && date.getFullYear() === year;
      });
    } catch (error) {
      console.error('获取月度交易记录失败:', error);
      return [];
    }
  }

  // 获取最近的交易记录
  async getRecentTransactions(limit: number = 5): Promise<Transaction[]> {
    try {
      const transactions = await storageService.getTransactions();
      return transactions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('获取最近交易记录失败:', error);
      return [];
    }
  }

  // 添加新交易记录
  async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    try {
      const newTransaction: Transaction = {
        ...transaction,
        id: `t_${Date.now()}`,
      };
      
      await storageService.addTransaction(newTransaction);
      
      // 更新月度数据
      await this.updateMonthlyData(newTransaction);
      
      // 更新预算数据
      if (transaction.amount < 0) {
        await this.updateBudgetSpending(transaction.category, Math.abs(transaction.amount));
      }
      
      return newTransaction;
    } catch (error) {
      console.error('添加交易记录失败:', error);
      throw error;
    }
  }

  // 更新月度数据
  private async updateMonthlyData(transaction: Transaction): Promise<void> {
    try {
      const date = new Date(transaction.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      
      let monthlyData = await storageService.getMonthlyData();
      let monthData = monthlyData.find(data => data.month === month && data.year === year);
      
      if (!monthData) {
        // 如果没有当月数据，创建新的
        monthData = {
          month,
          year,
          income: 0,
          expenses: 0,
        };
        monthlyData.push(monthData);
      }
      
      // 更新收入或支出
      if (transaction.amount > 0) {
        monthData.income += transaction.amount;
      } else {
        monthData.expenses += Math.abs(transaction.amount);
      }
      
      await storageService.saveMonthlyData(monthlyData);
    } catch (error) {
      console.error('更新月度数据失败:', error);
      throw error;
    }
  }

  // 更新预算支出
  private async updateBudgetSpending(categoryId: string, amount: number): Promise<void> {
    try {
      const budgets = await storageService.getBudgets();
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      // 查找匹配的预算
      const matchingBudget = budgets.find(
        budget => 
          budget.categoryId === categoryId && 
          budget.year === currentYear && 
          (budget.period === 'yearly' || budget.month === currentMonth)
      );
      
      if (matchingBudget) {
        matchingBudget.spent += amount;
        await storageService.saveBudgets(budgets);
      }
    } catch (error) {
      console.error('更新预算支出失败:', error);
      throw error;
    }
  }

  // 获取指定月份的分类统计数据（用于饼图）
  async getCategoryDataByMonth(month: number, year: number): Promise<CategoryData[]> {
    try {
      const transactions = await this.getTransactionsByMonth(month, year);
      const categories = await storageService.getCategories();
      
      // 只统计支出
      const expenseTransactions = transactions.filter(t => t.amount < 0);
      
      // 按分类汇总
      const categoryMap = new Map<string, number>();
      
      for (const transaction of expenseTransactions) {
        const amount = Math.abs(transaction.amount);
        const currentAmount = categoryMap.get(transaction.category) || 0;
        categoryMap.set(transaction.category, currentAmount + amount);
      }
      
      // 转换为饼图数据
      const result: CategoryData[] = [];
      
      for (const [categoryId, amount] of categoryMap.entries()) {
        const category = categories.find(c => c.id === categoryId);
        
        if (category) {
          result.push({
            name: category.name,
            amount,
            color: category.color,
            icon: category.icon,
          });
        }
      }
      
      return result;
    } catch (error) {
      console.error('获取分类统计数据失败:', error);
      return [];
    }
  }

  // 获取指定月份的趋势数据（用于柱状图）
  async getTrendDataByMonth(month: number, year: number): Promise<TrendData[]> {
    try {
      const transactions = await this.getTransactionsByMonth(month, year);
      
      // 只统计支出
      const expenseTransactions = transactions.filter(t => t.amount < 0);
      
      // 按日期汇总
      const dateMap = new Map<string, number>();
      
      for (const transaction of expenseTransactions) {
        const date = new Date(transaction.date);
        const dateStr = `${month + 1}-${date.getDate().toString().padStart(2, '0')}`;
        const amount = Math.abs(transaction.amount);
        const currentAmount = dateMap.get(dateStr) || 0;
        dateMap.set(dateStr, currentAmount + amount);
      }
      
      // 转换为趋势数据
      const result: TrendData[] = [];
      
      for (const [date, amount] of dateMap.entries()) {
        result.push({
          date,
          amount,
        });
      }
      
      // 按日期排序
      result.sort((a, b) => {
        const dateA = parseInt(a.date.split('-')[1]);
        const dateB = parseInt(b.date.split('-')[1]);
        return dateA - dateB;
      });
      
      return result;
    } catch (error) {
      console.error('获取趋势数据失败:', error);
      return [];
    }
  }

  // 获取指定月份的月度概览数据
  async getMonthlyOverview(month: number, year: number): Promise<MonthlyData | null> {
    try {
      const monthlyData = await storageService.getMonthlyData();
      return monthlyData.find(data => data.month === month && data.year === year) || null;
    } catch (error) {
      console.error('获取月度概览数据失败:', error);
      return null;
    }
  }
}

// 导出单例实例
export const dataService = new DataService();
