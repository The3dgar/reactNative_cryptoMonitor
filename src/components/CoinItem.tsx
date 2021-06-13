import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { CryptoResp } from "../interfaces/cryptoInterface";

interface Props {
  coin: CryptoResp;
}

const CoinItem = ({ coin }: Props) => {
  const uri = coin.image;
  return (
    <View style={styles.cointainer}>
      <View style={styles.coinInfo}>
        <Image source={{ uri }} style={styles.image} />
        <Text style={styles.text}>{coin.name} </Text>
        <Text style={styles.symbol}>{coin.symbol.toUpperCase()}</Text>
      </View>
      <View>
        <Text style={styles.text}>{coin.current_price} USD</Text>
        <Text
          style={{
            ...styles.priceChange,
            color: coin.price_change_percentage_24h > 0 ? "#00ff99" : "red",
          }}
        >
          {coin.price_change_24h.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cointainer: {
    backgroundColor: "#121212",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coinInfo: {
    flexDirection: "row",
  },
  text: {
    paddingLeft: 10,
    color: "#fff",
    fontSize: 16,
  },
  image: {
    height: 30,
    width: 30,
  },
  symbol: {
    color: "#fff",
    opacity: 0.5,
    fontSize: 12,
  },
  priceChange: {
    textAlign: "right",
  },
});

export default CoinItem;
