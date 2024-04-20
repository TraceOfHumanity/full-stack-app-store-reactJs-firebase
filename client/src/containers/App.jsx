import { useSelector } from 'react-redux';

export function App() {
  const { value } = useSelector((state) => state.firstSlice);
  return <div className="App">{value}</div>;
}