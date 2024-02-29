import { FlatList, StyleSheet } from "react-native";

import products from "@assets/data/products";
import ProductListItem from "@components/ProductListItem";
import { Stack } from "expo-router";

export default function TabOneScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "User Menu" }} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </>
  );
}
