import { View, Text, Switch, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';

export default function App(props) {
  const [darkTheme, setDarkTheme] = useState(false);
  const [result, setResult] = useState("")
  const [choosen, setChoosen] = useState("")

  const colors = {
    dark: "#22252D",
    dark1: '#292B36',
    dark2: '#272B33',
    light: '#FFF',
    light1: '#F1F1F1',
    light2: '#F7F7F7',
  }

  const num = [
    { id: '1', value: 'C', type: 'top' },
    { id: '2', value: 'DL', type: 'top' },
    { id: '3', value: '/', type: 'top' },
    { id: '4', value: '%', type: 'top' },
    { id: '5', value: '7', type: 'number' },
    { id: '6', value: '8', type: 'number' },
    { id: '7', value: '9', type: 'number' },
    { id: '8', value: '*', type: 'right' },
    { id: '9', value: '4', type: 'number' },
    { id: '10', value: '5', type: 'number' },
    { id: '11', value: '6', type: 'number' },
    { id: '12', value: '-', type: 'right' },
    { id: '13', value: '1', type: 'number' },
    { id: '14', value: '2', type: 'number' },
    { id: '15', value: '3', type: 'number' },
    { id: '16', value: '+', type: 'right' },
    { id: '17', value: '00', type: 'number' },
    { id: '18', value: '0', type: 'number' },
    { id: '19', value: '.', type: 'number' },
    { id: '20', value: '=', type: 'right' },
  ];

  const getColors = (light, dark) => darkTheme ? dark : light;

  const textcolor = (type) => {
    if (type == 'top') {

      return '#35FBD6'
    }
    else if (type == 'right') {
      return '#EB6363'

    }
    else if (type == 'number') {
      return darkTheme ? colors.light : colors.dark
    }
  }
  const calculation = (val) => {
    if (val !== '=' && val !== 'C' && val !== 'DL') {
      setChoosen([...choosen, val]);
    }

    if (val === 'C') {
      setChoosen([]);
      setResult('');
    } else if (val === 'DL') {
      setChoosen(choosen.slice(0, choosen.length - 1));
    } else if (val === '=') {
      try {
        const exp = choosen.join('')
        const evalResult = eval(exp);

        if (typeof evalResult === 'number' && !isNaN(evalResult)) {
          const fix = parseFloat(evalResult.toFixed(4));
          setResult(fix.toString());
        } else {
          setResult('Error');
        }
      } catch (e) {
        setResult('Error');
      }
    }
  };


  return (
    <View style={{ width: '100%', height: '100%', paddingVertical: 30, backgroundColor: getColors(colors.light, colors.dark), alignItems: "center" }}>
      <StatusBar style={darkTheme ? 'light' : 'dark'} />
      <Switch value={darkTheme}
        onValueChange={() => setDarkTheme(!darkTheme)}
        thumbColor={getColors(colors.dark, colors.light)}
        trackColor={{ true: colors.light2, false: colors.dark2 }} />
      <View style={{marginTop:180,backgroundColor:getColors(colors.light1,colors.dark1),width:'100%',alignItems:'flex-end',paddingRight:20,borderRadius:25,marginBottom:1}}>
        <Text style={{ color: getColors(colors.dark, colors.light), fontSize: 30 ,marginVertical:10}}>{choosen}</Text>
        <Text style={{ color: getColors(colors.dark, colors.light), fontSize: 20 ,marginBottom:10}}>{result}</Text>

      </View>

      <View style={{ justifyContent: 'center', backgroundColor: getColors(colors.light1, colors.dark1), height: '100%', alignItems: 'center', borderRadius: 20, width: '100%' }}>
        <FlatList
          data={num}
          keyExtractor={(item => item.id)}
          renderItem={({ item }) => <TouchableOpacity onPress={() => calculation(item.value)}
            style={{ width: 70, height: 70, backgroundColor: getColors(colors.light2, colors.dark), margin: 10, elevation: 2, borderRadius: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 22, color: textcolor(item.type) }}>{item.value}</Text>
          </TouchableOpacity>}
          numColumns={4}
          key={4}

        />
      </View>
    </View>
  )
}