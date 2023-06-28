import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'
import { api } from '../../services/api'
import ModalPicker from '../../components/ModalPicker'
import ListItems from '../../components/ListItem'
import { StackParams } from '../../routes/app.routes'

type RouteDetailParams = {
    Order: {
        number: number | string,
        name?: string,
        order_id: string
    }
}

export type CategoryProps = {
    id: string,
    name: string,
}

type ProductsProps = {
    id: string,
    name: string,
}

type ItemProps = {
    id: string,
    product_id: string,
    name: string,
    amount: number | string,
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order() {
    const route = useRoute<OrderRouteProps>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>()

    const [amount, setAmount] = useState('1')
    const [items, setItems] = useState<ItemProps[] | []>([])

    const [category, setCategory] = useState<CategoryProps[] | []>([])
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

    const [products, setProducts] = useState<ProductsProps[] | []>([])
    const [productsSelected, setProductsSelected] = useState<ProductsProps | undefined>()
    const [modalProductVisible, setModalProductVisible] = useState(false)

    useEffect(() => {
        async function loadingInfo() {
            const response = await api.get('/category')

            setCategory(response.data)
            setCategorySelected(response.data[0])
        }

        loadingInfo()

    }, [])

    useEffect(() => {
        async function loadingProduct() {
            const response = await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id
                }
            })

            setProducts(response.data)
            setProductsSelected(response.data[0])

        }

        loadingProduct()

    }, [categorySelected])

    async function handleCloseOrder() {
        try {
            await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id
                }
            })

            navigation.goBack();

        } catch (err) {
            console.log('Erro: ', err)
        }
    }

    function handleChangeCategory(item: CategoryProps) {
        setCategorySelected(item)
    }

    function handleChangeProduct(item: ProductsProps) {
        setProductsSelected(item)
    }

    async function handleAdd() {
        const response = await api.post('/order/add',
            {
                order_id: route.params.order_id,
                product_id: productsSelected?.id,
                amount: Number(amount)
            })

        let data = {
            id: response.data.id,
            product_id: productsSelected?.id as string,
            name: productsSelected?.name as string,
            amount: amount
        }

        setItems(oldArray => [...oldArray, data])

    }

    async function handleDeleteItem(item_id: string) {
        await api.delete('/order/remove', {
            params:{
                item_id: item_id
            }
        })

        // atualizar a lista de itens
        let removeItem = items.filter( item => {
            return (item.id !== item_id)
        })

        setItems(removeItem)
    }

    function handleFinishOrder(){
        navigation.navigate('FinishOrder', {
            number: route.params?.number,                                    
            order_id: route.params?.order_id
        })
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.title}>Mesa {route.params.number}</Text>
                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name='trash-2' size={28} color='#ff3f4b' />
                    </TouchableOpacity>
                )}
            </View>

            {category.length !== 0 && (
                <TouchableOpacity style={style.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{ color: '#fff' }}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            {products.length !== 0 && (
                <TouchableOpacity style={style.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={{ color: '#fff' }}>
                        {productsSelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            <View style={style.qtdContainer}>
                <Text style={style.qtdText}>Quantidade</Text>
                <TextInput
                    style={[style.input, { width: '60%', textAlign: 'center' }]}
                    placeholderTextColor='#f0f0f0'
                    keyboardType='numeric'
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            <View style={style.actions}>
                <TouchableOpacity onPress={handleAdd} style={style.btnAdd}>
                    <Text style={style.btnText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[style.button, { opacity: items.length === 0 ? .3 : 1 }]}
                    disabled={items.length === 0}
                    onPress={handleFinishOrder}
                >
                    <Text style={style.btnText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList renderItem={({ item }) => <ListItems deleteItem={handleDeleteItem} data={item} />} keyExtractor={(item) => item.id} data={items} style={{ flex: 1, marginTop: 24 }} showsVerticalScrollIndicator={false} />

            <Modal transparent={true} visible={modalCategoryVisible} animationType='fade' >
                <ModalPicker
                    hadleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}
                />
            </Modal>

            <Modal transparent={true} visible={modalProductVisible} animationType='slide' >
                <ModalPicker
                    hadleCloseModal={() => setModalProductVisible(false)}
                    options={products}
                    selectedItem={handleChangeProduct}
                />
            </Modal>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24
    },
    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginRight: 14
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 50,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 10,
        color: '#fff',
        fontSize: 20,
    },
    qtdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qtdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    btnAdd: {
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        width: '20%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#efffa3',
        borderRadius: 4,
        height: 50,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})