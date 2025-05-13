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
      { backgroundColor: isDarkMode ? '#0A101F' : COLORS.background.light }
    ]}>
      {/* 背景装饰 */}
      <View style={styles.backgroundDecoration}>
        <View style={styles.backgroundCircle1} />
        <View style={styles.backgroundCircle2} />
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* 头部导航栏 */}
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuIcon}>≡</Text>
          </TouchableOpacity>

          <Text style={styles.navTitle}>
            智能记账
          </Text>

          <View style={styles.monthNavigator}>
            <TouchableOpacity
              onPress={handlePreviousMonth}
              style={styles.navArrowButton}
            >
              <Text style={styles.navArrowText}>{'<'}</Text>
            </TouchableOpacity>

            <Text style={styles.navMonthText}>
              {months[currentMonth]} {currentYear}
            </Text>

            <TouchableOpacity
              onPress={handleNextMonth}
              style={styles.navArrowButton}
            >
              <Text style={styles.navArrowText}>{'>'}</Text>
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

      {/* 聊天按钮 */}
      <TouchableOpacity
        style={[
          styles.chatButton,
          { backgroundColor: '#4ECDC4' }
        ]}
      >
        <Text style={styles.chatButtonIcon}>💬</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundDecoration: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  backgroundCircle1: {
    position: 'absolute',
    top: -150,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(108, 142, 182, 0.1)',
    transform: [{ scale: 1.5 }],
  },
  backgroundCircle2: {
    position: 'absolute',
    bottom: -150,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    transform: [{ scale: 1.5 }],
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 0,
    paddingTop: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: '#0A101F',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(108, 142, 182, 0.1)',
    shadowColor: '#6C8EB6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  menuButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: '#6C8EB6',
    fontWeight: 'bold',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6C8EB6',
  },
  monthNavigator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131C2E',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(108, 142, 182, 0.2)',
    shadowColor: '#6C8EB6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  navArrowButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navArrowText: {
    fontSize: 16,
    color: '#6C8EB6',
    fontWeight: 'bold',
  },
  navMonthText: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6C8EB6',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  chatButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4ECDC4',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  chatButtonIcon: {
    fontSize: 20,
    color: 'white',
  },
});

export default HomeScreen;
