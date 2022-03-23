
# React-native-persian-date-picker
Jalali (Persian) date picker component for react native




this package uses [reanimated-bottom-sheet](https://github.com/osdnk/react-native-reanimated-bottom-sheet) and [@react-native-picker/picker](https://github.com/react-native-picker/picker).


<img src="https://user-images.githubusercontent.com/1645233/113412888-a5d9ea00-93ce-11eb-8649-35b567752b39.png" width="350">
  |


## Installation

1) Open a Terminal in the project root and run:

```sh
npm i react-native-persian-date-picker2
```

Now we need to install [`native bottom sheet behavior`](https://github.com/osdnk/react-native-reanimated-bottom-sheet) and [`@react-native-picker/picker`](https://github.com/react-native-picker/picker).

2) So run the following:

```sh
npm install reanimated-bottom-sheet react-native-reanimated react-native-gesture-handler @react-native-picker/picker
```

3) the `reanimated-bottom-sheet` uses `react-native-reanimated` and `react-native-gesture-handler` so for more deatils about the installation of these two package visit [`react-native-reanimated install`](https://docs.swmansion.com/react-native-reanimated/docs/installation/) and visit [`install react-native-gesture-handler`](https://docs.swmansion.com/react-native-gesture-handler/docs/#installation)(you probably have installed this package already, it's a famous package)

## Usage
```javascript
import PersianDatePicker from 'react-native-persian-date-picker2';
...
...

<PersianDatePicker
        visible={datePickerVisibility ? true : false }
        onConfirm={(value)=>{console.log(value)}}
        defaultValue={[1370,7,5]}
        startYear={1330}
        endYear={1400}
        containerStyle={{}}
        pickercontainerStyle={{}}
        pickerWrapperStyle={{}}
        pickerItemStyle={{}}
        submitTextStyle={{}}
      />
 
```

## example
```javascript
import React, { useEffect, useState } from 'react';
import { View,Image,
   StyleSheet,TouchableOpacity} from 'react-native';
import PersianDatePicker from 'react-native-persian-date-picker2';

export default function App() {
  
  const [datePickerVisibility, setDatePickerVisibility] = React.useState(false);
  const [birthDate, setBirthDate] = React.useState({
    string : "",
    year:null,
    month:null,
    day:null
  });
  
  const onBirthDatePickerConfirm = (objVal)=>{
          let dataString = objVal.value[0] + '/' + objVal.value[1] + '/' + objVal.value[2];
          setBirthDate({
            string : dataString,
            year: objVal.value[0],
            month: objVal.value[1],
            day: objVal.value[2]
          })
          setDatePickerVisibility(false);
          return true;
        }

  return (
    <>
    
    <TouchableOpacity onPress={()=>{setDatePickerVisibility(true);}} >
        {(birthDate.year) ? <View style={[styles.PersianDatePicker]}>
          <Text style={styles.PersianDatePickerText}>
            {(birthDate.year+"").toFarsiDigits()}
          </Text>
          <Text style={styles.PersianDatePickerText}>
            {(birthDate.month+"").toFarsiDigits()}
          </Text>
          <Text style={styles.PersianDatePickerText}>
            {(birthDate.day+"").toFarsiDigits()}
          </Text>
        </View>
          :
          <View style={[styles.PersianDatePicker]}><Text style={styles.PersianDatePickerText} >تاریخ تولد</Text></View>
        }
      </TouchableOpacity>
    
    <PersianDatePicker
        visible={datePickerVisibility}
        onConfirm={onBirthDatePickerConfirm}
        startYear={1330}
        endYear={1400}
        containerStyle={{}}
        pickercontainerStyle={{}}
        pickerWrapperStyle={{}}
        pickerItemStyle={{}}
        submitTextStyle={{}}
        defaultValue={[1370,7,5]}
      />
      
    </>
  );
}

const toFarsiDigits = function (str) {
  return str.replace(/[0-9]/g, function (w) {
      var persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return persian[w];
});

const styles = StyleSheet.create({
  PersianDatePicker:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:7,
    paddingRight:1,
    paddingLeft:1,
    borderWidth:1,
    borderColor:'rgba(255,255,255,0.8)',
    borderRadius:6,
    marginBottom:30,
    backgroundColor:'transparent',
    marginTop:37,
  },
  PersianDatePickerText:{
    flex:1,
    padding:0,
    fontSize:14,
    textAlign:'center',
    color:'rgba(255,255,255,1)',
  }
});
    
```

## Props

| name                      | required | default | description |
| ------------------------- | -------- | ------- | ------------|
| visible                   | yes      | `true`  |  visibility of bottom sheet|
| onConfirm                 | yes      |(val)=>{}|  the function that call after confirm , the `val` is object that contain : ``{value : [year,month,day]}`` , **> if the function return `false` the bottom sheet will not close |
| defaultValue              | no       | null     |  should be array like `[1370,7,5]` |
| startYear                 | no       | `1330`   |  |
| endYear                   | no       | `1400`   |  |
| containerStyle            | no       | null     | style object of sheet container |
| pickercontainerStyle      | no       | null     | style object of each three picker container : container > wrapper > picker |
| pickerWrapperStyle        | no       | null     | style object of each three picker wrapper |
| pickerItemStyle           | no       | null     | style object of each three picker item |
| pickerProps               | no       | null     | see [`picker docs`](https://github.com/react-native-picker/picker#props)  |
| submitLabel               | no       | `تایید`  | bottom confirm label |
| submitStyle               | no       | null     | style object of submit btn |
| submitTextStyle           | no       | null     | style object of submit text btn |
| borderRadius              | no       | 20       | border Radius of sheet |
| bottomSheetProps          | no       | null     | see [`sheet docs`](https://github.com/osdnk/react-native-reanimated-bottom-sheet)  |
| caption                   | no       | null     | simple header caption component ex : `<View><Text>this is caption</Text></View>` |



## Todo

It's not finished and some work has to be done yet.

1. Time picker
2. Default jalali date value with `moment`
3. More config
4. Cleanup code (e.g. measuring of components)

## Contributing
Please share your comment and tests with me by [`@hamid`](http://github.com/hamid) and [`twitter`](https://twitter.com/hamid_salimian). 😉😌
