// src/hooks/use-github-projects.jsx
import { useEffect, useState } from "react";

export function useGitHubProjects() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/tannergalambas/repos")
      .then(res => res.json())
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading };
}