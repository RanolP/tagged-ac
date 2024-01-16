import { CommandInput, Terminal } from '~/features/terminal';

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
        input={<CommandInput></CommandInput>}
      />
    </div>
  );
}
