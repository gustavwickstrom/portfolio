export default function RevealItem({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const base =
    "transition duration-700 ease-out will-change-transform opacity-0 translate-y-4";
  return (
    <Tag
      data-reveal
      style={{ transitionDelay: `${delay}ms` }}
      className={`${base} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
