import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import Usuarios from './Usuarios.jsx'
import { redirect } from 'next/navigation';

const UsusariosPage = async () => {

  const session = await getServerSession(authOptions)

  if(!session || session.user.role !== 'Admin') {
    
    redirect("auth/login")
  }
  
  return (
    <div className="flex flex-col gap-2">
      <Usuarios />
    </div>
  );
}

export default UsusariosPage;
