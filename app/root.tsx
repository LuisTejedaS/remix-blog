import { Outlet, LiveReload , Link, Links, Meta} from "@remix-run/react"
import globalStylesUrl from "~/styles/global.css"

export const links = () => [{
  rel: 'stylesheet', href: globalStylesUrl
}]
export const meta = () =>{
  const description = 'A cool blog built with Remix';
  const keywords = 'remix, react';
  return {
    description,
    keywords
  }

}
export default function App(){
  return (
  <Document title="Remix blog">
    <Layout>
      <Outlet />
    </Layout>
  </Document>);
}
interface IRootProps {
  children: any
  title: string
}

function Document({ children, title } : IRootProps) {
  return (
  <html lang='en'>
    <head>
      <Meta/>
      <Links />
      <title>{title? title : 'App'}</title>
    </head>
    <body>
      {children}
      {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
    </body>
  </html>);
}

function Layout({children}: { children: any }){
  return (<>
  <nav className="navbar">
    <Link to='/' className="logo">
      Remix
    </Link>
    <ul>
      <li>
        <Link to='/posts'>
          Posts
        </Link>
      </li>
    </ul>
  </nav>
  <div className="container">
    {
      children
    }
  </div>
  </>);
}

export function ErrorBoundary({ error } : {error : Error}) {
  console.log(error)
  return (
    <Document title="Remix blog">
      <Layout>
        <h1>Error</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  )
}