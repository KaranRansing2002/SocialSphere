import { Links } from '@/constants'
import { Link, useLocation } from 'react-router-dom'

const Bottombar = () => {

  const { pathname } = useLocation();

  return (
    <div className='bottom-bar'>
      {Links.map(link => {
            return <Link to={link.route} key={link.label} className={`flex p-1 flex-col items-center group gap-1 hover:bg-primary-500 ${pathname === link.route && 'bg-primary-500'} transition-all rounded`}>
              <link.icon className={`text-primary-500 h-5 transition-all group-hover:text-white ${pathname === link.route && 'text-white'}`} />
              <span className='sm:text-sm text-[10px]'>{link.label}</span>
            </Link>
          })}
    </div>
  )
}

export default Bottombar
