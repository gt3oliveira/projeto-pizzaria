import { useState, FormEvent, useContext } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'

import Head from 'next/head'
import Image from 'next/image'
import logoImg from '../../../public/logo-pizzaria.png'
import Input from '@/components/iu/Input/Input'
import Button from '@/components/iu/Button/Button'
import { AuthContext } from '@/contexts/AuthContext'

export default function Signup() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name === '' || email === '' || password === ''){
      toast.info("Preencha todos os campos!")
      return;
    }

    setLoading(true)

    let data = {
      name, email, password
    }

    await signUp(data);

    setLoading(false);

  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>
      <div className="containerCenter">
        <Image src={logoImg} alt="Logo Prime Pizza" />

        <div className="login">
          <h1>Criando sua conta</h1>

          <form onSubmit={handleSignUp}>
            <Input type='text' placeholder='Digite seu nome..'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input type='text' placeholder='Digite seu email...'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input type='password' placeholder='Digite sua senha...'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>

          <Link href="/" legacyBehavior>
            <a className='text'>Já possui uma conta? Faça o login.</a>
          </Link>

        </div>
      </div>
    </>
  )
}
