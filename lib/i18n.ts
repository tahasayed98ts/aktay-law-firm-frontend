import en from '../messages/en.json';
import ar from '../messages/ar.json';

const messages = { en, ar } as const;
type Locale = 'en' | 'ar';
type Messages = typeof en;

export function getTranslations(locale: string) {
  const msgs = messages[(locale as Locale)] ?? messages.en;

  function t(key: string): string {
    const keys = key.split('.');
    let value: unknown = msgs;
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    return (value as string) ?? key;
  }

  return t;
}