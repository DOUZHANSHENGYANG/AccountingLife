import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // 筛选选定月份的交易
  const transactions = mockTransactions
    .filter((transaction) => {
      const date = new Date(transaction.date);
      return date.getMonth() === month && date.getFullYear() === year;
    })
    .slice(0, 5); // 只显示最近5条

  const handleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
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

      <ScrollView style={styles.transactionList}>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={[
                styles.transactionItem,
                {
                  backgroundColor: isDarkMode 
                    ? 'rgba(15, 23, 42, 0.8)' 
                    : 'rgba(248, 250, 252, 0.8)',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                }
              ]}
              onPress={() => handleExpand(transaction.id)}
              activeOpacity={0.7}
            >
              <View style={styles.transactionHeader}>
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.categoryIcon,
                    { backgroundColor: `${transaction.categoryColor}20` }
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
                    {formatCurrency(transaction.amount)}
                  </Text>
                  <Text style={[
                    styles.expandIcon,
                    { transform: [{ rotate: expandedId === transaction.id ? '90deg' : '0deg' }] }
                  ]}>
                    {'>'}
                  </Text>
                </View>
              </View>

              {expandedId === transaction.id && (
                <View style={styles.expandedContent}>
                  <View style={[
                    styles.expandedDivider,
                    { backgroundColor: isDarkMode ? '#334155' : '#E2E8F0' }
                  ]} />
                  <View style={styles.expandedDetails}>
                    <Text style={[
                      styles.expandedLabel,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' }
                    ]}>
                      分类:
                    </Text>
                    <Text style={[
                      styles.expandedValue,
                      { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                    ]}>
                      {transaction.category}
                    </Text>
                  </View>
                  {transaction.note && (
                    <View style={styles.expandedDetails}>
                      <Text style={[
                        styles.expandedLabel,
                        { color: isDarkMode ? '#94A3B8' : '#64748B' }
                      ]}>
                        备注:
                      </Text>
                      <Text style={[
                        styles.expandedValue,
                        { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                      ]}>
                        {transaction.note}
                      </Text>
                    </View>
                  )}
                  <View style={styles.expandedActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={[
                        styles.actionButtonText,
                        { color: COLORS.primary }
                      ]}>
                        编辑
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={{ color: '#FF6B6B' }}>
                        删除
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
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
      </ScrollView>
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
  viewAll: {
    fontSize: 14,
  },
  transactionList: {
    maxHeight: 400,
  },
  transactionItem: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    overflow: 'hidden',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIconText: {
    fontSize: 18,
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
    marginBottom: 2,
  },
  expandIcon: {
    fontSize: 12,
    color: '#94A3B8',
  },
  expandedContent: {
    padding: 12,
    paddingTop: 0,
  },
  expandedDivider: {
    height: 1,
    marginBottom: 12,
  },
  expandedDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  expandedLabel: {
    fontSize: 14,
    width: 50,
  },
  expandedValue: {
    fontSize: 14,
    flex: 1,
  },
  expandedActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  actionButtonText: {
    fontSize: 14,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});

export default RecentTransactions;
