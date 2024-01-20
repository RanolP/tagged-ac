import { Suggestion } from '../terminal/command-input/auto-completion';
import { CommandError, StructuredCommand } from './structured-command';

export function defineCommand(
  name: string,
  execute: (args: string[]) => CommandError[],
  suggest: (args: string[]) => Suggestion[],
): StructuredCommand {
  return {
    name: name.split(' '),
    execute,
    suggest,
  };
}
