import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

interface MapLocation {
  id: number;
  nome: string;
  coordenadas: {
    latitude: number;
    longitude: number;
  };
  color?: string;
}

interface MapViewProps {
  locations: MapLocation[];
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

export const CustomMapView: React.FC<MapViewProps> = ({
  locations,
  initialRegion,
}) => {
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão de Localização',
          'Para uma melhor experiência, permita o acesso à sua localização.',
          [{ text: 'OK' }]
        );
        return;
      }

      setHasPermission(true);
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  }, []);

  const defaultRegion = {
    latitude: -24.7081,
    longitude: -47.5553,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  };

  const region = userLocation
    ? {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : initialRegion || defaultRegion;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        region={region}
        showsUserLocation={hasPermission}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        showsTraffic={false}
        showsBuildings={true}
        showsIndoors={true}
      >
        {locations.map(mapLocation => (
          <Marker
            key={mapLocation.id}
            coordinate={mapLocation.coordenadas}
            title={mapLocation.nome}
            description={mapLocation.nome}
            pinColor={mapLocation.color || '#007AFF'}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
