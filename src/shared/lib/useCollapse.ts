import { useRef, useState } from 'react';

export function useCollapse() {
  const collapseRef = useRef<HTMLDivElement>(null);
  const [collapseHeight, setCollapseHeight] = useState(0);

  const collapse = () => {
    if (collapseRef.current) {
      setCollapseHeight(collapseHeight ? 0 : collapseRef.current.clientHeight);
    }
  };

  return { collapseRef, collapseHeight, collapse };
}
