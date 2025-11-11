 // pages/index.js
export default function RedirectPage() {
  if (typeof window !== 'undefined') {
    const newUrl = 'https://baysulu-onefile-rtdl.vercel.app' + window.location.pathname + window.location.search + window.location.hash;
    window.location.replace(newUrl);
  }
  return (
    <div style={{
      display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',
      background:'#0b1220',color:'#fff',fontFamily:'system-ui,-apple-system,Segoe UI,Roboto,sans-serif'
    }}>
      Redirecting to 
      <a href="https://baysulu-onefile-rtdl.vercel.app" style={{color:'#4ade80',marginLeft:'6px'}}>
        baysulu-onefile-rtdl.vercel.app
      </a> …
    </div>
  );
}
