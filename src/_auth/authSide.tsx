import { img0, img2, img3, img5, img6, img7, img8 } from '@/assets';

const SigninSide = () => {
    return (
        <div className='grid p-2 grid-cols-3 gap-1 transform rotate-[11deg] w-[110%] h-[110%] shadow-green-400 shadow-2xl flex-shrink-0 overflow-auto'>
            <div className='flex flex-col gap-1 rotate-0 overflow-hidden h-full'>
                <div className='h-full py-1 rounded-[30px] bg-cover bg-center' style={{ backgroundImage: `url(${img0})`}}></div>
                <div className='h-full py-1 rounded-[30px] bg-cover bg-top' style={{ backgroundImage: `url(${img5})`}}></div>
            </div>

            <div className='col-span-2 flex flex-col p-2 gap-2 '>
                <div className='grid grid-cols-2 row-span-2 gap-2 h-full flex-1' >
                    <div className='flex flex-col gap-2 flex-grow'>
                        <div className='rounded-[15px] bg-cover bg-center h-full' style={{ backgroundImage: `url(${img6})`}}></div>
                        <div className='rounded-[15px] bg-cover bg-center h-full' style={{ backgroundImage: `url(${img2})`}}></div>
                        <div className='rounded-[15px] bg-cover bg-center h-full' style={{ backgroundImage: `url(${img3})`}}></div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className="h-full bg-cover bg-center rounded-[15px] flex-[0.4]" style={{ backgroundImage: `url(${img7})` }}></div>
                        <div className="h-full bg-cover bg-center rounded-[15px] flex-1" style={{ backgroundImage: `url(${img8})`}}></div>    
                    </div>
                </div>
                <div className="flex-[0.4] h-full bg-cover bg-center  " style={{ backgroundImage: `url(${img7})`}}></div>
            </div>
        </div>
    )
}

export default SigninSide
