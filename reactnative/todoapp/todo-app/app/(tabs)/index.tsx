import { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useTaskStore } from '@/store/useTaskStore';
import type { Task } from '@/types/task';


export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  const { tasks, addTask, deleteTask, toggleTask } = useTaskStore();
  const [inputValue, setInputValue] = useState('');
  const { fetchTasks } = useTaskStore();

      useEffect(() => {
        fetchTasks();
      }, []);

  const handleAddTask = () => {
    if (!inputValue.trim()) return;
    addTask(inputValue.trim());
    setInputValue('');
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity onPress={() => toggleTask(item.id)} activeOpacity={0.7}>
      <ThemedView style={styles.taskItem}>
        <ThemedText
          style={[styles.taskTitle, item.completed && styles.taskCompleted]}
          numberOfLines={1}>
          {item.title}
        </ThemedText>
        <Button title="Delete" onPress={() => deleteTask(item.id)} />
      </ThemedView>
    </TouchableOpacity>
  );

  const keyExtractor = (item: Task) => item.id;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <ThemedText type="title" style={styles.header}>
          My Tasks
        </ThemedText>

        <ThemedView style={styles.inputRow}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f5f5f5',
                color: textColor,
                borderColor: colorScheme === 'dark' ? '#404040' : '#e0e0e0',
              },
            ]}
            placeholder="Add a task..."
            placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={handleAddTask}
            returnKeyType="done"
          />
          <Pressable
            onPress={handleAddTask}
            style={({ pressed }) => [
              styles.addButton,
              { backgroundColor: tintColor },
              pressed && styles.addButtonPressed,
            ]}>
            <ThemedText
              lightColor="#fff"
              darkColor="#fff"
              style={styles.addButtonText}>
              Add
            </ThemedText>
          </Pressable>
        </ThemedView>

        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={keyExtractor}
          style={styles.list}
          contentContainerStyle={tasks.length === 0 && styles.emptyList}
          ListEmptyComponent={
            <ThemedText style={styles.emptyText}>No tasks yet. Add one above!</ThemedText>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  addButton: {
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonPressed: {
    opacity: 0.8,
  },
  addButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.6,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    marginRight: 12,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
});
