import { Product } from "@constants/types";
import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { Link, useSegments } from "expo-router";

type ProductListItemProps = {
  product: Product;
};

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductListItem = (props: ProductListItemProps) => {
  const { product } = props;
  const segments = useSegments();

  return (
    <Link href={`${segments[0]}/orders/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{
            uri: product.image
              ? product.image
              : "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
    width: "50%",
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
