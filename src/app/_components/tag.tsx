type TagProps = {
  children: string;
  primary?: boolean;
};

export function Tag({ children, primary }: TagProps) {
  return <span className={primary ? "tag primary" : "tag"}>{children}</span>;
}
