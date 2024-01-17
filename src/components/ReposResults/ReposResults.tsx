import { Card, CardContent, Icon, Image } from 'semantic-ui-react';
import { Repository } from '../../@Types/types';

import './ReposResults.scss';

type ReposResultsProps = {
  repositories: Repository[];
};

function ReposResults({ repositories }: ReposResultsProps) {
  return (
    <section className="repositories">
      {repositories.map((repo) => (
        <Card key={repo.id} href={repo.html_url}>
          <Image src={repo.owner.avatar_url} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{repo.name}</Card.Header>
            <a href={repo.owner.html_url}>{repo.owner.login}</a>
            <Card.Description>{repo.description}</Card.Description>
          </Card.Content>

          <CardContent extra>
            <Icon name="eye" />
            {repo.watchers}
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export default ReposResults;
