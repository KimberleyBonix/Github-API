/* eslint-disable react/jsx-one-expression-per-line */
import { Message } from 'semantic-ui-react';

type MessageProps = {
  result: number;
};

function ResultMessage({ result }: MessageProps) {
  return (
    <Message>
      <p>
        <b>{result}</b> results matched your search.
      </p>
    </Message>
  );
}

export default ResultMessage;
