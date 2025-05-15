import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS } from '../constants';
import Button from './ui/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mockCategories } from '../models/mockData';

interface BudgetManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BudgetItem {
  id: string;
  categoryId: string;
  amount: number;
  spent: number;
  month: number;
  year: number;
}

const BudgetManagementModal: React.FC<BudgetManagementModalProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [isAddingBudget, setIsAddingBudget] = useState(false);
  const [isEditingBudget, setIsEditingBudget] = useState<string | null>(null);
  const [newBudget, setNewBudget] = useState<Partial<BudgetItem>>({
    categoryId: '',
    amount: 0,
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });

  // 初始化预算数据
  useEffect(() => {
    // 模拟数据
    const mockBudgets: BudgetItem[] = [
      {
        id: '1',
        categoryId: 'food',
        amount: 2000,
        spent: 1500,
        month: new Date().getMonth(),
        year: new Date().getFullYear()
      },
      {
        id: '2',
        categoryId: 'transport',
        amount: 800,
        spent: 400,
        month: new Date().getMonth(),
        year: new Date().getFullYear()
      },
      {
        id: '3',
        categoryId: 'shopping',
        amount: 1500,
        spent: 1200,
        month: new Date().getMonth(),
        year: new Date().getFullYear()
      }
    ];
    setBudgets(mockBudgets);
  }, []);

  const handleAddBudget = () => {
    setIsAddingBudget(true);
    setNewBudget({
      categoryId: '',
      amount: 0,
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    });
  };

  const handleEditBudget = (budget: BudgetItem) => {
    setIsEditingBudget(budget.id);
    setNewBudget({
      categoryId: budget.categoryId,
      amount: budget.amount,
      month: budget.month,
      year: budget.year
    });
  };

  const handleDeleteBudget = (budgetId: string) => {
    Alert.alert(
      "删除预算",
      "确定要删除这个预算吗？",
      [
        {
          text: "取消",
          style: "cancel"
        },
        {
          text: "删除",
          onPress: () => {
            setBudgets(budgets.filter(budget => budget.id !== budgetId));
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleSaveBudget = () => {
    if (!newBudget.categoryId || !newBudget.amount) {
      Alert.alert("错误", "请选择分类并输入金额");
      return;
    }

    if (isEditingBudget) {
      // 更新现有预算
      setBudgets(budgets.map(budget =>
        budget.id === isEditingBudget
          ? {
              ...budget,
              categoryId: newBudget.categoryId || budget.categoryId,
              amount: newBudget.amount || budget.amount
            }
          : budget
      ));
      setIsEditingBudget(null);
    } else {
      // 添加新预算
      const newBudgetItem: BudgetItem = {
        id: `budget_${Date.now()}`,
        categoryId: newBudget.categoryId || '',
        amount: newBudget.amount || 0,
        spent: 0,
        month: newBudget.month || new Date().getMonth(),
        year: newBudget.year || new Date().getFullYear()
      };
      setBudgets([...budgets, newBudgetItem]);
    }

    setIsAddingBudget(false);
    setNewBudget({
      categoryId: '',
      amount: 0,
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    });
  };

  const getCategoryById = (categoryId: string) => {
    return mockCategories.find(cat => cat.id === categoryId);
  };

  const calculateProgress = (spent: number, amount: number) => {
    return Math.min((spent / amount) * 100, 100);
  };

  const formatCurrency = (amount: number) => {
    return `¥${amount.toFixed(2)}`;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
      statusBarTranslucent={true} // 确保模态框覆盖状态栏
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1} // 禁止透明度变化
        onPress={onClose} // 点击背景关闭模态框
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1} // 禁止透明度变化
          onPress={onClose} // 点击背景关闭模态框
        >
          <TouchableOpacity
            style={[
              styles.modalContent,
              { backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)' }
            ]}
            activeOpacity={1} // 禁止透明度变化
            onPress={(e) => e.stopPropagation()} // 阻止点击事件冒泡，防止点击内容区域关闭模态框
          >
            <View style={[
              styles.modalHeader,
              { borderBottomColor: isDarkMode ? '#334155' : '#E2E8F0' }
            ]}>
              <Text style={[
                styles.modalTitle,
                { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
              ]}>
                预算管理
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={{ color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 18 }}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'overview' && styles.activeTabButton,
                  { backgroundColor: activeTab === 'overview' ? (isDarkMode ? '#1E293B' : '#F1F5F9') : 'transparent' }
                ]}
                onPress={() => setActiveTab('overview')}
              >
                <Text style={[
                  styles.tabButtonText,
                  { color: activeTab === 'overview'
                    ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                    : (isDarkMode ? '#94A3B8' : '#64748B')
                  }
                ]}>
                  预算概览
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'settings' && styles.activeTabButton,
                  { backgroundColor: activeTab === 'settings' ? (isDarkMode ? '#1E293B' : '#F1F5F9') : 'transparent' }
                ]}
                onPress={() => setActiveTab('settings')}
              >
                <Text style={[
                  styles.tabButtonText,
                  { color: activeTab === 'settings'
                    ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                    : (isDarkMode ? '#94A3B8' : '#64748B')
                  }
                ]}>
                  预算设置
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {activeTab === 'overview' ? (
                <View style={styles.overviewContainer}>
                  {budgets.map(budget => {
                    const category = getCategoryById(budget.categoryId);
                    const progress = calculateProgress(budget.spent, budget.amount);
                    const isOverBudget = budget.spent > budget.amount;

                    return (
                      <View
                        key={budget.id}
                        style={[
                          styles.budgetCard,
                          {
                            backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                            borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                          }
                        ]}
                      >
                        <View style={styles.budgetCardHeader}>
                          <View style={styles.categoryInfo}>
                            <View style={[styles.categoryIcon, { backgroundColor: category?.color || '#6C8EB6' }]}>
                              <Text style={styles.categoryIconText}>{category?.icon || '📊'}</Text>
                            </View>
                            <Text style={[
                              styles.categoryName,
                              { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                            ]}>
                              {category?.name || '未知分类'}
                            </Text>
                          </View>
                          <View style={styles.budgetAmount}>
                            <Text style={[
                              styles.spentAmount,
                              { color: isOverBudget ? '#FF6B6B' : (isDarkMode ? '#94A3B8' : '#64748B') }
                            ]}>
                              {formatCurrency(budget.spent)}
                            </Text>
                            <Text style={[
                              styles.totalAmount,
                              { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                            ]}>
                              / {formatCurrency(budget.amount)}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.progressContainer}>
                          <View style={styles.progressBarBackground}>
                            <View
                              style={[
                                styles.progressBar,
                                {
                                  width: `${progress}%`,
                                  backgroundColor: isOverBudget ? '#FF6B6B' : '#4CAF50'
                                }
                              ]}
                            />
                          </View>
                          <Text style={[
                            styles.progressText,
                            { color: isDarkMode ? '#94A3B8' : '#64748B' }
                          ]}>
                            {isOverBudget ? '超出预算' : `已使用 ${Math.round(progress)}%`}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View style={styles.settingsContainer}>
                  {isAddingBudget || isEditingBudget ? (
                    <View style={[
                      styles.budgetForm,
                      {
                        backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                        borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                      }
                    ]}>
                      <Text style={[
                        styles.formTitle,
                        { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                      ]}>
                        {isEditingBudget ? '编辑预算' : '添加预算'}
                      </Text>

                      <View style={styles.formGroup}>
                        <Text style={[
                          styles.formLabel,
                          { color: isDarkMode ? '#94A3B8' : '#64748B' }
                        ]}>
                          选择分类
                        </Text>
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          style={styles.categoriesScroll}
                        >
                          {mockCategories
                            .filter(cat => cat.type === 'expense')
                            .map(category => (
                              <TouchableOpacity
                                key={category.id}
                                style={[
                                  styles.categoryItem,
                                  newBudget.categoryId === category.id && {
                                    backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                                    borderColor: category.color,
                                    borderWidth: 2
                                  }
                                ]}
                                onPress={() => setNewBudget({ ...newBudget, categoryId: category.id })}
                              >
                                <View style={[styles.categoryItemIcon, { backgroundColor: category.color }]}>
                                  <Text style={styles.categoryIconText}>{category.icon}</Text>
                                </View>
                                <Text style={[
                                  styles.categoryItemName,
                                  { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                                ]}>
                                  {category.name}
                                </Text>
                              </TouchableOpacity>
                            ))
                          }
                        </ScrollView>
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={[
                          styles.formLabel,
                          { color: isDarkMode ? '#94A3B8' : '#64748B' }
                        ]}>
                          预算金额
                        </Text>
                        <View style={styles.amountInputContainer}>
                          <Text style={[
                            styles.currencySymbol,
                            { color: isDarkMode ? '#94A3B8' : '#64748B' }
                          ]}>
                            ¥
                          </Text>
                          <TextInput
                            style={[
                              styles.amountInput,
                              {
                                backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                                color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
                                borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                              }
                            ]}
                            value={newBudget.amount ? newBudget.amount.toString() : ''}
                            onChangeText={(text) => setNewBudget({
                              ...newBudget,
                              amount: text ? parseFloat(text) : 0
                            })}
                            placeholder="0.00"
                            placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                            keyboardType="numeric"
                          />
                        </View>
                      </View>

                      <View style={styles.formActions}>
                        <Button
                          onPress={() => {
                            setIsAddingBudget(false);
                            setIsEditingBudget(null);
                          }}
                          style={[
                            styles.cancelButton,
                            {
                              backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                              borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                            }
                          ]}
                          textStyle={{
                            color: isDarkMode ? '#94A3B8' : '#64748B'
                          }}
                        >
                          取消
                        </Button>
                        <Button
                          onPress={handleSaveBudget}
                          style={styles.saveButton}
                          textStyle={styles.saveButtonText}
                        >
                          保存
                        </Button>
                      </View>
                    </View>
                  ) : (
                    <Button
                      onPress={handleAddBudget}
                      style={[
                        styles.addButton,
                        {
                          backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                          borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                        }
                      ]}
                      textStyle={{
                        color: isDarkMode ? COLORS.text.dark : COLORS.text.light
                      }}
                    >
                      <Icon name="plus" size={16} color={isDarkMode ? COLORS.text.dark : COLORS.text.light} /> 添加预算
                    </Button>
                  )}

                  {!isAddingBudget && !isEditingBudget && (
                    <View style={styles.budgetList}>
                      {budgets.map(budget => {
                        const category = getCategoryById(budget.categoryId);

                        return (
                          <View
                            key={budget.id}
                            style={[
                              styles.budgetListItem,
                              {
                                backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                                borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                              }
                            ]}
                          >
                            <View style={styles.budgetListItemContent}>
                              <View style={styles.categoryInfo}>
                                <View style={[styles.categoryIcon, { backgroundColor: category?.color || '#6C8EB6' }]}>
                                  <Text style={styles.categoryIconText}>{category?.icon || '📊'}</Text>
                                </View>
                                <Text style={[
                                  styles.categoryName,
                                  { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                                ]}>
                                  {category?.name || '未知分类'}
                                </Text>
                              </View>
                              <Text style={[
                                styles.budgetListItemAmount,
                                { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                              ]}>
                                {formatCurrency(budget.amount)}
                              </Text>
                            </View>
                            <View style={styles.budgetListItemActions}>
                              <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleEditBudget(budget)}
                              >
                                <Icon name="pencil" size={18} color={isDarkMode ? '#94A3B8' : '#64748B'} />
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleDeleteBudget(budget.id)}
                              >
                                <Icon name="trash-can" size={18} color="#FF6B6B" />
                              </TouchableOpacity>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
              )}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // 极高的z-index，确保在所有元素之上
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 更暗的背景，增强视觉分离
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 9999, // 极高的z-index
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    width: '90%',
    maxHeight: '90%', // 增加最大高度
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#6C8EB6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5, // 增强阴影
    shadowRadius: 30,
    elevation: 20, // 增加elevation
    zIndex: 10000, // 确保内容在遮罩之上
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#6C8EB6',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  overviewContainer: {
    gap: 12,
  },
  budgetCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  budgetCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIconText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  budgetAmount: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  spentAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 14,
  },
  progressContainer: {
    gap: 4,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(203, 213, 225, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'right',
  },
  settingsContainer: {
    gap: 16,
  },
  addButton: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  budgetList: {
    gap: 12,
  },
  budgetListItem: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetListItemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetListItemAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  budgetListItemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  budgetForm: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    gap: 16,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  formGroup: {
    gap: 8,
  },
  formLabel: {
    fontSize: 14,
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 12,
    padding: 8,
    borderRadius: 8,
    width: 70,
  },
  categoryItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  categoryItemName: {
    fontSize: 12,
    textAlign: 'center',
  },
  amountInputContainer: {
    position: 'relative',
  },
  currencySymbol: {
    position: 'absolute',
    left: 12,
    top: 16,
    zIndex: 1,
    fontSize: 18,
  },
  amountInput: {
    height: 56,
    borderRadius: 12,
    paddingLeft: 32,
    fontSize: 20,
    borderWidth: 1,
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
  },
  saveButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#6C8EB6',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default BudgetManagementModal;
