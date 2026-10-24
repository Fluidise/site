import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('combines simple class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles falsy values and conditional classes', () => {
    const isHidden = false;
    expect(cn('base', isHidden && 'hidden', null, undefined, 'active')).toBe('base active');
  });

  it('resolves conflicting tailwind utility classes', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('supports object syntax', () => {
    expect(cn('btn', { 'btn-primary': true, 'btn-disabled': false })).toBe('btn btn-primary');
  });

  it('supports array arguments', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
  });
});
