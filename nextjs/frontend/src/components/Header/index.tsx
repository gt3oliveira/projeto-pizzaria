import { useContext } from 'react'
import styles from './style.module.scss'
import Link from 'next/link'
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '@/contexts/AuthContext'

export default function Header() {

    const { user, signOut } = useContext(AuthContext)

  return (
    <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <Link href="/dashboard">
                <img src="/logo-pizzaria.png" width={190} height={30} alt="logo pizzaria" />
            </Link>

            <h2>{user?.name}</h2> {/* inserindo o nome do user logado na tela */}

            <nav className={styles.menuNav}>
                <Link href="/category" legacyBehavior>
                    <a>Categoria</a>
                </Link>
                
                <Link href="/product" legacyBehavior>
                    <a>Cardápio</a>
                </Link>

                <button onClick={signOut}>
                    <FiLogOut color='#fff' size={24} />
                </button>
            </nav>
        </div>        
    </header>
  )
}
