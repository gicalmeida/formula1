export default function Led({ c = 'green', pulse = true }) {
  return <span className={`led ${c} ${pulse ? 'pulse' : ''}`} />;
}
