import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS } from '../constants';
import Button from './ui/Button';
import { mockCategories } from '../models/mockData';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isExpense, setIsExpense] = useState(true);
  const [isOcrModalOpen, setIsOcrModalOpen] = useState(false);

  const handleSubmit = () => {
    // 处理表单提交
    console.log({
      amount: isExpense ? -Number.parseFloat(amount) : Number.parseFloat(amount),
      category: selectedCategory,
      date: new Date(),
    });
    onClose();
  };

  const handleOcrComplete = (data: { amount: string; category: string }) => {
    setAmount(data.amount);
    setSelectedCategory(data.category);
    setIsOcrModalOpen(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalOverlay}>
          <View style={[
            styles.modalContent,
            { backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)' }
          ]}>
            <View style={[
              styles.modalHeader,
              { borderBottomColor: isDarkMode ? '#334155' : '#E2E8F0' }
            ]}>
              <Text style={[
                styles.modalTitle,
                { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
              ]}>
                添加交易
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={{ color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 18 }}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* OCR扫描按钮 */}
              <View style={styles.ocrButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.ocrButton,
                    { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }
                  ]}
                  onPress={() => setIsOcrModalOpen(true)}
                >
                  <Text style={[
                    styles.ocrButtonText,
                    { color: isDarkMode ? '#4ECDC4' : '#6C8EB6' }
                  ]}>
                    OCR识别
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 交易类型切换 */}
              <View style={[
                styles.transactionTypeToggle,
                {
                  backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                }
              ]}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    isExpense && {
                      backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                      shadowColor: '#FF6B6B',
                      shadowOpacity: 0.3,
                      shadowRadius: 10,
                      shadowOffset: { width: 0, height: 0 },
                      elevation: 5
                    }
                  ]}
                  onPress={() => setIsExpense(true)}
                >
                  <Text style={[
                    styles.toggleButtonText,
                    { color: isExpense ? '#FF6B6B' : (isDarkMode ? '#94A3B8' : '#64748B') }
                  ]}>
                    支出
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    !isExpense && {
                      backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                      shadowColor: '#4CAF50',
                      shadowOpacity: 0.3,
                      shadowRadius: 10,
                      shadowOffset: { width: 0, height: 0 },
                      elevation: 5
                    }
                  ]}
                  onPress={() => setIsExpense(false)}
                >
                  <Text style={[
                    styles.toggleButtonText,
                    { color: !isExpense ? '#4CAF50' : (isDarkMode ? '#94A3B8' : '#64748B') }
                  ]}>
                    收入
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 金额输入 */}
              <View style={styles.inputContainer}>
                <Text style={[
                  styles.inputLabel,
                  { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                ]}>
                  金额
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
                        backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                        color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
                        borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                      }
                    ]}
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="0.00"
                    placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* 分类选择 */}
              <View style={styles.categoriesContainer}>
                <Text style={[
                  styles.inputLabel,
                  { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                ]}>
                  分类
                </Text>
                <View style={styles.categoriesGrid}>
                  {mockCategories
                    .filter(cat => cat.type === (isExpense ? 'expense' : 'income'))
                    .map(category => (
                      <TouchableOpacity
                        key={category.id}
                        style={[
                          styles.categoryItem,
                          selectedCategory === category.id && {
                            backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(241, 245, 249, 0.8)',
                            borderColor: category.color,
                            borderWidth: 2
                          }
                        ]}
                        onPress={() => setSelectedCategory(category.id)}
                      >
                        <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                          <Text style={styles.categoryIconText}>{category.icon}</Text>
                        </View>
                        <Text style={[
                          styles.categoryName,
                          { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                        ]}>
                          {category.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>

              {/* 备注输入 */}
              <View style={styles.inputContainer}>
                <Text style={[
                  styles.inputLabel,
                  { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                ]}>
                  备注
                </Text>
                <TextInput
                  style={[
                    styles.noteInput,
                    {
                      backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                      color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                    }
                  ]}
                  placeholder="添加备注..."
                  placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                  multiline
                />
              </View>

              {/* 提交按钮 */}
              <Button
                onPress={handleSubmit}
                style={styles.submitButton}
                textStyle={styles.submitButtonText}
              >
                保存
              </Button>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    zIndex: 100, // 增加z-index，使其在侧边栏上面
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100, // 增加z-index，使其在侧边栏上面
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#6C8EB6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
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
  ocrButtonContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  ocrButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#6C8EB6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  ocrButtonText: {
    fontSize: 14,
  },
  transactionTypeToggle: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleButtonText: {
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 8,
    fontWeight: '500',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
    fontSize: 18,
  },
  amountInput: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    paddingLeft: 32,
    fontSize: 20,
    borderWidth: 1,
  },
  noteInput: {
    height: 80,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  categoryItem: {
    width: '25%',
    padding: 4,
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  categoryIconText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 24,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#6C8EB6',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTransactionModal;
