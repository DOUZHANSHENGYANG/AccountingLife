import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { months } from '../constants';
import { COLORS } from '../constants';
import MonthlyOverview from '../components/MonthlyOverview';
import StatisticsChart from '../components/StatisticsChart';
import RecentTransactions from '../components/RecentTransactions';

const HomeScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? COLORS.background.dark : COLORS.background.light }
    ]}>
      {/* 装饰元素 */}
      <View style={styles.decorativeContainer}>
        <View style={[
          styles.decorativeTop,
          { backgroundColor: isDarkMode ? 'rgba(108, 142, 182, 0.1)' : 'rgba(108, 142, 182, 0.05)' }
        ]} />
        <View style={[
          styles.decorativeBottom,
          { backgroundColor: isDarkMode ? 'rgba(255, 107, 107, 0.1)' : 'rgba(255, 107, 107, 0.05)' }
        ]} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* 头部 */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[
              styles.title,
              { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
            ]}>
              智能记账
            </Text>
          </View>
          <View style={styles.monthSelector}>
            <TouchableOpacity
              onPress={handlePreviousMonth}
              style={[
                styles.monthButton,
                { backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)' }
              ]}
            >
              <Text style={{ color: COLORS.primary }}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={[
              styles.monthText,
              { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
            ]}>
              {months[currentMonth]} {currentYear}
            </Text>
            <TouchableOpacity
              onPress={handleNextMonth}
              style={[
                styles.monthButton,
                { backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)' }
              ]}
            >
              <Text style={{ color: COLORS.primary }}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 月度概览 */}
        <MonthlyOverview month={currentMonth} year={currentYear} />

        {/* 统计图表 */}
        <StatisticsChart month={currentMonth} year={currentYear} />

        {/* 最近交易 */}
        <RecentTransactions month={currentMonth} year={currentYear} />
      </ScrollView>

      {/* 添加交易按钮 */}
      <TouchableOpacity
        style={[
          styles.addButton,
          { backgroundColor: COLORS.primary }
        ]}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  decorativeContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  decorativeTop: {
    position: 'absolute',
    top: -100,
    left: 0,
    width: '100%',
    height: 200,
    borderRadius: 100,
    transform: [{ scaleX: 2 }],
  },
  decorativeBottom: {
    position: 'absolute',
    bottom: -100,
    right: 0,
    width: '100%',
    height: 200,
    borderRadius: 100,
    transform: [{ scaleX: 2 }],
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(108, 142, 182, 0.2)',
  },
  monthText: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  card: {
    marginBottom: 16,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(108, 142, 182, 0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default HomeScreen;
