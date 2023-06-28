import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { CategoryProps } from '../../pages/Order'

interface ModalPickerProps{
    options: CategoryProps[],
    hadleCloseModal: () => void,
    selectedItem: (item: CategoryProps) => void,
}

const { width: WIDTH, height: HEIGHT} = Dimensions.get('window')

export default function ModalPicker({...modalProps}: ModalPickerProps) {

    function onPressItem(item: CategoryProps){
        // console.log(item)
        modalProps.selectedItem(item)
        modalProps.hadleCloseModal()
    }

    const option = modalProps.options.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)}>
            <Text style={styles.item}>
                {item?.name}
            </Text>
        </TouchableOpacity>
    ))

  return (
    <TouchableOpacity style={styles.container} onPress={modalProps.hadleCloseModal}>
        <View style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {option}
            </ScrollView>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content:{
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#8a8a8a',
        borderRadius: 4
    },
    option:{
        alignItems: 'flex-start',
        borderTopWidth: .8,
        borderTopColor: '#8a8a8a'
    },
    item:{
        margin: 20,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#101026'
    }
})
