import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import MainLayout from "./MainLayout";
import { HeaderBar } from "../components";
import { SIZES, COLORS, FONTS, icons, dummyData } from "../constants";

const SectionTitle = ({ title }) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.padding,
      }}
    >
      <Text
        style={{
          color: COLORS.lightGray3,
          ...FONTS.h4,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const Setting = ({ title, value, type, onPress }) => {
  if (type == "button") {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
          justifyContent: "space-between",
        }}
        onPress={onPress}
      >
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h3,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.lightGray3,
              ...FONTS.h3,
              marginRight: SIZES.radius,
            }}
          >
            {value}
          </Text>
          <Image
            source={icons.rightArrow}
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            flex: 1,
            color: COLORS.white,
            ...FONTS.h3,
          }}
        >
          {title}
        </Text>
        <Switch
          trackColor={{ false: COLORS.lightGray3, true: COLORS.white }}
          thumbColor={value ? COLORS.lightGreen : COLORS.white}
          value={value}
          onValueChange={(value) => onPress(value)}
        />
      </View>
    );
  }
};

const Profile = () => {
  const [FaceID, setFaceID] = useState(true);
  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Heasder */}
        <HeaderBar title="Profile" />

        {/* details */}
        {/* Email & userID */}
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              justifyContent: "space-between",
            }}
          >
            {/* email & id  */}
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                  fontSize: 14,
                }}
              >
                {dummyData.profile.email}
              </Text>
              <Text
                style={{
                  color: COLORS.lightGray3,
                  ...FONTS.body4,
                  fontSize: 12,
                }}
              >
                {dummyData.profile.id}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.verified}
                style={{
                  height: 25,
                  width: 25,
                }}
              />
              <Text
                style={{
                  color: COLORS.lightGreen,
                  ...FONTS.body4,
                }}
              >
                {" "}
                Verified
              </Text>
            </View>
          </View>
          {/* app */}

          <SectionTitle title="App" />
          <Setting
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log("pressed")}
          />
          <Setting
            title="Appearance"
            value="Dark"
            type="button"
            onPress={() => console.log("pressed")}
          />

          {/* Account */}
          <SectionTitle title="Account" />
          <Setting
            title="Payment Currency"
            value="USD"
            type="button"
            onPress={() => console.log("pressed")}
          />
          <Setting
            title="Language"
            value="English"
            type="button"
            onPress={() => console.log("pressed")}
          />
          {/* security */}
          <SectionTitle title="Security" />
          <Setting
            title="FaceID"
            value={FaceID}
            type="switch"
            onPress={(value) => setFaceID(value)}
          />
          <Setting
            title="Password Settings"
            value=""
            type="button"
            onPress={() => console.log("pressed")}
          />
          <Setting
            title="Change Password "
            value=""
            type="button"
            onPress={() => console.log("pressed")}
          />
          <Setting
            title="2-Factor Authentication "
            value=""
            type="button"
            onPress={() => console.log("pressed")}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Profile;
