import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS } from '../constants';
import Button from './ui/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ImportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImportDataModal: React.FC<ImportDataModalProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'wechat' | 'alipay' | 'excel'>('wechat');
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = () => {
    setIsImporting(true);
    
    // 模拟导入过程
    setTimeout(() => {
      setIsImporting(false);
      Alert.alert('导入成功', '数据已成功导入');
      onClose();
    }, 2000);
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
                导入数据
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={{ color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 18 }}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'wechat' && styles.activeTabButton,
                  { backgroundColor: activeTab === 'wechat' ? (isDarkMode ? '#1E293B' : '#F1F5F9') : 'transparent' }
                ]}
                onPress={() => setActiveTab('wechat')}
              >
                <Text style={[
                  styles.tabButtonText,
                  { color: activeTab === 'wechat'
                    ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                    : (isDarkMode ? '#94A3B8' : '#64748B')
                  }
                ]}>
                  微信支付
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'alipay' && styles.activeTabButton,
                  { backgroundColor: activeTab === 'alipay' ? (isDarkMode ? '#1E293B' : '#F1F5F9') : 'transparent' }
                ]}
                onPress={() => setActiveTab('alipay')}
              >
                <Text style={[
                  styles.tabButtonText,
                  { color: activeTab === 'alipay'
                    ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                    : (isDarkMode ? '#94A3B8' : '#64748B')
                  }
                ]}>
                  支付宝
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'excel' && styles.activeTabButton,
                  { backgroundColor: activeTab === 'excel' ? (isDarkMode ? '#1E293B' : '#F1F5F9') : 'transparent' }
                ]}
                onPress={() => setActiveTab('excel')}
              >
                <Text style={[
                  styles.tabButtonText,
                  { color: activeTab === 'excel'
                    ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                    : (isDarkMode ? '#94A3B8' : '#64748B')
                  }
                ]}>
                  Excel
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {activeTab === 'wechat' && (
                <View style={styles.importContainer}>
                  <View style={styles.importIcon}>
                    <Text style={styles.importIconText}>💬</Text>
                  </View>
                  <Text style={[
                    styles.importTitle,
                    { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                  ]}>
                    导入微信支付账单
                  </Text>
                  <Text style={[
                    styles.importDescription,
                    { color: isDarkMode ? '#94A3B8' : '#64748B' }
                  ]}>
                    1. 打开微信，进入"我"-"支付"-"钱包"-"账单"
                    {'\n'}
                    2. 点击右上角"..."，选择"账单下载"
                    {'\n'}
                    3. 选择要导出的时间范围，下载账单
                    {'\n'}
                    4. 点击下方"选择文件"按钮，选择下载的账单文件
                  </Text>
                  <Button
                    onPress={handleImport}
                    style={styles.importButton}
                    textStyle={styles.importButtonText}
                    disabled={isImporting}
                  >
                    {isImporting ? '导入中...' : '选择文件'}
                  </Button>
                </View>
              )}

              {activeTab === 'alipay' && (
                <View style={styles.importContainer}>
                  <View style={styles.importIcon}>
                    <Icon name="alpha-a-circle" size={40} color="#1677FF" />
                  </View>
                  <Text style={[
                    styles.importTitle,
                    { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                  ]}>
                    导入支付宝账单
                  </Text>
                  <Text style={[
                    styles.importDescription,
                    { color: isDarkMode ? '#94A3B8' : '#64748B' }
                  ]}>
                    1. 打开支付宝，进入"我的"-"账单"
                    {'\n'}
                    2. 点击右上角"..."，选择"下载账单"
                    {'\n'}
                    3. 选择要导出的时间范围，下载账单
                    {'\n'}
                    4. 点击下方"选择文件"按钮，选择下载的账单文件
                  </Text>
                  <Button
                    onPress={handleImport}
                    style={styles.importButton}
                    textStyle={styles.importButtonText}
                    disabled={isImporting}
                  >
                    {isImporting ? '导入中...' : '选择文件'}
                  </Button>
                </View>
              )}

              {activeTab === 'excel' && (
                <View style={styles.importContainer}>
                  <View style={styles.importIcon}>
                    <Icon name="file-excel" size={40} color="#217346" />
                  </View>
                  <Text style={[
                    styles.importTitle,
                    { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                  ]}>
                    导入Excel文件
                  </Text>
                  <Text style={[
                    styles.importDescription,
                    { color: isDarkMode ? '#94A3B8' : '#64748B' }
                  ]}>
                    请确保您的Excel文件符合以下格式：
                    {'\n\n'}
                    必须包含以下列：
                    {'\n'}
                    - 日期（格式：YYYY-MM-DD）
                    {'\n'}
                    - 金额（正数表示收入，负数表示支出）
                    {'\n'}
                    - 分类（与应用内分类匹配）
                    {'\n'}
                    - 备注（可选）
                    {'\n\n'}
                    点击下方按钮选择Excel文件进行导入
                  </Text>
                  <Button
                    onPress={handleImport}
                    style={styles.importButton}
                    textStyle={styles.importButtonText}
                    disabled={isImporting}
                  >
                    {isImporting ? '导入中...' : '选择文件'}
                  </Button>
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
  importContainer: {
    alignItems: 'center',
    padding: 16,
  },
  importIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  importIconText: {
    fontSize: 40,
  },
  importTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  importDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
  },
  importButton: {
    width: '80%',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#6C8EB6',
  },
  importButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default ImportDataModal;
