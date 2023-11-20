import Banner from '@/components/Banner'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import './styles.css'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Banner />
      <Component {...pageProps} />
    </main>
  )
}
