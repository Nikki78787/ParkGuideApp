import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, Divider, Button, Menu, useTheme } from 'react-native-paper';
import { useThemeContext } from './_layout';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  List,
  Switch,
  Button,
  Menu,
  Surface,
  Avatar,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import AppHeader from "../components/AppHeader";
import ThemedBackground from "../components/ThemedBackground";
import { useThemeContext } from "../contexts/ThemeContext";

export default function Settings() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const {
    isDarkMode,
    toggleTheme,
    uiMode,
    toggleUiMode,
    isSimpleMode,
    highContrast,
    toggleHighContrast,
  } = useThemeContext();

  const [langMenuVisible, setLangMenuVisible] = useState(false);
  const [fontMenuVisible, setFontMenuVisible] = useState(false);
  const [isTTS, setIsTTS] = useState(false);
  const [fontLabel, setFontLabel] = useState("Standard");

  const getLangLabel = () => {
    switch (i18n.language) {
      case "ms":
        return "Bahasa Melayu";
      case "zh":
        return "中文";
      default:
        return "English";
    }
  };

  const updateLanguage = async (lang) => {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem("appLanguage", lang);
    setLangMenuVisible(false);
  };

  const cardRadius = isSimpleMode || highContrast ? 16 : 26;
  const sectionRadius = isSimpleMode || highContrast ? 16 : 24;

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <ThemedBackground />

      <AppHeader
        title={t("setHeader")}
        subtitle="Preferences and display"
        showBack
        showHome
      />

      <View style={styles.container}>
        <Surface
          style={[
            styles.profileCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.outlineVariant,
              borderRadius: cardRadius,
            },
          ]}
          elevation={highContrast ? 0 : isSimpleMode ? 1 : 2}
        >
          <TouchableRipple onPress={() => router.push("/account")} borderRadius={cardRadius}>
            <View style={[styles.profileInner, { paddingVertical: isSimpleMode || highContrast ? 22 : 18 }]}>
              <Avatar.Icon
                icon="account"
                size={isSimpleMode || highContrast ? 60 : 54}
                style={{ backgroundColor: theme.colors.primaryContainer }}
                color={theme.colors.tertiary}
              />
              <View style={{ marginLeft: 14, flex: 1 }}>
                <Text variant={isSimpleMode || highContrast ? "titleLarge" : "titleMedium"} style={{ color: theme.colors.onSurface, fontWeight: "800" }}>
                  Guide Preferences
                </Text>
                <Text variant={isSimpleMode || highContrast ? "bodyMedium" : "bodySmall"} style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}>
                  Tap here to open account settings, email, password and profile
                </Text>
              </View>
            </View>
          </TouchableRipple>
        </Surface>

        <Surface
          style={[
            styles.sectionCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.outlineVariant,
              borderRadius: sectionRadius,
            },
          ]}
          elevation={highContrast ? 0 : 1}
        >
          <Text
            variant={isSimpleMode || highContrast ? "titleMedium" : "titleSmall"}
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.onSurfaceVariant,
                paddingTop: isSimpleMode || highContrast ? 18 : 14,
              },
            ]}
          >
            Appearance
          </Text>

          <List.Item
            title="Theme Mode"
            description={isDarkMode ? "Dark mode" : "Light mode"}
            left={(props) => (
              <List.Icon
                {...props}
                icon={isDarkMode ? "moon-waning-crescent" : "weather-sunny"}
                color={theme.colors.tertiary}
              />
            )}
            titleStyle={{ color: theme.colors.onSurface, fontWeight: "700", fontSize: isSimpleMode || highContrast ? 19 : 16 }}
            descriptionStyle={{ color: theme.colors.onSurfaceVariant, fontSize: isSimpleMode || highContrast ? 15 : 13 }}
            right={() => <Switch value={isDarkMode} onValueChange={toggleTheme} />}
            style={{ minHeight: isSimpleMode || highContrast ? 72 : undefined }}
          />

          <List.Item
            title="Interface Mode"
            description={uiMode === "simple" ? "Basic" : "Pro"}
            left={(props) => (
              <List.Icon
                {...props}
                icon={uiMode === "simple" ? "view-agenda-outline" : "palette-outline"}
                color={theme.colors.tertiary}
              />
            )}
            titleStyle={{ color: theme.colors.onSurface, fontWeight: "700", fontSize: isSimpleMode || highContrast ? 19 : 16 }}
            descriptionStyle={{ color: theme.colors.onSurfaceVariant, fontSize: isSimpleMode || highContrast ? 15 : 13 }}
            right={() => <Switch value={uiMode === "pretty"} onValueChange={toggleUiMode} />}
            style={{ minHeight: isSimpleMode || highContrast ? 72 : undefined }}
          />

          <List.Item
            title="High Contrast"
            description={highContrast ? "High contrast on" : "High contrast off"}
            left={(props) => (
              <List.Icon
                {...props}
                icon="circle-half-full"
                color={theme.colors.tertiary}
              />
            )}
            titleStyle={{ color: theme.colors.onSurface, fontWeight: "700", fontSize: isSimpleMode || highContrast ? 19 : 16 }}
            descriptionStyle={{ color: theme.colors.onSurfaceVariant, fontSize: isSimpleMode || highContrast ? 15 : 13 }}
            right={() => <Switch value={highContrast} onValueChange={toggleHighContrast} />}
            style={{ minHeight: isSimpleMode || highContrast ? 72 : undefined }}
          />

          <Menu
            visible={langMenuVisible}
            onDismiss={() => setLangMenuVisible(false)}
            anchor={
              <List.Item
                title={t("langSwitch")}
                description={getLangLabel()}
                left={(props) => (
                  <List.Icon {...props} icon="translate" color={theme.colors.tertiary} />
                )}
                titleStyle={{ color: theme.colors.onSurface, fontWeight: "700", fontSize: isSimpleMode || highContrast ? 19 : 16 }}
                descriptionStyle={{ color: theme.colors.onSurfaceVariant, fontSize: isSimpleMode || highContrast ? 15 : 13 }}
                onPress={() => setLangMenuVisible(true)}
                style={{ minHeight: isSimpleMode || highContrast ? 72 : undefined }}
              />
            }
          >
            <Menu.Item onPress={() => updateLanguage("en")} title="English" />
            <Menu.Item onPress={() => updateLanguage("ms")} title="Bahasa Melayu" />
            <Menu.Item onPress={() => updateLanguage("zh")} title="中文" />
          </Menu>

          <Menu
            visible={fontMenuVisible}
            onDismiss={() => setFontMenuVisible(false)}
            anchor={
              <List.Item
                title={t("fontSet")}
                description={fontLabel}
                left={(props) => (
                  <List.Icon {...props} icon="format-size" color={theme.colors.tertiary} />
                )}
                titleStyle={{ color: theme.colors.onSurface, fontWeight: "700", fontSize: isSimpleMode || highContrast ? 19 : 16 }}
                descriptionStyle={{ color: theme.colors.onSurfaceVariant, fontSize: isSimpleMode || highContrast ? 15 : 13 }}
                onPress={() => setFontMenuVisible(true)}
                style={{ minHeight: isSimpleMode || highContrast ? 72 : undefined }}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                setFontLabel("Small");
                setFontMenuVisible(false);
              }}
              title="Small"
            />
            <Menu.Item
              onPress={() => {
                setFontLabel("Standard");
                setFontMenuVisible(false);
              }}
              title="Standard"
            />
            <Menu.Item
              onPress={() => {
                setFontLabel("Large");
                setFontMenuVisible(false);
              }}
              title="Large"
            />
          </Menu>
        </Surface>

        <Surface
          style={[
            styles.sectionCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.outlineVariant,
              borderRadius: sectionRadius,
            },
          ]}
          elevation={highContrast ? 0 : 1}
        >
          <Text
            variant={isSimpleMode || highContrast ? "titleMedium" : "titleSmall"}
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.onSurfaceVariant,
                paddingTop: isSimpleMode || highContrast ? 18 : 14,
              },
            ]}
          >
            Accessibility
          </Text>

          <List.Item
            title="Text-to-Speech (TTS)"
            description="Read training modules aloud"
            left={(props) => (
              <List.Icon {...props} icon="volume-high" color={theme.colors.tertiary} />
            )}
            right={() => <Switch value={isTTS} onValueChange={() => setIsTTS(!isTTS)} />}
            titleStyle={{ color: theme.colors.onSurface, fontWeight: "700", fontSize: isSimpleMode || highContrast ? 19 : 16 }}
            descriptionStyle={{ color: theme.colors.onSurfaceVariant, fontSize: isSimpleMode || highContrast ? 15 : 13 }}
            style={{ minHeight: isSimpleMode || highContrast ? 72 : undefined }}
          />
        </Surface>

        <Button
          mode="outlined"
          textColor={theme.colors.error}
          style={[
            styles.logout,
            {
              borderColor: theme.colors.error,
              borderRadius: isSimpleMode || highContrast ? 14 : 16,
            },
          ]}
          contentStyle={{ height: isSimpleMode || highContrast ? 56 : 48 }}
        >
          Secure Logout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { flex: 1, padding: 20 },
  profileCard: {
    borderWidth: 1,
    marginBottom: 18,
    overflow: "hidden",
  },
  profileInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  sectionCard: {
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 16,
    paddingTop: 4,
  },
  sectionTitle: {
    paddingHorizontal: 18,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  logout: {
    marginTop: 8,
  },
});
import { clearAuthTokens } from '../utils/tokenStorage';

