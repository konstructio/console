import { GitProvider } from '@/types';

type MessageType = 'repo' | 'team';

export function createGitOrgErrorMessage(args: {
  git: GitProvider;
  type: MessageType;
  gitOwner?: string;
}) {
  const stringFillIns: Record<MessageType, { str1: string; str2: string; str3: string }> = {
    repo: { str1: 'repositories', str2: 'gitops', str3: 'metaphor' },
    team: { str1: 'teams', str2: 'admins', str3: 'developers' },
  };

  const { str1, str2, str3 } = stringFillIns[args.type];

  const gitStringAddition = args.git === GitProvider.GITHUB ? 'Hub' : 'Lab';

  return `Git${gitStringAddition} organization <a href="https://${args.git}.com/${args.gitOwner}" target="_blank"><strong>${args.gitOwner}</strong></a>
  already has ${str1} named either <strong>${str2}</strong> and/or <strong>${str3}</strong>.
  Please remove or rename to continue.`;
}
