import Bottombar from '@/components/global/Bottombar'
import LeftSidebar from '@/components/global/LeftSidebar'
import Topbar from '@/components/global/Topbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full md:flex '>
      <Topbar/>
      <LeftSidebar/>

      <section className='flex flex-1 h-full '>
        <Outlet/>
      </section>

      <Bottombar/>
    </div>
  )
}

export default RootLayout
