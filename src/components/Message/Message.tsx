type MessageProps = {
  result: number;
};

function Message({ result }: MessageProps) {
  return (
    <div>
      <p>La recherche a donné {result} résultats</p>
    </div>
  );
}

export default Message;
