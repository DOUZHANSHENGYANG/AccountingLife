import React, { useState } from 'react';
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

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'payment'>('profile');

  // 模拟用户数据
  const [userData, setUserData] = useState({
    name: '用户',
    email: 'user@example.com',
    phone: '138****1234',
    avatar: '👤',
  });

  const handleSave = () => {
    // 保存个人资料
    console.log('保存个人资料:', userData);
    // 显示成功消息
    Alert.alert('成功', '个人资料已更新');
    setTimeout(() => {
      onClose();
    }, 1000);
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
                个人中心
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={{ color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 18 }}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'profile' && styles.activeTabButton,
                  { backgroundColor: activeTab === 'profile' ? (isDarkMode ? '#1E293B' : '#F1F5F9') : 'transparent' }
                ]}
                onPress={() => setActiveTab('profile')}
              >
                <Text style={[
                  styles.tabButtonText,
                  { color: activeTab === 'profile'
                    ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                    : (isDarkMode ? '#94A3B8' : '#64748B')
                  }
                ]}>
                  个人资料
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'security' && styles.activeTabButton,
                  { backgroundColor: activeTab === 'security' ? (isDarkMode ? '#1E293B' : '#F1F5F9') : 'transparent' }
                ]}
                onPress={() => setActiveTab('security')}
              >
                <Text style={[
                  styles.tabButtonText,
                  { color: activeTab === 'security'
                    ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                    : (isDarkMode ? '#94A3B8' : '#64748B')
                  }
                ]}>
                  安全设置
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'payment' && styles.activeTabButton,
                  { backgroundColor: activeTab === 'payment' ? (isDarkMode ? '#1E293B' : '#F1F5F9') : 'transparent' }
                ]}
                onPress={() => setActiveTab('payment')}
              >
                <Text style={[
                  styles.tabButtonText,
                  { color: activeTab === 'payment'
                    ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                    : (isDarkMode ? '#94A3B8' : '#64748B')
                  }
                ]}>
                  支付方式
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {activeTab === 'profile' && (
                <View style={styles.profileContainer}>
                  {/* 头像 */}
                  <View style={styles.avatarContainer}>
                    <View style={styles.avatarWrapper}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{userData.avatar}</Text>
                      </View>
                      <TouchableOpacity style={styles.avatarEditButton}>
                        <Icon name="camera" size={14} color={isDarkMode ? '#94A3B8' : '#64748B'} />
                      </TouchableOpacity>
                    </View>
                    <Text style={[
                      styles.userName,
                      { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                    ]}>
                      {userData.name}
                    </Text>
                  </View>

                  {/* 表单字段 */}
                  <View style={styles.formContainer}>
                    <View style={styles.formGroup}>
                      <Text style={[
                        styles.formLabel,
                        { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                      ]}>
                        姓名
                      </Text>
                      <TextInput
                        style={[
                          styles.textInput,
                          {
                            backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                            color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
                            borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                          }
                        ]}
                        value={userData.name}
                        onChangeText={(text) => setUserData({ ...userData, name: text })}
                      />
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={[
                        styles.formLabel,
                        { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                      ]}>
                        邮箱
                      </Text>
                      <TextInput
                        style={[
                          styles.textInput,
                          {
                            backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                            color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
                            borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                          }
                        ]}
                        value={userData.email}
                        onChangeText={(text) => setUserData({ ...userData, email: text })}
                        keyboardType="email-address"
                      />
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={[
                        styles.formLabel,
                        { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                      ]}>
                        手机号
                      </Text>
                      <TextInput
                        style={[
                          styles.textInput,
                          {
                            backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                            color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
                            borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                          }
                        ]}
                        value={userData.phone}
                        onChangeText={(text) => setUserData({ ...userData, phone: text })}
                        keyboardType="phone-pad"
                      />
                    </View>

                    <Button
                      onPress={handleSave}
                      style={styles.saveButton}
                      textStyle={styles.saveButtonText}
                    >
                      <Icon name="content-save" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                      保存修改
                    </Button>
                  </View>
                </View>
              )}

              {activeTab === 'security' && (
                <View style={styles.securityContainer}>
                  <View style={[
                    styles.securityCard,
                    {
                      backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                    }
                  ]}>
                    <View style={styles.securityCardContent}>
                      <View style={[
                        styles.securityIcon,
                        { backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF' }
                      ]}>
                        <Icon name="lock" size={18} color="#6C8EB6" />
                      </View>
                      <View style={styles.securityInfo}>
                        <Text style={[
                          styles.securityTitle,
                          { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                        ]}>
                          密码设置
                        </Text>
                        <Text style={[
                          styles.securitySubtitle,
                          { color: isDarkMode ? '#94A3B8' : '#64748B' }
                        ]}>
                          上次更新: 30天前
                        </Text>
                      </View>
                    </View>
                    <Button
                      onPress={() => Alert.alert('提示', '密码修改功能即将上线')}
                      style={[
                        styles.securityButton,
                        {
                          backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                          borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                        }
                      ]}
                      textStyle={{
                        color: isDarkMode ? '#94A3B8' : '#64748B'
                      }}
                    >
                      修改
                    </Button>
                  </View>

                  <View style={[
                    styles.securityCard,
                    {
                      backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                    }
                  ]}>
                    <View style={styles.securityCardContent}>
                      <View style={[
                        styles.securityIcon,
                        { backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF' }
                      ]}>
                        <Icon name="bell" size={18} color="#6C8EB6" />
                      </View>
                      <View style={styles.securityInfo}>
                        <Text style={[
                          styles.securityTitle,
                          { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                        ]}>
                          通知设置
                        </Text>
                        <Text style={[
                          styles.securitySubtitle,
                          { color: isDarkMode ? '#94A3B8' : '#64748B' }
                        ]}>
                          管理应用通知
                        </Text>
                      </View>
                    </View>
                    <Button
                      onPress={() => Alert.alert('提示', '通知设置功能即将上线')}
                      style={[
                        styles.securityButton,
                        {
                          backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                          borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                        }
                      ]}
                      textStyle={{
                        color: isDarkMode ? '#94A3B8' : '#64748B'
                      }}
                    >
                      设置
                    </Button>
                  </View>
                </View>
              )}

              {activeTab === 'payment' && (
                <View style={styles.paymentContainer}>
                  <View style={[
                    styles.paymentCard,
                    {
                      backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                    }
                  ]}>
                    <View style={styles.paymentCardContent}>
                      <View style={[
                        styles.paymentIcon,
                        { backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF' }
                      ]}>
                        <Icon name="credit-card" size={18} color="#6C8EB6" />
                      </View>
                      <View style={styles.paymentInfo}>
                        <Text style={[
                          styles.paymentTitle,
                          { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                        ]}>
                          支付宝
                        </Text>
                        <Text style={[
                          styles.paymentSubtitle,
                          { color: isDarkMode ? '#94A3B8' : '#64748B' }
                        ]}>
                          绑定支付宝账号自动同步账单
                        </Text>
                      </View>
                    </View>
                    <Button
                      onPress={() => Alert.alert('提示', '支付宝绑定功能即将上线')}
                      style={[
                        styles.paymentButton,
                        {
                          backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                          borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                        }
                      ]}
                      textStyle={{
                        color: isDarkMode ? '#94A3B8' : '#64748B'
                      }}
                    >
                      绑定
                    </Button>
                  </View>

                  <View style={[
                    styles.paymentCard,
                    {
                      backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                    }
                  ]}>
                    <View style={styles.paymentCardContent}>
                      <View style={[
                        styles.paymentIcon,
                        { backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF' }
                      ]}>
                        <Text style={{ fontSize: 18 }}>💬</Text>
                      </View>
                      <View style={styles.paymentInfo}>
                        <Text style={[
                          styles.paymentTitle,
                          { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                        ]}>
                          微信支付
                        </Text>
                        <Text style={[
                          styles.paymentSubtitle,
                          { color: isDarkMode ? '#94A3B8' : '#64748B' }
                        ]}>
                          绑定微信账号自动同步账单
                        </Text>
                      </View>
                    </View>
                    <Button
                      onPress={() => Alert.alert('提示', '微信支付绑定功能即将上线')}
                      style={[
                        styles.paymentButton,
                        {
                          backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                          borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                        }
                      ]}
                      textStyle={{
                        color: isDarkMode ? '#94A3B8' : '#64748B'
                      }}
                    >
                      绑定
                    </Button>
                  </View>
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
  profileContainer: {
    gap: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    gap: 12,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(108, 142, 182, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C8EB6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  avatarText: {
    fontSize: 32,
    color: '#FFFFFF',
  },
  avatarEditButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  textInput: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  saveButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#6C8EB6',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
  },
  securityContainer: {
    gap: 16,
  },
  securityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  securityCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  securityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityInfo: {
    gap: 4,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  securitySubtitle: {
    fontSize: 12,
  },
  securityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  paymentContainer: {
    gap: 16,
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  paymentCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentInfo: {
    gap: 4,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  paymentSubtitle: {
    fontSize: 12,
  },
  paymentButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default ProfileModal;
