import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export interface Language {
  id: string;
  name: string;
  code: string;
}

export interface Voice {
  id: string;
  name: string;
  tag: string;
  language: string;
}

export interface Prompt {
  id: string;
  name: string;
  description: string;
}

export interface Model {
  id: string;
  name: string;
  description: string;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Failed to load reference data';
}

export function useReferenceData() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);

        const [languages, voices, prompts, models] = await Promise.all([
          api<Language[]>('/languages'),
          api<Voice[]>('/voices'),
          api<Prompt[]>('/prompts'),
          api<Model[]>('/models'),
        ]);

        if (!mounted) return;

        setLanguages(languages);
        setVoices(voices);
        setPrompts(prompts);
        setModels(models);
      } catch (error: unknown) {
        setError(getErrorMessage(error));
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    languages,
    voices,
    prompts,
    models,
    loading,
    error,
  };
}
