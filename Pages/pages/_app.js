import '../styles/globals.css';
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
'use client';
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function makeVideo() {
    try {
      setLoading(true);
      setMsg(null);
      setVideoUrl(null);

      const res = await fetch('/api/generateVideo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Текст задания можно менять на любой.
        body: JSON.stringify({
          prompt: 'Короткий видео-тур современной гостиной с панорамными окнами',
          duration: 8,
          resolution: '1280x720'
        })
      });

      const data = await res.json();

      if (res.status === 202) {
        setMsg('Видео рендерится. Подождите и нажмите кнопку ещё раз.');
      } else if (res.ok && data.url) {
        setVideoUrl(data.url);
        setMsg(data.demo ? 'ДЕМО-ролик (бесплатно)' : 'Готово!');
      } else {
        setMsg(data.error || 'Ошибка. Попробуйте ещё раз.');
      }
    } catch (e: any) {
      setMsg(e?.message || 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '40px auto', padding: 16 }}>
      <h1>Видео-тур (Sora 2)</h1>
      <p>Нажмите кнопку — увидите пример видео-тура. Сначала работает демо (бесплатно).</p>

      <button onClick={makeVideo} disabled={loading} style={{
        padding: '12px 16px',
        borderRadius: 8,
        border: '1px solid #ccc',
        cursor: 'pointer'
      }}>
        {loading ? 'Делаем видео…' : 'Сделать видео-тур'}
      </button>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}

      {videoUrl && (
        <video
          id="soraVideo"
          src={videoUrl}
          controls
          style={{ width: '100%', marginTop: 16, borderRadius: 12 }}
        />
      )}
    </main>
  );
}
