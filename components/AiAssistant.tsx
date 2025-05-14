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

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'assistant', content: string}[]>([
    {role: 'assistant', content: '你好！我是你的智能记账助手。有什么可以帮助你的吗？'},
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // 添加用户消息到聊天历史
    const newChatHistory = [
      ...chatHistory,
      {role: 'user', content: message}
    ];
    setChatHistory(newChatHistory);

    // 清空输入框
    setMessage('');

    // 模拟AI回复
    setTimeout(() => {
      setChatHistory([
        ...newChatHistory,
        {role: 'assistant', content: '这是一个AI助手的占位回复。在实际应用中，这里会连接到真实的AI服务。'}
      ]);
    }, 1000);
  };

  return (
    <Modal
      animationType="slide"
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
                AI助手
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={{ color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 18 }}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.chatContainer}>
              {chatHistory.map((chat, index) => (
                <View
                  key={index}
                  style={[
                    styles.chatBubble,
                    chat.role === 'user' ? styles.userBubble : styles.assistantBubble,
                    {
                      backgroundColor: chat.role === 'user'
                        ? (isDarkMode ? '#4A6FE5' : '#6C8EB6')
                        : (isDarkMode ? '#1E293B' : '#F1F5F9')
                    }
                  ]}
                >
                  <Text style={[
                    styles.chatText,
                    {
                      color: chat.role === 'user'
                        ? '#FFFFFF'
                        : (isDarkMode ? COLORS.text.dark : COLORS.text.light)
                    }
                  ]}>
                    {chat.content}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                    color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
                    borderColor: isDarkMode ? '#334155' : '#E2E8F0'
                  }
                ]}
                placeholder="输入消息..."
                placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
                value={message}
                onChangeText={setMessage}
                multiline
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  { backgroundColor: '#4ECDC4' }
                ]}
                onPress={handleSendMessage}
              >
                <Text style={styles.sendButtonText}>发送</Text>
              </TouchableOpacity>
            </View>
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
    height: '80%',
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
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  chatBubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
  },
  assistantBubble: {
    alignSelf: 'flex-start',
  },
  chatText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 8,
    borderRadius: 20,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AiAssistant;
