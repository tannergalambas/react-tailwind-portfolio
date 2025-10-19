import { useEffect, useState } from "react";

const DEFAULT_OPTIONS = {
  username: "tannergalambas",
  perPage: 6,
  sort: "pushed",
  enabled: true,
};

const token = import.meta.env.VITE_GITHUB_TOKEN?.trim();

const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(token ? { Authorization: `token ${token}` } : {}),
};

export function useGitHubProjects(options = {}) {
  const { username, perPage, sort, enabled } = { ...DEFAULT_OPTIONS, ...options };
  const [state, setState] = useState({
    data: [],
    isLoading: enabled,
    error: null,
  });

  useEffect(() => {
    if (!enabled) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
      return;
    }

    const controller = new AbortController();

    async function fetchProjects() {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        const params = new URLSearchParams({
          per_page: perPage.toString(),
          sort,
          direction: "desc",
          type: "owner",
        });

        const response = await fetch(
          `https://api.github.com/users/${username}/repos?${params.toString()}`,
          {
            headers: GITHUB_HEADERS,
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          let errorDetail = `status ${response.status}`;

          try {
            const errorPayload = await response.json();
            if (errorPayload?.message) {
              errorDetail = `${errorPayload.message} (status ${response.status})`;
            }
          } catch {
            // ignore parse errors, keep generic status message
          }

          throw new Error(`GitHub request failed: ${errorDetail}`);
        }

        const payload = await response.json();
        const repositories = Array.isArray(payload) ? payload : [];

        const repositoriesWithLanguages = await Promise.all(
          repositories.map(async (repo) => {
            if (!repo.languages_url) {
              return repo;
            }

            try {
              const languageResponse = await fetch(repo.languages_url, {
                headers: GITHUB_HEADERS,
                signal: controller.signal,
              });

              if (!languageResponse.ok) {
                if (languageResponse.status === 403) {
                  throw new Error("GitHub languages API rate limit exceeded");
                }
                return repo;
              }

              const languagePayload = await languageResponse.json();
              const languages = Object.entries(languagePayload)
                .sort(([, a], [, b]) => b - a)
                .map(([name, bytes]) => ({
                  name,
                  bytes,
                }));

              const totalLanguageBytes = languages.reduce(
                (sum, item) => sum + (item.bytes ?? 0),
                0,
              );

              return {
                ...repo,
                languages,
                totalLanguageBytes,
              };
            } catch (languageError) {
              if (languageError.name === "AbortError") {
                return repo;
              }

              console.warn("Failed to load GitHub language breakdown", languageError);

              return {
                ...repo,
                languages: [],
                totalLanguageBytes: 0,
              };
            }
          }),
        );

        setState({
          data: repositoriesWithLanguages,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("GitHub projects fetch failed", error);

        setState({
          data: [],
          isLoading: false,
          error,
        });
      }
    }

    fetchProjects();

    return () => controller.abort();
  }, [username, perPage, sort, enabled]);

  return state;
}
