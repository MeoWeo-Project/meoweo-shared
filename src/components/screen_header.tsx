type ScreenHeaderProps = {
  title: string;
  subtitle: string;
};

/** The title block every screen opens with. Sizing lives in index.css so it can scale with the
 *  viewport rather than being pinned to a pixel. */
export function ScreenHeader({ title, subtitle }: ScreenHeaderProps): React.ReactElement {
  return (
    <div className="screen-header">
      <h1 className="screen-title">{title}</h1>
      <p className="screen-subtitle">{subtitle}</p>
    </div>
  );
}
