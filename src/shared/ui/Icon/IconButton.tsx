export const IconButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="appearance-none" {...props}>
      {props.children}
    </button>
  );
};
