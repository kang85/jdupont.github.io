const markdownStyles = theme => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: 16,
  marginTop: theme.spacing.unit * 2,
  marginBottom: theme.spacing.unit * 2,
  padding: `0 ${theme.spacing.unit}px`,
  color: theme.palette.text.primary,
  '& .anchor-link': {
    marginTop: -theme.spacing.unit * 12, // Offset for the anchor.
    position: 'absolute',
  },
  '& pre, & pre[class*="language-"]': {
    margin: `${theme.spacing.unit * 3}px 0`,
    padding: '12px 18px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    overflow: 'auto',
  },
  '& code': {
    display: 'inline-block',
    lineHeight: 1.6,
    fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
    padding: '3px 6px',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    fontSize: 14,
  },
  '& p code, & ul code, & pre code': {
    fontSize: 14,
    lineHeight: 1.6,
  },
  '& h1': {
    ...theme.typography.display2,
    color: theme.palette.text.secondary,
    margin: '0.7em 0',
  },
  '& h2': {
    ...theme.typography.display1,
    color: theme.palette.text.secondary,
    margin: '1em 0 0.7em',
  },
  '& h3': {
    ...theme.typography.headline,
    color: theme.palette.text.default,
    margin: '1em 0 0.7em',
  },
  '& h4': {
    ...theme.typography.title,
    color: theme.palette.text.default,
    margin: '1em 0 0.7em',
  },
  '& h5': {
    ...theme.typography.subheading,
    color: theme.palette.text.default,
    margin: '1em 0 0.7em',
  },
  '& h6': {
    ...theme.typography.body2,
    color: theme.palette.text.default,
    margin: '1em 0 0.7em',
  },
  '& p, & ul, & ol': {
    lineHeight: 1.6,
  },
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    '& code': {
      fontSize: 'inherit',
      lineHeight: 'inherit',
    },
    '& .anchor-link-style': {
      opacity: 0,
      // To prevent the link to get the focus.
      display: 'none',
    },
    '&:hover .anchor-link-style': {
      display: 'inline-block',
      opacity: 1,
      padding: `0 ${theme.spacing.unit}px`,
      color: theme.palette.text.hint,
      '&:hover': {
        color: theme.palette.text.secondary,
      },
      '& svg': {
        width: '0.55em',
        height: '0.55em',
        fill: 'currentColor',
      },
    },
  },
  '& table': {
    width: '100%',
    display: 'block',
    overflowX: 'auto',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    overflow: 'hidden',
  },
  '& thead': {
    fontSize: 12,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.secondary,
  },
  '& tbody': {
    fontSize: 13,
    lineHeight: 1.5,
    color: theme.palette.text.primary,
  },
  '& td': {
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 5}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 3}px`,
    textAlign: 'left',
  },
  '& td:last-child': {
    paddingRight: theme.spacing.unit * 3,
  },
  '& td compact': {
    paddingRight: theme.spacing.unit * 3,
  },
  '& td code': {
    fontSize: 13,
    lineHeight: 1.6,
  },
  '& th': {
    whiteSpace: 'pre',
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
    padding: `0 ${theme.spacing.unit * 5}px 0 ${theme.spacing.unit * 3}px`,
    textAlign: 'left',
  },
  '& th:last-child': {
    paddingRight: theme.spacing.unit * 3,
  },
  '& tr': {
    height: 48,
  },
  '& thead tr': {
    height: 64,
  },
  '& strong': {
    fontWeight: theme.typography.fontWeightMedium,
  },
  '& blockquote': {
    borderLeft: `5px solid ${theme.palette.text.hint}`,
    background: theme.palette.background.paper,
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 3}px`,
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  '& a, & a code': {
    // Style taken from the Link component
    color: theme.palette.secondary.A400,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const renderHeading = (text, level) => {
  const escapedText = text
    .toLowerCase()
    .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>/g, '')
    .replace(/[^\w]+/g, '-');

  return (
    `
    <h${level}>
      <a class="anchor-link" id="${escapedText}"></a>${text}
      <a class="anchor-link-style" href="#${escapedText}">
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M46.9 13.9c-.5-.6-1.2-.94-2.07-.94h-6.67l1.86-8.98c.17-.85 0-1.7-.52-2.3-.48-.6-1.2-.94-2.07-.94-1.6 0-3.2 1.27-3.54 2.93l-.5 2.42c0 .07-.07.13-.07.2l-1.37 6.62H20.7l1.88-8.96c.16-.85 0-1.7-.53-2.3-.48-.6-1.2-.94-2.07-.94-1.65 0-3.2 1.27-3.56 2.93l-.52 2.58v.08l-1.37 6.64H7.3c-1.67 0-3.22 1.3-3.58 2.96-.16.86 0 1.7.52 2.3.48.6 1.2.93 2.07.93h6.97l-2 9.65H4c-1.67 0-3.22 1.27-3.56 2.94-.2.8 0 1.67.5 2.27.5.6 1.2.93 2.08.93H10l-1.84 9.05c-.2.84 0 1.67.52 2.3.5.6 1.25.92 2.08.92 1.66 0 3.2-1.3 3.55-2.94l1.94-9.33h11.22l-1.87 9.05c-.15.84.03 1.67.53 2.3.5.6 1.2.92 2.07.92 1.65 0 3.22-1.3 3.56-2.94l1.9-9.33h7c1.6 0 3.2-1.28 3.53-2.93.2-.87 0-1.7-.52-2.3-.48-.62-1.2-.96-2.05-.96h-6.7l2.02-9.65h6.93c1.67 0 3.22-1.27 3.56-2.92.2-.85 0-1.7-.5-2.3l-.04.03zM17.53 28.77l1.95-9.65H30.7l-1.97 9.66H17.5h.03z"/>
        </svg>
      </a>
    </h${level}>
    `
  );
};

export { markdownStyles, renderHeading };
