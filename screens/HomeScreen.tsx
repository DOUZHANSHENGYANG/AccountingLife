import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { months } from '../constants';
import { COLORS } from '../constants';
import MonthlyOverview from '../components/MonthlyOverview';
import StatisticsChart from '../components/StatisticsChart';
import RecentTransactions from '../components/RecentTransactions';
import AddTransactionModal from '../components/AddTransactionModal';
import SideMenu from '../components/SideMenu';
import AiAssistant from '../components/AiAssistant';
import ProfileModal from '../components/ProfileModal';
import BudgetManagementModal from '../components/BudgetManagementModal';
import CategoryManagementModal from '../components/CategoryManagementModal';
import FamilySharingModal from '../components/FamilySharingModal';
import ExportDataModal from '../components/ExportDataModal';
import DatePickerModal from '../components/DatePickerModal';

const HomeScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  // 高级功能模态框状态
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBudgetManagementOpen, setIsBudgetManagementOpen] = useState(false);
  const [isCategoryManagementOpen, setIsCategoryManagementOpen] = useState(false);
  const [isFamilySharingOpen, setIsFamilySharingOpen] = useState(false);
  const [isExportDataOpen, setIsExportDataOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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

  const handleDateChange = (month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
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
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setIsSideMenuOpen(true)}
          >
            <Text style={styles.menuIcon}>≡</Text>
          </TouchableOpacity>

          <Text style={styles.navTitleGlow}>
            智能记账
          </Text>

          <View style={styles.monthNavigator}>
            <TouchableOpacity
              onPress={handlePreviousMonth}
              style={styles.navArrowButton}
            >
              <Text style={styles.navArrowText}>{'<'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsDatePickerOpen(true)}
              style={styles.navMonthButton}
            >
              <Text style={styles.navMonthText}>
                {months[currentMonth]} {currentYear}
              </Text>
            </TouchableOpacity>

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

      {/* AI助手按钮 */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsAiAssistantOpen(true)}
      >
        <View style={[styles.buttonInner, styles.aiButtonInner]}>
          <Text style={styles.buttonIcon}>🤖</Text>
        </View>
      </TouchableOpacity>

      {/* 添加交易按钮 */}
      <TouchableOpacity
        style={[styles.floatingButton, styles.addButtonPosition]}
        onPress={() => setIsAddModalOpen(true)}
      >
        <View style={[styles.buttonInner, styles.addButtonInner]}>
          <Text style={styles.buttonIcon}>+</Text>
        </View>
      </TouchableOpacity>

      {/* 侧边菜单 */}
      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        // 传递高级功能模态框的状态和设置函数
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        isBudgetManagementOpen={isBudgetManagementOpen}
        setIsBudgetManagementOpen={setIsBudgetManagementOpen}
        isCategoryManagementOpen={isCategoryManagementOpen}
        setIsCategoryManagementOpen={setIsCategoryManagementOpen}
        isFamilySharingOpen={isFamilySharingOpen}
        setIsFamilySharingOpen={setIsFamilySharingOpen}
        isExportDataOpen={isExportDataOpen}
        setIsExportDataOpen={setIsExportDataOpen}
      />

      {/* 添加交易模态框 */}
      <AddTransactionModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* AI助手模态框 */}
      <AiAssistant isOpen={isAiAssistantOpen} onClose={() => setIsAiAssistantOpen(false)} />

      {/* 高级功能模态框 */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => {
          setIsProfileOpen(false);
          setIsSideMenuOpen(false);
        }}
      />
      <BudgetManagementModal
        isOpen={isBudgetManagementOpen}
        onClose={() => {
          setIsBudgetManagementOpen(false);
          setIsSideMenuOpen(false);
        }}
      />
      <CategoryManagementModal
        isOpen={isCategoryManagementOpen}
        onClose={() => {
          setIsCategoryManagementOpen(false);
          setIsSideMenuOpen(false);
        }}
      />
      <FamilySharingModal
        isOpen={isFamilySharingOpen}
        onClose={() => {
          setIsFamilySharingOpen(false);
          setIsSideMenuOpen(false);
        }}
      />
      <ExportDataModal
        isOpen={isExportDataOpen}
        onClose={() => {
          setIsExportDataOpen(false);
          setIsSideMenuOpen(false);
        }}
      />

      {/* 日期选择器模态框 */}
      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        currentMonth={currentMonth}
        currentYear={currentYear}
        onDateChange={handleDateChange}
      />
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
  navTitleGlow: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A6FE5',
    textShadowColor: '#4ECDC4',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
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
  navMonthButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(108, 142, 182, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(108, 142, 182, 0.3)',
  },
  navMonthText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonPosition: {
    bottom: 20,
  },
  buttonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  addButtonInner: {
    backgroundColor: '#4A6FE5',
    shadowColor: '#4A6FE5',
  },
  aiButtonInner: {
    backgroundColor: '#4ECDC4',
    shadowColor: '#4ECDC4',
  },
  buttonIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
