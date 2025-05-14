import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Switch,
  Animated
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS } from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileModal from './ProfileModal';
import BudgetManagementModal from './BudgetManagementModal';
import CategoryManagementModal from './CategoryManagementModal';
import FamilySharingModal from './FamilySharingModal';
import ExportDataModal from './ExportDataModal';



interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  // 高级功能模态框的状态和设置函数
  isProfileOpen: boolean;
  setIsProfileOpen: (isOpen: boolean) => void;
  isBudgetManagementOpen: boolean;
  setIsBudgetManagementOpen: (isOpen: boolean) => void;
  isCategoryManagementOpen: boolean;
  setIsCategoryManagementOpen: (isOpen: boolean) => void;
  isFamilySharingOpen: boolean;
  setIsFamilySharingOpen: (isOpen: boolean) => void;
  isExportDataOpen: boolean;
  setIsExportDataOpen: (isOpen: boolean) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({
  isOpen,
  onClose,
  isProfileOpen,
  setIsProfileOpen,
  isBudgetManagementOpen,
  setIsBudgetManagementOpen,
  isCategoryManagementOpen,
  setIsCategoryManagementOpen,
  isFamilySharingOpen,
  setIsFamilySharingOpen,
  isExportDataOpen,
  setIsExportDataOpen
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeItem, setActiveItem] = useState('home');

  // 动画值
  const slideAnim = useRef(new Animated.Value(-280)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      // 从左侧滑入
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // 向左侧滑出
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -280,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isOpen]);

  const menuItems = [
    { id: 'home', label: '首页', icon: 'home' },
    { id: 'profile', label: '个人中心', icon: 'account' },
    { id: 'budget', label: '预算管理', icon: 'chart-pie' },
    { id: 'family', label: '家庭共享', icon: 'account-group' },
    { id: 'categories', label: '分类管理', icon: 'cog' },
    { id: 'export', label: '导出数据', icon: 'file-export' },
  ];

  const handleItemClick = (id: string) => {
    setActiveItem(id);

    // 直接打开相应的模态框，不关闭侧边栏
    if (id === 'family') {
      setIsFamilySharingOpen(true);
    } else if (id === 'export') {
      setIsExportDataOpen(true);
    } else if (id === 'profile') {
      setIsProfileOpen(true);
    } else if (id === 'categories') {
      setIsCategoryManagementOpen(true);
    } else if (id === 'budget') {
      setIsBudgetManagementOpen(true);
    } else if (id === 'home') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.backdrop,
            { opacity: fadeAnim }
          ]}
        >
          <TouchableOpacity
            style={{ width: '100%', height: '100%' }}
            activeOpacity={1}
            onPress={onClose}
          />
        </Animated.View>

        <Animated.View style={[
          styles.sideMenu,
          {
            borderRightColor: '#334155',
            transform: [{ translateX: slideAnim }]
          }
        ]}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>智</Text>
              </View>
              <View>
                <Text style={styles.appName}>
                  智能记账
                </Text>
                <Text style={styles.appVersion}>
                  v1.0.0
                </Text>
              </View>
            </View>
          </View>

          <ScrollView style={styles.menuItems}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  activeItem === item.id && [
                    styles.activeMenuItem,
                    {
                      backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                      shadowColor: '#6C8EB6',
                      shadowOpacity: isDarkMode ? 0.2 : 0.1,
                      shadowRadius: 10,
                      shadowOffset: { width: 0, height: 0 },
                      elevation: 3
                    }
                  ]
                ]}
                onPress={() => handleItemClick(item.id)}
              >
                <Icon
                  name={item.icon}
                  size={18}
                  color={
                    activeItem === item.id
                      ? '#FFFFFF'
                      : '#94A3B8'
                  }
                />
                <Text style={[
                  styles.menuItemText,
                  {
                    color: activeItem === item.id
                      ? '#FFFFFF'
                      : '#94A3B8'
                  }
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={[
            styles.footer,
            { borderTopColor: isDarkMode ? '#334155' : '#E2E8F0' }
          ]}>
            <View style={styles.themeToggle}>
              <Icon
                name="weather-night"
                size={18}
                color={isDarkMode ? COLORS.text.dark : '#64748B'}
              />
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#CBD5E1', true: '#334155' }}
                thumbColor={isDarkMode ? '#6C8EB6' : '#F8FAFC'}
                style={styles.switch}
              />
              <Icon
                name="white-balance-sunny"
                size={18}
                color={!isDarkMode ? COLORS.text.light : '#94A3B8'}
              />
            </View>

            <TouchableOpacity style={styles.logoutButton}>
              <Icon name="logout" size={18} color="#FF6B6B" />
              <Text style={styles.logoutText}>退出登录</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    position: 'absolute',
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sideMenu: {
    position: 'absolute',
    left: 0,
    width: 280,
    height: '100%',
    borderRightWidth: 1,
    flexDirection: 'column',
    zIndex: 1, // 降低z-index，使其在模态框下面
    backgroundColor: '#0E1525', // 深蓝色背景，与图片一致
  },
  header: {
    padding: 16,
    paddingTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6C8EB6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C8EB6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  logoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  appVersion: {
    fontSize: 12,
    color: '#94A3B8',
  },
  menuItems: {
    flex: 1,
    padding: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 0,
  },
  activeMenuItem: {
    backgroundColor: '#1E293B',
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  switch: {
    marginHorizontal: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: '#FF6B6B',
    fontSize: 14,
  },
});

export default SideMenu;
