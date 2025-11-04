import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("window");

export default function AddNewAddress() {
    const router = useRouter();
    const [region, setRegion] = useState<{
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const servicesEnabled = await Location.hasServicesEnabledAsync();
                if (!servicesEnabled) {
                    Alert.alert(
                        "Location Services Disabled",
                        "Please enable location services to use this feature."
                    );
                    setRegion({
                        latitude: 23.8103, // Dhaka fallback
                        longitude: 90.4125,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05 * (width / height),
                    });
                    setLoading(false);
                    return;
                }

                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert(
                        "Permission Denied",
                        "We need location permission to show your current address."
                    );
                    setRegion({
                        latitude: 23.8103,
                        longitude: 90.4125,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05 * (width / height),
                    });
                    setLoading(false);
                    return;
                }

                const loc = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                    mayShowUserSettingsDialog: true,
                });

                if (loc?.coords?.latitude && loc?.coords?.longitude) {
                    setRegion({
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05 * (width / height),
                    });
                } else {
                    setRegion({
                        latitude: 23.8103,
                        longitude: 90.4125,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05 * (width / height),
                    });
                }
            } catch (error) {
                console.error("Location error:", error);
                setRegion({
                    latitude: 23.8103,
                    longitude: 90.4125,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05 * (width / height),
                });
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, []);

    const handleConfirm = async () => {
        if (!region) {
            Alert.alert("Error", "Location not available yet.");
            return;
        }

        try {
            const [place] = await Location.reverseGeocodeAsync({
                latitude: region.latitude,
                longitude: region.longitude,
            });

            const address =
                [place?.name, place?.street, place?.city, place?.region]
                    .filter(Boolean)
                    .join(", ") ||
                `${region.latitude.toFixed(6)}, ${region.longitude.toFixed(6)}`;

            router.push({
                pathname: "/order/pickupAddress",
                params: {
                    latitude: region.latitude.toString(),
                    longitude: region.longitude.toString(),
                    currentAddress: address,
                },
            });
        } catch (error) {
            console.error("Reverse geocode error:", error);
            Alert.alert("Error", "Unable to retrieve address for this location.");
        }
    };

    // Leaflet + OpenStreetMap HTML
    const mapHTML = region
        ? `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
          <style>
            html, body, #map { height: 100%; margin: 0; padding: 0; }
            .marker { background: #017FC6; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #fff; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            const map = L.map('map').setView([${region.latitude}, ${region.longitude}], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              crossOrigin: true,
              detectRetina: true,
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            L.marker([${region.latitude}, ${region.longitude}], {
              icon: L.divIcon({ className: 'marker' })
            }).addTo(map);
          </script>
        </body>
      </html>
    `
        : "";

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" color="#017FC6" />
                <Text className="mt-2 text-gray-700">Fetching your location...</Text>
            </View>
        );
    }

    if (!region) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-gray-700">Couldn’t get your location.</Text>
                <TouchableOpacity
                    onPress={() => router.replace("/order/pickupAddress")}
                    className="mt-4 bg-[#017FC6] px-5 py-2 rounded-lg"
                >
                  <Text className="text-white font-semibold">Retry</Text>
              </TouchableOpacity>
          </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <WebView
                originWhitelist={["*"]}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowFileAccess={true}
                allowUniversalAccessFromFileURLs={true}
                source={{ html: mapHTML }}
                style={{ flex: 1 }}
            />

          {/* Bottom Buttons */}
          <View className="flex-row items-center justify-between px-5 pb-5 bg-white my-10">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="flex-1 mr-2 bg-gray-100 h-12 rounded-xl items-center justify-center"
                >
                  <Text className="text-gray-700 font-semibold text-base">Cancel</Text>
              </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleConfirm}
                    className="flex-1 ml-2 bg-[#017FC6] h-12 rounded-xl items-center justify-center"
                >
                  <Text className="text-white font-semibold text-base">Confirm</Text>
              </TouchableOpacity>
          </View>
    </View>
  );
}
