import styles from './Badge.module.css';

type BadgeProps = {
  text: string;
  isActive?: boolean;
  onClick: () => void;
};

function Badge(props: BadgeProps) {
  const { text, isActive = false, onClick } = props;

  const classNames = [styles.container];

  if (isActive) {
    classNames.push(styles.containerActive);
  }

  return (
    <button className={classNames.join(' ')} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
}

export default Badge;
