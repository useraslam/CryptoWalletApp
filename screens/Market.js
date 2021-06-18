import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
} from "react-native";
import MainLayout from "./MainLayout";
import { connect } from "react-redux";
import { getCoinMarket } from "../stores/market/MarketAction";
import { COLORS, FONTS, icons, constants, SIZES } from "../constants";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { HeaderBar, TextButtons } from "../components";
import { LineChart } from "react-native-chart-kit";

const Market = ({ coins, getCoinMarket }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const marketTabScrollViewRef = useRef();

  const onMarketTabPress = useCallback((marketTabIndex) => {
    marketTabScrollViewRef?.current?.scrollToOffset({
      offset: marketTabIndex * SIZES.width,
    });
  }, []);

  useEffect(() => {
    getCoinMarket();
  }, []);

  const marketTabs = constants.marketTabs.map((marketTab) => ({
    ...marketTab,
    ref: React.createRef(),
  }));

  const TabIndicator = ({ measureLayout, scrollX }) => {
    const inputRange = marketTabs.map((_, i) => i * SIZES.width);
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: measureLayout.map((measure) => measure.x),
    });

    return (
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          height: "100%",
          width: (SIZES.width - SIZES.radius * 2) / 2,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray,
          transform: [
            {
              translateX,
            },
          ],
        }}
      />
    );
  };

  const Tabs = ({ scrollX, onMarketTabPress }) => {
    const [measureLayout, setMeasureLayout] = useState([]);
    const containerRef = useRef();

    useEffect(() => {
      let ml = [];

      marketTabs.forEach((marketTab) => {
        marketTab?.ref?.current?.measureLayout(
          containerRef.current,
          (x, y, width, height) => {
            ml.push({
              x,
              y,
              width,
              height,
            });
            if (ml.length === marketTabs.length) {
              setMeasureLayout(ml);
            }
          }
        );
      });
    }, [containerRef.current]);

    return (
      <View
        ref={containerRef}
        style={{
          flexDirection: "row",
          backgroundColor: COLORS.gray,
          borderRadius: SIZES.radius,
        }}
      >
        {/* tab indicator */}
        {measureLayout.length > 0 && (
          <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
        )}

        {marketTabs.map((item, index) => {
          return (
            <TouchableOpacity
              key={`MarketTab-${index}`}
              style={{
                flex: 1,
              }}
              onPress={() => onMarketTabPress(index)}
            >
              <View
                ref={item.ref}
                style={{
                  paddingHorizontal: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 40,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.h3,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderTabBar = () => {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gery,
        }}
      >
        <Tabs scrollX={scrollX} onMarketTabPress={onMarketTabPress} />
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.padding,
        }}
      >
        <TextButtons label="USD" />
        <TextButtons
          label="% ( 7d )"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
        <TextButtons
          label="Top"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
      </View>
    );
  };

  const renderList = () => {
    return (
      <Animated.FlatList
        ref={marketTabScrollViewRef}
        data={marketTabs}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        padingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: scrollX } },
            },
          ],
          {
            useNativeDriver: false,
          }
        )}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
              }}
            >
              <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  let priceColor =
                    item.price_change_percentage_7d_in_currency == 0
                      ? COLORS.lightGray3
                      : item.price_change_percentage_7d_in_currency > 0
                      ? COLORS.lightGreen
                      : COLORS.red;

                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: SIZES.padding,
                        marginBottom: SIZES.radius,
                      }}
                    >
                      {/* coin */}

                      <View
                        style={{
                          flex: 1.5,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            height: 20,
                            width: 20,
                          }}
                        />
                        <Text
                          style={{
                            color: COLORS.white,
                            ...FONTS.h3,
                            marginLeft: SIZES.radius,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>

                      {/* line chart */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                        }}
                      >
                        <LineChart
                          withVerticalLabels={false}
                          withHorizontalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          data={{
                            datasets: [{ data: item.sparkline_in_7d.price }],
                          }}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                          }}
                          bezier
                          style={{
                            paddingRight: 0,
                            marginLeft: 15,
                          }}
                        />
                      </View>
                      {/* figures */}

                      <View
                        style={{
                          flex: 1,
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.white,
                            ...FONTS.h4,
                          }}
                        >
                          ${item.current_price}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          {item.price_change_percentage_7d_in_currency != 0 && (
                            <Image
                              source={icons.upArrow}
                              style={{
                                height: 10,
                                width: 10,
                                tintColor: priceColor,
                                transform:
                                  item.price_change_percentage_7d_in_currency >
                                  0
                                    ? [{ rotate: "45deg" }]
                                    : [{ rotate: "125deg" }],
                              }}
                            />
                          )}
                          <Text
                            style={{
                              marginLeft: 5,
                              color: priceColor,
                              ...FONTS.body5,
                            }}
                          >
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )}
                            %
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    );
  };

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* header */}
        <HeaderBar title="Market" />
        {/* tab bar */}
        {renderTabBar()}

        {/* buttons */}
        {renderButtons()}

        {/* market list */}
        {renderList()}
      </View>
    </MainLayout>
  );
};

// export default Market;
function mapStateToProps(state) {
  return {
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);
