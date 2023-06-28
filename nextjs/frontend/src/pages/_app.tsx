import type { AppProps } from 'next/app'
import AuthProvider from '@/contexts/AuthContext'
import { Slide, ToastContainer, toast } from 'react-toastify';

import '../../styles/globals.scss'
import '../../styles/homeModule.scss'
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <AuthProvider>
    <Component {...pageProps} />
    <ToastContainer autoClose={2000} theme='dark' />
  </AuthProvider>
  )
}
