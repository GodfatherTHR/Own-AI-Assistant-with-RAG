type MessageRole = 'user' | 'assistant';

export type Message = {
  id: string;
  role: MessageRole;
  content: string;
};

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex w-full ${
        isUser ? 'justify-end' : 'justify-start'
      } text-sm`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 ${
          isUser
            ? 'bg-emerald-500 text-emerald-950'
            : 'bg-slate-800/80 text-slate-50'
        }`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
}

