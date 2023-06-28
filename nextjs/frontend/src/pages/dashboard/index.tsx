import { useEffect, useState } from 'react'
import canSSRAuth from '@/utils/canSSRAuth'
import Head from 'next/head'
import Header from '@/components/Header'
import styles from './styles.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import setupAPIClient from '@/services/api'
import Modal from 'react-modal'
import ModalOrder from '@/components/ModalOrder'
import { toast } from 'react-toastify'

type OrderProps = {
  id: string,
  table: string | number,
  status: boolean,
  draft: boolean,
  name: string | null,
}

interface HomeProps {
  orders: OrderProps[]
}

export type OrderItemProps = {
  id: string,
  amount: number,
  order_id: string,
  product_id: string,
  product:{
    id: string,    
    name: string,    
    description: string,    
    price: string,    
    banner: string,    
  },
  order:{
    id: string,
    table: string,
    status: boolean,
    draft: boolean,
    name: string | null,
  }
}

export default function Dashboard({ orders }: HomeProps) { 

  const [orderList, setOrderList] = useState(orders || [])
  
  const [modalItem, setModalItem] = useState<OrderItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false)

  function handleCloseModal(){
    setModalVisible(false)
  }

  async function handleOpenModalView(id: string){
    const apiClient = setupAPIClient()
    const response = await apiClient.get('/order/detail', {
      params:{ order_id: id }
    })

    setModalItem(response.data)
    setModalVisible(true)

  }

  async function handleFinishItem(id: string){
    const apiClient = setupAPIClient()
    await apiClient.put('/order/finish', {
      order_id: id
    })

    
    const response = await apiClient.get('/orders')
    setOrderList(response.data)
    
    setModalVisible(false)
    toast.success(`Pedido Concluído!`)
  }

  async function handleRefreshOrders() {
    const apiClient = setupAPIClient()
    const response = await apiClient.get('/orders')
    setOrderList(response.data)
  }

  Modal.setAppElement('#__next')

  return (
    <>
      <Head>
        <title>Painel - Prime Pizza</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos Pedidos</h1>
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} color='#3fffa3' />
            </button>
          </div>

          <article className={styles.listOrders}>

            {orderList.length === 0 && (
              <span className={styles.emptyList}>Nenhum pedido em aberto foi encontrado...</span>
            )}

            {orderList.map(item => (
              <section className={styles.orderItem} key={item.id}>
                <button onClick={() => handleOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa {item.table} {item.name && ` - ${item.name}`}</span>
                </button>
              </section>
            ))}    

          </article>

        </main>

        {modalVisible && (
          <ModalOrder 
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishItem}
          />
        )}

      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/orders')

  // console.log(response.data)

  return {
    props: {
      orders: response.data
    }
  }
})
