import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Card from './ui/Card';
import { COLORS } from '../constants';
import { mockMonthlyData } from '../models/mockData';
import { formatCurrency } from '../utils';
import Progress from './ui/Progress';
import ArrowIcon from './ui/ArrowIcon';

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
        <View style={styles.gridItem}>
          <View style={styles.gridItemContent}>
            <View style={styles.gridItemLeft}>
              <Text style={[
                styles.gridItemLabel,
                { color: isDarkMode ? '#94A3B8' : '#64748B' }
              ]}>
                收入
              </Text>
              <Text style={[styles.incomeValue, { color: '#4CAF50' }]}>
                {formatCurrency(data.income)}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <View style={[styles.iconCircle, { backgroundColor: '#4CAF50' }]}>
                <ArrowIcon direction="right" color="#FFFFFF" size={16} />
              </View>
            </View>
          </View>
        </View>

        {/* 支出 */}
        <View style={styles.gridItem}>
          <View style={styles.gridItemContent}>
            <View style={styles.gridItemLeft}>
              <Text style={[
                styles.gridItemLabel,
                { color: isDarkMode ? '#94A3B8' : '#64748B' }
              ]}>
                支出
              </Text>
              <Text style={[styles.expenseValue, { color: '#FF6B6B' }]}>
                {formatCurrency(data.expenses)}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <View style={[styles.iconCircle, { backgroundColor: '#FF6B6B' }]}>
                <ArrowIcon direction="left" color="#FFFFFF" size={16} />
              </View>
            </View>
          </View>
        </View>

        {/* 结余 */}
        <View style={[styles.gridItem, styles.lastGridItem]}>
          <View style={styles.gridItemContent}>
            <View style={styles.gridItemLeft}>
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
            <View style={styles.iconContainer}>
              <View style={[styles.iconCircle, { backgroundColor: '#4CAF50' }]}>
                <ArrowIcon direction="right" color="#FFFFFF" size={16} />
              </View>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <Progress
              value={data.income}
              max={data.income + data.expenses}
              indicatorColor="#6C8EB6"
              trackColor={isDarkMode ? '#1E293B' : '#E2E8F0'}
              style={styles.progress}
            />
            <View style={styles.progressLabels}>
              <Text style={{ color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }}>收入</Text>
              <Text style={{ color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }}>支出</Text>
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
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'column',
    gap: 16,
  },
  gridItem: {
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#131C2E',
    marginBottom: 12,
    paddingHorizontal: 16,
    shadowColor: '#6C8EB6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(108, 142, 182, 0.1)',
  },
  lastGridItem: {
    marginBottom: 0,
  },
  gridItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  gridItemLeft: {
    flexDirection: 'column',
  },
  gridItemLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  incomeValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  expenseValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  changeContainer: {
    marginTop: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 16,
  },
  progress: {
    marginBottom: 4,
    height: 6,
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MonthlyOverview;
