import { Image, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import products from "@/assets/data/products";
import Colors from "@/src/constants/Colors";
import ProductListItem from "@/src/components/ProductListItem";

export default function TabOneScreen() {
  const product = products[0];
  return (
    <ScrollView style={styles.container}>
      {products.map((item) => (
        <ProductListItem product={item} key={item.id} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginTop: "auto",
  },
});
