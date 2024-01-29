import './globals.css'
import { Route, Routes } from 'react-router-dom'
import { Signin, Signup } from './_auth/forms'
import { AllUsers, CreatePost, Explore, Home, PostDetails, Profile, Saved, UpdatePost } from './_root/pages'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'

const App = () => {
    return (
        <main className='flex h-screen'>
            <Routes>

                {/* public */}
                <Route element={<AuthLayout />}>
                    <Route path='signin' element={<Signin />} />
                    <Route path='signup' element={<Signup />} />
                </Route>

                {/* private */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route path='/explore' element={<Explore />} />
                    <Route path='/saved' element={<Saved />} />
                    <Route path='/all-users' element={<AllUsers />} />
                    <Route path='/create-post' element={<CreatePost />} />
                    <Route path='/update-post/:id' element={<UpdatePost />} />
                    <Route path='/post/:id' element={<PostDetails />} />
                    <Route path='/profile/:id/*' element={<Profile />} />
                    <Route path='/update-profile/:id' element={<Home />} />

                </Route>


            </Routes>
        </main>
    )
}

export default App
