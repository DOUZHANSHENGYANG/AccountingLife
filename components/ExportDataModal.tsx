import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS } from '../constants';
import Button from './ui/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ExportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportDataModal: React.FC<ExportDataModalProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [exportFormat, setExportFormat] = useState('csv');
  const [dateRange, setDateRange] = useState('month');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);

    // 模拟导出过程
    setTimeout(() => {
      setIsExporting(false);
      Alert.alert('成功', '数据已导出');
      onClose();
    }, 2000);
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
                导出数据
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={{ color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 18 }}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* 导出格式选择 */}
              <View style={styles.section}>
                <Text style={[
                  styles.sectionTitle,
                  { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                ]}>
                  导出格式
                </Text>
                <View style={styles.formatOptions}>
                  <TouchableOpacity
                    style={[
                      styles.formatOption,
                      exportFormat === 'csv' && styles.selectedFormatOption,
                      {
                        backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                        borderColor: exportFormat === 'csv' ? '#6C8EB6' : (isDarkMode ? '#334155' : '#E2E8F0')
                      }
                    ]}
                    onPress={() => setExportFormat('csv')}
                  >
                    <Icon
                      name="file-delimited"
                      size={24}
                      color={exportFormat === 'csv' ? '#6C8EB6' : (isDarkMode ? '#94A3B8' : '#64748B')}
                    />
                    <Text style={[
                      styles.formatOptionText,
                      {
                        color: exportFormat === 'csv'
                          ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                          : (isDarkMode ? '#94A3B8' : '#64748B')
                      }
                    ]}>
                      CSV
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.formatOption,
                      exportFormat === 'excel' && styles.selectedFormatOption,
                      {
                        backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                        borderColor: exportFormat === 'excel' ? '#6C8EB6' : (isDarkMode ? '#334155' : '#E2E8F0')
                      }
                    ]}
                    onPress={() => setExportFormat('excel')}
                  >
                    <Icon
                      name="microsoft-excel"
                      size={24}
                      color={exportFormat === 'excel' ? '#6C8EB6' : (isDarkMode ? '#94A3B8' : '#64748B')}
                    />
                    <Text style={[
                      styles.formatOptionText,
                      {
                        color: exportFormat === 'excel'
                          ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                          : (isDarkMode ? '#94A3B8' : '#64748B')
                      }
                    ]}>
                      Excel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.formatOption,
                      exportFormat === 'pdf' && styles.selectedFormatOption,
                      {
                        backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                        borderColor: exportFormat === 'pdf' ? '#6C8EB6' : (isDarkMode ? '#334155' : '#E2E8F0')
                      }
                    ]}
                    onPress={() => setExportFormat('pdf')}
                  >
                    <Icon
                      name="file-pdf-box"
                      size={24}
                      color={exportFormat === 'pdf' ? '#6C8EB6' : (isDarkMode ? '#94A3B8' : '#64748B')}
                    />
                    <Text style={[
                      styles.formatOptionText,
                      {
                        color: exportFormat === 'pdf'
                          ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                          : (isDarkMode ? '#94A3B8' : '#64748B')
                      }
                    ]}>
                      PDF
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* 时间范围选择 */}
              <View style={styles.section}>
                <Text style={[
                  styles.sectionTitle,
                  { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                ]}>
                  时间范围
                </Text>
                <View style={styles.dateRangeOptions}>
                  <TouchableOpacity
                    style={[
                      styles.dateRangeOption,
                      dateRange === 'month' && styles.selectedDateRangeOption,
                      {
                        backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                        borderColor: dateRange === 'month' ? '#6C8EB6' : (isDarkMode ? '#334155' : '#E2E8F0')
                      }
                    ]}
                    onPress={() => setDateRange('month')}
                  >
                    <Text style={[
                      styles.dateRangeOptionText,
                      {
                        color: dateRange === 'month'
                          ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                          : (isDarkMode ? '#94A3B8' : '#64748B')
                      }
                    ]}>
                      本月
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.dateRangeOption,
                      dateRange === 'quarter' && styles.selectedDateRangeOption,
                      {
                        backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                        borderColor: dateRange === 'quarter' ? '#6C8EB6' : (isDarkMode ? '#334155' : '#E2E8F0')
                      }
                    ]}
                    onPress={() => setDateRange('quarter')}
                  >
                    <Text style={[
                      styles.dateRangeOptionText,
                      {
                        color: dateRange === 'quarter'
                          ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                          : (isDarkMode ? '#94A3B8' : '#64748B')
                      }
                    ]}>
                      本季度
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.dateRangeOption,
                      dateRange === 'year' && styles.selectedDateRangeOption,
                      {
                        backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                        borderColor: dateRange === 'year' ? '#6C8EB6' : (isDarkMode ? '#334155' : '#E2E8F0')
                      }
                    ]}
                    onPress={() => setDateRange('year')}
                  >
                    <Text style={[
                      styles.dateRangeOptionText,
                      {
                        color: dateRange === 'year'
                          ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                          : (isDarkMode ? '#94A3B8' : '#64748B')
                      }
                    ]}>
                      本年
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Button
                onPress={handleExport}
                disabled={isExporting}
                style={[
                  styles.exportButton,
                  isExporting && { opacity: 0.7 }
                ]}
                textStyle={styles.exportButtonText}
              >
                {isExporting ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    <Text style={styles.exportButtonText}>导出中...</Text>
                  </View>
                ) : (
                  <View style={styles.buttonContent}>
                    <Icon name="download" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.exportButtonText}>导出数据</Text>
                  </View>
                )}
              </Button>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  formatOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formatOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 4,
    gap: 8,
  },
  selectedFormatOption: {
    shadowColor: '#6C8EB6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 3,
  },
  formatOptionText: {
    fontSize: 14,
  },
  dateRangeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateRangeOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  selectedDateRangeOption: {
    shadowColor: '#6C8EB6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 3,
  },
  dateRangeOptionText: {
    fontSize: 14,
  },
  exportButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#6C8EB6',
    shadowColor: '#6C8EB6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  exportButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ExportDataModal;
