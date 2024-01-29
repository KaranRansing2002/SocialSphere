import { Models } from 'appwrite'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

interface Props{
  user:Models.Document
}

const UserCard:React.FC<Props> = ({user}) => {
  return (
    <div className='flex-1 shadow-lg shadow-slate-800 border-primary-500 bg-dark-2 flex-center p-4 flex-col'>
      <img src={user.imageUrl} className='object-cover sm:h-36 sm:w-36 h-24 w-24 rounded-full' />
      <h3 className='sm:h3-bold font-bold'>{user.name}</h3>
      <h3 className='font-semibold text-light-3'>@{user.username}</h3>
      <Link to={`/profile/${user.$id}`}><Button className='bg-blue-500 mt-2'>View Profile</Button></Link>
    </div>
  )
}

export default UserCard
