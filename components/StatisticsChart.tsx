import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Modal } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Card from './ui/Card';
import { COLORS } from '../constants';
import { mockCategoryData, mockTrendData } from '../models/mockData';
import { formatCurrency } from '../utils';
import { PieChart, BarChart } from 'react-native-chart-kit';

interface StatisticsChartProps {
  month: number;
  year: number;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ month, year }) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'categories' | 'trends'>('categories');
  const screenWidth = Dimensions.get('window').width - 64; // 考虑内边距
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 准备饼图数据
  const pieChartData = mockCategoryData.map((item) => {
    return {
      name: item.name,
      amount: item.amount,
      color: item.color,
      legendFontColor: isDarkMode ? '#FFFFFF' : '#0F172A',
      legendFontSize: 12,
    };
  });

  // 计算总金额
  const totalAmount = mockCategoryData.reduce((sum, item) => sum + item.amount, 0);

  // 处理饼图点击事件
  const handlePieChartPress = (index: number) => {
    setSelectedCategory(mockCategoryData[index]);
    setModalVisible(true);
  };

  // 关闭模态框
  const closeModal = () => {
    setModalVisible(false);
  };

  // 准备柱状图数据
  const barChartData = {
    labels: mockTrendData.map(item => item.date),
    datasets: [
      {
        data: mockTrendData.map(item => item.amount),
        color: (opacity = 1) => `rgba(108, 142, 182, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // 图表配置
  const chartConfig = {
    backgroundGradientFrom: isDarkMode ? '#131C2E' : '#FFFFFF',
    backgroundGradientTo: isDarkMode ? '#131C2E' : '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#6C8EB6',
    },
    barPercentage: 0.5,
  };

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
              { backgroundColor: activeTab === 'categories' ? '#1E293B' : 'transparent' }
            ]}
            onPress={() => setActiveTab('categories')}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === 'categories' ? COLORS.text.dark : '#64748B' }
            ]}>
              分类
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              { backgroundColor: activeTab === 'trends' ? '#1E293B' : 'transparent' }
            ]}
            onPress={() => setActiveTab('trends')}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === 'trends' ? COLORS.text.dark : '#64748B' }
            ]}>
              趋势
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'categories' ? (
        <View style={styles.chartContainer}>
          <View style={styles.pieChartWrapper}>
            <PieChart
              data={pieChartData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="0"
              absolute
              hasLegend={false}
              center={[screenWidth / 2, 0]}
              avoidFalseZero
              doughnut
              style={{
                alignSelf: 'center',
              }}
              paddingRight="0"
              onPress={handlePieChartPress}
              doughnutRadius={80}
              innerRadius={50}
            />
          </View>
          <View style={styles.legendContainer}>
            {mockCategoryData.map((category, index) => (
              <View key={`legend-${index}`} style={styles.legendItem}>
                <View style={styles.legendLeft}>
                  <View style={[styles.legendColor, { backgroundColor: category.color }]} />
                  <Text style={[
                    styles.legendText,
                    { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                  ]}>
                    {category.name}
                  </Text>
                </View>
                <Text style={[
                  styles.legendAmount,
                  { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                ]}>
                  {formatCurrency(category.amount)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.barChartContainer}>
          <BarChart
            data={barChartData}
            width={screenWidth}
            height={220}
            chartConfig={{
              ...chartConfig,
              fillShadowGradient: '#6C8EB6',
              fillShadowGradientOpacity: 1,
              barPercentage: 0.6,
              barRadius: 5,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            showValuesOnTopOfBars
            fromZero
            withInnerLines={false}
            withHorizontalLabels={true}
            withVerticalLabels={true}
            segments={4}
          />
        </View>
      )}

      {/* 分类详情模态框 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[
            styles.modalContent,
            { backgroundColor: isDarkMode ? COLORS.surface.dark : COLORS.surface.light }
          ]}>
            {selectedCategory && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={[
                    styles.modalTitle,
                    { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                  ]}>
                    分类详情
                  </Text>
                  <TouchableOpacity onPress={closeModal}>
                    <Text style={{ color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 18 }}>×</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.categoryDetail}>
                  <View style={[
                    styles.detailCategoryIcon,
                    { backgroundColor: selectedCategory.color }
                  ]}>
                    <Text style={styles.detailCategoryIconText}>{selectedCategory.icon}</Text>
                  </View>

                  <Text style={[
                    styles.detailCategoryName,
                    { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                  ]}>
                    {selectedCategory.name}
                  </Text>

                  <Text style={[
                    styles.detailCategoryAmount,
                    { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                  ]}>
                    {formatCurrency(selectedCategory.amount)}
                  </Text>

                  <View style={styles.percentageContainer}>
                    <Text style={[
                      styles.percentageText,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' }
                    ]}>
                      占总支出的 {((selectedCategory.amount / totalAmount) * 100).toFixed(1)}%
                    </Text>
                    <View style={styles.percentageBar}>
                      <View
                        style={[
                          styles.percentageFill,
                          {
                            backgroundColor: selectedCategory.color,
                            width: `${(selectedCategory.amount / totalAmount) * 100}%`
                          }
                        ]}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: 'rgba(108, 142, 182, 0.1)' }]}
                    onPress={closeModal}
                  >
                    <Text style={{ color: COLORS.primary }}>查看交易</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: 'rgba(108, 142, 182, 0.1)' }]}
                    onPress={closeModal}
                  >
                    <Text style={{ color: COLORS.primary }}>关闭</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    fontSize: 16,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#0E1525',
    padding: 2,
    borderWidth: 1,
    borderColor: 'rgba(108, 142, 182, 0.1)',
    shadowColor: '#6C8EB6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  chartContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  pieChartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    height: 220,
    width: '100%',
    alignSelf: 'center',
  },
  legendContainer: {
    width: '100%',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  legendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 3,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
  },
  legendAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
  barChartContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  // 模态框样式
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  categoryDetail: {
    alignItems: 'center',
    marginBottom: 20,
  },
  detailCategoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailCategoryIconText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  detailCategoryName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  detailCategoryAmount: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  percentageContainer: {
    width: '100%',
    marginTop: 10,
  },
  percentageText: {
    fontSize: 14,
    marginBottom: 8,
  },
  percentageBar: {
    height: 8,
    backgroundColor: 'rgba(226, 232, 240, 0.5)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  percentageFill: {
    height: '100%',
    borderRadius: 4,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
});

export default StatisticsChart;
