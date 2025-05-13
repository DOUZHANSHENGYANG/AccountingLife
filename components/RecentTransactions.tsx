import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Card from './ui/Card';
import { COLORS } from '../constants';
import { mockTransactions } from '../models/mockData';
import { formatCurrency, formatDate } from '../utils';

interface RecentTransactionsProps {
  month: number;
  year: number;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ month, year }) => {
  const { isDarkMode } = useTheme();
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 筛选选定月份的交易
  const transactions = mockTransactions
    .filter((transaction) => {
      const date = new Date(transaction.date);
      return date.getMonth() === month && date.getFullYear() === year;
    })
    .slice(0, 5); // 只显示最近5条

  const handleTransactionPress = (transaction: any) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={[
          styles.title,
          { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
        ]}>
          最近交易
        </Text>
        <TouchableOpacity>
          <Text style={[
            styles.viewAll,
            { color: COLORS.primary }
          ]}>
            查看全部
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.transactionList}>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={styles.transactionItem}
              onPress={() => handleTransactionPress(transaction)}
              activeOpacity={0.7}
            >
              <View style={styles.transactionLeft}>
                <View style={[
                  styles.categoryIcon,
                  { backgroundColor: transaction.categoryColor }
                ]}>
                  <Text style={styles.categoryIconText}>{transaction.categoryIcon}</Text>
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={[
                    styles.transactionTitle,
                    { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                  ]}>
                    {transaction.title}
                  </Text>
                  <Text style={[
                    styles.transactionDate,
                    { color: isDarkMode ? '#94A3B8' : '#64748B' }
                  ]}>
                    {formatDate(transaction.date)}
                  </Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount < 0 ? '#FF6B6B' : '#4CAF50' }
                ]}>
                  {transaction.amount < 0 ? '-' : '+'}{formatCurrency(Math.abs(transaction.amount))}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[
              styles.emptyText,
              { color: isDarkMode ? '#94A3B8' : '#64748B' }
            ]}>
              本月暂无交易记录
            </Text>
          </View>
        )}
      </View>

      {/* 交易详情模态框 */}
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
            {selectedTransaction && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={[
                    styles.modalTitle,
                    { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                  ]}>
                    交易详情
                  </Text>
                  <TouchableOpacity onPress={closeModal}>
                    <Text style={{ color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 18 }}>×</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.transactionDetail}>
                  <View style={[
                    styles.detailCategoryIcon,
                    { backgroundColor: selectedTransaction.categoryColor }
                  ]}>
                    <Text style={styles.detailCategoryIconText}>{selectedTransaction.categoryIcon}</Text>
                  </View>

                  <View style={styles.detailContent}>
                    <Text style={[
                      styles.detailTitle,
                      { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                    ]}>
                      {selectedTransaction.title}
                    </Text>

                    <Text style={[
                      styles.detailAmount,
                      { color: selectedTransaction.amount < 0 ? '#FF6B6B' : '#4CAF50' }
                    ]}>
                      {selectedTransaction.amount < 0 ? '-' : '+'}{formatCurrency(Math.abs(selectedTransaction.amount))}
                    </Text>

                    <View style={styles.detailRow}>
                      <Text style={[
                        styles.detailLabel,
                        { color: isDarkMode ? '#94A3B8' : '#64748B' }
                      ]}>
                        分类:
                      </Text>
                      <Text style={[
                        styles.detailValue,
                        { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                      ]}>
                        {selectedTransaction.category}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={[
                        styles.detailLabel,
                        { color: isDarkMode ? '#94A3B8' : '#64748B' }
                      ]}>
                        日期:
                      </Text>
                      <Text style={[
                        styles.detailValue,
                        { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                      ]}>
                        {formatDate(selectedTransaction.date)}
                      </Text>
                    </View>

                    {selectedTransaction.note && (
                      <View style={styles.detailRow}>
                        <Text style={[
                          styles.detailLabel,
                          { color: isDarkMode ? '#94A3B8' : '#64748B' }
                        ]}>
                          备注:
                        </Text>
                        <Text style={[
                          styles.detailValue,
                          { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                        ]}>
                          {selectedTransaction.note}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: 'rgba(108, 142, 182, 0.1)' }]}
                    onPress={closeModal}
                  >
                    <Text style={{ color: COLORS.primary }}>编辑</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: 'rgba(255, 107, 107, 0.1)' }]}
                    onPress={closeModal}
                  >
                    <Text style={{ color: '#FF6B6B' }}>删除</Text>
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
  viewAll: {
    fontSize: 14,
  },
  transactionList: {
    maxHeight: 400,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 65, 85, 0.1)',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIconText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  transactionInfo: {
    justifyContent: 'center',
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
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
  transactionDetail: {
    marginBottom: 20,
  },
  detailCategoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  detailCategoryIconText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  detailContent: {
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  detailAmount: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 12,
  },
  detailLabel: {
    width: 60,
    fontSize: 14,
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
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

export default RecentTransactions;
