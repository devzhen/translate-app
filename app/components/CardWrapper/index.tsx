import styles from './CardWrapper.module.css';

type CardWrapperProps = {
  children: React.ReactNode;
};

function CardWrapper({ children }: CardWrapperProps) {
  return <div className={styles.container}>{children}</div>;
}

export default CardWrapper;
