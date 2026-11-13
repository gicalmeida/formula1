export default function Panel({ title, icon: Icon, right, children, style }) {
  return (
    <section className="panel" style={style}>
      <header className="panel-h">
        <span className="panel-t">
          {Icon && <Icon size={15} />}
          {title}
        </span>
        {right}
      </header>
      <div className="panel-b">{children}</div>
    </section>
  );
}
