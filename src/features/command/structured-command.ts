import { Suggestion } from '../terminal/command-input/auto-completion';

export interface StructuredCommand {
  name: string[];
  execute(args: string[]): CommandError[];
  suggest(args: string[]): Suggestion[];
}

export interface CommandError {
  message: string;
}
