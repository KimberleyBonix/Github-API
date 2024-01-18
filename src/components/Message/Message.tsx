/* eslint-disable react/jsx-one-expression-per-line */
import { Message } from 'semantic-ui-react';

type MessageProps = {
  result: number;
};

function ResultMessage({ result }: MessageProps) {
  return (
    <Message>
      <p>
        {result > 0 ? (
          <>
            <b>{result}</b> repositor{result > 1 ? 'ies' : 'y'} matched your
            search.
          </>
        ) : (
          'Nothing was found.'
        )}
      </p>
    </Message>
  );
}

export default ResultMessage;
