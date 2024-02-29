import styles from './Badge.module.css';

type BadgeProps = {
  text: string;
  isActive?: boolean;
};

function Badge(props: BadgeProps) {
  const { text, isActive = false } = props;

  const classNames = [styles.container];

  if (isActive) {
    classNames.push(styles.containerActive);
  }

  return (
    <button className={classNames.join(' ')}>
      <span>{text}</span>
    </button>
  );
}

export default Badge;
