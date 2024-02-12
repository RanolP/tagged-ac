import { For } from 'solid-js';

import { defineCommand } from '~/features/command/define-command';
import { join, myPeerId } from '~/features/game/communication/peer';
import { CommandInput, Terminal } from '~/features/terminal';

import { requestServerList } from './api/(server-list)/servers/route';

const LsCommand = defineCommand(
  'ls',
  async (ctx) => {
    const res = await requestServerList();
    const list = res.ok ? res.value : [];
    ctx.echo(
      <div>
        <h3>서버 목록 ({list.length})</h3>
        {list.length === 0 ? (
          <div>- 아직 열린 서버가 없어요... </div>
        ) : (
          <ul>
            <For each={list}>{({ id }) => <li list-none>- {id}</li>}</For>
          </ul>
        )}
      </div>,
    );
  },
  () => {
    return [
      {
        icon: 'execute-circle',
        value: 'ls',
        description: '방 목록을 확인합니다',
      },
    ];
  },
);
const JoinCommand = defineCommand(
  'join',
  async (ctx, [id]) => {
    await join(id);
    ctx.navigate(`/game/room/${id}`);
  },
  (args) => {
    if (args.length === 0) {
      return [
        {
          icon: 'execute-circle',
          value: 'join <room>',
          description: '방에 들어갑니다',
        },
      ];
    } else {
      return [
        {
          icon: 'parameters-circle',
          value: '방 ID',
          description: '방 이름',
        },
      ];
    }
  },
);
const MakeCommand = defineCommand(
  'make',
  (ctx) => {
    const id = myPeerId();
    ctx.navigate(`/game/room/${id}`);
    ctx.echo(<p>접속 ID : {id}</p>);
  },
  () => {
    return [
      {
        icon: 'execute-circle',
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
          <img src="/logo.svg" w="[370px]" mb-4 />,
          <p>
            solved.ac 태그로 플레이하는 웹 게임 <br />
            tagged.ac에 오신 것을 환영합니다!
          </p>,
        ]}
        input={
          <CommandInput commands={[LsCommand, JoinCommand, MakeCommand]} />
        }
      />
    </div>
  );
}
