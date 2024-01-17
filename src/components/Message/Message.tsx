type MessageProps = {
  result: number;
};

function Message({ result }: MessageProps) {
  return (
    <div>
      <p>{result} results matched your search.</p>
    </div>
  );
}

export default Message;
