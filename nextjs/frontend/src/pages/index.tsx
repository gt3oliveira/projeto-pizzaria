import { useContext, FormEvent, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import logoImg from '../../public/logo-pizzaria.png'
import Input from '@/components/iu/Input/Input'
import Button from '@/components/iu/Button/Button'
import Link from 'next/link'
import { AuthContext } from '@/contexts/AuthContext'
import { sign } from 'crypto'
import { toast } from 'react-toastify'
import canSSRGuest from '@/utils/canSSRGuest'

export default function Home() {
  const { signIn } = useContext(AuthContext)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [loading, setLoading] = useState(false)
  
  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email === '' || password === ''){
      toast.info("Informe os campos!")
      return;
    }

    setLoading(true);
    
    let data = {
      email: email,
      password: password
    }
    
    await signIn(data)

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Prime Pizza - Faça seu login</title>
      </Head>
      <div className="containerCenter">
        <Image src={logoImg} alt="Logo Prime Pizza" />

        <div className="login">
          <form onSubmit={handleLogin}>
            <Input type='text' placeholder='Digite seu email...'
              value={email}
              onChange={(e)=> setEmail(e.target.value)} />
            
            <Input type='password' placeholder='Digite sua senha...'
              value={password}
              onChange={(e)=> setPassword(e.target.value)} />

            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>

          <Link href="/signup" legacyBehavior>
            <a className='text'>Não possui uma conta? Cadastre-se.</a>
          </Link>

        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  
  return{
    props:{}
  }
}) 
