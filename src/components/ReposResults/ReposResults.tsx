// import { ChangeEvent, useState } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Repository } from '../../@Types/Repository';

type ReposResultsProps = {
  repositories: Repository[];
};

function ReposResults({ repositories }: ReposResultsProps) {
  return (
    <>
      {repositories.map((repo) => (
        <Card key={repo.id}>
          <Image src="../../../public/logo512.png" wrapped ui={false} />
          <Card.Content>
            <Card.Header>{repo.name}</Card.Header>
            <Card.Meta>
              <span className="date">Joined in 2015</span>
            </Card.Meta>
            <Card.Description>{repo.description}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </>
  );
}

export default ReposResults;
