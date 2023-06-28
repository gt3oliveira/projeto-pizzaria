import { ReactNode, ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'
import { FaSpinner } from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean,
  children: ReactNode,
}

export default function Button({ ...props }: ButtonProps) {
  return (
    <button className={styles.button} disabled={props.loading} {...props}>
      {props.loading ? (
        <FaSpinner color='#fff' size={16} />
      ) : (
        <a className={styles.textButton}>
          {props.children}
        </a>
      )}
    </button>
  )
}
