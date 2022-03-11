import { DataContext } from 'contexts/data';
import { useContext } from 'react';

export const useData = () => useContext(DataContext);
