import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, Image, ImageStyle, StyleSheet } from "react-native";

export interface ItemImageProps {
  imageUrl?: string | null;
  style?: ImageStyle;
}

export const ItemImage: React.FC<ItemImageProps> = ({ imageUrl, style }) => {
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoading(!!imageUrl);
    setLoadFailed(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (imageUrl) {
      timeoutRef.current = setTimeout(() => {
        setLoading(false);
        timeoutRef.current = null;
      }, 1200);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [imageUrl]);

  const handleLoadEnd = () => {
    setLoading(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleError = () => {
    setLoadFailed(true);
    setLoading(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  if (loadFailed || !imageUrl) return null;
  if (loading) return <ActivityIndicator size="small" color="#EBEBED" />;

  return (
    <Image
      source={{ uri: imageUrl }}
      style={[styles.itemImage, style]}
      resizeMode="contain"
      onLoadEnd={handleLoadEnd}
      onError={handleError}
    />
  );
};

const styles = StyleSheet.create({
  itemImage: { width: 64, height: 64 },
});
