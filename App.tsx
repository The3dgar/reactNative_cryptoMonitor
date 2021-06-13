import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  TextInput,
} from "react-native";

import { CryptoResp } from "./src/interfaces/cryptoInterface";
import CoinItem from "./src/components/CoinItem";

export default function App() {
  const [coins, setCoins] = useState<CryptoResp[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");

  const getMarket = async () => {
    const resp = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );

    const body = await resp.json();
    setCoins(body);
  };

  useEffect(() => {
    getMarket();
  }, []);

  const handleChange = (text: string) => {
    setSearch(text);
  };

  const onRefresh = async () => {
    setRefresh(true);
    await getMarket();
    setRefresh(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#222" />
      <View style={styles.header}>
        <Text style={styles.title}>Crypto-nance</Text>
        <TextInput
          style={styles.search}
          onChangeText={handleChange}
          placeholder="Search..."
          placeholderTextColor="#858585"
        />
      </View>
      <FlatList
        style={styles.list}
        data={coins.filter(
          (c) =>
            c.name.toLowerCase().includes(search) ||
            c.symbol.toLowerCase().includes(search)
        )}
        renderItem={({ item }) => <CoinItem coin={item} />}
        showsVerticalScrollIndicator={false}
        refreshing={refresh}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    paddingTop: 10,
    fontSize: 20,
  },
  search: {
    color: "#fff",
    borderBottomColor: "#465",
    borderBottomWidth: 1,
    width: "30%",
    textAlign: "right",
  },
  list: {
    width: "90%",
  },
});
