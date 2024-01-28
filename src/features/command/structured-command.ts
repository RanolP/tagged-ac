import { Suggestion } from '../terminal/command-input/auto-completion';

export interface StructuredCommand {
  name: string[];
  execute(args: string[]): Promise<CommandError[]> | CommandError[];
  suggest(args: string[]): Promise<Suggestion[]> | Suggestion[];
}

export interface CommandError {
  message: string;
}
