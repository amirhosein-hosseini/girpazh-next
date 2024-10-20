import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after 3 seconds or immediately
    router.replace('/');
  }, [router]);

  return null; // Optionally you can return something like a loading indicator
}