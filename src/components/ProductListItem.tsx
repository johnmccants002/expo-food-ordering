import { Product } from "@/Food Ordering Asset bundle/types";
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = (props: ProductListItemProps) => {
  const { product } = props;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image ? product.image : "" }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
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

export default ProductListItem;
