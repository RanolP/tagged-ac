import { defineCommand } from '~/features/command/define-command';
import { CommandInput, Terminal } from '~/features/terminal';

const LsCommand = defineCommand(
  'ls',
  () => {
    return [];
  },
  () => {
    return [
      {
        icon: 'command-execution-circle',
        value: 'ls',
        description: '방 목록을 확인합니다',
      },
    ];
  },
);
const JoinCommand = defineCommand(
  'join',
  () => {
    return [];
  },
  () => {
    return [
      {
        icon: 'command-execution-circle',
        value: 'join <room>',
        description: '방에 들어갑니다',
      },
    ];
  },
);
const MakeCommand = defineCommand(
  'make',
  () => {
    return [];
  },
  () => {
    return [
      {
        icon: 'command-execution-circle',
        value: 'make',
        description: '방을 만듭니다',
      },
    ];
  },
);

export default function IndexPage() {
  return (
    <div>
      <Terminal
        initialPrompt={[
          <img src="logo.svg" w="[370px]" mb-4 self-center />,
          <span self-center text-center text-8>
            solved.ac 태그로 플레이하는 웹 게임 <br />
            tagged.ac에 오신 것을 환영합니다!
          </span>,
        ]}
        input={
          <CommandInput
            commands={[LsCommand, JoinCommand, MakeCommand]}
          ></CommandInput>
        }
      />
    </div>
  );
}
