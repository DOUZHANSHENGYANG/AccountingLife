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

interface CategoryManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'expense' | 'income';
  parentId?: string;
  children?: Category[];
}

const CategoryManagementModal: React.FC<CategoryManagementModalProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: '',
    icon: '📝',
    color: '#6C8EB6',
    type: 'expense',
  });
  const [parentCategoryId, setParentCategoryId] = useState<string | undefined>(undefined);

  // 初始化分类数据
  useEffect(() => {
    // 将扁平的mockCategories转换为层级结构
    const hierarchicalCategories: Category[] = [];
    const tempCategories = [...mockCategories] as Category[];

    // 添加一些子分类用于演示
    tempCategories.push(
      {
        id: 'food_breakfast',
        name: '早餐',
        icon: '🍳',
        color: '#FF6B6B',
        type: 'expense',
        parentId: 'food',
      },
      {
        id: 'food_lunch',
        name: '午餐',
        icon: '🍜',
        color: '#FF6B6B',
        type: 'expense',
        parentId: 'food',
      },
      {
        id: 'food_dinner',
        name: '晚餐',
        icon: '🍲',
        color: '#FF6B6B',
        type: 'expense',
        parentId: 'food',
      },
      {
        id: 'transport_taxi',
        name: '出租车',
        icon: '🚕',
        color: '#4ECDC4',
        type: 'expense',
        parentId: 'transport',
      },
      {
        id: 'transport_subway',
        name: '地铁',
        icon: '🚇',
        color: '#4ECDC4',
        type: 'expense',
        parentId: 'transport',
      },
    );

    // 获取所有根分类
    const rootCategories = tempCategories.filter((cat) => !cat.parentId);

    // 对于每个根分类，找到其子分类
    rootCategories.forEach((rootCat) => {
      const children = tempCategories.filter((cat) => cat.parentId === rootCat.id);
      if (children.length > 0) {
        rootCat.children = children;
      }
      hierarchicalCategories.push(rootCat);
    });

    setCategories(hierarchicalCategories);
  }, []);

  const toggleCategoryExpand = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter((id) => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const handleAddCategory = () => {
    setIsAddingCategory(true);
    setNewCategory({
      name: '',
      icon: '📝',
      color: '#6C8EB6',
      type: activeTab,
      parentId: parentCategoryId,
    });
  };

  const handleEditCategory = (category: Category) => {
    setIsEditingCategory(category.id);
    setNewCategory({
      name: category.name,
      icon: category.icon,
      color: category.color,
      type: category.type,
      parentId: category.parentId,
    });
  };

  const handleDeleteCategory = (category: Category) => {
    Alert.alert(
      "删除分类",
      `确定要删除"${category.name}"分类吗？${category.children && category.children.length > 0 ? '这将同时删除所有子分类。' : ''}`,
      [
        {
          text: "取消",
          style: "cancel"
        },
        {
          text: "删除",
          onPress: () => {
            // 递归删除分类及其子分类
            const removeCategory = (cats: Category[], categoryId: string): Category[] => {
              return cats.filter((cat) => {
                if (cat.id === categoryId) return false;
                if (cat.children) {
                  cat.children = removeCategory(cat.children, categoryId);
                }
                return true;
              });
            };

            setCategories(removeCategory(categories, category.id));
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleSaveCategory = () => {
    if (!newCategory.name) {
      Alert.alert("错误", "请输入分类名称");
      return;
    }

    if (isEditingCategory) {
      // 更新现有分类
      const updateCategory = (cats: Category[]): Category[] => {
        return cats.map((cat) => {
          if (cat.id === isEditingCategory) {
            return {
              ...cat,
              name: newCategory.name || cat.name,
              icon: newCategory.icon || cat.icon,
              color: newCategory.color || cat.color,
            };
          }
          if (cat.children) {
            cat.children = updateCategory(cat.children);
          }
          return cat;
        });
      };

      setCategories(updateCategory(categories));
      setIsEditingCategory(null);
    } else {
      // 添加新分类
      const newCat: Category = {
        id: `new_${Date.now()}`,
        name: newCategory.name || '新分类',
        icon: newCategory.icon || '📝',
        color: newCategory.color || '#6C8EB6',
        type: newCategory.type || activeTab,
        parentId: newCategory.parentId,
      };

      if (newCategory.parentId) {
        // 添加为父分类的子分类
        const addChildToParent = (cats: Category[]): Category[] => {
          return cats.map((cat) => {
            if (cat.id === newCategory.parentId) {
              return {
                ...cat,
                children: [...(cat.children || []), newCat],
              };
            }
            if (cat.children) {
              cat.children = addChildToParent(cat.children);
            }
            return cat;
          });
        };

        setCategories(addChildToParent(categories));
        // 展开父分类
        if (!expandedCategories.includes(newCategory.parentId)) {
          setExpandedCategories([...expandedCategories, newCategory.parentId]);
        }
      } else {
        // 添加为根分类
        setCategories([...categories, newCat]);
      }
    }

    setIsAddingCategory(false);
    setNewCategory({
      name: '',
      icon: '📝',
      color: '#6C8EB6',
      type: activeTab,
    });
    setParentCategoryId(undefined);
  };

  const handleCancelEdit = () => {
    setIsAddingCategory(false);
    setIsEditingCategory(null);
    setNewCategory({
      name: '',
      icon: '📝',
      color: '#6C8EB6',
      type: activeTab,
    });
    setParentCategoryId(undefined);
  };

  const addSubcategory = (parentId: string) => {
    setIsAddingCategory(true);
    setParentCategoryId(parentId);
    setNewCategory({
      name: '',
      icon: '📝',
      color: '#6C8EB6',
      type: activeTab,
      parentId: parentId,
    });
  };

  // 递归渲染分类
  const renderCategories = (categoryList: Category[], level = 0) => {
    return categoryList
      .filter((cat) => cat.type === activeTab)
      .map((category) => (
        <View key={category.id}>
          <View
            style={[
              styles.categoryItem,
              level > 0 && { marginLeft: 24 },
              { backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)' }
            ]}
          >
            <View style={styles.categoryItemLeft}>
              {category.children && category.children.length > 0 ? (
                <TouchableOpacity
                  onPress={() => toggleCategoryExpand(category.id)}
                  style={styles.expandButton}
                >
                  <Icon
                    name={expandedCategories.includes(category.id) ? 'chevron-down' : 'chevron-right'}
                    size={18}
                    color={isDarkMode ? '#94A3B8' : '#64748B'}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.expandButtonPlaceholder} />
              )}

              <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                <Text style={styles.categoryIconText}>{category.icon}</Text>
              </View>

              <Text style={[
                styles.categoryName,
                { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
              ]}>
                {category.name}
              </Text>
            </View>

            <View style={styles.categoryItemActions}>
              <TouchableOpacity
                onPress={() => addSubcategory(category.id)}
                style={styles.actionButton}
              >
                <Icon name="plus" size={16} color={isDarkMode ? '#94A3B8' : '#64748B'} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleEditCategory(category)}
                style={styles.actionButton}
              >
                <Icon name="pencil" size={16} color={isDarkMode ? '#94A3B8' : '#64748B'} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDeleteCategory(category)}
                style={styles.actionButton}
              >
                <Icon name="trash-can" size={16} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          </View>

          {/* 如果展开，渲染子分类 */}
          {category.children &&
            category.children.length > 0 &&
            expandedCategories.includes(category.id) &&
            renderCategories(category.children, level + 1)}
        </View>
      ));
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
                分类管理
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={{ color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 18 }}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'expense' && styles.activeTabButton,
                  { backgroundColor: activeTab === 'expense' ? (isDarkMode ? '#1E293B' : '#F1F5F9') : 'transparent' }
                ]}
                onPress={() => setActiveTab('expense')}
              >
                <Text style={[
                  styles.tabButtonText,
                  { color: activeTab === 'expense'
                    ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                    : (isDarkMode ? '#94A3B8' : '#64748B')
                  }
                ]}>
                  支出分类
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'income' && styles.activeTabButton,
                  { backgroundColor: activeTab === 'income' ? (isDarkMode ? '#1E293B' : '#F1F5F9') : 'transparent' }
                ]}
                onPress={() => setActiveTab('income')}
              >
                <Text style={[
                  styles.tabButtonText,
                  { color: activeTab === 'income'
                    ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                    : (isDarkMode ? '#94A3B8' : '#64748B')
                  }
                ]}>
                  收入分类
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {isAddingCategory || isEditingCategory ? (
                <View style={[
                  styles.categoryForm,
                  {
                    backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                    borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                  }
                ]}>
                  <Text style={[
                    styles.formTitle,
                    { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                  ]}>
                    {isEditingCategory ? '编辑分类' : '添加分类'}
                    {parentCategoryId && ' (子分类)'}
                  </Text>

                  <View style={styles.formGroup}>
                    <Text style={[
                      styles.formLabel,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' }
                    ]}>
                      分类名称
                    </Text>
                    <TextInput
                      style={[
                        styles.textInput,
                        {
                          backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                          color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
                          borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                        }
                      ]}
                      value={newCategory.name}
                      onChangeText={(text) => setNewCategory({ ...newCategory, name: text })}
                      placeholder="输入分类名称"
                      placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={[
                      styles.formLabel,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' }
                    ]}>
                      图标
                    </Text>
                    <TextInput
                      style={[
                        styles.textInput,
                        {
                          backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                          color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
                          borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                        }
                      ]}
                      value={newCategory.icon}
                      onChangeText={(text) => setNewCategory({ ...newCategory, icon: text })}
                      placeholder="输入表情符号"
                      placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={[
                      styles.formLabel,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' }
                    ]}>
                      颜色
                    </Text>
                    <TextInput
                      style={[
                        styles.textInput,
                        {
                          backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                          color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
                          borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                        }
                      ]}
                      value={newCategory.color}
                      onChangeText={(text) => setNewCategory({ ...newCategory, color: text })}
                      placeholder="输入颜色代码 (例如: #FF6B6B)"
                      placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                    />
                  </View>

                  <View style={styles.formActions}>
                    <Button
                      onPress={handleCancelEdit}
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
                      onPress={handleSaveCategory}
                      style={styles.saveButton}
                      textStyle={styles.saveButtonText}
                    >
                      保存
                    </Button>
                  </View>
                </View>
              ) : (
                <Button
                  onPress={handleAddCategory}
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
                  <Icon name="plus" size={16} color={isDarkMode ? COLORS.text.dark : COLORS.text.light} /> 添加分类
                </Button>
              )}

              {!isAddingCategory && !isEditingCategory && (
                <View style={styles.categoriesList}>
                  {renderCategories(categories)}
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
  addButton: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  categoriesList: {
    gap: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expandButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandButtonPlaceholder: {
    width: 24,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIconText: {
    fontSize: 16,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryItemActions: {
    flexDirection: 'row',
    gap: 4,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryForm: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    gap: 16,
    marginBottom: 16,
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
  textInput: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
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

export default CategoryManagementModal;
