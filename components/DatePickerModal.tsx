import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS } from '../constants';
import { months } from '../constants';

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMonth: number;
  currentYear: number;
  onDateChange: (month: number, year: number) => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isOpen,
  onClose,
  currentMonth,
  currentYear,
  onDateChange
}) => {
  const { isDarkMode } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [activeTab, setActiveTab] = useState<'month' | 'year'>('month');

  // 生成年份列表，从当前年份前5年到后5年
  const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i);

  const handleApply = () => {
    onDateChange(selectedMonth, selectedYear);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <TouchableOpacity 
        style={styles.modalContainer} 
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={onClose}
        >
          <TouchableOpacity 
            style={[
              styles.modalContent,
              { backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)' }
            ]}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={[
              styles.modalHeader,
              { borderBottomColor: isDarkMode ? '#334155' : '#E2E8F0' }
            ]}>
              <Text style={[
                styles.modalTitle,
                { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
              ]}>
                选择日期
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={{ color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 18 }}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'month' && styles.activeTabButton,
                  { backgroundColor: activeTab === 'month' ? (isDarkMode ? '#1E293B' : '#F1F5F9') : 'transparent' }
                ]}
                onPress={() => setActiveTab('month')}
              >
                <Text style={[
                  styles.tabButtonText,
                  { color: activeTab === 'month'
                    ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                    : (isDarkMode ? '#94A3B8' : '#64748B')
                  }
                ]}>
                  月份
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'year' && styles.activeTabButton,
                  { backgroundColor: activeTab === 'year' ? (isDarkMode ? '#1E293B' : '#F1F5F9') : 'transparent' }
                ]}
                onPress={() => setActiveTab('year')}
              >
                <Text style={[
                  styles.tabButtonText,
                  { color: activeTab === 'year'
                    ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                    : (isDarkMode ? '#94A3B8' : '#64748B')
                  }
                ]}>
                  年份
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              {activeTab === 'month' && (
                <View style={styles.monthsGrid}>
                  {months.map((month, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.monthItem,
                        selectedMonth === index && styles.selectedItem,
                        {
                          backgroundColor: selectedMonth === index 
                            ? '#6C8EB6' 
                            : (isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)'),
                          borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                        }
                      ]}
                      onPress={() => setSelectedMonth(index)}
                    >
                      <Text style={[
                        styles.monthItemText,
                        { 
                          color: selectedMonth === index 
                            ? '#FFFFFF' 
                            : (isDarkMode ? COLORS.text.dark : COLORS.text.light) 
                        }
                      ]}>
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {activeTab === 'year' && (
                <ScrollView style={styles.yearsContainer}>
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.yearItem,
                        selectedYear === year && styles.selectedItem,
                        {
                          backgroundColor: selectedYear === year 
                            ? '#6C8EB6' 
                            : (isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)'),
                          borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                        }
                      ]}
                      onPress={() => setSelectedYear(year)}
                    >
                      <Text style={[
                        styles.yearItemText,
                        { 
                          color: selectedYear === year 
                            ? '#FFFFFF' 
                            : (isDarkMode ? COLORS.text.dark : COLORS.text.light) 
                        }
                      ]}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}

              <View style={styles.currentSelection}>
                <Text style={[
                  styles.currentSelectionText,
                  { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                ]}>
                  当前选择: {months[selectedMonth]} {selectedYear}
                </Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[
                    styles.cancelButton,
                    {
                      backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                    }
                  ]}
                  onPress={onClose}
                >
                  <Text style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}>
                    取消
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.applyButton,
                    { backgroundColor: '#6C8EB6' }
                  ]}
                  onPress={handleApply}
                >
                  <Text style={{ color: '#FFFFFF', fontWeight: '500' }}>
                    确定
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
    zIndex: 9999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 9999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    width: '90%',
    maxHeight: '90%',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#6C8EB6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 20,
    zIndex: 10000,
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
  monthsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  monthItem: {
    width: '30%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  selectedItem: {
    borderColor: '#6C8EB6',
    shadowColor: '#6C8EB6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  monthItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  yearsContainer: {
    marginTop: 16,
    maxHeight: 300,
  },
  yearItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  yearItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  currentSelection: {
    marginTop: 16,
    alignItems: 'center',
  },
  currentSelectionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  applyButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DatePickerModal;
