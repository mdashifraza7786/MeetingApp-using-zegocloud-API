"use client"
import { MD5 } from 'crypto-js';
import { RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function Home() {
  const [creating, setCreating] = useState(false);
  const route = useRouter();
  const handleClick = () => {
    setCreating(true);
    const dataToHash = Date.now().toString();
    const md5Hash = MD5(dataToHash).toString();
    route.push(`/room/${md5Hash}`);
  };
  return (
    <div className="h-screen  flex items-center justify-center">

      <button className="px-5 py-2 bg-black rounded-md  text-white flex items-center gap-1 text-3xl" onClick={handleClick} disabled={creating}>
        {creating ? <><span>Creating</span> <RefreshCcw color="#ffffff" size={30} className="animate-spin"/></> : "Create Meeting"}
      </button>

    </div>
  );
}
