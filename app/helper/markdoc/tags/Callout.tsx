const TYPE_MAP = {
  note: {
    color: '#8792a2'
  },
  caution: {
    color: '#d97917'
  },
  check: {
    color: '#000000'
  },
  warning: {
    color: '#ed5f74'
  }
};

export function Callout({ children, type, title }:{
  children: React.ReactNode,
  type: keyof typeof TYPE_MAP,
  title?: string
}) {
  return (
    <div
      className="callout"
      style={{
        backgroundColor: TYPE_MAP[type].color,
        color:"white"
      }}
    >
      <h3>{title}</h3>
      {children}
    </div>
  );
}
export let callout =  {
  render: 'Callout',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    type: {
      type: String,
      default: 'note',
      matches: ['check', 'error', 'note', 'warning']
    },
    title: {
      type: String
    }
  }
}