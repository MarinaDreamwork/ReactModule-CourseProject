import { useMockData } from '../utils/mockData';

const Main = () => {
  const { initialize, status, progress, error } = useMockData();
  const handleClick = () => {
    initialize();
  };
  return (
    <div className='m-3'>
      <h2>Инициализация данных Firebase</h2>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}</li>
        { error && <li>Error: {error}</li>}
      </ul>
      <button className='btn btn-primary mt-3' onClick={handleClick}>Initialize data</button>
    </div>
  );
};

export default Main;
