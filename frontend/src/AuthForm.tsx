import { useState, type MouseEvent } from "react"
import useGlobalState from "./context/useGlobalState"
import styles from "./AuthForm.module.css"
import type { TFormErrors } from "./types/types"
import isEmail from 'validator/es/lib/isEmail'
import LoadingButton from "./LoadingButton"
import { useRegister } from "./queries/useRegister"
import { useLogin } from "./queries/useLogin"



export default function AuthForm() {
  const { setIsLoginModalOpen, setRating, setMode, mode } = useGlobalState()
  const register = useRegister()
  const login = useLogin()
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<TFormErrors>({
    email: undefined,
    password: undefined,
    name: undefined
  })

  const isRegister = mode === "register"
  const isPending = register.isPending || login.isPending
  const isError = register.isError || login.isError
  const errorMessage = register.error?.message || login.error?.message

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    const { name, email, password, confirmPassword } = formData
    if (!isEmail(email)) {
      setErrors({ email: "Please provide a valid email address" })
      return
    }
    if (!password) {
      setErrors({ password: "Invalid password" })
      return
    }
    if (isRegister && password !== confirmPassword) {
      setErrors({ password: "Passwords do not match" })
      return
    }
    if (isRegister && !name) {
      setErrors({ name: "Please enter a name" })
      return
    }

    if (errors.name !== undefined || errors.email !== undefined || errors.password !== undefined)
      setErrors({
        name: undefined,
        email: undefined,
        password: undefined,
      })

    if (isRegister) {
      register.mutate({ name, email, password })
    } else {
      login.mutate({ email, password })
    }
  }


  const handleClick = () => {
    setRating(0)
    setIsLoginModalOpen(false)
  }

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsLoginModalOpen(false)
    }
  }
  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <form onSubmit={handleSubmit} className={styles.modal}>
        <h3 className={styles.title}>Login to Rate Jokes</h3>

        {isRegister && <div className={styles.field}>
          <label>Name</label>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} />
          <span className={styles.error}>{errors.name}</span>
        </div>}
        <div className={styles.field}>
          <label>Email</label>
          <input type="email" name="email" placeholder="you@example.com" onChange={handleChange} />
          <span className={styles.error}>{errors.email}</span>
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} />
          <span className={styles.error}>{errors.password}</span>
        </div>
        {isRegister &&
          <div className={styles.field}>
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
            <span className={styles.error}>{errors.password}</span>
          </div>
        }

        <button type="submit" disabled={isPending} className={styles.loginBtn}>
          {isPending ? <LoadingButton /> : isRegister ? "Create Account" : "Login"}
        </button>
        {isError && <span>{errorMessage}</span>}
        <button type="button" className={styles.close} onClick={handleClick}>
          ✕
        </button>
        <div className={styles.container}>
          <span>
            {isRegister ? "Already have an account" : "Dont have an account"}
          </span>
          {" "}
          <button className={styles.switchMode} type="button" onClick={() => setMode(!isRegister ? 'register' : "login")}>
            {isRegister ? "Login" : "Signup"}
          </button>
        </div>
      </form>
    </div >
  )
}