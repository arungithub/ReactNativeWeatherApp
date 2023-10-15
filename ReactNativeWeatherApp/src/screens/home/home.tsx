import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appLoaded } from '../../core/redux/actions/appActions';
import { HomeStyle } from './styles';
import Cards from '../../components/carouselTile/carouselTile';

interface City {
    name: string;
    image: number;
}

const Home = () => {
  const dispatch = useDispatch();

  const cities: City[] = [
    {
      name: 'Norwich',
      image: require('../../assets/images/tile.png'),
    },
    {
      name: 'London',
      image: require('../../assets/images/tile.png'),
    },
    {
      name: 'New York',
      image: require('../../assets/images/tile.png'),
    },
    {
      name: 'San Francisco',
      image: require('../../assets/images/tile.png'),
    },
    {
      name: 'New Jersey',
      image: require('../../assets/images/tile.png'),
    },
  ];
  
  useEffect(() => {
    dispatch(appLoaded());
  });

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor:"red",  paddingVertical: 20, paddingHorizontal: 20}}>
        <View style={{ flex: 1, paddingBottom: 20, paddingTop: 5 }}>
            <View>
              <Text style={{ fontSize: 16, color: 'lightgray', paddingHorizontal: 20, paddingVertical: 30 }}>Current location weather details tile here.</Text>
            </View>
        </View>

        <View style={{flex: 3}}>
          <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
            Search city by name
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 50,
              borderWidth: 1,
              borderColor: 'white',
              marginTop: 16,
              paddingHorizontal: 10,
            }}>
            <TextInput
              placeholder="Search City"
              placeholderTextColor={'lightgray'}
              style={{ paddingHorizontal: 10, color: 'white', fontSize: 22 }}
            />
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/search.png')}
                style={HomeStyle.searchIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Image
            style={{width: 300, height: 200}}
            source={require('../../assets/images/tile.png')}/>
          </View>
        </View>

        <View style={{flex: 2}}>
          <Text style={{ color: 'white', fontSize: 25, paddingHorizontal: 10, fontWeight: 'bold' }}>
            Favourites
          </Text>

          <FlatList
              horizontal
                data={cities}
                renderItem={({item}: {item: any}) => (
                  <Cards name={item.name} image={item.image} navigation={{}} />
                )}
              />
        </View>

      </View>
    </View>
  );
};

export default Home;