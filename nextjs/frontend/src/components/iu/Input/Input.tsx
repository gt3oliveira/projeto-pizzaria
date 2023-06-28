import { HtmlHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './style.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export default function Input({...props}: InputProps) {
  return (
    <input className={styles.input} {...props} />
  )
}

export function TextArea({...props}: TextAreaProps){
  return (
    <textarea className={styles.input} {...props}></textarea>
  )
}


