import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

export interface AgentPayload {
  name: string;
  description: string;
  callType: string;
  language: string;
  voice: string;
  prompt: string;
  model: string;
  latency: number;
  speed: number;
  callScript: string;
  serviceDescription: string;
  attachments: string[];
  tools: {
    allowHangUp: boolean;
    allowCallback: boolean;
    liveTransfer: boolean;
  };
}

export function useAgentForm(initialData: AgentPayload) {
  const [data, setData] = useState<AgentPayload>(initialData);
  const [agentId, setAgentId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const updateField = useCallback(<K extends keyof AgentPayload>(
    key: K,
    value: AgentPayload[K]
  ) => {
    setData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }, []);

  // Memoized saveAgent
  const saveAgent = useCallback(async () => {
    setSaving(true);
    try {
      if (agentId) {
        await api(`/agents/${agentId}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        });
      } else {
        const res = await api<{ id: string }>('/agents', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        setAgentId(res.id);
      }
      setIsDirty(false);
    } finally {
      setSaving(false);
    }
  }, [agentId, data]);

  // Memoized testCall
  const testCall = useCallback(
    async (testCallData: {
      firstName: string;
      lastName: string;
      gender: string;
      phoneNumber: string;
    }) => {
      if (isDirty) {
        await saveAgent();
      }
      const id = agentId;
      if (!id) throw new Error('Agent not saved');

      return api(`/agents/${id}/test-call`, {
        method: 'POST',
        body: JSON.stringify(testCallData),
      });
    },
    [agentId, isDirty, saveAgent]
  );

  return {
    data,
    updateField,
    saveAgent,
    testCall,
    agentId,
    saving,
    isDirty,
  };
}
