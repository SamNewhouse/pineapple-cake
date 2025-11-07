import React from "react";
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { HydratedItem } from "../../types";
import { LinearGradient } from "expo-linear-gradient";
import { colorLuminance } from "../../utils/colors";
import { ItemImage } from "./ItemImage";
import { colors } from "../../config/theme";

interface ItemModalProps {
  visible: boolean;
  onClose: () => void;
  hydratedItem: HydratedItem | null;
}

export const ItemModal: React.FC<ItemModalProps> = ({ visible, onClose, hydratedItem }) => {
  if (!hydratedItem) return null;

  const { item, collectable, rarity } = hydratedItem;
  const percent = item.chance * 100;
  const itemChanceModifier =
    percent === 0 ? "0.00" : percent < 1 ? percent.toFixed(8) : percent.toFixed(2);

  return (
    <Modal visible={visible} animationType="slide" transparent statusBarTranslucent>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={[colorLuminance(rarity.color, -0.6), colorLuminance(rarity.color, 0.3)]}
            locations={[0, 0.6]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradient}
          >
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              <Text style={styles.title}>{collectable.name}</Text>
              <ItemImage imageUrl={collectable.imageUrl} />
              <Text style={styles.chance}>{itemChanceModifier}% chance</Text>
              <Text style={[styles.rarity, { color: colorLuminance(rarity.color, 0.5) }]}>
                {rarity.name.toUpperCase()}
              </Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.background,
    alignSelf: "center",
  },
  gradient: {
    flex: 1,
  },
  title: {
    color: "#EBEBED",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 150,
    marginBottom: 12,
  },
  chance: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
  },
  rarity: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#111111",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
