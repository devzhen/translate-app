import styles from './ApiError.module.css';

type ApiErrorProps = {
  error: string;
  status: string;
};

function ApiError(props: ApiErrorProps) {
  const { status, error } = props;

  return (
    <div className={styles.container}>
      <h3>Error:</h3>
      <h5>Check translation API provider availability</h5>
      <span>
        {status} - {error}
      </span>
    </div>
  );
}

export default ApiError;