export default function Settings() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme, fontScale, setFontScale } = useThemeContext();
  const router = useRouter();

  const [langMenuVisible, setLangMenuVisible] = useState(false);
  const [fontMenuVisible, setFontMenuVisible] = useState(false);
  const [isTTS, setIsTTS] = useState(false);

  // Helper for Language Label
  const getLangLabel = () => {
    switch (i18n.language) {
      case 'ms': return 'Bahasa Melayu';
      case 'zh': return '中文';
      default: return 'English';
    }
  };

  // Helper for Font Label
  const getFontLabel = (scale) => {
    if (scale < 1) return 'Small';
    if (scale > 1) return 'Large';
    return 'Standard';
  };

  const updateLanguage = async (lang) => {
    i18n.changeLanguage(lang);
    await AsyncStorage.setItem('appLanguage', lang);
    setLangMenuVisible(false);
  };

  const updateFontScale = async (scale) => {
    setFontScale(scale);
    await AsyncStorage.setItem('appFontScale', scale.toString());
    setFontMenuVisible(false);
  };

  const handleLogout = async () => {
    await clearAuthTokens();
    await AsyncStorage.removeItem('completedModules');
    router.replace('/');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <List.Section>
       <List.Subheader style={[styles.Subheader, { color: theme.colors.onSurfaceVariant }]}>{t("setHeader")}</List.Subheader>
        
        {/* Dark Mode Toggle */}
        <List.Item
          title={t("darkMode")}
          description={t("darkModeDesc")}
          left={props => <List.Icon {...props} icon="weather-night" />}
          right={() => <Switch value={isDarkMode} onValueChange={toggleTheme} />}
        />

        {/* Language Selection */}
        <Menu
          visible={langMenuVisible}
          onDismiss={() => setLangMenuVisible(false)}
          anchor={
            <List.Item
              title={t("langSwitch")}
              description={getLangLabel()}
              left={props => <List.Icon {...props} icon="translate" />}
              onPress={() => setLangMenuVisible(true)}
            />
          }>
          <Menu.Item onPress={() => updateLanguage('en')} title="English" />
          <Menu.Item onPress={() => updateLanguage('ms')} title="Bahasa Melayu" />
          <Menu.Item onPress={() => updateLanguage('zh')} title="中文" />
        </Menu>
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader style={{ color: theme.colors.onSurfaceVariant }}>{t("accessSet")}</List.Subheader>
        
        {/* TTS Toggle */}
        <List.Item
          title={t("ttsSwitch")}
          description={t("ttsSwitchDesc")}
          right={() => <Switch value={isTTS} onValueChange={() => setIsTTS(!isTTS)} />}
        />

        {/* Font Size Selection */}
        <Menu
          visible={fontMenuVisible}
          onDismiss={() => setFontMenuVisible(false)}
          anchor={
            <List.Item
              title={t("fontSet")}
              description={getFontLabel(fontScale)}
              left={props => <List.Icon {...props} icon="format-size" />}
              onPress={() => setFontMenuVisible(true)}
            />
          }>
          <Menu.Item onPress={() => updateFontScale(0.85)} title="Small" />
          <Menu.Item onPress={() => updateFontScale(1.0)} title="Standard" />
          <Menu.Item onPress={() => updateFontScale(1.25)} title="Large" />
        </Menu>
      </List.Section>

      <Divider />

      <Button
        mode="outlined"
        textColor={theme.colors.error}
        style={[styles.logout, { borderColor: theme.colors.error }]}
        onPress={handleLogout}
      >
        {t("logoutButton")}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  Subheader: { marginTop: 20},
  logout: { margin: 20 }
});
