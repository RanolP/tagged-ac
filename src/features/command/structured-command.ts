import { Navigator } from '@solidjs/router';
import { JSX } from 'solid-js';

import { PeerInstance } from '../game/communication/peer';
import { Suggestion } from '../terminal/command-input/auto-completion';

export interface StructuredCommand {
  name: string[];
  execute(ctx: CommandExecutionContext, args: string[]): Promise<void> | void;
  suggest(args: string[]): Promise<Suggestion[]> | Suggestion[];
}

export interface CommandExecutionContext {
  errors: CommandError[];

  peer: PeerInstance;
  echo: (e: JSX.Element) => void;
  navigate: Navigator;
}

export interface CommandError {
  message: string;
}
