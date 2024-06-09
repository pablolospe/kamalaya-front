'use client';

import { useRouter } from "next/navigation";


function BotonBack() {
    const router = useRouter();
    
    return (

        <button
            onClick={()=>router.back()}
            className="fixed py-2 px-4 bg-blue-500 text-white text-center font-semibold text-xl rounded-md hover:bg-blue-600 self-end ring-2"
        >
            &larr;
        </button>
    )
}

export default BotonBack