import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';
import BottomSheet from 'reanimated-bottom-sheet';
// import moment from 'moment';
// moment.locale("fa");

export default function PersianDatePicker({
    visible=true,
    startYear =0,
    endYear=0,
    containerStyle={},
    pickercontainerStyle={},
    pickerWrapperStyle={},
    pickerItemStyle={},
    pickerProps={},
    defaultValue=null,
    submitLabel="تایید",
    submitStyle={},
    submitTextStyle={},
    onConfirm=(val)=>{},
    borderRadius=20,
    bottomSheetProps={},
    caption=null,
    captionStyle={}
}) {

    var defaultDay, defaultMonth, defaultYear = null;
    if (defaultValue && defaultValue.length) {
        defaultYear = defaultValue[0]
        defaultMonth = defaultValue[1]
        defaultDay = defaultValue[2]
    }
    const [day, setDay]         = React.useState(defaultDay);
    const [month, setMonth]     = React.useState(defaultMonth);
    const [year, setYear]       = React.useState(defaultYear);

    const sheetRef = React.useRef(null);


    var dayList = Array(31).fill(0).map((e, i) => i + 1);
    if (month > 6)
        var dayList = Array(30).fill(0).map((e, i) => i + 1);
    if (month == 12)
        var dayList = Array(29).fill(0).map((e, i) => i + 1);

    var yearList = [];
    var startYear = (startYear) ? startYear : 1330;
    var endYear = (endYear) ? endYear : 1400;
    for (let a = startYear; a <= endYear; a++)
        yearList.push(a);




    React.useEffect(() => {
        if (visible == true)
            sheetRef.current.snapTo(1);
    }, [visible])


    const onSubmitDate = ()=>{
        let value = {value : [year,month,day]}
        let result = onConfirm(value);
        if(result === false)
        {

        }else
            sheetRef.current.snapTo(0)

    }

    const renderContent = () => (
        <View style={[styles.container,containerStyle]} >
            {caption ? <View><Text style={[styles.captionStyle,captionStyle]}>{caption}</Text></View> : null}
            <View style={[styles.row, pickercontainerStyle]}>
            
                <View style={[styles.col,pickerWrapperStyle]}>
                    <Picker
                        selectedValue={year}
                        itemStyle={[styles.itemStyle, pickerItemStyle]}
                        onValueChange={(itemValue, itemIndex) => setYear(itemValue)  }
                        {...pickerProps}
                    >
                        {yearList.map((item,i)=>{
                            return (<Picker.Item key={i} value={item} label={toFarsiDigits(item.toString())} />)
                        })}
                    </Picker>
                </View>
                <View style={[styles.col, pickerWrapperStyle]}>
                    <Picker
                        selectedValue={month}
                        itemStyle={[styles.itemStyle,pickerItemStyle]}
                        onValueChange={(itemValue, itemIndex) => setMonth(itemValue)  }
                        {...pickerProps}
                    >
                        {monthList.map((item,i)=>{
                            return (<Picker.Item key={i} value={i+1} label={item} />)
                        })}
                    </Picker>
                </View>
                <View style={[styles.col, pickerWrapperStyle]}>
                    <Picker
                        selectedValue={day}
                        itemStyle={[styles.itemStyle, pickerItemStyle]}
                        onValueChange={(itemValue, itemIndex) => setDay(itemValue)  }
                        {...pickerProps}
                    >
                        {dayList.map((item,i)=>{
                            return (<Picker.Item key={i} value={item} label={toFarsiDigits(item.toString())} />)
                        })}
                    </Picker>
            </View>
        
            </View>
            <TouchableOpacity style={[styles.submit, submitStyle]} onPress={onSubmitDate}>
                <Text style={[styles.submitText, submitTextStyle]}>{submitLabel}</Text>
            </TouchableOpacity>
        </View>
    );

    


    return (
            <BottomSheet
                ref={sheetRef}
                snapPoints={[0,350]}
                initialSnap={0}
                
                borderRadius={borderRadius}
                {...bottomSheetProps}
                renderContent={renderContent}
            />
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        height:350,
        padding:0,
        marginTop: 0,
    },
    captionStyle:{
        textAlign:'center',
        padding:20,
        color:"#666"
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding:0,
        margin:0,
        
    },
    col:{
        flex:1
    },
    itemStyle:{
        fontSize:17
    },
    submit: {
        backgroundColor: '#c41d40',
        padding: 15,
        margin: 10,
        marginBottom:20,
        borderRadius: 90,
    },
    submitText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 15,
    },
});



export const monthList = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
]


const toEnglishDigits = function (str) {
    return str.replace(/[۰-۹]/g, function (w) {
        var persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return persian.indexOf(w);
    });
}
const toFarsiDigits = function (str) {
    return str.replace(/[0-9]/g, function (w) {
        var persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return persian[w];
    });
}