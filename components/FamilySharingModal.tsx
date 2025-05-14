import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Clipboard
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS } from '../constants';
import Button from './ui/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface FamilySharingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FamilyMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const FamilySharingModal: React.FC<FamilySharingModalProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'members' | 'invite'>('members');
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [memberToDelete, setMemberToDelete] = useState<FamilyMember | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedRole, setEditedRole] = useState('');

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: '1', name: '我自己', email: 'me@example.com', role: '管理员', avatar: '👤' },
    { id: '2', name: '配偶', email: 'spouse@example.com', role: '成员', avatar: '👩' },
    { id: '3', name: '孩子', email: 'child@example.com', role: '成员', avatar: '👦' },
  ]);

  const inviteCode = 'SHARE-1234-ABCD-5678';

  const handleCopyCode = () => {
    Clipboard.setString(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInvite = () => {
    if (!inviteEmail) {
      Alert.alert('错误', '请输入邮箱地址');
      return;
    }

    Alert.alert('成功', `邀请已发送至 ${inviteEmail}`);
    setInviteEmail('');
  };

  const handleDeleteMember = (member: FamilyMember) => {
    setMemberToDelete(member);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteMember = () => {
    if (memberToDelete) {
      setFamilyMembers(familyMembers.filter((member) => member.id !== memberToDelete.id));
      setIsDeleteDialogOpen(false);
      setMemberToDelete(null);
    }
  };

  const handleEditMember = (member: FamilyMember) => {
    setEditingMember(member);
    setEditedName(member.name);
    setEditedRole(member.role);
  };

  const handleSaveEdit = () => {
    if (editingMember) {
      setFamilyMembers(
        familyMembers.map((member) =>
          member.id === editingMember.id ? { ...member, name: editedName, role: editedRole } : member,
        ),
      );
      setEditingMember(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingMember(null);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalOverlay}>
          <View style={[
            styles.modalContent,
            { backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)' }
          ]}>
            <View style={[
              styles.modalHeader,
              { borderBottomColor: isDarkMode ? '#334155' : '#E2E8F0' }
            ]}>
              <Text style={[
                styles.modalTitle,
                { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
              ]}>
                家庭共享
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={{ color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 18 }}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'members' && styles.activeTabButton,
                  { backgroundColor: activeTab === 'members' ? (isDarkMode ? '#1E293B' : '#F1F5F9') : 'transparent' }
                ]}
                onPress={() => setActiveTab('members')}
              >
                <Text style={[
                  styles.tabButtonText,
                  { color: activeTab === 'members'
                    ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                    : (isDarkMode ? '#94A3B8' : '#64748B')
                  }
                ]}>
                  成员管理
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'invite' && styles.activeTabButton,
                  { backgroundColor: activeTab === 'invite' ? (isDarkMode ? '#1E293B' : '#F1F5F9') : 'transparent' }
                ]}
                onPress={() => setActiveTab('invite')}
              >
                <Text style={[
                  styles.tabButtonText,
                  { color: activeTab === 'invite'
                    ? (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                    : (isDarkMode ? '#94A3B8' : '#64748B')
                  }
                ]}>
                  邀请
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {activeTab === 'members' && (
                <View style={styles.membersContainer}>
                  {familyMembers.map((member) => (
                    <View
                      key={member.id}
                      style={[
                        styles.memberCard,
                        {
                          backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                          borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                        }
                      ]}
                    >
                      {editingMember?.id === member.id ? (
                        <View style={styles.editMemberForm}>
                          <View style={styles.editMemberHeader}>
                            <View style={[
                              styles.memberAvatar,
                              { backgroundColor: isDarkMode ? '#334155' : '#E2E8F0' }
                            ]}>
                              <Text style={styles.memberAvatarText}>{member.avatar}</Text>
                            </View>
                            <View style={styles.editMemberFields}>
                              <TextInput
                                style={[
                                  styles.editMemberInput,
                                  {
                                    backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                                    color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
                                    borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                                  }
                                ]}
                                value={editedName}
                                onChangeText={setEditedName}
                                placeholder="姓名"
                                placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                              />
                              <TextInput
                                style={[
                                  styles.editMemberInput,
                                  {
                                    backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                                    color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
                                    borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                                  }
                                ]}
                                value={editedRole}
                                onChangeText={setEditedRole}
                                placeholder="角色"
                                placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                              />
                            </View>
                          </View>
                          <View style={styles.editMemberActions}>
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
                              onPress={handleSaveEdit}
                              style={styles.saveButton}
                              textStyle={styles.saveButtonText}
                            >
                              保存
                            </Button>
                          </View>
                        </View>
                      ) : (
                        <View style={styles.memberCardContent}>
                          <View style={styles.memberInfo}>
                            <View style={[
                              styles.memberAvatar,
                              { backgroundColor: isDarkMode ? '#334155' : '#E2E8F0' }
                            ]}>
                              <Text style={styles.memberAvatarText}>{member.avatar}</Text>
                            </View>
                            <View>
                              <Text style={[
                                styles.memberName,
                                { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                              ]}>
                                {member.name}
                              </Text>
                              <Text style={[
                                styles.memberEmail,
                                { color: isDarkMode ? '#94A3B8' : '#64748B' }
                              ]}>
                                {member.email}
                              </Text>
                              <View style={[
                                styles.memberRole,
                                { backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)' }
                              ]}>
                                <Text style={[
                                  styles.memberRoleText,
                                  { color: isDarkMode ? '#94A3B8' : '#64748B' }
                                ]}>
                                  {member.role}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={styles.memberActions}>
                            <TouchableOpacity
                              onPress={() => handleEditMember(member)}
                              style={styles.actionButton}
                            >
                              <Icon name="pencil" size={16} color={isDarkMode ? '#94A3B8' : '#64748B'} />
                            </TouchableOpacity>
                            {member.id !== '1' && (
                              <TouchableOpacity
                                onPress={() => handleDeleteMember(member)}
                                style={styles.actionButton}
                              >
                                <Icon name="trash-can" size={16} color="#FF6B6B" />
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {activeTab === 'invite' && (
                <View style={styles.inviteContainer}>
                  <View style={styles.inviteCodeSection}>
                    <Text style={[
                      styles.sectionLabel,
                      { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                    ]}>
                      分享邀请码
                    </Text>
                    <View style={styles.inviteCodeContainer}>
                      <TextInput
                        style={[
                          styles.inviteCodeInput,
                          {
                            backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                            color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
                            borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                          }
                        ]}
                        value={inviteCode}
                        editable={false}
                      />
                      <Button
                        onPress={handleCopyCode}
                        style={[
                          styles.copyButton,
                          copied ? { backgroundColor: '#4CAF50' } : { backgroundColor: '#6C8EB6' }
                        ]}
                        textStyle={styles.copyButtonText}
                      >
                        <Icon name={copied ? 'check' : 'content-copy'} size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
                        {copied ? '已复制' : '复制'}
                      </Button>
                    </View>
                    <Text style={[
                      styles.inviteCodeHint,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' }
                    ]}>
                      将此邀请码分享给家庭成员，他们可以通过此代码加入您的家庭账户
                    </Text>
                  </View>

                  <View style={styles.divider}>
                    <View style={[
                      styles.dividerLine,
                      { backgroundColor: isDarkMode ? '#334155' : '#E2E8F0' }
                    ]} />
                    <Text style={[
                      styles.dividerText,
                      {
                        color: isDarkMode ? '#94A3B8' : '#64748B',
                        backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)'
                      }
                    ]}>
                      或者
                    </Text>
                    <View style={[
                      styles.dividerLine,
                      { backgroundColor: isDarkMode ? '#334155' : '#E2E8F0' }
                    ]} />
                  </View>

                  <View style={styles.emailInviteSection}>
                    <Text style={[
                      styles.sectionLabel,
                      { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
                    ]}>
                      通过邮箱邀请
                    </Text>
                    <TextInput
                      style={[
                        styles.emailInput,
                        {
                          backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.6)',
                          color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
                          borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                        }
                      ]}
                      value={inviteEmail}
                      onChangeText={setInviteEmail}
                      placeholder="输入邮箱地址"
                      placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                      keyboardType="email-address"
                    />
                    <Button
                      onPress={handleInvite}
                      style={styles.inviteButton}
                      textStyle={styles.inviteButtonText}
                    >
                      <Icon name="share" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                      发送邀请
                    </Button>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </View>

      {/* 删除确认对话框 */}
      {isDeleteDialogOpen && memberToDelete && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isDeleteDialogOpen}
          onRequestClose={() => setIsDeleteDialogOpen(false)}
        >
          <View style={styles.alertModalContainer}>
            <View style={[
              styles.alertModalContent,
              { backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)' }
            ]}>
              <Text style={[
                styles.alertTitle,
                { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }
              ]}>
                移除家庭成员
              </Text>
              <Text style={[
                styles.alertMessage,
                { color: isDarkMode ? '#94A3B8' : '#64748B' }
              ]}>
                确定要移除 {memberToDelete.name} 吗？移除后，该成员将无法访问家庭共享的账单数据。
              </Text>
              <View style={styles.alertActions}>
                <Button
                  onPress={() => setIsDeleteDialogOpen(false)}
                  style={[
                    styles.alertCancelButton,
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
                  onPress={confirmDeleteMember}
                  style={styles.alertDeleteButton}
                  textStyle={styles.alertDeleteButtonText}
                >
                  <Icon name="trash-can" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
                  移除
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100, // 增加z-index，使其在侧边栏上面
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 100, // 增加z-index，使其在侧边栏上面
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
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
  membersContainer: {
    gap: 16,
  },
  memberCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  memberCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberAvatarText: {
    fontSize: 20,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
  },
  memberEmail: {
    fontSize: 12,
    marginBottom: 4,
  },
  memberRole: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  memberRoleText: {
    fontSize: 10,
  },
  memberActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editMemberForm: {
    gap: 16,
  },
  editMemberHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  editMemberFields: {
    flex: 1,
    gap: 8,
  },
  editMemberInput: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  editMemberActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
  },
  saveButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#6C8EB6',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  inviteContainer: {
    gap: 24,
  },
  inviteCodeSection: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  inviteCodeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  inviteCodeInput: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  copyButton: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  inviteCodeHint: {
    fontSize: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
    paddingHorizontal: 8,
  },
  emailInviteSection: {
    gap: 12,
  },
  emailInput: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  inviteButton: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#6C8EB6',
  },
  inviteButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  alertModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertModalContent: {
    width: '80%',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  alertMessage: {
    fontSize: 14,
    marginBottom: 24,
  },
  alertActions: {
    flexDirection: 'row',
    gap: 12,
  },
  alertCancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
  },
  alertDeleteButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#FF6B6B',
  },
  alertDeleteButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default FamilySharingModal;
