import * as React from 'react'

export function useScrollSpy(
  selectors: string[],
  options?: IntersectionObserverInit,
) {
  const [activeId, setActiveId] = React.useState<string>()
  const observer = React.useRef<IntersectionObserver | null>(null)
  const headerRef = React.useRef({});

  React.useEffect(() => {  
    const elements = selectors.map((selector) => document.querySelector(`h2${selector}, h3${selector}`))

    observer.current?.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        headerRef.current[entry.target.id] = entry;
      }

      const topElement = Object.values(headerRef.current).find((entry: IntersectionObserverEntry) => entry.isIntersecting) as IntersectionObserverEntry;

      if (topElement) {
        setActiveId(topElement.target.id);
      }

    }, options);

    elements.forEach((el) => {
      if (el) observer.current?.observe(el)
    });

    return () => observer.current?.disconnect()
  }, [selectors, options])

  return activeId
}
