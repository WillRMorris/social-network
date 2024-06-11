import {Container} from '@mui/material';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react'

import {useEffect} from 'react';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
const [colorMode, setColorMode] = useState('dark');

  //MUI dark mode base line 
  let darkTheme = createTheme({
    palette: {
      mode: `${colorMode}`,
      primary: {
        main: '#01161E',
      },
      secondary: {
        main: '#AEC3B0',
      },
    },
    typography: {
      h2: {
        '@media (max-width:700px)': {
          fontSize: '2.5rem',
        },
      }

    //   fontFamily: [
    //     'Pixelify Sans',
    //     'normal'
    //   ].join(',')
    }
  });

  darkTheme = createTheme(darkTheme);
  useEffect(() =>{
    
  },[])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
          <Outlet />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;