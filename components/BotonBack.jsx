'use client';

import { useRouter } from "next/navigation";


function BotonBack() {
    const router = useRouter();
    
    return (

        <button
            onClick={()=>router.back()}
            className="fixed py-2 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 self-end font-semibold"
        >
            &larr;
        </button>
    )
}

export default BotonBack