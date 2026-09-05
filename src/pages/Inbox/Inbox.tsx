import { ConversationList } from './components/conversation-list'
import { MessageThread } from './components/message-thread'
import { InspectorPanel } from './components/inspector-panel'

export function Inbox() {
  return (
    <div className="flex h-full min-h-0 bg-card">
      <ConversationList />
      <MessageThread />
      <InspectorPanel />
    </div>
  )
}
