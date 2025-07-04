import { useEffect, useRef, useState } from 'react';

export function useEventSource(url: string, options?: EventSourceInit) {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<Event | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const source = new EventSource(url, options);
    eventSourceRef.current = source;

    source.onmessage = (event) => {
      setData(event.data);
    };

    source.onerror = (e) => {
      setError(e);
      // automatic reconnect handled by browser
    };

    return () => {
      source.close();
    };
  }, [url]);

  return { data, error };
}