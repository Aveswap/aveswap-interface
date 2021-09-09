import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Main from '../../components/Main'
import Banner from '../../components/Banner'
import Popups from '../../components/Popups'
import { useDarkModeManager } from '../../state/user/hooks'

const Layout = ({ children, banner = undefined }) => {
  const [darkMode, toggleDarkMode] = useDarkModeManager()
  let className = 'switch';
  if (!darkMode) {
    className += ' switch-white';
  }
  return (
    <div className={className}>
      <div className="z-0 flex flex-col items-center w-full h-screen pb-16 lg:pb-0">
        {banner && <Banner />}
        <Header />
        <Main>{children}</Main>
        <Popups />
        <Footer />
      </div>
    </div>
  )
}

export default Layout
