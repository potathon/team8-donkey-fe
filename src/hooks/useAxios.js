import { useState, useEffect } from 'react';
import axios from 'axios';
/**
 * 일관성있는 백엔드와의 통신을 위해 작성된 커스텀 훅
 *
 *
 * ex)
 * const { data, loading, error } = useAxios('https://api.example.com/data', {
 *     method: 'POST',
 *     headers: {
 *         'Content-Type': 'application/json',
 *     },
 *     body: JSON.stringify({ key: 'value' }),
 * });
 *
 *
 * */
const useAxios = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios(url, options);
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { data, loading, error };
};

export default useAxios;
