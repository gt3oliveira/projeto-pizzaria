import { FormEvent, useState } from 'react'
import Header from '@/components/Header'
import Head from 'next/head'
import setupAPIClient from '@/services/api'
import canSSRAuth from '@/utils/canSSRAuth'

import styles from './styles.module.scss'
import { toast } from 'react-toastify'

export default function Category() {
    const [name, setName] = useState('')

    async function handleRegister(event: FormEvent){
        event.preventDefault();

        if(name === ''){
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name: name
        })

        toast.success("Categoria cadastrada com sucesso!")
        setName('')
    }

  return (
    <>
        <Head>
            <title>Noca categoria - Prime Pizza</title>
        </Head>
        <div>
            <Header />
            <main className={styles.container}>
                <h1>Cadastrar categorias</h1>

                <form onSubmit={handleRegister} className={styles.form}>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Digite o nome da categoria...'
                        className={styles.input}
                    />

                    <button className={styles.buttonAdd} type='submit'>Cadastrar categoria</button>
                </form>

            </main>
        </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return{
        props: {}
    }
})
