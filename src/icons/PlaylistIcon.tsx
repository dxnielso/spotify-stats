const PlaylistIcon = (props: any) => {
  return (
    <svg
      {...props}
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#FFF"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M14 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
      <path d="M17 17v-13h4" fill="#FFF"></path>
      <path d="M13 5h-10"></path>
      <path d="M3 9l10 0"></path>
      <path d="M9 13h-6"></path>
    </svg>
  );
};

export default PlaylistIcon;
