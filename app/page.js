import Image from 'next/image'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen ">
     <Sidebar>
      <Header />
     </Sidebar>
    </main>
  )
}


// https://www.youtube.com/watch?v=KpGZjrrS3pY