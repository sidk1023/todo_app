import '../styles/globals.css'
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'
import "react-datepicker/dist/react-datepicker.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
