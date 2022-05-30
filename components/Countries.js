import { View, Text, ScrollView, StyleSheet, Button, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Country from './Country';


export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => {
                setSearch(data);
                setCountries(data);
            })
    }, [])
    const handleSearh = text => {
        const filtered = countries.filter(country => country.name.common.includes(text));
        setSearch(filtered);
    }

    return (
        <View>
            <Text style={styles.textHeader}>Countries {countries.length} </Text>
            <TextInput
                style={styles.input}
                onChangeText={handleSearh}
                placeholder='Search'
            />
            <Button
                onPress={() => {
                    alert('You tapped the button!');
                }}
                title="Press Me"
            />
            <ScrollView style={styles.scrollView}>
                {
                    search.map((country, index) => <Country
                        key={index}
                        country={country}
                    ></Country>)
                }
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    textHeader: {
        marginTop: 20,
        color: 'seagreen',
        fontWeight: 'bold',
        fontSize: 50
    },
    scrollView: {
        marginLeft: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});