import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Card from './ui/Card';
import { COLORS } from '../constants';
import { mockCategoryData, mockTrendData } from '../models/mockData';
import { formatCurrency } from '../utils';
import Svg, { Path, Circle } from 'react-native-svg';

interface StatisticsChartProps {
  month: number;
  year: number;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ month, year }) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'categories' | 'trends'>('categories');

  // 计算饼图的总金额
  const totalAmount = mockCategoryData.reduce((sum, category) => sum + category.amount, 0);

  // 生成饼图的路径
  const generatePieChart = () => {
    const centerX = 50;
    const centerY = 50;
    const radius = 40;
    
    let currentAngle = 0;
    
    return mockCategoryData.map((category, index) => {
      const percentage = category.amount / totalAmount;
      const angle = percentage * 360;
      
      // 计算起始点和结束点
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      // 转换为弧度
      const startAngleRad = (startAngle - 90) * Math.PI / 180;
      const endAngleRad = (endAngle - 90) * Math.PI / 180;
      
      // 计算路径点
      const startX = centerX + radius * Math.cos(startAngleRad);
      const startY = centerY + radius * Math.sin(startAngleRad);
      const endX = centerX + radius * Math.cos(endAngleRad);
      const endY = centerY + radius * Math.sin(endAngleRad);
      
      // 大弧标志
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      // 创建路径
      const path = `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
      
      // 更新当前角度
      currentAngle += angle;
      
      return {
        path,
        color: category.color,
        index
      };
    });
  };

  // 生成柱状图
  const generateBarChart = () => {
    const maxValue = Math.max(...mockTrendData.map(item => item.amount));
    
    return mockTrendData.map((item, index) => {
      const height = (item.amount / maxValue) * 100;
      return {
        height,
        date: item.date,
        amount: item.amount,
        index
      };
    });
  };

  const pieChartPaths = generatePieChart();
  const barChartData = generateBarChart();

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={[
          styles.title,
          { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
        ]}>
          统计图表
        </Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'categories' && styles.activeTab,
              activeTab === 'categories' && { backgroundColor: isDarkMode ? 'rgba(108, 142, 182, 0.2)' : 'rgba(108, 142, 182, 0.1)' }
            ]}
            onPress={() => setActiveTab('categories')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'categories' && styles.activeTabText,
              { color: activeTab === 'categories' ? COLORS.primary : (isDarkMode ? '#94A3B8' : '#64748B') }
            ]}>
              分类
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'trends' && styles.activeTab,
              activeTab === 'trends' && { backgroundColor: isDarkMode ? 'rgba(108, 142, 182, 0.2)' : 'rgba(108, 142, 182, 0.1)' }
            ]}
            onPress={() => setActiveTab('trends')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'trends' && styles.activeTabText,
              { color: activeTab === 'trends' ? COLORS.primary : (isDarkMode ? '#94A3B8' : '#64748B') }
            ]}>
              趋势
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'categories' ? (
        <View style={styles.chartContainer}>
          <View style={styles.pieChartContainer}>
            <Svg width="200" height="200" viewBox="0 0 100 100">
              {pieChartPaths.map((item, index) => (
                <Path
                  key={`pie-${index}`}
                  d={item.path}
                  fill={item.color}
                  stroke={isDarkMode ? '#0F172A' : '#FFFFFF'}
                  strokeWidth="0.5"
                />
              ))}
              <Circle
                cx="50"
                cy="50"
                r="25"
                fill={isDarkMode ? '#1E293B' : '#FFFFFF'}
                stroke={isDarkMode ? '#334155' : '#E2E8F0'}
                strokeWidth="0.5"
              />
            </Svg>
          </View>
          <ScrollView style={styles.legendContainer}>
            {mockCategoryData.map((category, index) => (
              <View key={`legend-${index}`} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: category.color }]} />
                <Text style={[
                  styles.legendText,
                  { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                ]}>
                  {category.name}
                </Text>
                <Text style={[
                  styles.legendAmount,
                  { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                ]}>
                  {formatCurrency(category.amount)}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.barChartContainer}>
          <View style={styles.barChart}>
            {barChartData.map((item, index) => (
              <View key={`bar-${index}`} style={styles.barItem}>
                <View style={styles.barLabelContainer}>
                  <Text style={[
                    styles.barAmount,
                    { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                  ]}>
                    {formatCurrency(item.amount)}
                  </Text>
                </View>
                <View style={[
                  styles.bar,
                  { 
                    height: `${item.height}%`,
                    backgroundColor: 'rgba(108, 142, 182, 0.8)',
                    shadowColor: 'rgba(108, 142, 182, 0.5)',
                  }
                ]} />
                <Text style={[
                  styles.barDate,
                  { color: isDarkMode ? '#94A3B8' : '#64748B' }
                ]}>
                  {item.date}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(108, 142, 182, 0.1)',
  },
  tabText: {
    fontSize: 14,
  },
  activeTabText: {
    fontWeight: '500',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pieChartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendContainer: {
    flex: 1,
    maxHeight: 200,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 3,
    marginRight: 8,
  },
  legendText: {
    flex: 1,
    fontSize: 14,
  },
  legendAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
  barChartContainer: {
    height: 200,
    marginTop: 16,
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: 20,
  },
  barItem: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barLabelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  barAmount: {
    fontSize: 10,
    fontWeight: '500',
  },
  bar: {
    width: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  barDate: {
    fontSize: 10,
    marginTop: 4,
  },
});

export default StatisticsChart;
