'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function WebToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tool = searchParams.get('tool');
  
  // Use URL parameters to set the active tab
  useEffect(() => {
    if (tool) {
      // Find the tab element with the matching tool name
      const tabElement = document.querySelector(`[data-tool="${tool}"]`) as HTMLButtonElement;
      if (tabElement) {
        tabElement.click();
      }
    }
  }, [tool]);
  
  return (
    <>
      {children}
    </>
  );
}