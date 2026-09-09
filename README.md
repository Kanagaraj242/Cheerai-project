# Cheerio AI

A web application for running customer conversations and marketing automation on
WhatsApp and other messaging channels.

Two products sit at the centre of the app:

## 1. WhatsApp Team Inbox — `/inbox`

A three-panel inbox (chat list → conversation → customer details) where a whole
support team works out of one queue.

- **Chat list** — full-text search across names, numbers, labels and message
  bodies, plus filters for status, channel, assignee and quick views
  (assigned to me / unassigned / unread), and three sort orders.
- **Status** — every conversation is Unresolved, Pending, Follow-up or Resolved.
  The status is visible on the row *and* in the conversation header, and can be
  changed from either place.
- **Team assignment** — assign a conversation to any teammate, or send it back
  to the unassigned queue. The owner's avatar shows on the chat list row.
- **Internal comments** — notes written in the composer's "Internal note" mode
  appear inline in the thread and in the Notes tab. They are never sent to the
  customer.
- **Saved replies** — searchable, categorised canned responses with `{{variables}}`
  filled in per contact. Press `/` in an empty composer to open the picker.
- **Message composer** — text, images, emoji and approved WhatsApp templates,
  with the 24-hour session window surfaced above the composer.
- **Customer details** — profile, contact fields, labels and editable custom
  attributes that agents can add on the fly.
- **Customer history** — every previous conversation with its outcome, the agent
  who handled it and the channel it came in on.

## 2. Workflow Automation Builder — `/workflows`

A playground-style canvas for building automations without writing code.

- **Drag-and-drop canvas** — drag nodes from the library onto the canvas (or
  click to drop one in the middle), reposition them freely, pan the background
  and zoom with `⌘`+scroll or the zoom controls.
- **Node library** — 19 colour-coded nodes across Events, Actions, Conditions,
  Timing and Data, with keyword search.
- **Branching logic** — If/Else and other condition nodes have YES and NO
  outputs. Rules are built from contact attributes with typed operators and are
  joined with AND / OR.
- **Connections** — drag from a node's output dot to another node to wire them
  together; click a connection to remove it.
- **Configuration panel** — every node type renders its own settings, including
  a message editor with variable chips.
- **Real-time preview** — see the message exactly as it lands on WhatsApp,
  Instagram, SMS or email, with character counts and estimated send cost.
- **Validation** — the builder lists what is still missing (unconnected steps,
  empty messages, conditions with no rules, unfilled branches) and blocks
  activation until it is fixed.
- **Guided onboarding** — a five-step walkthrough on first visit, replayable from
  the *Guide* button, plus tooltips throughout.

## Running it locally

```bash
npm install --prefix client
npm run dev --prefix client        # http://localhost:5173

npm install --prefix server
npm run dev --prefix server        # API on http://localhost:3001
```

`client/` is a React + Vite single-page app; `server/` is a small Express API,
also deployed as a Vercel serverless function from `api/`.
