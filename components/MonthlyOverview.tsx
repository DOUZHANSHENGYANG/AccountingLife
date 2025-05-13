import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Card from './ui/Card';
import { COLORS } from '../constants';
import { mockMonthlyData } from '../models/mockData';
import { formatCurrency } from '../utils';
import Progress from './ui/Progress';

interface MonthlyOverviewProps {
  month: number;
  year: number;
}

const MonthlyOverview: React.FC<MonthlyOverviewProps> = ({ month, year }) => {
  const { isDarkMode } = useTheme();

  // 获取选定月份的数据
  const data = mockMonthlyData.find((item) => item.month === month && item.year === year) || mockMonthlyData[0];

  const balance = data.income - data.expenses;
  const isPositive = balance >= 0;

  // 获取上个月的数据用于比较
  const prevMonthData = mockMonthlyData.find((item) => {
    if (month === 0) {
      return item.month === 11 && item.year === year - 1;
    }
    return item.month === month - 1 && item.year === year;
  });

  // 计算百分比变化
  const incomeChange = prevMonthData ? ((data.income - prevMonthData.income) / prevMonthData.income) * 100 : 0;
  const expensesChange = prevMonthData ? ((data.expenses - prevMonthData.expenses) / prevMonthData.expenses) * 100 : 0;

  return (
    <Card style={styles.card}>
      <Text style={[
        styles.title,
        { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
      ]}>
        月度概览
      </Text>

      <View style={styles.grid}>
        {/* 收入 */}
        <View style={[
          styles.gridItem,
          { backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(248, 250, 252, 0.6)' }
        ]}>
          <View style={styles.gridItemHeader}>
            <View>
              <Text style={[
                styles.gridItemLabel,
                { color: isDarkMode ? '#94A3B8' : '#64748B' }
              ]}>
                收入
              </Text>
              <Text style={styles.incomeValue}>{formatCurrency(data.income)}</Text>
            </View>
            <View style={[
              styles.iconContainer,
              { backgroundColor: 'rgba(76, 175, 80, 0.1)' }
            ]}>
              <Text style={styles.icon}>↑</Text>
            </View>
          </View>
          {prevMonthData && (
            <View style={styles.changeContainer}>
              <Text style={[
                styles.changeText,
                { color: incomeChange >= 0 ? '#4CAF50' : '#FF6B6B' }
              ]}>
                {incomeChange >= 0 ? '↑' : '↓'} {Math.abs(incomeChange).toFixed(1)}%
              </Text>
              <Text style={[
                styles.comparedText,
                { color: isDarkMode ? '#94A3B8' : '#64748B' }
              ]}>
                相比上月
              </Text>
            </View>
          )}
        </View>

        {/* 支出 */}
        <View style={[
          styles.gridItem,
          { backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(248, 250, 252, 0.6)' }
        ]}>
          <View style={styles.gridItemHeader}>
            <View>
              <Text style={[
                styles.gridItemLabel,
                { color: isDarkMode ? '#94A3B8' : '#64748B' }
              ]}>
                支出
              </Text>
              <Text style={styles.expenseValue}>{formatCurrency(data.expenses)}</Text>
            </View>
            <View style={[
              styles.iconContainer,
              { backgroundColor: 'rgba(255, 107, 107, 0.1)' }
            ]}>
              <Text style={styles.icon}>↓</Text>
            </View>
          </View>
          {prevMonthData && (
            <View style={styles.changeContainer}>
              <Text style={[
                styles.changeText,
                { color: expensesChange <= 0 ? '#4CAF50' : '#FF6B6B' }
              ]}>
                {expensesChange >= 0 ? '↑' : '↓'} {Math.abs(expensesChange).toFixed(1)}%
              </Text>
              <Text style={[
                styles.comparedText,
                { color: isDarkMode ? '#94A3B8' : '#64748B' }
              ]}>
                相比上月
              </Text>
            </View>
          )}
        </View>

        {/* 结余 */}
        <View style={[
          styles.gridItem,
          { backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(248, 250, 252, 0.6)' }
        ]}>
          <View style={styles.gridItemHeader}>
            <View>
              <Text style={[
                styles.gridItemLabel,
                { color: isDarkMode ? '#94A3B8' : '#64748B' }
              ]}>
                结余
              </Text>
              <Text style={[
                styles.balanceValue,
                { color: isPositive ? '#4CAF50' : '#FF6B6B' }
              ]}>
                {formatCurrency(balance)}
              </Text>
            </View>
            <View style={[
              styles.iconContainer,
              { backgroundColor: isPositive ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 107, 107, 0.1)' }
            ]}>
              <Text style={styles.icon}>{isPositive ? '↑' : '↓'}</Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <Progress 
              value={data.income} 
              max={data.income + data.expenses} 
              indicatorColor="rgba(108, 142, 182, 0.8)"
              style={styles.progress}
            />
            <View style={styles.progressLabels}>
              <Text style={{ color: '#4CAF50', fontSize: 12 }}>收入</Text>
              <Text style={{ color: '#FF6B6B', fontSize: 12 }}>支出</Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'column',
    gap: 12,
  },
  gridItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.1)',
  },
  gridItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  gridItemLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  incomeValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
  },
  expenseValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B6B',
  },
  balanceValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    color: '#6C8EB6',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4,
  },
  comparedText: {
    fontSize: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progress: {
    marginBottom: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MonthlyOverview;
