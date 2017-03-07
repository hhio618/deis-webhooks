
// TODO: Abstract this between Bitbucket Cloud/Server webhooks/Github
export class PullRequest {
  id: number;
  action: string;
  state: string;
  version: string;
  title: string;
  comment: string;
  repository: string;
  branch_from: string;
  branch_to: string;
  author_id: string;
  author_name: string;
  author_email: string;
}
