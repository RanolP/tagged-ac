import { Suggestion } from '../terminal/command-input/auto-completion';
import {
  CommandExecutionContext,
  StructuredCommand,
} from './structured-command';

export function defineCommand(
  name: string,
  execute: (
    ctx: CommandExecutionContext,
    args: string[],
  ) => Promise<void> | void,
  suggest: (args: string[]) => Suggestion[],
): StructuredCommand {
  return {
    name: name.split(' '),
    execute,
    suggest,
  };
}
