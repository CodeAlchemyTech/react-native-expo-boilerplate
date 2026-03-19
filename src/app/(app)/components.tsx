import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { ScreenContainer } from '@components/organisms/ScreenContainer';
import { Header } from '@components/organisms/Header';
import { Button } from '@components/atoms/Button';
import { Text } from '@components/atoms/Text';
import { Input } from '@components/atoms/Input';
import { Loader } from '@components/atoms/Loader';
import { Badge } from '@components/atoms/Badge';
import { Divider } from '@components/atoms/Divider';
import { Card } from '@components/molecules/Card';
import { EmptyState } from '@components/molecules/EmptyState';
import { ErrorState } from '@components/molecules/ErrorState';
import { Modal } from '@components/molecules/Modal';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-xs font-bold uppercase tracking-widest text-gray-400">
        {title}
      </Text>
      {children}
    </View>
  );
}

export default function ComponentsScreen() {
  const [inputValue, setInputValue] = useState('');
  const [inputWithError, setInputWithError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScreenContainer scrollable>
      <Header title="Component Catalog" />

      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 32, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Text ── */}
        <Section title="Text">
          <Text className="text-4xl font-bold text-gray-900 dark:text-gray-50">Heading 1</Text>
          <Text className="text-3xl font-bold text-gray-900 dark:text-gray-50">Heading 2</Text>
          <Text className="text-2xl font-semibold text-gray-900 dark:text-gray-50">Heading 3</Text>
          <Text className="text-xl font-semibold text-gray-900 dark:text-gray-50">Heading 4</Text>
          <Text className="text-base text-gray-900 dark:text-gray-50">Body — regular text for paragraphs and descriptions.</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">Small — secondary info, captions, metadata.</Text>
          <Text className="text-xs text-gray-400 dark:text-gray-500">XSmall — labels, timestamps, hints.</Text>
          <Text className="text-base text-primary-600">Primary colored text</Text>
          <Text className="text-base text-danger">Danger / error text</Text>
          <Text className="text-base text-success">Success text</Text>
          <Text className="text-base text-warning">Warning text</Text>
        </Section>

        <Divider />

        {/* ── Badge ── */}
        <Section title="Badge">
          <View className="flex-row flex-wrap gap-2">
            <Badge label="Primary" variant="primary" />
            <Badge label="Secondary" variant="secondary" />
            <Badge label="Success" variant="success" />
            <Badge label="Danger" variant="danger" />
            <Badge label="Warning" variant="warning" />
            <Badge label="Neutral" variant="neutral" />
          </View>
        </Section>

        <Divider />

        {/* ── Button ── */}
        <Section title="Button — Variants">
          <Button label="Primary" onPress={() => {}} variant="primary" />
          <Button label="Secondary" onPress={() => {}} variant="secondary" />
          <Button label="Outline" onPress={() => {}} variant="outline" />
          <Button label="Ghost" onPress={() => {}} variant="ghost" />
          <Button label="Danger" onPress={() => {}} variant="danger" />
        </Section>

        <Section title="Button — Sizes">
          <Button label="Small" onPress={() => {}} size="sm" />
          <Button label="Medium (default)" onPress={() => {}} size="md" />
          <Button label="Large" onPress={() => {}} size="lg" />
        </Section>

        <Section title="Button — States">
          <Button label="Loading" onPress={() => {}} isLoading />
          <Button label="Disabled" onPress={() => {}} isDisabled />
        </Section>

        <Divider />

        {/* ── Input ── */}
        <Section title="Input">
          <Input
            label="Default"
            placeholder="Enter text..."
            value={inputValue}
            onChangeText={setInputValue}
          />
          <Input
            label="With error"
            placeholder="Enter email..."
            value={inputWithError}
            onChangeText={setInputWithError}
            errorMessage="Please enter a valid email address"
            keyboardType="email-address"
          />
          <Input
            label="With helper text"
            placeholder="Enter password..."
            secureTextEntry
            helperText="Must be at least 8 characters"
          />
          <Input
            label="Disabled"
            value="Cannot edit this"
            editable={false}
          />
        </Section>

        <Divider />

        {/* ── Loader ── */}
        <Section title="Loader">
          <View className="flex-row gap-8 items-center">
            <Loader size="small" />
            <Loader size="large" />
          </View>
          <Loader size="large" message="Loading your data..." />
        </Section>

        <Divider />

        {/* ── Divider ── */}
        <Section title="Divider">
          <Divider />
          <Divider label="or" />
          <Divider label="continue with" />
        </Section>

        <Divider />

        {/* ── Card ── */}
        <Section title="Card">
          <Card>
            <Text className="text-base font-semibold text-gray-900 dark:text-gray-50">
              Basic Card
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Cards provide an elevated surface for grouping related content.
            </Text>
          </Card>
          <Card className="border border-primary-200 dark:border-primary-900">
            <Text className="text-sm font-semibold text-primary-600">Featured Card</Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Cards accept a className prop for custom styling.
            </Text>
          </Card>
        </Section>

        <Divider />

        {/* ── EmptyState ── */}
        <Section title="EmptyState">
          <Card>
            <EmptyState
              title="No results found"
              subtitle="Try adjusting your search or filters."
              actionLabel="Reset Filters"
              onAction={() => {}}
            />
          </Card>
        </Section>

        <Divider />

        {/* ── ErrorState ── */}
        <Section title="ErrorState">
          <Card>
            <ErrorState
              title="Failed to load"
              message="Check your connection and try again."
              onRetry={() => {}}
            />
          </Card>
        </Section>

        <Divider />

        {/* ── Modal ── */}
        <Section title="Modal">
          <Button label="Open Modal" onPress={() => setModalVisible(true)} variant="outline" />
          <Modal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="Example Modal"
            primaryLabel="Confirm"
            onPrimary={() => setModalVisible(false)}
            secondaryLabel="Cancel"
          >
            <Text className="text-sm text-gray-600 dark:text-gray-300">
              This is the modal body. It can contain any content — forms, confirmations, alerts, etc.
            </Text>
          </Modal>
        </Section>
      </ScrollView>
    </ScreenContainer>
  );
}
